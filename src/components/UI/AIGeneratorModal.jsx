import React, { useState, useEffect } from 'react';
import { Wand2, Image as ImageIcon, Loader2, Search, Download, ChevronDown } from 'lucide-react';
import { aiService } from '../../utils/aiService';
import { unsplashService } from '../../utils/unsplashService';

const STYLES = [
    { id: 'photorealistic', label: '写真リアル' },
    { id: 'minimalist', label: 'ミニマル' },
    { id: 'cyberpunk', label: 'サイバーパンク' },
    { id: 'illustration', label: 'イラスト' },
    { id: 'corporate', label: 'コーポレート' },
    { id: 'pastel', label: 'パステル' },
];

export const AIGeneratorModal = ({ isOpen, onClose, onGenerate, initialPrompt = '' }) => {
    const [activeTab, setActiveTab] = useState('ai'); // 'ai' or 'search'

    // AI State
    const [prompt, setPrompt] = useState(initialPrompt);
    const [selectedStyle, setSelectedStyle] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedUrl, setGeneratedUrl] = useState('');
    const [debugInfo, setDebugInfo] = useState(null);
    const [loadError, setLoadError] = useState(false);
    const [provider, setProvider] = useState('gemini');

    // Search State
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [searchError, setSearchError] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (isOpen) {
            // Reset AI State
            setPrompt(initialPrompt);
            setGeneratedUrl('');
            setIsGenerating(false);
            setSelectedStyle('');
            setProvider('gemini');
            setDebugInfo(null);
            setLoadError(false);

            // Reset Search State
            setActiveTab('ai');
            setSearchQuery('');
            setSearchResults([]);
            setSearchError(null);
            setPage(1);
        }
    }, [isOpen, initialPrompt]);

    if (!isOpen) return null;

    // --- AI Handlers ---
    const handleGenerate = async () => {
        setIsGenerating(true);
        setDebugInfo(null);
        setLoadError(false);
        try {
            const result = await aiService.generateImage(prompt, selectedStyle, provider);
            const url = typeof result === 'string' ? result : result.url;
            const info = typeof result === 'object' ? result : { usedPrompt: prompt, isOptimized: false, provider: 'standard' };

            setGeneratedUrl(url);
            setDebugInfo({ ...info, provider });

            const img = new Image();
            img.src = url;
            img.onload = () => setIsGenerating(false);
            img.onerror = () => {
                console.error('Image load failed');
                setIsGenerating(false);
                setLoadError(true);
            };
        } catch (error) {
            console.error(error);
            setIsGenerating(false);
            if (error.message === 'API_KEY_MISSING' || error.message === 'API_KEY_MISSING_OPENAI') {
                alert('APIキーが設定されていません。設定画面からキーを入力してください。');
                onClose('MISSING_KEY');
            } else {
                alert(`生成に失敗しました: ${error.message} `);
            }
        }
    };

    const handleConfirmAI = () => {
        onGenerate(generatedUrl);
        onClose();
    };

    // --- Search Handlers ---
    const handleSearch = async (e) => {
        e?.preventDefault();
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        setSearchError(null);
        setPage(1); // Reset page
        try {
            const results = await unsplashService.searchImages(searchQuery, 1);
            setSearchResults(results);
        } catch (error) {
            console.error(error);
            if (error.message === 'ACCESS_KEY_MISSING') {
                setSearchError('Unsplash Access Keyが設定されていません。設定画面で入力してください。');
            } else if (error.message === 'INVALID_KEY_OR_LIMIT') {
                setSearchError('キーが無効か、利用制限(50回/時)に達しました。');
            } else {
                setSearchError('検索に失敗しました。');
            }
        } finally {
            setIsSearching(false);
        }
    };

    const handleLoadMore = async () => {
        if (!searchQuery.trim()) return;

        setIsLoadingMore(true);
        try {
            const nextPage = page + 1;
            const results = await unsplashService.searchImages(searchQuery, nextPage);
            if (results.length > 0) {
                setSearchResults(prev => [...prev, ...results]);
                setPage(nextPage);
            }
        } catch (error) {
            console.error("Load more failed", error);
        } finally {
            setIsLoadingMore(false);
        }
    };

    const handleSelectImage = async (img) => {
        // Trigger download event as per API requirements
        if (img.downloadLink) {
            unsplashService.triggerDownload(img.downloadLink).catch(e => console.warn(e));
        }
        onGenerate(img.url);
        onClose();
    };


    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        {activeTab === 'ai' ? <Wand2 size={16} className="text-purple-400" /> : <Search size={16} className="text-pink-400" />}
                        {activeTab === 'ai' ? 'AI画像生成' : '画像検索 (Unsplash)'}
                    </h3>
                    <div className="flex bg-gray-800 rounded p-1 mx-4">
                        <button
                            onClick={() => setActiveTab('ai')}
                            className={`px - 3 py - 1 text - xs rounded transition - colors ${activeTab === 'ai' ? 'bg-gray-700 text-white font-bold' : 'text-gray-400 hover:text-gray-200'} `}
                        >
                            AI生成
                        </button>
                        <button
                            onClick={() => setActiveTab('search')}
                            className={`px - 3 py - 1 text - xs rounded transition - colors ${activeTab === 'search' ? 'bg-gray-700 text-white font-bold' : 'text-gray-400 hover:text-gray-200'} `}
                        >
                            画像検索
                        </button>
                    </div>
                    <button onClick={() => onClose()} className="text-gray-500 hover:text-white">✕</button>
                </div>

                {/* Body Content */}
                <div className="p-4 overflow-y-auto flex-1 h-[500px]">

                    {/* --- AI TAB --- */}
                    {activeTab === 'ai' && (
                        <div className="space-y-4">
                            {/* Provider Selector */}
                            <div className="bg-gray-800/50 p-3 rounded border border-gray-700">
                                <label className="text-xs text-blue-400 font-bold mb-1.5 block">① 生成エンジンを選択</label>
                                <select
                                    value={provider}
                                    onChange={(e) => setProvider(e.target.value)}
                                    className="w-full bg-gray-900 border border-gray-600 text-white text-sm rounded px-2 py-2 focus:outline-none focus:border-blue-500"
                                >
                                    <option value="gemini">NanobananaPro (Google Gemini 3 / Imagen 3)</option>
                                    <option value="openai">OpenAI (DALL-E 3) [高画質・有料]</option>
                                </select>
                            </div>

                            {/* Prompt Input */}
                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">② プロンプト (画像の説明)</label>
                                <textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-sm text-white focus:outline-none focus:border-purple-500 min-h-[80px]"
                                    placeholder="例: 未来的なオフィスの会議室、明るい日差し"
                                />
                            </div>

                            {/* Styles */}
                            <div>
                                <label className="text-xs text-gray-500 mb-2 block">③ スタイルを選択</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {STYLES.map(style => (
                                        <button
                                            key={style.id}
                                            onClick={() => setSelectedStyle(style.id)}
                                            className={`px - 2 py - 2 text - xs rounded border transition - colors ${selectedStyle === style.id ? 'bg-purple-600 border-purple-600 text-white' : 'border-gray-700 text-gray-400 hover:bg-gray-800'} `}
                                        >
                                            {style.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Preview Area */}
                            <div className="space-y-2">
                                <div className="aspect-video bg-gray-950 rounded border border-gray-800 flex items-center justify-center relative overflow-hidden group min-h-[200px]">
                                    {isGenerating ? (
                                        <div className="flex flex-col items-center gap-2 text-purple-400 animate-pulse">
                                            <Loader2 size={32} className="animate-spin" />
                                            <span className="text-xs">
                                                {provider === 'openai' ? 'DALL-E 3が描画中...' : 'NanobananaProが思考中...'}
                                            </span>
                                        </div>
                                    ) : generatedUrl ? (
                                        <img src={generatedUrl} alt="Generated" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="text-gray-700 flex flex-col items-center gap-2">
                                            <ImageIcon size={32} />
                                            <span className="text-xs">プレビュー</span>
                                        </div>
                                    )}
                                </div>

                                {/* Debug & Error Messages */}
                                {debugInfo && (
                                    <div className="bg-gray-800/50 p-3 rounded text-[10px] space-y-1 border border-gray-700">
                                        <span className="text-gray-300 font-bold block">
                                            {debugInfo.provider === 'openai' ? 'OpenAI DALL-E 3' : 'NanobananaPro'}:
                                            {debugInfo.isOptimized ? ' Optimized' : ' Standard'}
                                        </span>
                                        <div className="text-gray-500 border-l-2 border-gray-600 pl-2">
                                            {debugInfo.usedPrompt}
                                        </div>
                                    </div>
                                )}
                                {loadError && (
                                    <div className="bg-red-900/50 border border-red-700 text-red-200 p-3 rounded text-xs">
                                        エラー: 画像の読み込みに失敗しました。
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* --- SEARCH TAB --- */}
                    {activeTab === 'search' && (
                        <div className="flex flex-col h-full">
                            <form onSubmit={handleSearch} className="flex gap-2 mb-4">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="キーワード (例: Office, Tokyo, Cat)"
                                    className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-pink-500"
                                />
                                <button
                                    type="submit"
                                    disabled={!searchQuery || isSearching}
                                    className="px-4 py-2 bg-pink-600 hover:bg-pink-500 disabled:opacity-50 text-white rounded text-sm font-bold flex items-center gap-2"
                                >
                                    {isSearching && searchResults.length === 0 ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                                    検索
                                </button>
                            </form>

                            {searchError && (
                                <div className="bg-red-900/50 border border-red-700 text-red-200 p-3 rounded text-xs mb-4">
                                    {searchError}
                                </div>
                            )}

                            <div className="flex-1 overflow-y-auto min-h-[300px]">
                                {/* Searching Indicator (Initial) */}
                                {isSearching && searchResults.length === 0 && (
                                    <div className="flex justify-center items-center h-40">
                                        <Loader2 size={32} className="text-pink-500 animate-spin" />
                                    </div>
                                )}

                                {searchResults.length > 0 ? (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-2">
                                            {searchResults.map((img) => (
                                                <div
                                                    key={img.id}
                                                    onClick={() => handleSelectImage(img)}
                                                    className="group relative aspect-video bg-gray-800 rounded overflow-hidden cursor-pointer hover:ring-2 hover:ring-pink-500"
                                                >
                                                    <img src={img.thumb} alt={img.alt} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                        <span className="text-white text-xs font-bold">選択</span>
                                                    </div>
                                                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1 text-[10px] text-gray-200 truncate px-2">
                                                        by {img.user.name}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Load More Button */}
                                        {/* Assuming unsplashService.searchImages returns up to 20 items per page. If less, it's the last page. */}
                                        {!isSearching && searchResults.length % 20 === 0 && (
                                            <button
                                                onClick={handleLoadMore}
                                                disabled={isLoadingMore}
                                                className="w-full py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                                            >
                                                {isLoadingMore ? <Loader2 size={14} className="animate-spin" /> : <ChevronDown size={14} />}
                                                もっと見る
                                            </button>
                                        )}
                                    </div>
                                ) : (
                                    !isSearching && (
                                        <div className="flex flex-col items-center justify-center h-full text-gray-600 gap-2">
                                            <ImageIcon size={32} />
                                            <p className="text-xs">キーワードを入力して検索してください</p>
                                        </div>
                                    )
                                )}
                            </div>

                            <div className="mt-2 text-[10px] text-gray-500 text-center">
                                Photos provided by <a href="https://unsplash.com/?utm_source=lp_builder&utm_medium=referral" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-300">Unsplash</a>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer (Only shown for AI tab, Search has direct select) */}
                {activeTab === 'ai' && (
                    <div className="p-4 border-t border-gray-800 flex justify-end gap-2">
                        {generatedUrl ? (
                            <>
                                <button onClick={handleGenerate} className="px-4 py-2 rounded text-gray-400 hover:text-white text-sm">再生成</button>
                                <button onClick={handleConfirmAI} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-sm font-bold flex items-center gap-2">
                                    決定
                                </button>
                            </>
                        ) : (
                            <button onClick={handleGenerate} disabled={!prompt} className="px-6 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white rounded text-sm font-bold flex items-center gap-2 w-full justify-center">
                                <Wand2 size={16} /> 生成する
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
