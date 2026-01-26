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
    const design = section.design || 'standard';
    const theme = getDesignTheme(design);
    const accent = globalAccent || theme.primary;
    const isSangoLine = ['earth', 'gentle', 'standard', 'modern'].includes(design);

    let containerClass = "relative transition-all duration-300 p-8 md:p-12 ";

    if (design === 'comic') {
        containerClass += "bg-white border-4 border-black text-gray-900 shadow-[8px_8px_0px_0px_black]";
    } else if (design === 'neon') {
        containerClass += "bg-black text-white border-2 rounded-xl";
    } else if (design === 'glass') {
        containerClass += "backdrop-blur-md bg-white/40 border-2 border-white shadow-xl rounded-[2rem]";
    } else {
        containerClass += isSangoLine ? "rounded-[2.5rem] bg-white shadow-xl border border-gray-50" : "rounded-xl bg-gray-50 border border-gray-200";
    }

    const boxStyle = {
        borderColor: (design === 'comic' || design === 'glass') ? undefined : accent,
        borderStyle: section.design === 'dashed' ? 'dashed' : 'solid',
        paddingTop: section.pTop !== undefined ? `${section.pTop}px` : undefined,
        paddingBottom: section.pBottom !== undefined ? `${section.pBottom}px` : undefined,
    };

    return (
        <SectionWrapper section={section}>
            <div className={containerClass} style={boxStyle}>
                {section.title && (
                    <div className={clsx("mb-6", design === 'comic' ? "text-left" : "text-center")}>
                        <h4 className="text-xl md:text-2xl font-black">{section.title}</h4>
                        <div className={clsx("w-12 h-1 mt-4", design === 'comic' ? "" : "mx-auto")} style={{ backgroundColor: accent }}></div>
                    </div>
                )}
                <div className="leading-loose whitespace-pre-wrap opacity-80">
                    {children || section.content}
                </div>
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
    const design = section.design || 'standard';
    const theme = getDesignTheme(design);
    const accent = globalAccent || theme.primary;
    const isSangoLine = ['earth', 'gentle', 'standard', 'modern'].includes(design);
    const itemSpacing = section.itemSpacing || 12;

    return (
        <SectionWrapper section={section}>
            <div className="flex flex-col mx-auto" style={{ gap: itemSpacing, maxWidth: section.contentWidth || 600 }}>
                {section.links?.map(link => (
                    <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer"
                        className={clsx(
                            "block w-full p-5 flex items-center justify-between transition-all duration-300 group shadow-sm",
                            isSangoLine ? "rounded-full bg-white border border-gray-100 hover:shadow-lg" : "rounded-xl bg-gray-50 border border-gray-200 hover:bg-white hover:shadow-xl"
                        )}>
                        <div className="flex items-center gap-4">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }}></div>
                            <div>
                                <div className="font-bold">{link.label}</div>
                                {link.subtext && <div className="text-[10px] opacity-40 mt-1 uppercase tracking-widest">{link.subtext}</div>}
                            </div>
                        </div>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-50 group-hover:bg-gray-100 transition-colors">
                            <ChevronRight size={16} className="text-gray-400" />
                        </div>
                    </a>
                ))}
            </div>
        </SectionWrapper>
    );
};

