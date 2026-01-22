import React from 'react';
import { Palette, Type, Sparkles } from 'lucide-react';
import { InputGroup, Slider, ColorPicker } from '../UI/Input';

export const StylePanel = ({ data, setData }) => {
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
            <section>
                <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                    <Sparkles size={16} className="text-yellow-400" /> テーマプリセット
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
