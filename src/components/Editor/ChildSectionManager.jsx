/* eslint-disable */
import React from 'react';
import { Trash2, AlignLeft, AlignCenter, AlignRight, ImageIcon, MousePointerClick } from 'lucide-react';
import { TextInput, TextArea, Slider } from '../UI/Input';

export const ChildSectionManager = ({ childrenSections = [], onChange }) => {

    // Add child helper
    const addChild = (type) => {
        const newId = childrenSections.length > 0 ? Math.max(...childrenSections.map(s => s.id)) + 1 : 1;
        let newSection = { id: newId, type };

        // Defaults
        if (type === 'text') newSection = { ...newSection, content: 'テキストを入力', align: 'left' };
        if (type === 'image') newSection = { ...newSection, url: 'https://placehold.co/600x400', caption: '', width: 100, align: 'center' };
        if (type === 'button') newSection = { ...newSection, label: 'ボタン', url: '#', style: 'fill', align: 'center', width: 0 }; // 0 means auto/fit

        onChange([...childrenSections, newSection]);
    };

    // Update child helper
    const updateChild = (id, updatedSection) => {
        onChange(childrenSections.map(s => s.id === id ? updatedSection : s));
    };

    // Delete child helper
    const deleteChild = (id) => {
        onChange(childrenSections.filter(s => s.id !== id));
    };

    return (
        <div className="space-y-4 mt-4 border-t border-gray-700 pt-4">
            <h4 className="text-xs text-gray-400 font-bold uppercase">内部コンテンツ</h4>

            <div className="space-y-4">
                {childrenSections.map((child, index) => (
                    <div key={child.id} className="bg-gray-900 p-3 rounded border border-gray-700 relative">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] bg-gray-700 px-1.5 rounded text-white">{child.type}</span>
                            <button onClick={() => deleteChild(child.id)} className="text-gray-500 hover:text-red-400">
                                <Trash2 size={14} />
                            </button>
                        </div>

                        {/* Simplified Inline Editor for Children */}
                        {child.type === 'text' && (
                            <TextArea value={child.content} onChange={(val) => updateChild(child.id, { ...child, content: val })} rows={2} placeholder="テキスト" />
                        )}
                        {child.type === 'image' && (
                            <div className="space-y-2">
                                <TextInput value={child.url} onChange={(val) => updateChild(child.id, { ...child, url: val })} placeholder="画像URL" />
                                <div className="flex items-center gap-2">
                                    <div className="flex bg-gray-800 rounded p-1 border border-gray-600">
                                        <button onClick={() => updateChild(child.id, { ...child, align: 'left' })} className={`p-1 rounded ${(!child.align || child.align === 'left') ? 'bg-gray-600 text-white' : 'text-gray-400 hover:text-white'}`}><AlignLeft size={14} /></button>
                                        <button onClick={() => updateChild(child.id, { ...child, align: 'center' })} className={`p-1 rounded ${child.align === 'center' ? 'bg-gray-600 text-white' : 'text-gray-400 hover:text-white'}`}><AlignCenter size={14} /></button>
                                        <button onClick={() => updateChild(child.id, { ...child, align: 'right' })} className={`p-1 rounded ${child.align === 'right' ? 'bg-gray-600 text-white' : 'text-gray-400 hover:text-white'}`}><AlignRight size={14} /></button>
                                    </div>
                                    <div className="flex flex-1 items-center gap-2">
                                        <span className="text-[10px] text-gray-500 w-8 ml-1">幅%</span>
                                        <Slider value={child.width || 100} min={10} max={100} step={5} onChange={(val) => updateChild(child.id, { ...child, width: val })} className="flex-1" />
                                    </div>
                                </div>
                            </div>
                        )}
                        {child.type === 'button' && (
                            <div className="space-y-2">
                                <div className="flex gap-2">
                                    <TextInput value={child.label} onChange={(val) => updateChild(child.id, { ...child, label: val })} placeholder="ラベル" className="flex-1" />
                                    <TextInput value={child.url} onChange={(val) => updateChild(child.id, { ...child, url: val })} placeholder="URL" className="flex-1" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] text-gray-500 w-8">幅: {child.width || 0}%</span>
                                    <Slider value={child.width || 0} min={0} max={100} step={10} onChange={(val) => updateChild(child.id, { ...child, width: val })} className="flex-1" />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex gap-2">
                <button onClick={() => addChild('text')} className="flex-1 py-2 bg-gray-800 hover:bg-gray-700 rounded border border-gray-600 text-xs flex items-center justify-center gap-1"><AlignLeft size={14} /> テキスト</button>
                <button onClick={() => addChild('image')} className="flex-1 py-2 bg-gray-800 hover:bg-gray-700 rounded border border-gray-600 text-xs flex items-center justify-center gap-1"><ImageIcon size={14} /> 画像</button>
                <button onClick={() => addChild('button')} className="flex-1 py-2 bg-gray-800 hover:bg-gray-700 rounded border border-gray-600 text-xs flex items-center justify-center gap-1"><MousePointerClick size={14} /> ボタン</button>
            </div>
        </div>
    );
};
