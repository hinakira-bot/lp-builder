export const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[1].length === 11) ? match[1] : null;
};

export const getImgUrl = (img) => {
    if (!img) return null;
    if (typeof img === "string") return img.trim() || null;
    if (typeof img === "object") {
        // url, src, href の順に優先して取得
        const url = img.url || img.src || img.href;
        return (url && typeof url === 'string') ? url.trim() : null;
    }
    return null;
};

/**
 * セクションの背景画像URLを、考えられる全てのフィールドから安全に抽出する
 */
export const getSectionBgUrl = (section) => {
    if (!section) return null;
    return (
        getImgUrl(section.bgImage) ||
        getImgUrl(section.backgroundImage) ||
        (section.background && getImgUrl(section.background.image)) ||
        (section.style && getImgUrl(section.style.backgroundImage)) ||
        (section.style && getImgUrl(section.style.bgImage))
    );
};

/**
 * デザインパターンに応じた最適なカラーテーマとスタイル定数を返す
 * @param {string} designType 
 * @returns {object} { primary, accent, bg, text, contrast, radius, shadow }
 */
export const getDesignTheme = (designType) => {
    // ユーザー指定の5大カテゴリ
    const themes = {
        // SANGO風 (アース): 柔らかい・親しみやすい
        earth: {
            name: 'earth',
            primary: '#7c8a71', // セージグリーン
            accent: '#d4a373',  // テラコッタ
            bg: '#f5f2ed',      // リネン背景
            text: '#4a3d34',
            contrast: '#ffffff',
            radius: '1.5rem',   // SANGO風の大きな角丸 rounded-2xl-3xl
            font: 'sans-serif',
            shadow: '0 10px 30px -10px rgba(124, 138, 113, 0.2)'
        },
        // SWELL風 (クール): スタイリッシュ・機能美・信頼感
        masculine: {
            name: 'masculine',
            primary: '#1e293b', // ネイビーグレー
            accent: '#2563eb',  // ロイヤルブルー
            bg: '#f8fafc',      // スレート背景
            text: '#0f172a',
            contrast: '#ffffff',
            radius: '0.25rem',  // SWELL風の控えめな角丸 rounded
            font: 'sans-serif',
            shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        },
        // スタイリッシュ: 現代的・鮮やか
        stylish: {
            name: 'stylish',
            primary: '#0f172a', // ミッドナイト
            accent: '#06b6d4',  // シアン
            bg: '#ffffff',
            text: '#1e293b',
            contrast: '#ffffff',
            radius: '0.75rem',  //程よい角丸
            font: 'sans-serif',
            shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
        },
        // ジェントル (優): 女性的・曲線美
        gentle: {
            name: 'gentle',
            primary: '#db2777', // ピンク
            accent: '#fce7f3',  // 薄ピンク
            bg: '#fffafa',      // スノー背景
            text: '#be185d',
            contrast: '#ffffff',
            radius: '2.5rem',   // 特大の丸み
            font: 'sans-serif',
            shadow: '0 15px 40px -10px rgba(219, 39, 119, 0.15)'
        },
        // ラグジュアリー: 高級感・セリフ体
        luxury: {
            name: 'luxury',
            primary: '#111111', // ブラック
            accent: '#c5a059',  // ゴールド
            bg: '#fffdfa',      // オフホワイト
            text: '#222222',
            contrast: '#ffffff',
            radius: '0px',      // シャープ
            font: 'Times New Roman, serif', // セリフ体
            shadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }
    };

    // デザインIDとテーマの紐付け (エイリアス)
    const mapping = {
        // Default
        standard: themes.earth,
        simple: themes.masculine,

        // Earth / SANGO
        earth: themes.earth,
        clean: themes.earth,
        minimal: themes.earth,
        organic: themes.earth,
        timeline: themes.earth, // Processなどで使用

        // Gentle / Sango Soft
        gentle: themes.gentle,
        modern: themes.gentle, // Modernも角丸多めならこっち寄り
        soft: themes.gentle,
        bubble: themes.gentle, // FAQなどで使用

        // Masculine / SWELL Cool
        masculine: themes.masculine,
        bold: themes.masculine,
        dark: themes.masculine,
        box: themes.masculine, // FAQ Box
        cool: themes.masculine,

        // Stylish
        stylish: themes.stylish,
        vivid: themes.stylish,
        gradient: themes.stylish,
        flat: themes.stylish,

        // Luxury
        luxury: themes.luxury,
        elegant: themes.luxury,
        serif: themes.luxury
    };

    return mapping[designType] || themes.earth;
};
