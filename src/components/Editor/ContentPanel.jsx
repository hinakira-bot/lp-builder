/* eslint-disable */
import React from 'react';
import { Type, Layout, Plus, Trash2, ArrowUp, ArrowDown, AlignLeft, ImageIcon, MousePointerClick, Heading, PlayCircle, Share2, ListPlus, BoxSelect, FileText, Columns, Link as LinkIcon, Menu, X, MessageCircle, Star } from 'lucide-react';
import { InputGroup, TextInput, TextArea } from '../UI/Input';
import { SectionEditor } from './SectionEditor';
import { Button } from '../UI/Button';

// Link Editor Component (Internal)
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
            {type === 'button' && (
                <TextInput
                    value={link.subtext}
                    onChange={(val) => onChange({ ...link, subtext: val })}
                    placeholder="サブテキスト (省略可)"
                />
            )}
            <TextInput
                value={link.url}
                onChange={(val) => onChange({ ...link, url: val })}
                placeholder="リンクURL (例: #about, https://...)"
            />
        </div>
    </div>
);

export const ContentPanel = ({ data, setData, setActiveSectionId }) => {

    const handleSectionChange = (id, newSection) => {
        setData(prev => ({
            ...prev,
            sections: prev.sections.map(s => s.id === id ? newSection : s)
        }));
    };

    const addSection = (type) => {
        const newId = (data.sections.length > 0 ? Math.max(...data.sections.map(s => s.id)) : 0) + 1;
        let newSection = { id: newId, type, pt: 'pt-24', pb: 'pb-24', boxStyle: 'none', bgType: 'color', bgValue: 'transparent' };

        // Default Init Logic
        if (type === 'text') newSection = { ...newSection, title: 'New Section', content: 'コンテンツを入力してください', align: 'center' };
        if (type === 'columns') newSection = { ...newSection, columnCount: 3, colType: 'card', items: [{ id: 1, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=988&auto=format&fit=crop', title: 'Card 1', text: 'Text', url: '#', platform: 'twitter' }, { id: 2, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1064&auto=format&fit=crop', title: 'Card 2', text: 'Text', url: '#', platform: 'twitter' }, { id: 3, image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=987&auto=format&fit=crop', title: 'Card 3', text: 'Text', url: '#', platform: 'twitter' }] };
        if (type === 'links') newSection = { ...newSection, links: [{ id: 1, label: 'Button', url: '#', subtext: '' }] };
        if (type === 'image') newSection = { ...newSection, url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop', caption: '' };
        if (type === 'image_text') newSection = { ...newSection, title: 'Title', content: 'Text here...', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop', imagePosition: 'left' };
        if (type === 'button') newSection = { ...newSection, label: 'Click Me', url: '#', align: 'center', style: 'fill' };
        if (type === 'review') newSection = {
            ...newSection, design: 'card', items: [
                { id: 1, name: '山田 太郎', role: '株式会社サンプル 代表取締役', content: 'こちらのサービスを導入してから、業務効率が劇的に改善しました。UIも非常に使いやすく、チーム全員が満足しています。', stars: 5, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop' },
                { id: 2, name: '佐藤 佳奈', role: 'フリーランスデザイナー', content: '直感的な操作感で、デザインの質を落とさずにスピードアップできました。サポートも迅速で助かりました。', stars: 4, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop' }
            ]
        };
        if (type === 'heading') newSection = { ...newSection, text: 'Heading', subText: 'Subtitle', style: 'center', design: 'simple' };
        if (type === 'video') newSection = { ...newSection, url: 'https://www.youtube.com/watch?v=LXb3EKWsInQ', caption: '' };
        if (type === 'post_card') newSection = { ...newSection, title: 'Article Title', date: '2023.01.01', excerpt: 'Article summary...', image: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=2070&auto=format&fit=crop', url: '#' };
        if (type === 'social') newSection = { ...newSection, platform: 'twitter', url: 'https://twitter.com/SpaceX/status/1856890374974914755' };
        if (type === 'accordion') newSection = { ...newSection, items: [{ id: 1, title: 'Question 1', content: 'Answer 1' }, { id: 2, title: 'Question 2', content: 'Answer 2' }] };
        if (type === 'box') newSection = { ...newSection, boxStyle: 'border', title: 'Box Title', content: 'Content here...' };
        if (type === 'conversion_panel') newSection = {
            ...newSection,
            title: '今だけ限定価格',
            microCopy: '※キャンペーンは予告なく終了する場合があります',
            isSticky: false,
            buttons: [
                { label: 'Amazonで購入', url: '#', color: 'orange', icon: 'cart' },
                { label: '楽天市場で購入', url: '#', color: 'red', icon: 'cart' }
            ]
        };
        if (type === 'point_list') newSection = {
            ...newSection,
            items: [
                { id: 1, title: '圧倒的な洗浄力', desc: '独自の技術で汚れを根こそぎ落とします。', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1740&auto=format&fit=crop' },
                { id: 2, title: '肌に優しい成分', desc: '敏感肌の方でも安心してお使いいただけます。', image: 'https://images.unsplash.com/photo-1556228720-1957be6a96fe?q=80&w=1740&auto=format&fit=crop' },
                { id: 3, title: '環境への配慮', desc: '地球環境に優しい成分のみを使用しています。', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb7d5763?q=80&w=1740&auto=format&fit=crop' }
            ]
        };
        if (type === 'problem_checklist') newSection = {
            ...newSection,
            title: 'こんなお悩みありませんか？',
            items: [
                { text: '最近疲れが取れにくい' },
                { text: '肌のハリがなくなってきた' },
                { text: '朝起きるのが辛い' },
                { text: '自分に合う化粧品が見つからない' }
            ]
        };
        if (type === 'speech_bubble') newSection = {
            ...newSection,
            characterImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop',
            characterName: '案内人',
            text: 'ここにメッセージを入力してください。\n改行も反映されます。',
            align: 'left', // Default: Bubble Left, Char Right (as per request "Left to fukidashi, right to character")
            bubbleColor: '#ffffff'
        };
        if (type === 'pricing') newSection = {
            ...newSection,
            design: 'standard',
            plans: [
                { id: 1, name: 'ベーシック', price: '¥9,800', period: '/月', features: ['独自ドメイン', '基本テンプレート', '月1回更新'], buttonText: '申し込む', isFeatured: false },
                { id: 2, name: 'スタンダード', price: '¥19,800', period: '/月', features: ['独自ドメイン', 'フルカスタマイズ', '週1回更新', 'SEO対策'], buttonText: '一番人気', isFeatured: true },
                { id: 3, name: 'プレミアム', price: '¥49,800', period: '/月', features: ['独自ドメイン', 'フルカスタマイズ', '毎日更新', '広告運用代行'], buttonText: 'お問い合わせ', isFeatured: false }
            ]
        };
        if (type === 'full_width') newSection = {
            ...newSection,
            children: []
        };
        // NEW COMPONENTS
        if (type === 'process') newSection = {
            ...newSection,
            title: 'サービスの流れ',
            steps: [
                { title: 'お問い合わせ', content: 'まずはフォームよりご連絡ください。' },
                { title: 'ヒアリング', content: '担当者が詳細をお伺いします。' },
                { title: 'プラン提案', content: '最適なプランをご提案します。' }
            ]
        };
        if (type === 'staff') newSection = {
            ...newSection,
            members: [
                { name: '山田 太郎', role: '代表 / ディレクター', desc: '業界歴15年の経験を活かし...', image: '' },
                { name: '佐藤 花子', role: 'デザイナー', desc: '繊細なデザインが得意です。', image: '' }
            ]
        };
        if (type === 'faq') newSection = {
            ...newSection,
            items: [
                { q: '詳しく話を聞きたいのですが', a: '無料相談会を実施しておりますので、お気軽にご予約ください。' },
                { q: '費用はどれくらいですか？', a: 'ご要望に応じて柔軟にプランニング可能です。まずは資料請求を。' }
            ]
        };
        if (type === 'comparison') newSection = {
            ...newSection,
            headers: ['項目', '自社', '他社A', '他社B'],
            rows: [
                ['価格', 'o', 'x', 'x'],
                ['サポート', 'o', 'x', 'o'],
                ['スピード', '◎', 'o', 'x']
            ]
        };
        if (type === 'access') newSection = {
            ...newSection,
            title: 'ACCESS',
            address: '東京都渋谷区...',
            access: '渋谷駅徒歩5分',
            hours: '10:00 - 19:00',
            tel: '03-1234-5678',
            buttonText: 'Google Mapsで見る',
            buttonUrl: '#'
        };

        setData(prev => ({
            ...prev,
            sections: [...prev.sections, newSection]
        }));
        setActiveSectionId(newId);
    };

    const deleteSection = (id) => {
        if (confirm('Are you sure you want to delete this section?')) {
            setData(prev => ({ ...prev, sections: prev.sections.filter(s => s.id !== id) }));
        }
    };

    const moveSection = (index, direction) => {
        const newSections = [...data.sections];
        if (direction === 'up' && index > 0) {
            [newSections[index], newSections[index - 1]] = [newSections[index - 1], newSections[index]];
        } else if (direction === 'down' && index < newSections.length - 1) {
            [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
        }
        setData(prev => ({ ...prev, sections: newSections }));
    };

    // Menu Handlers (Moved to HeaderPanel)

    return (
        <div className="space-y-8 animate-fadeIn">


            {/* DYNAMIC SECTIONS */}
            <section>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-sm font-bold text-white flex items-center gap-2"><Layout size={16} className="text-blue-400" /> コンテンツパーツ</h2>
                </div>

                <div className="space-y-6">
                    {data.sections.map((section, index) => (
                        <div
                            key={section.id}
                            className="bg-gray-800/50 border border-gray-700/50 rounded-xl overflow-hidden group focus-within:ring-2 focus-within:ring-blue-500/50 transition-all"
                            onClick={() => setActiveSectionId(section.id)}
                        >
                            {/* Section Header */}
                            <div className="bg-gray-800 p-3 flex justify-between items-center border-b border-gray-700/50">
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                                    <span className="bg-gray-700 text-white px-2 py-0.5 rounded text-[10px]">{section.type}</span>
                                    {index + 1}
                                </div>
                                <div className="flex items-center gap-1">
                                    <button onClick={() => moveSection(index, 'up')} disabled={index === 0} className="p-1 text-gray-500 hover:text-white disabled:opacity-30"><ArrowUp size={14} /></button>
                                    <button onClick={() => moveSection(index, 'down')} disabled={index === data.sections.length - 1} className="p-1 text-gray-500 hover:text-white disabled:opacity-30"><ArrowDown size={14} /></button>
                                    <button onClick={() => deleteSection(section.id)} className="p-1 text-red-900 hover:text-red-400 ml-2"><Trash2 size={14} /></button>
                                </div>
                            </div>

                            {/* Section Body */}
                            <div className="p-4 space-y-6">
                                <SectionEditor section={section} onChange={(newSection) => handleSectionChange(section.id, newSection)} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add Section Buttons */}
                <div className="grid grid-cols-4 gap-2 mt-6">
                    <div className="col-span-4 text-xs font-bold text-gray-500 mt-2 mb-1">コンバージョン</div>
                    <button onClick={() => addSection('conversion_panel')} className="flex flex-col items-center justify-center p-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-all col-span-2 border-orange-500/30 bg-orange-500/10"><MousePointerClick size={20} className="mb-1 text-orange-400" /><span className="text-[10px] font-bold text-orange-200">CVパネル (強力)</span></button>
                    <button onClick={() => addSection('pricing')} className="flex flex-col items-center justify-center p-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-all col-span-2 border-blue-500/30 bg-blue-500/10"><ListPlus size={20} className="mb-1 text-blue-400" /><span className="text-[10px] font-bold text-blue-200">料金プラン</span></button>

                    <div className="col-span-4 text-xs font-bold text-gray-500 mt-4 mb-1">ビジネス</div>
                    <button onClick={() => addSection('point_list')} className="flex flex-col items-center justify-center p-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-all border-yellow-500/30"><ListPlus size={20} className="mb-1 text-yellow-400" /><span className="text-[10px]">特徴リスト</span></button>
                    <button onClick={() => addSection('problem_checklist')} className="flex flex-col items-center justify-center p-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-all border-red-500/30"><BoxSelect size={20} className="mb-1 text-red-400" /><span className="text-[10px]">悩みリスト</span></button>
                    <button onClick={() => addSection('process')} className="flex flex-col items-center justify-center p-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-all"><ArrowDown size={20} className="mb-1 text-indigo-400" /><span className="text-[10px]">流れ/手順</span></button>
                    <button onClick={() => addSection('comparison')} className="flex flex-col items-center justify-center p-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-all"><Columns size={20} className="mb-1 text-indigo-400" /><span className="text-[10px]">比較表</span></button>
                    <button onClick={() => addSection('staff')} className="flex flex-col items-center justify-center p-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-all"><ImageIcon size={20} className="mb-1 text-indigo-400" /><span className="text-[10px]">スタッフ</span></button>
                    <button onClick={() => addSection('faq')} className="flex flex-col items-center justify-center p-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-all"><MessageCircle size={20} className="mb-1 text-indigo-400" /><span className="text-[10px]">Q&A</span></button>
                    <button onClick={() => addSection('review')} className="flex flex-col items-center justify-center p-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-all border-blue-500/30 bg-blue-500/10"><Star size={20} className="mb-1 text-yellow-400" /><span className="text-[10px] font-bold text-yellow-200">レビュー</span></button>
                    <button onClick={() => addSection('access')} className="flex flex-col items-center justify-center p-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-all"><Layout size={20} className="mb-1 text-indigo-400" /><span className="text-[10px]">アクセス</span></button>

                    <div className="col-span-4 text-xs font-bold text-gray-500 mt-4 mb-1">ベーシック</div>
                    <button onClick={() => addSection('speech_bubble')} className="flex flex-col items-center justify-center p-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-all"><MessageCircle size={20} className="mb-1 text-green-400" /><span className="text-[10px]">ふきだし</span></button>
                    <button onClick={() => addSection('text')} className="flex flex-col items-center justify-center p-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-all"><AlignLeft size={20} className="mb-1 text-blue-400" /><span className="text-[10px]">テキスト</span></button>
                    <button onClick={() => addSection('image')} className="flex flex-col items-center justify-center p-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-all"><ImageIcon size={20} className="mb-1 text-green-400" /><span className="text-[10px]">画像</span></button>
                    <button onClick={() => addSection('image_text')} className="flex flex-col items-center justify-center p-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-all"><Layout size={20} className="mb-1 text-orange-400" /><span className="text-[10px]">画＆文</span></button>
                    <button onClick={() => addSection('button')} className="flex flex-col items-center justify-center p-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-all"><MousePointerClick size={20} className="mb-1 text-red-400" /><span className="text-[10px]">ボタン</span></button>
                    <button onClick={() => addSection('heading')} className="flex flex-col items-center justify-center p-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-all"><Heading size={20} className="mb-1 text-pink-400" /><span className="text-[10px]">見出し</span></button>
                    <button onClick={() => addSection('video')} className="flex flex-col items-center justify-center p-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-all"><PlayCircle size={20} className="mb-1 text-indigo-400" /><span className="text-[10px]">動画</span></button>
                    <button onClick={() => addSection('social')} className="flex flex-col items-center justify-center p-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-all"><Share2 size={20} className="mb-1 text-sky-400" /><span className="text-[10px]">SNS</span></button>
                    <button onClick={() => addSection('box')} className="flex flex-col items-center justify-center p-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-all"><BoxSelect size={20} className="mb-1 text-yellow-200" /><span className="text-[10px]">BOX</span></button>
                    <button onClick={() => addSection('post_card')} className="flex flex-col items-center justify-center p-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-all"><FileText size={20} className="mb-1 text-cyan-400" /><span className="text-[10px]">記事</span></button>
                    <button onClick={() => addSection('columns')} className="flex flex-col items-center justify-center p-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-all"><Columns size={20} className="mb-1 text-purple-400" /><span className="text-[10px]">カラム</span></button>
                    <button onClick={() => addSection('links')} className="flex flex-col items-center justify-center p-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-all"><LinkIcon size={20} className="mb-1 text-yellow-400" /><span className="text-[10px]">リンク集</span></button>
                </div>
            </section>
        </div>
    );
};
