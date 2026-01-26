import React from 'react';
import { clsx } from 'clsx';
import { getDesignTheme } from '../../../utils/helpers';

export const SpeechBubbleRenderer = ({ section, viewMode, design: globalDesign }) => {
    const isMobile = viewMode === 'mobile';
    const design = section.design || globalDesign || 'standard';
    const theme = getDesignTheme(design);

    // Default: Character on Left, Bubble on Right (Classical)
    // If align === 'right': Bubble on Left, Character on Right
    const isSwap = section.align === 'right';

    const bubbleColor = section.bubbleColor || (isSangoLine ? theme.bg : '#ffffff');
    const textColor = section.textColor || theme.text;
    const isSangoLine = ['earth', 'gentle', 'standard', 'modern'].includes(design);

    return (
        <div className={clsx(
            "flex items-start gap-4 mx-auto px-6 py-8",
            isMobile ? "max-w-full" : "max-w-3xl",
            isSwap ? "flex-row-reverse" : "flex-row"
        )}>
            {/* Character Avatar */}
            <div className="flex-shrink-0 flex flex-col items-center">
                <div className={clsx(
                    "w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 shadow-md transition-transform hover:scale-105",
                    isSangoLine ? "border-white bg-gray-50" : "border-gray-100 bg-white"
                )}>
                    {section.characterImage ? (
                        <img src={section.characterImage} alt={section.characterName} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-[10px] text-gray-400">AVATAR</div>
                    )}
                </div>
                {section.characterName && (
                    <p className="text-[10px] text-center mt-2 font-black tracking-tighter opacity-60 uppercase">{section.characterName}</p>
                )}
            </div>

            {/* Speech Bubble */}
            <div className="relative flex-1 group">
                <div className={clsx(
                    "p-6 md:p-8 transition-all duration-300",
                    isSangoLine ? "shadow-sm" : "shadow-lg border border-gray-100"
                )} style={{
                    backgroundColor: section.bubbleColor || (isSangoLine ? theme.bg : '#ffffff'),
                    color: section.textColor || theme.text,
                    borderRadius: theme.radius
                }}>
                    {/* Tail (Triangle) */}
                    <div className={clsx(
                        "absolute top-6 w-0 h-0 border-[10px] border-transparent",
                        isSwap ? "-right-5 border-l-[10px]" : "-left-5 border-r-[10px]"
                    )} style={{
                        [isSwap ? 'borderLeftColor' : 'borderRightColor']: section.bubbleColor || (isSangoLine ? theme.bg : '#ffffff')
                    }}></div>

                    <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap font-medium tracking-wide">
                        {section.text || "ここにメッセージを入力してください。"}
                    </p>
                </div>
            </div>
        </div>
    );
};
