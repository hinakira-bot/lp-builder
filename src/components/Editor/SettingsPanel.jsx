import React, { useState } from 'react';
import { Megaphone, ArrowDownToLine } from 'lucide-react';
import { InputGroup, TextInput } from '../UI/Input';

export const SettingsPanel = ({ data, setData }) => {
    const [saved, setSaved] = useState(false);

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
                            <p className="font-bold text-gray-200 mb-1">2. 公開（好きな方法でOK！）</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                                <div className="bg-gray-900/50 p-3 rounded border border-gray-700">
                                    <p className="font-bold text-blue-300 mb-1">【方法A】簡単公開 (Vercel等)</p>
                                    <p>Vercelのダッシュボードに `index.html` をドラッグ＆ドロップするだけで即座にURLが発行されます。一番手軽です。</p>
                                </div>
                                <div className="bg-gray-900/50 p-3 rounded border border-gray-700">
                                    <p className="font-bold text-green-300 mb-1">【方法B】レンタルサーバー</p>
                                    <p>エックスサーバー等の <code>public_html</code> フォルダにアップロードします。独自ドメインで運用したい場合に最適です。</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="font-bold text-gray-200 mb-1">3. 再編集したいとき</p>
                            <p>後日このツールを開き、サイドバー下の「読込」ボタンから <code>config.json</code> を選べば、いつでも編集を再開できます。</p>
                        </div>
                        <div className="bg-blue-500/10 p-3 rounded border border-blue-500/20">
                            <p className="text-[10px] text-blue-200 leading-tight">
                                <span className="font-bold block mb-1">💡 アドバイス</span>
                                ※ Vercel連携（GitHub経由での自動公開）をご希望の場合は、ダウンロードしたファイルをリポジトリに入れてプッシュしてください。
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
