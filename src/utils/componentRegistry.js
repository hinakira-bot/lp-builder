// Single Source of Truth for Section Components
// used by both the Renderer (SectionDispatcher) and the AI Service (Constraint)

export const SECTION_REGISTRY = {
    // Standard Configurable Sections
    // Note: 'hero' is excluded from sections as it is handled via heroConfig (Main Visual)

    // --- Conversion & Sales ---
    conversion_panel: {
        name: "CVパネル (強力)",
        category: "conversion",
        description: "予約・購入ボタンとマイクロコピー",
        tags: ["cta", "conversion", "essential"],
        bgImageRequired: true,
    },
    pricing: {
        name: "料金プラン",
        category: "business",
        description: "価格表とプラン比較",
        tags: ["sales", "money", "comparison", "essential"]
    },

    // --- Business Content ---
    problem_checklist: {
        name: "悩みリスト",
        category: "business",
        description: "ユーザーの課題を列挙して共感を呼ぶ",
        tags: ["empathy", "top-funnel", "hook"]
    },
    point_list: {
        name: "特徴リスト",
        category: "business",
        description: "商品の強みやポイントをリスト表示",
        tags: ["features", "benefits", "explanation"]
    },
    process: {
        name: "流れ・プロセス",
        category: "business",
        description: "サービスの利用手順 (Step 1, 2...)",
        tags: ["steps", "how-to", "flow", "onboarding"],
        itemsImageRequired: true,
    },
    staff: {
        name: "スタッフ紹介",
        category: "business",
        description: "メンバーの写真とプロフィール",
        tags: ["trust", "team", "human", "connection"],
        itemsImageRequired: true,
    },
    speech_bubble: {
        name: "ふきだし (口コミ)",
        category: "business",
        description: "信頼性を高める口コミや対話表現",
        tags: ["trust", "reviews", "dialogue"],
        imageRequired: true, // Speaker icon
    },
    faq: {
        name: "よくある質問 (Q&A)",
        category: "business",
        description: "疑問解決のQ&Aリスト",
        tags: ["trust", "objection-handling", "support"]
    },
    comparison: {
        name: "比較表",
        category: "business",
        description: "自社と他社の違いを明確にする表",
        tags: ["sales", "comparison", "superiority"]
    },

    // --- Basic & Layout ---
    access: {
        name: "アクセス (地図)",
        category: "basic",
        description: "Google Mapsと住所情報",
        tags: ["location", "contact", "physical-store"]
    },
    text: { name: "テキスト", category: "basic", description: "シンプルな文章ブロック", tags: ["basic", "flexible"] },
    image: { name: "画像", category: "media", description: "全幅またはボックスの画像配置", tags: ["visual", "flexible"] },
    image_text: { name: "画＆文", category: "media", description: "画像と文章を左右に配置して紹介", tags: ["visual", "explanation", "balanced"], imageRequired: true },
    video: { name: "動画", category: "media", description: "YouTubeまたは動画ファイルの埋め込み", tags: ["visual", "motion", "engagement"] },
    button: { name: "ボタン", category: "basic", description: "単体のリンクボタン", tags: ["navigation", "link"] },
    heading: { name: "見出し", category: "structure", description: "セクション間の区切り", tags: ["structure", "divider"] },
    social: { name: "SNS", category: "media", description: "SNSアイコンリンク", tags: ["contact", "social"] },

    // --- Complex Layouts ---
    review: {
        name: "レビュー (お客様の声)",
        category: "business",
        description: "星評価と顔写真付きの口コミ",
        tags: ["trust", "social-proof", "reviews", "essential"],
        itemsImageRequired: true,
    },
    box: { name: "BOX", category: "layout", description: "枠線や影付きのコンテナ", tags: ["layout", "container"] },
    post_card: { name: "記事", category: "media", description: "ブログ記事風カード", tags: ["content", "news", "list"], imageRequired: true },
    columns: { name: "カラム", category: "layout", description: "アイコン付きの3列レイアウト", tags: ["layout", "list", "grid"], itemsImageRequired: true },
    links: { name: "リンク集", category: "layout", description: "複数のリンクをリスト表示", tags: ["navigation", "list"] },

    // Deprecated / Internal
    accordion: { name: "アコーディオン", category: "business", description: "汎用開閉リスト (FAQ推奨)", tags: ["ui", "utility"] },
};

export const ALLOWED_SECTION_TYPES = Object.keys(SECTION_REGISTRY);

export const TYPE_ALIASES = {
    'benefit_highlight': 'point_list',
    'features_with_icons': 'point_list',
    'features': 'point_list',
    'benefits': 'point_list',
    'introduction': 'text',
    'about_us': 'image_text',
    'process_flow': 'process',
    'step_list': 'process',
    'cta': 'conversion_panel',
    'q_and_a': 'faq',
    'questions': 'faq',
    'testimonials': 'speech_bubble',
    'location': 'access',
    'map': 'access',
    'team': 'staff',
    'profile': 'staff',
    'compare_table': 'comparison'
};
