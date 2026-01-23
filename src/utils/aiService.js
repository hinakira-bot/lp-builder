import { SECTION_REGISTRY, ALLOWED_SECTION_TYPES, TYPE_ALIASES } from './componentRegistry';

export const GEMINI_MODEL = "gemini-2.5-pro";

const UNSPLASH_LIBRARY = {
    // ... (keep existing library)
    // ... (keep existing library)
    salon: [
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&w=1600&q=80"
    ],
    business: [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
    ],
    gym: [
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=80"
    ],
    cafe: [
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1600&q=80"
    ],
    default: [
        "https://images.unsplash.com/photo-1516937941348-af5af4ae6478?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"
    ]
};

// (Manual Catalog Removed - Using Imported Registry)

export const aiService = {
    GEMINI_MODEL: GEMINI_MODEL,
    // Key Management
    getApiKey: () => {
        return localStorage.getItem('lp_builder_ai_key');
    },

    setApiKey: (key) => {
        localStorage.setItem('lp_builder_ai_key', key);
    },

    getOpenAIKey: () => {
        return localStorage.getItem('lp_builder_openai_key');
    },

    setOpenAIKey: (key) => {
        localStorage.setItem('lp_builder_openai_key', key);
    },

    // Gemini prompt optimization (Internal - used by Image Gen)
    generateOptimizedPrompt: async (apiKey, originalPrompt, style) => {
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `You are an expert AI art prompter. Convert the following Japanese user request into a highly detailed, English stable-diffusion style prompt.
                            
                            User Input: "${originalPrompt}"
                            Selected Style: "${style}"

                            Rules:
                            1. Translate the core concept to English accurately.
                            2. Enhance with high-quality keywords (e.g., 8k, cinematic, detailed) matching the selected style.
                            3. Output ONLY the raw English prompt text. No markdown, no explanations.`
                        }]
                    }]
                })
            });

            if (!response.ok) return null;
            const data = await response.json();
            return data.candidates[0].content.parts[0].text.trim();
        } catch (e) {
            console.error("Gemini optimization failed", e);
            return null;
        }
    },

    // OpenAI DALL-E 3 Generation
    generateImageOpenAI: async (apiKey, prompt, style) => {
        const googleKey = aiService.getApiKey();
        let optimizedPrompt = null;

        if (googleKey) {
            try {
                optimizedPrompt = await aiService.generateOptimizedPrompt(googleKey, prompt, style);
            } catch (e) {
                console.warn("Prompt optimization failed for DALL-E, using raw prompt", e);
            }
        }

        const basePrompt = optimizedPrompt || prompt;
        const finalPrompt = `${basePrompt} ${style ? `in ${style} style` : ''}`;

        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "dall-e-3",
                prompt: finalPrompt,
                n: 1,
                size: "1024x1024",
                quality: "hd",
                response_format: "url"
            })
        });

        if (!response.ok) {
            const cleanError = await response.json();
            throw new Error(`OpenAI Error: ${cleanError.error?.message || response.statusText}`);
        }

        const data = await response.json();
        return {
            url: data.data[0].url,
            usedPrompt: finalPrompt,
            isOptimized: !!optimizedPrompt,
            provider: 'openai'
        };
    },

    // Unified Image Generation Entry Point
    generateImage: async (prompt, style = '', provider = 'openai') => {
        const googleKey = aiService.getApiKey();
        const openaiKey = aiService.getOpenAIKey();

        if (provider === 'openai') {
            if (!openaiKey) throw new Error('API_KEY_MISSING_OPENAI');
            return await aiService.generateImageOpenAI(openaiKey, prompt, style);
        } else if (provider === 'gemini') {
            // Currently using OpenAI as primary for images per user request, 
            // but keeping this hook if we want to add Imagen 3 later.
            // For now, fall back to OpenAI if requested, or throw.
            if (openaiKey) {
                return await aiService.generateImageOpenAI(openaiKey, prompt, style);
            }
        }

        const finalPrompt = `${prompt}, ${style} style`;
        const seed = Math.floor(Math.random() * 99999999);
        const url = `https://pollinations.ai/p/${encodeURIComponent(finalPrompt)}?nologo=true&t=${Date.now()}&seed=${seed}`;

        return {
            url,
            usedPrompt: finalPrompt,
            isOptimized: false,
            provider: 'standard'
        };
    },

    // ------------------------------------------------------------------
    // 3-Phase Generation Pipeline (High Quality)
    // ------------------------------------------------------------------

    // Phase 1: Structure & Design
    generateStructure: async (prompt, tuning) => {
        const apiKey = aiService.getApiKey();
        if (!apiKey) throw new Error('API_KEY_MISSING');

        const systemPrompt = `あなたはプロのWebディレクターです。
ユーザーの要望とチューニング指示に基づき、LPの「設計図（構成とデザイン）」のみをJSON形式で出力してください。
まだ文章や画像は不要です。

【チューニング指示】
Tone: ${tuning.tone}
Focus: ${tuning.focus}

【重要：使用可能なセクション (COMPONENT_CATALOG)】
以下に定義された "type" 以外は絶対に使用しないでください。
${JSON.stringify(ALLOWED_SECTION_TYPES, null, 2)}
各タイプの詳細:
${JSON.stringify(SECTION_REGISTRY, null, 2)}

【出力スキーマ】
{
  "siteTitle": "サイト名",
  "design": {
     "theme": "style name",
     "colors": { "background": "#hex", "text": "#hex", "accent": "#hex", "sub": "#hex" },
     "typography": { "fontFamily": "serif/sans" }
  },
  "heroConfig": {
     "layout": "center/left/right"
  },
  "sections": [
     { 
       "id": 1, 
       "type": "hero", 
       "goal": "awareness",
       "style": { "bgTheme": "unspecified" }
     },
     { "id": 2, "type": "problem_checklist", "goal": "empathy" },
     ... // 最低6セクション (必ず6つ以上提案すること)
  ]
}
`;
        return await aiService._callGemini(apiKey, systemPrompt, prompt);
    },

    // Phase 2: Content Flesh-out
    generateContent: async (structureData, originalPrompt, tuning) => {
        const apiKey = aiService.getApiKey();
        const structureStr = JSON.stringify(structureData, null, 2);

        const systemPrompt = `あなたはプロのセールスライターです。
渡された「LPの構成案(JSON)」の各セクションに対して、成約率の高い日本語のキャッチコピーと本文を肉付けしてください。

【チューニング指示】
Tone: ${tuning.tone} (このトーンで執筆すること！)
Focus: ${tuning.focus}

【ルール】
1. 受け取ったJSONの構造(id, type)は絶対に変えないでください。
2. 各セクションに "title", "content" (または "items", "plans"), "buttons" などのコンテンツフィールドを追加してください。
3. 文体は「${tuning.tone}」を厳守してください。
`;
        return await aiService._callGemini(apiKey, systemPrompt, `Original Request: ${originalPrompt}\n\nStructure JSON:\n${structureStr}`);
    },

    // Phase 3: Visuals & Image Queries
    generateVisuals: async (contentData, originalPrompt, imageMode = 'library') => {
        const apiKey = aiService.getApiKey();
        const contentStr = JSON.stringify(contentData, null, 2);

        const modeInstruction = imageMode === 'ai'
            ? `"mode": "generate", // ユーザーがAI生成を選択しました`
            : `"mode": "library", // 基本はこれ`;

        const systemPrompt = `あなたはプロのアートディレクターです。
LPの各セクション(Hero含む)に必要な「画像」を選定してください。

【画像が必須のセクション】
以下のtypeを持つセクションには、必ず "imageConfig" を付与してください。
- hero (メインビジュアル)
- image (画像単体)
- image_text (画＆文)
- post_card (記事カード)
- columns (3カラム画像)
- full_width (全幅背景)
- speech_bubble (吹き出し/人物)

【利用可能な画像カテゴリ (UNSPLASH_LIBRARY)】
- salon (美容室、エステ)
- business (オフィス、会議)
- gym (フィットネス)
- cafe (飲食、カフェ)
- default (その他)

【出力ルール】
各セクション、および "heroConfig" に "imageConfig" を追加して返してください。

"sections": [
  { "id": 1, "type": "post_card", "imageConfig": { ... } }
],
"heroConfig": {
  ...,
  "imageConfig": {
     ${modeInstruction}
     "category": "salon",
     "keywords": "english keywords"
  }
}
`;
        const resultWithQueries = await aiService._callGemini(apiKey, systemPrompt, `LP Content:\n${contentStr}`);

        // Final normalization and image fetching simulation
        return await aiService._finalizeImages(resultWithQueries, imageMode); // Pass selection mode down
    },

    // Helper: Call Gemini
    _callGemini: async (apiKey, sys, user) => {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                system_instruction: {
                    parts: [{ text: sys }]
                },
                contents: [{
                    role: "user",
                    parts: [{ text: user }]
                }],
                generationConfig: {
                    response_mime_type: "application/json"
                }
            })
        });

        if (!response.ok) {
            const errBody = await response.json();
            console.error("Gemini API Error Detail:", errBody);

            if (response.status === 401) {
                throw new Error('Gemini API Error: 認証に失敗しました。APIキーが正しいか、または有効期限が切れていないか確認してください。 (Note: Gemini APIキーは AIza... で始まります)');
            }
            if (response.status === 404) {
                throw new Error('Gemini API Error: モデルが見つかりません。設定を確認してください。');
            }
            throw new Error(`Gemini API Error: ${errBody.error?.message || '不明なエラーが発生しました'}`);
        }

        const data = await response.json();
        if (!data.candidates || data.candidates.length === 0) {
            throw new Error("Gemini API Error: AIからの回答が空でした。プロンプトを調整してください。");
        }
        let text = data.candidates[0].content.parts[0].text;

        console.log("Gemini Raw Response:", text); // Debug log

        // Robust JSON Extraction
        try {
            // 1. Try direct parse (JSON mode usually returns clean JSON)
            return JSON.parse(text);
        } catch (e) {
            // 2. If valid JSON mode failed (or model chatted), extract first/last brace
            const firstBrace = text.indexOf('{');
            const lastBrace = text.lastIndexOf('}');
            if (firstBrace !== -1 && lastBrace !== -1) {
                const jsonStr = text.substring(firstBrace, lastBrace + 1);
                return JSON.parse(jsonStr);
            }
            throw new Error("Invalid JSON response from AI");
        }

        // Validation Hook
        if (parsedData.sections) {
            parsedData.sections = aiService._validateAndRepairSections(parsedData.sections);
        }
        return parsedData;
    },

    // Helper: Validate & Repair Sections
    _validateAndRepairSections: (sections) => {
        return sections.map(s => {
            // Explicitly remove hero from sections (handled by heroConfig)
            if (s.type === 'hero') {
                console.warn("[AI Repair] Removing 'hero' from sections list (it belongs to heroConfig).");
                return null;
            }

            // 1. Check if type is valid
            if (ALLOWED_SECTION_TYPES.includes(s.type)) {
                return s;
            }

            // 2. Check Aliases
            if (TYPE_ALIASES[s.type]) {
                console.warn(`[AI Repair] Converted alias '${s.type}' to '${TYPE_ALIASES[s.type]}'`);
                return { ...s, type: TYPE_ALIASES[s.type] };
            }

            // 3. Fallback (Unknown type)
            console.warn(`[AI Repair] Unknown type '${s.type}' detected. Attempting fallback.`);

            if (s.items && Array.isArray(s.items)) return { ...s, type: 'point_list' };
            if (s.image) return { ...s, type: 'image_text' };

            return { ...s, type: 'text', content: s.content || s.text || "Content not renderable" };
        }).filter(s => s); // Filter out nulls
    },

    // Helper: Finalize Images (Mock Fetch)
    _finalizeImages: async (data, globalImageMode = 'library') => {
        const processImageConfig = async (config) => {
            if (!config) return null;

            // Allow override per section, but respect global "AI Mode" request if strictly passed
            const mode = config.mode || globalImageMode;

            if (mode === 'library') {
                const category = UNSPLASH_LIBRARY[config.category] ? config.category : 'default';
                const candidates = UNSPLASH_LIBRARY[category];
                return candidates[Math.floor(Math.random() * candidates.length)];
            }

            if (mode === 'generate' || mode === 'ai') {
                // ** DALL-E 3 GENERATION HOOK **
                try {
                    // Note: You must ensure 'generateImageOpenAI' is accessible or use 'generateImage' wrapper
                    const res = await aiService.generateImageOpenAI(aiService.getApiKey(), config.keywords, "photorealistic"); // Using placeholder wrapper usage
                    return res ? res : null;
                } catch (e) {
                    console.warn("Image Gen Failed, falling back to library", e);
                    const fallbackCat = config.category || 'default';
                    const candidates = UNSPLASH_LIBRARY[fallbackCat] || UNSPLASH_LIBRARY['default'];
                    return candidates[Math.floor(Math.random() * candidates.length)];
                }
            }

            // Fallback (Library) logic if mode is unknown
            if (config.keywords) {
                return `https://source.unsplash.com/1600x900/?${encodeURIComponent(config.keywords)}`;
            }
            return null;
        };

        // 1. Process Sections
        const sections = await Promise.all(data.sections.map(async s => {
            const newStyle = { ...s.style };
            let newImage = { ...s.image };

            if (s.imageConfig) {
                const imageUrl = await processImageConfig(s.imageConfig);

                if (imageUrl) {
                    if (s.type === 'hero' || s.bgType === 'image' || s.type === 'full_width') {
                        newStyle.bgImage = `url('${imageUrl}')`;
                        // Cleanup legacy
                        s.bgType = 'image';
                        s.bgValue = imageUrl;
                    } else if (s.type === 'columns' || s.type === 'post_card' || s.type === 'speech_bubble') {
                        // Apply to items if they exist
                        if (s.items && Array.isArray(s.items)) {
                            // ideally we generate unique images per item, but for now distribute
                            s.items = s.items.map(item => ({
                                ...item,
                                image: imageUrl // Use same image for consistency or random if we had multiple
                            }));
                        }
                        // Also set main image just in case
                        newImage = { url: imageUrl, alt: s.imageConfig.keywords };
                    } else {
                        newImage = { url: imageUrl, alt: s.imageConfig.keywords };
                    }
                }
            }

            return {
                ...s,
                style: newStyle,
                image: newImage.url ? newImage : (s.image || {})
            };
        }));

        // 2. Process Global/Hero Fallback (Explicit Request)
        let heroImageFallback = data.heroImageFallback;
        if (data.heroConfig?.imageConfig) {
            const heroUrl = await processImageConfig(data.heroConfig.imageConfig);
            if (heroUrl) {
                heroImageFallback = heroUrl;
                // Also ensure hero config has it if it's structural
                if (data.heroConfig) data.heroConfig.bgImage = heroUrl;
            }
        } else {
            // Logic to find valid hero image if not in config
            const heroSec = sections.find(s => s.type === 'hero');
            if (heroSec && (heroSec.style?.bgImage || heroSec.bgValue)) {
                const bgVal = heroSec.style?.bgImage || heroSec.bgValue;
                heroImageFallback = bgVal.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');
            }
        }

        return { ...data, sections, heroImageFallback };
    },

    // Legacy/Wrapper for single call
    generateLP: async (prompt, tuning) => {
        // Chain the steps
        const s1 = await aiService.generateStructure(prompt, tuning);
        const s2 = await aiService.generateContent(s1, prompt, tuning);
        const s3 = await aiService.generateVisuals(s2, prompt);

        // Normalize for App
        return {
            siteTitle: s3.siteTitle,
            pageBgValue: s3.design.colors.background,
            textColor: s3.design.colors.text,
            accentColor: s3.design.colors.accent,
            fontFamily: s3.design.typography.fontFamily,
            heroTitle: s3.heroConfig?.title || s3.siteTitle, // Fallback if lost
            heroSubtitle: s3.heroConfig?.subtitle || '',
            heroImageFallback: s3.heroImageFallback,
            sections: s3.sections
        };
    },

    // Single Component Generation (For Manual Editor)
    generateHeroVisual: async (heroData, imageMode = 'library') => {
        const apiKey = aiService.getApiKey();
        const modeInstruction = imageMode === 'ai'
            ? `"mode": "generate"`
            : `"mode": "library"`;

        const systemPrompt = `あなたはプロのアートディレクターです。
提供された「メインビジュアル(Hero)」の情報に基づき、最適な画像を選定してください。

【利用可能な画像カテゴリ (UNSPLASH_LIBRARY)】
- salon
- business
- gym
- cafe
- default

【出力ルール】
JSONのみを返してください。
{
  "imageConfig": {
     ${modeInstruction},
     "category": "salon",
     "keywords": "english keywords"
  }
}`;
        const userInput = `Title: ${heroData.title}\nSubtitle: ${heroData.subtitle}`;

        try {
            const result = await aiService._callGemini(apiKey, systemPrompt, userInput);
            // Reuse logic: manually construct a mock 's' object to use internal helper logic or just duplicate simplistic logic here
            // _finalizeImages expects a structure. Let's just do it manually here to save overhead of refactoring _finalizeImages to be too granular
            const config = result.imageConfig;

            // Logic duplicated from _finalizeImages for simplicity in this context
            if (config.mode === 'library') {
                // Check category
                const category = UNSPLASH_LIBRARY[config.category] ? config.category : 'default';
                const candidates = UNSPLASH_LIBRARY[category];
                return candidates[Math.floor(Math.random() * candidates.length)];
            } else {
                // AI Gen
                console.log("Generating Single Hero Image via AI...");
                try {
                    const openaiKey = aiService.getOpenAIKey();
                    if (!openaiKey) throw new Error("OpenAI API Key Missing");

                    const res = await aiService.generateImageOpenAI(openaiKey, config.keywords, "photorealistic");
                    return res ? res.url : null;
                } catch (e) {
                    console.warn("Manual AI Gen failed, fallback to library");
                    const candidates = UNSPLASH_LIBRARY['default'];
                    return candidates[Math.floor(Math.random() * candidates.length)];
                }
            }
        } catch (e) {
            console.error("Hero Visual Gen Failed", e);
            throw e;
        }
    }
};
