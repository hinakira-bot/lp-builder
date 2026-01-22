import React from 'react';
import { Type, Layout, Image as ImageIcon, Link as LinkIcon, Menu, Plus, X, Upload } from 'lucide-react';
import { InputGroup, TextInput, ColorPicker, Slider as RangeInput } from '../UI/Input';

// Link Editor Component (Reused/Adapted)
const LinkEditor = ({ link, onChange, onDelete, type = 'button' }) => (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 mb-3 group animate-fadeIn">
        <div className="flex justify-between items-start mb-3">
            <div className="bg-gray-700/50 p-1.5 rounded text-gray-400">
                {type === 'menu' ? <Menu size={14} /> : <LinkIcon size={14} />}
            </div>
            <button onClick={onDelete} className="text-gray-500 hover:text-red-400 transition-colors">
                <X size={16} />
            </button>
        </div>
        <div className="space-y-3">
            <TextInput
                value={link.label}
                onChange={(val) => onChange({ ...link, label: val })}
                placeholder={type === 'menu' ? "メニュー名" : "ボタンのテキスト"}
            />
            <TextInput
                value={link.url}
                onChange={(val) => onChange({ ...link, url: val })}
                placeholder="リンクURL (例: #about)"
            />
        </div>
    </div>
);

export const HeaderPanel = ({ data, setData }) => {

    // Helper functions for safe updating
    const updateHeader = (key, value) => {
        setData(prev => ({
            ...prev,
            header: {
                ...prev.header,
                [key]: value
            }
        }));
    };

    // Menu Handlers
    const handleMenuChange = (id, newItem) => {
        setData(prev => ({ ...prev, menuItems: prev.menuItems.map(m => m.id === id ? newItem : m) }));
    };
    const addMenu = () => {
        const newId = (data.menuItems.length > 0 ? Math.max(...data.menuItems.map(m => m.id)) : 0) + 1;
        setData(prev => ({ ...prev, menuItems: [...prev.menuItems, { id: newId, label: 'Menu', url: '#' }] }));
    };
    const deleteMenu = (id) => {
        setData(prev => ({ ...prev, menuItems: prev.menuItems.filter(m => m.id !== id) }));
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Header Style */}
            <section>
                <div className="bg-gray-800/30 p-4 rounded-xl border border-gray-700/50 space-y-4">
                    <h2 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                        <Layout size={16} className="text-blue-400" /> ヘッダースタイル
                    </h2>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                        <button
                            onClick={() => updateHeader('style', 'overlay')}
                            className={`p-3 rounded-lg border text-xs font-bold transition-all ${data.header?.style === 'overlay' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'}`}
                        >
                            オーバーレイ (透明)
                        </button>
                        <button
                            onClick={() => updateHeader('style', 'solid')}
                            className={`p-3 rounded-lg border text-xs font-bold transition-all ${data.header?.style === 'solid' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'}`}
                        >
                            ソリッド (背景色)
                        </button>
                    </div>

                    <InputGroup label="レイアウト (ロゴ位置)">
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => updateHeader('layout', 'left')}
                                className={`p-2 rounded border text-xs font-bold transition-all ${(!data.header?.layout || data.header?.layout === 'left') ? 'bg-blue-600/50 border-blue-500 text-white' : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'}`}
                            >
                                左寄せ (Left)
                            </button>
                            <button
                                onClick={() => updateHeader('layout', 'center')}
                                className={`p-2 rounded border text-xs font-bold transition-all ${data.header?.layout === 'center' ? 'bg-blue-600/50 border-blue-500 text-white' : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'}`}
                            >
                                中央 (Center)
                            </button>
                        </div>
                    </InputGroup>

                    {data.header?.style === 'solid' && (
                        <div className="space-y-4 animate-fadeIn">
                            <InputGroup label="背景色">
                                <ColorPicker value={data.header?.bgValue || '#ffffff'} onChange={(val) => updateHeader('bgValue', val)} />
                            </InputGroup>
                            <InputGroup label="文字色">
                                <ColorPicker value={data.header?.textColor || '#333333'} onChange={(val) => updateHeader('textColor', val)} />
                            </InputGroup>
                        </div>
                    )}
                </div>
            </section>

            {/* Site Title & Logo */}
            <section>
                <div className="bg-gray-800/30 p-4 rounded-xl border border-gray-700/50 space-y-4">
                    <h2 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                        <Type size={16} className="text-pink-400" /> タイトル・ロゴ
                    </h2>

                    <InputGroup label="サイトタイトル (テキスト)">
                        <TextInput value={data.siteTitle} onChange={(val) => setData({ ...data, siteTitle: val })} />
                    </InputGroup>

                    <div className="pt-2 border-t border-gray-700/50">
                        <InputGroup label="ロゴ画像URL (設定するとタイトルより優先)">
                            <div className="flex gap-2">
                                <TextInput
                                    value={data.header?.logoUrl || ''}
                                    onChange={(val) => updateHeader('logoUrl', val)}
                                    placeholder="https://..."
                                />
                            </div>
                        </InputGroup>
                        {data.header?.logoUrl && (
                            <div className="mt-2">
                                <InputGroup label="ロゴの高さ (px)">
                                    <RangeInput
                                        value={data.header?.logoHeight || 40}
                                        onChange={(val) => updateHeader('logoHeight', parseInt(val))}
                                        min={20} max={100} step={4}
                                    />
                                </InputGroup>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Menu Items */}
            <section>
                <div className="bg-gray-800/30 p-4 rounded-xl border border-gray-700/50">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-sm font-bold text-white flex items-center gap-2">
                            <Menu size={16} className="text-green-400" /> ナビゲーション
                        </h2>
                        <button onClick={addMenu} className="text-blue-400 hover:text-white flex items-center gap-1 text-xs font-bold">
                            <Plus size={14} /> 追加
                        </button>
                    </div>

                    <div className="space-y-2">
                        {data.menuItems.map(item => (
                            <LinkEditor key={item.id} link={item} type="menu" onChange={(newItem) => handleMenuChange(item.id, newItem)} onDelete={() => deleteMenu(item.id)} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};
