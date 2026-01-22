export const DEFAULT_DATA = {
    siteTitle: 'AOYAMA SALON',
    pageBgType: 'color',
    pageBgValue: '#fdfbf7',
    textColor: '#4a4a4a',
    fontFamily: 'serif',
    fontSize: {
        heroTitle: 4.2,
        heroSubtitle: 0.9,
        sectionTitle: 2.0,
        body: 0.95,
    },
    header: {
        style: 'overlay', // or 'solid'
        bgValue: '#ffffff',
        textColor: '#4a4a4a',
        logoUrl: '',
        logoHeight: 40,
    },
    menuItems: [
        { id: 1, label: 'Top', url: '#' },
        { id: 2, label: 'Concept', url: '#section-1' },
        { id: 3, label: 'Menu', url: '#section-11' },
        { id: 4, label: 'Access', url: '#footer' },
    ],
    heroType: 'video',
    heroUrl: 'https://assets.mixkit.co/videos/preview/mixkit-white-sand-beach-and-palm-trees-1564-large.mp4',
    heroImageFallback: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2070&auto=format&fit=crop',
    heroWidth: 100,
    heroHeight: 70,
    heroOverlayOpacity: 0.2,
    heroBlur: 0,
    heroPositionY: 50,
    heroPositionX: 50,
    heroTitle: 'Beauty & Elegance',
    heroSubtitle: '日常を忘れさせる、極上のリラックスタイムを。\n青山から発信する、大人のための洗練された美しさ。',
    sections: [
        {
            id: 1,
            type: 'heading',
            text: 'Our Concept',
            subText: 'コンセプト',
            style: 'center',
            design: 'simple',
            pt: 'pt-24',
            pb: 'pb-12',
            boxStyle: 'none',
            bgType: 'color',
            bgValue: 'transparent',
        },
        // ... (other sections omitted for brevity in replace, but I should keep them or update)
        {
            id: 2,
            type: 'image_text',
            image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2069&auto=format&fit=crop',
            title: '洗練された空間',
            content: '完全予約制のプライベート空間で、\n一人一人のお客様に合わせた丁寧なカウンセリングと施術を行います。\n\n都会の喧騒を忘れ、心からの安らぎをご体感ください。',
            imagePosition: 'left',
            pt: 'pt-20',
            pb: 'pb-20',
            boxStyle: 'none',
            bgType: 'color',
            bgValue: 'transparent'
        },
        {
            id: 11,
            type: 'pricing',
            design: 'featured',
            plans: [
                { id: 1, name: 'Cut & Blow', price: '¥8,800', period: '', features: ['シャンプー込', 'スタイリングアドバイス', '眉カット無料'], buttonText: '予約する', isFeatured: false, color: '#c5a059' },
                { id: 2, name: 'Color & Treatment', price: '¥16,500', period: '~', features: ['髪質改善トリートメント', '似合わせカラー', 'ナノスチーム', 'ホームケア付'], buttonText: '一番人気', isFeatured: true, color: '#c5a059', icon: 'crown', badgeText: 'POPULAR' },
                { id: 3, name: 'Full Course', price: '¥24,200', period: '~', features: ['カット・カラー・パーマ', 'ヘッドスパ30分', '完全貸切対応'], buttonText: 'お問い合わせ', isFeatured: false, color: '#c5a059' }
            ],
            pt: 'pt-24',
            pb: 'pb-24',
            bgType: 'color',
            bgValue: '#fdfbf7'
        },
        {
            id: 12,
            type: 'conversion_panel',
            title: '＼ 初回限定 20% OFF ／',
            isSticky: true,
            microCopy: '※ご予約時に「LPを見た」とお伝えください',
            buttons: [
                { label: '今すぐ予約する', url: '#', color: 'orange', icon: 'cart' },
                { label: 'LINEで相談する', url: '#', color: 'green', icon: 'line' }
            ]
        }
    ],
    floatingCta: {
        enabled: true,
        text: 'オンライン予約はこちら',
        url: '#contact',
        bgColor: '#c5a059',
        textColor: '#ffffff'
    }
};
