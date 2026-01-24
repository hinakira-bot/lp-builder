// src/utils/aiService.js

import { SECTION_REGISTRY, ALLOWED_SECTION_TYPES, TYPE_ALIASES } from './componentRegistry';
import { SECTION_DESIGN_CATALOG, DESIGN_RECOMMENDATIONS } from './aiPromptData';
import { unsplashService } from './unsplashService';

export const GEMINI_MODEL = "gemini-2.5-pro";

const UNSPLASH_LIBRARY = {
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
    tech: [
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=80"
    ],
    corporate: [
        "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80"
    ],
    restaurant: [
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1600&q=80"
    ],
    gym: [
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=80"
    ],
    cafe: [
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1600&q=80"
    ],
    education: [
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1600&q=80"
    ],
    default: [
        "https://images.unsplash.com/photo-1516937941348-af5af4ae6478?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"
    ]
};

export const aiService = {
    GEMINI_MODEL: GEMINI_MODEL,

    getApiKey: () => localStorage.getItem('lp_builder_ai_key'),
    setApiKey: (key) => localStorage.setItem('lp_builder_ai_key', key),
    getOpenAIKey: () => localStorage.getItem('lp_builder_openai_key'),
    setOpenAIKey: (key) => localStorage.setItem('lp_builder_openai_key', key),

    // ------------------------------------------------------------
    // Unsplash API (確定URL = images.unsplash.com) を優先取得するヘルパー
    // ------------------------------------------------------------
    _appendUrlParams: (url, paramsObj) => {
        try {
            const u = new URL(url);
            Object.entries(paramsObj).forEach(([k, v]) => {
                if (!u.searchParams.has(k)) u.searchParams.set(k, String(v));
            });
            return u.toString();
        } catch {
            return url;
        }
    },

    _getUnsplashImageUrlByKeywords: async (keywords, { w = 1600, q = 80 } = {}) => {
        if (!keywords) return null;

        const accessKey = unsplashService.getAccessKey?.();
        if (!accessKey) return null;

        try {
            const results = await unsplashService.searchImages(keywords, 1, 1);
            const first = results?.[0];
            if (!first?.url) return null;

            if (first.downloadLink) {
                unsplashService.triggerDownload(first.downloadLink).catch(() => { });
            }

            const fixed = aiService._appendUrlParams(first.url, {
                auto: 'format',
                fit: 'crop',
                crop: 'entropy',
                w,
                q
            });

            return fixed;
        } catch (e) {
            console.warn('[Unsplash API] search failed, fallback to source.unsplash.com', e);
            return null;
        }
    },

    // Gemini prompt optimization
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
        const openaiKey = aiService.getOpenAIKey();

        if (provider === 'openai') {
            if (!openaiKey) throw new Error('API_KEY_MISSING_OPENAI');
            return await aiService.generateImageOpenAI(openaiKey, prompt, style);
        } else if (provider === 'gemini') {
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

    // Phase 1: 戦略考察
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
}`;
        return await aiService._callGemini(apiKey, systemPrompt, prompt);
    },

    // Phase 2: 構成案作成
    generateSitemap: async (strategyData, originalPrompt) => {
        const apiKey = aiService.getApiKey();
        const strategy = strategyData.strategy;

        // セクションタイプの詳細情報を整形
        const sectionTypesGuide = ALLOWED_SECTION_TYPES
            .filter(t => t !== 'hero')
            .map(type => {
                const registryInfo = SECTION_REGISTRY[type];
                const catalogInfo = SECTION_DESIGN_CATALOG[type];

                if (!registryInfo) return null;

                return `■ ${type} - ${registryInfo.name}
  説明: ${registryInfo.description}
  ${catalogInfo ? `補足: ${catalogInfo.description}` : ''}
  カテゴリ: ${registryInfo.category}
  タグ: ${registryInfo.tags.join(', ')}`;
            })
            .filter(Boolean)
            .join('\n\n');

        const systemPrompt = `あなたはプロのWebディレクターです。
以下の「成功戦略」に基づき、成約を最大化するLPの「セクション構成」のみをJSON形式で出力してください。

【成功戦略】
Target: ${strategy.target}
Approach: ${strategy.approach}
Tone Keywords: ${strategy.toneKeywords?.join(', ') || 'なし'}

【重要】Hero(メインビジュアル)について
- heroは「sections」配列には含めないでください
- heroの情報は別途 heroConfig として管理されます
- sectionsは hero 以外のコンテンツセクションのみを列挙してください

【利用可能なセクションタイプ】
${sectionTypesGuide}

【セクション選定のガイドライン】

**推奨セクション（多くのLPで効果的）**
- problem_checklist: 冒頭で悩みを列挙し、共感を呼ぶ
- conversion_panel: CTAを配置（必ず最後に配置）
- faq: 購入前の不安を解消（CVR向上）

**信頼構築セクション（選択推奨）**
- review: お客様の声（社会的証明）
- speech_bubble: 口コミ風の親しみやすい表現
- staff: スタッフ紹介（人間味）

**説明・紹介セクション（選択）**
- image_text: 画像+テキストで視覚的に説明
- columns: 3つの特徴など（グリッドレイアウト）
- point_list: 箇条書きでシンプルに
- process: 利用手順（ステップ形式）
- post_card: 事例・実績紹介

**販売セクション（選択）**
- pricing: 料金プラン
- comparison: 競合比較

【ルール】
1. 戦略に基づき、適切な「ストーリー構成（AIDMA、QUEST等）」を構築
2. 各セクションの "goal"（このセクションで読者に何を思わせたいか）を定義
3. 最低6セクション、最大10セクション程度を推奨
4. conversion_panel は必ず最後に配置
5. 同じタイプのセクションを複数使用しない（conversion_panelを除く）

【出力スキーマ】
{
  "siteTitle": "魅力的で印象的なサイト名",
  "sections": [
     { "id": 1, "type": "problem_checklist", "goal": "ターゲットの悩みに深く共感させる" },
     { "id": 2, "type": "image_text", "goal": "解決策（商品の価値）を視覚的に提示" },
     { "id": 3, "type": "columns", "goal": "3つの特徴を明確に伝える" },
     ...
  ]
}

【重要】hero は絶対に sections に含めないでください`;

        const result = await aiService._callGemini(apiKey, systemPrompt, `Original Request: ${originalPrompt}\n\nStrategy:\n${JSON.stringify(strategyData)}`);

        // 防御壁1: Phase 2直後に即座にクリーンアップ
        if (result.sections) {
            const originalLength = result.sections.length;
            result.sections = result.sections.filter(s => s.type !== 'hero');
            if (result.sections.length < originalLength) {
                console.warn(`[Phase 2 Cleanup] Removed ${originalLength - result.sections.length} hero section(s) from sitemap`);
            }
        }

        return result;
    },

    // Phase 3: パーツ選定 & デザイン詳細
    generateDesignArchitecture: async (sitemapData, strategyData) => {
        const apiKey = aiService.getApiKey();
        const strategy = strategyData.strategy;

        // トーンから推奨スタイルを自動判定
        const toneKeywords = strategy.toneKeywords || [];
        const toneStyle = toneKeywords.some(k => ['洗練', '上質', '高級', '本物志向', '静謐', 'ウェルネス'].includes(k))
            ? 'luxury'
            : toneKeywords.some(k => ['親しみ', 'カジュアル', '気軽', 'フレンドリー'].includes(k))
                ? 'casual'
                : 'minimal';

        const recommendations = DESIGN_RECOMMENDATIONS[toneStyle];

        // セクション情報を整形
        const sectionGuide = Object.entries(SECTION_DESIGN_CATALOG)
            .map(([type, info]) => {
                const recommended = recommendations[type] || info.designs[0];
                return `■ ${type}
  利用可能: ${info.designs.join(', ')}
  推奨（${toneStyle}）: ${recommended}
  説明: ${info.description}`;
            }).join('\n\n');

        // アクセントカラーの推奨
        const accentColorGuide = {
            luxury: '深緑(#0a5445), ネイビー(#1a3a52), 金色(#d4af37), 深紫(#4a154b)',
            casual: '明るいオレンジ(#ff6b35), 青(#3b82f6), 緑(#10b981), ピンク(#ec4899)',
            minimal: 'グレー(#6b7280), 黒(#1f2937), 紺(#2563eb), ダークグリーン(#065f46)'
        };

        const systemPrompt = `あなたは世界最高峰のWebデザイナーです。
構成案に基づき、各パーツの「最適なバリアント」と「装飾」を決定してください。

【重要】Hero(メインビジュアル)の扱い
- heroは「heroConfig」として別管理されています
- 「sections」配列には hero を含めないでください

【入力データ】
${JSON.stringify(sitemapData, null, 2)}

【戦略のトーン】
キーワード: ${toneKeywords.join(', ')}
推奨スタイル: ${toneStyle}

【各セクションタイプの利用可能デザイン】
${sectionGuide}

【プロのデザイナーの鉄則】
1. **余白の美学**: すべてのセクションに pt-32 または pt-24 を設定
2. **色のリズム（最重要）**: backgroundColor を必ず交互に変更
   - 奇数セクション(1,3,5...): #ffffff (白)
   - 偶数セクション(2,4,6...): #f9f9f9 (ライトグレー)
3. **境界の装飾**: 背景色が変わる箇所の dividerBottom に "curve" または "wave" を指定
4. **バリアント選定**: 上記の推奨デザインを優先
5. **アクセントカラー**: ${toneStyle}スタイルに合った色を選択
   推奨: ${accentColorGuide[toneStyle]}

【出力スキーマ】
{
  "siteTitle": "${sitemapData.siteTitle}",
  "design": {
    "colors": { 
      "background": "#ffffff", 
      "text": "#2d2d2d", 
      "accent": "#適切な色" 
    },
    "typography": { 
      "fontFamily": "${toneStyle === 'luxury' ? 'serif' : 'sans'}" 
    }
  },
  "heroConfig": {
    "heroHeight": 90,
    "heroOverlayOpacity": 0.4,
    "title": "魅力的なメインタイトル",
    "subtitle": "サブキャッチコピー"
  },
  "sections": [
    {
      "id": 1,
      "type": "problem_checklist",
      "design": "soft-check",
      "pt": "pt-32",
      "pb": "pb-24",
      "backgroundColor": "#ffffff",
      "dividerBottom": "curve",
      "dividerBottomColor": "#f9f9f9"
    },
    ...
  ]
}

【重要】sections配列は入力データと同じ順序・同じidで出力してください`;

        const result = await aiService._callGemini(apiKey, systemPrompt, `Strategy:\n${JSON.stringify(strategyData)}`);

        // 防御壁2: Phase 3直後にもクリーンアップ + 背景色の交互配置を強制
        if (result.sections) {
            result.sections = result.sections.filter(s => s.type !== 'hero');

            // 背景色の交互配置を強制
            result.sections = result.sections.map((s, idx) => ({
                ...s,
                backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f9f9f9',
                dividerBottom: s.dividerBottom || (idx % 2 === 0 ? 'curve' : 'wave'),
                dividerBottomColor: idx % 2 === 0 ? '#f9f9f9' : '#ffffff'
            }));
        }

        return result;
    },

    // Phase 4: ビジュアル選定
    generateVisuals: async (designData, originalPrompt, imageMode = 'library') => {
        const apiKey = aiService.getApiKey();

        // セクションごとの画像要件を整形
        const imageGuide = designData.sections.map((s, idx) => {
            const info = SECTION_DESIGN_CATALOG[s.type] || {};

            if (!info.imageRequired && !info.itemsImageRequired) {
                return `セクション${s.id} (${s.type}): 画像不要`;
            }

            if (info.itemsImageRequired) {
                return `セクション${s.id} (${s.type}): 各item (約3-5個) に画像が必要`;
            }

            if (info.imageRequired) {
                return `セクション${s.id} (${s.type}): メイン画像1枚が必要`;
            }

            return `セクション${s.id} (${s.type}): 画像任意`;
        }).join('\n');

        const systemPrompt = `あなたはプロのアートディレクターです。
各セクションに必要な画像を、セクションタイプと商品内容に応じて最適に配置してください。

【最重要】入力データの構造を絶対に変更しないでください
- siteTitle, design, heroConfig をそのまま保持
- sections配列の各セクションの type, design, pt, pb, backgroundColor, dividerBottom などをそのまま保持
- あなたがやることは imageConfig を追加するだけです

【商品/サービス情報】
${originalPrompt}

【入力データ】
${JSON.stringify(designData, null, 2)}

【各セクションの画像要件】
${imageGuide}

【利用可能な画像カテゴリ】
- cafe: カフェ、喫茶店、飲食店、抹茶、コーヒー
- salon: 美容院、サロン、エステ、リラクゼーション
- business: オフィス、会議、チーム、ビジネスシーン
- gym: フィットネス、ジム、運動、トレーニング
- corporate: 企業、ビル、プロフェッショナル
- restaurant: レストラン、料理、食事
- education: 教育、学習、セミナー
- tech: テクノロジー、IT、デジタル
- default: その他一般

【画像配置の重要ルール】

1. **heroConfig の画像**:
   商品/サービスの世界観を表現する印象的なメイン画像を選定
   keywords は英語で具体的に（例: "premium matcha tea ceremony elegant minimalist"）

2. **columns, review, post_card, process, staff** など items を持つセクション:
   imageConfig を1つ指定（システムが自動で各itemに variation を生成）
   keywords はセクション全体のテーマを英語で記述

3. **image_text, conversion_panel, video, image** など単一画像型:
   そのセクションの内容を補完する1枚の画像を選定

4. **faq, pricing, problem_checklist, button, heading** など画像不要型:
   imageConfig を追加しない

【出力形式】
入力データの全フィールドを保持し、必要なセクションにのみ imageConfig を追加してください。

【禁止事項】
- ❌ type, design, pt, pb, backgroundColor, dividerBottom を変更・削除すること
- ❌ sections の順序を変えること
- ❌ 画像不要なセクションに無理やり imageConfig を追加すること`;

        const resultWithQueries = await aiService._callGemini(
            apiKey,
            systemPrompt,
            `商品詳細: ${originalPrompt}`
        );

        // マージ処理: designDataの構造を確実に保持
        const mergedResult = {
            ...designData,
            heroConfig: {
                ...designData.heroConfig,
                imageConfig: resultWithQueries.heroConfig?.imageConfig
            },
            sections: designData.sections.map((designSection, idx) => {
                const visualSection = resultWithQueries.sections?.[idx] || {};
                return {
                    ...designSection,
                    imageConfig: visualSection.imageConfig
                };
            })
        };

        return await aiService._finalizeImages(mergedResult, designData, imageMode);
    },

    // Phase 5: 戦略的セールスライティング
    generateCopywriting: async (visualsData, originalPrompt, strategyData) => {
        const apiKey = aiService.getApiKey();
        const strategy = strategyData.strategy;

        const systemPrompt = `あなたは世界最高峰のセールスライターです。
戦略に基づき、読者の心を動かし、成約へと導く「最強のコピー(日本語)」を執筆してください。

【戦略】
Target: ${strategy.target}
Approach: ${strategy.approach}

【最重要】入力データの構造を絶対に変更しないでください
- siteTitle, design, heroConfig を保持
- sections配列の各セクションの type, design, pt, pb, backgroundColor, imageConfig を保持
- あなたがやることは title, content, items[].title, items[].content などのテキストを書くだけです

【入力データ】
${JSON.stringify(visualsData, null, 2)}

【あなたがやること】
1. heroConfig.content を追加（任意）
2. 各セクションに title, content を追加
3. items配列がある場合、各itemの title, content, question, answer 等を書く（構造は保持）

【禁止事項】
- ❌ type を変更すること
- ❌ design を変更すること
- ❌ imageConfig を削除すること
- ❌ items配列を削除すること
- ❌ pt, pb, backgroundColor, dividerBottom などを削除すること`;

        const result = await aiService._callGemini(apiKey, systemPrompt, `Original Request: ${originalPrompt}`);

        // 緊急パッチ: Phase 5でも構造とビジュアル属性（bgImageなど）を保持
        const repairedResult = {
            ...visualsData,
            ...result,
            // heroConfig のビジュアル属性を明示的に保護
            heroConfig: {
                ...visualsData.heroConfig,
                ...(result.heroConfig || {}),
                bgImage: visualsData.heroConfig?.bgImage, // Phase 4で決定した画像を最優先
                imageConfig: visualsData.heroConfig?.imageConfig,
                heroHeight: visualsData.heroConfig?.heroHeight,
                heroWidth: visualsData.heroConfig?.heroWidth,
                heroOverlayOpacity: visualsData.heroConfig?.heroOverlayOpacity,
            },
            sections: visualsData.sections.map((visualSection, idx) => {
                const copiedSection = result.sections?.[idx] || {};
                return {
                    ...visualSection,
                    ...copiedSection,
                    // ビジュアル属性を優先的に保護（AIが消してしまうのを防ぐ）
                    type: visualSection.type,
                    design: visualSection.design,
                    imageConfig: visualSection.imageConfig,
                    image: visualSection.image, // Phase 4で確定した通常画像
                    bgImage: visualSection.bgImage,
                    bgType: visualSection.bgType,
                    bgValue: visualSection.bgValue,
                    pt: visualSection.pt,
                    pb: visualSection.pb,
                    backgroundColor: visualSection.backgroundColor,
                    dividerTop: visualSection.dividerTop,
                    dividerTopColor: visualSection.dividerTopColor,
                    dividerBottom: visualSection.dividerBottom,
                    dividerBottomColor: visualSection.dividerBottomColor
                };
            })
        };

        return repairedResult;
    },

    // Helper: Call Gemini
    _callGemini: async (apiKey, sys, user) => {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                system_instruction: { parts: [{ text: sys }] },
                contents: [{ role: "user", parts: [{ text: user }] }],
                generationConfig: { response_mime_type: "application/json" }
            })
        });

        if (!response.ok) {
            const errBody = await response.json();
            console.error("Gemini API Error Detail:", errBody);

            if (response.status === 401) {
                throw new Error('Gemini API Error: 認証に失敗しました。APIキーが正しいか、または有効期限が切れていないか確認してください。');
            }
            if (response.status === 404) {
                throw new Error('Gemini API Error: モデルが見つかりません。設定を確認してください。');
            }
            throw new Error(`Gemini API Error: ${errBody.error?.message || '不明なエラーが発生しました'}`);
        }

        const data = await response.json();
        if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
            throw new Error("Gemini API Error: AIからの回答が空でした。プロンプトを調整してください。");
        }
        let text = data.candidates[0].content.parts[0].text;

        console.log("Gemini Raw Response:", text);

        try {
            const parsedData = JSON.parse(text);
            if (parsedData.sections) {
                const beforeCleanup = parsedData.sections.length;
                parsedData.sections = aiService._earlyHeroCleanup(parsedData.sections);
                if (parsedData.sections.length < beforeCleanup) {
                    console.warn(`[_callGemini Cleanup] Removed ${beforeCleanup - parsedData.sections.length} hero section(s)`);
                }
            }
            return parsedData;
        } catch (e) {
            const jsonMatch = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
            if (jsonMatch) {
                try {
                    const parsedData = JSON.parse(jsonMatch[0]);
                    if (parsedData.sections) {
                        parsedData.sections = aiService._earlyHeroCleanup(parsedData.sections);
                    }
                    return parsedData;
                } catch (parseErr) {
                    console.error("Regex match failed to parse:", parseErr);
                }
            }
            throw new Error("Invalid JSON response from AI");
        }
    },

    _earlyHeroCleanup: (sections) => {
        if (!sections || !Array.isArray(sections)) return [];
        return sections.filter(s => {
            if (s.type === 'hero') {
                console.warn(`[Early Cleanup] Removing hero section (id: ${s.id}) before processing`);
                return false;
            }
            return true;
        });
    },

    _validateAndRepairSections: (sections) => {
        if (!sections || !Array.isArray(sections)) return [];
        return sections.map(s => {
            if (s.type === 'hero') {
                console.error("[CRITICAL] Hero section reached _validateAndRepairSections - early cleanup failed!");
                return null;
            }

            if (ALLOWED_SECTION_TYPES.includes(s.type)) {
                return s;
            }

            if (TYPE_ALIASES[s.type]) {
                console.warn(`[AI Repair] Converted alias '${s.type}' to '${TYPE_ALIASES[s.type]}'`);
                return { ...s, type: TYPE_ALIASES[s.type] };
            }

            console.warn(`[AI Repair] Applying design defaults to section ${s.id}`);

            const repaired = {
                ...s,
                type: s.type || 'text',
                pt: s.pt || 'pt-24',
                pb: s.pb || 'pb-24',
                design: s.design || (s.type === 'pricing' ? 'modern' : s.type === 'review' ? 'bubble' : 'simple')
            };

            if (ALLOWED_SECTION_TYPES.includes(repaired.type)) return repaired;
            return { ...repaired, type: 'text', content: s.content || "Content Error" };
        }).filter(s => s);
    },

    // Helper: Finalize Images (キーワード検索優先 + 背景画像自動判定)
    _finalizeImages: async (visualsResult, designData, globalImageMode = 'library') => {
        const data = { ...designData, ...visualsResult };

        const defaultImageConfig = (section) => ({
            category: 'business',
            keywords: `${section.type} ${section.title || section.heading || ''}`.trim()
        });

        const processImageConfig = async (config, index = 0) => {
            if (!config) return null;
            const mode = config.mode || globalImageMode;

            if (mode === 'library') {
                // keywords がある場合：Unsplash API(確定URL) を最優先
                if (config.keywords) {
                    console.log(`[Image] Using keyword search: "${config.keywords}" (Unsplash API preferred)`);

                    const apiUrl = await aiService._getUnsplashImageUrlByKeywords(config.keywords, { w: 1600, q: 80 });
                    if (apiUrl) {
                        console.log(`[Image] Unsplash API resolved: ${apiUrl.substring(0, 80)}...`);
                        return apiUrl;
                    }

                    const category = UNSPLASH_LIBRARY[config.category] ? config.category : 'default';
                    const candidates = UNSPLASH_LIBRARY[category];
                    const fallback = candidates[index % candidates.length];
                    console.log(`[Image] Fallback (library) resolved: ${fallback}`);
                    return fallback;
                }

                // keywordsが無い場合のみ固定ライブラリから選択
                const category = UNSPLASH_LIBRARY[config.category] ? config.category : 'default';
                const candidates = UNSPLASH_LIBRARY[category];
                return candidates[index % candidates.length];
            }

            if (mode === 'generate' || mode === 'ai') {
                try {
                    const openaiKey = aiService.getOpenAIKey();
                    if (!openaiKey) throw new Error("API_KEY_MISSING_OPENAI");

                    const keywords = index > 0 ? `${config.keywords} variation ${index}` : config.keywords;
                    const res = await aiService.generateImageOpenAI(openaiKey, keywords, "photorealistic");
                    return res?.url || null;
                } catch (e) {
                    console.warn("Image Gen Failed, fallback", e);
                    if (config.keywords) {
                        const apiUrl = await aiService._getUnsplashImageUrlByKeywords(config.keywords, { w: 1600, q: 80 });
                        if (apiUrl) return apiUrl;

                        const category = UNSPLASH_LIBRARY[config.category] ? config.category : 'default';
                        const candidates = UNSPLASH_LIBRARY[category] || UNSPLASH_LIBRARY['default'];
                        return candidates[index % candidates.length];
                    }
                    const candidates = UNSPLASH_LIBRARY[config.category || 'default'] || UNSPLASH_LIBRARY['default'];
                    return candidates[index % candidates.length];
                }
            }

            return null;
        };

        // Process Sections with Forced Generation Logic
        const sections = await Promise.all(data.sections.map(async (s) => {
            const rule = SECTION_REGISTRY[s.type] || {};
            const catalogInfo = SECTION_DESIGN_CATALOG[s.type];
            const newStyle = { ...(s.style || {}) };
            let newImage = { ...(s.image || {}) };

            // 1. Forced Background Image (if required by rule)
            if (rule.bgImageRequired && !s.bgImage && !newStyle.bgImage) {
                console.log(`[Forced Image] Generating background for ${s.type}`);
                const bgUrl = await processImageConfig(s.imageConfig || defaultImageConfig(s));
                if (bgUrl) {
                    s.bgType = 'image';
                    s.bgValue = bgUrl;
                    newStyle.bgImage = `url('${bgUrl}')`;
                    newStyle.backgroundImage = `url('${bgUrl}')`;
                    newStyle.backgroundSize = 'cover';
                    newStyle.backgroundPosition = 'center';
                }
            }

            // AIの幻覚対策
            if (s.image?.src && !s.image?.url) {
                newImage = { ...s.image, url: s.image.src };
            }

            // 2. Forced Section Image (if required by rule)
            const needsMainImage = rule.imageRequired || catalogInfo?.imageRequired;
            if (needsMainImage && !newImage.url) {
                console.log(`[Forced Image] Generating section image for ${s.type}`);
                const imageUrl = await processImageConfig(s.imageConfig || defaultImageConfig(s));
                if (imageUrl) {
                    newImage = { url: imageUrl, alt: s.imageConfig?.keywords || s.title || '' };
                }
            }

            const shouldUseBgImage = ['conversion_panel', 'video'].includes(s.type);

            if (!s.imageConfig && !needsMainImage && !shouldUseBgImage) {
                return { ...s, style: newStyle, image: newImage };
            }

            // Existing logic for explicit imageConfig
            if (s.imageConfig && !newImage.url && (needsMainImage || shouldUseBgImage)) {
                const imageUrl = await processImageConfig(s.imageConfig);

                if (imageUrl) {
                    if (shouldUseBgImage || s.bgType === 'image') {
                        // 背景画像として適用
                        newStyle.bgImage = `url('${imageUrl}')`;
                        newStyle.backgroundImage = `url('${imageUrl}')`;
                        newStyle.backgroundSize = 'cover';
                        newStyle.backgroundPosition = 'center';
                        s.bgType = 'image';
                        s.bgValue = imageUrl;
                    } else {
                        // 通常の画像として適用
                        newImage = { url: imageUrl, alt: s.imageConfig?.keywords || '' };
                    }
                }
            }

            // ✅ items への画像配布はここでは行わない（Phase 5後に実行）

            return {
                ...s,
                style: newStyle,
                image: newImage.url ? newImage : (s.image || {})
            };
        }));

        // Process Hero
        if (data.heroConfig?.image?.src && !data.heroConfig?.image?.url) {
            data.heroConfig.image.url = data.heroConfig.image.src;
        }

        let heroImageFallback = data.heroImageFallback;
        if (data.heroConfig?.imageConfig) {
            const heroUrl = await processImageConfig(data.heroConfig.imageConfig);
            if (heroUrl) {
                heroImageFallback = heroUrl;
                if (data.heroConfig) data.heroConfig.bgImage = heroUrl;
            }
        } else if (data.heroConfig?.bgImage) {
            heroImageFallback = data.heroConfig.bgImage;
        }

        return { ...data, sections, heroImageFallback };
    },

    // Legacy/Wrapper for single call
    generateLP: async (prompt, tuning) => {
        console.log("[AI Pipeline] Starting 5-Stage Professional Process...");

        try {
            const strategy = await aiService.generateStrategy(prompt, tuning);
            console.log("[Phase 1] Strategy:", strategy.strategy.toneKeywords);

            const sitemap = await aiService.generateSitemap(strategy, prompt);
            console.log("[Phase 2] Selected sections:", sitemap.sections.map(s => s.type));

            const design = await aiService.generateDesignArchitecture(sitemap, strategy);
            console.log("[Phase 3] Designs:", design.sections.map(s => ({
                type: s.type,
                design: s.design,
                bgColor: s.backgroundColor
            })));

            const visuals = await aiService.generateVisuals(design, prompt, tuning?.imageMode || 'library');
            console.log("[Phase 4] Images:", visuals.sections.map(s => ({
                type: s.type,
                hasImageConfig: !!s.imageConfig
            })));

            const finalData = await aiService.generateCopywriting(visuals, prompt, strategy);
            console.log("[Phase 5] Final sections:", finalData.sections.map(s => s.type));

            // ✅ 正規化: speech_bubble の bubbles を items に寄せる（画像配布の対象にする）
            finalData.sections = (finalData.sections || []).map((s) => {
                if (!s) return s;

                // bubbles -> items へ正規化
                if (!s.items && Array.isArray(s.bubbles)) {
                    return {
                        ...s,
                        items: s.bubbles.map(b => ({
                            ...b,
                            image: (b?.image && typeof b.image === 'object' && b.image.url)
                                ? { url: b.image.url, alt: b.image.alt || b.name || '' }
                                : (typeof b?.image === 'string' && b.image)
                                    ? { url: b.image, alt: b.name || '' }
                                    : undefined
                        }))
                    };
                }

                return s;
            });

            // ✅ ここで items への画像配布
            console.log("[Post-Phase 5] Starting item image distribution...");
            try {
                finalData.sections = await aiService._distributeItemImages(finalData.sections);
                // 最終正規化: 全てのアイテム画像をオブジェクト形式に統一
                finalData.sections = aiService._normalizeItemImageShape(finalData.sections);
                console.log("[Post-Phase 5] Item image distribution and normalization complete!");
            } catch (distError) {
                console.error("[Post-Phase 5] ERROR during item distribution:", distError);
            }

            // 正規化処理
            // 最終的なUI用オブジェクトの構築
            const normalized = {
                siteTitle: finalData.siteTitle,
                pageBgType: 'color',
                pageBgValue: finalData.design?.colors?.background || '#ffffff',
                textColor: finalData.design?.colors?.text || '#2d2d2d',
                accentColor: finalData.design?.colors?.accent || '#3b82f6',
                fontFamily: finalData.design?.typography?.fontFamily || 'sans',
                // Heroデータの優先順位を整理
                heroTitle: finalData.heroConfig?.title || finalData.siteTitle,
                heroSubtitle: finalData.heroConfig?.subtitle || '',
                heroUrl: finalData.heroConfig?.bgImage || finalData.heroImageFallback,
                heroType: finalData.heroConfig?.type || 'image',
                heroHeight: finalData.heroConfig?.heroHeight || 90,
                heroWidth: finalData.heroConfig?.heroWidth || 100,
                heroOverlayOpacity: finalData.heroConfig?.heroOverlayOpacity || 0.4,
                heroBlur: finalData.heroConfig?.blur || 0,
                heroPositionX: finalData.heroConfig?.positionX || 50,
                heroPositionY: finalData.heroConfig?.positionY || 50,
                heroImageFallback: finalData.heroImageFallback,
                sections: aiService._validateAndRepairSections(finalData.sections)
            };

            console.log("[Generate LP] Complete! Sections:", normalized.sections.map(s => s.type));

            return normalized;

        } catch (error) {
            console.error("[AI Pipeline] ERROR:", error);
            throw error;
        }
    },

    // Helper: Phase 5後に items に画像を配布（items / bubbles 両対応 + imageオブジェクト統一）
    _distributeItemImages: async (sections) => {
        console.log("[_distributeItemImages] Starting... sections count:", sections?.length || 0);

        const usedUrls = new Set();

        const processImageConfig = async (config, index = 0, retryUnique = 0) => {
            if (!config) {
                console.warn("[processImageConfig] No config provided");
                return null;
            }

            const keywords = config.keywords;
            if (keywords) {
                // To get unique images, we append a seed or retry count to the keywords
                const uniqueKeywords = retryUnique > 0 ? `${keywords} variant ${retryUnique} ${Math.floor(Math.random() * 1000)}` : keywords;
                console.log(`[processImageConfig] Keyword search: "${uniqueKeywords}" (Unsplash API)`);

                const apiUrl = await aiService._getUnsplashImageUrlByKeywords(uniqueKeywords, { w: 1200, q: 80 });
                if (apiUrl && !usedUrls.has(apiUrl)) {
                    console.log(`[processImageConfig] Unsplash API resolved -> ${apiUrl.substring(0, 80)}...`);
                    usedUrls.add(apiUrl);
                    return apiUrl;
                }

                // If the URL was already used and we haven't retried too many times, try again with more specific keywords
                if (retryUnique < 2 && apiUrl) {
                    return processImageConfig(config, index, retryUnique + 1);
                }

                // Library Fallback with cache buster seed (index based)
                const category = UNSPLASH_LIBRARY[config.category] ? config.category : 'default';
                const candidates = UNSPLASH_LIBRARY[category] || UNSPLASH_LIBRARY.default;
                let fallback = candidates[index % candidates.length];

                // Add unique cache buster if possible
                if (fallback.includes('?')) {
                    fallback += `&sig=${index}-${Math.floor(Math.random() * 1000)}`;
                }

                console.log(`[processImageConfig] Fallback (library) -> ${fallback}`);
                return fallback;
            }

            const category = UNSPLASH_LIBRARY[config.category] ? config.category : 'default';
            const candidates = UNSPLASH_LIBRARY[category];
            let fallback = candidates[index % candidates.length];
            if (fallback.includes('?')) {
                fallback += `&sig=${index}-${Math.floor(Math.random() * 1000)}`;
            }
            return fallback;
        };

        const hasImage = (img) => {
            if (!img) return false;
            if (typeof img === 'string') return img.trim().length > 0;
            if (typeof img === 'object' && img !== null) return !!(img.url || img.src);
            return false;
        };

        const normalizeImageObj = (img, fallbackAlt = '') => {
            if (!img) return undefined;
            if (typeof img === 'string') return { url: img, alt: fallbackAlt };
            if (typeof img === 'object' && img.url) return { url: img.url, alt: img.alt || fallbackAlt };
            if (typeof img === 'object' && img.src) return { url: img.src, alt: img.alt || fallbackAlt };
            return undefined;
        };

        const processedSections = await Promise.all(sections.map(async (s, sectionIdx) => {
            console.log(`[_distributeItemImages] Processing section ${sectionIdx + 1}/${sections.length}: ${s.type}`);

            const catalogInfo = SECTION_DESIGN_CATALOG[s.type];

            if (!catalogInfo) {
                console.warn(`[_distributeItemImages] No catalog info for type: ${s.type}`);
                return s;
            }

            console.log(`[_distributeItemImages] ${s.type} - itemsImageRequired:`, catalogInfo.itemsImageRequired);
            console.log(`[_distributeItemImages] ${s.type} - has items:`, !!s.items);
            console.log(`[_distributeItemImages] ${s.type} - items count:`, s.items?.length || 0);

            // 対象配列を決める：items があれば items、なければ bubbles
            const itemsArray = Array.isArray(s.items) ? s.items : (Array.isArray(s.bubbles) ? s.bubbles : null);

            if (!catalogInfo.itemsImageRequired) {
                console.log(`[_distributeItemImages] ${s.type} - skipping (no itemsImageRequired)`);
                return s;
            }

            if (!itemsArray) {
                console.log(`[_distributeItemImages] ${s.type} - skipping (no items/bubbles array)`);
                return s;
            }

            // imageConfig がない場合はスキップ
            if (!s.imageConfig) {
                console.warn(`[Items Images] ${s.type} needs images but has no imageConfig`);
                return s;
            }

            console.log(`[Items Images] Processing ${itemsArray.length} items for ${s.type}`);

            const newItems = await Promise.all(itemsArray.map(async (item, idx) => {
                const label = item?.title || item?.name || `item${idx + 1}`;

                if (hasImage(item?.image)) {
                    console.log(`[Items Images] ${s.type} ${label} - already has image (normalize only)`);
                    return {
                        ...item,
                        image: normalizeImageObj(item.image, label)
                    };
                }

                console.log(`[Items Images] ${s.type} ${label} - generating image...`);

                const itemImgUrl = await processImageConfig({
                    ...s.imageConfig,
                    keywords: s.imageConfig?.keywords
                        ? `${s.imageConfig.keywords} variation ${idx + 1}`
                        : undefined
                }, idx + 1);

                return {
                    ...item,
                    image: itemImgUrl ? { url: itemImgUrl, alt: label } : undefined
                };
            }));

            const withImages = newItems.filter(i => hasImage(i.image)).length;
            console.log(`[Items Images] ${s.type}: ${withImages}/${newItems.length} items now have images`);

            const out = { ...s, items: newItems };
            if (Array.isArray(s.bubbles)) {
                out.bubbles = newItems;
            }

            return out;
        }));

        console.log("[_distributeItemImages] Complete!");
        return processedSections;
    },

    // 最終正規化: 全てのアイテム画像をオブジェクト形式に統一
    _normalizeItemImageShape: (sections) => {
        if (!Array.isArray(sections)) return [];
        return sections.map((s) => {
            if (!s) return s;

            const normItems = Array.isArray(s.items)
                ? s.items.map((it) => {
                    if (!it) return it;

                    const url =
                        typeof it.image === "string"
                            ? it.image
                            : it.image?.url || it.image?.src;

                    if (!url) return it;

                    return {
                        ...it,
                        image: {
                            url,
                            alt: it.image?.alt || it.title || it.name || s.title || s.type || "image"
                        }
                    };
                })
                : s.items;

            return { ...s, items: normItems };
        });
    },

    // Single Component Generation
    generateHeroVisual: async (heroData, imageMode = 'library') => {
        const apiKey = aiService.getApiKey();
        const modeInstruction = imageMode === 'ai' ? `"mode": "generate"` : `"mode": "library"`;

        const systemPrompt = `あなたはプロのアートディレクターです。
提供された「メインビジュアル(Hero)」の情報に基づき、最適な画像を選定してください。

【利用可能な画像カテゴリ】
- salon, business, gym, cafe, corporate, restaurant, education, tech, default

【出力ルール】
JSONのみを返してください。
{
  "imageConfig": {
     ${modeInstruction},
     "category": "適切なカテゴリ",
     "keywords": "english keywords"
  }
}`;
        const userInput = `Title: ${heroData.title}\nSubtitle: ${heroData.subtitle}`;

        try {
            const result = await aiService._callGemini(apiKey, systemPrompt, userInput);
            const config = result.imageConfig;

            if (config.mode === 'library') {
                if (config.keywords) {
                    const apiUrl = await aiService._getUnsplashImageUrlByKeywords(config.keywords);
                    if (apiUrl) return apiUrl;

                    const category = UNSPLASH_LIBRARY[config.category] ? config.category : 'default';
                    const candidates = UNSPLASH_LIBRARY[category] || UNSPLASH_LIBRARY.default;
                    return candidates[Math.floor(Math.random() * candidates.length)];
                }
                const category = UNSPLASH_LIBRARY[config.category] ? config.category : 'default';
                const candidates = UNSPLASH_LIBRARY[category];
                return candidates[Math.floor(Math.random() * candidates.length)];
            } else {
                console.log("Generating Single Hero Image via AI...");
                try {
                    const openaiKey = aiService.getOpenAIKey();
                    if (!openaiKey) throw new Error("OpenAI API Key Missing");

                    const res = await aiService.generateImageOpenAI(openaiKey, config.keywords, "photorealistic");
                    return res?.url || null;
                } catch (e) {
                    console.warn("Manual AI Gen failed, fallback to library");
                    if (config.keywords) {
                        const apiUrl = await aiService._getUnsplashImageUrlByKeywords(config.keywords);
                        if (apiUrl) return apiUrl;

                        const category = UNSPLASH_LIBRARY[config.category] ? config.category : 'default';
                        const candidates = UNSPLASH_LIBRARY[category] || UNSPLASH_LIBRARY.default;
                        return candidates[Math.floor(Math.random() * candidates.length)];
                    }
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
