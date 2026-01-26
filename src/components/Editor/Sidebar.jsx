import React, { useState } from 'react';
import { Layout, X, ImageIcon, Type, Palette, Settings as SettingsIcon, Download, FileCode, LayoutTemplate, FolderOpen, Sparkles } from 'lucide-react';
import { Button } from '../UI/Button';
import { clsx } from 'clsx';
import { VisualPanel } from './VisualPanel';
import { ContentPanel } from './ContentPanel';
import { HeaderPanel } from './HeaderPanel';
import { StylePanel } from './StylePanel';
import { AIPanel } from './AIPanel';
import { SettingsPanel } from './SettingsPanel';
import { exportConfig, exportHTML } from '../../utils/Exporter';

export const Sidebar = ({ isOpen, setIsOpen, data, setData, setActiveSectionId }) => {
    const [activeTab, setActiveTab] = useState('visual');

    const handleImportConfig = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const importedData = JSON.parse(event.target.result);
                // Simple validation: check if it has sections
                if (importedData && importedData.sections) {
                    setData(importedData);
                    alert('設定ファイルを読み込みました。');
                } else {
                    alert('無効な設定ファイルです。');
                }
            } catch (err) {
                console.error("Import failed", err);
                alert('ファイルの読み込みに失敗しました。');
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className={clsx(
            "bg-[#111] border-r border-gray-800 flex-shrink-0 transition-all duration-300 ease-in-out relative z-20 flex flex-col h-full shadow-2xl",
            isOpen ? 'w-full md:w-[480px]' : 'w-0'
        )}>
            {/* Header */}
            <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-[#111]">
                <h1 className="text-lg font-bold tracking-tight flex items-center gap-2">
                    <Layout className="text-blue-500" size={20} />
                    LP Builder
                </h1>
                <button onClick={() => setIsOpen(false)} className="md:hidden p-2 text-gray-400">
                    <X size={20} />
                </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-800 overflow-x-auto scrollbar-hide">
                <TabButton
                    active={activeTab === 'visual'}
                    onClick={() => setActiveTab('visual')}
                    icon={ImageIcon}
                    label="Visual"
                />
                <TabButton
                    active={activeTab === 'header'}
                    onClick={() => setActiveTab('header')}
                    icon={LayoutTemplate}
                    label="Header"
                />
                <TabButton
                    active={activeTab === 'content'}
                    onClick={() => setActiveTab('content')}
                    icon={Type}
                    label="Content"
                />
                <TabButton
                    active={activeTab === 'ai'}
                    onClick={() => setActiveTab('ai')}
                    icon={Sparkles}
                    label="AI"
                />
                <TabButton
                    active={activeTab === 'style'}
                    onClick={() => setActiveTab('style')}
                    icon={Palette}
                    label="Style"
                />
                <TabButton
                    active={activeTab === 'settings'}
                    onClick={() => setActiveTab('settings')}
                    icon={SettingsIcon}
                    label="Settings"
                />
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-8 scrollbar-hide">
                {activeTab === 'visual' && <VisualPanel data={data} setData={setData} />}
                {activeTab === 'header' && <HeaderPanel data={data} setData={setData} />}
                {activeTab === 'content' && <ContentPanel data={data} setData={setData} setActiveSectionId={setActiveSectionId} />}
                {activeTab === 'ai' && <AIPanel data={data} setData={setData} />}
                {activeTab === 'style' && <StylePanel data={data} setData={setData} />}
                {activeTab === 'settings' && <SettingsPanel data={data} setData={setData} />}
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-gray-800 bg-[#111] space-y-3">
                <div className="grid grid-cols-2 gap-2">
                    <Button
                        onClick={() => exportConfig(data)}
                        variant="outline"
                        className="w-full border-gray-700 text-gray-300 hover:text-white"
                        icon={Download}
                    >
                        保存
                    </Button>
                    <label className="cursor-pointer">
                        <input
                            type="file"
                            className="hidden"
                            accept=".json"
                            onChange={handleImportConfig}
                        />
                        <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all border border-gray-700 bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 w-full h-full">
                            <FolderOpen size={14} />
                            読込
                        </div>
                    </label>
                </div>

                <Button
                    onClick={() => exportHTML(data)}
                    variant="primary"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white"
                    icon={FileCode}
                >
                    Webサイト公開用ファイル (index.html) DL
                </Button>
                <div className="text-center">
                    <p className="text-[10px] text-gray-500 leading-relaxed">
                        ※ 公開用ファイルの使い道:<br />
                        DLした<code>index.html</code>をサーバーにUPするだけで公開完了です。<br />
                        (config.jsonは後で再編集する時に必要になります)
                    </p>
                </div>
            </div>
        </div>
    );
};

const TabButton = ({ active, onClick, icon: Icon, label }) => (
    <button
        onClick={onClick}
        className={clsx(
            "flex-1 py-3 text-xs font-medium uppercase tracking-wider flex items-center justify-center gap-2 transition-colors",
            active ? 'text-blue-400 border-b-2 border-blue-400 bg-gray-800/30' : 'text-gray-500 hover:text-white'
        )}
    >
        <Icon size={14} /> {label}
    </button>
);
