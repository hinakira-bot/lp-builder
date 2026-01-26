/* eslint-disable */
import React from 'react';
import { clsx } from 'clsx';
import { getYouTubeId, getImgUrl, getDesignTheme } from '../../../utils/helpers';
import { SectionWrapper } from './SectionWrapper';
import { Dividers } from './Dividers';
import { ArrowRight, Play, ExternalLink } from 'lucide-react';

// --- Individual Renderers ---

// Helper for Text Styles (Shadow & Backdrop)
export const TextRenderer = ({ section, fontSize, globalPadding }) => {
    const design = section.design || 'standard';
    const theme = getDesignTheme(design);
    const scale = section.textScale || 1.0;
    const textShadowStyle = (section.bgType === 'image' || section.bgImage) ? '2px 2px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 2px 0 0 #fff, -2px 0 0 #fff' : undefined;

    return (
        <SectionWrapper section={section} globalPadding={globalPadding}>
            <div className={clsx(
                "max-w-3xl mx-auto transition-all duration-300",
                section.align === 'center' ? 'text-center' : section.align === 'right' ? 'text-right' : 'text-left'
            )}>
                {(section.title || section.heading) && (
                    <h3 className="font-bold mb-8 tracking-tight" style={{ fontSize: `${fontSize.sectionTitle * scale}rem`, color: theme.text, textShadow: textShadowStyle }}>
                        {section.title || section.heading}
                    </h3>
                )}
                <p className="leading-loose whitespace-pre-wrap opacity-80" style={{ fontSize: `${fontSize.body * scale}rem`, textShadow: textShadowStyle }}>
                    {section.content || section.text}
                </p>
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
                    <div className="overflow-hidden shadow-2xl transition-transform hover:scale-[1.01]" style={{ borderRadius: theme.radius }}>
                        <img src={imageUrl} alt={caption || ''} className="w-full h-auto" />
                    </div>
                ) : (
                    <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-400 font-black" style={{ borderRadius: theme.radius }}>
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
    const accent = globalAccent || theme.primary;
    const alignClass = section.style === 'center' ? 'text-center' : (section.style === 'right' ? 'text-right' : 'text-left');
    const textShadowStyle = (section.bgType === 'image' || section.bgImage) ? '2px 2px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 2px 0 0 #fff, -2px 0 0 #fff' : undefined;

    return (
        <SectionWrapper section={section} globalPadding={globalPadding}>
            <div className={clsx("max-w-4xl mx-auto", alignClass)}>
                <div className="inline-block relative">
                    <h2 className="font-black leading-tight tracking-tight mb-2" style={{ fontSize: `${fontSize.sectionTitle * 1.3}rem`, color: theme.text, textShadow: textShadowStyle }}>
                        {section.text || section.content || section.heading || section.title}
                    </h2>
                    {section.subText && <p className="text-xs md:text-sm opacity-40 font-black tracking-[0.2em] mb-4 uppercase" style={{ textShadow: textShadowStyle }}>{section.subText}</p>}
                    <div className={clsx("w-12 h-1", alignClass === 'text-center' ? 'mx-auto' : alignClass === 'text-right' ? 'ml-auto' : '')}
                        style={{ backgroundColor: accent }}></div>
                </div>
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

    // Check if it's a SANGO-style theme (Earth, Gentle, Modern)
    const isSangoLine = ['earth', 'gentle', 'standard', 'modern'].includes(design);

    const btnColor = section.color || theme.primary;
    const textColor = section.textColor || theme.contrast;

    const size = section.size || 'M';
    const sizeClass =
        size === 'S' ? 'px-8 py-2.5 text-xs' :
            size === 'M' ? 'px-12 py-4 text-sm' :
                size === 'L' ? 'px-16 py-5 text-lg' :
                    'px-20 py-6 text-2xl font-black'; // XL

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

                <a href={section.url || '#'} target="_blank" rel="noopener noreferrer"
                    className={clsx(
                        "group relative inline-flex items-center justify-center transition-all duration-300 overflow-hidden font-black tracking-widest uppercase",
                        sizeClass,
                        isSangoLine ?
                            "rounded-full shadow-[0_6px_0_rgba(0,0,0,0.1)] active:shadow-none active:translate-y-[6px]" :
                            "rounded-lg hover:shadow-2xl hover:-translate-y-1 active:translate-y-0"
                    )}
                    style={{
                        backgroundColor: btnColor,
                        color: textColor,
                        borderRadius: theme.radius
                    }}
                >
                    <span className="relative z-10 flex items-center gap-2">
                        {section.label || "CONTACT US"}
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </span>

                    {/* SWELL-style Sparkle (Kiratto) Effect */}
                    {!isSangoLine && (
                        <div className="absolute top-0 left-0 w-full h-full animate-shimmer pointer-events-none opacity-20">
                            <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12"></div>
                        </div>
                    )}
                </a>
            </div>
        </SectionWrapper>
    );
};
