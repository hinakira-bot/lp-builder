/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { HeroSection } from './HeroSection';
import { SectionDispatcher } from './SectionDispatcher';

export const LivePreview = ({ data, viewMode, activeSectionId, isPublished = false }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showCta, setShowCta] = useState(false);

    // Initial check to avoid crashing if data is missing
    if (!data) return <div className="p-10 text-gray-400">Loading Preview Data...</div>;

    // Window Scroll Handling for Published Page
    useEffect(() => {
        if (isPublished) {
            const handleWindowScroll = () => {
                const scrollTop = window.scrollY;
                if (scrollTop > 100) {
                    setShowCta(true);
                } else {
                    setShowCta(false);
                }
            };
            window.addEventListener('scroll', handleWindowScroll);
            return () => window.removeEventListener('scroll', handleWindowScroll);
        }
    }, [isPublished]);

    // Internal Scroll Handling (Editor Mode)
    const handleInternalScroll = (e) => {
        if (isPublished) return;
        const scrollTop = e.currentTarget.scrollTop;
        if (scrollTop > 100) {
            setShowCta(true);
        } else {
            setShowCta(false);
        }
    };

    // Auto Scroll Logic (Editor only)
    useEffect(() => {
        if (activeSectionId && !isPublished) {
            const element = document.getElementById(`section-${activeSectionId}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [activeSectionId, isPublished]);

    // Prepare sections and font sizes
    const sectionsToRender = data.sections || [];

    const currentFontSize = viewMode === 'mobile' ? {
        heroTitle: (data.fontSize?.heroTitle || 4) * 0.6,
        heroSubtitle: (data.fontSize?.heroSubtitle || 1) * 0.8,
        sectionTitle: (data.fontSize?.sectionTitle || 2) * 0.7,
        body: (data.fontSize?.body || 1) * 0.85
    } : (data.fontSize || { heroTitle: 4, heroSubtitle: 1, sectionTitle: 2, body: 1 });

    return (
        <div
            className={clsx(
                "relative shadow-2xl overflow-hidden transition-all duration-500 ease-in-out border border-gray-800/20 transform flex flex-col",
                viewMode === 'mobile' ? 'w-[390px] h-[800px] rounded-[3rem] border-8 border-gray-900' : 'w-full h-full rounded-md',
                isPublished ? 'shadow-none border-none rounded-none w-full h-auto !transform-none' : ''
            )}
            style={{
                color: data.textColor,
                backgroundColor: data.pageBgType === 'color' ? data.pageBgValue : 'transparent',
                backgroundImage: data.pageBgType === 'image' ? `url(${data.pageBgValue})` : 'none',
                backgroundSize: data.pageBgType === 'image' ? 'cover' : 'auto',
                fontFamily: data.fontFamily === 'serif' ? "'Cormorant Garamond', 'Noto Sans JP', serif" : "'Noto Sans JP', sans-serif"
            }}
        >
            {/* Main Content Area */}
            <div
                className={clsx(
                    "flex-1 w-full relative",
                    isPublished ? "" : "overflow-y-auto scrollbar-hide"
                )}
                onScroll={handleInternalScroll}
            >
                <div className={`relative min-h-full flex flex-col ${data.fontFamily === 'serif' ? 'font-serif' : 'font-sans'}`}>

                    {/* Sticky Header */}
                    <header
                        className={clsx(
                            "w-full z-30 px-6 py-4 transition-all",
                            data.header?.style === 'solid' ? "relative shadow-sm" : "absolute top-0 left-0"
                        )}
                        style={data.header?.style === 'solid' ? { backgroundColor: data.header?.bgValue, color: data.header?.textColor } : { color: 'white' }}
                    >
                        <div className={clsx("flex items-center max-w-7xl mx-auto relative", data.header?.layout === 'center' ? 'justify-end' : 'justify-between')} style={{ minHeight: '40px' }}>
                            <div className={clsx("z-50", data.header?.layout === 'center' ? 'absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2' : 'relative')}>
                                {data.header?.logoUrl ? (
                                    <img src={data.header.logoUrl} alt={data.siteTitle} style={{ height: `${data.header.logoHeight || 40}px` }} className="object-contain" />
                                ) : (
                                    <div className={clsx("font-bold text-lg tracking-widest uppercase opacity-90", data.header?.style === 'overlay' ? 'mix-blend-difference' : '')}>
                                        {data.siteTitle}
                                    </div>
                                )}
                            </div>

                            <nav className={clsx("hidden md:block", data.header?.style === 'overlay' ? 'mix-blend-difference' : '')}>
                                <ul className="flex space-x-6 text-sm tracking-widest font-medium">
                                    {(data.menuItems || []).map(item => (
                                        <li key={item.id}>
                                            <a href={item.url} className="hover:opacity-70 transition-opacity">{item.label}</a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className={clsx("md:hidden z-50 relative w-8 h-8 flex flex-col justify-center items-end gap-1.5 group", data.header?.style === 'overlay' ? 'mix-blend-difference' : '')}
                            >
                                <span className={clsx("w-full h-0.5 bg-current transition-all duration-300 origin-right", isMobileMenuOpen ? 'rotate-45 translate-y-[6px] translate-x-[5px]' : '')}></span>
                                <span className={clsx("w-2/3 h-0.5 bg-current transition-all duration-300 origin-right", isMobileMenuOpen ? 'opacity-0' : '')}></span>
                                <span className={clsx("w-full h-0.5 bg-current transition-all duration-300 origin-right", isMobileMenuOpen ? '-rotate-45 -translate-y-[6px] translate-x-[5px]' : '')}></span>
                            </button>
                        </div>
                    </header>

                    <HeroSection data={data} viewMode={viewMode} />

                    <div className="relative z-10 flex-1 flex flex-col w-full pb-0">
                        <SectionDispatcher sections={sectionsToRender} viewMode={viewMode} fontSize={currentFontSize} />
                    </div>

                    <footer className="py-8 text-center border-t border-current/10 opacity-60 mt-auto">
                        <p className="text-[10px] uppercase tracking-widest">&copy; {new Date().getFullYear()} {data.siteTitle}. All Rights Reserved.</p>
                    </footer>

                    {/* Spacer for Floating CTA */}
                    {data.floatingCta?.enabled && <div className="h-24"></div>}
                </div>
            </div>

            {/* Floating CTA (Docked) */}
            {data.floatingCta?.enabled && (
                <div className={clsx(
                    isPublished ? "fixed" : "absolute",
                    "bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-gray-200 p-4 pb-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] transition-all duration-500 ease-in-out",
                    viewMode === 'mobile' ? '' : 'md:hidden',
                    showCta ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
                )}>
                    <a
                        href={data.floatingCta.url}
                        className="block w-full py-3.5 rounded-full shadow-lg text-center font-bold text-sm tracking-widest transition-transform active:scale-95"
                        style={{ backgroundColor: data.floatingCta.bgColor, color: data.floatingCta.textColor }}
                    >
                        {data.floatingCta.text}
                    </a>
                </div>
            )}
        </div>
    );
};
