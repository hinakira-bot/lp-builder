/* eslint-disable */
import React from 'react';
import { clsx } from 'clsx';
import { getYouTubeId, getImgUrl, getDesignTheme } from '../../../utils/helpers';
import { SectionWrapper } from './SectionWrapper';
import { Dividers } from './Dividers';
import { ArrowRight, Play, ExternalLink, Mail, Phone, ShoppingCart, Check } from 'lucide-react';

// --- Individual Renderers ---

// Helper to parse text for markers [[text]] and bold **text**
export const parseRichText = (text, accent, isMarkerColorCustom) => {
    if (!text) return null;
    const markerColor = isMarkerColorCustom || '#ffff00';

    // Split by markers [[...]], bold **...**, subheadings ###...###, red text !!...!!, and links [...](...)
    const parts = text.split(/(\[\[.*?\]\]|\*\*.*?\*\*|###.*?###|!!.*?!!|\[.*?\]\(.*?\))/g);

    return parts.map((part, i) => {
        if (part.startsWith('[[') && part.endsWith(']]')) {
            const content = part.slice(2, -2);
            return <mark key={i} className="" style={{ background: `linear-gradient(transparent 60%, ${markerColor} 60%)`, color: 'inherit', textShadow: 'none' }}>{content}</mark>;
        }
        if (part.startsWith('**') && part.endsWith('**')) {
            const content = part.slice(2, -2);
            return <strong key={i} className="font-bold">{content}</strong>;
        }
        if (part.startsWith('!!') && part.endsWith('!!')) {
            const content = part.slice(2, -2);
            return <span key={i} className="text-red-500 font-bold">{content}</span>;
        }
        if (part.startsWith('[') && part.endsWith(')')) {
            const match = part.match(/\[(.*?)\]\((.*?)\)/);
            if (match) {
                return <a key={i} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline hover:opacity-70 transition-opacity">{match[1]}</a>;
            }
        }
        if (part.startsWith('###') && part.endsWith('###')) {
            const content = part.slice(3, -3);
            return (
                <div key={i} className="block mt-10 mb-4 pl-4 border-l-4 font-black ml-6" style={{ borderColor: accent, fontSize: '1.2em', opacity: 1 }}>
                    {content}
                </div>
            );
        }
        return part;
    });
};

const renderHeadingContent = ({ text, pattern, accent, alignClass, fontSize, theme, textShadowStyle, markerColor }) => {
    let headingClass = "font-black leading-tight tracking-tight mb-2 ";
    let headingStyle = { fontSize: `${fontSize}rem`, color: theme.text, textShadow: textShadowStyle };
    let decoration = null;

    if (pattern === 'background') {
        headingClass += "inline-block px-6 py-3 rounded-lg ";
        headingStyle.backgroundColor = accent;
        headingStyle.color = '#fff';
        headingStyle.textShadow = 'none';
    } else if (pattern === 'leftBorder') {
        headingClass += "border-l-8 pl-4 py-1 ";
        headingStyle.borderLeftColor = accent;
    } else if (pattern === 'doubleLine') {
        headingClass += "border-y-2 py-4 border-dashed ";
        headingStyle.borderTopColor = accent;
        headingStyle.borderBottomColor = accent;
    } else if (pattern === 'underline') {
        headingClass += "border-b-4 pb-2 inline-block px-4 ";
        headingStyle.borderBottomColor = accent;
    } else if (pattern === 'bracket') {
        headingClass += "border-x-8 px-6 py-1 ";
        headingStyle.borderLeftColor = accent;
        headingStyle.borderRightColor = accent;
    } else if (pattern === 'gradient') {
        headingClass += "bg-clip-text text-transparent ";
        headingStyle.backgroundImage = `linear-gradient(45deg, ${accent}, #64748b)`;
        headingStyle.color = 'transparent';
        headingStyle.textShadow = 'none';
    } else if (pattern === 'quote') {
        headingClass += "relative pl-10 py-2 border-l-4 ";
        headingStyle.borderLeftColor = accent;
        decoration = <div className="absolute left-3 top-0 text-4xl opacity-20 font-serif" style={{ color: accent }}>&ldquo;</div>;
    } else {
        // Simple/Standard - No decoration by default for 'simple', but keep fallback clean
    }

    return (
        <div className="inline-block relative">
            {decoration}
            <h3 className={headingClass} style={headingStyle}>
                {parseRichText(text, accent, markerColor)}
            </h3>
        </div>
    );
};

// Helper for Text Styles (Shadow & Backdrop)
export const TextRenderer = ({ section, fontSize, globalPadding, accentColor: globalAccent }) => {
    const design = section.design || 'standard';
    const theme = getDesignTheme(design);
    const accent = section.markerColor || globalAccent || '#ffff00';
    const scale = section.textScale || 1.0;
    const textShadowStyle = (section.bgType === 'image' || section.bgImage) ? '2px 2px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 2px 0 0 #fff, -2px 0 0 #fff' : undefined;

    const align = section.align || 'left';
    const alignClass = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';

    // Body Alignment - Default to Heading Alignment if not set
    const textAlign = section.textAlign || align;
    const textAlignClass = textAlign === 'center' ? 'text-center' : textAlign === 'right' ? 'text-right' : 'text-left';

    // Alignment Classes with Indentation for Left Align
    const headingContainerClass = clsx("max-w-4xl mx-auto mb-8", alignClass, align === 'left' && "pl-4 md:pl-8");
    const bodyContainerClass = clsx("max-w-4xl mx-auto leading-loose whitespace-pre-wrap opacity-80", textAlignClass, textAlign === 'left' && "pl-4 md:pl-8");

    return (
        <SectionWrapper section={section} globalPadding={globalPadding}>
            <div className="w-full transition-all duration-300">
                {(section.title || section.heading) && (
                    <div className={headingContainerClass}>
                        {renderHeadingContent({
                            text: section.title || section.heading,
                            pattern: section.pattern || 'standard',
                            accent: accent,
                            alignClass: alignClass,
                            fontSize: fontSize.sectionTitle * scale,
                            theme: theme,
                            textShadowStyle: textShadowStyle,
                            markerColor: section.markerColor
                        })}
                    </div>
                )}
                <div className={bodyContainerClass} style={{ fontSize: `${fontSize.body * scale}rem`, textShadow: textShadowStyle }}>
                    {parseRichText(section.content || section.text, accent, section.markerColor)}
                </div>
            </div>
        </SectionWrapper>
    );
};

export const ImageRenderer = ({ section, globalPadding }) => {
    const design = section.design || 'standard';
    const theme = getDesignTheme(design);
    const width = section.width || 100;
    const alignClass = section.align === 'center' ? 'mx-auto' : (section.align === 'right' ? 'ml-auto' : 'mr-auto');
    const imageUrl = getImgUrl(section.image) || (typeof section.image === 'string' ? section.image : section.url);
    const caption = section.image?.caption || section.image?.alt || section.caption;

    return (
        <SectionWrapper section={section} globalPadding={globalPadding}>
            <div style={{ width: `${width}%` }} className={alignClass}>
                {imageUrl ? (
                    section.linkUrl ? (
                        <a href={section.linkUrl} target="_blank" rel="noopener noreferrer" className="block transition-opacity hover:opacity-80">
                            <div className="overflow-hidden shadow-2xl transition-transform hover:scale-[1.01]" style={{ borderRadius: section.borderRadius !== undefined ? `${section.borderRadius}px` : theme.radius }}>
                                <img src={imageUrl} alt={caption || ''} className="w-full h-full object-cover" />
                            </div>
                        </a>
                    ) : (
                        <div className="overflow-hidden shadow-2xl transition-transform hover:scale-[1.01]" style={{ borderRadius: section.borderRadius !== undefined ? `${section.borderRadius}px` : theme.radius }}>
                            <img src={imageUrl} alt={caption || ''} className="w-full h-full object-cover" />
                        </div>
                    )
                ) : (
                    <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-400 font-black" style={{ borderRadius: section.borderRadius !== undefined ? `${section.borderRadius}px` : theme.radius }}>
                        IMAGE AREA
                    </div>
                )}
                {caption && <p className="text-xs text-center mt-4 opacity-40 font-bold tracking-widest">{caption}</p>}
            </div>
        </SectionWrapper>
    );
};

export const HeadingRenderer = ({ section, fontSize, globalPadding, accentColor: globalAccent }) => {
    const design = section.design || 'standard';
    const theme = getDesignTheme(design);
    const pattern = section.pattern || 'standard';
    const accent = section.accentColor || globalAccent || theme.primary;
    const align = section.align || section.style || 'center';
    const alignClass = align === 'center' ? 'text-center' : (align === 'right' ? 'text-right' : 'text-left');
    const textShadowStyle = (section.bgType === 'image' || section.bgImage) ? '2px 2px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 2px 0 0 #fff, -2px 0 0 #fff' : undefined;

    const headingText = section.text || section.content || section.heading || section.title;

    return (
        <SectionWrapper section={section} globalPadding={globalPadding}>
            <div className={clsx("max-w-4xl mx-auto", alignClass, align === 'left' && "pl-4 md:pl-8")}>
                {renderHeadingContent({
                    text: headingText,
                    pattern: pattern,
                    accent: accent,
                    alignClass: alignClass,
                    fontSize: fontSize.sectionTitle * 1.3,
                    theme: theme,
                    textShadowStyle: textShadowStyle,
                    markerColor: section.markerColor
                })}
                {section.subText && <p className="text-xs md:text-sm opacity-40 font-black tracking-[0.2em] mb-4 uppercase mt-2" style={{ textShadow: textShadowStyle }}>{section.subText}</p>}
            </div>
        </SectionWrapper>
    );
};

export const VideoRenderer = ({ section, globalPadding }) => {
    const design = section.design || 'standard';
    const theme = getDesignTheme(design);
    const youtubeId = getYouTubeId(section.url);
    const width = section.width || 100;
    const alignClass = section.align === 'center' ? 'mx-auto' : (section.align === 'right' ? 'ml-auto' : 'mr-auto');
    const textShadowStyle = (section.bgType === 'image' || section.bgImage) ? '2px 2px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 2px 0 0 #fff, -2px 0 0 #fff' : undefined;

    return (
        <SectionWrapper section={section} globalPadding={globalPadding}>
            <div style={{ width: `${width}%` }} className={alignClass}>
                <div className="aspect-video w-full overflow-hidden shadow-2xl bg-black" style={{ borderRadius: theme.radius }}>
                    {youtubeId ? (
                        <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${youtubeId}`} title="YouTube video player" frameBorder="0" allowFullScreen></iframe>
                    ) : (
                        <video src={section.url} autoPlay loop muted playsInline className="w-full h-full object-cover"></video>
                    )}
                </div>
                {section.caption && <p className="text-xs text-center mt-4 opacity-40 font-bold tracking-widest" style={{ textShadow: textShadowStyle }}>{section.caption}</p>}
            </div>
        </SectionWrapper>
    );
};

// Button Renderer with Size & Effects
export const ButtonRenderer = ({ section, globalPadding }) => {
    const design = section.design || 'standard';
    const theme = getDesignTheme(design);

    const alignClass = section.align === 'center' ? 'text-center' : (section.align === 'right' ? 'text-right' : 'text-left');
    const widthStyle = section.width > 0 ? { width: `${section.width}%` } : {};

    const btnColor = section.color || theme.primary;
    const textColor = section.textColor || theme.contrast;
    const isOutline = section.style === 'outline';
    const effect = section.effect || 'none';
    const paddingY = section.paddingY || 16;

    const size = section.size || 'M';
    // Mobile responsive text sizes
    const textSizeClass = size === 'S' ? 'text-[10px] md:text-xs' :
        size === 'M' ? 'text-xs md:text-sm' :
            size === 'L' ? 'text-sm md:text-lg' :
                'text-base md:text-2xl';

    const pxClass = size === 'S' ? 'px-6' :
        size === 'M' ? 'px-10' :
            size === 'L' ? 'px-14' :
                'px-16';

    // Icon Selection
    const iconMap = {
        arrowRight: ArrowRight,
        mail: Mail,
        phone: Phone,
        externalLink: ExternalLink,
        cart: ShoppingCart,
        check: Check,
        none: null
    };
    const IconComponent = iconMap[section.icon] || ArrowRight;
    const hasIcon = section.icon !== 'none';

    // Base Style
    const btnStyle = {
        backgroundColor: isOutline ? 'transparent' : btnColor,
        color: isOutline ? btnColor : textColor,
        borderRadius: theme.radius,
        border: isOutline ? `2px solid ${btnColor}` : 'none',
        paddingTop: `${paddingY}px`,
        paddingBottom: `${paddingY}px`,
        ...widthStyle
    };

    // 3D Effect Style
    if (effect === '3d' && !isOutline) {
        btnStyle.boxShadow = `0 4px 0 ${btnColor}cc`;
        btnStyle.marginBottom = '4px';
    }

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
                        50% { transform: translateY(-5px); }
                    }
                    .animate-bounce-slow { animation: bounce-slow 2s infinite ease-in-out; }
                `}</style>

                {section.microCopy && <p className="text-xs text-center mb-2 font-bold opacity-75 leading-none">{section.microCopy}</p>}

                <a href={section.url || '#'} target="_blank" rel="noopener noreferrer"
                    className={clsx(
                        "group relative inline-flex items-center justify-center transition-all duration-300 overflow-hidden font-black tracking-widest uppercase",
                        textSizeClass, pxClass,
                        effect === 'float' ? "animate-bounce-slow" : "",
                        effect === '3d' ? "active:translate-y-[4px] active:shadow-none" : "hover:-translate-y-1 hover:shadow-lg"
                    )}
                    style={btnStyle}
                >
                    <span className="relative z-10 flex items-center gap-2">
                        {section.label || "CONTACT US"}
                        {hasIcon && IconComponent && <IconComponent size={18} className="transition-transform group-hover:translate-x-1" />}
                    </span>

                    {/* Sparkle Effect */}
                    {effect === 'sparkle' && (
                        <div className="absolute top-0 left-0 w-full h-full animate-shimmer pointer-events-none opacity-20">
                            <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12"></div>
                        </div>
                    )}
                </a>
            </div>
        </SectionWrapper>
    );
};
