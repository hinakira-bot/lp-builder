import React, { useState } from 'react';
import { aiService } from '../../utils/aiService';
import { unsplashService } from '../../utils/unsplashService';
import { InputGroup, TextInput, ColorPicker } from '../UI/Input';
import { Megaphone, Key } from 'lucide-react';

export const SettingsPanel = ({ data, setData }) => {
    const [googleKey, setGoogleKey] = useState(aiService.getApiKey() || '');
    const [openaiKey, setOpenaiKey] = useState(aiService.getOpenAIKey() || '');
    const [unsplashKey, setUnsplashKey] = useState(unsplashService.getAccessKey() || '');
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        aiService.setApiKey(googleKey);
        aiService.setOpenAIKey(openaiKey);
        unsplashService.setAccessKey(unsplashKey);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const updateCta = (key, value) => {
        setData(prev => ({
            ...prev,
            floatingCta: {
                ...(prev.floatingCta || { enabled: false, text: '今すぐ申し込む', url: '#', bgColor: '#ef4444', textColor: '#ffffff' }),
                [key]: value
            }
        }));
    };

    const ctaData = data?.floatingCta || { enabled: false, text: '今すぐ申し込む', url: '#', bgColor: '#ef4444', textColor: '#ffffff' };


    return (
        <div className="space-y-8 animate-fadeIn">

            {/* CV Settings */}
            <section>
                <div className="bg-gray-800/30 p-4 rounded-xl border border-gray-700/50 space-y-4">
                    <h2 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                        <Megaphone size={16} className="text-orange-400" /> コンバージョン設定
                    </h2>

                    <div className="flex items-center gap-3 bg-gray-900 p-3 rounded-lg border border-gray-700">
                        <input
                            type="checkbox"
                            id="floatingCta"
                            checked={ctaData.enabled || false}
                            onChange={(e) => updateCta('enabled', e.target.checked)}
                            className="w-4 h-4 rounded border-gray-600 accent-blue-600 cursor-pointer"
                        />
                        <label htmlFor="floatingCta" className="text-sm font-medium text-gray-200 cursor-pointer select-none">
                            追従フローティングCTAを有効にする (スマホ用)
                        </label>
                    </div>

                    {ctaData.enabled && (
                        <div className="space-y-4 pt-2 animate-fadeIn">
                            <InputGroup label="ボタンテキスト">
                                <TextInput value={ctaData && ctaData.text} onChange={(val) => updateCta('text', val)} placeholder="今すぐ申し込む" />
                            </InputGroup>
                            <InputGroup label="リンクURL">
                                <TextInput value={ctaData && ctaData.url} onChange={(val) => updateCta('url', val)} placeholder="https://..." />
                            </InputGroup>
                            <div className="grid grid-cols-2 gap-4">
                                <InputGroup label="ボタン背景色">
                                    <ColorPicker value={ctaData && ctaData.bgColor} onChange={(val) => updateCta('bgColor', val)} />
                                </InputGroup>
                                <InputGroup label="文字色">
                                    <ColorPicker value={ctaData && ctaData.textColor} onChange={(val) => updateCta('textColor', val)} />
                                </InputGroup>
                            </div>
                        </div>
                    )}
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
                        <InputGroup label="Google AI Key (Gemini)">
                            <div className="space-y-1">
                                <input
                                    type="password"
                                    value={googleKey}
                                    onChange={(e) => setGoogleKey(e.target.value)}
                                    placeholder="AIza..."
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-xs text-gray-200 focus:outline-none focus:border-purple-500 transition-colors"
                                />
                                <p className="text-[10px] text-gray-500">※テキスト生成・画像生成に使用</p>
                            </div>
                        </InputGroup>

                        <InputGroup label="OpenAI API Key (DALL-E 3)">
                            <div className="space-y-1">
                                <input
                                    type="password"
                                    value={openaiKey}
                                    onChange={(e) => setOpenaiKey(e.target.value)}
                                    placeholder="sk-..."
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-xs text-gray-200 focus:outline-none focus:border-teal-500 transition-colors"
                                />
                                <p className="text-[10px] text-gray-500">※DALL-E 3画像生成に使用</p>
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
                            onClick={handleSave}
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
