export const DEFAULT_DATA = {
    siteTitle: 'AOYAMA SALON',
    pageBgType: 'color',
    pageBgValue: '#ffffff',
    textColor: '#2d2d2d',
    accentColor: '#D4AF37', // Gold-ish accent
    fontFamily: 'serif',
    fontSize: {
        heroTitle: 4.5,
        heroSubtitle: 1.0,
        sectionTitle: 2.2,
        body: 0.95,
    },
    header: {
        style: 'overlay',
        bgValue: '#ffffff',
        textColor: '#ffffff',
        logoUrl: '',
    },
    menuItems: [
        { id: 1, label: 'TOP', url: '#' },
        { id: 2, label: 'CONCEPT', url: '#section-1' },
        { id: 3, label: 'SERVICE', url: '#section-3' },
        { id: 4, label: 'REVIEWS', url: '#section-5' },
        { id: 5, label: 'ACCESS', url: '#section-6' },
    ],
    heroType: 'image',
    heroUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2074&auto=format&fit=crop', // Elegant salon interior
    heroImageFallback: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=2070&auto=format&fit=crop',
    heroWidth: 100,
    heroHeight: 90,
    heroOverlayOpacity: 0.4,
    heroBlur: 0,
    heroPositionY: 50,
    heroPositionX: 50,
    heroTitle: 'Eternal Beauty',
    heroSubtitle: '青山の一等地で、あなただけの「美」をデザインする。\n日常を忘れさせる極上のホスピタリティをご体感ください。',
    sections: [
        {
            id: 1,
            type: 'heading',
            text: 'Our Concept',
            subText: 'コンセプト',
            style: 'center',
            design: 'underline',
            pt: 'pt-24',
            pb: 'pb-12',
            bgType: 'color',
            bgValue: 'transparent'
        },
        {
            id: 2,
            type: 'image_text',
            image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2069&auto=format&fit=crop',
            title: '洗練された技術と空間',
            content: '完全予約制のプライベート感覚で過ごせるサロンです。\n独自のカット技法と、厳選されたオーガニック薬剤を使用し、\nあなたの髪本来の美しさを最大限に引き出します。\n\n心からリラックスできる時間をお約束します。',
            imagePosition: 'left',
            pt: 'pt-16',
            pb: 'pb-24',
            dividerBottom: 'curve',
            dividerBottomColor: '#f9f9f9'
        },
        {
            id: 3,
            type: 'pricing',
            design: 'modern',
            plans: [
                { id: 1, name: 'Regular', price: '¥12,000', period: '', features: ['デザインカット', '炭酸泉シャンプー', '似合わせアドバイス'], buttonText: '予約する', isFeatured: false, color: '#D4AF37' },
                { id: 2, name: 'Premium', price: '¥22,000', period: '~', features: ['カット + 美髪カラー', '髪質改善トリートメント', 'ナノスチーム', 'ホームケア付'], buttonText: '一番人気', isFeatured: true, color: '#D4AF37', icon: 'crown', badgeText: 'POPULAR' },
                { id: 3, name: 'Special', price: '¥35,000', period: '~', features: ['フルコースメニュー', 'ヘッドスパ 45分', '完全個室対応', 'ドリンクサービス'], buttonText: 'お問い合わせ', isFeatured: false, color: '#D4AF37' }
            ],
            pt: 'pt-32',
            pb: 'pb-32',
            bgType: 'color',
            bgValue: '#f9f9f9'
        },
        {
            id: 4,
            type: 'process',
            design: 'timeline',
            accentColor: '#D4AF37',
            steps: [
                { title: 'Counseling', desc: '現在のお悩みや理想のスタイルを、プロの視点から丁寧に伺います。' },
                { title: 'Treatment', desc: '髪質に合わせた最適なシャンプーと、リラックス効果の高い施術を行います。' },
                { title: 'Design', desc: 'ライフスタイルに合わせた再現性の高いスタイルをご提案・仕上げます。' }
            ],
            pt: 'pt-24',
            pb: 'pb-24'
        },
        {
            id: 5,
            type: 'review',
            design: 'bubble',
            items: [
                { name: '田中 幸子 様', role: '会社員', stars: 5, content: '今までで一番気に入ったスタイルになりました！丁寧な説明で安心してお任せできました。', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop' },
                { name: '佐藤 真衣 様', role: '主婦', stars: 5, content: 'お店の雰囲気がとても素敵で、育児の合間に最高のリフレッシュができました。また来ます。', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop' },
                { name: '伊藤 健一 様', role: '経営者', stars: 4, content: '仕事帰りに寄れるのがありがたい。カットの技術はもちろん、ヘッドスパが最高に気持ちいい。', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop' }
            ],
            pt: 'pt-24',
            pb: 'pb-24',
            bgType: 'color',
            bgValue: '#f9f9f9',
            dividerTop: 'wave',
            dividerTopColor: '#ffffff'
        },
        {
            id: 6,
            type: 'access',
            title: 'ACCESS',
            address: '東京都港区南青山1-1-1',
            access: '表参道駅 A1出口より徒歩3分',
            hours: '10:00 - 20:00 (火曜定休)',
            tel: '03-1234-5678',
            buttonText: 'Google Mapsで開く',
            pt: 'pt-24',
            pb: 'pb-24'
        },
        {
            id: 99,
            type: 'conversion_panel',
            title: 'SPECIAL OFFER',
            isSticky: true,
            microCopy: '※Web予約限定価格です。お早めにご予約ください。',
            buttons: [
                { label: 'オンライン予約', url: '#', color: 'black', icon: 'cart' },
                { label: 'LINEで相談', url: '#', color: 'green', icon: 'line' }
            ]
        }
    ]
};
