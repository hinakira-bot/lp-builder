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
    // 5-Phase Professional Generation Pipeline
    // ------------------------------------------------------------------

    // Phase 1: 戦略考察 (Strategy & Concept)
    generateStrategy: async (prompt, tuning) => {
        const apiKey = aiService.getApiKey();
        if (!apiKey) throw new Error('API_KEY_MISSING');

        const systemPrompt = `あなたはプロのWebマーケティング戦略家です。
ユーザーの要望に基づき、LPの「成功戦略」をJSON形式で策定してください。

【ユーザーの指定条件】
- 希望トーン: ${tuning.tone}
- 重視するポイント: ${tuning.focus}

【戦略策定のポイント】
- ターゲット層（ペルソナ）の深掘り
- 解決すべき痛みの核心
- 商品/サービスの核心的なベネフィット
- 推奨される訴求軸（感情、論理、権威など）
- デザインの目指すべき方向性

【出力スキーマ】
{
  "strategy": {
    "target": "...",
    "problem": "...",
    "solution": "...",
    "approach": "「${tuning.tone}」なトーンで「${tuning.focus}」を強調する具体的方針",
    "toneKeywords": ["...", "..."]
  }
}
`;
        return await aiService._callGemini(apiKey, systemPrompt, prompt);
    },

    // Phase 2: 構成案作成 (Sitemap & Logic)
    generateSitemap: async (strategyData, originalPrompt) => {
        const apiKey = aiService.getApiKey();
        const strategy = strategyData.strategy;

        const systemPrompt = `あなたはプロのWebディレクターです。
以下の「成功戦略」に基づき、成約を最大化するLPの「セクション構成」のみをJSON形式で出力してください。

【成功戦略】
Target: ${strategy.target}
Approach: ${strategy.approach}

【ルール】
- 戦略に基づき、適切な「ストーリー構成（QUEST、AIDMA等）」を構築してください。
- 各セクションの "goal"（このセクションで何を読者に思わせたいか）を定義してください。
- セクションタイプは以下から選択：
${JSON.stringify(ALLOWED_SECTION_TYPES)}

【出力スキーマ】
{
  "siteTitle": "サイト名",
  "sections": [
     { "id": 1, "type": "hero", "goal": "注意を惹きつける" },
     ... // 最低6セクション
  ]
}
`;
        return await aiService._callGemini(apiKey, systemPrompt, `Original Request: ${originalPrompt}\n\nStrategy:\n${JSON.stringify(strategyData)}`);
    },

    // Phase 3: パーツ選定 & デザイン詳細 (Design Architecture)
    generateDesignArchitecture: async (sitemapData, strategyData) => {
        const apiKey = aiService.getApiKey();
        const strategy = strategyData.strategy;

        const systemPrompt = `あなたは世界最高峰のWebデザイナーです。
構成案に基づき、各パーツの「バリアント」と「装飾（余白・境界線）」を決定し、デザイン品質を極限まで高めてください。

【プロのデザイナーの鉄則（Design Playbook）】
1. 余白の美学: すべてのセクションに広め（pt-24以上）の余白を設定してください。
2. 色のリズム: 背景色は交互（White / LightGray #f9f9f9）に切り替えてリズムを作ってください。
3. 境界の装飾: 背景色が変わる境界線（dividerBottom）には "curve" や "wave" を指定し、なめらかにつないでください。
4. パーツバリアント: Pricingなら "modern"、Reviewなら "bubble" など、最適な design 属性を選んでください。

【出力スキーマ】
{
  "design": {
     "colors": { "background": "#ffffff", "text": "#2d2d2d", "accent": "#hex" },
     "typography": { "fontFamily": "serif/sans" }
  },
  "heroConfig": {
     "heroHeight": 90, 
     "heroOverlayOpacity": 0.4,
     "title": "メインタイトル",
     "subtitle": "サブキャッチコピー"
  },
  "sections": [
     { 
       "id": 1, "type": "...", "design": "...", 
       "pt": "pt-32", "pb": "pb-24",
       "dividerBottom": "curve", "dividerBottomColor": "#hex"
     },
     ...
  ]
}
`;
        return await aiService._callGemini(apiKey, systemPrompt, `Sitemap:\n${JSON.stringify(sitemapData)}\n\nStrategy:\n${JSON.stringify(strategyData)}`);
    },

    // Phase 4: ビジュアル選定 (Visuals & Assets)
    generateVisuals: async (designData, originalPrompt, imageMode = 'library') => {
        const apiKey = aiService.getApiKey();
        const modeInstruction = imageMode === 'ai' ? `"mode": "generate"` : `"mode": "library"`;

        const systemPrompt = `あなたはプロのアートディレクターです。各セクションに必要な「画像の設定」を提案してください。
【ルール】既存のデザイン設定（pt, pb, divider等）を絶対に消さずに保持してください。`;

        const resultWithQueries = await aiService._callGemini(apiKey, systemPrompt, `Design Data:\n${JSON.stringify(designData)}`);
        return await aiService._finalizeImages(resultWithQueries, designData, imageMode);
    },

    // Phase 5: 戦略的セールスライティング (Copywriting)
    generateCopywriting: async (visualsData, originalPrompt, strategyData) => {
        const apiKey = aiService.getApiKey();
        const strategy = strategyData.strategy;

        const systemPrompt = `あなたは世界最高峰のセールスライターです。
戦略に基づき、読者の心を動かし、成約へと導く「最強のコピー（日本語）」を執筆してください。
【戦略】
Target: ${strategy.target}
Focus: ${strategy.approach}
【ルール】構成・画像・デザイン設定をすべて保持し、コンテンツ（title, content）のみを肉付けしてください。`;

        return await aiService._callGemini(apiKey, systemPrompt, `Original Request: ${originalPrompt}\n\nVisuals Data:\n${JSON.stringify(visualsData)}`);
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
            const parsedData = JSON.parse(text);
            if (parsedData.sections) {
                parsedData.sections = aiService._validateAndRepairSections(parsedData.sections);
            }
            return parsedData;
        } catch (e) {
            // 2. If valid JSON mode failed (or model chatted), extract first/last brace
            const firstBrace = text.indexOf('{');
            const lastBrace = text.lastIndexOf('}');
            if (firstBrace !== -1 && lastBrace !== -1) {
                const jsonStr = text.substring(firstBrace, lastBrace + 1);
                const parsedData = JSON.parse(jsonStr);
                if (parsedData.sections) {
                    parsedData.sections = aiService._validateAndRepairSections(parsedData.sections);
                }
                return parsedData;
            }
            throw new Error("Invalid JSON response from AI");
        }
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

            // 3. Fallback & Auto-Styling (Ensure it looks good even if AI forgot)
            console.warn(`[AI Repair] Applying design defaults to section ${s.id}`);

            const repaired = {
                ...s,
                type: s.type || 'text',
                pt: s.pt || 'pt-24', // Default to generous padding
                pb: s.pb || 'pb-24',
                design: s.design || (s.type === 'pricing' ? 'modern' : s.type === 'review' ? 'bubble' : 'simple')
            };

            if (ALLOWED_SECTION_TYPES.includes(repaired.type)) return repaired;
            return { ...repaired, type: 'text', content: s.content || "Content Error" };
        }).filter(s => s); // Filter out nulls
    },

    // Helper: Finalize Images (Distribution & Fallbacks)
    _finalizeImages: async (visualsResult, designData, globalImageMode = 'library') => {
        const data = { ...designData, ...visualsResult }; // Merge
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
        console.log("[AI Pipeline] Starting 5-Stage Professional Process...");

        // Stage 1: Strategy
        const strategy = await aiService.generateStrategy(prompt, tuning);

        // Stage 2: Sitemap
        const sitemap = await aiService.generateSitemap(strategy, prompt);

        // Stage 3: Design Architecture
        const design = await aiService.generateDesignArchitecture(sitemap, strategy);

        // Stage 4: Visuals
        const visuals = await aiService.generateVisuals(design, prompt);

        // Stage 5: Copywriting
        const finalData = await aiService.generateCopywriting(visuals, prompt, strategy);

        // Normalize for App
        return {
            siteTitle: finalData.siteTitle,
            pageBgType: 'color',
            pageBgValue: finalData.design?.colors?.background || '#ffffff',
            textColor: finalData.design?.colors?.text || '#2d2d2d',
            accentColor: finalData.design?.colors?.accent || '#3b82f6',
            fontFamily: finalData.design?.typography?.fontFamily || 'sans',
            heroTitle: finalData.heroConfig?.title || finalData.siteTitle,
            heroSubtitle: finalData.heroConfig?.subtitle || '',
            heroHeight: finalData.heroConfig?.heroHeight || 90,
            heroWidth: finalData.heroConfig?.heroWidth || 100,
            heroOverlayOpacity: finalData.heroConfig?.heroOverlayOpacity || 0.4,
            heroImageFallback: finalData.heroImageFallback,
            sections: aiService._validateAndRepairSections(finalData.sections)
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
