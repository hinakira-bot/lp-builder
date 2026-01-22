/* eslint-disable */
import React from 'react';
import { AlignLeft, AlignCenter, AlignRight, Plus, Trash2 } from 'lucide-react';
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
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 w-12">暗さ:</span>
                            <Slider value={section.bgOverlay || 0} min={0} max={0.9} step={0.1} onChange={(val) => update('bgOverlay', val)} />
                        </div>
                    )}
                </div>

                {/* Padding & Box Style */}
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                        <label className="text-[9px] text-gray-500 mb-1">上余白</label>
                        <select value={section.pt || 'pt-16'} onChange={(e) => update('pt', e.target.value)} className="bg-gray-800 text-xs border border-gray-600 rounded px-1 py-1 text-white">
                            <option value="pt-4">狭い</option>
                            <option value="pt-12">普通</option>
                            <option value="pt-20">広い</option>
                            <option value="pt-24">特大</option>
                            <option value="pt-0">なし</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[9px] text-gray-500 mb-1">下余白</label>
                        <select value={section.pb || 'pb-16'} onChange={(e) => update('pb', e.target.value)} className="bg-gray-800 text-xs border border-gray-600 rounded px-1 py-1 text-white">
                            <option value="pb-4">狭い</option>
                            <option value="pb-12">普通</option>
                            <option value="pb-20">広い</option>
                            <option value="pb-24">特大</option>
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
                    <label className="text-[9px] text-gray-500 mb-1">コンテンツ枠</label>
                    <select value={section.boxStyle || 'none'} onChange={(e) => update('boxStyle', e.target.value)} className="bg-gray-800 text-xs border border-gray-600 rounded px-1 py-1 w-full text-white">
                        <option value="none">なし</option>
                        <option value="shadow">影付き箱</option>
                        <option value="border">線枠</option>
                        <option value="fill">塗りつぶし</option>
                        <option value="stitch">ステッチ</option>
                    </select>
                </div>

                {/* Text Readability Controls */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-700">
                    <div>
                        <label className="text-[9px] text-gray-500 mb-1">文字影</label>
                        <select value={section.textShadow || 'none'} onChange={(e) => update('textShadow', e.target.value)} className="bg-gray-800 text-xs border border-gray-600 rounded px-1 py-1 w-full text-white">
                            <option value="none">なし</option>
                            <option value="soft">ソフト</option>
                            <option value="strong">くっきり</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-[9px] text-gray-500 mb-1">文字背景</label>
                        <select value={section.textBackdrop || 'none'} onChange={(e) => update('textBackdrop', e.target.value)} className="bg-gray-800 text-xs border border-gray-600 rounded px-1 py-1 w-full text-white">
                            <option value="none">なし</option>
                            <option value="blur">ぼかし</option>
                            <option value="white">白半透明</option>
                            <option value="black">黒半透明</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* --- SPECIFIC TYPE FIELDS --- */}

            {section.type === 'text' && (
                <>
                    <TextInput value={section.title} onChange={(val) => update('title', val)} placeholder="見出し" />
                    <TextArea value={section.content} onChange={(val) => update('content', val)} placeholder="本文" />
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
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] text-gray-500 w-8">横幅:</span>
                                <Slider value={section.width || 0} min={0} max={100} step={10} onChange={(val) => update('width', val)} />
                                <span className="text-[10px] text-gray-400 w-8 text-right">{section.width > 0 ? `${section.width}%` : '自動'}</span>
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
                    <div className="flex gap-2 mb-3">
                        <button onClick={() => update('platform', 'twitter')} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded text-xs border ${section.platform === 'twitter' ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-600 text-gray-400'}`}>Twitter</button>
                        <button onClick={() => update('platform', 'instagram')} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded text-xs border ${section.platform === 'instagram' ? 'bg-pink-600 border-pink-600 text-white' : 'border-gray-600 text-gray-400'}`}>Instagram</button>
                    </div>
                    <TextInput value={section.url} onChange={(val) => update('url', val)} placeholder="投稿のURL" />
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
                    {section.items.map((item, i) => (
                        <div key={item.id} className="space-y-2 pb-2 border-b border-gray-700">
                            <TextInput value={item.title} onChange={(val) => { const newItems = [...section.items]; newItems[i] = { ...item, title: val }; update('items', newItems); }} placeholder="質問" />
                            <TextArea value={item.content} onChange={(val) => { const newItems = [...section.items]; newItems[i] = { ...item, content: val }; update('items', newItems); }} placeholder="回答" />
                        </div>
                    ))}
                    <Button onClick={() => update('items', [...section.items, { id: Math.random(), title: 'Q', content: 'A' }])} variant="outline" className="w-full py-1 text-xs"><Plus size={14} /> 追加</Button>
                </div>
            )}
            {section.type === 'post_card' && (
                <>
                    <TextInput value={section.image} onChange={(val) => update('image', val)} placeholder="サムネイルURL" />
                    <TextInput value={section.date} onChange={(val) => update('date', val)} placeholder="日付" />
                    <TextInput value={section.title} onChange={(val) => update('title', val)} placeholder="記事タイトル" />
                    <TextArea value={section.excerpt} onChange={(val) => update('excerpt', val)} placeholder="抜粋" />
                    <TextInput value={section.url} onChange={(val) => update('url', val)} placeholder="記事URL" />
                </>
            )}
            {section.type === 'links' && (
                <div className="space-y-3">
                    {section.links.map((link, i) => (
                        <LinkEditor key={link.id} link={link} onChange={(newLink) => { const n = [...section.links]; n[i] = newLink; update('links', n); }} onDelete={() => { const n = section.links.filter(l => l.id !== link.id); update('links', n); }} />
                    ))}
                    <Button onClick={() => update('links', [...section.links, { id: Math.random(), label: 'Button', url: '#', subtext: '' }])} variant="outline" className="w-full py-1 text-xs"><Plus size={14} /> 追加</Button>
                </div>
            )}

            {/* Columns (Complex!) */}
            {section.type === 'columns' && (
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
                            <Slider value={section.gap || 32} min={0} max={100} step={4} onChange={(val) => update('gap', val)} />
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
            )}

            {section.type === 'box' && (
                <>
                    <div className="mb-4">
                        <label className="text-[10px] text-gray-500 mb-1 block">デザイン</label>
                        <div className="flex gap-2">
                            {['simple', 'sticky', 'ribbon'].map(d => (
                                <button key={d} onClick={() => update('design', d)} className={`flex-1 py-1 text-xs rounded border capitalize ${(section.design || 'simple') === d ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-600 text-gray-400'}`}>{d}</button>
                            ))}
                        </div>
                    </div>

                    <TextInput value={section.title} onChange={(val) => update('title', val)} placeholder="タイトル" />
                    {!section.children && <TextArea value={section.content} onChange={(val) => update('content', val)} placeholder="内容" />}

                    <ChildSectionManager childrenSections={section.children || []} onChange={(newChildren) => update('children', newChildren)} />
                </>
            )}

            {section.type === 'full_width' && (
                <>
                    <div className="p-2 bg-blue-500/10 border border-blue-500/30 rounded text-center text-xs text-blue-200 mb-4">
                        画面幅いっぱいに広がるセクションです
                    </div>
                    <ChildSectionManager childrenSections={section.children || []} onChange={(newChildren) => update('children', newChildren)} />
                </>
            )}

            {section.type === 'conversion_panel' && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-700 pb-2">
                        <span className="text-xs text-gray-400">画面下部に固定</span>
                        <button
                            onClick={() => update('isSticky', !section.isSticky)}
                            className={`w-8 h-4 rounded-full transition-colors relative ${section.isSticky ? 'bg-blue-600' : 'bg-gray-700'}`}
                        >
                            <span className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform ${section.isSticky ? 'translate-x-4' : ''}`} />
                        </button>
                    </div>

                    <TextInput value={section.title} onChange={(val) => update('title', val)} placeholder="パネル上のミニテキスト (例: 今だけ50%OFF)" />

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
            )}

            {section.type === 'point_list' && (
                <div className="space-y-4">
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
            )}

            {section.type === 'problem_checklist' && (
                <div className="space-y-4">
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
            )}

            {section.type === 'speech_bubble' && (
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

                    <TextArea value={section.text} onChange={(val) => update('text', val)} placeholder="会話テキスト" rows={4} />

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
            )}
        </div>
    );
};
