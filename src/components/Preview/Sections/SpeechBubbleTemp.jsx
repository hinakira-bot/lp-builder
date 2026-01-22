export const SpeechBubbleRenderer = ({ section, viewMode }) => {
    const isMobile = viewMode === 'mobile';
    const isRight = section.align === 'right'; // Default is Left Bubble (user requested), Right Char. If 'right' alignment selected, swap? User asked: "Left bubble, Right character". So that is the default layout.
    // If align is 'left' (default): Bubble on Left (first), Character on Right (second).
    // If align is 'right' (user wants swap): Character on Left, Bubble on Right.

    // User Request: "Left bubble, Right character".
    // Let's interpret 'align' as the Text Alignment / Bubble Position.
    // Actually simpler:
    // Standard layout (align=left or undefined): [Bubble] [Character] ... No, user said "Left: Bubble, Right: Character".
    // So Flex container.
    // Order: Bubble, Character. justify-between or justify-end?
    // "Left bubble, Right character" implies the bubble is the *speaker* on the left? OR the bubble is on the left side of the screen?
    // "Left to fukidashi (bubble), and Right to character".
    // This usually means the character is on the right, speaking the bubble which is to their left.
    // So visual layout: [ Bubble ] [ Character ]

    const bubbleColor = section.bubbleColor || '#f3f4f6';
    const textColor = section.textColor || '#1f2937';

    return (
        <div className={`flex items-start gap-4 ${isMobile ? 'px-2' : 'max-w-3xl mx-auto px-6'} ${isRight ? 'flex-row-reverse' : ''}`}>

            {/* Character Circle */}
            <div className={`flex-shrink-0 ${isRight ? 'ml-auto' : 'ml-0 order-2'}`}>
                {/* Wait, if "Left Bubble, Right Character" -> Bubble is first in DOM? or Flex reverse?
                    Default: Bubble ... Character.
                */}
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-white shadow-md bg-gray-200">
                    {section.characterImage ? (
                        <img src={section.characterImage} alt="Speaker" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Img</div>
                    )}
                </div>
                {section.characterName && <p className="text-[10px] text-center mt-1 text-gray-500 font-bold">{section.characterName}</p>}
            </div>

            {/* Speech Bubble */}
            <div className={`relative p-4 md:p-6 rounded-2xl shadow-sm flex-1 ${isRight ? 'bg-blue-50 ml-2 mr-auto' : 'mr-2 ml-auto order-1'}`}
                style={{ backgroundColor: bubbleColor, color: textColor }}>

                {/* Tail */}
                <div className={`absolute top-6 w-0 h-0 border-8 border-transparent ${isRight ? '-left-4 border-r-blue-50' : '-right-4 border-l-gray-100'}`}
                    style={isRight ? { borderRightColor: bubbleColor } : { borderLeftColor: bubbleColor }}></div>

                <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{section.text}</p>
            </div>
        </div>
    );
};
