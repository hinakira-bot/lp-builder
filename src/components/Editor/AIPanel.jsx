import React, { useState } from 'react';
import { Sparkles, Wand2, Loader2, Key } from 'lucide-react';
import { Button } from '../UI/Button';
import { TextArea, InputGroup } from '../UI/Input';
import { aiService } from '../../utils/aiService';
import { unsplashService } from '../../utils/unsplashService';

export const AIPanel = ({ data, setData }) => {
    // --- AI Generation State ---
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [statusMsg, setStatusMsg] = useState('AIが魔法をかけています...');
    const [tuning, setTuning] = useState({ tone: 'standard', focus: 'benefit' });

    // --- API Key State ---
    const [googleKey, setGoogleKey] = useState(aiService.getApiKey() || '');
    const [openaiKey, setOpenaiKey] = useState(aiService.getOpenAIKey() || '');
    const [unsplashKey, setUnsplashKey] = useState(unsplashService.getAccessKey() || '');
    const [saved, setSaved] = useState(false);

    // --- AI Logic ---
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
                    ...prev,
                    ...normalizedData,
                    sections: normalizedData.sections ?? prev.sections,
                    heroConfig: {
                        ...(prev.heroConfig ?? {}),
                        ...(normalizedData.heroConfig ?? {}),
                    },
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

                const latestHero =
                    next.heroConfig?.bgImage ||
                    normalizedData.heroConfig?.bgImage ||
                    normalizedData.heroImageFallback ||
                    next.heroImageFallback;

                if (latestHero) {
                    next.heroImageFallback = latestHero;
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

    // --- API Key Logic ---
    const handleSaveKeys = () => {
        console.log('[DEBUG] Saving Keys:', { google: !!googleKey, openai: !!openaiKey });
        aiService.setApiKey(googleKey);
        aiService.setOpenAIKey(openaiKey);
        unsplashService.setAccessKey(unsplashKey);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
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
            {/* AI Magic Section */}
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
                </div>
            </section>

            {/* API Key Section */}
            <section>
                <div className="bg-gray-800/30 p-4 rounded-xl border border-gray-700/50 space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Key size={16} className="text-purple-400" />
                        <h4 className="text-sm font-bold text-white">APIキー設定 (外部サービス)</h4>
                    </div>

                    <div className="space-y-4">
                        <InputGroup label="Google AI Key (Gemini - Text & Structure)">
                            <div className="space-y-1">
                                <input
                                    type="password"
                                    value={googleKey}
                                    onChange={(e) => setGoogleKey(e.target.value)}
                                    placeholder="AIza..."
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-xs text-gray-200 focus:outline-none focus:border-purple-500 transition-colors"
                                />
                                <div className="flex justify-between items-center px-1">
                                    <p className="text-[10px] text-gray-500">※LPの構成案・文章作成に使用（無料枠あり）</p>
                                    <span className="text-[10px] font-mono bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/20">
                                        Active: {aiService.GEMINI_MODEL || 'gemini-2.5-pro'}
                                    </span>
                                </div>
                            </div>
                        </InputGroup>

                        <InputGroup label="OpenAI API Key (DALL-E 3 - Images)">
                            <div className="space-y-1">
                                <input
                                    type="password"
                                    value={openaiKey}
                                    onChange={(e) => setOpenaiKey(e.target.value)}
                                    placeholder="sk-..."
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-xs text-gray-200 focus:outline-none focus:border-teal-500 transition-colors"
                                />
                                <p className="text-[10px] text-gray-500">※高品質な画像生成に使用（従量課金）</p>
                            </div>
                        </InputGroup>

                        <InputGroup label="Unsplash Access Key">
                            <div className="space-y-1">
                                <input
                                    type="password"
                                    value={unsplashKey}
                                    onChange={(e) => setUnsplashKey(e.target.value)}
                                    placeholder="Access Key..."
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-xs text-gray-200 focus:outline-none focus:border-pink-500 transition-colors"
                                />
                                <p className="text-[10px] text-gray-500">※無料の画像検索に使用</p>
                            </div>
                        </InputGroup>
                    </div>

                    <div className="pt-2 flex justify-end">
                        <button
                            onClick={handleSaveKeys}
                            className={`px-6 py-2 rounded-lg text-xs font-bold transition-all shadow-lg ${saved ? 'bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}
                        >
                            {saved ? '設定を保存しました' : '設定を保存'}
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};
