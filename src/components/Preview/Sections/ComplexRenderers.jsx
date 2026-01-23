/* eslint-disable */
import React, { useEffect, useRef } from 'react';
import { ChevronRight, Plus } from 'lucide-react';
import { getYouTubeId } from '../../../utils/helpers';
import { clsx } from 'clsx';

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

    return (
        <div className="max-w-6xl mx-auto px-6">
            <div className={`grid grid-cols-1 ${gridClass}`} style={gapStyle}>
                {items.map(item => (
                    <div key={item.id} className="flex justify-center overflow-hidden w-full">
                        <SocialEmbedPreview platform={item.platform} url={item.url} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export const AccordionRenderer = ({ section }) => {
    const design = section.design || 'simple';

    return (
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
            {section.items.map(item => (
                <details
                    key={item.id}
                    className={clsx(
                        "group overflow-hidden transition-all duration-300",
                        design === 'simple' && "border border-current/10 rounded-lg bg-white/5",
                        design === 'flat' && "border-b border-current/10 bg-transparent rounded-none",
                        design === 'card' && "bg-white/5 backdrop-blur-sm shadow-sm rounded-xl border border-white/10 hover:shadow-md"
                    )}
                >
                    <summary className={clsx(
                        "flex justify-between items-center font-medium cursor-pointer list-none select-none",
                        design === 'simple' && "p-5",
                        design === 'flat' && "p-4 px-0 hover:opacity-70 transition-opacity",
                        design === 'card' && "p-6"
                    )}>
                        <span className="text-lg">{item.title}</span>
                        <span className={clsx(
                            "transition-transform duration-300 w-6 h-6 flex items-center justify-center rounded-full",
                            "group-open:rotate-180",
                            design === 'card' ? "bg-white/10" : ""
                        )}>
                            <ChevronRight size={18} className="rotate-90" />
                        </span>
                    </summary>
                    <div className={clsx(
                        "text-sm opacity-80 leading-loose whitespace-pre-wrap",
                        design === 'simple' && "p-5 pt-0 pb-6 border-t border-current/5", // Added pb-6 and kept pt-0 but added margin top via child or just spacing? User asked for MORE top margin
                        design === 'flat' && "pb-6 animate-fadeIn",
                        design === 'card' && "p-6 pt-0 text-base"
                    )}>
                        <div className="pt-2"> {/* Inner wrapper to ensure spacing */}
                            {item.content}
                        </div>
                    </div>
                </details>
            ))}
        </div>
    );
};

export const PostCardRenderer = ({ section, viewMode }) => {
    const isMobile = viewMode === 'mobile';
    return (
        <div className="max-w-3xl mx-auto">
            <a href={section.url} target="_blank" rel="noopener noreferrer" className={clsx("flex gap-6 p-6 bg-white/5 backdrop-blur-sm border border-current/10 rounded-xl hover:shadow-lg transition-all duration-300 group", isMobile ? "flex-col" : "flex-col md:flex-row")}>
                <div className={clsx("w-full aspect-video flex-shrink-0 overflow-hidden rounded-md", isMobile ? "" : "md:w-48 md:aspect-square")}>
                    <img src={section.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Post" />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                    <p className="text-xs opacity-50 mb-2 font-mono">{section.date}</p>
                    <h4 className="text-lg font-medium mb-3 leading-snug group-hover:underline underline-offset-4">{section.title}</h4>
                    <p className="text-sm opacity-70 leading-relaxed line-clamp-2">{section.excerpt}</p>
                </div>
            </a>
        </div>
    );
};


export const BoxRenderer = ({ section, children }) => {
    const design = section.design || 'simple'; // simple, sticky, ribbon, gradient, glass, comic, dashed, solid

    // Base Styles
    let containerClass = "text-center relative transition-all duration-300 ";
    let titleClass = "font-bold text-lg mb-4";
    let contentClass = "leading-loose whitespace-pre-wrap font-light";

    const boxColor = section.boxColor || '#3b82f6';
    const boxStyle = {
        borderColor: boxColor,
        boxShadow: design === 'neon' ? `0 0 20px ${boxColor}, inset 0 0 10px ${boxColor}` : (design === 'comic' ? `8px 8px 0px 0px ${boxColor}` : undefined),
        borderStyle: design === 'dashed' ? 'dashed' : (design === 'double' ? 'double' : 'solid'),
        paddingTop: section.pTop !== undefined ? `${section.pTop}px` : undefined,
        paddingBottom: section.pBottom !== undefined ? `${section.pBottom}px` : undefined,
        paddingLeft: section.pLeft !== undefined ? `${section.pLeft}px` : undefined,
        paddingRight: section.pRight !== undefined ? `${section.pRight}px` : undefined,
    };

    // Design specific container classes
    if (design === 'gradient') {
        containerClass += "p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-white/50";
    } else if (design === 'glass') {
        containerClass += "p-8 rounded-2xl backdrop-blur-md bg-white/40 border shadow-lg";
    } else if (design === 'comic') {
        containerClass += "p-8 bg-white border-4 border-black text-gray-900";
    } else if (design === 'dashed') {
        containerClass += "p-8 bg-white border-4 rounded-xl";
    } else if (design === 'solid') {
        containerClass += "p-8 bg-white border-4 rounded-lg";
    } else if (design === 'double') {
        containerClass += "p-8 bg-white border-4 border-double rounded-xl";
    } else if (design === 'neon') {
        containerClass += "p-8 bg-black/90 text-white border-2 rounded-xl";
    }

    return (
        <div className={containerClass} style={boxStyle}>
            {/* Sticky Tape Decor */}
            {design === 'sticky' && (
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-yellow-200/80 rotate-[-2deg] shadow-sm backdrop-blur-sm z-20"></div>
            )}

            {/* Ribbon Decor */}
            {design === 'ribbon' && section.title && (
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-8 py-2 shadow-lg z-20">
                    <h4 className="font-bold tracking-widest text-sm uppercase">{section.title}</h4>
                    <div className="absolute top-0 right-full border-[16px] border-transparent border-r-red-600 border-b-red-800"></div>
                    <div className="absolute top-0 left-full border-[16px] border-transparent border-l-red-600 border-b-red-800"></div>
                </div>
            )}

            {/* Content or Children */}
            {children ? (
                <div className={`space-y-6 ${design === 'ribbon' ? 'pt-6' : ''}`}>
                    {children}
                </div>
            ) : (
                <>
                    {design !== 'ribbon' && section.title && <h4 className={titleClass}>{section.title}</h4>}
                    <p className={contentClass}>{section.content}</p>
                </>
            )}
        </div>
    );
};

export const ColumnsRenderer = ({ section, viewMode }) => {
    const isMobile = viewMode === 'mobile';
    const gridClass = isMobile ? 'grid-cols-1' : (section.columnCount === 4 ? 'md:grid-cols-4' : (section.columnCount === 3 ? 'md:grid-cols-3' : (section.columnCount === 2 ? 'md:grid-cols-2' : 'grid-cols-1')));
    // Use user-defined gap or default to 32px (2rem) which corresponds to gap-8
    const gapStyle = { gap: `${section.gap !== undefined ? section.gap : 32}px` };

    return (
        <div className={`grid grid-cols-1 ${gridClass}`} style={gapStyle}>
            {section.items.map(item => (
                <div key={item.id} className="flex flex-col space-y-4">
                    {section.colType === 'card' && (
                        <>
                            <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-100">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                            </div>
                            <div>
                                <h4 className="text-lg font-medium mb-1">{item.title}</h4>
                                <p className="text-sm opacity-70 leading-relaxed text-xs">{item.text}</p>
                            </div>
                        </>
                    )}
                    {section.colType === 'text' && (
                        <div className="p-6 bg-white/5 rounded-lg border border-current/10 h-full">
                            <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                            <p className="text-sm opacity-80 leading-relaxed">{item.text}</p>
                        </div>
                    )}
                    {section.colType === 'image' && (
                        <div className="aspect-square w-full overflow-hidden rounded-lg shadow-sm">
                            <img src={item.image} alt="Image" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                        </div>
                    )}
                    {section.colType === 'social' && (
                        <div className="flex justify-center overflow-hidden">
                            <SocialEmbedPreview platform={item.platform} url={item.url} />
                        </div>
                    )}
                    {section.colType === 'video' && (
                        <div className="aspect-video w-full rounded-lg overflow-hidden bg-black shadow">
                            {getYouTubeId(item.url) ? (
                                <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${getYouTubeId(item.url)}`} frameBorder="0" allowFullScreen></iframe>
                            ) : (
                                <video src={item.url} controls className="w-full h-full object-cover"></video>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export const LinksRenderer = ({ section }) => {
    return (
        <div className="max-w-xl mx-auto space-y-3">
            {section.links.map(link => (
                <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="block w-full bg-white/5 backdrop-blur-sm border border-current/10 p-4 rounded-xl flex items-center justify-between hover:bg-white/10 transition-colors group">
                    <div>
                        <div className="font-bold">{link.label}</div>
                        {link.subtext && <div className="text-xs opacity-70 mt-1">{link.subtext}</div>}
                    </div>
                </a>
            ))}
        </div>
    );
};

