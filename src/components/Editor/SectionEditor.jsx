/* eslint-disable */
import React from 'react';
import { AlignLeft, AlignCenter, AlignRight, Plus, Trash2, Crown, Star, Medal, Award, Sparkles, ImageIcon } from 'lucide-react';
import { TextInput, TextArea } from '../UI/Input';
import { Slider, ColorPicker } from '../UI/Input';
import { Button } from '../UI/Button';
import { AIGeneratorButton } from '../UI/AIGeneratorButton';
import { ChildSectionManager } from './ChildSectionManager';

// Internal Link Editor for inside sections (like 'links' type)
const LinkEditor = ({ link, onChange, onDelete }) => (
    <div className="bg-gray-900/50 p-2 rounded mb-2 border border-gray-700/50">
        <div className="space-y-2">
            <TextInput value={link.label} onChange={(val) => onChange({ ...link, label: val })} placeholder="ラベル" className="text-xs py-1" />
            <TextInput value={link.url} onChange={(val) => onChange({ ...link, url: val })} placeholder="URL" className="text-xs py-1" />
            <TextInput value={link.subtext} onChange={(val) => onChange({ ...link, subtext: val })} placeholder="サブテキスト" className="text-xs py-1" />
        </div>
        <button onClick={onDelete} className="text-red-400 text-xs mt-1 hover:underline">削除</button>
    </div>
);

const DESIGN_PATTERNS = [
    { id: 'standard', label: 'SANGO (Pop)' }, // Base
    { id: 'earth', label: 'Earth (Natural)' }, // New
    { id: 'masculine', label: 'SWELL (Cool)' }, // Stylish
    { id: 'luxury', label: 'Luxury (Elegant)' }, // New
    { id: 'cyber', label: 'Cyber (Tech)' }, // New
];

export const SectionEditor = ({ section, onChange }) => {

    // Helper to update specific field
    const update = (field, value) => {
        onChange({ ...section, [field]: value });
    };

    return (
        <div className="space-y-4">
            {/* --- COMMON SETTINGS (Background, Divider, Box) --- */}
            <div className="bg-gray-900/50 p-3 rounded-lg space-y-4">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">セクション設定</h3>

                {/* Background Settings */}
                <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 w-12">背景:</span>
                        <select
                            value={section.bgType || 'color'}
                            onChange={(e) => update('bgType', e.target.value)}
                            className="bg-gray-800 text-xs border border-gray-600 rounded px-1 py-1 text-white focus:outline-none"
                        >
                            <option value="color">単色</option>
                            <option value="image">画像</option>
                        </select>
                        {section.bgType === 'color' ? (
                            <ColorPicker value={section.bgValue || '#ffffff'} onChange={(val) => update('bgValue', val)} />
                        ) : (
                            <div className="flex-1 flex gap-1">
                                <TextInput value={section.bgValue} onChange={(val) => update('bgValue', val)} placeholder="画像URL" className="py-1 text-xs" />
                                <AIGeneratorButton onGenerate={(url) => update('bgValue', url)} initialPrompt="Background image" />
                            </div>
                        )}
                    </div>
                    {section.bgType === 'image' && (
                        <div className="flex items-center gap-2 px-1">
                            <span className="text-xs text-gray-500 w-12">暗さ:</span>
                            <Slider value={section.bgOverlay || 0} min={0} max={0.9} step={0.1} onChange={(val) => update('bgOverlay', val)} className="flex-1" />
                        </div>
                    )}
                </div>

                {/* Padding & Box Style */}
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                        <label className="text-[9px] text-gray-500 mb-1">上余白</label>
                        <select value={section.pt || 'pt-12'} onChange={(e) => update('pt', e.target.value)} className="bg-gray-800 text-xs border border-gray-600 rounded px-1 py-1 text-white">
                            <option value="pt-4">狭い</option>
                            <option value="pt-8">普通</option>
                            <option value="pt-12">広い</option>
                            <option value="pt-16">特大</option>
                            <option value="pt-0">なし</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[9px] text-gray-500 mb-1">下余白</label>
                        <select value={section.pb || 'pb-12'} onChange={(e) => update('pb', e.target.value)} className="bg-gray-800 text-xs border border-gray-600 rounded px-1 py-1 text-white">
                            <option value="pb-4">狭い</option>
                            <option value="pb-8">普通</option>
                            <option value="pb-12">広い</option>
                            <option value="pb-16">特大</option>
                            <option value="pb-0">なし</option>
                        </select>
                    </div>
                </div>
                {/* Divider Settings */}
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="text-[9px] text-gray-500 mb-1">上部区切り</label>
                        <select value={section.dividerTop || 'none'} onChange={(e) => update('dividerTop', e.target.value)} className="bg-gray-800 text-xs border border-gray-600 rounded px-1 py-1 w-full mb-1 text-white">
                            <option value="none">なし</option>
                            <option value="wave">波</option>
                            <option value="tilt-right">斜めR</option>
                            <option value="tilt-left">斜めL</option>
                            <option value="triangle">山</option>
                            <option value="curve">カーブ</option>
                        </select>
                        <ColorPicker value={section.dividerTopColor || '#ffffff'} onChange={(val) => update('dividerTopColor', val)} />
                    </div>
                    <div>
                        <label className="text-[9px] text-gray-500 mb-1">下部区切り</label>
                        <select value={section.dividerBottom || 'none'} onChange={(e) => update('dividerBottom', e.target.value)} className="bg-gray-800 text-xs border border-gray-600 rounded px-1 py-1 w-full mb-1 text-white">
                            <option value="none">なし</option>
                            <option value="wave">波</option>
                            <option value="tilt-right">斜めR</option>
                            <option value="tilt-left">斜めL</option>
                            <option value="triangle">山</option>
                            <option value="curve">カーブ</option>
                        </select>
                        <ColorPicker value={section.dividerBottomColor || '#ffffff'} onChange={(val) => update('dividerBottomColor', val)} />
                    </div>
                </div>
                <div>
                    <select value={section.boxStyle || 'none'} onChange={(e) => update('boxStyle', e.target.value)} className="bg-gray-800 text-xs border border-gray-600 rounded px-1 py-1 w-full text-white mb-2">
                        <option value="none">なし</option>
                        <option value="shadow">影付き箱</option>
                        <option value="border">線枠</option>
                        <option value="fill">塗りつぶし</option>
                        <option value="stitch">ステッチ</option>
                        <option value="double">二重線</option>
                        <option value="comic">コミック風</option>
                        <option value="neon">ネオン</option>
                        <option value="glass">ガラス風</option>
                    </select>
                    {section.boxStyle !== 'none' && (
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-[9px] text-gray-500 w-12 text-right">枠色:</span>
                            <ColorPicker value={section.boxColor || '#3b82f6'} onChange={(val) => update('boxColor', val)} />
                        </div>
                    )}
                </div>


            </div>

            {/* --- SPECIFIC TYPE FIELDS --- */}

            {section.type === 'text' && (
                <>
                    <TextInput value={section.title} onChange={(val) => update('title', val)} placeholder="見出し" />
                    <TextArea value={section.content} onChange={(val) => update('content', val)} placeholder="本文" />
                    <div className="flex flex-col gap-1 mb-3">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">文字サイズ</label>
                            <span className="text-[10px] text-gray-400 font-mono">{(section.textScale || 1.0)}x</span>
                        </div>
                        <Slider value={section.textScale || 1.0} min={0.5} max={3.0} step={0.1} onChange={(val) => update('textScale', val)} showValue={false} />
                    </div>
                    <div className="flex gap-2">
                        {['left', 'center', 'right'].map(align => (
                            <button key={align} onClick={() => update('align', align)} className={`p-1.5 rounded border transition-colors ${section.align === align ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-600 text-gray-400 hover:bg-gray-700'}`}>
                                {align === 'left' ? <AlignLeft size={14} /> : align === 'center' ? <AlignCenter size={14} /> : <AlignRight size={14} />}
                            </button>
                        ))}
                    </div>
                </>
            )}

            {section.type === 'image' && (
                <>
                    <div className="flex gap-1 mb-2">
                        <TextInput value={section.url} onChange={(val) => update('url', val)} placeholder="画像URL" />
                        <AIGeneratorButton onGenerate={(url) => update('url', url)} initialPrompt={section.caption || 'Image'} />
                    </div>
                    <TextInput value={section.caption} onChange={(val) => update('caption', val)} placeholder="キャプション" />

                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-gray-500 w-12">サイズ:</span>
                        <Slider value={section.width || 100} min={20} max={100} step={5} onChange={(val) => update('width', val)} />
                        <span className="text-xs text-gray-400 w-8 text-right">{section.width || 100}%</span>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">配置:</span>
                        <div className="flex gap-1">
                            {['left', 'center', 'right'].map(align => (
                                <button key={align} onClick={() => update('align', align)} className={`p-1 rounded border transition-colors ${section.align === align ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-600 text-gray-400 hover:bg-gray-700'}`}>
                                    {align === 'left' ? <AlignLeft size={14} /> : align === 'center' ? <AlignCenter size={14} /> : <AlignRight size={14} />}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {section.type === 'image_text' && (
                <>
                    <div className="flex gap-1 mb-2">
                        <TextInput value={section.image} onChange={(val) => update('image', val)} placeholder="画像URL" />
                        <AIGeneratorButton onGenerate={(url) => update('image', url)} initialPrompt={`${section.title || ''} ${section.content || ''}`} />
                    </div>
                    <TextInput value={section.title} onChange={(val) => update('title', val)} placeholder="見出し" />
                    <TextArea value={section.content} onChange={(val) => update('content', val)} placeholder="本文" />
                    <div className="space-y-4 bg-gray-900/40 p-4 rounded-xl border border-gray-800 mt-3">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">コンテンツ最大幅</label>
                                <span className="text-[10px] text-gray-400 font-mono">{(section.contentWidth || 1000)}px</span>
                            </div>
                            <Slider value={section.contentWidth || 1000} min={400} max={1200} step={10} onChange={(val) => update('contentWidth', val)} showValue={false} />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-xs text-gray-500">画像位置:</span>
                        <div className="flex bg-gray-900 p-1 rounded">
                            <button onClick={() => update('imagePosition', 'left')} className={`p-1.5 rounded ${section.imagePosition === 'left' ? 'bg-gray-700 text-white' : 'text-gray-500'}`}><AlignLeft size={14} /></button>
                            <button onClick={() => update('imagePosition', 'right')} className={`p-1.5 rounded ${section.imagePosition === 'right' ? 'bg-gray-700 text-white' : 'text-gray-500'}`}><AlignRight size={14} /></button>
                        </div>
                    </div>
                </>
            )}

            {section.type === 'heading' && (
                <>
                    <TextInput value={section.text} onChange={(val) => update('text', val)} placeholder="見出しテキスト" />
                    <TextInput value={section.subText} onChange={(val) => update('subText', val)} placeholder="サブテキスト" />
                    <div className="flex justify-between">
                        <div className="flex gap-2">
                            {['left', 'center', 'right'].map(align => (
                                <button key={align} onClick={() => update('style', align)} className={`p-1.5 rounded border transition-colors ${section.style === align ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-600 text-gray-400 hover:bg-gray-700'}`}>
                                    {align === 'left' ? <AlignLeft size={14} /> : align === 'center' ? <AlignCenter size={14} /> : <AlignRight size={14} />}
                                </button>
                            ))}
                        </div>
                        <div className="flex gap-2 text-xs">
                            <button onClick={() => update('design', 'simple')} className={`px-2 py-1 rounded border ${section.design === 'simple' ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-600 text-gray-400'}`}>シンプル</button>
                            <button onClick={() => update('design', 'underline')} className={`px-2 py-1 rounded border ${section.design === 'underline' ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-600 text-gray-400'}`}>下線</button>
                        </div>
                    </div>
                </>
            )}
            {section.type === 'button' && (
                <>
                    <TextInput value={section.label} onChange={(val) => update('label', val)} placeholder="ボタンの文字" />
                    <TextInput value={section.url} onChange={(val) => update('url', val)} placeholder="リンクURL" />

                    <div className="space-y-4 pt-2">
                        {/* Style / Align */}
                        <div className="flex justify-between items-center">
                            <div className="flex gap-1">
                                {['left', 'center', 'right'].map(align => (
                                    <button key={align} onClick={() => update('align', align)} className={`p-1.5 rounded border transition-colors ${section.align === align ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-600 text-gray-400 hover:bg-gray-700'}`}>
                                        {align === 'left' ? <AlignLeft size={14} /> : align === 'center' ? <AlignCenter size={14} /> : <AlignRight size={14} />}
                                    </button>
                                ))}
                            </div>
                            <div className="flex gap-1 text-xs">
                                <button onClick={() => update('style', 'fill')} className={`px-2 py-1 rounded border ${section.style === 'fill' ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-600 text-gray-400'}`}>塗り</button>
                                <button onClick={() => update('style', 'outline')} className={`px-2 py-1 rounded border ${section.style === 'outline' ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-600 text-gray-400'}`}>枠線</button>
                            </div>
                        </div>

                        {/* Size Selector */}
                        <div>
                            <label className="text-[10px] text-gray-500 mb-1 block">サイズ & 幅</label>
                            <div className="flex gap-2 mb-2">
                                {['S', 'M', 'L', 'XL'].map(size => (
                                    <button key={size} onClick={() => update('size', size)} className={`flex-1 py-1 text-xs rounded border transition-colors ${(section.size || 'M') === size ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-600 text-gray-400'}`}>
                                        {size}
                                    </button>
                                ))}
                            </div>
                            <div className="flex flex-col gap-1 mt-1">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">横幅</label>
                                    <span className="text-[10px] text-gray-400 font-mono">{section.width > 0 ? `${section.width}%` : '自動'}</span>
                                </div>
                                <Slider value={section.width || 0} min={0} max={100} step={10} onChange={(val) => update('width', val)} showValue={false} />
                            </div>
                        </div>

                        {/* Color Selector */}
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="text-[10px] text-gray-500 mb-1 block">ボタンカラー</label>
                                <ColorPicker value={section.color || '#374151'} onChange={(val) => update('color', val)} />
                            </div>
                            <div className="flex-1">
                                <label className="text-[10px] text-gray-500 mb-1 block">文字カラー</label>
                                <ColorPicker value={section.textColor || '#ffffff'} onChange={(val) => update('textColor', val)} />
                            </div>
                        </div>

                        {/* Effect Selector */}
                        <div>
                            <label className="text-[10px] text-gray-500 mb-1 block">エフェクト</label>
                            <div className="grid grid-cols-4 gap-2">
                                {[{ id: 'none', L: 'なし' }, { id: 'sparkle', L: 'キラッ' }, { id: 'float', L: '浮く' }, { id: '3d', L: '立体' }].map(eff => (
                                    <button key={eff.id} onClick={() => update('effect', eff.id)} className={`py-1 text-[10px] rounded border transition-colors ${(section.effect || 'none') === eff.id ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-600 text-gray-400'}`}>
                                        {eff.L}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}

            {section.type === 'video' && (
                <>
                    <TextInput value={section.url} onChange={(val) => update('url', val)} placeholder="動画URL (YouTube/MP4)" />
                    <TextInput value={section.caption} onChange={(val) => update('caption', val)} placeholder="キャプション" />

                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-gray-500 w-12">サイズ:</span>
                        <Slider value={section.width || 100} min={20} max={100} step={5} onChange={(val) => update('width', val)} />
                        <span className="text-xs text-gray-400 w-8 text-right">{section.width || 100}%</span>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">配置:</span>
                        <div className="flex gap-1">
                            {['left', 'center', 'right'].map(align => (
                                <button key={align} onClick={() => update('align', align)} className={`p-1 rounded border transition-colors ${section.align === align ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-600 text-gray-400 hover:bg-gray-700'}`}>
                                    {align === 'left' ? <AlignLeft size={14} /> : align === 'center' ? <AlignCenter size={14} /> : <AlignRight size={14} />}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {section.type === 'social' && (
                <>
                    <div className="flex justify-between items-center mb-4 bg-gray-900/30 p-2 rounded">
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">PC列数:</span>
                            {[1, 2, 3].map(num => (
                                <button key={num} onClick={() => update('columnCount', num)} className={`px-2 py-0.5 rounded text-xs border ${section.columnCount === num ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-600 text-gray-400'}`}>{num}</button>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-4 bg-gray-900/30 p-3 rounded-lg border border-gray-800 mb-4">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">コンテンツ最大幅</label>
                                <span className="text-[10px] text-gray-400 font-mono">{(section.contentWidth || 1000)}px</span>
                            </div>
                            <Slider value={section.contentWidth || 1000} min={400} max={1400} step={10} onChange={(val) => update('contentWidth', val)} showValue={false} />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">投稿間の余白</label>
                                <span className="text-[10px] text-gray-400 font-mono">{(section.itemSpacing || 32)}px</span>
                            </div>
                            <Slider value={section.itemSpacing || 32} min={0} max={80} step={4} onChange={(val) => update('itemSpacing', val)} showValue={false} />
                        </div>
                    </div>

                    <div className="space-y-4">
                        {(section.items || []).map((item, i) => (
                            <div key={item.id} className="bg-gray-900/50 p-3 rounded border border-gray-700 relative">
                                <button
                                    onClick={() => { const n = section.items.filter((_, idx) => idx !== i); update('items', n); }}
                                    className="absolute top-2 right-2 text-gray-500 hover:text-red-400"
                                >
                                    <Trash2 size={12} />
                                </button>

                                <div className="flex gap-2 mb-2">
                                    <button onClick={() => { const n = [...section.items]; n[i] = { ...item, platform: 'twitter' }; update('items', n); }} className={`flex-1 py-1 rounded text-[10px] border ${item.platform === 'twitter' ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-600 text-gray-400'}`}>Twitter</button>
                                    <button onClick={() => { const n = [...section.items]; n[i] = { ...item, platform: 'instagram' }; update('items', n); }} className={`flex-1 py-1 rounded text-[10px] border ${item.platform === 'instagram' ? 'bg-pink-600 border-pink-600 text-white' : 'border-gray-600 text-gray-400'}`}>Instagram</button>
                                </div>
                                <TextInput value={item.url} onChange={(val) => { const n = [...section.items]; n[i] = { ...item, url: val }; update('items', n); }} placeholder="投稿のURL" />
                            </div>
                        ))}
                        <Button onClick={() => update('items', [...(section.items || []), { id: Math.random(), platform: 'twitter', url: '' }])} variant="outline" className="w-full py-1 text-xs"><Plus size={14} /> SNSを追加</Button>
                    </div>
                </>
            )}
            {section.type === 'accordion' && (
                <div className="space-y-4">
                    <div className="flex gap-2">
                        {['simple', 'flat', 'card'].map(design => (
                            <button
                                key={design}
                                onClick={() => update('design', design)}
                                className={`flex-1 py-1.5 text-xs rounded border capitalize transition-colors ${(section.design || 'simple') === design
                                    ? 'bg-blue-600 border-blue-600 text-white'
                                    : 'border-gray-600 text-gray-400 hover:bg-gray-700'
                                    }`}
                            >
                                {design}
                            </button>
                        ))}
                    </div>
                    <div className="space-y-4 bg-gray-900/30 p-3 rounded-lg border border-gray-800">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">コンテンツ最大幅</label>
                                <span className="text-[10px] text-gray-400 font-mono">{(section.contentWidth || 800)}px</span>
                            </div>
                            <Slider value={section.contentWidth || 800} min={400} max={1200} step={10} onChange={(val) => update('contentWidth', val)} />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">項目の余白</label>
                                <span className="text-[10px] text-gray-400 font-mono">{(section.itemSpacing || 12)}px</span>
                            </div>
                            <Slider value={section.itemSpacing || 12} min={0} max={48} step={2} onChange={(val) => update('itemSpacing', val)} />
                        </div>
                    </div>
                    {
                        section.items.map((item, i) => (
                            <div key={item.id} className="space-y-2 pb-2 border-b border-gray-700">
                                <TextInput value={item.title} onChange={(val) => { const newItems = [...section.items]; newItems[i] = { ...item, title: val }; update('items', newItems); }} placeholder="質問" />
                                <TextArea value={item.content} onChange={(val) => { const newItems = [...section.items]; newItems[i] = { ...item, content: val }; update('items', newItems); }} placeholder="回答" />
                            </div>
                        ))
                    }
                    <Button onClick={() => update('items', [...section.items, { id: Math.random(), title: 'Q', content: 'A' }])} variant="outline" className="w-full py-1 text-xs"><Plus size={14} /> 追加</Button>
                </div >
            )}
            {
                section.type === 'post_card' && (
                    <>
                        <TextInput value={section.image} onChange={(val) => update('image', val)} placeholder="サムネイルURL" />
                        <TextInput value={section.date} onChange={(val) => update('date', val)} placeholder="日付" />
                        <TextInput value={section.title} onChange={(val) => update('title', val)} placeholder="記事タイトル" />
                        <TextArea value={section.excerpt} onChange={(val) => update('excerpt', val)} placeholder="抜粋" />
                        <TextInput value={section.url} onChange={(val) => update('url', val)} placeholder="記事URL" />
                    </>
                )
            }
            {
                section.type === 'links' && (
                    <div className="space-y-4">
                        <div className="space-y-4">
                            <div className="space-y-4 bg-gray-900/30 p-3 rounded-lg border border-gray-800">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">コンテンツ最大幅</label>
                                        <span className="text-[10px] text-gray-400 font-mono">{(section.contentWidth || 800)}px</span>
                                    </div>
                                    <Slider value={section.contentWidth || 800} min={400} max={1200} step={10} onChange={(val) => update('contentWidth', val)} />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">リンク間の余白</label>
                                        <span className="text-[10px] text-gray-400 font-mono">{(section.itemSpacing || 12)}px</span>
                                    </div>
                                    <Slider value={section.itemSpacing || 12} min={0} max={48} step={2} onChange={(val) => update('itemSpacing', val)} />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            {section.links.map((link, i) => (
                                <LinkEditor key={link.id} link={link} onChange={(newLink) => { const n = [...section.links]; n[i] = newLink; update('links', n); }} onDelete={() => { const n = section.links.filter(l => l.id !== link.id); update('links', n); }} />
                            ))}
                            <Button onClick={() => update('links', [...section.links, { id: Math.random(), label: 'Button', url: '#', subtext: '' }])} variant="outline" className="w-full py-1 text-xs"><Plus size={14} /> 追加</Button>
                        </div>
                    </div>
                )
            }

            {/* Columns (Complex!) */}
            {
                section.type === 'columns' && (
                    <>
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">数:</span>
                                {[1, 2, 3, 4].map(num => (
                                    <button key={num} onClick={() => update('columnCount', num)} className={`px-2 py-0.5 rounded text-xs border ${section.columnCount === num ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-600 text-gray-400'}`}>{num}</button>
                                ))}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">間隔:</span>
                                <Slider value={section.itemSpacing || section.gap || 32} min={0} max={100} step={4} onChange={(val) => update('itemSpacing', val)} />
                            </div>
                        </div>
                        <div className="space-y-4 bg-gray-900/30 p-3 rounded-lg border border-gray-800 mb-4">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">コンテンツ最大幅</label>
                                    <span className="text-[10px] text-gray-400 font-mono">{(section.contentWidth || 1200)}px</span>
                                </div>
                                <Slider value={section.contentWidth || 1200} min={600} max={1600} step={20} onChange={(val) => update('contentWidth', val)} />
                            </div>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs text-gray-500">タイプ:</span>
                            <select value={section.colType || 'card'} onChange={(e) => update('colType', e.target.value)} className="bg-gray-900 text-xs border border-gray-700 rounded px-1 py-0.5 text-white">
                                <option value="card">画像+文</option>
                                <option value="text">文字</option>
                                <option value="image">画像</option>
                                <option value="video">動画</option>
                                <option value="social">SNS</option>
                            </select>
                        </div>

                        <div className="space-y-4 pl-2 border-l-2 border-gray-700">
                            {section.items.map((item, i) => (
                                <div key={item.id} className="space-y-2 pt-2 border-t border-gray-800 first:border-0 relative">
                                    <div className="flex justify-between items-center">
                                        <div className="text-xs text-gray-500 font-bold mb-1">Item {i + 1}</div>
                                        <button onClick={() => { const n = section.items.filter((_, idx) => idx !== i); update('items', n); }} className="text-gray-500 hover:text-red-400"><Trash2 size={12} /></button>
                                    </div>

                                    {(section.colType === 'card' || section.colType === 'text') && <><TextInput value={item.title} onChange={(val) => { const n = [...section.items]; n[i] = { ...item, title: val }; update('items', n); }} placeholder="タイトル" /><TextInput value={item.text} onChange={(val) => { const n = [...section.items]; n[i] = { ...item, text: val }; update('items', n); }} placeholder="テキスト" /></>}

                                    {(section.colType === 'card' || section.colType === 'image') && (
                                        <div className="flex gap-1">
                                            <TextInput value={item.image} onChange={(val) => { const n = [...section.items]; n[i] = { ...item, image: val }; update('items', n); }} placeholder="画像URL" />
                                            <AIGeneratorButton onGenerate={(url) => { const n = [...section.items]; n[i] = { ...item, image: url }; update('items', n); }} initialPrompt={`${item.title || ''} ${item.text || ''}`} />
                                        </div>
                                    )}

                                    {(section.colType === 'video' || section.colType === 'social') && <TextInput value={item.url} onChange={(val) => { const n = [...section.items]; n[i] = { ...item, url: val }; update('items', n); }} placeholder="URL" />}

                                    {section.colType === 'social' && <div className="flex gap-2"><button onClick={() => { const n = [...section.items]; n[i] = { ...item, platform: 'twitter' }; update('items', n); }} className={`px-2 py-1 text-[10px] rounded ${item.platform === 'twitter' ? 'bg-blue-600' : 'bg-gray-700'}`}>Tw</button><button onClick={() => { const n = [...section.items]; n[i] = { ...item, platform: 'instagram' }; update('items', n); }} className={`px-2 py-1 text-[10px] rounded ${item.platform === 'instagram' ? 'bg-pink-600' : 'bg-gray-700'}`}>Ig</button></div>}
                                </div>
                            ))}
                            <Button onClick={() => update('items', [...section.items, { id: Math.random(), title: 'New Item', text: 'Content', image: 'https://placehold.co/600x400' }])} variant="outline" className="w-full py-1 text-xs"><Plus size={14} /> 追加</Button>
                        </div>
                    </>
                )
            }

            {
                section.type === 'box' && (
                    <>
                        <div className="mb-4">
                            <label className="text-[10px] text-gray-500 mb-1 block">デザイン</label>
                            <div className="flex gap-1 flex-wrap">
                                {['simple', 'sticky', 'ribbon', 'gradient', 'glass', 'comic', 'dashed', 'solid', 'double', 'neon'].map(d => (
                                    <button key={d} onClick={() => update('design', d)} className={`px-2 py-1 text-[10px] rounded border capitalize ${(section.design || 'simple') === d ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-600 text-gray-400'}`}>{d}</button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4 bg-gray-900/30 p-3 rounded-lg border border-gray-800 mb-4">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">コンテンツ最大幅</label>
                                    <span className="text-[10px] text-gray-400 font-mono">{(section.contentWidth || 800)}px</span>
                                </div>
                                <Slider value={section.contentWidth || 800} min={400} max={1200} step={10} onChange={(val) => update('contentWidth', val)} />
                            </div>
                        </div>

                        <div className="bg-gray-800/50 p-3 rounded-lg space-y-3 mb-4">
                            <label className="text-[10px] text-gray-500 uppercase tracking-wider block">内側余白 (px)</label>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[9px] text-gray-500">上: {section.pTop || 0}px</span>
                                    <Slider value={section.pTop || 0} min={0} max={160} step={8} onChange={(val) => update('pTop', val)} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[9px] text-gray-500">下: {section.pBottom || 0}px</span>
                                    <Slider value={section.pBottom || 0} min={0} max={160} step={8} onChange={(val) => update('pBottom', val)} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[9px] text-gray-500">左: {section.pLeft || 0}px</span>
                                    <Slider value={section.pLeft || 0} min={0} max={160} step={8} onChange={(val) => update('pLeft', val)} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[9px] text-gray-500">右: {section.pRight || 0}px</span>
                                    <Slider value={section.pRight || 0} min={0} max={160} step={8} onChange={(val) => update('pRight', val)} />
                                </div>
                            </div>
                        </div>

                        {section.design && section.design !== 'simple' && (
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-[10px] text-gray-500 w-12">枠色:</span>
                                <ColorPicker value={section.boxColor || '#3b82f6'} onChange={(val) => update('boxColor', val)} />
                            </div>
                        )}

                        <TextInput value={section.title} onChange={(val) => update('title', val)} placeholder="タイトル" />
                        {!section.children && <TextArea value={section.content} onChange={(val) => update('content', val)} placeholder="内容" />}

                        <ChildSectionManager childrenSections={section.children || []} onChange={(newChildren) => update('children', newChildren)} />
                    </>
                )
            }

            {
                section.type === 'full_width' && (
                    <>
                        <div className="p-2 bg-blue-500/10 border border-blue-500/30 rounded text-center text-xs text-blue-200 mb-4">
                            画面幅いっぱいに広がるセクションです
                        </div>
                        <ChildSectionManager childrenSections={section.children || []} onChange={(newChildren) => update('children', newChildren)} />
                    </>
                )
            }


            {
                section.type === 'conversion_panel' && (
                    <div className="space-y-4">
                        {/* Sticky option removed per user request */}

                        {/* Design Selector for CV Panel */}
                        <div className="space-y-2">
                            <label className="text-[10px] text-gray-500 font-bold uppercase">デザインスタイル</label>
                            <div className="flex flex-wrap gap-1">
                                {DESIGN_PATTERNS.map(d => (
                                    <button
                                        key={d.id}
                                        onClick={() => update('design', d.id)}
                                        className={`px-2 py-1 text-[10px] rounded border transition-all ${((section.design || 'standard') === d.id)
                                            ? 'bg-blue-600 border-blue-600 text-white shadow'
                                            : 'border-gray-700 text-gray-400 hover:bg-gray-800'}`}
                                    >
                                        {d.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4 bg-gray-900/30 p-3 rounded-lg border border-gray-800">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">コンテンツ最大幅</label>
                                    <span className="text-[10px] text-gray-400 font-mono">{(section.contentWidth || 800)}px</span>
                                </div>
                                <Slider value={section.contentWidth || 800} min={300} max={1200} step={10} onChange={(val) => update('contentWidth', val)} />
                            </div>
                        </div>

                        <TextInput value={section.title} onChange={(val) => update('title', val)} placeholder="パネル上のミニテキスト (例: 今だけ50%OFF)" />
                        <TextArea value={section.content} onChange={(val) => update('content', val)} placeholder="メインテキスト (例: 今すぐ無料体験にお申し込みいただき...)" rows={3} />

                        <div className="space-y-3">
                            <label className="text-xs text-gray-500">ボタンリスト</label>
                            {(section.buttons || []).map((btn, i) => (
                                <div key={i} className="bg-gray-900/50 p-3 rounded border border-gray-700 relative">
                                    <button
                                        onClick={() => { const n = section.buttons.filter((_, idx) => idx !== i); update('buttons', n); }}
                                        className="absolute top-2 right-2 text-red-400 text-xs hover:text-red-300"
                                    >
                                        削除
                                    </button>
                                    <div className="space-y-2 pr-8">
                                        <TextInput value={btn.label} onChange={(val) => { const n = [...(section.buttons || [])]; n[i] = { ...btn, label: val }; update('buttons', n); }} placeholder="ボタンの文字" />
                                        <TextInput value={btn.url} onChange={(val) => { const n = [...(section.buttons || [])]; n[i] = { ...btn, url: val }; update('buttons', n); }} placeholder="URL" />

                                        <div className="flex gap-2">
                                            <select
                                                value={btn.color}
                                                onChange={(e) => { const n = [...(section.buttons || [])]; n[i] = { ...btn, color: e.target.value }; update('buttons', n); }}
                                                className="bg-gray-800 text-xs text-white border border-gray-600 rounded px-1 py-1 flex-1"
                                            >
                                                <option value="orange">オレンジ (Amazon)</option>
                                                <option value="red">赤 (楽天)</option>
                                                <option value="green">緑 (LINE)</option>
                                                <option value="blue">青</option>
                                                <option value="black">黒</option>
                                            </select>
                                            <select
                                                value={btn.icon}
                                                onChange={(e) => { const n = [...(section.buttons || [])]; n[i] = { ...btn, icon: e.target.value }; update('buttons', n); }}
                                                className="bg-gray-800 text-xs text-white border border-gray-600 rounded px-1 py-1 w-20"
                                            >
                                                <option value="cart">カート</option>
                                                <option value="line">LINE</option>
                                                <option value="link">リンク</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <Button
                                onClick={() => update('buttons', [...(section.buttons || []), { label: '購入する', url: '#', color: 'orange', icon: 'cart' }])}
                                variant="outline"
                                className="w-full py-2 text-xs"
                            >
                                <Plus size={14} /> ボタンを追加
                            </Button>
                        </div>

                        <TextInput value={section.microCopy} onChange={(val) => update('microCopy', val)} placeholder="ボタン下の注釈 (例: 送料無料キャンペーン中)" />
                    </div>
                )
            }

            {
                section.type === 'point_list' && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="text-[10px] text-gray-500 mb-1 block">デザイン</label>
                                <div className="flex gap-1 flex-wrap">
                                    {DESIGN_PATTERNS.map(d => (
                                        <button key={d.id} onClick={() => update('design', d.id)} className={`px-2 py-1 text-[10px] rounded border capitalize ${(section.design || 'standard') === d.id ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-600 text-gray-400'}`}>{d.label}</button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <label className="text-[10px] text-gray-500 mb-1 block">レイアウト</label>
                                    <div className="flex bg-gray-900/50 p-0.5 rounded-lg border border-gray-800">
                                        <button onClick={() => update('layout', 'grid')} className={`flex-1 py-1 text-[9px] rounded transition-all ${(section.layout || 'grid') === 'grid' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}>横並び</button>
                                        <button onClick={() => update('layout', 'vertical')} className={`flex-1 py-1 text-[9px] rounded transition-all ${section.layout === 'vertical' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}>縦並び</button>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] text-gray-500 mb-0.5 block">バッジ色</label>
                                    <div className="flex gap-1">
                                        <TextInput value={section.badgeText} onChange={(val) => update('badgeText', val)} placeholder="POINT" className="flex-1 text-[9px] py-1" />
                                        <ColorPicker value={section.badgeColor || '#eab308'} onChange={(val) => update('badgeColor', val)} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 bg-gray-900/40 p-4 rounded-xl border border-gray-800">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">コンテンツ最大幅</label>
                                    <span className="text-[10px] text-gray-400 font-mono">{(section.contentWidth || 1000)}px</span>
                                </div>
                                <Slider value={section.contentWidth || 1000} min={600} max={1400} step={10} onChange={(val) => update('contentWidth', val)} showValue={false} />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">項目の余白</label>
                                    <span className="text-[10px] text-gray-400 font-mono">{(section.itemSpacing || 48)}px</span>
                                </div>
                                <Slider value={section.itemSpacing || 48} min={8} max={120} step={4} onChange={(val) => update('itemSpacing', val)} showValue={false} />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs text-gray-500">ポイント一覧 (画像+テキスト)</label>
                            {(section.items || []).map((item, i) => (
                                <div key={i} className="bg-gray-900/50 p-3 rounded border border-gray-700 relative">
                                    <button
                                        onClick={() => { const n = section.items.filter((_, idx) => idx !== i); update('items', n); }}
                                        className="absolute top-2 right-2 text-red-400 text-xs hover:text-red-300"
                                    >
                                        削除
                                    </button>
                                    <div className="space-y-2 pr-8">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-bold bg-yellow-500/20 text-yellow-300 px-1.5 py-0.5 rounded">POINT {i + 1}</span>
                                        </div>
                                        <TextInput value={item.title} onChange={(val) => { const n = [...(section.items || [])]; n[i] = { ...item, title: val }; update('items', n); }} placeholder="ポイント見出し" />
                                        <TextArea value={item.desc} onChange={(val) => { const n = [...(section.items || [])]; n[i] = { ...item, desc: val }; update('items', n); }} placeholder="説明文" />
                                        <div className="flex gap-1">
                                            <TextInput value={item.image} onChange={(val) => { const n = [...(section.items || [])]; n[i] = { ...item, image: val }; update('items', n); }} placeholder="画像URL" />
                                            <AIGeneratorButton onGenerate={(url) => { const n = [...(section.items || [])]; n[i] = { ...item, image: url }; update('items', n); }} initialPrompt={`${item.title || ''} ${item.desc || ''}`} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <Button
                                onClick={() => update('items', [...(section.items || []), { id: Math.random(), title: 'Feature', desc: 'Description...', image: 'https://placehold.co/600x400' }])}
                                variant="outline"
                                className="w-full py-2 text-xs"
                            >
                                <Plus size={14} /> ポイントを追加
                            </Button>
                        </div>
                    </div>
                )
            }

            {
                section.type === 'problem_checklist' && (
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">デザインパターン</label>
                            <div className="grid grid-cols-3 gap-1">
                                {DESIGN_PATTERNS.map(d => (
                                    <button
                                        key={d.id}
                                        onClick={() => update('design', d.id)}
                                        className={`py-2 text-[10px] rounded border transition-all ${((section.design || 'standard') === d.id) ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'border-gray-700 bg-gray-900 text-gray-500 hover:text-gray-300'}`}
                                    >
                                        {d.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4 bg-gray-900/40 p-4 rounded-xl border border-gray-800">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">コンテンツ最大幅</label>
                                    <span className="text-[10px] text-gray-400 font-mono">{(section.contentWidth || 800)}px</span>
                                </div>
                                <Slider
                                    value={section.contentWidth || 800}
                                    min={400}
                                    max={1200}
                                    step={10}
                                    onChange={(val) => update('contentWidth', val)}
                                    showValue={false}
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">項目の余白・密度</label>
                                    <span className="text-[10px] text-gray-400 font-mono">{(section.itemSpacing || 16)}px</span>
                                </div>
                                <Slider
                                    value={section.itemSpacing || 16}
                                    min={4}
                                    max={64}
                                    step={2}
                                    onChange={(val) => update('itemSpacing', val)}
                                    showValue={false}
                                />
                            </div>
                        </div>

                        {(section.design === 'impact' || section.design === 'graphical') && (
                            <div className="bg-blue-900/10 border border-blue-900/20 p-4 rounded-xl space-y-4">
                                <div>
                                    <label className="text-[10px] font-bold text-blue-400 mb-2 block px-1">インパクト用：背景画像</label>
                                    <div className="flex gap-2">
                                        <TextInput
                                            value={section.backgroundImage}
                                            onChange={(val) => update('backgroundImage', val)}
                                            placeholder="背景画像のURL"
                                            className="flex-1"
                                        />
                                        <AIGeneratorButton
                                            onGenerate={(url) => update('backgroundImage', url)}
                                            initialPrompt={`Dramatic cinematic background for emotional pain points: ${section.title}`}
                                        />
                                    </div>
                                </div>
                                <TextInput
                                    value={section.footerText}
                                    onChange={(val) => update('footerText', val)}
                                    placeholder="フッターテキスト (例: 全て解決します！)"
                                />
                            </div>
                        )}

                        <TextInput value={section.title} onChange={(val) => update('title', val)} placeholder="セクション見出し (例: こんなお悩みありませんか？)" />

                        <div className="space-y-3">
                            <label className="text-xs text-gray-500">お悩みリスト</label>
                            {(section.items || []).map((item, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <span className="text-red-400 font-bold">✔</span>
                                    <TextInput value={item.text} onChange={(val) => { const n = [...(section.items || [])]; n[i] = { ...item, text: val }; update('items', n); }} placeholder="悩みテキスト" className="flex-1" />
                                    <button onClick={() => { const n = section.items.filter((_, idx) => idx !== i); update('items', n); }} className="text-gray-500 hover:text-red-400">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))}
                            <Button
                                onClick={() => update('items', [...(section.items || []), { text: '新しい悩み項目' }])}
                                variant="outline"
                                className="w-full py-2 text-xs"
                            >
                                <Plus size={14} /> 項目を追加
                            </Button>
                        </div>
                    </div>
                )
            }

            {
                section.type === 'speech_bubble' && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="text-[10px] text-gray-500 mb-1 block">キャラクター</label>
                                <div className="space-y-1">
                                    <TextInput value={section.characterImage} onChange={(val) => update('characterImage', val)} placeholder="画像URL" />
                                    <AIGeneratorButton onGenerate={(url) => update('characterImage', url)} initialPrompt="Cute mascot character face" />
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] text-gray-500 mb-1 block">名前</label>
                                <TextInput value={section.characterName} onChange={(val) => update('characterName', val)} placeholder="名前 (任意)" />
                            </div>
                        </div>

                        <div>
                            <label className="text-[9px] text-gray-500 mb-1 block uppercase font-bold tracking-widest">デザインスタイル</label>
                            <div className="grid grid-cols-3 gap-1">
                                {DESIGN_PATTERNS.map(d => (
                                    <button key={d.id} onClick={() => update('design', d.id)} className={`py-1 text-[9px] font-bold rounded border capitalize ${(section.design || 'standard') === d.id ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20' : 'border-gray-800 text-gray-400 hover:bg-gray-800 opacity-60'}`}>
                                        {d.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <TextArea value={section.text} onChange={(val) => update('text', val)} placeholder="会話テキスト" rows={4} />

                        <div className="space-y-4 bg-gray-900/30 p-3 rounded-lg border border-gray-800">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">コンテンツ最大幅</label>
                                    <span className="text-[10px] text-gray-400 font-mono">{(section.contentWidth || 800)}px</span>
                                </div>
                                <Slider value={section.contentWidth || 800} min={400} max={1200} step={10} onChange={(val) => update('contentWidth', val)} />
                            </div>
                        </div>

                        <div className="flex justify-between items-center border-t border-gray-700 pt-2">
                            <div className="flex gap-2">
                                <div className="flex flex-col">
                                    <label className="text-[9px] text-gray-500">位置</label>
                                    <div className="flex bg-gray-900 p-0.5 rounded border border-gray-700">
                                        <button onClick={() => update('align', 'right')} className={`px-2 py-1 text-[10px] rounded ${section.align !== 'left' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}>右キャラ</button>
                                        <button onClick={() => update('align', 'left')} className={`px-2 py-1 text-[10px] rounded ${section.align === 'left' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}>左キャラ</button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-20">
                                <label className="text-[9px] text-gray-500">色</label>
                                <ColorPicker value={section.bubbleColor || '#ffffff'} onChange={(val) => update('bubbleColor', val)} />
                            </div>
                        </div>
                    </div>
                )
            }
            {
                section.type === 'pricing' && (
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="text-[10px] text-gray-500 mb-1 block uppercase tracking-widest font-bold">デザインパターン</label>
                                <div className="flex gap-1 flex-wrap">
                                    {DESIGN_PATTERNS.map(({ id, label }) => (
                                        <button
                                            key={id}
                                            onClick={() => update('design', id)}
                                            className={`px-2 py-1.5 text-[10px] rounded border capitalize transition-all ${(section.design || 'standard') === id ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20' : 'border-gray-700 text-gray-400 hover:bg-gray-800'}`}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="w-20">
                                <label className="text-[10px] text-gray-500 mb-1 block uppercase tracking-widest font-bold">メイン色</label>
                                <ColorPicker value={section.accentColor || '#3b82f6'} onChange={(val) => update('accentColor', val)} />
                            </div>
                        </div>

                        <div className="space-y-4 bg-gray-900/40 p-4 rounded-xl border border-gray-800">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">コンテンツ最大幅</label>
                                    <span className="text-[10px] text-gray-400 font-mono">{(section.contentWidth || 1100)}px</span>
                                </div>
                                <Slider value={section.contentWidth || 1100} min={600} max={1400} step={10} onChange={(val) => update('contentWidth', val)} showValue={false} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">価格サイズ倍率</label>
                                        <span className="text-[10px] text-gray-400 font-mono">{(section.priceScale || 1.0).toFixed(1)}x</span>
                                    </div>
                                    <Slider value={section.priceScale || 1.0} min={0.5} max={2.0} step={0.1} onChange={(val) => update('priceScale', val)} showValue={false} />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">プラン間の余白</label>
                                        <span className="text-[10px] text-gray-400 font-mono">{(section.itemSpacing || 24)}px</span>
                                    </div>
                                    <Slider value={section.itemSpacing || 24} min={8} max={64} step={4} onChange={(val) => update('itemSpacing', val)} showValue={false} />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs text-gray-500">プラン管理</label>
                            {(section.plans || []).map((plan, i) => (
                                <div key={plan.id} className="bg-gray-900/50 p-3 rounded border border-gray-700 relative space-y-3">
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => { const n = [...section.plans]; n[i] = { ...plan, isFeatured: !plan.isFeatured }; update('plans', n); }}
                                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${plan.isFeatured ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'}`}
                                            >
                                                おすすめ設定
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => { const n = section.plans.filter((_, idx) => idx !== i); update('plans', n); }}
                                            className="text-red-400 hover:text-red-300"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <TextInput value={plan.name} onChange={(val) => { const n = [...section.plans]; n[i] = { ...plan, name: val }; update('plans', n); }} placeholder="プラン名" />
                                        <div className="flex gap-1">
                                            <TextInput value={plan.buttonText} onChange={(val) => { const n = [...section.plans]; n[i] = { ...plan, buttonText: val }; update('plans', n); }} placeholder="ボタン文字" className="flex-1" />
                                            <button
                                                onClick={() => { const n = [...section.plans]; n[i] = { ...plan, showButton: plan.showButton === false }; update('plans', n); }}
                                                className={`px-2 rounded border transition-colors ${plan.showButton !== false ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-600 text-gray-400'}`}
                                                title="ボタンを表示"
                                            >
                                                {plan.showButton !== false ? 'ON' : 'OFF'}
                                            </button>
                                        </div>
                                    </div>
                                    <TextInput
                                        value={plan.subtext || ''}
                                        onChange={(val) => { const n = [...section.plans]; n[i] = { ...plan, subtext: val }; update('plans', n); }}
                                        placeholder="サブテキスト (例: 個人向け, 一番人気)"
                                        className="py-1 text-[10px]"
                                    />

                                    <div className="space-y-2">
                                        <label className="text-[9px] text-gray-500 block">アイコン & 表記</label>
                                        <div className="flex gap-2 items-center">
                                            <div className="flex bg-gray-900 p-1 rounded border border-gray-700">
                                                {[
                                                    { id: 'sparkle', Icon: Sparkles },
                                                    { id: 'crown', Icon: Crown },
                                                    { id: 'star', Icon: Star },
                                                    { id: 'medal', Icon: Medal },
                                                    { id: 'award', Icon: Award }
                                                ].map(({ id, Icon }) => (
                                                    <button
                                                        key={id}
                                                        onClick={() => { const n = [...section.plans]; n[i] = { ...plan, icon: id }; update('plans', n); }}
                                                        className={`p-1.5 rounded transition-colors ${plan.icon === id ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                                                    >
                                                        <Icon size={12} className={plan.icon === id ? 'text-white' : 'text-gray-400'} />
                                                    </button>
                                                ))}
                                            </div>
                                            <TextInput
                                                value={plan.badgeText}
                                                onChange={(val) => { const n = [...section.plans]; n[i] = { ...plan, badgeText: val }; update('plans', n); }}
                                                placeholder="バッジ文言"
                                                className="flex-1 py-1 text-[10px]"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[9px] text-gray-500 block font-bold uppercase tracking-tight">アクセント色</label>
                                        <ColorPicker
                                            value={plan.color || '#3b82f6'}
                                            onChange={(val) => { const n = [...section.plans]; n[i] = { ...plan, color: val }; update('plans', n); }}
                                        />
                                    </div>

                                    <div className="flex gap-2">
                                        <TextInput value={plan.price} onChange={(val) => { const n = [...section.plans]; n[i] = { ...plan, price: val }; update('plans', n); }} placeholder="価格 (例: ¥9,800)" className="flex-1" />
                                        <TextInput value={plan.period} onChange={(val) => { const n = [...section.plans]; n[i] = { ...plan, period: val }; update('plans', n); }} placeholder="単位 (例: /月)" className="w-16" />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[9px] text-gray-500">特徴リスト (カンマ区切り)</label>
                                        <TextArea
                                            value={plan.features.join(',')}
                                            onChange={(val) => {
                                                const n = [...section.plans];
                                                n[i] = { ...plan, features: val.split(',').map(s => s.trim()) };
                                                update('plans', n);
                                            }}
                                            placeholder="機能1, 機能2, ..."
                                            rows={2}
                                        />
                                    </div>
                                </div>
                            ))}
                            <Button
                                onClick={() => update('plans', [...(section.plans || []), { id: Math.random(), name: 'New Plan', price: '¥0', period: '/月', features: ['初期費用0円'], buttonText: '開始する', isFeatured: false }])}
                                variant="outline"
                                className="w-full py-2 text-xs"
                            >
                                <Plus size={14} /> プランを追加
                            </Button>
                        </div>
                    </div>
                )
            }

            {/* --- NEW COMPONENTS EDITORS --- */}

            {
                section.type === 'process' && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="text-[10px] text-gray-500 mb-1 block uppercase font-bold tracking-tight">デザインパターン</label>
                                <div className="grid grid-cols-3 gap-1">
                                    {DESIGN_PATTERNS.map(d => (
                                        <button
                                            key={d.id}
                                            onClick={() => update('design', d.id)}
                                            className={`py-1.5 text-[10px] rounded border transition-all ${(section.design || 'standard') === d.id ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20' : 'border-gray-700 text-gray-400 hover:bg-gray-800'}`}
                                        >
                                            {d.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] text-gray-500 mb-1 block">アクセント色</label>
                                <ColorPicker value={section.accentColor || '#3b82f6'} onChange={(val) => update('accentColor', val)} />
                            </div>
                        </div>

                        <div className="space-y-4 bg-gray-900/40 p-4 rounded-xl border border-gray-800">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">コンテンツ最大幅</label>
                                    <span className="text-[10px] text-gray-400 font-mono">{(section.contentWidth || 800)}px</span>
                                </div>
                                <Slider value={section.contentWidth || 800} min={400} max={1200} step={10} onChange={(val) => update('contentWidth', val)} showValue={false} />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-[10px] text-gray-500">文字サイズ</label>
                                    <span className="text-[10px] text-gray-400">{(section.textScale || 1.0).toFixed(1)}x</span>
                                </div>
                                <Slider value={section.textScale || 1.0} min={0.5} max={1.5} step={0.1} onChange={(val) => update('textScale', val)} showValue={false} />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">ステップ間の余白</label>
                                    <span className="text-[10px] text-gray-400 font-mono">{(section.itemSpacing || 32)}px</span>
                                </div>
                                <Slider value={section.itemSpacing || 32} min={8} max={120} step={4} onChange={(val) => update('itemSpacing', val)} showValue={false} />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs text-gray-500 font-bold">ステップ管理</label>
                            {(section.steps || []).map((step, i) => (
                                <div key={i} className="bg-gray-900/50 p-3 rounded border border-gray-700 relative space-y-3 group">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-bold bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded">STEP {i + 1}</span>
                                        <button onClick={() => { const n = section.steps.filter((_, idx) => idx !== i); update('steps', n); }} className="text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={12} /></button>
                                    </div>
                                    <div className="space-y-2">
                                        <TextInput value={step.title} onChange={(val) => { const n = [...section.steps]; n[i] = { ...step, title: val }; update('steps', n); }} placeholder="タイトル" className="text-xs font-bold" />
                                        <TextArea value={step.content} onChange={(val) => { const n = [...section.steps]; n[i] = { ...step, content: val, text: val }; update('steps', n); }} placeholder="内容" className="text-xs" rows={2} />

                                        {/* 画像設定 (Simple以外で使用可能) */}
                                        <div className="space-y-2 pt-1 border-t border-gray-800/50">
                                            <label className="text-[9px] text-gray-600 uppercase font-bold tracking-tight block">画像 / イラスト</label>
                                            <div className="flex gap-2 items-center">
                                                <div className="w-12 h-12 bg-gray-900 rounded border border-gray-700 flex-shrink-0 overflow-hidden">
                                                    {step.image ? <img src={step.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-700"><ImageIcon size={16} /></div>}
                                                </div>
                                                <div className="flex-1 space-y-1">
                                                    <div className="flex gap-1">
                                                        <TextInput value={step.image} onChange={(val) => { const n = [...section.steps]; n[i] = { ...step, image: val }; update('steps', n); }} placeholder="画像URL" className="text-[10px] py-1" />
                                                        <AIGeneratorButton onGenerate={(url) => { const n = [...section.steps]; n[i] = { ...step, image: url }; update('steps', n); }} initialPrompt={`${step.title} steps illustration`} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <Button onClick={() => update('steps', [...(section.steps || []), { title: 'New Step', content: 'Description', image: '' }])} variant="outline" className="w-full py-2 text-xs"><Plus size={14} /> ステップを追加</Button>
                        </div>
                    </div>
                )
            }

            {
                section.type === 'staff' && (
                    <div className="space-y-4">
                        <div className="bg-gray-900 shadow-inner p-3 rounded-xl space-y-4 border border-gray-800">
                            <div>
                                <label className="text-[10px] text-blue-400 font-bold mb-2 block uppercase tracking-tighter">デザインパターン</label>
                                <div className="grid grid-cols-3 gap-1">
                                    {DESIGN_PATTERNS.map(d => (
                                        <button
                                            key={d.id}
                                            onClick={() => update('design', d.id)}
                                            className={`py-2 text-[10px] rounded-lg border transition-all ${section.design === d.id
                                                ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/40'
                                                : 'border-gray-700 text-gray-400 hover:bg-gray-800'
                                                }`}
                                        >
                                            {d.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4 bg-gray-900/40 p-4 rounded-xl border border-gray-800">
                                <div className="flex flex-col gap-1">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-[10px] text-gray-500">写真サイズ</label>
                                        <span className="text-[10px] text-gray-400 font-mono">{section.imgSize || 128}px</span>
                                    </div>
                                    <Slider value={section.imgSize || 128} min={48} max={240} step={8} onChange={(val) => update('imgSize', val)} showValue={false} />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-[10px] text-gray-500">カラム数 (デスクトップ)</label>
                                        <span className="text-[10px] text-gray-400 font-mono">{section.cols || 3}列</span>
                                    </div>
                                    <Slider value={section.cols || 3} min={1} max={4} step={1} onChange={(val) => update('cols', val)} showValue={false} />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-[10px] text-gray-500">カラム数 (モバイル)</label>
                                        <span className="text-[10px] text-gray-400 font-mono">{section.colsMobile || 1}列</span>
                                    </div>
                                    <Slider value={section.colsMobile || 1} min={1} max={2} step={1} onChange={(val) => update('colsMobile', val)} showValue={false} />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="text-xs text-gray-500 font-bold">メンバー管理</label>
                                <Button onClick={() => update('members', [...(section.members || []), { name: '名前', role: '役職', desc: '紹介文', image: '' }])} variant="outline" className="h-6 px-2 text-[10px]"><Plus size={10} /> 追加</Button>
                            </div>
                            {(section.members || []).map((member, i) => (
                                <div key={i} className="bg-gray-900/50 p-3 rounded-lg border border-gray-800 relative space-y-2 group">
                                    <button onClick={() => { const n = section.members.filter((_, idx) => idx !== i); update('members', n); }} className="absolute top-2 right-2 text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={12} /></button>
                                    <div className="space-y-2 pr-4">
                                        <div className="grid grid-cols-2 gap-2">
                                            <TextInput value={member.name} onChange={(val) => { const n = [...section.members]; n[i] = { ...member, name: val }; update('members', n); }} placeholder="名前" className="text-xs py-1" />
                                            <TextInput value={member.role} onChange={(val) => { const n = [...section.members]; n[i] = { ...member, role: val }; update('members', n); }} placeholder="役職" className="text-xs py-1" />
                                        </div>
                                        <TextArea value={member.desc} onChange={(val) => { const n = [...section.members]; n[i] = { ...member, desc: val }; update('members', n); }} placeholder="紹介文" className="text-xs" rows={2} />
                                        <div className="flex gap-1">
                                            <TextInput value={member.image} onChange={(val) => { const n = [...section.members]; n[i] = { ...member, image: val }; update('members', n); }} placeholder="写真URL" className="text-[10px] py-1" />
                                            <AIGeneratorButton onGenerate={(url) => { const n = [...section.members]; n[i] = { ...member, image: url }; update('members', n); }} initialPrompt="Professional portrait" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }

            {
                section.type === 'faq' && (
                    <div className="space-y-4">
                        <div className="space-y-4">
                            <div className="bg-gray-900 shadow-inner p-3 rounded-xl space-y-4 border border-gray-800">
                                <div>
                                    <label className="text-[10px] text-blue-400 font-bold mb-2 block uppercase tracking-tighter">デザインパターン</label>
                                    <div className="grid grid-cols-3 gap-1">
                                        {DESIGN_PATTERNS.map(d => (
                                            <button
                                                key={d.id}
                                                onClick={() => update('design', d.id)}
                                                className={`py-2 text-[10px] rounded-lg border transition-all ${((section.design || 'standard') === d.id)
                                                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/40'
                                                    : 'border-gray-700 text-gray-400 hover:bg-gray-800'
                                                    }`}
                                            >
                                                {d.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Accordion Toggle */}
                                <div className="flex items-center justify-between pt-2 border-t border-gray-800">
                                    <label className="text-[10px] text-gray-400 font-bold">アコーディオン（開閉）機能</label>
                                    <button
                                        onClick={() => update('disableAccordion', !section.disableAccordion)}
                                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${!section.disableAccordion ? 'bg-blue-600' : 'bg-gray-700'}`}
                                    >
                                        <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${!section.disableAccordion ? 'translate-x-5' : 'translate-x-1'}`} />
                                    </button>
                                </div>
                                <p className="text-[9px] text-gray-600 text-right">{!section.disableAccordion ? 'ON: タップで開閉します' : 'OFF: 全て開いて表示します'}</p>
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs text-gray-500">Q&A管理</label>
                                {(section.items || []).map((item, i) => (
                                    <div key={i} className="bg-gray-900/50 p-3 rounded border border-gray-700 relative space-y-2">
                                        <button onClick={() => { const n = section.items.filter((_, idx) => idx !== i); update('items', n); }} className="absolute top-2 right-2 text-gray-500 hover:text-red-400"><Trash2 size={12} /></button>
                                        <TextInput value={item.q} onChange={(val) => { const n = [...section.items]; n[i] = { ...item, q: val }; update('items', n); }} placeholder="質問 (Q)" className="font-bold text-blue-200" />
                                        <TextArea value={item.a} onChange={(val) => { const n = [...section.items]; n[i] = { ...item, a: val }; update('items', n); }} placeholder="回答 (A)" />
                                    </div>
                                ))}
                                <Button onClick={() => update('items', [...(section.items || []), { q: '質問', a: '回答' }])} variant="outline" className="w-full py-2 text-xs"><Plus size={14} /> Q&Aを追加</Button>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                section.type === 'comparison' && (
                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] text-gray-500 mb-1 block uppercase font-bold tracking-tight">デザインパターン</label>
                            <div className="grid grid-cols-3 gap-1">
                                {DESIGN_PATTERNS.map(d => (
                                    <button key={d.id} onClick={() => update('design', d.id)} className={`py-1 text-[10px] rounded border capitalize ${(section.design || 'standard') === d.id ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20' : 'border-gray-700 text-gray-400 hover:bg-gray-800'}`}>
                                        {d.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] text-gray-500">ヘッダー (カンマ区切り)</label>
                            <TextInput value={(section.headers || []).join(',')} onChange={(val) => update('headers', val.split(','))} placeholder="項目, 自社, A社, B社" />
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-xs text-blue-400 font-bold uppercase tracking-tight">比較データ管理</label>
                                <Button onClick={() => update('rows', [...(section.rows || []), Array((section.headers || []).length).fill('-')])} variant="outline" className="h-6 px-2 text-[10px]"><Plus size={10} /> 行を追加</Button>
                            </div>

                            <div className="space-y-3">
                                {(section.rows || []).map((row, i) => (
                                    <div key={i} className="bg-gray-900/40 p-3 rounded-xl border border-gray-800 relative space-y-3 group/row">
                                        <button onClick={() => { const n = section.rows.filter((_, idx) => idx !== i); update('rows', n); }} className="absolute top-2 right-2 text-gray-600 hover:text-red-400 opacity-0 group-hover/row:opacity-100 transition-opacity"><Trash2 size={12} /></button>

                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                                <TextInput
                                                    value={row[0]}
                                                    onChange={(val) => {
                                                        const n = [...section.rows];
                                                        const newRow = [...row];
                                                        newRow[0] = val;
                                                        n[i] = newRow;
                                                        update('rows', n);
                                                    }}
                                                    placeholder="項目名 (例: 価格, サポート...)"
                                                    className="flex-1 text-xs py-1"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pl-3">
                                                {(section.headers || []).slice(1).map((header, hIdx) => {
                                                    const cellIndex = hIdx + 1;
                                                    const rawVal = row[cellIndex];
                                                    const isStandard = ['◎', '◯', '△', '×', '-'].includes(rawVal);
                                                    const selectValue = isStandard ? (rawVal || '-') : '自由入力';

                                                    return (
                                                        <div key={hIdx} className="space-y-1">
                                                            <div className="text-[8px] text-gray-500 truncate px-1 uppercase font-bold">{header || `列 ${cellIndex}`}</div>
                                                            <select
                                                                value={selectValue}
                                                                onChange={(e) => {
                                                                    const n = [...section.rows];
                                                                    const newRow = [...row];
                                                                    while (newRow.length <= cellIndex) newRow.push('-');
                                                                    // If switching to free input, set a placeholder or keep current if valid? 
                                                                    // Actually just set exact value from select.
                                                                    newRow[cellIndex] = e.target.value;
                                                                    n[i] = newRow;
                                                                    update('rows', n);
                                                                }}
                                                                className="w-full bg-gray-800 text-[10px] border border-gray-700 rounded px-1 py-1 text-white focus:border-blue-500 outline-none transition-colors"
                                                            >
                                                                <option value="◎">◎</option>
                                                                <option value="◯">◯</option>
                                                                <option value="△">△</option>
                                                                <option value="×">×</option>
                                                                <option value="-">-</option>
                                                                <option value="自由入力">自由入力</option>
                                                            </select>
                                                            {selectValue === '自由入力' && (
                                                                <TextInput
                                                                    value={rawVal === '自由入力' ? '' : rawVal}
                                                                    onChange={(val) => {
                                                                        const n = [...section.rows];
                                                                        const newRow = [...row];
                                                                        newRow[cellIndex] = val;
                                                                        n[i] = newRow;
                                                                        update('rows', n);
                                                                    }}
                                                                    placeholder="自由入力..."
                                                                    className="text-[9px] py-0.5 mt-1"
                                                                />
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Size Adjustments */}
                        <div className="space-y-4 pt-4 border-t border-gray-800">
                            <label className="text-[10px] text-gray-500 font-bold uppercase tracking-tight block">サイズ調整</label>

                            <div className="flex flex-col gap-1">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-[10px] text-gray-500">縦幅 (余白)</label>
                                    <span className="text-[10px] text-gray-400 font-mono">{section.cellPadding || 16}px</span>
                                </div>
                                <Slider value={section.cellPadding || 16} min={4} max={32} step={2} onChange={(val) => update('cellPadding', val)} showValue={false} />
                            </div>

                            <div className="flex flex-col gap-1">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-[10px] text-gray-500">列の最小幅</label>
                                    <span className="text-[10px] text-gray-400 font-mono">{section.minWidth || 120}px</span>
                                </div>
                                <Slider value={section.minWidth || 120} min={60} max={200} step={5} onChange={(val) => update('minWidth', val)} showValue={false} />
                            </div>
                        </div>
                    </div>
                )
            }

            {
                section.type === 'access' && (
                    <div className="space-y-4">
                        <TextInput value={section.title} onChange={(val) => update('title', val)} placeholder="タイトル (ACCESS)" />
                        <TextInput value={section.address} onChange={(val) => update('address', val)} placeholder="住所 (地図検索用)" />
                        <TextInput value={section.access} onChange={(val) => update('access', val)} placeholder="アクセス (例: 〇〇駅 徒歩5分)" />
                        <div className="grid grid-cols-2 gap-2">
                            <TextInput value={section.hours} onChange={(val) => update('hours', val)} placeholder="営業時間" />
                            <TextInput value={section.tel} onChange={(val) => update('tel', val)} placeholder="電話番号" />
                        </div>
                        <div className="space-y-2 pt-2 border-t border-gray-700">
                            <label className="text-[10px] text-gray-500">ボタン設定</label>
                            <TextInput value={section.buttonText} onChange={(val) => update('buttonText', val)} placeholder="ボタン文字" />
                            <TextInput value={section.buttonUrl} onChange={(val) => update('buttonUrl', val)} placeholder="ボタンURL" />
                        </div>
                    </div>
                )
            }
            {
                section.type === 'review' && (
                    <div className="space-y-4">

                        <div className="space-y-4 bg-gray-900/40 p-4 rounded-xl border border-gray-800">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">コンテンツ最大幅</label>
                                    <span className="text-[10px] text-gray-400 font-mono">{(section.contentWidth || 800)}px</span>
                                </div>
                                <Slider value={section.contentWidth || 800} min={400} max={1200} step={10} onChange={(val) => update('contentWidth', val)} showValue={false} />
                                <div className="space-y-4">
                                    <div className="bg-gray-900 shadow-inner p-3 rounded-xl space-y-4 border border-gray-800">
                                        <div>
                                            <label className="text-[10px] text-blue-400 font-bold mb-2 block uppercase tracking-tighter">デザインパターン</label>
                                            <div className="grid grid-cols-3 gap-1">
                                                {DESIGN_PATTERNS.map(d => (
                                                    <button
                                                        key={d.id}
                                                        onClick={() => update('design', d.id)}
                                                        className={`py-2 text-[10px] rounded-lg border transition-all ${((section.design || 'standard') === d.id)
                                                            ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/40'
                                                            : 'border-gray-700 text-gray-400 hover:bg-gray-800'
                                                            }`}
                                                    >
                                                        {d.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-2 pt-2 border-t border-gray-800">
                                            <label className="text-[10px] text-gray-400 font-bold">画像/アイコン配置</label>
                                            <div className="flex bg-gray-950 p-1 rounded-lg border border-gray-700">
                                                <button onClick={() => update('imagePos', 'top')} className={`flex-1 py-1 px-2 text-[10px] rounded transition-all ${!section.imagePos || section.imagePos === 'top' ? 'bg-gray-700 text-white shadow' : 'text-gray-500 hover:text-gray-300'}`}>上 (Top)</button>
                                                <button onClick={() => update('imagePos', 'bottom')} className={`flex-1 py-1 px-2 text-[10px] rounded transition-all ${section.imagePos === 'bottom' ? 'bg-gray-700 text-white shadow' : 'text-gray-500 hover:text-gray-300'}`}>下 (Bottom)</button>
                                                <button onClick={() => update('imagePos', 'left')} className={`flex-1 py-1 px-2 text-[10px] rounded transition-all ${section.imagePos === 'left' ? 'bg-gray-700 text-white shadow' : 'text-gray-500 hover:text-gray-300'}`}>左 (Left)</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-800">
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center px-1">
                                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">レビュー間の余白</label>
                                                <span className="text-[10px] text-gray-400 font-mono">{(section.itemSpacing || 24)}px</span>
                                            </div>
                                            <Slider value={section.itemSpacing || 24} min={8} max={64} step={4} onChange={(val) => update('itemSpacing', val)} showValue={false} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs text-gray-500 font-bold">レビューリスト</label>
                            {(section.items || []).map((item, i) => (
                                <div key={i} className="bg-gray-900/50 p-3 rounded border border-gray-700 relative space-y-3">
                                    <button onClick={() => { const n = section.items.filter((_, idx) => idx !== i); update('items', n); }} className="absolute top-2 right-2 text-gray-500 hover:text-red-400"><Trash2 size={12} /></button>

                                    <div className="flex gap-3">
                                        <div className="space-y-2">
                                            <div className="w-16 h-16 flex-shrink-0 bg-gray-800 rounded-full overflow-hidden border border-gray-700 flex items-center justify-center relative group">
                                                {item.image ? <img src={item.image} className="w-full h-full object-cover" /> : <ImageIcon size={20} className="text-gray-600" />}
                                                {/* Gender Indicator overlay if no image or standard */}
                                                {!item.image && (
                                                    <div className={`absolute inset-0 flex items-center justify-center ${item.gender === 'female' ? 'bg-pink-900/20 text-pink-400' : 'bg-blue-900/20 text-blue-400'}`}>
                                                        <span className="text-[8px] font-bold uppercase">{item.gender === 'female' ? 'FEMALE' : 'MALE'}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex gap-1 justify-center">
                                                <button onClick={() => { const n = [...section.items]; n[i] = { ...item, gender: 'male' }; update('items', n); }} className={`w-6 h-6 rounded flex items-center justify-center border ${(!item.gender || item.gender === 'male') ? 'bg-blue-900/50 border-blue-500 text-blue-300' : 'bg-gray-800 border-gray-700 text-gray-600'}`}>M</button>
                                                <button onClick={() => { const n = [...section.items]; n[i] = { ...item, gender: 'female' }; update('items', n); }} className={`w-6 h-6 rounded flex items-center justify-center border ${(item.gender === 'female') ? 'bg-pink-900/50 border-pink-500 text-pink-300' : 'bg-gray-800 border-gray-700 text-gray-600'}`}>F</button>
                                            </div>
                                        </div>

                                        <div className="flex-1 space-y-2">
                                            <TextInput value={item.name} onChange={(val) => { const n = [...section.items]; n[i] = { ...item, name: val }; update('items', n); }} placeholder="名前" className="text-xs font-bold" />
                                            <TextInput value={item.role} onChange={(val) => { const n = [...section.items]; n[i] = { ...item, role: val }; update('items', n); }} placeholder="役職・タイトル" className="text-[10px] text-gray-400" />

                                            <div className="flex items-center gap-2 pt-1">
                                                <span className="text-[10px] text-gray-500">評価:</span>
                                                <div className="flex gap-0.5">
                                                    {[1, 2, 3, 4, 5].map(s => (
                                                        <button key={s} onClick={() => { const n = [...section.items]; n[i] = { ...item, rating: s }; update('items', n); }} className={`p-0.5 ${(item.rating || 5) >= s ? 'text-yellow-400' : 'text-gray-600'}`}>
                                                            <Star size={12} fill={(item.rating || 5) >= s ? 'currentColor' : 'none'} />
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-1">
                                        <TextInput value={item.image} onChange={(val) => { const n = [...section.items]; n[i] = { ...item, image: val }; update('items', n); }} placeholder="顔写真URL (空欄ならアイコン)" className="text-[10px] flex-1" />
                                        <AIGeneratorButton onGenerate={(url) => { const n = [...section.items]; n[i] = { ...item, image: url }; update('items', n); }} initialPrompt="Portrait of a happy customer" />
                                    </div>

                                    <TextArea value={item.content || item.text} onChange={(val) => { const n = [...section.items]; n[i] = { ...item, content: val, text: val }; update('items', n); }} placeholder="レビュー本文" className="text-xs" rows={3} />
                                </div>
                            ))}
                            <Button onClick={() => update('items', [...(section.items || []), { id: Date.now(), name: 'New Reviewer', role: 'Role', content: 'Description...', rating: 5, image: '', gender: 'male' }])} variant="outline" className="w-full py-2 text-xs"><Plus size={14} /> レビューを追加</Button>
                        </div>
                    </div>
                )
            }
        </div >
    );
};
