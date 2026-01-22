import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { ApiKeyModal } from './ApiKeyModal';
import { AIGeneratorModal } from './AIGeneratorModal';
import { aiService } from '../../utils/aiService';

export const AIGeneratorButton = ({ onGenerate, initialPrompt }) => {
    const [showKeyModal, setShowKeyModal] = useState(false);
    const [showGenModal, setShowGenModal] = useState(false);

    const handleClick = () => {
        // Check for key first
        if (!aiService.getApiKey()) {
            setShowKeyModal(true);
        } else {
            setShowGenModal(true);
        }
    };

    const handleKeySaved = () => {
        // After key is saved, immediately open gen modal
        setShowGenModal(true);
    };

    const handleGenClose = (reason) => {
        setShowGenModal(false);
        if (reason === 'MISSING_KEY') {
            setShowKeyModal(true);
        }
    };

    return (
        <>
            <button
                onClick={handleClick}
                className="p-1.5 bg-purple-600/20 hover:bg-purple-600/40 text-purple-400 border border-purple-500/30 rounded transition-colors"
                title="AI画像生成 (Gemini 3)"
            >
                <Wand2 size={14} />
            </button>

            <ApiKeyModal
                isOpen={showKeyModal}
                onClose={() => setShowKeyModal(false)}
                onSave={handleKeySaved}
            />

            <AIGeneratorModal
                isOpen={showGenModal}
                onClose={handleGenClose}
                onGenerate={onGenerate}
                initialPrompt={initialPrompt}
            />
        </>
    );
};
