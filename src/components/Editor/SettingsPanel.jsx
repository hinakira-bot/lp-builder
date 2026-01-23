import React, { useState } from 'react';
import { aiService } from '../../utils/aiService';
import { unsplashService } from '../../utils/unsplashService';
import { InputGroup, TextInput, ColorPicker } from '../UI/Input';
import { Megaphone, Key, ArrowDownToLine } from 'lucide-react';

export const SettingsPanel = ({ data, setData }) => {
    const [googleKey, setGoogleKey] = useState(aiService.getApiKey() || '');
    const [openaiKey, setOpenaiKey] = useState(aiService.getOpenAIKey() || '');
    const [unsplashKey, setUnsplashKey] = useState(unsplashService.getAccessKey() || '');
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        console.log('[DEBUG] Saving Keys:', { google: !!googleKey, openai: !!openaiKey });
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

            {/* Footer Settings */}
            <section>
                <div className="bg-gray-800/30 p-4 rounded-xl border border-gray-700/50 space-y-4">
                    <h2 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                        <ArrowDownToLine size={16} className="text-gray-400" /> フッター設定
                    </h2>
                    <InputGroup label="コピーライト / フッターテキスト">
                        <TextInput
                            value={data.footerText || ''}
                            onChange={(val) => setData({ ...data, footerText: val })}
                            placeholder={`© ${new Date().getFullYear()} ${data.siteTitle || 'Company'}. All Rights Reserved.`}
                        />
                        <p className="text-[10px] text-gray-500 mt-1">※空欄の場合は自動的にデフォルトの著作権表記が表示されます。</p>
                    </InputGroup>
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
                        <InputGroup label="Google AI Key (Gemini - Text & Structure)">
                            <div className="space-y-1">
                                <input
                                    type="password"
                                    value={googleKey}
                                    onChange={(e) => setGoogleKey(e.target.value)}
                                    placeholder="AIza..."
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-xs text-gray-200 focus:outline-none focus:border-purple-500 transition-colors"
                                />
                                <p className="text-[10px] text-gray-500">※LPの構成案・文章作成に使用（無料枠あり）</p>
                            </div>
                        </InputGroup>

                        <InputGroup label="OpenAI API Key (DALL-E 3 - Images)">
                            <div className="space-y-1">
                                <input
                                    type="password"
                                    value={openaiKey}
                                    onChange={(e) => setOpenaiKey(e.target.value)}
                                    placeholder="sk-..."
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-xs text-gray-200 focus:outline-none focus:border-teal-500 transition-colors"
                                />
                                <p className="text-[10px] text-gray-500">※高品質な画像生成に使用（従量課金）</p>
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

            {/* Help & Publishing Guide */}
            <section className="space-y-4">
                <div className="bg-blue-900/20 p-5 rounded-xl border border-blue-500/30 space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Megaphone size={16} className="text-blue-400" />
                        <h4 className="text-sm font-bold text-white">【重要】画像の取り扱いについて</h4>
                    </div>
                    <div className="space-y-2 text-xs text-blue-100/80 leading-relaxed">
                        <p>・画像（人物やレビュー写真等）は、すべてインターネット上の<span className="text-blue-300 font-bold">URL</span>で指定する必要があります。</p>
                        <p>・AIで生成した画像のURL（DALL-Eなど）は、<span className="text-orange-400 font-bold">約1時間で期限切れ</span>になり、表示されなくなります。</p>
                        <div className="bg-blue-500/10 p-3 rounded border border-blue-500/20 mt-2">
                            <p className="text-blue-300 font-bold mb-1">推奨される手順：</p>
                            <ol className="list-decimal list-inside space-y-1">
                                <li>AI生成した画像やアップした画像は一度ご自身のPCに保存（右クリックで保存）します。</li>
                                <li>ご自身のサーバーやGoogleドライブ、Gyazoなどの外部ストレージにアップロードします。</li>
                                <li>発行された「直接リンクURL」を、パーツの設定から再入力してください。</li>
                            </ol>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-800/30 p-5 rounded-xl border border-gray-700/50 space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <ArrowDownToLine size={16} className="text-green-400" />
                        <h4 className="text-sm font-bold text-white">本番公開と再編集の手順</h4>
                    </div>
                    <div className="space-y-4 text-xs text-gray-400 leading-relaxed">
                        <div>
                            <p className="font-bold text-gray-200 mb-1">1. ファイルをダウンロード</p>
                            <p>サイドバー下の「index.html DL」で公開用ファイルを保存します。あわせて「保存 (config.json)」も必ずダウンロードしてください。</p>
                        </div>
                        <div>
                            <p className="font-bold text-gray-200 mb-1">2. 公開（サーバーへ）</p>
                            <p>レンタルサーバー等に <code>index.html</code> をアップロードするだけで即時公開できます。※config.jsonはサーバーには不要です。</p>
                        </div>
                        <div>
                            <p className="font-bold text-gray-200 mb-1">3. 再編集したいとき</p>
                            <p>後日このツールを開き、サイドバー下の「<span className="text-blue-400">読込</span>」ボタンから <code>config.json</code> を選ぶと、いつでも編集を再開できます。</p>
                        </div>
                        <div className="bg-blue-500/10 p-3 rounded border border-blue-500/20">
                            <p className="text-[10px] text-blue-200 leading-tight">
                                <span className="font-bold block mb-1">💡 アドバイス</span>
                                ※ サーバー契約やドメイン設定、アップロード方法はサーバー会社のサポートサイトをご確認ください。
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
