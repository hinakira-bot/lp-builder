/* eslint-disable */
import React from 'react';
import { clsx } from 'clsx';
import { ShoppingCart, MessageCircle, ExternalLink, Check, Sparkles, Crown, Star, Medal, Award, X, ArrowRight } from 'lucide-react';
import { getImgUrl, getDesignTheme } from '../../../utils/helpers';
import { SectionWrapper } from './SectionWrapper';

export const ConversionPanel = ({ section, viewMode, accentColor: globalAccent }) => {
    const isMobile = viewMode === 'mobile';
    const design = section.design || 'standard';
    const theme = getDesignTheme(design);
    const accent = globalAccent || theme.primary;

    // --- Design Flags ---
    const isSango = ['gentle', 'standard', 'modern'].includes(design); // Pop & Round
    const isEarth = design === 'earth'; // Natural & Hand-drawn
    const isSwell = ['masculine', 'stylish'].includes(design); // Sharp & Cool
    const isLuxury = design === 'luxury'; // Elegant & Gold
    const isCyber = design === 'cyber'; // Future & Neon

    // Prepare buttons
    const buttons = (section.buttons && section.buttons.length > 0)
        ? section.buttons
        : [{ label: section.buttonLabel || "CONTACT US", url: section.url || "#", color: 'accent', icon: 'arrow' }];

    const getBtnColor = (colorName) => {
        const colors = {
            orange: '#f97316',
            red: '#ef4444',
            green: '#06c755',
            blue: '#3b82f6',
            black: '#1f2937',
            accent: accent
        };
        return colors[colorName] || colorName || accent;
    };

    const getBtnIcon = (iconName) => {
        if (iconName === 'cart') return <ShoppingCart size={20} />;
        if (iconName === 'line') return <MessageCircle size={20} />;
        if (iconName === 'link') return <ExternalLink size={20} />;
        return <ArrowRight size={20} className={clsx("transition-transform", isSango || isEarth ? "group-hover:translate-x-1" : "")} />;
    };

    return (
        <SectionWrapper section={section}>
            {/* Explicitly using isMobile for padding to avoid previewer issues */}
            <div className={clsx(isMobile ? "px-0 py-6" : "px-6 py-20")}>
                <div
                    className={clsx(
                        "mx-auto overflow-hidden relative isolate transition-all",
                        // 1. SANGO (Pop)
                        isSango && (isMobile
                            ? "rounded-[2rem] p-4 text-center shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border-white border-4 ring-1 ring-gray-100"
                            : "rounded-[3rem] p-16 text-center shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border-white border-4 ring-1 ring-gray-100"),
                        // 2. EARTH (Natural)
                        isEarth && (isMobile
                            ? "rounded-[1.5rem] p-4 text-center shadow-lg border-2 border-dashed border-[#8d6e63] bg-[#fffcf5]"
                            : "rounded-[2rem] p-16 text-center shadow-lg border-2 border-dashed border-[#8d6e63] bg-[#fffcf5]"),
                        // 3. SWELL (Cool)
                        isSwell && (isMobile
                            ? "rounded-sm p-4 text-center bg-white border border-gray-100 shadow-xl"
                            : "rounded-sm p-20 text-center bg-white border border-gray-100 shadow-xl"),
                        // 4. LUXURY (Elegant - Navy/Black/Gold)
                        isLuxury && (isMobile
                            ? "p-4 text-center bg-gradient-to-br from-[#020617] to-[#0f172a] text-white border border-[#ca8a04]/30 shadow-2xl relative"
                            : "p-20 text-center bg-gradient-to-br from-[#020617] to-[#0f172a] text-white border border-[#ca8a04]/30 shadow-2xl relative"),
                        // 5. CYBER (Tech)
                        isCyber && (isMobile
                            ? "p-6 text-center bg-[#0f172a] border border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                            : "p-20 text-center bg-[#0f172a] border-y border-cyan-500 shadow-[inset_0_0_100px_rgba(6,182,212,0.05)]")
                    )}
                    style={{
                        maxWidth: section.contentWidth || 896, ...(isSango ? {
                            backgroundColor: '#ffffff',
                            backgroundImage: `radial-gradient(${accent}15 2px, transparent 2px), radial-gradient(${accent}10 1px, transparent 1px)`,
                            backgroundSize: '32px 32px, 16px 16px',
                            backgroundPosition: '0 0, 16px 16px'
                        } : isCyber ? {
                            backgroundImage: `linear-gradient(rgba(6,182,212,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.1) 1px, transparent 1px)`,
                            backgroundSize: '40px 40px'
                        } : {})
                    }}>

                    {/* SWELL: Stylish background decorations */}
                    {isSwell && (
                        <>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-gray-50 to-transparent -z-10 rounded-bl-full opacity-50"></div>
                        </>
                    )}

                    {/* EARTH: Washi texture overlay */}
                    {isEarth && (
                        <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/cream-paper.png')` }}></div>
                    )}

                    {/* Luxury: Gold accents and particles */}
                    {isLuxury && (
                        <>
                            {/* Inner border for that premium feel */}
                            <div className="absolute inset-2 border border-[#ca8a04]/20 pointer-events-none" />
                            {/* Subtle gold glow */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-[#ca8a04] to-transparent opacity-50 shadow-[0_0_15px_#ca8a04]" />
                            {/* Background texture/particles */}
                            <div className="absolute inset-0 opacity-10 pointer-events-none"
                                style={{
                                    backgroundImage: 'radial-gradient(circle, #fcd34d 1px, transparent 1px)',
                                    backgroundSize: '32px 32px'
                                }}
                            />
                        </>
                    )}

                    {/* Cyber: Glitch lines */}
                    {isCyber && (
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent opacity-50"></div>
                    )}

                    <h3 className={clsx(
                        isMobile ? "text-xl font-black mb-3 leading-snug relative block" : "text-4xl font-black mb-8 leading-tight relative inline-block",
                        isSango && "text-gray-800",
                        isEarth && (isMobile ? "text-[#5d4037]" : "text-[#5d4037] tracking-widest"),
                        isSwell && (isMobile ? "text-gray-900 border-b-2 pb-2 inline-block" : "text-gray-900 border-b-2 pb-2"),
                        isLuxury && (isMobile
                            ? "text-transparent bg-clip-text bg-gradient-to-b from-[#fcd34d] to-[#ca8a04] font-serif font-normal"
                            : "text-transparent bg-clip-text bg-gradient-to-b from-[#fcd34d] to-[#ca8a04] font-serif tracking-widest font-normal"),
                        isCyber && "text-cyan-400 font-mono tracking-tighter"
                    )} style={{
                        ...(isSwell ? { borderColor: accent } : {}),
                        textShadow: section.bgType === 'image' ? '2px 2px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 2px 0 0 #fff, -2px 0 0 #fff' : undefined
                    }}>
                        {section.title || "Ready to get started?"}
                        {isSango && (
                            <span className="absolute -bottom-2 left-0 w-full h-3 opacity-30 -rotate-1 rounded-full" style={{ backgroundColor: accent }}></span>
                        )}
                        {isEarth && (
                            <svg className="absolute -bottom-3 left-0 w-full h-3 text-[#8d6e63] opacity-30" preserveAspectRatio="none" viewBox="0 0 100 10"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" /></svg>
                        )}
                    </h3>

                    <p className={clsx(
                        isMobile ? "mb-3 leading-relaxed mx-auto max-w-xl text-sm" : "mb-2 leading-loose mx-auto max-w-xl text-base",
                        isLuxury ? "text-gray-300 font-serif tracking-wide" : (isCyber ? "text-cyan-200/70 font-mono" : (isEarth ? "text-[#795548]" : "text-gray-600"))
                    )}>{section.content || section.text || "今すぐ無料体験にお申し込みいただき、ビジネスを加速させましょう。"}</p>

                    <div className={clsx("flex flex-wrap justify-center gap-3 md:gap-4", isMobile ? "flex-col w-full px-4" : "")}>
                        {buttons.map((btn, i) => {
                            const btnColor = getBtnColor(btn.color);
                            return (
                                <a key={i} href={btn.url || "#"} className={clsx(
                                    "inline-flex items-center justify-center gap-2 font-black tracking-widest transition-all duration-300 group relative whitespace-nowrap",
                                    !isMobile && "md:gap-3",
                                    isMobile ? "px-6 py-4 text-sm w-full" : "px-10 py-5 text-lg w-auto min-w-[280px]",
                                    // 1. SANGO
                                    isSango && "rounded-full text-white transform active:translate-y-1 active:shadow-none",
                                    // 2. EARTH
                                    isEarth && "rounded-[1rem] text-white border-2 border-white/20 hover:-rotate-1",
                                    // 3. SWELL
                                    isSwell && "rounded-sm text-white overflow-hidden hover:brightness-110 shadow-md hover:shadow-lg",
                                    // 4. LUXURY (Gold Gradient)
                                    isLuxury && "text-[#020617] bg-gradient-to-b from-[#fcd34d] to-[#d97706] hover:to-[#fcd34d] shadow-[0_0_20px_rgba(202,138,4,0.3)] hover:shadow-[0_0_30px_rgba(202,138,4,0.5)] border-none",
                                    // 5. CYBER
                                    isCyber && "bg-cyan-950/80 text-cyan-400 border border-cyan-400 hover:bg-cyan-400 hover:text-cyan-950 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] font-mono",

                                    (buttons.length > 1 && !isMobile) ? "min-w-[280px]" : "w-auto"
                                )} style={{
                                    boxShadow: isSango ? `0 6px 0 ${btnColor}cc, 0 12px 12px -2px rgba(0,0,0,0.15)` : (
                                        isEarth ? `3px 3px 0 rgba(93, 64, 55, 0.2)` : undefined
                                    ),
                                    backgroundColor: (isSango || isSwell || isEarth) ? btnColor : undefined,
                                }}>
                                    {isSwell && (
                                        <div className="absolute top-0 -left-full w-1/2 h-full bg-white/20 skew-x-[-20deg] group-hover:animate-[shine_0.75s_infinite]"></div>
                                    )}

                                    <span className="relative z-10 flex items-center gap-2">
                                        {getBtnIcon(btn.icon)}
                                        {btn.label || "CONTACT US"}
                                    </span>
                                </a>
                            );
                        })}
                    </div>
                    {section.microCopy && (
                        <p className={clsx("mt-6 text-xs font-bold opacity-50", isCyber && "text-cyan-600")}>{section.microCopy}</p>
                    )}
                </div>
            </div>
        </SectionWrapper >
    );
};

export const PointList = ({ section, viewMode, accentColor: globalAccent }) => {
    const isMobile = viewMode === 'mobile';
    const design = section.design || 'standard';
    const theme = getDesignTheme(design);

    const items = section.items || [];
    const contentWidth = section.contentWidth || 1000;
    const baseAccent = section.badgeColor || globalAccent || theme.primary;

    // --- Design Flags ---
    const isSango = ['gentle', 'standard', 'modern'].includes(design);
    const isEarth = design === 'earth';
    const isSwell = ['masculine', 'stylish'].includes(design);
    const isLuxury = design === 'luxury';
    const isCyber = design === 'cyber';

    return (
        <SectionWrapper section={section}>
            <div className={clsx("mx-auto", isMobile ? "px-4 py-10" : "px-6 py-16")} style={{ maxWidth: contentWidth }}>
                <div className={clsx(
                    "grid",
                    (isMobile || section.layout === 'vertical') ? "grid-cols-1" : "grid-cols-3"
                )} style={{ gap: `${section.itemSpacing || (isMobile ? 24 : 48)}px` }}>
                    {items.map((item, index) => {
                        const displayNumber = String(index + 1).padStart(2, '0');
                        const itemAccent = item.color || baseAccent;
                        const isVertical = section.layout === 'vertical';

                        return (
                            <div key={item.id || index} className={clsx(
                                "flex group transition-all duration-500 relative",
                                isVertical && !isMobile ? "flex-row items-center gap-12 text-left" : "flex-col",
                                !isVertical && isSango && "items-center text-center",
                                !isVertical && isSwell && "items-start text-left",
                                !isVertical && isEarth && "items-center text-center"
                            )}>
                                {/* IMAGE / ICON AREA */}
                                <div className={clsx(
                                    "relative transition-all duration-500 shrink-0",
                                    isVertical && !isMobile ? "w-1/3 mb-0" : "w-full mb-6",

                                    // 1. SANGO (Pop)
                                    isSango && "rounded-[2.5rem] overflow-visible group-hover:-translate-y-2",

                                    // 2. SWELL (Cool)
                                    isSwell && "rounded overflow-hidden shadow-sm group-hover:shadow-xl group-hover:-translate-y-1",

                                    // 3. EARTH (Natural)
                                    isEarth && "rounded-[3rem] overflow-visible border-2 border-dashed border-gray-200 p-2 group-hover:rotate-1",

                                    // 4. LUXURY
                                    isLuxury && "rounded-lg overflow-hidden border border-[#ca8a04]/20 shadow-lg group-hover:border-[#ca8a04]/60",

                                    // 5. CYBER
                                    isCyber && "rounded-xl overflow-hidden border border-cyan-500/30 bg-[#0f172a] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                                )}>
                                    {/* NUMBER BADGE */}
                                    <div className={clsx(
                                        "absolute z-30 pointer-events-none transition-transform duration-500",
                                        isSango && "top-0 left-0 -translate-x-2 -translate-y-2 group-hover:scale-110",
                                        isSwell && "bottom-0 right-0 translate-x-1/4 translate-y-1/4",
                                        isEarth && "top-0 right-0 translate-x-1/4 -translate-y-1/4",
                                        isLuxury && "top-4 left-4",
                                        isCyber && "top-0 left-0 bg-cyan-500/10 px-3 py-1 border-b border-r border-cyan-500/30"
                                    )}>
                                        {isSango && (
                                            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-sm shadow-[0_4px_0_rgba(0,0,0,0.1)] border-4 border-white" style={{ backgroundColor: itemAccent }}>
                                                {index + 1}
                                            </div>
                                        )}
                                        {isSwell && (
                                            <div className="text-[60px] font-black text-gray-900/5 leading-none tracking-tighter group-hover:text-gray-900/10">
                                                {displayNumber}
                                            </div>
                                        )}
                                        {isEarth && (
                                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold transform -rotate-12 shadow-sm" style={{ backgroundColor: '#8d6e63' }}>
                                                {index + 1}
                                            </div>
                                        )}
                                        {isLuxury && (
                                            <div className="text-[10px] font-bold tracking-[0.3em] text-white/90 bg-black/40 backdrop-blur-sm px-3 py-1 border border-white/20 uppercase">
                                                Point {index + 1}
                                            </div>
                                        )}
                                        {isCyber && <span className="text-[10px] font-mono text-cyan-400">P{displayNumber}</span>}
                                    </div>

                                    {/* ACTUAL IMAGE */}
                                    <div className={clsx(
                                        "relative aspect-[4/3] w-full bg-gray-50 flex items-center justify-center overflow-hidden",
                                        isSango && "rounded-[2.5rem] shadow-lg border-4 border-white",
                                        isEarth && "rounded-[2.5rem]"
                                    )}>
                                        {getImgUrl(item.image) ? (
                                            <img src={getImgUrl(item.image)} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        ) : (
                                            <div className="flex flex-col items-center gap-2 opacity-30 group-hover:opacity-50 transition-opacity">
                                                <Star size={32} />
                                                <span className="text-[10px] font-black tracking-widest uppercase">Feature</span>
                                            </div>
                                        )}

                                        {/* Luxury Overlay */}
                                        {isLuxury && <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />}
                                    </div>
                                </div>

                                {/* TEXT AREA */}
                                <div className={clsx("flex-1", isSango && "px-2")}>
                                    <h3 className={clsx(
                                        "font-bold mb-3 transition-colors",
                                        isSango && "text-xl",
                                        isSwell && "text-lg md:text-xl border-l-4 pl-4 uppercase tracking-wider",
                                        isEarth && "text-lg text-[#5d4037] font-serif",
                                        isLuxury && "text-xl font-serif text-gray-800 tracking-wide",
                                        isCyber && "text-lg font-mono text-cyan-400 uppercase"
                                    )} style={isSwell ? { borderLeftColor: itemAccent } : { color: isEarth ? undefined : theme.text }}>
                                        {item.title}
                                    </h3>
                                    <p className={clsx(
                                        "text-sm leading-relaxed",
                                        isSango && "text-gray-600",
                                        isSwell && "text-gray-500 font-medium",
                                        isEarth && "text-[#5d4037]/70 italic",
                                        isLuxury && "text-gray-600 font-serif leading-loose",
                                        isCyber && "text-cyan-100/60 font-mono"
                                    )}>
                                        {item.desc || item.content || item.text}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </SectionWrapper>
    );
};

export const ProblemChecklist = ({ section, viewMode, accentColor: globalAccent }) => {
    const isMobile = viewMode === 'mobile';
    const design = section.design || 'standard';
    const theme = getDesignTheme(design);
    const accent = globalAccent || theme.primary;

    // --- Design Flags ---
    const isSango = ['gentle', 'standard', 'modern'].includes(design);
    const isEarth = design === 'earth';
    const isSwell = ['masculine', 'stylish'].includes(design);
    const isLuxury = design === 'luxury';
    const isCyber = design === 'cyber';

    return (
        <SectionWrapper section={section} globalPadding={isMobile ? 0 : 24}>
            <div className={clsx("w-full py-0 mx-auto", isMobile ? "px-4" : "px-16")} style={{ maxWidth: isMobile ? 'none' : (section.contentWidth || 768) }}>
                {/* --- HEADER --- */}
                <div className="text-center mb-10">
                    <h2 className={clsx(
                        "font-black tracking-tighter leading-tight mx-auto",
                        isMobile ? "text-base" : "text-xl md:text-3xl",
                        isLuxury && "font-serif text-[#ca8a04]",
                        isCyber && "font-mono text-cyan-400 italic uppercase",
                        isEarth && "text-[#5d4037] font-serif",
                        !isLuxury && !isCyber && !isEarth && "text-gray-900"
                    )} style={{
                        textShadow: section.bgType === 'image' ? '2px 2px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 2px 0 0 #fff, -2px 0 0 #fff' : undefined
                    }}>
                        {section.title || "こんなお悩みありませんか？"}
                    </h2>
                </div>

                {/* --- ITEMS --- */}
                <div className={clsx(
                    "grid",
                    isSango && "md:gap-larger"
                )} style={{ gap: `${section.itemSpacing || (isMobile ? 4 : 16)}px` }}>
                    {(section.items || []).map((item, i) => (
                        <div key={i}
                            className={clsx(
                                "flex items-start gap-4 transition-all duration-300 relative group",

                                // 1. SANGO (Pop Bubble)
                                isSango && (isMobile ? "bg-white rounded-[1.2rem] py-2 px-2 shadow-md border border-gray-100" : "bg-white rounded-[2rem] p-4 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.1)] border border-gray-100 hover:shadow-xl hover:-translate-y-1"),

                                // 2. SWELL (Clean Card)
                                isSwell && (isMobile ? "bg-white py-2 px-2 shadow-sm border border-gray-100 flex items-center" : "bg-white p-4 shadow-sm border border-gray-100 flex items-center hover:shadow-md"),

                                // 3. EARTH (Natural Dashed)
                                isEarth && (isMobile ? "bg-[#fffcf5] py-2 px-2 rounded-[1.2rem] border-2 border-dashed border-[#8d6e63]/30" : "bg-[#fffcf5] p-4 rounded-[2rem] border-2 border-dashed border-[#8d6e63]/30 hover:border-[#8d6e63]/50"),

                                // 4. LUXURY (Elegant Dark)
                                isLuxury && (isMobile ? "bg-gradient-to-r from-[#0f172a] to-[#1e293b] py-2 px-2 border border-[#ca8a04]/20 text-white" : "bg-gradient-to-r from-[#0f172a] to-[#1e293b] p-4 border border-[#ca8a04]/20 text-white shadow-xl hover:border-[#ca8a04]/60"),

                                // 5. CYBER (Digital Error)
                                isCyber && (isMobile ? "bg-[#0f172a] py-2 px-2 border-l-4 border-cyan-500" : "bg-[#0f172a] p-4 border-l-4 border-cyan-500 shadow-[inset_0_0_20px_rgba(6,182,212,0.05)] hover:bg-[#16203a]")
                            )}
                        >
                            {/* Checkmark / Icon */}
                            <div className="flex-shrink-0 mt-0.5">
                                <div className={clsx(
                                    "flex items-center justify-center transition-transform group-hover:scale-110",
                                    isSango && (isMobile ? "w-6 h-6 text-white rounded-full shadow-sm" : "w-8 h-8 rounded-full shadow-md text-white"),
                                    isSwell && "w-6 h-6",
                                    isEarth && (isMobile ? "w-7 h-7 border-2 border-[#8d6e63]/30 rounded-full text-[#8d6e63]" : "w-10 h-10 border-2 border-[#8d6e63]/30 rounded-full text-[#8d6e63]"),
                                    isLuxury && "w-6 h-6 bg-[#ca8a04]/10 rounded border border-[#ca8a04]/30 text-[#ca8a04]",
                                    isCyber && "w-6 h-6 text-red-500"
                                )} style={isSango ? { backgroundColor: accent } : (isSwell ? { color: accent } : {})}>
                                    {isCyber ? <X size={isMobile ? 16 : 20} strokeWidth={4} /> : <Check size={isMobile ? 14 : (isSango ? 18 : (isSwell ? 20 : 24))} strokeWidth={4} />}
                                </div>
                            </div>

                            {/* Text */}
                            <div className="flex-1">
                                <p className={clsx(
                                    "font-bold leading-relaxed",
                                    isMobile ? "text-sm" : "text-base",
                                    isLuxury ? "font-serif text-gray-100 tracking-wide" : (isCyber ? "font-mono text-cyan-50 tracking-tighter" : (isEarth ? "text-[#5d4037]" : "text-gray-700"))
                                )}>
                                    {item.text || item.content || item.title}
                                </p>
                            </div>

                            {/* SWELL Decor */}
                            {isSwell && (
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-10 transition-opacity">
                                    <Check size={60} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* --- FOOTER (SOULTION) --- */}
                {section.footerText && (
                    <div className="mt-1 text-center relative pt-2">
                        {/* Decorative Line */}
                        <div className={clsx(
                            "absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full opacity-30",
                            isSango && "bg-yellow-400",
                            isLuxury && "bg-[#ca8a04]",
                            isCyber && "bg-cyan-500 shadow-[0_0_10px_#06b6d4]",
                            !isSango && !isLuxury && !isCyber && "bg-gray-200"
                        )} />

                        <p className={clsx(
                            "font-black tracking-tighter leading-tight inline-block",
                            isMobile ? "text-2xl" : "text-4xl",
                            isSango && "text-red-500",
                            isLuxury && "text-transparent bg-clip-text bg-gradient-to-b from-[#fcd34d] to-[#ca8a04] font-serif",
                            isCyber && "text-cyan-400 font-mono italic uppercase shadow-cyan-400/50",
                            isEarth && "text-[#5d4037] font-serif",
                            !isLuxury && !isCyber && !isEarth && !isSango && "text-gray-900"
                        )} style={{
                            textShadow: section.bgType === 'image' ? '2px 2px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 2px 0 0 #fff, -2px 0 0 #fff' : undefined
                        }}>
                            {section.footerText}
                        </p>

                        {isSango && (
                            <div className="mt-4 flex justify-center gap-1 opacity-40">
                                {[1, 2, 3].map(i => <Star key={i} size={20} fill="#facc15" stroke="none" className={i === 2 ? "scale-125" : ""} />)}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </SectionWrapper>
    );
};

export const SpeechBubbleRenderer = ({ section, viewMode, accentColor: globalAccent }) => {
    const isMobile = viewMode === 'mobile';
    const design = section.design || 'standard';
    const theme = getDesignTheme(design);
    const accent = section.accentColor || globalAccent || theme.primary;

    const items = section.items || [{
        name: section.characterName || "Character",
        text: section.text || "ここにメッセージを入力してください。",
        image: section.characterImage,
        position: section.align || 'left'
    }];

    // Design Flags
    const isSango = ['gentle', 'standard', 'modern'].includes(design);
    const isSwell = ['masculine', 'stylish'].includes(design);
    const isLuxury = design === 'luxury';
    const isCyber = design === 'cyber';
    const isEarth = design === 'earth';

    // Animation Class
    const animClass = section.animation === 'float' ? 'animate-float' :
        section.animation === 'pulse' ? 'animate-pulse-subtle' :
            section.animation === 'fadeIn' ? 'animate-fadeIn' : '';

    return (
        <SectionWrapper section={section}>
            <div className="px-3 md:px-6 py-8 md:py-16 mx-auto" style={{ maxWidth: section.contentWidth || 900 }}>
                <div className="flex flex-col gap-10 md:gap-16">
                    {items.map((item, i) => {
                        const isRight = item.position === 'right' || section.align === 'right' || (section.align === undefined && i % 2 !== 0);
                        const imgUrl = getImgUrl(item.image) || getImgUrl(section.characterImage);

                        // Bubble Background & Border
                        const showBorder = section.showBorder !== false;
                        const bubbleBg = section.bubbleColor || (isCyber ? '#020617' : (isEarth ? '#fffcf5' : '#ffffff'));

                        let bubbleClass = isMobile
                            ? "relative w-full p-4 transition-all duration-500 text-left "
                            : "relative flex-1 p-8 transition-all duration-500 text-left ";
                        let tailBaseClass = isMobile
                            ? "hidden "
                            : "absolute top-8 w-0 h-0 border-solid ";
                        let tailStyle = {};

                        if (isSwell) {
                            bubbleClass += "rounded-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] ";
                            if (showBorder) bubbleClass += "border border-gray-100 ";
                            tailBaseClass += isRight ? "border-l-[12px] border-y-[8px] border-y-transparent -right-3 " : "border-r-[12px] border-y-[8px] border-y-transparent -left-3 ";
                            tailStyle = { [isRight ? 'borderLeftColor' : 'borderRightColor']: bubbleBg };
                        } else if (isLuxury) {
                            bubbleClass += "rounded-lg shadow-2xl font-serif ";
                            if (showBorder) bubbleClass += "border border-[#ca8a04]/30 ";
                            tailBaseClass += isRight ? "border-l-[15px] border-y-[6px] border-y-transparent -right-3.5 " : "border-r-[15px] border-y-[6px] border-y-transparent -left-3.5 ";
                            tailStyle = { [isRight ? 'borderLeftColor' : 'borderRightColor']: bubbleBg };
                        } else if (isCyber) {
                            bubbleClass += "shadow-[0_0_20px_rgba(6,182,212,0.2)] font-mono ";
                            if (showBorder) bubbleClass += "border border-cyan-500/50 ";
                            tailBaseClass += isRight ? "border-l-[10px] border-y-[10px] border-y-transparent -right-2.5 " : "border-r-[10px] border-y-[10px] border-y-transparent -left-2.5 ";
                            tailStyle = { [isRight ? 'borderLeftColor' : 'borderRightColor']: showBorder ? 'rgba(6,182,212,0.5)' : bubbleBg };
                        } else if (isEarth) {
                            bubbleClass += "rounded-[2.5rem] shadow-sm ";
                            if (showBorder) bubbleClass += "border-2 border-dashed border-[#8d6e63]/30 ";
                            tailBaseClass += isRight ? "border-l-[15px] border-y-[10px] border-y-transparent -right-3.5 " : "border-r-[15px] border-y-[10px] border-y-transparent -left-3.5 ";
                            tailStyle = { [isRight ? 'borderLeftColor' : 'borderRightColor']: bubbleBg };
                        } else {
                            // Sango / Default
                            bubbleClass += "rounded-[2rem] shadow-[0_15px_40px_-12px_rgba(0,0,0,0.15)] ";
                            if (showBorder) bubbleClass += "border-4 border-white ";
                            tailBaseClass += isRight ? "border-l-[15px] border-y-[10px] border-y-transparent -right-3.5 " : "border-r-[15px] border-y-[10px] border-y-transparent -left-3.5 ";
                            tailStyle = { [isRight ? 'borderLeftColor' : 'borderRightColor']: bubbleBg };
                        }

                        // Avatar specific containers
                        let avatarContainer = null;
                        const avatarClass = "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110";

                        if (isLuxury) {
                            avatarContainer = (
                                <div className="w-16 h-16 md:w-28 md:h-28 relative flex items-center justify-center p-1.5 border-2 border-[#ca8a04]/40 rounded-full shadow-2xl bg-white group hover:border-[#ca8a04] transition-colors">
                                    <div className="absolute inset-[2px] border border-[#ca8a04]/20 rounded-full"></div>
                                    <div className="w-full h-full rounded-full overflow-hidden border border-[#ca8a04/10]">
                                        {imgUrl ? <img src={imgUrl} alt={item.name} className={avatarClass} /> : <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400">LUX</div>}
                                    </div>
                                </div>
                            );
                        } else if (isCyber) {
                            avatarContainer = (
                                <div className="w-16 h-16 md:w-28 md:h-28 relative group">
                                    <div className="absolute inset-0 bg-cyan-500/20 skew-x-[-12deg] skew-y-[3deg] scale-110 blur-[2px] group-hover:bg-cyan-500/40 transition-all"></div>
                                    <div className="w-full h-full relative bg-[#0f172a] border-2 border-cyan-500/60 skew-x-[-12deg] skew-y-[3deg] overflow-hidden">
                                        <div className="w-full h-full scale-[1.3] skew-x-[12deg] skew-y-[-3deg] absolute inset-0">
                                            {imgUrl ? <img src={imgUrl} alt={item.name} className={avatarClass} /> : <div className="w-full h-full flex items-center justify-center text-cyan-500/50">CYB</div>}
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-cyan-500 animate-pulse"></div>
                                </div>
                            );
                        } else if (isEarth) {
                            avatarContainer = (
                                <div className="w-16 h-16 md:w-28 md:h-28 relative group">
                                    <div className="absolute inset-0 bg-[#8d6e63]/5 transform rotate-6 rounded-[2rem] transition-transform group-hover:rotate-12"></div>
                                    <div className="w-full h-full relative bg-[#fffcf5] border-2 border-[#8d6e63]/20 rounded-[1.8rem] overflow-hidden p-1 shadow-sm">
                                        <div className="w-full h-full rounded-[1.6rem] overflow-hidden">
                                            {imgUrl ? <img src={imgUrl} alt={item.name} className={avatarClass} /> : <div className="w-full h-full flex items-center justify-center text-[#8d6e63]/40">BIO</div>}
                                        </div>
                                    </div>
                                </div>
                            );
                        } else {
                            // Sango / Swell
                            avatarContainer = (
                                <div className={clsx(
                                    "w-12 h-12 md:w-24 md:h-24 overflow-hidden relative group",
                                    isSwell ? "rounded-lg border border-gray-100 bg-white shadow-md" :
                                        "rounded-full border-4 border-white shadow-2xl bg-white"
                                )}>
                                    <div className="w-full h-full overflow-hidden rounded-inherit">
                                        {imgUrl ? (
                                            <img src={imgUrl} alt={item.name} className={avatarClass} />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400 font-bold bg-gray-50 capitalize">{design}</div>
                                        )}
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <div key={i} className={clsx(
                                "flex",
                                isMobile ? "flex-col gap-2" : "flex-row gap-10",
                                isMobile ? (isRight ? "items-end" : "items-start") : "items-start",
                                !isMobile && isRight ? "flex-row-reverse" : "",
                                animClass
                            )}>
                                {/* Character Area */}
                                <div className="flex flex-col items-center gap-2 md:gap-4 flex-shrink-0">
                                    {avatarContainer}
                                    <div className={clsx(
                                        "text-[10px] md:text-sm font-black tracking-tighter opacity-80",
                                        isLuxury && "font-serif text-[#ca8a04] italic",
                                        isCyber && "font-mono text-cyan-400 uppercase tracking-widest",
                                        isEarth && "text-[#5d4037] font-medium"
                                    )}>
                                        {item.name || section.characterName || "NAME"}
                                    </div>
                                </div>

                                {/* Bubble Area */}
                                <div className={clsx(
                                    bubbleClass,
                                    "transition-transform"
                                )} style={{
                                    backgroundColor: bubbleBg,
                                }}>
                                    <div className={tailBaseClass} style={tailStyle}></div>

                                    {isCyber && <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_10px_cyan]"></div>}
                                    {isLuxury && <div className="absolute inset-2 border border-[#ca8a04]/5 rounded pointer-events-none"></div>}

                                    <p className={clsx(
                                        "text-sm md:text-base leading-loose whitespace-pre-wrap relative z-10 text-left w-full",
                                        isLuxury ? "text-gray-800 md:leading-[1.9] tracking-wide" :
                                            isCyber ? "text-cyan-50 md:text-base leading-relaxed font-mono" :
                                                isEarth ? "text-[#5d4037] font-serif leading-[1.8]" : "text-gray-800"
                                    )} style={{ textAlign: 'left' }}>{item.text || item.content || section.text}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </SectionWrapper>
    );
};


export const PricingRenderer = ({ section, viewMode, accentColor: globalAccent }) => {
    const isMobile = viewMode === 'mobile';
    const design = section.design || 'standard';
    const theme = getDesignTheme(design);
    const baseAccent = section.accentColor || globalAccent || theme.accent || theme.primary;
    const items = section.plans || section.items || [];
    const hasManyItems = items.length >= 3;

    // --- Design Flags ---
    const isSango = ['gentle', 'standard', 'modern'].includes(design); // Pop & Round
    const isEarth = design === 'earth'; // Natural & Hand-drawn
    const isSwell = ['masculine', 'stylish'].includes(design); // Sharp & Cool
    const isLuxury = design === 'luxury'; // Elegant & Gold
    const isCyber = design === 'cyber'; // Future & Neon

    return (
        <SectionWrapper section={section}>
            <div className={clsx(isMobile ? "px-4 py-16" : "px-4 py-12 mx-auto")} style={{ maxWidth: section.contentWidth || 1100 }}>
                {section.title && (
                    <div className="text-center mb-12">
                        <h3 className={clsx(
                            "font-black mb-4",
                            isMobile ? "text-xl" : "text-3xl",
                            isSwell && "text-gray-800 font-bold",
                            isLuxury && "text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 font-serif",
                            isEarth && "text-[#5d4037] tracking-widest",
                            isCyber && "text-cyan-400 font-mono"
                        )}>{section.title}</h3>
                        <div className="w-12 h-1 mx-auto rounded-full" style={{ backgroundColor: baseAccent }}></div>
                    </div>
                )}

                <div className={clsx(
                    "grid gap-4 md:gap-6 items-stretch",
                    isMobile ? "grid-cols-1" : (section.layout === 'vertical' ? "grid-cols-1 max-w-2xl mx-auto" : (items.length === 2 ? "grid-cols-2 max-w-2xl mx-auto" : "grid-cols-3"))
                )}>
                    {items.map((plan, i) => {
                        const isRecommended = plan.recommended || plan.featured || plan.isFeatured;
                        // Each plan might override color
                        const planAccent = plan.color || baseAccent;

                        // Sanitize price and period to avoid duplicate symbols
                        const displayPrice = String(plan.price || '').replace(/[¥￥]/g, '').trim();
                        const displayPeriod = String(plan.period || '').replace(/[\/\／]/g, '').trim();

                        return (
                            <div key={i}
                                className={clsx(
                                    "flex flex-col relative transition-all duration-300 bg-white group",

                                    // 1. SANGO (Pop)
                                    isSango && clsx(
                                        "rounded-[2.5rem] border-4 border-white shadow-xl overflow-visible",
                                        isRecommended ? "ring-4 ring-sky-100 translate-y-[-8px] z-10" : "hover:shadow-2xl hover:-translate-y-2",
                                        !isRecommended && "mt-0 md:mt-4"
                                    ),

                                    // 2. EARTH (Natural)
                                    isEarth && clsx(
                                        "rounded-3xl overflow-hidden border-0",
                                        isRecommended ? "shadow-lg scale-105 z-10" : "shadow hover:shadow-md",
                                        !isRecommended && "mt-0 md:mt-4",
                                        // Varied earth tones based on index if no specific color is set
                                        i % 3 === 0 && "bg-[#edf7ed]", // Pale Green
                                        i % 3 === 1 && "bg-[#fff8e1]", // Pale Beige
                                        i % 3 === 2 && "bg-[#fce4ec]"  // Pale Pink
                                    ),

                                    // 3. SWELL (Cool)
                                    isSwell && clsx(
                                        "rounded border bg-white overflow-hidden",
                                        isRecommended ? "shadow-xl border-gray-300 scale-105 z-10 pt-2" : "shadow-sm border-gray-100 hover:shadow-lg",
                                        // SWELL: Add significant margin if recommended for pop effect
                                        isRecommended && "mt-0"
                                    ),

                                    // 4. LUXURY
                                    isLuxury && clsx(
                                        "rounded-lg border border-[#ca8a04]/30 bg-gradient-to-b from-[#0f172a] to-[#020617] text-white overflow-hidden",
                                        isRecommended ? "shadow-[0_0_30px_rgba(202,138,4,0.3)] scale-105 z-10" : "hover:border-[#ca8a04]/60"
                                    ),

                                    // 5. CYBER
                                    isCyber && clsx(
                                        "rounded-xl border border-cyan-500/30 bg-[#0f172a] text-cyan-50 overflow-hidden",
                                        isRecommended ? "shadow-[0_0_30px_rgba(6,182,212,0.2)] border-cyan-400 scale-105 z-10" : "hover:border-cyan-400/60"
                                    )
                                )}
                                style={isEarth ? {} : {
                                    borderColor: (isSwell && isRecommended) ? '#1e293b' : undefined,
                                }}
                            >
                                {/* --- RECOMMENDED BADGE (Floating Top Right) --- */}
                                {isRecommended && (
                                    <div className="absolute top-0 right-0 z-30 pointer-events-none">
                                        {/* SANGO: Puffy Badge - Shifted to the edge/corner */}
                                        {isSango && (
                                            <div className="mt-2 mr-2 px-4 py-1 rounded-full bg-yellow-400 text-slate-800 text-[10px] font-black tracking-widest shadow-lg transform rotate-12 border-2 border-white translate-x-1 -translate-y-1">
                                                RECOMMENDED
                                            </div>
                                        )}
                                        {/* SWELL: Stylish Label */}
                                        {isSwell && (
                                            <div className="bg-[#1e293b] text-white text-[9px] font-bold tracking-[0.2em] px-4 py-1.5 shadow-md flex items-center gap-1">
                                                <Star size={10} fill="currentColor" />
                                                RECOMMENDED
                                            </div>
                                        )}
                                        {/* EARTH: Simple Right Top */}
                                        {isEarth && (
                                            <div className="mt-2 mr-2 px-3 py-1 bg-[#8d6e63] text-white text-[9px] font-bold tracking-widest rounded shadow-sm">
                                                RECOMMENDED
                                            </div>
                                        )}
                                        {/* LUXURY: Gold line */}
                                        {isLuxury && (
                                            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent"></div>
                                        )}
                                    </div>
                                )}

                                {/* --- HEADER AREA --- */}
                                <div className={clsx(
                                    "text-center relative",
                                    isSango ? "p-8 rounded-t-[2.2rem]" : (hasManyItems ? "p-4" : "p-6"),
                                    isSwell && (isRecommended ? "pt-12 pb-6" : "py-8"),
                                    isEarth && "pt-10"
                                )} style={{
                                    backgroundColor: isSango ? `${planAccent}15` : undefined,
                                    color: isSango ? planAccent : undefined
                                }}>

                                    <h4 className={clsx(
                                        "font-bold mb-4 tracking-widest",
                                        hasManyItems ? "text-[10px]" : "text-xs",
                                        isSango ? "" : (isLuxury ? "text-amber-400" : "text-gray-500"),
                                        isSwell && "font-serif text-gray-800 uppercase tracking-[0.2em]",
                                        isEarth && "text-[#5d4037]"
                                    )}>
                                        {plan.name || plan.title}
                                    </h4>

                                    <div className={clsx("flex justify-center items-center gap-1 mb-2")}>
                                        <div className={clsx(
                                            "font-black tracking-tighter shrink-0 flex items-baseline gap-1",
                                            isMobile ? "text-2xl" : (hasManyItems ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl"),
                                            isSwell && clsx("font-serif text-gray-900 leading-none", hasManyItems ? "text-3xl md:text-4xl" : "text-4xl md:text-5xl"),
                                            isLuxury && "font-serif text-[#f59e0b]",
                                            isCyber && "font-mono text-cyan-400",
                                            isEarth && "text-[#5d4037]"
                                        )} style={{
                                            ...((!isSango && !isSwell && !isLuxury && !isCyber && !isEarth) ? { color: planAccent } : (isSango ? { color: '#1e293b' } : {})),
                                            fontSize: section.priceScale ? `${section.priceScale * 100}%` : undefined
                                        }}>
                                            <span className={clsx("font-black opacity-80", isSwell ? "text-3xl" : "text-xl md:text-2xl")}>¥</span>
                                            {displayPrice}
                                        </div>
                                        {displayPeriod && (
                                            <span className="text-xs opacity-40 font-bold self-end mb-1">
                                                / {displayPeriod}
                                            </span>
                                        )}
                                    </div>
                                    <p className={clsx(
                                        "text-[10px] opacity-60 leading-relaxed min-h-[1.5em] mt-2 px-2",
                                        isSwell && "text-gray-400",
                                        isEarth && "text-[#5d4037]/70",
                                        !isSango && !isSwell && !isEarth && "text-gray-400"
                                    )} style={{
                                        color: isSango ? `${planAccent}cc` : undefined
                                    }}>{plan.desc || plan.description}</p>
                                </div>

                                {/* --- CONTENT AREA --- */}
                                <div className={clsx(
                                    "p-6 pt-0 flex-1 flex flex-col",
                                    isSango && "bg-white pt-8 rounded-b-[2.2rem]",
                                    isSwell && "px-6 pb-8 pt-4",
                                    hasManyItems && "p-4"
                                )}>
                                    <ul className={clsx("space-y-3 mb-8 flex-1", (isSwell || isSango) ? "px-2" : "px-0")}>
                                        {(plan.features || []).map((feature, fIdx) => (
                                            <li key={fIdx} className="flex items-start gap-2 text-sm leading-snug">
                                                <div className={clsx(
                                                    "flex-shrink-0 flex items-center justify-center mt-1",
                                                    isSango ? "w-4 h-4 rounded-full bg-yellow-400 text-white shadow-sm" : "w-4 h-4",
                                                    isEarth && "text-[#5d4037]",
                                                    isSwell && "text-blue-900 bg-blue-50/50 rounded-full w-4 h-4",
                                                    isLuxury && "text-amber-500",
                                                    isCyber && "text-cyan-400"
                                                )} style={(isSango || isSwell || isEarth) ? {} : { backgroundColor: planAccent }}>
                                                    <Check size={isSango ? 8 : 10} strokeWidth={isSango ? 4 : 3} />
                                                </div>
                                                <span className={clsx(
                                                    "font-medium tracking-wide",
                                                    hasManyItems ? "text-xs pt-0.5" : "text-sm pt-0.5",
                                                    isLuxury ? "text-gray-300" : "text-gray-600",
                                                    isEarth && "text-[#5d4037]/80"
                                                )}>{typeof feature === 'string' ? feature : feature.text}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {plan.showButton !== false && (
                                        <div className="text-center">
                                            {/* 1. SANGO (Puffy) */}
                                            {isSango && (
                                                <div
                                                    className="rounded-full text-white shadow-[0_4px_0_rgba(0,0,0,0.15)] active:translate-y-1 active:shadow-none hover:opacity-90 transition-all w-full py-3"
                                                    style={{
                                                        backgroundColor: planAccent,
                                                        boxShadow: `0 4px 0 ${planAccent}99`
                                                    }}
                                                >
                                                    <span className="relative z-10 flex w-full justify-center items-center gap-2">
                                                        {plan.buttonLabel || plan.buttonText || "SELECT PLAN"}
                                                        <ArrowRight size={12} className="group-hover/btn:translate-x-1" />
                                                    </span>
                                                </div>
                                            )}

                                            {/* 2. EARTH (Natural) */}
                                            {isEarth && (
                                                <div className="rounded-[1rem] bg-[#8d6e63] text-white hover:opacity-90 shadow-md w-full py-3">
                                                    <span className="relative z-10 flex w-full justify-center items-center gap-2">
                                                        {plan.buttonLabel || plan.buttonText || "SELECT PLAN"}
                                                        <ArrowRight size={12} />
                                                    </span>
                                                </div>
                                            )}

                                            {/* 3. SWELL (Ghost vs Filled) */}
                                            {isSwell && (
                                                <div className={clsx(
                                                    "rounded border py-3 text-xs transition-all duration-500 w-full",
                                                    isRecommended
                                                        ? "bg-[#1e293b] border-[#1e293b] text-white hover:opacity-90"
                                                        : "bg-white border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white"
                                                )}>
                                                    <div className="absolute top-0 -left-full w-[200%] h-full bg-gradient-to-r from-transparent via-white/60 to-transparent -skew-x-12 group-hover/btn:animate-[shine_0.8s_infinite] pointer-events-none"></div>
                                                    <span className="relative z-10 flex w-full justify-center items-center gap-2">
                                                        {plan.buttonLabel || plan.buttonText || "SELECT PLAN"}
                                                        <ArrowRight size={12} className="group-hover/btn:translate-x-1" />
                                                    </span>
                                                </div>
                                            )}

                                            {/* Fallback for others if needed - keeping it as <a> for real links but UI mock here */}
                                            {!isSango && !isEarth && !isSwell && (
                                                <a href={plan.url || section.url || '#'} className={clsx(
                                                    "inline-block w-full py-3 px-4 font-bold transition-all relative overflow-hidden group/btn text-xs tracking-widest",
                                                    isLuxury && "border border-[#ca8a04] text-[#ca8a04] hover:bg-[#ca8a04] hover:text-black rounded",
                                                    isCyber && "border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black shadow-[0_0_15px_rgba(34,211,238,0.3)] rounded"
                                                )} style={(!isLuxury && !isCyber) ? { backgroundColor: planAccent } : {}}>
                                                    <span className="relative z-10 flex w-full justify-center items-center gap-2">
                                                        {plan.buttonLabel || plan.buttonText || "SELECT PLAN"}
                                                        <ArrowRight size={12} />
                                                    </span>
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </SectionWrapper>
    );
};

export const ProcessRenderer = ({ section, viewMode, fontSize, accentColor: globalAccent }) => {
    const isMobile = viewMode === 'mobile';
    const design = section.design || 'standard';
    const theme = getDesignTheme(design);
    const steps = section.steps || section.items || [];

    // --- Theme-specific default indicator colors ---
    const getThemeDefaultColor = () => {
        if (design === 'cyber') return '#06b6d4';
        if (design === 'luxury') return '#c5a059';
        if (design === 'earth') return '#7c8a71';
        if (design === 'masculine' || design === 'stylish') return '#1e293b';
        if (['gentle', 'standard', 'modern'].includes(design)) return '#3b82f6'; // SANGO Blue
        return theme.primary;
    };

    const accent = section.accentColor || globalAccent || getThemeDefaultColor();

    // --- Design Flags ---
    const isSango = ['gentle', 'standard', 'modern'].includes(design);
    const isEarth = design === 'earth';
    const isSwell = ['masculine', 'stylish'].includes(design);
    const isLuxury = design === 'luxury';
    const isCyber = design === 'cyber';

    const textScale = section.textScale || 1.0;
    const itemSpacing = section.itemSpacing || (isMobile ? 32 : 64);

    return (
        <SectionWrapper section={section}>
            <div className="px-6 py-10 md:py-16 mx-auto" style={{ maxWidth: section.contentWidth || 1000 }}>
                {section.title && (
                    <div className="text-center mb-10 md:mb-16">
                        <h3 className={clsx(
                            "font-black mb-4",
                            isMobile ? "text-2xl" : "text-4xl",
                            isLuxury && "font-serif text-transparent bg-clip-text bg-gradient-to-b from-[#fcd34d] to-[#ca8a04]",
                            isCyber && "font-mono text-cyan-400 tracking-tighter uppercase",
                            isSwell && "tracking-tighter",
                            isEarth && "font-serif text-[#5d4037]"
                        )}>{section.title}</h3>
                        <div className={clsx("w-12 h-1.5 mx-auto rounded-full")} style={{ backgroundColor: accent }}></div>
                    </div>
                )}

                <div className="flex flex-col" style={{ gap: `${itemSpacing}px` }}>
                    {steps.map((step, i) => (
                        <div key={i} className={clsx(
                            "flex items-center gap-6 md:gap-10 lg:gap-12",
                            isMobile ? "flex-col" : (i % 2 === 1 ? "flex-row-reverse" : "flex-row")
                        )}>
                            {/* Text Content */}
                            <div className="flex-1 w-full space-y-2 md:space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className={clsx(
                                        "w-10 h-10 md:w-14 md:h-14 flex-shrink-0 flex items-center justify-center text-white font-black",
                                        isSango || isEarth ? "rounded-full shadow-lg" : "rounded-lg",
                                        isSwell && "rounded-sm"
                                    )} style={{ backgroundColor: accent, fontSize: isMobile ? '1.25rem' : '1.5rem' }}>
                                        {i + 1}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className={clsx(
                                            "text-[10px] font-black tracking-widest uppercase opacity-40",
                                            isCyber && "font-mono text-cyan-500/60",
                                            isLuxury && "font-serif text-[#ca8a04]/60"
                                        )}>Step {String(i + 1).padStart(2, '0')}</span>
                                        <div className="h-0.5 w-8 rounded-full opacity-30" style={{ backgroundColor: accent }}></div>
                                    </div>
                                </div>

                                <h4 className={clsx(
                                    "font-black leading-tight",
                                    isLuxury && "font-serif",
                                    isCyber && "font-mono text-cyan-400",
                                    isEarth && "font-serif text-[#5d4037]"
                                )} style={{
                                    fontSize: `${(isMobile ? 1.5 : 2.25) * textScale}rem`,
                                    color: theme.text
                                }}>
                                    {step.title}
                                </h4>

                                <p className={clsx(
                                    "opacity-80 leading-loose",
                                    isLuxury && "font-serif",
                                    isCyber && "font-mono text-cyan-100/70",
                                    isEarth && "text-[#795548]"
                                )} style={{
                                    fontSize: `${(isMobile ? 0.875 : 1.125) * textScale}rem`,
                                    color: theme.text
                                }}>
                                    {step.content || step.desc || step.text}
                                </p>
                            </div>

                            {/* Image Content */}
                            <div className="flex-1 w-full relative group">
                                <div className={clsx(
                                    "overflow-hidden shadow-2xl transition-all duration-500 group-hover:scale-[1.02] bg-gray-50",
                                    isSango ? "rounded-[3rem]" : (isSwell ? "rounded-none" : "rounded-3xl"),
                                    isLuxury && "border border-[#ca8a04]/20",
                                    isCyber && "border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.1)]"
                                )}
                                    style={{
                                        aspectRatio: '16/10'
                                    }}>
                                    {getImgUrl(step.image) ? (
                                        <img src={getImgUrl(step.image)} alt={step.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400 font-black bg-gray-100/50">STEP IMAGE</div>
                                    )}

                                    {/* Glass Overlay for Luxury/Cyber */}
                                    {(isLuxury || isCyber) && (
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                                    )}
                                </div>

                                {/* Large Decorative Number in background */}
                                <div className={clsx(
                                    "absolute font-black opacity-[0.03] leading-none select-none pointer-events-none transition-all duration-700 group-hover:opacity-[0.07]",
                                    i % 2 === 0 ? "-left-12 -top-12" : "-right-12 -top-12",
                                    isCyber && "font-mono text-cyan-500",
                                    isSwell && "font-bold"
                                )} style={{ fontSize: isMobile ? '8rem' : '15rem', color: accent }}>
                                    {i + 1}
                                </div>

                                {/* SWELL / Luxury Corner Decoration */}
                                {isSwell && (
                                    <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 opacity-20 pointer-events-none" style={{ borderColor: accent }} />
                                )}
                                {isLuxury && (
                                    <div className="absolute -top-2 -left-2 w-12 h-12 border-t border-l border-[#ca8a04]/40 pointer-events-none" />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
};

export const StaffRenderer = ({ section, viewMode, accentColor: globalAccent }) => {
    const isMobile = viewMode === 'mobile';
    const design = section.design || 'standard';
    const theme = getDesignTheme(design);
    const members = section.members || section.items || [];
    const accent = globalAccent || theme.primary;

    // Design Flags
    const isSango = ['gentle', 'standard', 'modern'].includes(design);
    const isEarth = design === 'earth';
    const isSwell = ['masculine', 'stylish'].includes(design);
    const isLuxury = design === 'luxury';
    const isCyber = design === 'cyber';

    const cols = section.cols || 3;
    const colsMobile = section.colsMobile || 1;
    const imgSize = section.imgSize || 128;

    return (
        <SectionWrapper section={section}>
            <div className={clsx("mx-auto", isMobile ? "px-4 py-10" : "px-6 py-16")} style={{ maxWidth: section.contentWidth || 1000 }}>
                {section.title && (
                    <div className="text-center mb-12 md:mb-20">
                        <h3 className={clsx(
                            "font-black mb-6 leading-tight",
                            isMobile ? "text-2xl" : "text-4xl",
                            isLuxury && "font-serif text-transparent bg-clip-text bg-gradient-to-b from-[#fcd34d] to-[#ca8a04]",
                            isCyber && "font-mono text-cyan-400 tracking-widest uppercase drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]",
                            isSwell && "tracking-tighter text-[#0f172a]",
                            isEarth && "font-serif text-[#5d4037]"
                        )}>{section.title}</h3>
                        <div className={clsx("w-16 h-1 mx-auto rounded-full", isCyber && "shadow-[0_0_15px_cyan]")} style={{ backgroundColor: isCyber ? '#06b6d4' : accent }}></div>
                    </div>
                )}

                <div
                    className="grid gap-8 md:gap-12 transition-all"
                    style={{
                        gridTemplateColumns: `repeat(${isMobile ? colsMobile : cols}, minmax(0, 1fr))`
                    }}
                >
                    {members.map((member, i) => (
                        <div key={i} className={clsx(
                            "flex flex-col items-center text-center group relative transition-all duration-300",
                            // Theme Container Styles
                            isSango && "hover:-translate-y-2",
                            isSwell && "bg-white p-6 md:p-8 border border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-1 rounded-sm",
                            isLuxury && "pb-6 border-b border-[#ca8a04]/20 hover:border-[#ca8a04] transition-colors",
                            isCyber && "bg-black/50 p-6 border border-cyan-900/50 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:bg-cyan-950/30 clip-path-polygon relative overflow-hidden",
                            isEarth && "bg-[#fffcf5] p-6 rounded-[2rem] border-2 border-[#d7ccc8] hover:border-[#8d6e63]"
                        )}>
                            {/* Card Decoration for Cyber */}
                            {isCyber && (
                                <>
                                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500"></div>
                                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500"></div>
                                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500"></div>
                                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500"></div>
                                </>
                            )}

                            {/* Image Container */}
                            <div
                                className={clsx(
                                    "overflow-hidden mb-6 relative z-10 transition-all duration-500",
                                    isSango && "rounded-full shadow-lg border-4 border-white ring-4 ring-opacity-20 bg-white",
                                    isSwell && "rounded-none w-full aspect-square grayscale group-hover:grayscale-0 mb-8 object-top shadow-md",
                                    isLuxury && "rounded-full border border-[#ca8a04]/40 p-1 bg-gradient-to-br from-black to-gray-900 shadow-[0_4px_20px_rgba(0,0,0,0.4)]",
                                    isCyber && "rounded-none clip-path-hexagon border-2 border-cyan-500/30 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_cyan]",
                                    isEarth && "rounded-[30%_70%_70%_30%/30%_30%_70%_70%] border-4 border-[#fffcf5] shadow-md group-hover:border-[#efebe9] transition-all"
                                )}
                                style={{
                                    width: isSwell ? '100%' : imgSize,
                                    height: isSwell ? 'auto' : imgSize,
                                    ...(isSango ? { '--tw-ring-color': accent } : {})
                                }}
                            >
                                {getImgUrl(member.image) ? (
                                    <img
                                        src={getImgUrl(member.image)}
                                        alt={member.name}
                                        className={clsx(
                                            "w-full h-full object-cover transition-transform duration-700",
                                            !isSwell && "group-hover:scale-110",
                                            isLuxury && "rounded-full",
                                            isSwell && "h-64 md:h-72 object-center"
                                        )}
                                    />
                                ) : (
                                    <div className={clsx(
                                        "w-full h-full flex items-center justify-center text-[10px] font-bold",
                                        isCyber ? "bg-cyan-950 text-cyan-400" : "bg-gray-100 text-gray-400",
                                        isSwell && "h-64 bg-gray-50"
                                    )}>STAFF</div>
                                )}
                            </div>

                            {/* Name & Role */}
                            <h4 className={clsx(
                                "font-bold mb-2 leading-tight",
                                isMobile ? "text-lg" : "text-xl",
                                isLuxury && "font-serif text-[#fcd34d]",
                                isCyber && "font-mono text-cyan-300 tracking-wider",
                                isSwell && "tracking-widest text-gray-800 text-base",
                                isEarth && "font-serif text-[#5d4037] text-2xl"
                            )}>{member.name}</h4>

                            {member.role && (
                                <span className={clsx(
                                    "text-[10px] font-bold tracking-widest uppercase mb-4 inline-block",
                                    isSango && "py-1 px-3 rounded-full text-white shadow-sm",
                                    isSwell && "text-gray-400 mb-6",
                                    isLuxury && "text-[#ca8a04]",
                                    isCyber && "text-cyan-600 font-mono border border-cyan-900 px-2 py-0.5 bg-black",
                                    isEarth && "text-[#8d6e63] border-b border-[#8d6e63] pb-0.5"
                                )} style={{
                                    backgroundColor: isSango ? accent : undefined
                                }}>
                                    {member.role}
                                </span>
                            )}

                            {/* Description */}
                            <p className={clsx(
                                "text-sm leading-relaxed",
                                isSango && "text-gray-600",
                                isSwell && "text-gray-500 text-xs text-justify",
                                isLuxury && "text-gray-400 font-serif",
                                isCyber && "text-cyan-100/70 font-mono text-xs",
                                isEarth && "text-[#795548]"
                            )}>
                                {member.desc || member.bio}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
};

export const FAQRenderer = ({ section, viewMode, accentColor: globalAccent }) => {
    const isMobile = viewMode === 'mobile';
    const design = section.design || 'standard';
    const theme = getDesignTheme(design);
    const items = section.items || [];
    const accent = globalAccent || theme.primary;

    // Toggle State (Internal state for accordion)
    const [openIndex, setOpenIndex] = React.useState(null);
    const disableAccordion = section.disableAccordion === true;

    // Design Flags
    const isSango = ['gentle', 'standard', 'modern'].includes(design);
    const isSwell = ['masculine', 'stylish'].includes(design);
    const isLuxury = design === 'luxury';
    const isCyber = design === 'cyber';
    const isEarth = design === 'earth';

    const toggle = (i) => {
        if (disableAccordion) return;
        setOpenIndex(openIndex === i ? null : i);
    };

    return (
        <SectionWrapper section={section}>
            <div className={clsx("mx-auto", isMobile ? "px-4 py-10" : "px-6 py-16")} style={{ maxWidth: section.contentWidth || 800 }}>
                {section.title && (
                    <div className="text-center mb-12 md:mb-16">
                        <h3 className={clsx(
                            "font-black mb-6 leading-tight",
                            isMobile ? "text-2xl" : "text-3xl",
                            isLuxury && "font-serif text-transparent bg-clip-text bg-gradient-to-b from-[#fcd34d] to-[#ca8a04]",
                            isCyber && "font-mono text-cyan-400 tracking-widest uppercase drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]",
                            isSwell && "tracking-tighter text-[#0f172a]",
                            isEarth && "font-serif text-[#5d4037]"
                        )}>{section.title}</h3>
                        <div className={clsx("w-12 h-1 mx-auto rounded-full", isCyber && "shadow-[0_0_15px_cyan]")} style={{ backgroundColor: isCyber ? '#06b6d4' : accent }}></div>
                    </div>
                )}

                <div className={clsx("space-y-6", isCyber && "relative")}>
                    {/* Cyber Grid Background */}
                    {isCyber && (
                        <div className="absolute inset-0 z-0 pointer-events-none opacity-20"
                            style={{
                                backgroundImage: 'linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)',
                                backgroundSize: '20px 20px',
                                margin: '-20px'
                            }}>
                        </div>
                    )}

                    {items.map((item, i) => {
                        const isOpen = disableAccordion || openIndex === i;
                        return (
                            <div key={i} className={clsx(
                                "relative transition-all duration-300 z-10",
                                // Container Styles
                                isSango && "bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md",
                                isSwell && "bg-white border border-[#1e293b]/20 rounded-sm hover:shadow-md hover:border-[#1e293b]/40",
                                isLuxury && "bg-[#0f172a] border border-[#ca8a04]/30 rounded-lg overflow-hidden",
                                isCyber && "bg-black/80 border border-cyan-900/50 hover:border-cyan-400/50 transition-colors backdrop-blur-sm",
                                isEarth && "bg-[#fffcf5] border-2 border-[#d7ccc8] rounded-[1.5rem]"
                            )}>
                                {/* Question Part */}
                                <div
                                    onClick={() => toggle(i)}
                                    className={clsx(
                                        "flex items-start gap-4 p-5 cursor-pointer relative select-none",
                                        isSwell && "px-6 py-4 border-l-4 border-transparent hover:border-[#1e293b] transition-colors",
                                        (isSango || isEarth) && "items-center"
                                    )}
                                >
                                    {/* Q Icon */}
                                    <div className={clsx(
                                        "flex-shrink-0 flex items-center justify-center font-black",
                                        isSango && "w-10 h-10 rounded-full text-white shadow-md text-lg",
                                        isSwell && "text-xl font-serif italic text-blue-900",
                                        isLuxury && "text-2xl font-serif text-[#fcd34d]",
                                        isCyber && "w-8 h-8 rounded border border-cyan-400 text-cyan-400 text-sm shadow-[0_0_10px_rgba(34,211,238,0.5)]",
                                        isEarth && "w-10 h-10 rounded-full bg-[#8d6e63] text-white"
                                    )} style={{
                                        backgroundColor: isSango ? accent : (isCyber || isLuxury || isSwell || isEarth ? undefined : accent)
                                    }}>
                                        Q{isSwell && "."}
                                    </div>

                                    <h4 className={clsx(
                                        "flex-1 font-bold leading-relaxed",
                                        isMobile ? "text-sm" : "text-base",
                                        isLuxury && "font-serif text-gray-200",
                                        isCyber && "font-mono text-cyan-100",
                                        isSwell && "text-[#334155]",
                                        isEarth && "text-[#5d4037]"
                                    )}>
                                        {item.q || item.question}
                                    </h4>

                                    {/* Toggle Icon (Only if Accordion ON) */}
                                    {!disableAccordion && (
                                        <div className={clsx(
                                            "flex-shrink-0 transition-transform duration-300",
                                            isOpen && "rotate-180",
                                            isSango && "text-gray-400",
                                            isLuxury && "text-[#ca8a04]",
                                            isCyber && "text-cyan-400"
                                        )}>
                                            {isSwell ? (
                                                <div className="relative w-4 h-4">
                                                    <div className="absolute top-1/2 left-0 w-4 h-0.5 bg-gray-400 -translate-y-1/2"></div>
                                                    <div className={clsx("absolute top-0 left-1/2 w-0.5 h-4 bg-gray-400 -translate-x-1/2 transition-all", isOpen && "h-0 opacity-0")}></div>
                                                </div>
                                            ) : (
                                                <div className={clsx("w-6 h-6 flex items-center justify-center", isEarth && "bg-[#d7ccc8] rounded-full text-white w-5 h-5")}>
                                                    {/* Use simple CSS arrow or Icon */}
                                                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M1 1L6 6L11 1"></path>
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Answer Part */}
                                <div
                                    className={clsx(
                                        "overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out",
                                        isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                                    )}
                                >
                                    <div className={clsx(
                                        "p-5 pt-0 flex items-start gap-4",
                                        isSwell && "px-6 pb-6",
                                        isLuxury && "bg-[#0f172a] p-6 pt-2 border-t border-[#ca8a04]/10",
                                        isCyber && "bg-cyan-950/20 p-5 border-t border-cyan-900/30",
                                        isEarth && "pt-2"
                                    )}>
                                        {/* A Icon */}
                                        <div className={clsx(
                                            "flex-shrink-0 flex items-center justify-center font-black",
                                            isSango && "w-10 h-10 rounded-full bg-gray-100 text-gray-500 text-lg",
                                            isSwell && "text-xl font-serif italic text-red-400",
                                            isLuxury && "text-2xl font-serif text-gray-600",
                                            isCyber && "w-8 h-8 text-cyan-700 text-sm",
                                            isEarth && "w-10 h-10 rounded-full border-2 border-[#d7ccc8] text-[#8d6e63]"
                                        )}>
                                            A{isSwell && "."}
                                        </div>

                                        <div className={clsx(
                                            "flex-1 text-sm leading-loose whitespace-pre-wrap",
                                            isSango && "text-gray-600",
                                            isSwell && "text-gray-500",
                                            isLuxury && "font-serif text-gray-400",
                                            isCyber && "font-mono text-cyan-200/70",
                                            isEarth && "text-[#795548]"
                                        )}>
                                            {item.a || item.answer}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </SectionWrapper>
    );
};

export const ComparisonRenderer = ({ section, viewMode, accentColor: globalAccent }) => {
    const isMobile = viewMode === 'mobile';
    const design = section.design || 'standard';
    const theme = getDesignTheme(design);

    // --- Design Flags ---
    const isSango = ['gentle', 'standard', 'modern'].includes(design);
    const isEarth = design === 'earth';
    const isSwell = ['masculine', 'stylish'].includes(design);
    const isLuxury = design === 'luxury';
    const isCyber = design === 'cyber';

    const accent = globalAccent || theme.primary;

    // Size Controls
    const cellPadding = section.cellPadding || 16;
    const minWidth = section.minWidth || (isMobile ? 80 : 120);

    const headers = section.headers || ["項目", "自社サービス", "他社サービス"];
    const rows = section.rows || section.items || [];

    const getSymbolIcon = (val) => {
        const value = String(val).trim();

        // 1. Double Circle (◎) - Best
        if (['◎', 'excellent'].includes(value)) {
            return (
                <div className="flex items-center justify-center relative">
                    {/* Outer Ring */}
                    <div className={clsx(
                        "rounded-full flex items-center justify-center border-2 md:border-4",
                        isCyber ? "border-pink-500 shadow-[0_0_10px_#ec4899]" : "border-rose-500"
                    )} style={{
                        width: isMobile ? 24 : 32,
                        height: isMobile ? 24 : 32,
                        borderColor: !isCyber ? (isLuxury ? '#d97706' : '#ef4444') : undefined
                    }}>
                        {/* Inner Dot */}
                        <div className={clsx(
                            "rounded-full",
                            isCyber ? "bg-pink-500 shadow-[0_0_5px_#ec4899]" : "bg-rose-500"
                        )} style={{
                            width: isMobile ? 12 : 16,
                            height: isMobile ? 12 : 16,
                            backgroundColor: !isCyber ? (isLuxury ? '#d97706' : '#ef4444') : undefined
                        }}></div>
                    </div>
                </div>
            );
        }

        // 2. Circle (◯) - Good
        if (['◯', 'o', 'ok', 'true'].includes(value)) {
            return (
                <div className="flex items-center justify-center">
                    <div className={clsx(
                        "rounded-full border-2 md:border-4",
                        isCyber ? "border-cyan-400 shadow-[0_0_8px_cyan]" : ""
                    )} style={{
                        width: isMobile ? 24 : 32,
                        height: isMobile ? 24 : 32,
                        borderColor: isCyber ? undefined : '#3b82f6'
                    }}></div>
                </div>
            );
        }

        // 3. Triangle (△) - Fair
        if (value === '△') {
            return (
                <div className="flex items-center justify-center pb-1">
                    <svg width={isMobile ? "20" : "26"} height={isMobile ? "20" : "26"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                        className={clsx(isCyber ? "text-yellow-400 drop-shadow-[0_0_5px_yellow]" : "text-yellow-500")}>
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    </svg>
                </div>
            );
        }

        // 4. Cross (×) - Poor/None
        if (['×', 'x', 'false'].includes(value)) {
            return <X size={isMobile ? 20 : 28} strokeWidth={3} className={clsx(isCyber ? "text-gray-700" : "text-gray-300")} />;
        }

        // Text Fallback
        return <span className={clsx("font-bold leading-tight", isMobile ? "text-[10px]" : "text-sm")} style={{ color: isCyber ? '#22d3ee' : theme.text }}>{val}</span>;
    };

    return (
        <SectionWrapper section={section}>
            <div className={clsx("mx-auto", isMobile ? "px-0" : "px-6 py-10 md:py-16")} style={{ maxWidth: section.contentWidth || 1000 }}>
                {section.title && (
                    <div className="text-center mb-8 md:mb-16 mt-8 md:mt-0 px-4">
                        <h3 className={clsx(
                            "font-black mb-4",
                            isMobile ? "text-xl" : "text-3xl",
                            isLuxury && "font-serif text-transparent bg-clip-text bg-gradient-to-b from-[#fcd34d] to-[#ca8a04]",
                            isCyber && "font-mono text-cyan-400 tracking-widest uppercase drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]",
                            isSwell && "tracking-tighter text-[#0f172a]",
                            isEarth && "font-serif text-[#5d4037]"
                        )}>{section.title}</h3>
                        <div className={clsx("w-12 h-1.5 mx-auto rounded-full", isCyber && "shadow-[0_0_15px_cyan]")} style={{ backgroundColor: isCyber ? '#06b6d4' : accent }}></div>
                    </div>
                )}

                {/* Table Layout */}
                <div className={clsx(
                    "w-full relative overflow-hidden",
                    isMobile ? "" : "rounded-xl",
                    isSango && !isMobile && "shadow-2xl bg-white p-6",
                    isSwell && !isMobile && "border border-gray-200 shadow-xl bg-white",
                    isLuxury && "bg-[#0f172a] border border-[#ca8a04]/30 p-1 md:p-4",
                    isCyber && "bg-black p-1 shadow-[0_0_50px_rgba(6,182,212,0.3)] border border-cyan-500/50 relative overflow-hidden",
                    isEarth && !isMobile && "bg-[#fffcf5] border-2 border-[#8d6e63] rounded-[2rem] p-4"
                )}>
                    {/* Cyber Grid Background Effect */}
                    {isCyber && (
                        <div className="absolute inset-0 z-0 pointer-events-none opacity-20"
                            style={{
                                backgroundImage: 'linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)',
                                backgroundSize: '20px 20px'
                            }}>
                        </div>
                    )}

                    <div className="overflow-x-auto relative z-10">
                        <table className={clsx(
                            "w-full border-separate border-spacing-0",
                            isSwell && "border-collapse"
                        )}>
                            <thead>
                                <tr>
                                    {headers.map((h, i) => (
                                        <th key={i} className={clsx(
                                            "text-center font-bold sticky top-0 z-20 transition-all border-b border-r last:border-r-0",
                                            // SWELL Specific Header Style
                                            isSwell ? (
                                                i === 0 ? "bg-[#f1f5f9] text-gray-700 border-gray-300" :
                                                    i === 1 ? "bg-[#1e293b] text-white border-[#1e293b]" : "bg-white text-gray-600 border-gray-200"
                                            ) : (
                                                // Other themes default
                                                "bg-transparent border-gray-100"
                                            ),

                                            // 1st Column Sticky Logic
                                            i === 0 ? (isMobile ? "sticky left-0 z-30" : "") : "",

                                            // Mobile text adj
                                            isMobile ? "text-[10px]" : "text-base",

                                            // Earth Style
                                            isEarth && "border-gray-300 bg-[#fffcf5]",

                                            // Cyber Borders
                                            isCyber && "border-cyan-500/30 text-cyan-400"
                                        )} style={{
                                            paddingTop: cellPadding,
                                            paddingBottom: cellPadding,
                                            paddingLeft: isMobile ? 8 : 16,
                                            paddingRight: isMobile ? 8 : 16,
                                            minWidth: i === 0 ? (isMobile ? 80 : 180) : minWidth,
                                            ...(isEarth ? { borderColor: '#d7ccc8' } : {}),
                                            // Manual bg for sticky column (Mobile)
                                            ...(isMobile && i === 0 ? { backgroundColor: isSwell ? '#f1f5f9' : (isLuxury ? '#0f172a' : (isCyber ? 'black' : (isEarth ? '#fffcf5' : '#fff'))) } : {}),
                                            // Cyber Sticky Glow offset
                                            ...(isCyber && i === 0 ? { boxShadow: '2px 0 10px rgba(6,182,212,0.1)' } : {})
                                        }}>
                                            {/* SWELL: Simple Text */}
                                            {isSwell && <span>{h}</span>}

                                            {/* SANGO / Standard Decor */}
                                            {isSango && (
                                                <div className={clsx(
                                                    "inline-block px-3 py-1 rounded-full",
                                                    i === 1 ? "text-white shadow-md font-bold" : "text-gray-500"
                                                )} style={i === 1 ? { backgroundColor: accent } : {}}>
                                                    {i === 1 && <Sparkles className="inline-block mr-1 w-3 h-3 mb-0.5" />}
                                                    {h}
                                                </div>
                                            )}

                                            {/* Luxury Decor */}
                                            {isLuxury && (
                                                <span className={clsx(
                                                    i === 1 ? "text-transparent bg-clip-text bg-gradient-to-b from-[#fcd34d] to-[#ca8a04]" : "text-gray-400"
                                                )}>{h}</span>
                                            )}

                                            {/* Cyber Decor */}
                                            {isCyber && (
                                                <div className={clsx("relative inline-block", i === 1 && "px-4 py-1 border border-cyan-400 bg-cyan-900/30 skew-x-[-10deg] shadow-[0_0_10px_cyan]")}>
                                                    <span className={clsx(
                                                        "block skew-x-[10deg]",
                                                        i === 1 ? "text-cyan-100 drop-shadow-[0_0_5px_white]" : "text-cyan-600"
                                                    )}>{h}</span>
                                                </div>
                                            )}

                                            {/* Earth Decor */}
                                            {isEarth && (
                                                <span className={clsx(i === 1 ? "text-[#5d4037] border-b-2 border-[#8d6e63]" : "text-[#8d6e63]")}>{h}</span>
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, rIdx) => (
                                    <tr key={rIdx} className={clsx("group transition-colors", isCyber ? "hover:bg-cyan-900/10" : "hover:bg-black/5")}>
                                        {row.map((cell, cIdx) => (
                                            <td key={cIdx} className={clsx(
                                                "align-middle text-center border-b border-r last:border-r-0 transition-all",

                                                // SWELL Body Style
                                                isSwell ? (
                                                    cIdx === 0 ? "bg-white font-bold text-gray-700 border-gray-300" :
                                                        cIdx === 1 ? "bg-[#f8fafc] font-bold border-[#1e293b] border-x-2" : "bg-white text-gray-500 border-gray-200"
                                                ) : (isCyber ? "border-cyan-900/30" : "border-gray-200"),

                                                // 1st Column Sticky Logic
                                                cIdx === 0 ? (isMobile ? "sticky left-0 z-20" : "font-bold text-gray-700") : "",

                                                isMobile && cIdx === 0 && (isCyber ? "bg-black text-cyan-300" : "text-[10px] bg-white"),
                                                !isMobile && "md:text-sm",

                                                // Us Column (Cyber)
                                                isCyber && cIdx === 1 && "bg-cyan-900/5 relative",

                                                // Earth Style
                                                isEarth && "border-[#d7ccc8] text-[#5d4037]"
                                            )} style={{
                                                paddingTop: cellPadding,
                                                paddingBottom: cellPadding,
                                                paddingLeft: isMobile ? 8 : 16,
                                                paddingRight: isMobile ? 8 : 16,
                                                // Manual bg for sticky column
                                                ...(isMobile && cIdx === 0 ? { backgroundColor: isSwell ? '#fff' : (isLuxury ? '#1e293b' : (isCyber ? 'black' : (isEarth ? '#fffcf5' : '#fff'))) } : {}),
                                                ...(isCyber && isMobile && cIdx === 0 ? { boxShadow: '2px 0 10px rgba(6,182,212,0.1)' } : {}),
                                                ...(isSwell && rIdx === rows.length - 1 && cIdx === 1 ? { borderBottomColor: '#1e293b', borderBottomWidth: 2 } : {})
                                            }}>
                                                {/* Cyber Column Highlight Glow */}
                                                {isCyber && cIdx === 1 && (
                                                    <div className="absolute inset-0 border-x border-cyan-500/20 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none"></div>
                                                )}

                                                <div className="flex items-center justify-center h-full relative z-10">
                                                    {cIdx === 0 ? (
                                                        <span className={clsx(
                                                            isLuxury && "font-serif text-gray-300",
                                                            isCyber && "font-mono text-cyan-400 drop-shadow-[0_0_2px_cyan]",
                                                            isSwell && "text-[#334155]",
                                                            isEarth && "font-serif"
                                                        )}>{cell}</span>
                                                    ) : (
                                                        getSymbolIcon(cell)
                                                    )}
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {isMobile && (
                    <p className={clsx("text-center mt-3 text-[9px] animate-pulse", isCyber ? "text-cyan-500" : "text-gray-400")}>
                        <ArrowRight className="inline w-3 h-3 mr-1" /> 横にスクロールして比較
                    </p>
                )}
            </div>
        </SectionWrapper>
    );
};

export const AccessRenderer = ({ section, viewMode, accentColor: globalAccent }) => {
    const isMobile = viewMode === 'mobile';
    const design = section.design || 'standard';
    const theme = getDesignTheme(design);
    const address = section.address || section.location || "住所が設定されていません";
    const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    const accent = globalAccent || theme.primary;

    // --- Design Flags ---
    const isSango = ['gentle', 'standard', 'modern'].includes(design);
    const isEarth = design === 'earth';
    const isSwell = ['masculine', 'stylish'].includes(design);
    const isLuxury = design === 'luxury';
    const isCyber = design === 'cyber';

    return (
        <SectionWrapper section={section}>
            <div className={clsx(
                "w-full max-w-4xl mx-auto flex flex-col items-center justify-center",
                (isMobile) ? "gap-6 py-8 px-4" : "gap-12 py-16 px-6 md:px-12"
            )}>
                {/* Title Container - Moved to TOP CENTER */}
                <div className={clsx("w-full text-center mb-4")}>
                    {isCyber && <span className="text-cyan-600 font-mono text-[10px] tracking-widest mb-1 block uppercase">LOCATION DATA</span>}
                    {isLuxury && <span className="text-[#ca8a04] font-serif text-[10px] tracking-[0.2em] mb-1 block uppercase text-center w-full">Access Information</span>}

                    <h3 className={clsx(
                        "font-black mb-2 leading-tight mx-auto",
                        isMobile ? "text-xl" : "text-2xl md:text-3xl",
                        isLuxury && "font-serif text-[#ca8a04]",
                        isCyber && "font-mono text-[#0891b2]",
                        isEarth && "font-serif text-[#5d4037]",
                        isSwell && "text-gray-800 tracking-tighter"
                    )}>{section.title || "ACCESS"}</h3>

                    <div className={clsx(
                        "h-1 rounded-full mx-auto",
                        isSango ? "w-12" : "w-10",
                    )} style={{ backgroundColor: isCyber ? '#0891b2' : (isLuxury ? '#ca8a04' : accent) }}></div>
                </div>

                {/* Content Container (Map + Info) */}
                <div className={clsx(
                    "w-full flex items-center justify-center",
                    isMobile ? "flex-col gap-8" : "flex-row gap-16"
                )}>
                    {/* Map Container */}
                    <div className={clsx(
                        "relative overflow-hidden transition-all duration-300",
                        isMobile ? "aspect-square w-full" : ((isSango || isEarth) ? "aspect-square w-[320px] shrink-0" : "w-full min-h-[350px] md:w-1/2"),
                        // Design Styles
                        isSango && "rounded-[3rem] shadow-2xl border-8 border-white ring-1 ring-gray-100",
                        isEarth && "rounded-[2rem] border-2 border-dashed border-[#8d6e63] bg-[#fffcf5] p-2",
                        isSwell && "rounded-sm border border-gray-200 shadow-lg bg-white p-1",
                        isLuxury && "rounded-lg border border-[#ca8a04]/30 shadow-[0_0_30px_rgba(0,0,0,0.5)]",
                        isCyber && "rounded-xl border border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.2)] bg-[#0f172a] p-1"
                    )}>
                        <div className={clsx(
                            "w-full h-full relative overflow-hidden",
                            isSango && "rounded-[2.5rem]",
                            isEarth && "rounded-[1.6rem]",
                            isSwell && "rounded-none",
                            isLuxury && "rounded",
                            isCyber && "rounded-lg opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all"
                        )}>
                            <iframe src={mapUrl} width="100%" height="100%" frameBorder="0" className="absolute inset-0 w-full h-full" loading="lazy" style={{ filter: isLuxury ? 'grayscale(100%) contrast(1.2)' : 'none' }}></iframe>
                        </div>
                    </div>

                    {/* Info Container */}
                    <div className={clsx("w-full flex flex-col justify-center", !isMobile && (isSango || isEarth ? "max-w-md" : "md:w-1/2"))}>
                        <div className={clsx(
                            "grid",
                            (isSango || isEarth) ? "gap-4" : "grid-cols-1 border-t border-l border-gray-100 rounded-lg overflow-hidden shadow-sm"
                        )}>
                            {[
                                { label: "Address", text: address, icon: Medal },
                                section.access ? { label: "Access", text: section.access, icon: ArrowRight } : null,
                                section.hours ? { label: "Working Hours", text: section.hours, icon: Sparkles } : null,
                                section.tel ? { label: "Phone", text: section.tel, icon: MessageCircle } : null,
                            ].filter(Boolean).map((item, i) => (
                                <div key={i} className={clsx(
                                    "transition-all group flex flex-col",
                                    (isSango || isEarth) ? "gap-4" : "gap-1 border-r border-b border-gray-100 p-4 bg-white/50 hover:bg-white",
                                    isCyber && "border-cyan-500/20 bg-cyan-500/5",
                                    isLuxury && "border-[#ca8a04]/20 bg-[#ca8a04]/5"
                                )}>
                                    <div className={clsx("flex items-center gap-3", !(isSango || isEarth) && "sr-only")}>
                                        {(isSango || isEarth) && (
                                            <div className={clsx(
                                                "w-7 h-7 flex items-center justify-center transition-transform group-hover:scale-110",
                                                isSango && "rounded-full bg-white shadow-sm text-gray-400 border border-gray-100",
                                                isEarth && "rounded-full border border-[#8d6e63]/30 text-[#8d6e63] bg-[#fffcf5]"
                                            )}>
                                                <item.icon size={14} />
                                            </div>
                                        )}
                                        <p className={clsx(
                                            "text-[10px] font-black uppercase tracking-[0.15em]",
                                            isSango && "text-gray-400",
                                            isEarth && "text-[#8d6e63]"
                                        )}>{item.label}</p>
                                    </div>

                                    <div className="space-y-0">
                                        {!(isSango || isEarth) && (
                                            <p className={clsx(
                                                "text-[10px] font-black uppercase tracking-[0.15em] mb-1",
                                                isLuxury ? "text-[#b45309] font-serif" : (isCyber ? "text-[#0891b2] font-mono" : "text-gray-400")
                                            )}>{item.label}</p>
                                        )}
                                        <p className={clsx(
                                            "font-bold leading-relaxed text-sm md:text-base text-gray-900",
                                            isLuxury ? "text-[#1e293b] font-serif tracking-wide" : (isCyber ? "text-[#0f172a] font-mono" : (isEarth ? "text-[#5d4037]" : "text-gray-900"))
                                        )}>{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};

export const ReviewRenderer = ({ section, viewMode, accentColor: globalAccent }) => {
    const isMobile = viewMode === 'mobile';
    const design = section.design || 'standard';
    const theme = getDesignTheme(design);
    const items = section.items || section.reviews || [];
    const accent = globalAccent || theme.primary;
    const imagePos = section.imagePos || 'top'; // top, bottom, left

    // Design Flags
    const isSango = ['gentle', 'standard', 'modern'].includes(design);
    const isSwell = ['masculine', 'stylish'].includes(design);
    const isLuxury = design === 'luxury';
    const isCyber = design === 'cyber';
    const isEarth = design === 'earth';

    // Layout Logic
    const isVertical = imagePos === 'top' || imagePos === 'bottom';
    const isReverse = imagePos === 'bottom'; // Image at bottom means text first, then image? Or Flex-col-reverse?
    // Usually "Image Bottom" means Image is below text.

    // Scroll Logic
    const enableScroll = items.length >= 4;

    return (
        <SectionWrapper section={section}>
            <div className={clsx("mx-auto", isMobile ? "px-4 py-10" : "px-6 py-16")} style={{ maxWidth: section.contentWidth || 1100 }}>
                {section.title && (
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className={clsx(
                            "font-black mb-6 leading-tight",
                            isMobile ? "text-2xl" : "text-3xl md:text-4xl",
                            isLuxury && "font-serif text-transparent bg-clip-text bg-gradient-to-b from-[#fcd34d] to-[#ca8a04]",
                            isCyber && "font-mono text-cyan-400 tracking-widest uppercase drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]",
                            isSwell && "tracking-tighter text-[#0f172a]",
                            isEarth && "font-serif text-[#5d4037]"
                        )}>{section.title}</h2>
                        <div className={clsx("w-12 h-1 mx-auto rounded-full", isCyber && "shadow-[0_0_15px_cyan]")} style={{ backgroundColor: isCyber ? '#06b6d4' : accent }}></div>
                    </div>
                )}

                <div
                    className={clsx(
                        enableScroll ? "flex overflow-x-auto pb-8 snap-x" : "grid gap-6 md:gap-8",
                        !enableScroll && (isMobile ? "grid-cols-1" : "grid-cols-3"),
                        enableScroll && "gap-4 md:gap-6 px-4 -mx-4 md:px-0 md:mx-0 scrollbar-hide"
                    )}
                >
                    {items.map((item, i) => (
                        <div key={i}
                            className={clsx(
                                "flex transition-all duration-300 relative group",
                                enableScroll ? "flex-shrink-0 w-[85vw] md:w-[350px] snap-center" : "w-full",
                                isVertical ? (isReverse ? "flex-col-reverse" : "flex-col") : "flex-row items-center",
                                // Container Styles
                                isSango && "bg-white p-6 rounded-[2rem] shadow-lg border border-gray-100 hover:-translate-y-1",
                                isSwell && "bg-white p-6 rounded-sm border border-gray-200 shadow-sm hover:shadow-lg",
                                isLuxury && "bg-[#0f172a] p-8 border border-[#ca8a04]/30 rounded-lg",
                                isCyber && "bg-black/80 p-6 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)] relative overflow-hidden",
                                isEarth && "bg-[#fffcf5] p-6 border-2 border-[#d7ccc8] rounded-[1.5rem] relative"
                            )}
                        >
                            {/* Cyber Glow Effect */}
                            {isCyber && <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/20 blur-[40px] rounded-full pointer-events-none"></div>}

                            {/* Image Part */}
                            <div className={clsx(
                                "flex-shrink-0 relative",
                                isVertical ? "mb-4 mx-auto" : "mr-6",
                                isReverse && isVertical && "mt-4 mb-0",
                                isSango && "filter drop-shadow-md",
                                isCyber && "filter drop-shadow-[0_0_5px_cyan]"
                            )}>
                                <div className={clsx(
                                    "overflow-hidden object-cover",
                                    isVertical ? "w-20 h-20" : "w-16 h-16 md:w-20 md:h-20",
                                    isSango && "rounded-full ring-4 ring-white",
                                    isSwell && "rounded-full border border-gray-200",
                                    isLuxury && "rounded-full border-2 border-[#ca8a04] p-0.5",
                                    isCyber && "rounded-lg border border-cyan-400 mask-image-gradient",
                                    isEarth && "rounded-[30%_70%_70%_30%_/30%_30%_70%_70%] border-2 border-[#8d6e63]",
                                    // Default fallback style
                                    !item.image && (item.gender === 'female' ? "bg-pink-50" : "bg-blue-50")
                                )}>
                                    {item.image ? (
                                        <img src={getImgUrl(item.image)} alt={item.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className={clsx(
                                            "w-full h-full flex items-center justify-center",
                                            item.gender === 'female' ? "text-pink-500" : "text-blue-500"
                                        )}>
                                            {item.gender === 'female' ? (
                                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3/4 h-3/4">
                                                    <path d="M12 2C9.24 2 7 4.24 7 7C7 9.4 8.7 11.4 10.9 11.9C6.8 12.6 4 15.8 4 20C4 20.6 4.4 21 5 21H19C19.6 21 20 20.6 20 20C20 15.8 17.2 12.6 13.1 11.9C15.3 11.4 17 9.4 17 7C17 4.24 14.76 2 12 2ZM8 20C8.6 16.5 11 14 12 14C13 14 15.4 16.5 16 20H8ZM12 4C13.66 4 15 5.34 15 7C15 8.66 13.66 10 12 10C10.34 10 9 8.66 9 7C9 5.34 10.34 4 12 4Z"></path>
                                                    <path d="M16 11.5C16 12 15 13 12 13C9 13 8 12 8 11.5C8 9 9 7 9 7C9 5.34 10.34 4 12 4C13.66 4 15 5.34 15 7C15 7 16 9 16 11.5Z" opacity="0.3"></path>
                                                </svg>
                                            ) : (
                                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3/4 h-3/4">
                                                    <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"></path>
                                                </svg>
                                            )}
                                        </div>
                                    )}
                                </div>
                                {isSango && <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-white p-1 rounded-full shadow-sm"><Sparkles size={10} /></div>}
                            </div>

                            {/* Content Part */}
                            <div className={clsx("flex-1 min-w-0", isVertical && "text-center")}>
                                {/* Rating */}
                                <div className={clsx("flex gap-1 mb-3", isVertical && "justify-center")}>
                                    {[...Array(5)].map((_, starIdx) => (
                                        <Star key={starIdx} size={14} fill={starIdx < (item.rating || 5) ? (isLuxury ? '#ca8a04' : (isCyber ? '#22d3ee' : accent)) : 'none'}
                                            style={{ color: starIdx < (item.rating || 5) ? (isLuxury ? '#ca8a04' : (isCyber ? '#22d3ee' : accent)) : '#e5e7eb' }} />
                                    ))}
                                </div>

                                <div className={clsx(
                                    "text-sm mb-4 leading-relaxed whitespace-pre-wrap",
                                    isSango && "text-gray-600 font-medium",
                                    isSwell && "text-gray-600",
                                    isLuxury && "font-serif text-gray-300 italic",
                                    isCyber && "font-mono text-cyan-200/80 text-xs",
                                    isEarth && "text-[#5d4037]"
                                )}>
                                    "{item.content || item.text || item.comment}"
                                </div>

                                <div className={clsx(
                                    "border-t pt-3",
                                    isLuxury ? "border-[#ca8a04]/20" : (isCyber ? "border-cyan-900/50" : (isEarth ? "border-[#d7ccc8]" : "border-gray-100"))
                                )}>
                                    <h4 className={clsx(
                                        "font-bold text-sm truncate",
                                        isSwell && "text-gray-800",
                                        isLuxury && "text-[#fcd34d] font-serif",
                                        isCyber && "text-cyan-400 font-mono tracking-wider",
                                        isEarth && "text-[#5d4037]"
                                    )}>{item.name || "User Name"}</h4>
                                    <p className={clsx(
                                        "text-[10px] uppercase tracking-widest opacity-50 truncate",
                                        isLuxury ? "text-[#ca8a04]" : (isCyber ? "text-cyan-600" : "text-gray-500")
                                    )}>{item.role || item.position}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Scroll Indicator */}
                {enableScroll && (
                    <div className="flex justify-center gap-2 mt-6">
                        {items.map((_, i) => (
                            <div key={i} className={clsx("w-2 h-2 rounded-full transition-all", i === 0 ? "bg-gray-400 w-4" : "bg-gray-200")} />
                        ))}
                    </div>
                )}
            </div>
        </SectionWrapper>
    );
};
