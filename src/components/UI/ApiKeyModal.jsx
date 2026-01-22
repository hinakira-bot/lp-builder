import React, { useState } from 'react';
import { aiService } from '../../utils/aiService';

export const ApiKeyModal = ({ isOpen, onClose, onSave }) => {
    const [key, setKey] = useState('');

    if (!isOpen) return null;

    const handleSave = () => {
        aiService.setApiKey(key);
        onSave();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-gray-900 border border-gray-700 p-6 rounded-lg w-96 shadow-2xl">
                <h3 className="text-lg font-bold text-white mb-4">APIキー設定</h3>
                <p className="text-gray-400 text-sm mb-4">
                    NanobananaPro (Gemini 3) を利用するには、Google AIのAPIキーが必要です。
                    キーはブラウザに保存されます。
                </p>
                <input
                    type="password"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    placeholder="API Key"
                    className="w-full bg-gray-800 border border-gray-600 rounded p-2 text-white mb-4 focus:outline-none focus:border-blue-500"
                />
                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 rounded text-gray-400 hover:text-white">キャンセル</button>
                    <button onClick={handleSave} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold">保存する</button>
                </div>
            </div>
        </div>
    );
};
