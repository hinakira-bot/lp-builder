/* eslint-disable */
import React from 'react';
import { clsx } from 'clsx';
import { getYouTubeId } from '../../../utils/helpers';

// Helper for divider SVGs
const Dividers = ({ type, color, position }) => {
    if (!type || type === 'none') return null;

    // SVG paths from the original code
    const paths = {
        'wave': "M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z",
        'tilt-right': "M0,120L1440,0L1440,120L0,120Z",
        'tilt-left': "M0,0L1440,120L0,120Z",
        'triangle': "M720,0L1440,120L0,120Z",
        'curve': "M0,0 C480,120 960,120 1440,0 L1440,120 L0,120 Z",
    };

    if (!paths[type]) return null;

    const style = position === 'top'
        ? { top: 0, transform: 'translateY(-1px) rotate(180deg)', left: 0 }
        : { bottom: 0, transform: 'translateY(1px)', left: 0 };

    return (
        <div className="absolute w-full overflow-hidden leading-[0] z-20" style={style}>
            <svg viewBox="0 0 1440 120" fill={color} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <path d={paths[type]}></path>
            </svg>
        </div>
    );
};

export const SectionWrapper = ({ section, children, fontSize, globalPadding = 24 }) => {
    // Generate styles
    const bgImage = section.style?.bgImage || (section.bgType === 'image' ? `url('${section.bgValue}')` : 'none');
    const bgColor = section.style?.bgColor || (section.bgType === 'color' ? section.bgValue : 'transparent');
    const bgOverlay = section.style?.bgOverlay !== undefined ? section.style.bgOverlay : (section.bgOverlay || 0);

    const style = {
        animationDelay: '0.2s',
        backgroundColor: bgColor,
        backgroundImage: bgImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
    };

    // Box Styles
    const hasGlobalPadding = globalPadding > 0;
    const paddingXStyle = { paddingLeft: `${globalPadding}px`, paddingRight: `${globalPadding}px` };

    // Width logic: if padding is 0, it's full width (max-w-none). Otherwise standard max-w-5xl.
    const containerWidthClass = hasGlobalPadding ? "max-w-5xl mx-auto" : "max-w-none";
    const innerMaxWidth = (section.boxStyle && section.boxStyle !== 'none') || section.type === 'full_width' ? 'w-full' : `w-full ${containerWidthClass}`;

    const boxColor = section.boxColor || '#3b82f6';
    const boxClasses = clsx(
        section.boxStyle === 'shadow' && 'bg-white shadow-xl text-gray-800',
        section.boxStyle === 'border' && 'border',
        section.boxStyle === 'fill' && 'bg-gray-100/50',
        section.boxStyle === 'stitch' && 'border-2 border-dashed',
        section.boxStyle === 'double' && 'border-4 border-double',
        section.boxStyle === 'comic' && 'border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white text-gray-900',
        section.boxStyle === 'neon' && 'border-2 bg-black/80 text-white',
        section.boxStyle === 'glass' && 'backdrop-blur-md bg-white/40 border'
    );

    const boxStyle = {
        borderColor: (section.boxStyle === 'border' || section.boxStyle === 'stitch' || section.boxStyle === 'double' || section.boxStyle === 'neon' || section.boxStyle === 'glass') ? boxColor : undefined,
        boxShadow: section.boxStyle === 'neon' ? `0 0 20px ${boxColor}, inset 0 0 10px ${boxColor}` : (section.boxStyle === 'comic' ? `8px 8px 0px 0px ${boxColor}` : undefined),
        borderStyle: section.boxStyle === 'stitch' ? 'dashed' : (section.boxStyle === 'double' ? 'double' : undefined)
    };

    const boxPadding = section.boxStyle && section.boxStyle !== 'none' ? 'p-8 md:p-12 rounded-xl' : '';
    const isBoxed = section.boxStyle && section.boxStyle !== 'none';

    return (
        <div id={`section-${section.id}`} className={clsx("relative opacity-0 animate-fadeInUp", section.pt || 'pt-16', section.pb || 'pb-16')} style={style}>
            {/* Overlay */}
            {(bgImage !== 'none' || bgOverlay > 0) && (
                <div className="absolute inset-0 bg-black z-0 pointer-events-none" style={{ opacity: bgOverlay }}></div>
            )}

            <Dividers type={section.dividerTop} color={section.dividerTopColor} position="top" />

            {isBoxed ? (
                <div className="w-full max-w-5xl mx-auto px-6 relative z-10">
                    <div className={`${boxClasses} ${boxPadding}`} style={boxStyle}>
                        <div className={innerMaxWidth} style={paddingXStyle}>
                            {children}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="relative z-10">
                    <div className={innerMaxWidth} style={paddingXStyle}>
                        {children}
                    </div>
                </div>
            )}

            <Dividers type={section.dividerBottom} color={section.dividerBottomColor} position="bottom" />
        </div>
    );
};

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

export const TextRenderer = ({ section, fontSize }) => {
    const styles = getTextClasses(section);
    const scale = section.textScale || 1.0;
    return (
        <div className={clsx("max-w-3xl mx-auto transition-all duration-300", section.align === 'center' ? 'text-center' : section.align === 'right' ? 'text-right' : 'text-left', styles.container)}>
            {section.title && <h3 className={clsx("font-medium tracking-widest mb-6", styles.text)} style={{ fontSize: `${fontSize.sectionTitle * scale}rem` }}>{section.title}</h3>}
            <p className={clsx("leading-loose whitespace-pre-wrap font-light tracking-wide", styles.text)} style={{ fontSize: `${fontSize.body * scale}rem` }}>{section.content}</p>
        </div>
    );
};

export const ImageRenderer = ({ section }) => {
    const width = section.width || 100;
    const alignClass = section.align === 'center' ? 'mx-auto' : (section.align === 'right' ? 'ml-auto' : 'mr-auto');

    const imageUrl = section.image?.url || section.url;
    const caption = section.image?.caption || section.caption;

    return (
        <div style={{ width: `${width}%` }} className={alignClass}>
            {imageUrl ? (
                <img src={imageUrl} alt={caption || ''} className="w-full h-auto rounded-lg shadow-lg" />
            ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg text-gray-400">No Image</div>
            )}
            {caption && <p className="text-xs text-center mt-4 opacity-60">{caption}</p>}
        </div>
    );
};

export const HeadingRenderer = ({ section, fontSize }) => {
    const alignClass = section.style === 'center' ? 'text-center' : (section.style === 'right' ? 'text-right' : 'text-left');
    const borderClass = section.design === 'underline' ? 'border-b border-current pb-4' : '';
    const styles = getTextClasses(section);

    return (
        <div className={`max-w-4xl mx-auto ${alignClass}`}>
            <div className={`inline-block ${borderClass} px-4 ${styles.container}`}>
                <h2 className={`font-medium tracking-widest leading-tight ${styles.text}`} style={{ fontSize: `${fontSize.sectionTitle * 1.2}rem` }}>{section.text}</h2>
                {section.subText && <p className={`text-sm mt-2 opacity-60 tracking-wider ${styles.text}`}>{section.subText}</p>}
            </div>
        </div>
    );
};

export const VideoRenderer = ({ section }) => {
    const youtubeId = getYouTubeId(section.url);
    const width = section.width || 100;
    const alignClass = section.align === 'center' ? 'mx-auto' : (section.align === 'right' ? 'ml-auto' : 'mr-auto');

    return (
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
    );
};

// Button Renderer with Size & Effects
export const ButtonRenderer = ({ section }) => {
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
    );
};
