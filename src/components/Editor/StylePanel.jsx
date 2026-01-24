import React, { useState } from 'react';
import { Palette, Type, Sparkles, Wand2, Loader2 } from 'lucide-react';
import { Button } from '../UI/Button';
import { TextArea } from '../UI/Input';
import { InputGroup, Slider, ColorPicker } from '../UI/Input';
import { aiService } from '../../utils/aiService';

export const StylePanel = ({ data, setData }) => {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [statusMsg, setStatusMsg] = useState('AIが魔法をかけています...');
    const [tuning, setTuning] = useState({ tone: 'standard', focus: 'benefit' });

    const handleProfessionalBuild = async (imageMode = 'library') => {
        if (!prompt) return;
        setIsGenerating(true);
        setStatusMsg('プロフェッショナル・ビルドを開始します...');

        try {
            // Use the unified 5-stage pipeline
            const normalizedData = await aiService.generateLP(prompt, {
                ...tuning,
                imageMode // Pass imageMode to the pipeline
            });

            console.log("[Pipeline] Professional Build Complete", normalizedData);

            setData(prev => {
                const next = {
                    // まずベースは prev
                    ...prev,

                    // 次に生成結果を優先で上書き（浅い領域）
                    ...normalizedData,

                    // ✅ sections は必ず生成結果で置き換え（配列deep merge事故を防ぐ）
                    sections: normalizedData.sections ?? prev.sections,

                    // ✅ heroConfig は “生成結果優先” で上書き
                    heroConfig: {
                        ...(prev.heroConfig ?? {}),
                        ...(normalizedData.heroConfig ?? {}),
                    },

                    // ✅ design もネストなので明示的に
                    design: {
                        ...(prev.design ?? {}),
                        ...(normalizedData.design ?? {}),
                        colors: {
                            ...(prev.design?.colors ?? {}),
                            ...(normalizedData.design?.colors ?? {}),
                        },
                        typography: {
                            ...(prev.design?.typography ?? {}),
                            ...(normalizedData.design?.typography ?? {}),
                        },
                    },
                };

                // ✅ Heroが変わらない対策：fallbackを必ず最新bgImageに同期
                const latestHero =
                    next.heroConfig?.bgImage ||
                    normalizedData.heroConfig?.bgImage ||
                    normalizedData.heroImageFallback ||
                    next.heroImageFallback;

                if (latestHero) {
                    next.heroImageFallback = latestHero;
                    // Ensure heroUrl mirrored for UI stability
                    next.heroUrl = latestHero;
                }

                return next;
            });
            setStatusMsg('プロフェッショナル生成が完了しました！');
        } catch (error) {
            console.error("[Pipeline] CRITICAL ERROR:", error);
            setStatusMsg('生成中にエラーが発生しました');
        } finally {
            setIsGenerating(false);
        }
    };


    const runLocalFallback = async () => {
        setStatusMsg('ブランドカラーを選定中...');
        await new Promise(r => setTimeout(r, 800));
        setStatusMsg('成約率の高い構成をシミュレーション中...');
        await new Promise(r => setTimeout(r, 1200));

        const lowerPrompt = prompt.toLowerCase();
        let updates = {};

        const getThemeConfig = (name) => {
            if (name === 'elegant') return {
                fontFamily: 'serif', textColor: '#4a4a4a', pageBgValue: '#fdfbf7',
                fontSize: { heroTitle: 4.2, heroSubtitle: 0.9, sectionTitle: 2.0, body: 0.95 },
                header: { ...data.header, style: 'overlay', textColor: '#4a4a4a' }
            };
            if (name === 'modern') return {
                fontFamily: 'sans', textColor: '#1a1a1a', pageBgValue: '#ffffff',
                fontSize: { heroTitle: 5.0, heroSubtitle: 1.0, sectionTitle: 2.5, body: 1.0 },
                header: { ...data.header, style: 'solid', bgValue: '#ffffff', textColor: '#1a1a1a' }
            };
            return {
                fontFamily: 'serif', textColor: '#000000', pageBgValue: '#ffffff',
                fontSize: { heroTitle: 3.5, heroSubtitle: 0.8, sectionTitle: 1.8, body: 0.85 },
                header: { ...data.header, style: 'overlay', textColor: '#000000' }
            };
        };

        if (lowerPrompt.includes('美容室') || lowerPrompt.includes('サロン') || lowerPrompt.includes('beauty')) {
            const isMens = lowerPrompt.includes('メンズ');
            const themeColor = isMens ? '#1a1a1a' : '#c5a059';
            updates = {
                ...getThemeConfig('elegant'),
                siteTitle: isMens ? 'AOYAMA MENS SALON' : 'ELEGANCE AOYAMA',
                heroTitle: isMens ? 'ROUGH & COOL STYLE' : 'PREMIUM BEAUTY',
                heroSubtitle: isMens ? '渋谷の路地裏に佇む、大人の男のための隠れ家。\nミリ単位にこだわった再現性で、最高の自分へ。' : '表参道駅から徒歩1分。洗練された技術と空間で、\nあなた史上最高の美しさを引き出します。',
                floatingCta: { ...data.floatingCta, text: '今すぐ予約する', bgColor: themeColor },
                sections: [
                    { id: 1, type: 'heading', text: 'Our Philosophy', subText: '想い', style: 'center', pt: 'pt-24', pb: 'pt-8' },
                    { id: 2, type: 'image_text', title: '洗練された技術と空間', content: '完全予約制のプライベート空間で、一人一人に合わせた丁寧な施術を行います。都会の喧騒を忘れ、安らぎをご体感ください。', image: '', imagePosition: 'left', pt: 'pt-20', pb: 'pt-20' },
                    { id: 3, type: 'problem_checklist', title: 'こんなお悩みありませんか？', items: [{ text: '自分に似合うスタイルがわからない' }, { text: '美容室ではリラックスしたい' }, { text: '朝のセットを楽にしたい' }], pt: 'pt-20', pb: 'pt-20' },
                    { id: 4, type: 'point_list', items: [{ title: '受賞スタイリスト', desc: 'コンテスト受賞歴のある実力派が在籍。' }, { title: '厳選薬剤', desc: '髪と肌に優しいオーガニックな薬剤を使用。' }], pt: 'pt-20', pb: 'pt-20' },
                    { id: 5, type: 'pricing', plans: [{ name: 'Cut', price: '¥8,800', features: ['Blow incl.'] }, { name: 'Full Menu', price: '¥18,000', features: ['Cut, Color, Tr.'], isFeatured: true, color: themeColor }, { name: 'Special', price: '¥25,000', features: ['Full course'] }], pt: 'pt-24', pb: 'pt-24' },
                    { id: 6, type: 'speech_bubble', text: '「綺麗になりたい」その想いに全力で応えます！', align: 'left', bubbleColor: '#ffffff' },
                    { id: 7, type: 'conversion_panel', title: '＼ 初回限定 20% OFF ／', microCopy: 'ご予約時にLPを見たと伝えてください', buttons: [{ label: '予約する', url: '#', color: 'orange', icon: 'cart' }] }
                ]
            };
        } else if (lowerPrompt.includes('ジム') || lowerPrompt.includes('フィットネス') || lowerPrompt.includes('gym')) {
            const themeColor = '#ef4444';
            updates = {
                ...getThemeConfig('modern'),
                fontFamily: 'sans', textColor: '#ffffff', pageBgValue: '#0f172a', siteTitle: 'ULTIMATE FITNESS',
                heroTitle: 'PUSH YOUR LIMITS', heroSubtitle: '理想の体は、自分への挑戦から始まる。\n24時間最高の環境で自分を追い込め。',
                floatingCta: { ...data.floatingCta, text: '無料体験はこちら', bgColor: themeColor },
                sections: [
                    { id: 1, type: 'problem_checklist', title: 'こんな悩みありませんか？', items: [{ text: '最近、体力が落ちてきた' }, { text: 'ジムに通っても続かない' }], pt: 'pt-24', pb: 'pt-12' },
                    { id: 2, type: 'point_list', items: [{ title: '24時間営業', desc: '仕事帰りも早朝も。' }, { title: 'プロトレーナー', desc: '徹底サポート。' }], pt: 'pt-10', pb: 'pt-20' },
                    { id: 3, type: 'pricing', plans: [{ name: 'Trial', price: '¥0', features: ['60min session'] }, { name: 'Standard', price: '¥9,800', features: ['All access'], isFeatured: true, color: themeColor }], pt: 'pt-24', pb: 'pt-24' },
                    { id: 4, type: 'conversion_panel', title: '＼ 入会金無料 ／', buttons: [{ label: '無料体験に申し込む', url: '#', color: 'orange' }] }
                ]
            };
        } else if (lowerPrompt.includes('カフェ') || lowerPrompt.includes('レストラン') || lowerPrompt.includes('cafe')) {
            const themeColor = '#8d6e63';
            updates = {
                ...getThemeConfig('elegant'),
                fontFamily: 'serif', textColor: '#5d4037', pageBgValue: '#fffaf0', siteTitle: 'ROAST & COFFEE',
                heroTitle: 'SLOW TIME, FINE BEANS', heroSubtitle: '喧騒を忘れ、一杯のコーヒーに癒される時間を。',
                floatingCta: { ...data.floatingCta, text: 'メニューをみる', bgColor: themeColor },
                sections: [
                    { id: 1, type: 'image_text', title: '世界中から厳選した豆', content: '丁寧にハンドドリップ。', image: '', imagePosition: 'left', pt: 'pt-20', pb: 'pt-20' },
                    { id: 2, type: 'point_list', items: [{ title: '自家焙煎', desc: '毎日新鮮な香りを。' }], pt: 'pt-20', pb: 'pt-20' },
                    { id: 3, type: 'conversion_panel', title: '至福の一杯を、あなたに。', buttons: [{ label: 'メニューをみる', url: '#', color: 'orange' }] }
                ]
            };
        } else if (lowerPrompt.includes('ビジネス') || lowerPrompt.includes('会社') || lowerPrompt.includes('corp') || lowerPrompt.includes('it') || lowerPrompt.includes('制作')) {
            updates = {
                ...getThemeConfig('modern'),
                siteTitle: 'NEO TECH SOLUTIONS', heroTitle: 'ACCELERATE YOUR DX',
                heroSubtitle: '最新のテクノロジーと戦略で、ビジネスを次のステージへ。',
                floatingCta: { ...data.floatingCta, text: '資料請求', bgColor: '#2563eb' },
                sections: [
                    { id: 1, type: 'heading', text: 'Solutions', subText: '解決できること', style: 'center', pt: 'pt-24', pb: 'pt-10' },
                    { id: 2, type: 'columns', columnCount: 3, items: [{ title: '戦略コンサル' }, { title: 'システム開発' }, { title: '運用・保守' }], pt: 'pt-10', pb: 'pt-20' },
                    { id: 3, type: 'conversion_panel', title: 'まずは無料で相談', buttons: [{ label: 'お問い合わせ', url: '#', color: 'blue' }] }
                ]
            };
        } else {
            updates = {
                ...getThemeConfig('minimal'),
                siteTitle: 'DESIGN ARCHIVE', heroTitle: 'ESSENTIAL BEAUTY', heroSubtitle: '無駄を削ぎ落とした、本質のデザイン。',
                sections: [{ id: 1, type: 'heading', text: 'About Us', style: 'center', pt: 'pt-24', pb: 'pt-24' }]
            };
        }

        setData(prev => ({ ...prev, ...updates }));
    };

    const applyTheme = (themeName) => {
        let updates = {};
        if (themeName === 'elegant') {
            updates = {
                fontFamily: 'serif', textColor: '#4a4a4a', pageBgValue: '#fdfbf7',
                fontSize: { heroTitle: 4.2, heroSubtitle: 0.9, sectionTitle: 2.0, body: 0.95 },
                header: { ...data.header, style: 'overlay', textColor: '#4a4a4a' }
            };
        } else if (themeName === 'modern') {
            updates = {
                fontFamily: 'sans', textColor: '#1a1a1a', pageBgValue: '#ffffff',
                fontSize: { heroTitle: 5.0, heroSubtitle: 1.0, sectionTitle: 2.5, body: 1.0 },
                header: { ...data.header, style: 'solid', bgValue: '#ffffff', textColor: '#1a1a1a' }
            };
        } else if (themeName === 'minimal') {
            updates = {
                fontFamily: 'serif', textColor: '#000000', pageBgValue: '#ffffff',
                fontSize: { heroTitle: 3.5, heroSubtitle: 0.8, sectionTitle: 1.8, body: 0.85 },
                header: { ...data.header, style: 'overlay', textColor: '#000000' }
            };
        }
        setData(prev => ({ ...prev, ...updates }));
    };

    const globalApiKey = aiService.getApiKey();

    const TuningChip = ({ label, active, onClick }) => (
        <button
            onClick={onClick}
            className={`text-[10px] px-2 py-1 rounded-md transition-all border ${active ? 'bg-blue-500 text-white border-blue-400' : 'bg-black/20 text-blue-200 border-blue-500/20 hover:bg-blue-500/20'}`}
        >
            {label}
        </button>
    );

    return (
        <div className="space-y-8 animate-fadeIn">
            <section className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-5 rounded-2xl border border-blue-500/30 shadow-inner">
                <h2 className="text-sm font-black text-white mb-4 flex items-center gap-2">
                    <Wand2 size={16} className="text-blue-400 animate-pulse" /> AI Magic (おまかせ生成)
                </h2>
                <div className="space-y-4">
                    <div className="flex items-center justify-between mb-1">
                        <p className="text-[10px] text-blue-200/70 font-medium leading-relaxed">
                            やりたいことを入力してください。AIが最適な構成を提案します。
                        </p>
                        {globalApiKey ? (
                            <span className="text-[9px] bg-green-900/50 text-green-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Sparkles size={10} /> 本格AIモード
                            </span>
                        ) : (
                            <span className="text-[9px] bg-gray-800 text-gray-500 px-2 py-0.5 rounded-full">
                                デモモード
                            </span>
                        )}
                    </div>

                    {/* AI Tuning Panel */}
                    <div className="bg-black/20 p-3 rounded-xl border border-white/5 space-y-3">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] text-gray-400 w-12">トーン:</span>
                            <div className="flex gap-1 flex-wrap">
                                {['standard', 'luxury', 'friendly', 'energetic'].map(t => (
                                    <TuningChip
                                        key={t}
                                        label={t === 'standard' ? '標準' : t === 'luxury' ? '高級感' : t === 'friendly' ? '親しみ' : '情熱的'}
                                        active={tuning.tone === t}
                                        onClick={() => setTuning(prev => ({ ...prev, tone: t }))}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] text-gray-400 w-12">重視:</span>
                            <div className="flex gap-1 flex-wrap">
                                {['benefit', 'proof', 'sales'].map(f => (
                                    <TuningChip
                                        key={f}
                                        label={f === 'benefit' ? 'ベネフィット' : f === 'proof' ? '信頼・実績' : 'セールス'}
                                        active={tuning.focus === f}
                                        onClick={() => setTuning(prev => ({ ...prev, focus: f }))}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <TextArea
                        value={prompt}
                        onChange={(val) => setPrompt(val)}
                        placeholder="例：渋谷にある、メンズ特化のカジュアルな美容室。黒を基調にして、予約ボタンを目立たせたい。"
                        rows={3}
                        className="bg-black/40 border-blue-500/20 text-xs focus:border-blue-500/50 transition-all placeholder:text-gray-600"
                    />
                    <div className="grid grid-cols-1 gap-3">
                        <Button
                            onClick={() => handleProfessionalBuild('library')}
                            disabled={isGenerating || !prompt}
                            className="group relative overflow-hidden w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 shadow-2xl shadow-blue-900/40 border-b-4 border-blue-800 active:border-b-0 active:translate-y-1 transition-all"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/20 to-blue-400/0 -translate-x-full group-hover:animate-shimmer" />
                            {isGenerating ? (
                                <div className="flex flex-col items-center gap-1">
                                    <div className="flex items-center gap-2">
                                        <Loader2 size={18} className="animate-spin text-white" />
                                        <span className="text-sm font-bold tracking-wider">GENERATING...</span>
                                    </div>
                                    <span className="text-[10px] text-blue-100/70 font-medium animate-pulse">{statusMsg}</span>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center">
                                    <div className="flex items-center gap-2">
                                        <Sparkles size={20} className="text-yellow-300" />
                                        <span className="text-base tracking-widest uppercase">Professional Build</span>
                                    </div>
                                    <span className="text-[10px] text-blue-100/60 font-normal mt-1">戦略・デザイン・文章・画像をすべて自動生成</span>
                                </div>
                            )}
                        </Button>

                        <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                            <span className="text-[10px] text-gray-500">画像生成モード:</span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleProfessionalBuild('ai')}
                                    disabled={isGenerating || !prompt}
                                    className="text-[9px] text-blue-400 hover:text-blue-300 flex items-center gap-1 bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20"
                                >
                                    <Wand2 size={12} /> DALL-E 3で生成
                                </button>
                            </div>
                        </div>
                    </div>
                    {!globalApiKey && (
                        <p className="text-[9px] text-gray-500 text-center">
                            ※設定タブでAPIキーを入れると、より精微な生成が可能です
                        </p>
                    )}
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
                <InputGroup label={`全体余白 (${data.globalPadding || 0}px)`}>
                    <Slider
                        value={data.globalPadding || 0}
                        onChange={(val) => setData({ ...data, globalPadding: val })}
                        min={0}
                        max={128}
                        step={4}
                    />
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
