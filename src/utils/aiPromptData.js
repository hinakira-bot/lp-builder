// src/utils/aiPromptData.js

export const SECTION_DESIGN_CATALOG = {
    text: {
        designs: ["simple", "elegant", "bold"],
        imageRequired: false,
        itemsSupport: false,
        description: "シンプルなテキストブロック。見出しと言葉で惹きつけます。"
    },

    columns: {
        designs: ["clean", "card", "card_icon_top", "icon_left", "minimal"],
        imageRequired: false,
        itemsSupport: true,
        itemsImageRequired: true,
        description: "3-4カラムのグリッド。各アイテム（強みや特徴）に画像またはアイコンが必要です。"
    },

    review: {
        designs: ["bubble", "card", "quote", "testimonial"],
        imageRequired: false,
        itemsSupport: true,
        itemsImageRequired: true,
        description: "お客様の声。各レビューに人物写真（アバター）が推奨されます。"
    },

    pricing: {
        designs: ["modern", "card", "comparison", "highlight"],
        imageRequired: false,
        itemsSupport: true,
        itemsImageRequired: false,
        description: "価格表。プランの比較や強調に適しています。画像は不要です。"
    },

    image_text: {
        designs: ["elegant", "overlap_calm", "side_by_side", "full_width"],
        imageRequired: true,
        itemsSupport: false,
        description: "画像とテキストの組み合わせ。大きな1枚の画像でベネフィットを伝えます。"
    },

    post_card: {
        designs: ["magazine", "grid", "masonry"],
        imageRequired: false,
        itemsSupport: true,
        itemsImageRequired: true,
        description: "ブログ記事や事例の紹介。各カードにアイキャッチ画像が必要です。"
    },

    process: {
        designs: ["modern-step", "timeline", "numbered", "vertical"],
        imageRequired: false,
        itemsSupport: true,
        itemsImageRequired: true,
        description: "ステップ（手順）。各ステップに内容を補足する画像があると分かりやすいです。"
    },

    faq: {
        designs: ["simple-accordion", "accordion_minimal", "card"],
        imageRequired: false,
        itemsSupport: true,
        itemsImageRequired: false,
        description: "よくあるご質問。画像は不要です。"
    },

    conversion_panel: {
        designs: ["simple_cta", "premium-offer", "bold"],
        imageRequired: true,
        itemsSupport: false,
        description: "成約への誘導ボタン。商品画像や背景画像が効果的です。"
    },

    problem_checklist: {
        designs: ["soft-check", "icon_modern", "checkbox"],
        imageRequired: false,
        itemsSupport: true,
        itemsImageRequired: false,
        description: "悩み指摘。チェックリスト形式で共感を呼びます。画像は不要です。"
    },

    video: {
        designs: ["fullbleed_overlay", "embed", "player"],
        imageRequired: true,
        itemsSupport: false,
        description: "動画セクション。サムネイル画像の設定が必要です。"
    },

    speech_bubble: {
        designs: ["chat", "dialogue"],
        imageRequired: false,
        itemsSupport: true,
        itemsImageRequired: false,
        description: "吹き出し会話形式。キャラクター画像などはセクションレベルで設定されます。"
    },

    staff: {
        designs: ["card", "grid", "profile"],
        imageRequired: false,
        itemsSupport: true,
        itemsImageRequired: true,
        description: "スタッフ紹介。各メンバーに顔写真が必要です。"
    },

    point_list: {
        designs: ["icon_list", "numbered", "checkmark"],
        imageRequired: false,
        itemsSupport: true,
        itemsImageRequired: false,
        description: "特徴リスト。箇条書きでシンプルに。アイコンのみ、画像は不要です。"
    },

    comparison: {
        designs: ["table", "card_vs", "highlight"],
        imageRequired: false,
        itemsSupport: true,
        itemsImageRequired: false,
        description: "比較表。自社と他社の違いを明確にする表。画像は不要です。"
    },

    access: {
        designs: ["map_embed", "info_card"],
        imageRequired: false,
        itemsSupport: false,
        description: "地図・アクセス情報。Google Maps埋め込み。"
    },

    image: {
        designs: ["full_width", "contained", "rounded"],
        imageRequired: true,
        itemsSupport: false,
        description: "単体画像セクション。1枚の画像を配置します。"
    },

    button: {
        designs: ["primary", "secondary", "outline"],
        imageRequired: false,
        itemsSupport: false,
        description: "単体のリンクボタン。"
    },

    heading: {
        designs: ["simple", "decorated", "underline"],
        imageRequired: false,
        itemsSupport: false,
        description: "見出し・区切り線。セクション間の区切りに使用します。"
    },

    social: {
        designs: ["icon_row", "button_style"],
        imageRequired: false,
        itemsSupport: false,
        description: "SNSアイコンリンク。Twitter、Instagram等へのリンク。"
    },

    box: {
        designs: ["bordered", "shadow", "highlight"],
        imageRequired: false,
        itemsSupport: false,
        description: "枠線や影付きのコンテナ。重要な情報を囲む。"
    },

    links: {
        designs: ["list", "grid", "cards"],
        imageRequired: false,
        itemsSupport: true,
        itemsImageRequired: false,
        description: "リンク集。複数のリンクをリスト表示します。"
    },

    accordion: {
        designs: ["simple", "modern"],
        imageRequired: false,
        itemsSupport: true,
        itemsImageRequired: false,
        description: "アコーディオン。汎用開閉リスト（FAQ推奨）。"
    }
};

export const DESIGN_RECOMMENDATIONS = {
    luxury: {
        columns: "card_icon_top",
        review: "bubble",
        pricing: "modern",
        image_text: "elegant",
        post_card: "magazine",
        process: "modern-step",
        staff: "profile",
        point_list: "icon_list",
        conversion_panel: "premium-offer",
        problem_checklist: "soft-check",
        video: "fullbleed_overlay",
        speech_bubble: "dialogue"
    },
    casual: {
        columns: "icon_left",
        review: "card",
        pricing: "card",
        image_text: "side_by_side",
        post_card: "grid",
        process: "numbered",
        staff: "card",
        point_list: "numbered",
        conversion_panel: "simple_cta",
        problem_checklist: "checkbox",
        video: "embed",
        speech_bubble: "chat"
    },
    minimal: {
        columns: "clean",
        review: "quote",
        pricing: "highlight",
        image_text: "overlap_calm",
        post_card: "masonry",
        process: "timeline",
        staff: "grid",
        point_list: "checkmark",
        conversion_panel: "bold",
        problem_checklist: "icon_modern",
        video: "player",
        speech_bubble: "dialogue"
    }
};
