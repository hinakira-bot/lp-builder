export const DEFAULT_DATA = {
    siteTitle: 'LOVERS & CO.',
    pageBgType: 'color',
    pageBgValue: '#ffffff',
    textColor: '#333333',
    fontFamily: 'serif',
    fontSize: {
        heroTitle: 4.5,
        heroSubtitle: 0.875,
        sectionTitle: 2.25,
        body: 1,
    },
    header: {
        style: 'overlay', // or 'solid'
        bgValue: '#ffffff',
        textColor: '#333333',
        logoUrl: '',
        logoHeight: 40,
    },
    menuItems: [
        { id: 1, label: 'Top', url: '#' },
        { id: 2, label: 'Concept', url: '#section-1' },
        { id: 3, label: 'News', url: '#section-4' },
        { id: 4, label: 'Contact', url: '#footer' },
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
    heroTitle: 'SIMPLE & NATURAL',
    heroSubtitle: '自然体でいることの贅沢。\n風のような軽やかさと、洗練された日常をあなたに。',
    sections: [
        {
            id: 1,
            type: 'heading',
            text: 'Our Philosophy',
            subText: '私たちの想い',
            style: 'center',
            design: 'simple',
            pt: 'pt-24',
            pb: 'pb-12',
            boxStyle: 'none',
            bgType: 'color',
            bgValue: '#f9fafb',
            dividerBottom: 'wave',
            dividerBottomColor: '#ffffff'
        },
        {
            id: 2,
            type: 'image_text',
            image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop',
            title: '素材へのこだわり',
            content: '私たちは、自然由来の素材にこだわり、\n肌に優しく、環境にも配慮した製品作りを心がけています。\n\n長く使うほどに馴染む、そんな体験をお届けします。',
            imagePosition: 'left',
            pt: 'pt-20',
            pb: 'pb-20',
            boxStyle: 'none',
            bgType: 'color',
            bgValue: '#ffffff'
        },
        {
            id: 3,
            type: 'video',
            url: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
            caption: 'Brand Movie',
            pt: 'pt-24',
            pb: 'pb-24',
            boxStyle: 'none',
            bgType: 'image',
            bgValue: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=2574&auto=format&fit=crop',
            bgOverlay: 0.7,
            dividerTop: 'tilt-left',
            dividerTopColor: '#ffffff',
            dividerBottom: 'tilt-right',
            dividerBottomColor: '#ffffff'
        },
        {
            id: 4,
            type: 'heading',
            text: 'Latest News',
            subText: '最新情報',
            style: 'center',
            design: 'underline',
            pt: 'pt-20',
            pb: 'pb-8',
            boxStyle: 'none',
            bgType: 'color',
            bgValue: '#ffffff'
        },
        {
            id: 5,
            type: 'social',
            platform: 'twitter',
            url: 'https://twitter.com/SpaceX/status/1856890374974914755',
            pt: 'pt-4',
            pb: 'pb-20',
            boxStyle: 'none',
            bgType: 'color',
            bgValue: '#ffffff'
        },
        {
            id: 6,
            type: 'box',
            style: 'shadow',
            title: 'キャンペーン情報',
            content: '期間中にオンラインストアでご購入いただいた方全員に、\nオリジナルポーチをプレゼントいたします。\nこの機会にぜひご利用ください。',
            pt: 'pt-16',
            pb: 'pb-16',
            boxStyle: 'shadow',
            bgType: 'color',
            bgValue: '#f3f4f6'
        },
        {
            id: 7,
            type: 'accordion',
            pt: 'pt-20',
            pb: 'pb-20',
            boxStyle: 'none',
            bgType: 'color',
            bgValue: '#ffffff',
            items: [
                { id: 1, title: '送料はいくらですか？', content: '全国一律500円（税込）です。10,000円以上のお買い上げで送料無料となります。' },
                { id: 2, title: 'ギフトラッピングは対応していますか？', content: 'はい、対応しております。購入画面にて「ギフトラッピング」オプションを選択してください。' },
            ]
        },
        {
            id: 8,
            type: 'button',
            label: '詳しく見る',
            url: '#feature',
            align: 'center',
            style: 'fill',
            pt: 'pt-10',
            pb: 'pb-24',
            boxStyle: 'none',
            bgType: 'color',
            bgValue: '#ffffff'
        },
        {
            id: 85,
            type: 'speech_bubble',
            characterImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop',
            characterName: '店長',
            text: '店長の鈴木です！\nこの商品は本当にこだわって作りました。\nぜひ手にとってみてください！',
            align: 'left',
            bubbleColor: '#f3f4f6'
        },
        {
            id: 9,
            type: 'problem_checklist',
            title: 'こんなお悩みありませんか？',
            items: [
                { text: '既存のLPでは効果が出ない' },
                { text: 'スマホで見るとデザインが崩れる' },
                { text: '制作コストが高すぎる' }
            ],
            pt: 'pt-16',
            pb: 'pb-16'
        },
        {
            id: 10,
            type: 'point_list',
            items: [
                { id: 1, title: 'スマホ特化デザイン', desc: 'モバイルファーストで設計されたUIで、スマホユーザーの離脱を防ぎます。', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1740&auto=format&fit=crop' },
                { id: 2, title: '強力なCVパネル', desc: '画面下部に追従するコンバージョンボタンで、機会損失をゼロにします。', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop' }
            ],
            pt: 'pt-24',
            pb: 'pb-24'
        },
        {
            id: 11,
            type: 'pricing',
            design: 'featured',
            plans: [
                { id: 1, name: 'ベーシック', price: '¥9,800', period: '/月', features: ['独自ドメイン', '基本テンプレート', '月1回更新'], buttonText: '申し込む', isFeatured: false },
                { id: 2, name: 'スタンダード', price: '¥19,800', period: '/月', features: ['独自ドメイン', 'フルカスタマイズ', '週1回更新', 'SEO対策'], buttonText: '一番人気', isFeatured: true },
                { id: 3, name: 'プレミアム', price: '¥49,800', period: '/月', features: ['独自ドメイン', 'フルカスタマイズ', '毎日更新', '広告運用代行'], buttonText: 'お問い合わせ', isFeatured: false }
            ],
            pt: 'pt-24',
            pb: 'pb-24',
            bgType: 'color',
            bgValue: '#f8fafc'
        },
        {
            id: 12,
            type: 'conversion_panel',
            title: '＼ 今ならこの価格 ／',
            isSticky: true,
            microCopy: '※キャンペーンは予告なく終了します',
            buttons: [
                { label: '今すぐ申し込む', url: '#', color: 'orange', icon: 'cart' },
                { label: 'LINEで相談する', url: '#', color: 'green', icon: 'line' }
            ]
        }
    ],
    floatingCta: {
        enabled: true,
        text: '無料相談はこちら',
        url: '#contact',
        bgColor: '#ef4444',
        textColor: '#ffffff'
    }
};
