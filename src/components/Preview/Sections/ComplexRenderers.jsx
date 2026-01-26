/* eslint-disable */
import React, { useEffect, useRef } from 'react';
import { ChevronRight, Plus } from 'lucide-react';
import { getYouTubeId, getImgUrl, getDesignTheme } from '../../../utils/helpers';
import { clsx } from 'clsx';
import { SectionWrapper } from './SectionWrapper';

// Social Embed Component
export const SocialEmbedPreview = ({ platform, url }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;

        // Clean up previous content
        container.innerHTML = '';

        if (platform === 'twitter') {
            const match = url.match(/status\/(\d+)/);
            const tweetId = match ? match[1] : null;

            if (!tweetId) {
                container.innerHTML = '<div class="text-xs text-gray-500 p-4 border border-dashed border-gray-600 rounded">Invalid Twitter URL</div>';
                return;
            }

            const tweetContainer = document.createElement('div');
            container.appendChild(tweetContainer);

            const loadTwitter = () => {
                if (window.twttr && window.twttr.widgets) {
                    window.twttr.widgets.createTweet(tweetId, tweetContainer, {
                        theme: 'dark',
                        align: 'center',
                        dnt: true,
                        conversation: 'none'
                    });
                } else {
                    if (!document.getElementById('twitter-wjs')) {
                        const script = document.createElement('script');
                        script.id = 'twitter-wjs';
                        script.src = "https://platform.twitter.com/widgets.js";
                        script.async = true;
                        document.head.appendChild(script);
                        script.onload = () => loadTwitter();
                    } else {
                        setTimeout(loadTwitter, 500);
                    }
                }
            };
            loadTwitter();

        } else if (platform === 'instagram') {
            const blockquote = document.createElement('blockquote');
            blockquote.className = 'instagram-media';
            blockquote.setAttribute('data-instgrm-permalink', url);
            blockquote.setAttribute('data-instgrm-version', '14');
            blockquote.style.width = "100%";
            blockquote.style.maxWidth = "540px";
            blockquote.style.margin = "0 auto";
            container.appendChild(blockquote);

            const loadInstagram = () => {
                if (window.instgrm) {
                    window.instgrm.Embeds.process();
                } else {
                    if (!document.getElementById('insta-wjs')) {
                        const script = document.createElement('script');
                        script.id = 'insta-wjs';
                        script.src = "//www.instagram.com/embed.js";
                        script.async = true;
                        document.head.appendChild(script);
                        script.onload = () => window.instgrm && window.instgrm.Embeds.process();
                    }
                }
            };
            loadInstagram();
        }

    }, [platform, url]);

    return <div ref={containerRef} className="w-full flex justify-center min-h-[150px] bg-white/5 rounded-lg"></div>;
};

export const SocialRenderer = ({ section, viewMode }) => {
    const isMobile = viewMode === 'mobile';
    const colCount = section.columnCount || 1;
    const gridClass = isMobile ? 'grid-cols-1' : (colCount === 3 ? 'md:grid-cols-3' : (colCount === 2 ? 'md:grid-cols-2' : 'grid-cols-1'));
    const gapStyle = { gap: `${section.gap !== undefined ? section.gap : 32}px` };

    // Backward compatibility: If no items but has single platform/url
    const items = section.items || (section.url ? [{ id: 'default', platform: section.platform || 'twitter', url: section.url }] : []);

    const itemSpacing = section.itemSpacing || section.gap || 32;

    return (
        <SectionWrapper section={section}>
            <div className="px-6">
                <div className={`grid grid-cols-1 ${gridClass}`} style={{ gap: itemSpacing }}>
                    {items.map(item => (
                        <div key={item.id} className="flex justify-center overflow-hidden w-full">
                            <SocialEmbedPreview platform={item.platform} url={item.url} />
                        </div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
};

export const AccordionRenderer = ({ section, accentColor: globalAccent }) => {
    const design = section.design || 'standard';
    const theme = getDesignTheme(design);
    const accent = globalAccent || theme.primary;
    const isSangoLine = ['earth', 'gentle', 'standard', 'modern'].includes(design);

    return (
        <SectionWrapper section={section}>
            <div className="flex flex-col mx-auto" style={{ gap: section.itemSpacing || 16, maxWidth: section.contentWidth || 800 }}>
                {section.items?.map(item => (
                    <details
                        key={item.id}
                        className={clsx(
                            "group overflow-hidden transition-all duration-300",
                            isSangoLine ? "rounded-[1.5rem] bg-white border border-gray-100 shadow-sm" : "rounded-lg border border-gray-100 bg-gray-50 hover:bg-white"
                        )}
                    >
                        <summary className="flex justify-between items-center font-bold cursor-pointer list-none select-none p-5 md:p-6">
                            <span className="text-base md:text-lg pr-4">{item.title || item.question || item.q}</span>
                            <div className={clsx(
                                "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-open:rotate-180",
                                isSangoLine ? "bg-gray-50 text-gray-400" : "bg-white shadow-sm"
                            )}>
                                <ChevronRight size={18} className="rotate-90" style={{ color: isSangoLine ? undefined : accent }} />
                            </div>
                        </summary>
                        <div className="px-6 pb-6 animate-fadeIn">
                            <div className="pt-4 border-t border-gray-100 opacity-70 leading-relaxed whitespace-pre-wrap">
                                {item.text || item.content || item.description || item.answer || item.a}
                            </div>
                        </div>
                    </details>
                ))}
            </div>
        </SectionWrapper>
    );
};

export const PostCardRenderer = ({ section, viewMode }) => {
    const isMobile = viewMode === 'mobile';
    const body = section.excerpt || section.text || section.content || "";
    return (
        <SectionWrapper section={section}>
            <div className="px-6">
                <a href={section.url} target="_blank" rel="noopener noreferrer" className={clsx("flex gap-6 p-6 bg-white/5 backdrop-blur-sm border border-current/10 rounded-xl hover:shadow-lg transition-all duration-300 group", isMobile ? "flex-col" : "flex-col md:flex-row")}>
                    <div className={clsx("w-full aspect-video flex-shrink-0 overflow-hidden rounded-md", isMobile ? "" : "md:w-48 md:aspect-square")}>
                        {getImgUrl(section.image) && getImgUrl(section.image).trim().length > 0 ? (
                            <img src={getImgUrl(section.image)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Post" />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs opacity-50 font-serif">No Image</div>
                        )}
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                        <p className="text-xs opacity-50 mb-2 font-mono">{section.date}</p>
                        <h4 className="text-lg font-medium mb-3 leading-snug group-hover:underline underline-offset-4">{section.title}</h4>
                        <p className="text-sm opacity-70 leading-relaxed line-clamp-2">{body}</p>
                    </div>
                </a>
            </div>
        </SectionWrapper>
    );
};


export const BoxRenderer = ({ section, children, accentColor: globalAccent }) => {
    const design = section.design || 'simple';
    const theme = getDesignTheme(design);
    const accent = section.boxColor || globalAccent || theme.primary;

    // Padding
    const pStyle = {
        paddingTop: section.pTop !== undefined ? `${section.pTop}px` : '32px',
        paddingBottom: section.pBottom !== undefined ? `${section.pBottom}px` : '32px',
        paddingLeft: section.pLeft !== undefined ? `${section.pLeft}px` : '32px',
        paddingRight: section.pRight !== undefined ? `${section.pRight}px` : '32px',
    };

    let containerClass = "relative transition-all duration-300 w-full ";
    let style = { ...pStyle };
    let innerClass = "";

    switch (design) {
        case 'comic':
            containerClass += "bg-white border-4 border-black text-gray-900 shadow-[8px_8px_0px_0px_black]";
            break;
        case 'neon':
            containerClass += "bg-neutral-900 text-white border-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] rounded-xl";
            style.borderColor = accent;
            style.boxShadow = `0 0 15px ${accent}80`;
            break;
        case 'glass':
            containerClass += "backdrop-blur-md bg-white/40 border border-white/50 shadow-xl rounded-[2rem]";
            break;
        case 'sticky':
            containerClass += "bg-[#fff9c4] text-gray-800 shadow-md transform -rotate-1 max-w-[95%] mx-auto";
            style.backgroundColor = '#fff9c4';
            break;
        case 'feminine':
            containerClass += "bg-white border-2 border-dashed rounded-[2rem] shadow-sm relative";
            style.borderColor = accent;
            style.backgroundColor = `${accent}08`;
            break;
        case 'earth':
            containerClass += "bg-[#f4f4f0] rounded-lg shadow-sm border-l-8";
            style.borderLeftColor = accent;
            break;
        case 'gentle': // SANGO
            containerClass += "bg-white rounded-[2rem] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08),0_8px_10px_-6px_rgba(0,0,0,0.01)]";
            break;
        case 'modern': // SWELL
            containerClass += "bg-white border border-gray-200 rounded-md border-t-4 shadow-sm";
            style.borderTopColor = accent;
            break;
        case 'ribbon':
            containerClass += "bg-white border border-gray-200 rounded-lg shadow-sm pt-12 relative overflow-hidden";
            style.paddingTop = Math.max(section.pTop || 0, 48) + 'px';
            break;
        case 'gradient':
            containerClass += "p-[3px] rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg";
            style.backgroundImage = `linear-gradient(45deg, ${accent}, #a855f7)`;
            innerClass = "bg-white rounded-[calc(0.75rem-3px)] h-full w-full";
            break;
        case 'dashed':
            containerClass += "bg-white border-2 border-dashed rounded-lg";
            style.borderColor = accent;
            break;
        case 'double':
            containerClass += "bg-white border-4 border-double rounded-lg";
            style.borderColor = accent;
            break;
        case 'solid':
            containerClass += "bg-white border-2 border-solid rounded-lg";
            style.borderColor = accent;
            break;
        case 'simple':
        default:
            containerClass += "bg-white border border-gray-100 rounded-xl shadow-sm";
            break;
    }

    const content = (
        <div className={clsx("leading-loose whitespace-pre-wrap opacity-90", innerClass)} style={design === 'gradient' ? pStyle : {}}>
            {section.title && design !== 'ribbon' && (
                <div className={clsx("mb-6", design === 'comic' ? "text-left" : "text-center")}>
                    <h4 className="text-xl md:text-2xl font-black" style={{ color: design === 'neon' ? 'white' : 'inherit' }}>{section.title}</h4>
                    {design !== 'comic' && design !== 'sticky' && <div className="w-12 h-1 mx-auto mt-3 rounded-full opacity-30" style={{ backgroundColor: accent }}></div>}
                </div>
            )}
            {section.content && (
                <div style={{ fontSize: `${(section.textScale || 1.0)}rem` }} className="mb-6 last:mb-0">
                    {section.content}
                </div>
            )}
            {children}
        </div>
    );

    return (
        <SectionWrapper section={section}>
            {/* Sticky Tape Effect */}
            {design === 'sticky' && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-white/40 shadow-sm rotate-[-1deg] backdrop-blur-sm z-10 pointer-events-none"></div>
            )}

            <div className={clsx(containerClass, "mx-auto")} style={design === 'gradient' ? { ...style, padding: '3px' } : style}>
                {/* Ribbon Label */}
                {design === 'ribbon' && section.title && (
                    <div className="absolute top-[16px] -right-[30px] w-[120px] text-center text-white text-xs font-bold py-1 shadow-md transform rotate-45" style={{ backgroundColor: accent }}>
                        {section.title}
                    </div>
                )}
                {design === 'ribbon' && !section.title && (
                    <div className="absolute top-[16px] -right-[30px] w-[120px] text-center text-white text-xs font-bold py-1 shadow-md transform rotate-45" style={{ backgroundColor: accent }}>
                        PICK UP
                    </div>
                )}
                {content}
            </div>
        </SectionWrapper>
    );
};

export const ColumnsRenderer = ({ section, viewMode, accentColor: globalAccent }) => {
    const isMobile = viewMode === 'mobile';
    const design = section.design || 'standard';
    const theme = getDesignTheme(design);
    const accent = globalAccent || theme.primary;
    const isSangoLine = ['earth', 'gentle', 'standard', 'modern'].includes(design);

    const gridClass = isMobile ? 'grid-cols-1' : (section.columnCount === 4 ? 'md:grid-cols-4' : (section.columnCount === 3 ? 'md:grid-cols-3' : (section.columnCount === 2 ? 'md:grid-cols-2' : 'grid-cols-1')));
    const itemSpacing = section.itemSpacing || section.gap || 32;

    return (
        <SectionWrapper section={section}>
            <div className={`grid grid-cols-1 ${gridClass}`} style={{ gap: itemSpacing }}>
                {section.items?.map((item, idx) => {
                    const key = item.id ?? item._id ?? `${section.id || 'section'}-${idx}`;
                    const imgUrl = getImgUrl(item.image);
                    const body = item.text ?? item.content ?? item.description ?? "";

                    return (
                        <div key={key} className="flex flex-col group">
                            {(section.colType === 'card' || section.colType === 'image') && (
                                <div className={clsx(
                                    "w-full overflow-hidden mb-5 transition-all shadow-lg group-hover:shadow-2xl group-hover:-translate-y-1",
                                    section.colType === 'card' ? "aspect-[4/3]" : "aspect-square",
                                    isSangoLine ? "rounded-[2rem]" : "rounded-xl"
                                )}>
                                    {imgUrl ? (
                                        <img src={imgUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    ) : (
                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-[10px] text-gray-400 font-bold">GRID IMAGE</div>
                                    )}
                                </div>
                            )}

                            {section.colType === 'video' && (
                                <div className={clsx(
                                    "aspect-video w-full overflow-hidden shadow-xl mb-5",
                                    isSangoLine ? "rounded-[2rem]" : "rounded-xl"
                                )}>
                                    {getYouTubeId(item.url) ? (
                                        <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${getYouTubeId(item.url)}`} frameBorder="0" allowFullScreen />
                                    ) : (
                                        <video src={item.url} controls className="w-full h-full object-cover" />
                                    )}
                                </div>
                            )}

                            {(section.colType === 'card' || section.colType === 'text') && (
                                <div className={clsx(section.colType === 'text' && "p-8 h-full transition-all " + (isSangoLine ? "rounded-[2rem] bg-white shadow-xl border border-gray-50" : "rounded-xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-xl"))}>
                                    <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                                    <p className="text-sm opacity-60 leading-relaxed whitespace-pre-wrap">{body}</p>
                                </div>
                            )}

                            {section.colType === 'social' && (
                                <div className="flex justify-center overflow-hidden">
                                    <SocialEmbedPreview platform={item.platform} url={item.url} />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </SectionWrapper>
    );
};

export const LinksRenderer = ({ section, accentColor: globalAccent }) => {
    const design = section.design || 'simple';
    const theme = getDesignTheme(design);
    const accent = section.accentColor || globalAccent || theme.primary;
    const itemSpacing = section.itemSpacing || 16;
    const links = section.links || section.items || [];

    // Design-specific container styles
    const containerStyle = { gap: `${itemSpacing}px` };
    let containerClass = "flex flex-col mx-auto max-w-2xl";
    if (design === 'card') containerClass = "grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto";
    if (design === 'button') containerClass = "flex flex-col items-center gap-4 max-w-lg mx-auto";

    return (
        <SectionWrapper section={section}>
            <div className={containerClass} style={design !== 'card' && design !== 'button' ? containerStyle : {}}>
                {links.map((link, idx) => {
                    // 1. SANGO (Pop)
                    if (design === 'sango') {
                        return (
                            <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer"
                                className="block w-full p-4 pl-6 rounded-full bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center justify-between group">
                                <div className="flex items-center gap-4">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accent }}></div>
                                    <div>
                                        <div className="font-bold text-gray-700">{link.label}</div>
                                        {link.subtext && <div className="text-[10px] text-gray-400 font-bold tracking-wider mt-0.5">{link.subtext}</div>}
                                    </div>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-gray-50 text-gray-400 group-hover:text-white group-hover:bg-gray-300 flex items-center justify-center transition-colors">
                                    <ChevronRight size={16} />
                                </div>
                            </a>
                        );
                    }

                    // 2. Modern (SWELL style)
                    if (design === 'modern') {
                        return (
                            <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer"
                                className="block w-full bg-gray-50 hover:bg-white border-l-4 border-gray-200 hover:border-l-8 transition-all p-4 flex items-center justify-between group shadow-sm" style={{ borderLeftColor: accent }}>
                                <div>
                                    <div className="font-bold text-gray-800">{link.label}</div>
                                    {link.subtext && <div className="text-xs text-gray-500 mt-1">{link.subtext}</div>}
                                </div>
                                <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-600 transition-transform group-hover:translate-x-1" />
                            </a>
                        );
                    }

                    // 3. Card (Grid)
                    if (design === 'card') {
                        return (
                            <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer"
                                className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all text-center group">
                                <div className="w-12 h-12 mb-4 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center" style={{ backgroundColor: `${accent}20`, color: accent }}>
                                    <div className="text-2xl">🔗</div>
                                </div>
                                <div className="font-bold text-lg mb-2">{link.label}</div>
                                {link.subtext && <div className="text-xs text-gray-400">{link.subtext}</div>}
                            </a>
                        );
                    }

                    // 4. Button (Pill)
                    if (design === 'button') {
                        return (
                            <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer"
                                className="block w-full text-center py-4 px-8 rounded-full font-bold text-white shadow-md hover:shadow-xl hover:opacity-90 transition-all" style={{ backgroundColor: accent }}>
                                {link.label}
                                {link.subtext && <span className="block text-[10px] opacity-80 font-normal mt-1 border-t border-white/20 pt-1 mx-auto max-w-[100px]">{link.subtext}</span>}
                            </a>
                        );
                    }

                    // 5. Simple (Standard)
                    return (
                        <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer"
                            className="block w-full p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full group-hover:scale-150 transition-transform" style={{ backgroundColor: accent }}></div>
                                <div className="font-medium text-gray-700 group-hover:text-black transition-colors">{link.label}</div>
                            </div>
                            <ChevronRight size={14} className="text-gray-300" />
                        </a>
                    );
                })}
            </div>
        </SectionWrapper>
    );
};

