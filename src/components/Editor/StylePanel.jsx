import React from 'react';
import { Palette, Type, Sparkles, Wand2, Loader2 } from 'lucide-react';
import { Button } from '../UI/Button';
import { TextArea } from '../UI/Input';
import { InputGroup, Slider, ColorPicker } from '../UI/Input';

export const StylePanel = ({ data, setData }) => {
    const [prompt, setPrompt] = React.useState('');
    const [isGenerating, setIsGenerating] = React.useState(false);
    const [statusMsg, setStatusMsg] = React.useState('AIが魔法をかけています...');

    const handleAiMagic = async () => {
        if (!prompt) return;
        setIsGenerating(true);
        setStatusMsg('コンセプトを分析中...');

        setTimeout(() => setStatusMsg('ブランドカラーを選定中...'), 1000);
        setTimeout(() => setStatusMsg('最適な構成を組み立て中...'), 2000);
        setTimeout(() => setStatusMsg('キャッチコピーを執筆中...'), 3500);

        setTimeout(() => {
            const lowerPrompt = prompt.toLowerCase();
            let updates = {};

            if (lowerPrompt.includes('美容室') || lowerPrompt.includes('サロン') || lowerPrompt.includes('beauty')) {
                applyTheme('elegant');
                const isMens = lowerPrompt.includes('メンズ');
                updates = {
                    siteTitle: isMens ? 'AOYAMA MENS SALON' : 'ELEGANCE AOYAMA',
                    heroTitle: isMens ? 'ROUGH & COOL STYLE' : 'PREMIUM BEAUTY',
                    heroSubtitle: isMens ? '渋谷の路地裏に佇む、大人の男のための隠れ家サロン。\nミリ単位にこだわったカットで、最高の自分へ。' : '表参道駅から徒歩1分。洗練された技術と空間で、\nあなた史上最高の美しさを引き出します。',
                    floatingCta: { ...data.floatingCta, text: '今すぐ予約する', bgColor: isMens ? '#1a1a1a' : '#c5a059' },
                    sections: [
                        { id: 1, type: 'point_list', items: [{ title: '技術力', desc: 'コンテスト受賞歴のあるスタイリストが在籍。', image: '' }, { title: 'こだわり空間', desc: '全席半個室で、周りを気にせずリラックス。', image: '' }], pt: 'pt-20', pb: 'pt-20' },
                        { id: 2, type: 'pricing', design: 'featured', plans: [{ name: 'Cut', price: '¥8,800', features: ['Blow incl.'], color: '#c5a059' }, { name: 'Full', price: '¥18,000', features: ['Cut, Color, Tr.'], isFeatured: true, color: '#c5a059' }], pt: 'pt-20', pb: 'pt-20' },
                        { id: 3, type: 'speech_bubble', text: '心を込めて施術いたします。', align: 'left', bubbleColor: '#ffffff' }
                    ]
                };
            } else if (lowerPrompt.includes('ジム') || lowerPrompt.includes('フィットネス') || lowerPrompt.includes('gym') || lowerPrompt.includes('トレーニング')) {
                updates = {
                    fontFamily: 'sans',
                    textColor: '#ffffff',
                    pageBgValue: '#0f172a',
                    siteTitle: 'HARDCORE GYM',
                    heroTitle: 'PUSH YOUR LIMITS',
                    heroSubtitle: '理想の体は、自分への挑戦から始まる。\n24時間いつでも、最高の環境で自分を追い込め。',
                    fontSize: { heroTitle: 5.5, heroSubtitle: 1.1, sectionTitle: 2.8, body: 1.0 },
                    header: { ...data.header, style: 'solid', bgValue: '#0f172a', textColor: '#ffffff' },
                    floatingCta: { ...data.floatingCta, text: '無料体験はこちら', bgColor: '#ef4444' },
                    sections: [
                        { id: 1, type: 'problem_checklist', title: 'こんな悩みありませんか？', items: [{ text: '最近、体力が落ちてきた' }, { text: 'ジムに通っても続かない' }], pt: 'pt-20', pb: 'pt-20' },
                        { id: 2, type: 'point_list', items: [{ title: '24時間営業', desc: 'あなたのライフスタイルに合わせて。' }, { title: 'プロトレーナー', desc: 'マンツーマンで徹底サポート。' }], pt: 'pt-20', pb: 'pt-20' },
                        { id: 3, type: 'pricing', plans: [{ name: 'Monthly', price: '¥9,800', features: ['All access'], color: '#ef4444' }], pt: 'pt-20', pb: 'pt-20' }
                    ]
                };
            } else if (lowerPrompt.includes('カフェ') || lowerPrompt.includes('レストラン') || lowerPrompt.includes('cafe')) {
                updates = {
                    fontFamily: 'serif',
                    textColor: '#5d4037',
                    pageBgValue: '#fffaf0',
                    siteTitle: 'CAFE DE MOMENT',
                    heroTitle: 'SLOW TIME, FINE COFFEE',
                    heroSubtitle: '喧騒を忘れ、一杯のコーヒーに癒される時間を。\n自家焙煎の香りと共に、心地よいひとときを。',
                    fontSize: { heroTitle: 4.0, heroSubtitle: 0.85, sectionTitle: 2.0, body: 0.9 },
                    header: { ...data.header, style: 'overlay', textColor: '#5d4037' },
                    floatingCta: { ...data.floatingCta, text: 'メニューをみる', bgColor: '#8d6e63' },
                    sections: [
                        { id: 1, type: 'image_text', title: '自慢のコーヒー', content: '世界中から厳選した豆を、丁寧にハンドドリップ。', image: '', imagePosition: 'left', pt: 'pt-20', pb: 'pt-20' },
                        { id: 2, type: 'accordion', items: [{ title: 'テイクアウトはできますか？', content: 'はい、全メニュー可能です。' }], pt: 'pt-20', pb: 'pt-20' }
                    ]
                };
            } else if (lowerPrompt.includes('ビジネス') || lowerPrompt.includes('会社') || lowerPrompt.includes('corp') || lowerPrompt.includes('it')) {
                applyTheme('modern');
                updates = {
                    siteTitle: 'NEO TECH SOLUTIONS',
                    heroTitle: 'ACCELERATE INNOVATION',
                    heroSubtitle: 'テクノロジーの力で、世界の可能性を広げる。\n私たちは、あなたの挑戦を全力でサポートします。',
                    floatingCta: { ...data.floatingCta, text: 'お問い合わせ', bgColor: '#2563eb' },
                    sections: [
                        { id: 1, type: 'heading', text: 'Our Services', subText: '事業内容', style: 'center', pt: 'pt-20', pb: 'pt-10' },
                        { id: 2, type: 'columns', columnCount: 3, items: [{ title: 'DX推進' }, { title: 'AI開発' }, { title: 'クラウド導入' }], pt: 'pt-10', pb: 'pt-20' }
                    ]
                };
            } else {
                applyTheme('minimal');
                updates = {
                    siteTitle: 'THE ARCHIVE',
                    heroTitle: 'ESSENTIAL DESIGN',
                    heroSubtitle: '時代に流されない、普遍的な価値を提案する。\nミニマリズムが生み出す、真の豊かさ。',
                    sections: []
                };
            }

            setData(prev => ({ ...prev, ...updates }));
            setIsGenerating(false);
            setPrompt('');
        }, 5000);
    };

    const applyTheme = (themeName) => {
        let updates = {};
        if (themeName === 'elegant') {
            updates = {
                fontFamily: 'serif',
                textColor: '#4a4a4a',
                pageBgValue: '#fdfbf7',
                fontSize: {
                    heroTitle: 4.2,
                    heroSubtitle: 0.9,
                    sectionTitle: 2.0,
                    body: 0.95,
                },
                header: { ...data.header, style: 'overlay', textColor: '#4a4a4a' }
            };
        } else if (themeName === 'modern') {
            updates = {
                fontFamily: 'sans',
                textColor: '#1a1a1a',
                pageBgValue: '#ffffff',
                fontSize: {
                    heroTitle: 5.0,
                    heroSubtitle: 1.0,
                    sectionTitle: 2.5,
                    body: 1.0,
                },
                header: { ...data.header, style: 'solid', bgValue: '#ffffff', textColor: '#1a1a1a' }
            };
        } else if (themeName === 'minimal') {
            updates = {
                fontFamily: 'serif',
                textColor: '#000000',
                pageBgValue: '#ffffff',
                fontSize: {
                    heroTitle: 3.5,
                    heroSubtitle: 0.8,
                    sectionTitle: 1.8,
                    body: 0.85,
                },
                header: { ...data.header, style: 'overlay', textColor: '#000000' }
            };
        }
        setData({ ...data, ...updates });
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            <section className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-5 rounded-2xl border border-blue-500/30 shadow-inner">
                <h2 className="text-sm font-black text-white mb-4 flex items-center gap-2">
                    <Wand2 size={16} className="text-blue-400 animate-pulse" /> AI Magic (おまかせ生成)
                </h2>
                <div className="space-y-4">
                    <p className="text-[10px] text-blue-200/70 font-medium leading-relaxed">
                        「表参道の高級美容室」「モードでかっこいいIT企業」など、やりたいことを自由に入力してください。AIが最適な構成を提案します。
                    </p>
                    <TextArea
                        value={prompt}
                        onChange={(val) => setPrompt(val)}
                        placeholder="例：渋谷にある、メンズ特化のカジュアルな美容室。黒を基調にして、予約ボタンを目立たせたい。"
                        rows={3}
                        className="bg-black/40 border-blue-500/20 text-xs focus:border-blue-500/50 transition-all placeholder:text-gray-600"
                    />
                    <Button
                        onClick={handleAiMagic}
                        disabled={isGenerating || !prompt}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 shadow-xl shadow-blue-900/20 transform transition-all active:scale-95 disabled:opacity-50"
                    >
                        {isGenerating ? (
                            <div className="flex items-center gap-2">
                                <Loader2 size={16} className="animate-spin text-blue-400" />
                                <span className="animate-pulse">{statusMsg}</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Sparkles size={16} />
                                <span>AIで最適化する</span>
                            </div>
                        )}
                    </Button>
                </div>
            </section>

            <section>
                <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                    <Sparkles size={16} className="text-yellow-400" /> 手動でプリセット選択
                </h2>
                <div className="grid grid-cols-1 gap-3">
                    <button
                        onClick={() => applyTheme('elegant')}
                        className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 hover:border-orange-400 transition-all group"
                    >
                        <div className="text-left">
                            <span className="block text-xs font-black text-orange-900 tracking-widest uppercase">Elegant Beauty</span>
                            <span className="text-[10px] text-orange-700 font-medium">東京の美容室・サロン風スタイル</span>
                        </div>
                        <div className="flex gap-1">
                            <div className="w-3 h-3 rounded-full bg-[#fdfbf7] border border-orange-200"></div>
                            <div className="w-3 h-3 rounded-full bg-[#4a4a4a]"></div>
                        </div>
                    </button>

                    <button
                        onClick={() => applyTheme('modern')}
                        className="flex items-center justify-between p-4 rounded-xl bg-gray-900 border border-gray-700 hover:border-blue-500 transition-all group"
                    >
                        <div className="text-left">
                            <span className="block text-xs font-black text-white tracking-widest uppercase">Modern Business</span>
                            <span className="text-[10px] text-gray-400 font-medium">信頼感のあるモダンなビジネススタイル</span>
                        </div>
                        <div className="flex gap-1">
                            <div className="w-3 h-3 rounded-full bg-white"></div>
                            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                        </div>
                    </button>

                    <button
                        onClick={() => applyTheme('minimal')}
                        className="flex items-center justify-between p-4 rounded-xl bg-white border border-gray-200 hover:border-black transition-all group"
                    >
                        <div className="text-left">
                            <span className="block text-xs font-black text-black tracking-widest uppercase">Minimal Luxury</span>
                            <span className="text-[10px] text-gray-400 font-medium">洗練された余白を活かすスタイル</span>
                        </div>
                        <div className="flex gap-1">
                            <div className="w-3 h-3 rounded-full bg-white border border-gray-200"></div>
                            <div className="w-3 h-3 rounded-full bg-black"></div>
                        </div>
                    </button>
                </div>
            </section>
            <section>
                <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                    <Palette size={16} className="text-blue-400" /> 基本スタイル
                </h2>
                <InputGroup label="テキストカラー">
                    <ColorPicker value={data.textColor} onChange={(val) => setData({ ...data, textColor: val })} />
                </InputGroup>
                <InputGroup label="フォント">
                    <div className="grid grid-cols-2 gap-2 bg-gray-900 p-1 rounded-lg">
                        <button onClick={() => setData({ ...data, fontFamily: 'serif' })} className={`py-2 rounded text-sm transition-all font-serif ${data.fontFamily === 'serif' ? 'bg-gray-700 text-white shadow' : 'text-gray-500 hover:text-white'}`}>明朝体</button>
                        <button onClick={() => setData({ ...data, fontFamily: 'sans' })} className={`py-2 rounded text-sm transition-all font-sans ${data.fontFamily === 'sans' ? 'bg-gray-700 text-white shadow' : 'text-gray-500 hover:text-white'}`}>ゴシック</button>
                    </div>
                </InputGroup>
            </section>

            <section>
                <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                    <Type size={16} className="text-blue-400" /> 文字サイズ (rem)
                </h2>
                <div className="bg-gray-800/30 p-4 rounded-xl border border-gray-700/50 space-y-5">
                    <InputGroup label="メインタイトル">
                        <Slider value={data.fontSize.heroTitle} min={2} max={8} step={0.1} onChange={(val) => setData({ ...data, fontSize: { ...data.fontSize, heroTitle: val } })} />
                    </InputGroup>
                    <InputGroup label="サブタイトル">
                        <Slider value={data.fontSize.heroSubtitle} min={0.5} max={2} step={0.125} onChange={(val) => setData({ ...data, fontSize: { ...data.fontSize, heroSubtitle: val } })} />
                    </InputGroup>
                    <InputGroup label="セクション見出し">
                        <Slider value={data.fontSize.sectionTitle} min={1} max={4} step={0.1} onChange={(val) => setData({ ...data, fontSize: { ...data.fontSize, sectionTitle: val } })} />
                    </InputGroup>
                    <InputGroup label="本文テキスト">
                        <Slider value={data.fontSize.body} min={0.75} max={1.5} step={0.05} onChange={(val) => setData({ ...data, fontSize: { ...data.fontSize, body: val } })} />
                    </InputGroup>
                </div>
            </section>
        </div>
    );
};
