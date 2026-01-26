import React, { useState } from 'react';
import { Camera, Video, Monitor, Sparkles, Image, Loader2 } from 'lucide-react';
import { aiService } from '../../utils/aiService';
import { InputGroup, TextInput, TextArea } from '../UI/Input';
import { Slider, ColorPicker } from '../UI/Input';
import { AIGeneratorModal } from '../UI/AIGeneratorModal';
import { ApiKeyModal } from '../UI/ApiKeyModal';

export const VisualPanel = ({ data, setData }) => {
    const [heroGenState, setHeroGenState] = useState(null); // 'library', 'ai', or null - kept for button loading state if needed, though mostly modal now

    // Modal State
    const [showGenModal, setShowGenModal] = useState(false);
    const [showKeyModal, setShowKeyModal] = useState(false);
    const [modalTab, setModalTab] = useState('ai');
    const [modalPrompt, setModalPrompt] = useState('');

    const openGenerator = (tab) => {
        // Prepare prompt from title
        const prompt = data.heroTitle ? `Main visual for website: ${data.heroTitle}. ${data.heroSubtitle || ''}` : '';
        setModalPrompt(prompt);
        setModalTab(tab);

        // Check key if using AI (Search doesn't strictly need OpenAI key but good practice to have at least one valid key logic if we want to expand. 
        // Actually AIGeneratorModal checks OpenAI key internally for generation. Unsplash doesn't need it. 
        // But for consistency let's just open the modal. The modal handles missing key errors for AI.)
        setShowGenModal(true);
    };

    const handleGenClose = (reason) => {
        setShowGenModal(false);
        if (reason === 'MISSING_KEY') {
            setShowKeyModal(true);
        }
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            <AIGeneratorModal
                isOpen={showGenModal}
                onClose={handleGenClose}
                onGenerate={(url) => {
                    setData(prev => ({ ...prev, heroUrl: url }));
                    setShowGenModal(false);
                }}
                initialPrompt={modalPrompt}
                initialTab={modalTab}
            />
            <ApiKeyModal
                isOpen={showKeyModal}
                onClose={() => setShowKeyModal(false)}
                onSave={() => setShowGenModal(true)}
            />

            {/* Main Visual Settings */}
            <section>
                <div className="flex items-center gap-2 mb-4 text-blue-400">
                    <Monitor size={18} />
                    <h2 className="font-bold">メインビジュアル</h2>
                </div>
                <div className="bg-gray-800/30 p-4 rounded-xl border border-gray-700/50 space-y-5">
                    <InputGroup label="メディアタイプ">
                        <div className="grid grid-cols-2 gap-2 bg-gray-900 p-1 rounded-lg">
                            <button
                                onClick={() => setData(prev => ({ ...prev, heroType: 'image' }))}
                                className={`flex items-center justify-center gap-2 py-2 rounded text-sm transition-all ${data.heroType === 'image' ? 'bg-gray-700 text-white shadow' : 'text-gray-500 hover:text-white'}`}
                            >
                                <Camera size={16} /> Image
                            </button>
                            <button
                                onClick={() => setData(prev => ({ ...prev, heroType: 'video' }))}
                                className={`flex items-center justify-center gap-2 py-2 rounded text-sm transition-all ${data.heroType === 'video' ? 'bg-gray-700 text-white shadow' : 'text-gray-500 hover:text-white'}`}
                            >
                                <Video size={16} /> Video
                            </button>
                        </div>
                    </InputGroup>
                    <InputGroup label="メディアURL">
                        <div className="flex gap-2 mb-2">
                            <TextInput value={data.heroUrl} onChange={(val) => setData(prev => ({ ...prev, heroUrl: val }))} placeholder="URLを入力" className="flex-1" />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => openGenerator('search')}
                                className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-2 px-3 rounded text-xs transition-all"
                            >
                                <Image size={14} />
                                Unsplash (写真)
                            </button>
                            <button
                                onClick={() => openGenerator('ai')}
                                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-2 px-3 rounded text-xs transition-all shadow-lg shadow-blue-900/20"
                            >
                                <Sparkles size={14} />
                                DALL-E 3 (生成)
                            </button>
                        </div>
                    </InputGroup>
                    <div className="bg-gray-800/30 p-4 rounded-xl border border-gray-700/50 space-y-4">
                        <InputGroup label="メインコピー">
                            <TextInput value={data.heroTitle} onChange={(val) => setData(prev => ({ ...prev, heroTitle: val }))} />
                        </InputGroup>
                        <InputGroup label="サブコピー">
                            <TextArea value={data.heroSubtitle} onChange={(val) => setData(prev => ({ ...prev, heroSubtitle: val }))} rows={2} />
                        </InputGroup>
                    </div>

                    <InputGroup label="高さ (vh)">
                        <Slider value={data.heroHeight} min={20} max={100} onChange={(val) => setData(prev => ({ ...prev, heroHeight: val }))} unit="vh" />
                    </InputGroup>
                    <InputGroup label="横幅 (%)">
                        <Slider value={data.heroWidth} min={50} max={100} onChange={(val) => setData(prev => ({ ...prev, heroWidth: val }))} unit="%" />
                    </InputGroup>

                    <InputGroup label="画像の中心位置調整">
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs text-gray-400 mb-1">
                                    <span>横位置 (X)</span>
                                    <span>{data.heroPositionX}%</span>
                                </div>
                                <Slider value={data.heroPositionX} min={0} max={100} onChange={(val) => setData(prev => ({ ...prev, heroPositionX: val }))} unit="%" />
                            </div>
                            <div>
                                <div className="flex justify-between text-xs text-gray-400 mb-1">
                                    <span>縦位置 (Y)</span>
                                    <span>{data.heroPositionY}%</span>
                                </div>
                                <Slider value={data.heroPositionY} min={0} max={100} onChange={(val) => setData(prev => ({ ...prev, heroPositionY: val }))} unit="%" />
                            </div>
                        </div>
                    </InputGroup>

                    <InputGroup label="オーバーレイ / ぼかし">
                        <div className="space-y-4">
                            <div>
                                <div className="text-xs text-gray-500 mb-1">暗さ</div>
                                <Slider value={data.heroOverlayOpacity} min={0} max={0.9} step={0.1} onChange={(val) => setData(prev => ({ ...prev, heroOverlayOpacity: val }))} />
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 mb-1">ぼかし</div>
                                <Slider value={data.heroBlur} min={0} max={20} onChange={(val) => setData(prev => ({ ...prev, heroBlur: val }))} unit="px" />
                            </div>
                        </div>
                    </InputGroup>
                </div>
            </section>

        </div>
    );
};
