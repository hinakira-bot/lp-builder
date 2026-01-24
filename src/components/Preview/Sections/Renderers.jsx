/* eslint-disable */
import React from 'react';
import { clsx } from 'clsx';
import { getYouTubeId, getImgUrl } from '../../../utils/helpers';
import { SectionWrapper } from './SectionWrapper';
import { Dividers } from './Dividers';

// --- Individual Renderers ---

// Helper for Text Styles (Shadow & Backdrop)
const getTextClasses = (section) => {
    let classes = "";
    if (section.textShadow === 'soft') classes += " drop-shadow-md";
    if (section.textShadow === 'strong') classes += " drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]";

    let containerClasses = "";
    if (section.textBackdrop === 'blur') containerClasses += " backdrop-blur-md bg-white/10 p-6 rounded-xl border border-white/20 shadow-lg";
    if (section.textBackdrop === 'white') containerClasses += " bg-white/90 backdrop-blur text-gray-800 p-6 rounded-xl shadow-lg";
    if (section.textBackdrop === 'black') containerClasses += " bg-black/70 backdrop-blur text-white p-6 rounded-xl shadow-lg";

    return { text: classes, container: containerClasses };
};

export const TextRenderer = ({ section, fontSize, globalPadding }) => {
    const styles = getTextClasses(section);
    const scale = section.textScale || 1.0;
    return (
        <SectionWrapper section={section} globalPadding={globalPadding}>
            <div className={clsx("max-w-3xl mx-auto transition-all duration-300", section.align === 'center' ? 'text-center' : section.align === 'right' ? 'text-right' : 'text-left', styles.container)}>
                {(section.title || section.heading) && <h3 className={clsx("font-medium tracking-widest mb-6", styles.text)} style={{ fontSize: `${fontSize.sectionTitle * scale}rem` }}>{section.title || section.heading}</h3>}
                <p className={clsx("leading-loose whitespace-pre-wrap font-light tracking-wide", styles.text)} style={{ fontSize: `${fontSize.body * scale}rem` }}>{section.content || section.text}</p>
            </div>
        </SectionWrapper>
    );
};

export const ImageRenderer = ({ section, globalPadding }) => {
    const width = section.width || 100;
    const alignClass = section.align === 'center' ? 'mx-auto' : (section.align === 'right' ? 'ml-auto' : 'mr-auto');

    const imageUrl = section.image?.url || section.image?.src || (typeof section.image === 'string' ? section.image : section.url);
    const caption = section.image?.caption || section.image?.alt || section.caption;

    return (
        <SectionWrapper section={section} globalPadding={globalPadding}>
            <div style={{ width: `${width}%` }} className={alignClass}>
                {(imageUrl && imageUrl.trim().length > 0) ? (
                    <img src={imageUrl} alt={caption || ''} className="w-full h-auto rounded-lg shadow-lg" />
                ) : (
                    <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg text-gray-400">No Image</div>
                )}
                {caption && <p className="text-xs text-center mt-4 opacity-60">{caption}</p>}
            </div>
        </SectionWrapper>
    );
};

export const HeadingRenderer = ({ section, fontSize, globalPadding }) => {
    const alignClass = section.style === 'center' ? 'text-center' : (section.style === 'right' ? 'text-right' : 'text-left');
    const borderClass = section.design === 'underline' ? 'border-b border-current pb-4' : '';
    const styles = getTextClasses(section);

    return (
        <SectionWrapper section={section} globalPadding={globalPadding}>
            <div className={`max-w-4xl mx-auto ${alignClass}`}>
                <div className={`inline-block ${borderClass} px-4 ${styles.container}`}>
                    <h2 className={`font-medium tracking-widest leading-tight ${styles.text}`} style={{ fontSize: `${fontSize.sectionTitle * 1.2}rem` }}>{section.text || section.content || section.heading || section.title}</h2>
                    {section.subText && <p className={`text-sm mt-2 opacity-60 tracking-wider ${styles.text}`}>{section.subText}</p>}
                </div>
            </div>
        </SectionWrapper>
    );
};

export const VideoRenderer = ({ section, globalPadding }) => {
    const youtubeId = getYouTubeId(section.url);
    const width = section.width || 100;
    const alignClass = section.align === 'center' ? 'mx-auto' : (section.align === 'right' ? 'ml-auto' : 'mr-auto');

    return (
        <SectionWrapper section={section} globalPadding={globalPadding}>
            <div style={{ width: `${width}%` }} className={alignClass}>
                {youtubeId ? (
                    <div className="aspect-video w-full rounded-lg shadow-lg overflow-hidden bg-black">
                        <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${youtubeId}`} title="YouTube video player" frameBorder="0" allowFullScreen></iframe>
                    </div>
                ) : (
                    <video src={section.url} autoPlay loop muted playsInline className="w-full h-auto rounded-lg shadow-lg"></video>
                )}
                {section.caption && <p className="text-xs text-center mt-4 opacity-60">{section.caption}</p>}
            </div>
        </SectionWrapper>
    );
};

// Button Renderer with Size & Effects
export const ButtonRenderer = ({ section, globalPadding }) => {
    const alignClass = section.align === 'center' ? 'text-center' : (section.align === 'right' ? 'text-right' : 'text-left');
    const btnCustomStyle = section.style === 'fill'
        ? { backgroundColor: section.color || '#1f2937', color: section.textColor || '#ffffff', borderColor: 'transparent' }
        : { backgroundColor: 'transparent', color: section.textColor || section.color || 'currentColor', borderColor: section.color || 'currentColor' };

    const btnClasses = section.style === 'fill'
        ? 'hover:brightness-110 border-transparent'
        : 'hover:bg-gray-500/10 border-current';

    // Sizes
    const size = section.size || 'M';
    const sizeClass =
        size === 'S' ? 'px-6 py-2 text-sm' :
            size === 'M' ? 'px-10 py-4 text-base' :
                size === 'L' ? 'px-14 py-5 text-xl' :
                    'px-20 py-6 text-2xl font-bold'; // XL

    // Effects
    const effect = section.effect || 'none';
    let effectClass = "";

    // Float
    if (effect === 'float') effectClass += " animate-bounce-slow shadow-lg hover:shadow-xl hover:-translate-y-1";

    // 3D (Rittai) - Refined to match user image (Flat 3D with shadow thickness)
    if (effect === '3d') {
        // Using box-shadow for the "thickness" (hard shadow) and a soft drop shadow below it.
        // rgba(0,0,0,0.2) provides a "darker shade" of the button color for the thickness.
        effectClass += " shadow-[0_5px_0_rgba(0,0,0,0.2),0_15px_20px_-5px_rgba(0,0,0,0.15)] active:shadow-none active:translate-y-[5px]";
    }

    // Width style
    const btnWidthStyle = section.width && section.width > 0 ? { width: `${section.width}%`, maxWidth: '100%', justifyContent: 'center', display: 'inline-flex' } : {};
    const finalStyle = { ...btnCustomStyle, ...btnWidthStyle };

    return (
        <SectionWrapper section={section} globalPadding={globalPadding}>
            <div className={`max-w-4xl mx-auto ${alignClass}`}>
                <style>{`
                    @keyframes shimmer {
                        0% { transform: translateX(-150%) skewX(-15deg); }
                        20% { transform: translateX(150%) skewX(-15deg); } 
                        100% { transform: translateX(150%) skewX(-15deg); }
                    }
                    .animate-shimmer { animation: shimmer 3s infinite; }
                    @keyframes bounce-slow {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-10px); }
                    }
                    .animate-bounce-slow { animation: bounce-slow 3s infinite ease-in-out; }
                `}</style>
                <a href={section.url} target="_blank" rel="noopener noreferrer"
                    style={finalStyle}
                    className={`inline-block border rounded-full transition-all duration-300 relative overflow-hidden group ${btnClasses} ${sizeClass} ${effectClass}`}
                >
                    <span className="relative z-10 tracking-widest font-medium">{section.label}</span>

                    {/* Sparkle Effect Overlay */}
                    {effect === 'sparkle' && (
                        <div className="absolute top-0 left-0 w-full h-full animate-shimmer pointer-events-none">
                            <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12"></div>
                        </div>
                    )}
                </a>
            </div>
        </SectionWrapper>
    );
};
