import React, { useState } from 'react';
import { aiService } from '../../utils/aiService';
import { AlertTriangle, ExternalLink, ShieldCheck, Key, Zap } from 'lucide-react';

export const ApiKeyModal = ({ isOpen, onClose, onSave }) => {
    const [geminiKey, setGeminiKey] = useState(aiService.getApiKey() || '');
    const [openaiKey, setOpenaiKey] = useState(aiService.getOpenAIKey() || '');
    const [acknowledged, setAcknowledged] = useState(false);
    const [activeTab, setActiveTab] = useState('gemini'); // 'gemini' or 'openai'

    if (!isOpen) return null;

    const handleSave = () => {
        if (!acknowledged) {
            alert('セキュリティに関する注意事項を確認し、チェックを入れてください。');
            return;
        }
        try {
            if (geminiKey) aiService.setApiKey(geminiKey);
            if (openaiKey) aiService.setOpenAIKey(openaiKey);

            if (!geminiKey && !openaiKey) {
                alert('少なくとも1つのキーを入力してください。');
                return;
            }

            onSave();
            onClose();
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] animate-fadeIn backdrop-blur-sm p-4">
            <div className="bg-[#111] border border-gray-700 p-6 md:p-8 rounded-2xl w-full max-w-lg shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto scrollbar-hide">
                <div className="flex items-center gap-3 text-blue-400">
                    <Key size={24} />
                    <h3 className="text-xl font-bold text-white tracking-tight">AIサービス設定</h3>
                </div>

                {/* Security Warnings (Global) */}
                <div className="bg-yellow-900/10 border border-yellow-800/50 rounded-xl p-4 space-y-3">
                    <p className="text-yellow-400 text-sm font-bold flex items-center gap-2">
                        <AlertTriangle size={16} /> セキュリティ注意事項
                    </p>
                    <ul className="text-yellow-200/70 text-[11px] space-y-1.5 list-disc list-inside">
                        <li>キーはブラウザの <span className="text-yellow-400 font-bold">一時メモリ(sessionStorage)</span> のみに保存されます</li>
                        <li>ブラウザやタブを閉じると自動的に消去されるため安全です</li>
                        <li>各サービスの使用料金は、お客様ご自身の負担となります</li>
                    </ul>
                </div>

                {/* Key Type Selector */}
                <div className="flex bg-gray-900 p-1 rounded-lg border border-gray-800">
                    <button
                        onClick={() => setActiveTab('gemini')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-xs font-bold transition-all ${activeTab === 'gemini' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        Google Gemini
                    </button>
                    <button
                        onClick={() => setActiveTab('openai')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-xs font-bold transition-all ${activeTab === 'openai' ? 'bg-teal-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        OpenAI (DALL-E 3)
                    </button>
                </div>

                {activeTab === 'gemini' ? (
                    <div className="space-y-4 animate-fadeIn">
                        <div className="bg-blue-900/10 border border-blue-800/20 rounded-xl p-4">
                            <h4 className="text-sm font-bold text-blue-400 mb-1 flex items-center gap-2">
                                <Zap size={14} /> Gemini 3 (構成・文章作成)
                            </h4>
                            <p className="text-gray-400 text-[10px] leading-relaxed">
                                LPの構成案やキャッチコピー、画像生成の指示出しに使用します。
                                無料枠（Free Tier）の範囲内であれば無料で使用可能です。
                            </p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Gemini API Key</label>
                            <input
                                type="password"
                                value={geminiKey}
                                onChange={(e) => setGeminiKey(e.target.value)}
                                placeholder="AIzaSy..."
                                className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 font-mono text-sm shadow-inner"
                            />
                            <a
                                href="https://aistudio.google.com/app/apikey"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-[10px] text-blue-400 hover:underline px-1"
                            >
                                <ExternalLink size={10} /> Google AI Studio でキーを取得
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4 animate-fadeIn">
                        <div className="bg-teal-900/10 border border-teal-800/20 rounded-xl p-4">
                            <h4 className="text-sm font-bold text-teal-400 mb-1 flex items-center gap-2">
                                <Zap size={14} /> OpenAI DALL-E 3 (高品質画像)
                            </h4>
                            <p className="text-gray-400 text-[10px] leading-relaxed">
                                超高品質な商用レベルの画像を生成したい場合に使用します。
                                OpenAIの有料クレジットが必要です。
                            </p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">OpenAI API Key</label>
                            <input
                                type="password"
                                value={openaiKey}
                                onChange={(e) => setOpenaiKey(e.target.value)}
                                placeholder="sk-..."
                                className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-white focus:outline-none focus:border-teal-500 font-mono text-sm shadow-inner"
                            />
                            <a
                                href="https://platform.openai.com/api-keys"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-[10px] text-teal-400 hover:underline px-1"
                            >
                                <ExternalLink size={10} /> OpenAI Dashboard でキーを取得
                            </a>
                        </div>
                    </div>
                )}

                {/* Consent */}
                <label className="flex items-start gap-3 cursor-pointer group bg-gray-800/30 p-3 rounded-xl border border-gray-800">
                    <input
                        type="checkbox"
                        checked={acknowledged}
                        onChange={(e) => setAcknowledged(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded border-gray-700 bg-gray-900 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900"
                    />
                    <span className="text-gray-400 text-[11px] group-hover:text-gray-300 leading-relaxed select-none">
                        セキュリティリスク（一時保存・自己管理）を理解し、自己責任で使用することに同意します。
                    </span>
                </label>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
                    <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-400 hover:text-white transition-colors">キャンセル</button>
                    <button
                        onClick={handleSave}
                        disabled={!acknowledged || (!geminiKey && !openaiKey)}
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-600 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-900/20"
                    >
                        設定を保存する
                    </button>
                </div>
            </div>
        </div>
    );
};
