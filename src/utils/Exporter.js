import { DEFAULT_DATA } from "../data/defaultData";

// Inline helpers to avoid import issues during export
const clsx = (...args) => {
    return args.flat().filter(Boolean).join(" ");
};

const getImgUrl = (img) => {
    if (!img) return null;
    if (typeof img === "string") return img.trim() || null;
    if (typeof img === "object") {
        const url = img.url || img.src || img.href;
        return (url && typeof url === 'string') ? url.trim() : null;
    }
    return null;
};

// --- Design Theme Helper (Inlined from utils/helpers.js) ---
const getDesignTheme = (designType) => {
    const themes = {
        earth: { primary: '#7c8a71', accent: '#d4a373', bg: '#f5f2ed', text: '#4a3d34', radius: '1.5rem', shadow: '0 10px 30px -10px rgba(124, 138, 113, 0.2)' },
        masculine: { primary: '#1e293b', accent: '#2563eb', bg: '#f8fafc', text: '#0f172a', radius: '0.25rem', shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
        stylish: { primary: '#0f172a', accent: '#06b6d4', bg: '#ffffff', text: '#1e293b', radius: '0.75rem', shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' },
        gentle: { primary: '#db2777', accent: '#fce7f3', bg: '#fffafa', text: '#be185d', radius: '2.5rem', shadow: '0 15px 40px -10px rgba(219, 39, 119, 0.15)' },
        luxury: { primary: '#111111', accent: '#c5a059', bg: '#fffdfa', text: '#222222', radius: '0px', shadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }
    };

    const mapping = {
        standard: themes.earth, simple: themes.masculine,
        earth: themes.earth, clean: themes.earth, minimal: themes.earth, organic: themes.earth, timeline: themes.earth,
        gentle: themes.gentle, modern: themes.gentle, soft: themes.gentle, bubble: themes.gentle,
        masculine: themes.masculine, bold: themes.masculine, dark: themes.masculine, box: themes.masculine, cool: themes.masculine,
        stylish: themes.stylish, vivid: themes.stylish, gradient: themes.stylish, flat: themes.stylish,
        luxury: themes.luxury, elegant: themes.luxury, serif: themes.luxury,
        cyber: { primary: '#0f172a', accent: '#06b6d4', bg: '#000000', text: '#22d3ee', radius: '0px' } // Added Cyber manually
    };

    return mapping[designType] || themes.earth;
};

// --- Divider SVGs for Export ---
const DIVIDERS = {
    'wave': (color) => `<svg viewBox="0 0 1440 120" fill="${color}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path></svg>`,
    'tilt-right': (color) => `<svg viewBox="0 0 1440 120" fill="${color}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M0,120L1440,0L1440,120L0,120Z"></path></svg>`,
    'tilt-left': (color) => `<svg viewBox="0 0 1440 120" fill="${color}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M0,0L1440,120L0,120Z"></path></svg>`,
    'triangle': (color) => `<svg viewBox="0 0 1440 120" fill="${color}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M720,0L1440,120L0,120Z"></path></svg>`,
    'curve': (color) => `<svg viewBox="0 0 1440 120" fill="${color}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M0,0 C480,120 960,120 1440,0 L1440,120 L0,120 Z"></path></svg>`,
};

const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[1].length === 11) ? match[1] : null;
};

// --- HTML Generator ---
const generateHTML = (data) => {
    const bgStyle = data.pageBgType === 'color'
        ? `background-color: ${data.pageBgValue};`
        : `background-image: url('${data.pageBgValue}'); background-size: cover;`;

    const fontClass = data.fontFamily === 'serif' ? 'font-serif' : 'font-sans';

    const heroStyle = `width: ${data.heroWidth}%; height: ${data.heroHeight}vh; margin-top: ${data.heroWidth < 100 ? '20px' : '0'}; border-radius: ${data.heroWidth < 100 ? '16px' : '0'};`;

    const mediaStyle = `filter: blur(${data.heroBlur}px); object-position: ${data.heroPositionX}% ${data.heroPositionY}%;`;

    const menuItemsHtml = data.menuItems.map(item => `<li><a href="${item.url}" class="block py-2 md:py-0 md:px-4 hover:opacity-70 transition-opacity">${item.label}</a></li>`).join('');

    const sectionsHtml = data.sections.map((section, index) => {
        const isMobile = false; // Export uses responsive classes
        const delayStyle = `animation-delay: ${0.2 + (index * 0.1)}s;`;
        const commonClass = "animate-fadeInUp";

        // Spacing
        const pt = section.pt || 'pt-16';
        const pb = section.pb || 'pb-16';

        // Section Background Logic
        let sectionBgStyle = '';
        let sectionOverlay = '';

        if (section.bgType === 'image') {
            sectionBgStyle = `background-image: url('${section.bgValue}'); background-size: cover; background-position: center; position: relative;`;
            sectionOverlay = `<div class="absolute inset-0 bg-black" style="opacity: ${section.bgOverlay || 0}; z-index: 0;"></div>`;
        } else if (section.bgType === 'color') {
            sectionBgStyle = `background-color: ${section.bgValue || 'transparent'};`;
        }

        // Dividers
        let dividerTopHtml = '';
        if (section.dividerTop && section.dividerTop !== 'none' && DIVIDERS[section.dividerTop]) {
            dividerTopHtml = `<div class="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-20 translate-y-[-1px] rotate-180">${DIVIDERS[section.dividerTop](section.dividerTopColor || '#ffffff')}</div>`;
        }
        let dividerBottomHtml = '';
        if (section.dividerBottom && section.dividerBottom !== 'none' && DIVIDERS[section.dividerBottom]) {
            dividerBottomHtml = `<div class="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20 translate-y-[1px]">${DIVIDERS[section.dividerBottom](section.dividerBottomColor || '#ffffff')}</div>`;
        }

        // Box Wrapper Logic
        const boxClasses = section.boxStyle === 'shadow' ? 'bg-white shadow-xl text-gray-800'
            : section.boxStyle === 'border' ? 'border border-current/20'
                : section.boxStyle === 'fill' ? 'bg-gray-100/50'
                    : section.boxStyle === 'stitch' ? 'border-2 border-dashed border-current/30' : '';

        const boxPadding = section.boxStyle && section.boxStyle !== 'none' ? 'p-8 md:p-12 rounded-xl' : '';

        const boxWrapperStart = section.boxStyle && section.boxStyle !== 'none'
            ? `<div class="w-full max-w-5xl mx-auto px-6 relative z-10"><div class="${boxClasses} ${boxPadding}">`
            : `<div class="relative z-10">`;
        const boxWrapperEnd = `</div></div>`;
        const innerMaxWidth = section.boxStyle && section.boxStyle !== 'none' ? 'w-full' : 'w-full max-w-5xl mx-auto px-6';

        // Content contentHtml
        let contentHtml = '';

        // Readability Logic
        let textClasses = "";
        if (section.textShadow === 'soft') textClasses += " drop-shadow-md";
        else if (section.textShadow === 'strong') textClasses += " drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]";

        let containerClasses = "";
        const backdropBase = "backdrop-blur-md p-6 rounded-xl shadow-lg";
        if (section.textBackdrop === 'blur') containerClasses += ` ${backdropBase} bg-white/10 border border-white/20`;
        else if (section.textBackdrop === 'white') containerClasses += ` ${backdropBase} bg-white/90 text-gray-800`;
        else if (section.textBackdrop === 'black') containerClasses += ` ${backdropBase} bg-black/70 text-white`;

        if (section.type === 'text') {
            const textAlign = section.align === 'center' ? 'text-center' : (section.align === 'right' ? 'text-right' : 'text-left');

            // Apply container to wrapper if exists, otherwise text
            const inner = `
                ${section.title ? `<h3 class="font-medium tracking-widest mb-6 ${textClasses}" style="font-size: ${data.fontSize.sectionTitle}rem;">${section.title}</h3>` : ''}
                <p class="leading-loose whitespace-pre-wrap font-light tracking-wide ${textClasses}" style="font-size: ${data.fontSize.body}rem;">${section.content}</p>
            `;

            contentHtml = `
            <div class="max-w-3xl mx-auto ${textAlign} ${containerClasses}">
                ${inner}
            </div>`;
        }
        else if (section.type === 'image') {
            const width = section.width || 100;
            const alignClass = section.align === 'center' ? 'mx-auto' : (section.align === 'right' ? 'ml-auto' : 'mr-auto');
            contentHtml = `
            <div style="width: ${width}%;" class="${alignClass}">
               <img src="${section.url}" alt="${section.caption || ''}" class="w-full h-auto rounded-lg shadow-lg" />
               ${section.caption ? `<p class="text-xs text-center mt-4 opacity-60">${section.caption}</p>` : ''}
            </div>`;
        }
        else if (section.type === 'image_text') {
            const isRight = section.imagePosition === 'right';
            const inner = `
                <h3 class="font-medium tracking-widest mb-6 leading-tight ${textClasses}" style="font-size: ${data.fontSize.sectionTitle}rem;">${section.title}</h3>
                <p class="leading-loose whitespace-pre-wrap font-light ${textClasses}" style="font-size: ${data.fontSize.body}rem;">${section.content}</p>
            `;

            contentHtml = `
              <div class="flex flex-col md:flex-row gap-10 items-center">
                 <div class="w-full md:w-1/2 ${isRight ? 'md:order-2' : ''}">
                    <img src="${section.image}" alt="${section.title}" class="w-full h-auto rounded-lg shadow-lg object-cover aspect-[4/3]" />
                 </div>
                 <div class="w-full md:w-1/2 ${isRight ? 'md:order-1 md:pr-10' : 'md:pl-10'}">
                    <div class="${containerClasses}">
                        ${inner}
                    </div>
                 </div>
              </div>`;
        }
        else if (section.type === 'heading') {
            const alignClass = section.style === 'center' ? 'text-center' : (section.style === 'right' ? 'text-right' : 'text-left');
            const accent = section.accentColor || data.themeColor || '#3b82f6';
            const textShadowStyle = (section.bgType === 'image') ? 'text-shadow: 2px 2px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 2px 0 0 #fff, -2px 0 0 #fff;' : '';

            contentHtml = `
             <div class="max-w-4xl mx-auto ${alignClass}">
                <div class="inline-block relative px-4 ${containerClasses}">
                  <h2 class="font-black leading-tight tracking-tight mb-2 ${textClasses}" style="font-size: ${data.fontSize.sectionTitle * 1.3}rem; ${textShadowStyle}">${section.text || section.title}</h2>
                  ${section.subText ? `<p class="text-xs md:text-sm opacity-40 font-black tracking-[0.2em] mb-4 uppercase ${textClasses}" style="${textShadowStyle}">${section.subText}</p>` : ''}
                  <div class="w-12 h-1 ${alignClass === 'text-center' ? 'mx-auto' : (alignClass === 'text-right' ? 'ml-auto' : '')} rounded-full" style="background-color: ${accent}"></div>
                </div>
             </div>`;
        }
        else if (section.type === 'video') {
            const youtubeId = getYouTubeId(section.url);
            const width = section.width || 100;
            const alignClass = section.align === 'center' ? 'mx-auto' : (section.align === 'right' ? 'ml-auto' : 'mr-auto');
            let videoTag = '';
            if (youtubeId) {
                videoTag = `<div class="aspect-video w-full rounded-lg shadow-lg overflow-hidden bg-black" style="aspect-ratio: 16/9;"><iframe width="100%" height="100%" src="https://www.youtube.com/embed/${youtubeId}" frameborder="0" allowfullscreen></iframe></div>`;
            } else {
                videoTag = `<video src="${section.url}" autoplay loop muted playsinline class="w-full h-auto rounded-lg shadow-lg" style="aspect-ratio: 16/9;"></video>`;
            }
            contentHtml = `<div style="width: ${width}%;" class="${alignClass}">${videoTag}${section.caption ? `<p class="text-xs text-center mt-4 opacity-60">${section.caption}</p>` : ''}</div>`;
        }
        else if (section.type === 'button') {
            const alignClass = section.align === 'center' ? 'text-center' : (section.align === 'right' ? 'text-right' : 'text-left');
            const color = section.color || '#1f2937';
            const btnStyle = section.style === 'fill' ? `background-color: ${color}; color: #ffffff;` : `background-color: transparent; color: ${color}; border-color: ${color};`;
            const size = section.size || 'M';
            const sizeClass = size === 'S' ? 'px-6 py-2 text-sm' : size === 'M' ? 'px-10 py-4 text-base' : 'px-14 py-5 text-xl';
            const widthStyle = section.width && section.width > 0 ? `width: ${section.width}%; display: inline-flex; justify-content: center;` : '';

            contentHtml = `<div class="max-w-4xl mx-auto ${alignClass}">
                <a href="${section.url}" target="_blank" style="${btnStyle} ${widthStyle}" class="inline-block border rounded-full transition-all ${sizeClass} font-medium tracking-widest">${section.label}</a>
            </div>`;
        }
        else if (section.type === 'pricing') {
            const items = section.plans || section.items || [];
            const design = section.design || 'standard';
            const designTheme = section.theme || {}; // theme object if passed, else fallback
            const baseAccent = section.accentColor || data.themeColor || '#3b82f6';

            // Design Flags
            const isSango = ['gentle', 'standard', 'modern'].includes(design);
            const isSwell = ['masculine', 'stylish'].includes(design);
            const isLuxury = design === 'luxury';
            const isCyber = design === 'cyber';
            const isEarth = design === 'earth';

            const hasManyItems = items.length >= 3;

            const plansHtml = items.map((plan, i) => {
                const isRecommended = plan.recommended || plan.featured || plan.isFeatured;
                const planAccent = plan.color || baseAccent;
                const displayPrice = String(plan.price || '').replace(/[¥￥]/g, '').trim();
                const displayPeriod = String(plan.period || '').replace(/[\/\／]/g, '').trim();

                // 1. Container Classes
                let cardClass = "flex flex-col relative transition-all duration-300 bg-white group overflow-hidden ";
                let cardStyle = "";

                if (isSango) {
                    cardClass += "rounded-[2.5rem] border-4 border-white shadow-xl overflow-visible ";
                    if (isRecommended) cardClass += "ring-4 ring-sky-100 transform translate-y-[-8px] z-10 ";
                    else cardClass += "hover:shadow-2xl hover:-translate-y-2 mt-0 md:mt-4 ";
                } else if (isEarth) {
                    cardClass += "rounded-3xl border-0 ";
                    if (isRecommended) cardClass += "shadow-lg transform scale-105 z-10 ";
                    else cardClass += "shadow hover:shadow-md mt-0 md:mt-4 ";
                    // Earth Tones
                    if (i % 3 === 0) cardClass += "bg-[#edf7ed] ";
                    else if (i % 3 === 1) cardClass += "bg-[#fff8e1] ";
                    else cardClass += "bg-[#fce4ec] ";
                } else if (isSwell) {
                    cardClass += "rounded border bg-white ";
                    if (isRecommended) cardClass += "shadow-xl border-gray-300 transform scale-105 z-10 pt-2 ";
                    else cardClass += "shadow-sm border-gray-100 hover:shadow-lg ";
                    if (isRecommended) cardClass += "mt-0 "; // SWELL Pop effect
                } else if (isLuxury) {
                    cardClass += "rounded-lg border border-[#ca8a04]/30 bg-gradient-to-b from-[#0f172a] to-[#020617] text-white ";
                    if (isRecommended) cardClass += "shadow-[0_0_30px_rgba(202,138,4,0.3)] transform scale-105 z-10 ";
                    else cardClass += "hover:border-[#ca8a04]/60 ";
                } else if (isCyber) {
                    cardClass += "rounded-xl border border-cyan-500/30 bg-[#0f172a] text-cyan-50 ";
                    if (isRecommended) cardClass += "shadow-[0_0_30px_rgba(6,182,212,0.2)] border-cyan-400 transform scale-105 z-10 ";
                    else cardClass += "hover:border-cyan-400/60 ";
                } else {
                    cardClass += "rounded-2xl border border-gray-100 shadow-sm "; // Fallback
                }

                if (isSwell && isRecommended) cardStyle = `border-color: #1e293b;`;

                // 2. Badge HTML
                let badgeHtml = '';
                if (isRecommended) {
                    if (isSango) {
                        badgeHtml = `<div class="absolute top-0 right-0 z-30 pointer-events-none mt-2 mr-2 px-4 py-1 rounded-full bg-yellow-400 text-slate-800 text-[10px] font-black tracking-widest shadow-lg transform rotate-12 border-2 border-white translate-x-1 -translate-y-1">RECOMMENDED</div>`;
                    } else if (isSwell) {
                        badgeHtml = `<div class="absolute top-0 right-0 z-30 pointer-events-none bg-[#1e293b] text-white text-[9px] font-bold tracking-[0.2em] px-4 py-1.5 shadow-md flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>RECOMMENDED</div>`;
                    } else if (isEarth) {
                        badgeHtml = `<div class="absolute top-0 right-0 z-30 pointer-events-none mt-2 mr-2 px-3 py-1 bg-[#8d6e63] text-white text-[9px] font-bold tracking-widest rounded shadow-sm">RECOMMENDED</div>`;
                    } else if (isLuxury) {
                        badgeHtml = `<div class="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent z-30 pointer-events-none"></div>`;
                    } else {
                        badgeHtml = `<div class="absolute top-0 right-0 z-30 bg-blue-500 text-white text-xs px-3 py-1 rounded-bl-lg">RECOMMENDED</div>`;
                    }
                }

                // 3. Header HTML
                let headerClass = `text-center relative `;
                if (isSango) headerClass += "p-8 bg-sky-100 rounded-t-[2.2rem] ";
                else if (isSwell) headerClass += (isRecommended ? "pt-12 pb-6 " : "py-8 ");
                else if (hasManyItems) headerClass += "p-4 ";
                else headerClass += "p-6 ";
                if (isEarth) headerClass += "pt-10 ";

                let titleClass = "font-bold mb-4 tracking-widest ";
                titleClass += hasManyItems ? "text-[10px] " : "text-xs ";
                if (isSango) titleClass += "text-sky-900 ";
                else if (isLuxury) titleClass += "text-amber-400 ";
                else if (isSwell) titleClass += "font-serif text-gray-800 uppercase tracking-[0.2em] ";
                else if (isEarth) titleClass += "text-[#5d4037] ";
                else titleClass += "text-gray-500 ";

                let priceWrapperClass = "flex justify-center items-center gap-1 mb-2 ";
                if (isSango) priceWrapperClass += "text-sky-900 ";

                let priceClass = "font-black tracking-tighter shrink-0 flex items-baseline gap-1 ";
                priceClass += hasManyItems ? "text-2xl md:text-3xl " : "text-3xl md:text-4xl ";
                if (isSwell) priceClass += `font-serif text-gray-900 leading-none ${hasManyItems ? "text-3xl md:text-4xl" : "text-4xl md:text-5xl"} `;
                if (isLuxury) priceClass += "font-serif text-[#f59e0b] ";
                if (isCyber) priceClass += "font-mono text-cyan-400 ";
                if (isEarth) priceClass += "text-[#5d4037] ";

                let priceStyle = (!isSango && !isSwell && !isLuxury && !isCyber && !isEarth) ? `color: ${planAccent};` : '';
                if (section.priceScale) priceStyle += ` font-size: ${section.priceScale * 100}%;`;

                // 4. Features HTML
                const featuresHtml = (plan.features || []).map(f => {
                    let iconBgClass = "flex-shrink-0 flex items-center justify-center mt-1 ";
                    let iconBgStyle = "";
                    let iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${isSango ? 8 : 10}" height="${isSango ? 8 : 10}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${isSango ? 4 : 3}" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

                    if (isSango) iconBgClass += "w-4 h-4 rounded-full bg-yellow-400 text-white shadow-sm ";
                    else if (isSwell) iconBgClass += "text-blue-900 bg-blue-50/50 rounded-full w-4 h-4 ";
                    else if (isLuxury) iconBgClass += "text-amber-500 ";
                    else if (isCyber) iconBgClass += "text-cyan-400 ";
                    else if (isEarth) iconBgClass += "text-[#5d4037] ";
                    else {
                        iconBgClass += "w-4 h-4 ";
                        iconBgStyle = `background-color: ${planAccent}; border-radius: 50%; color: white; padding: 2px;`; // Fallback simple
                    }

                    let textClassFeature = "font-medium tracking-wide ";
                    textClassFeature += hasManyItems ? "text-xs pt-0.5 " : "text-sm pt-0.5 ";
                    if (isLuxury) textClassFeature += "text-gray-300 ";
                    else if (isEarth) textClassFeature += "text-[#5d4037]/80 ";
                    else textClassFeature += "text-gray-600 ";

                    return `<li class="flex items-start gap-2 text-sm leading-snug">
                        <div class="${iconBgClass}" style="${iconBgStyle}">${iconSvg}</div>
                        <span class="${textClassFeature}">${typeof f === 'string' ? f : f.text}</span>
                    </li>`;
                }).join('');

                // 5. Button HTML
                let btnHtml = '';
                if (plan.showButton !== false) {
                    let btnClass = "inline-block w-full py-3 px-4 font-bold transition-all relative overflow-hidden group/btn text-xs tracking-widest ";
                    let btnStyle = "";

                    if (isSango) btnClass += "rounded-full bg-sky-400 text-white shadow-[0_4px_0_#0ea5e9] active:translate-y-1 active:shadow-none hover:bg-sky-300 ";
                    else if (isEarth) btnClass += "rounded-[1rem] bg-[#8d6e63] text-white hover:opacity-90 shadow-md ";
                    else if (isSwell) {
                        btnClass += "rounded border py-3 text-xs transition-all duration-500 ";
                        if (isRecommended) btnClass += "bg-[#1e293b] border-[#1e293b] text-white hover:opacity-90 ";
                        else btnClass += "bg-white border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white ";
                    }
                    else if (isLuxury) btnClass += "border border-[#ca8a04] text-[#ca8a04] hover:bg-[#ca8a04] hover:text-black rounded ";
                    else if (isCyber) btnClass += "border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black shadow-[0_0_15px_rgba(34,211,238,0.3)] rounded ";
                    else {
                        // Fallback
                        btnClass += "rounded-xl text-center shadow-lg transition-transform hover:scale-105 ";
                        btnStyle = `background-color: ${isRecommended ? baseAccent : '#f3f4f6'}; color: ${isRecommended ? '#fff' : '#374151'};`;
                    }

                    btnHtml = `
                    <div class="text-center">
                        <a href="${plan.url || section.url || '#'}" class="${btnClass}" style="${btnStyle}">
                            ${isSwell ? `<div class="absolute top-0 -left-full w-[200%] h-full bg-gradient-to-r from-transparent via-white/60 to-transparent -skew-x-12 group-hover/btn:animate-[shine_0.8s_infinite] pointer-events-none"></div>` : ''}
                            <span class="relative z-10 flex w-full justify-center items-center gap-2">
                                ${plan.buttonLabel || plan.buttonText || "SELECT PLAN"}
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform ${(isSwell || isSango) ? 'group-hover/btn:translate-x-1' : ''}"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </span>
                        </a>
                    </div>`;
                }

                return `
                <div class="${cardClass}" style="${cardStyle}">
                    ${badgeHtml}
                    <div class="${headerClass}">
                        <h4 class="${titleClass}">${plan.name || plan.title}</h4>
                        <div class="${priceWrapperClass}">
                            <div class="${priceClass}" style="${priceStyle}">
                                <span class="font-black opacity-80 ${isSwell ? "text-3xl" : "text-xl md:text-2xl"}">¥</span>
                                ${displayPrice}
                            </div>
                            ${displayPeriod ? `<span class="text-xs opacity-40 font-bold self-end mb-1">/ ${displayPeriod}</span>` : ''}
                        </div>
                        <p class="text-[10px] opacity-60 leading-relaxed min-h-[1.5em] mt-2 px-2 ${isSango ? "text-sky-800/70" : (isEarth ? "text-[#5d4037]/70" : "text-gray-400")}">${plan.desc || plan.description || ''}</p>
                    </div>
                    <div class="p-6 pt-0 flex-1 flex flex-col ${isSango ? "bg-white pt-8 rounded-b-[2.2rem]" : ""} ${isSwell ? "px-6 pb-8 pt-4" : ""} ${hasManyItems ? "p-4" : ""}">
                        <ul class="space-y-3 mb-8 flex-1 ${(isSwell || isSango) ? "px-2" : "px-0"}">
                            ${featuresHtml}
                        </ul>
                        ${btnHtml}
                    </div>
                </div>`;
            }).join('');

            contentHtml = `
            <div class="mx-auto" style="max-width: ${section.contentWidth || 1100}px;">
                ${section.title ? `
                <div class="text-center mb-12">
                    <h3 class="font-black mb-4 text-3xl ${isSwell ? 'text-gray-800 font-bold' : (isLuxury ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 font-serif' : (isEarth ? 'text-[#5d4037] tracking-widest' : (isCyber ? 'text-cyan-400 font-mono' : '')))}">${section.title}</h3>
                    <div class="w-12 h-1 mx-auto rounded-full" style="background-color: ${baseAccent}"></div>
                </div>` : ''}
                <div class="grid gap-6 md:gap-8 items-stretch grid-cols-1 ${items.length === 2 ? 'md:grid-cols-2 max-w-3xl mx-auto' : 'md:grid-cols-3'} md:scale-[1.03] md:origin-top transition-transform">
                    ${plansHtml}
                </div>
            </div>`;
        }
        else if (section.type === 'process') {
            const steps = section.steps || section.items || [];
            const design = section.design || 'standard';
            const accent = section.accentColor || data.themeColor || '#3b82f6';
            const textScale = section.textScale || 1.0;
            const itemSpacing = section.itemSpacing || 64;

            // Design Flags
            const isSango = ['gentle', 'standard', 'modern'].includes(design);
            const isSwell = ['masculine', 'stylish'].includes(design);
            const isLuxury = design === 'luxury';
            const isCyber = design === 'cyber';
            const isEarth = design === 'earth';

            const stepsHtml = steps.map((step, i) => {
                const isReverse = i % 2 === 1;
                const displayNumber = String(i + 1).padStart(2, '0');

                // Container Class (Alternating)
                const containerClass = `flex items-center gap-6 md:gap-10 lg:gap-12 flex-col ${isReverse ? 'md:flex-row-reverse' : 'md:flex-row'}`;

                // Number Badge Logic
                let badgeClass = "w-10 h-10 md:w-14 md:h-14 flex-shrink-0 flex items-center justify-center text-white font-black ";
                if (isSango || isEarth) badgeClass += "rounded-full shadow-lg ";
                else if (isSwell) badgeClass += "rounded-sm ";
                else badgeClass += "rounded-lg ";

                const badgeStyle = `background-color: ${accent}; font-size: 1.5rem;`;

                // Title Class
                let titleClass = "font-black leading-tight text-xl md:text-2xl lg:text-3xl ";
                if (isLuxury) titleClass += "font-serif ";
                if (isCyber) titleClass += "font-mono text-cyan-400 ";
                if (isEarth) titleClass += "font-serif text-[#5d4037] ";

                const titleStyle = `font-size: ${2.25 * textScale}rem;`;

                // Text Class
                let textClass = "opacity-80 leading-loose text-sm md:text-base ";
                if (isLuxury) textClass += "font-serif text-gray-400 ";
                if (isCyber) textClass += "font-mono text-cyan-100/70 ";
                if (isEarth) textClass += "text-[#795548] ";
                else textClass += "text-gray-600 ";

                const textStyle = `font-size: ${1.125 * textScale}rem;`;

                // Image Frame
                let imgFrameClass = "overflow-hidden shadow-2xl transition-all duration-500 group-hover:scale-[1.02] bg-gray-50 flex-1 w-full ";
                if (isSango) imgFrameClass += "rounded-[3rem] ";
                else if (isSwell) imgFrameClass += "rounded-none ";
                else imgFrameClass += "rounded-3xl ";

                if (isLuxury) imgFrameClass += "border border-[#ca8a04]/20 ";
                if (isCyber) imgFrameClass += "border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.1)] ";

                const hasImage = !!getImgUrl(step.image);
                const imgTag = hasImage
                    ? `<img src="${getImgUrl(step.image)}" alt="${step.title}" class="w-full h-full object-cover" />`
                    : `<div class="w-full h-full flex items-center justify-center text-[10px] text-gray-400 font-black bg-gray-100/50">STEP IMAGE</div>`;

                // Big Number (Background)
                let bigNumClass = "absolute font-black opacity-[0.03] leading-none select-none pointer-events-none -top-12 transition-all duration-700 group-hover:opacity-[0.07] ";
                if (i % 2 === 0) bigNumClass += "-left-12 ";
                else bigNumClass += "-right-12 ";

                if (isCyber) bigNumClass += "font-mono text-cyan-500 ";
                if (isSwell) bigNumClass += "font-bold ";

                const bigNumStyle = `font-size: 15rem; color: ${accent};`;

                return `
                <div class="relative group">
                    <div class="${containerClass}">
                        <div class="flex-1 w-full space-y-4">
                            <div class="flex items-center gap-4">
                                <div class="${badgeClass}" style="${badgeStyle}">
                                    ${i + 1}
                                </div>
                                <div class="flex flex-col">
                                    <span class="text-[10px] font-black tracking-widest uppercase opacity-40 ${isCyber ? 'font-mono text-cyan-500/60' : (isLuxury ? 'font-serif text-[#ca8a04]/60' : '')}">Step ${displayNumber}</span>
                                    <div class="h-0.5 w-8 rounded-full opacity-30" style="background-color: ${accent}"></div>
                                </div>
                            </div>
                            <h4 class="${titleClass}" style="${titleStyle}">
                                ${step.title}
                            </h4>
                            <p class="${textClass}" style="${textStyle}">
                                ${step.desc || step.content || step.text}
                            </p>
                        </div>
                        <div class="flex-1 w-full relative">
                            <div class="${imgFrameClass}" style="aspect-ratio: 16/10;">
                                ${imgTag}
                                ${(isLuxury || isCyber) ? `<div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>` : ''}
                            </div>
                            <div class="${bigNumClass}" style="${bigNumStyle}">${i + 1}</div>
                            ${isSwell ? `<div class="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 opacity-20 pointer-events-none" style="border-color: ${accent}"></div>` : ''}
                            ${isLuxury ? `<div class="absolute -top-2 -left-2 w-12 h-12 border-t border-l border-[#ca8a04]/40 pointer-events-none"></div>` : ''}
                        </div>
                    </div>
                </div>`;
            }).join('');

            contentHtml = `
            <div class="px-6 py-10 md:py-16 mx-auto" style="max-width: ${section.contentWidth || 1000}px;">
                ${section.title ? `
                <div class="text-center mb-10 md:mb-16">
                    <h3 class="font-black mb-4 text-3xl md:text-4xl ${isLuxury ? 'font-serif text-transparent bg-clip-text bg-gradient-to-b from-[#fcd34d] to-[#ca8a04]' : (isCyber ? 'font-mono text-cyan-400 tracking-tighter uppercase' : (isEarth ? 'font-serif text-[#5d4037]' : ''))}">${section.title}</h3>
                </div>` : ''}
                <div class="flex flex-col" style="gap: ${itemSpacing}px;">
                    ${stepsHtml}
                </div>
            </div>`;
        }
        else if (section.type === 'staff') {
            const members = section.members || section.items || [];
            const design = section.design || 'standard';
            const accent = section.accentColor || data.themeColor || '#3b82f6';
            const cols = section.cols || 3;
            const colsMobile = section.colsMobile || 1;
            const imgSize = section.imgSize || 128;

            // Design Flags
            const isSango = ['gentle', 'standard', 'modern'].includes(design);
            const isEarth = design === 'earth';
            const isSwell = ['masculine', 'stylish'].includes(design);
            const isLuxury = design === 'luxury';
            const isCyber = design === 'cyber';

            const membersHtml = members.map((member, i) => {
                // Container
                let containerClass = "flex flex-col items-center text-center group relative transition-all duration-300 ";
                if (isSango) containerClass += "hover:-translate-y-2 ";
                else if (isSwell) containerClass += "bg-white p-6 md:p-8 border border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-1 rounded-sm ";
                else if (isLuxury) containerClass += "pb-6 border-b border-[#ca8a04]/20 hover:border-[#ca8a04] transition-colors ";
                else if (isCyber) containerClass += "bg-black/50 p-6 border border-cyan-900/50 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:bg-cyan-950/30 relative overflow-hidden ";
                else if (isEarth) containerClass += "bg-[#fffcf5] p-6 rounded-[2rem] border-2 border-[#d7ccc8] hover:border-[#8d6e63] ";

                // Image Wrapper
                let imgClass = "overflow-hidden mb-6 relative z-10 transition-all duration-500 ";
                if (isSango) imgClass += "rounded-full shadow-lg border-4 border-white ring-4 ring-opacity-20 bg-white ";
                else if (isSwell) imgClass += "rounded-none w-full aspect-square grayscale group-hover:grayscale-0 mb-8 object-top shadow-md ";
                else if (isLuxury) imgClass += "rounded-full border border-[#ca8a04]/40 p-1 bg-gradient-to-br from-black to-gray-900 shadow-[0_4px_20px_rgba(0,0,0,0.4)] ";
                else if (isCyber) imgClass += "rounded-none border-2 border-cyan-500/30 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_cyan] ";
                else if (isEarth) imgClass += "rounded-[30%_70%_70%_30%/30%_30%_70%_70%] border-4 border-[#fffcf5] shadow-md group-hover:border-[#efebe9] ";

                let imgStyle = "";
                if (!isSwell) {
                    imgStyle = `width: ${imgSize}px; height: ${imgSize}px;`;
                }
                if (isCyber) {
                    imgStyle += " clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);";
                }
                if (isSango) {
                    imgStyle += ` --tw-ring-color: ${accent};`;
                }

                // Image Tag
                const imgUrl = getImgUrl(member.image);
                const imgContent = imgUrl
                    ? `<img src="${imgUrl}" alt="${member.name}" class="w-full h-full object-cover transition-transform duration-700 ${!isSwell ? 'group-hover:scale-110' : 'h-full object-center'}" />`
                    : `<div class="w-full h-full flex items-center justify-center text-[10px] font-bold ${isCyber ? 'bg-cyan-950 text-cyan-400' : 'bg-gray-100 text-gray-400'} ${isSwell ? 'bg-gray-50' : ''}">STAFF</div>`;

                // Text
                let nameClass = "font-black text-xl mb-1 ";
                if (isLuxury) nameClass += "font-serif text-[#fcd34d] ";
                else if (isCyber) nameClass += "font-mono text-cyan-400 tracking-wider ";
                else if (isEarth) nameClass += "font-serif text-[#5d4037] ";
                else nameClass += "text-gray-900 ";

                let roleClass = "text-xs font-bold uppercase tracking-widest mb-3 ";
                if (isLuxury) roleClass += "text-[#ca8a04] ";
                else if (isCyber) roleClass += "text-cyan-600 ";
                else if (isEarth) roleClass += "text-[#8d6e63] ";
                else roleClass += "text-gray-400 ";

                let descClass = "text-sm leading-relaxed ";
                if (isLuxury) descClass += "text-gray-400 font-serif ";
                else if (isCyber) descClass += "text-cyan-100/70 font-mono text-xs ";
                else if (isEarth) descClass += "text-[#795548] ";
                else descClass += "text-gray-600 ";

                return `
                <div class="${containerClass}">
                    ${isCyber ? `<div class="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500"></div><div class="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500"></div><div class="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500"></div><div class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500"></div>` : ''}
                    <div class="${imgClass}" style="${imgStyle}">
                        ${imgContent}
                    </div>
                    <div class="relative z-10 w-full">
                        <h4 class="${nameClass}">${member.name}</h4>
                        <p class="${roleClass}">${member.role || member.position || ''}</p>
                        <p class="${descClass}">${member.desc || member.description || ''}</p>
                    </div>
                </div>`;
            }).join('');

            // Title Class
            let titleClass = "font-black mb-6 leading-tight text-2xl md:text-4xl ";
            if (isLuxury) titleClass += "font-serif text-transparent bg-clip-text bg-gradient-to-b from-[#fcd34d] to-[#ca8a04] ";
            else if (isCyber) titleClass += "font-mono text-cyan-400 tracking-widest uppercase drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] ";
            else if (isSwell) titleClass += "tracking-tighter text-[#0f172a] ";
            else if (isEarth) titleClass += "font-serif text-[#5d4037] ";

            contentHtml = `
            <div class="mx-auto px-6 py-10 md:py-16" style="max-width: ${section.contentWidth || 1000}px;">
                ${section.title ? `
                <div class="text-center mb-12 md:mb-20">
                    <h3 class="${titleClass}">${section.title}</h3>
                    <div class="w-16 h-1 mx-auto rounded-full ${isCyber ? 'shadow-[0_0_15px_cyan]' : ''}" style="background-color: ${isCyber ? '#06b6d4' : accent};"></div>
                </div>` : ''}
                <div class="grid gap-8 md:gap-12 grid-cols-${colsMobile || 1} md:grid-cols-${cols || 3}">
                    ${membersHtml}
                </div>
            </div>`;
        }
        // Correct type check for FAQ
        // NOTE: In Exporter.js it might be merged or separate.
        // Let's check typical structure.
        // Search for "section.type === 'faq'"
        else if (section.type === 'faq' || section.type === 'accordion') {
            const items = section.items || [];
            const design = section.design || 'standard';
            const theme = getDesignTheme(design);
            const accent = section.accentColor || data.themeColor || theme.primary;
            const disableAccordion = section.disableAccordion;

            // Toggle State (Static export = open all or script)
            // For export, we use details/summary for simple accordion logic.

            // Design Flags
            const isSango = ['gentle', 'standard', 'modern'].includes(design);
            const isSwell = ['masculine', 'stylish'].includes(design);
            const isLuxury = design === 'luxury';
            const isCyber = design === 'cyber';
            const isEarth = design === 'earth';

            const itemsHtml = items.map((item, i) => {
                const Tag = disableAccordion ? 'div' : 'details';
                const SummaryTag = disableAccordion ? 'div' : 'summary';

                // Container Styles
                let containerClass = "relative transition-all duration-300 z-10 mb-4 group ";
                if (isSango) containerClass += "bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md";
                else if (isSwell) containerClass += "bg-white border border-[#1e293b]/20 rounded-sm hover:shadow-md hover:border-[#1e293b]/40";
                else if (isLuxury) containerClass += "bg-[#0f172a] border border-[#ca8a04]/30 rounded-lg overflow-hidden";
                else if (isCyber) containerClass += "bg-black/80 border border-cyan-900/50 hover:border-cyan-400/50 transition-colors backdrop-blur-sm";
                else if (isEarth) containerClass += "bg-[#fffcf5] border-2 border-[#d7ccc8] rounded-[1.5rem]";
                else containerClass += "bg-white rounded-lg shadow-sm border border-gray-100";

                // Question Styles
                let qClass = clsx("flex items-start gap-4 p-5 relative select-none cursor-pointer list-none", isSwell && "px-6 py-4 border-l-4 border-transparent hover:border-[#1e293b] transition-colors", (isSango || isEarth) && "items-center");

                // Icon Styles
                let iconClass = clsx("flex-shrink-0 flex items-center justify-center font-black",
                    isSango && "w-10 h-10 rounded-full text-white shadow-md text-lg",
                    isSwell && "text-xl font-serif italic text-blue-900",
                    isLuxury && "text-2xl font-serif text-[#fcd34d]",
                    isCyber && "w-8 h-8 rounded border border-cyan-400 text-cyan-400 text-sm shadow-[0_0_10px_rgba(34,211,238,0.5)]",
                    isEarth && "w-10 h-10 rounded-full bg-[#8d6e63] text-white"
                );
                let iconStyle = (isSango) ? `background-color: ${accent}` : '';

                // Text Styles
                let titleClass = clsx("flex-1 font-bold leading-relaxed text-base", isLuxury && "font-serif text-gray-200", isCyber && "font-mono text-cyan-100", isSwell && "text-[#334155]", isEarth && "text-[#5d4037]");

                // Toggle Icon
                let toggleIcon = '';
                if (!disableAccordion) {
                    toggleIcon = `<div class="flex-shrink-0 transition-transform duration-300 group-open:rotate-180 ${isSango ? "text-gray-400" : (isLuxury ? "text-[#ca8a04]" : (isCyber ? "text-cyan-400" : ""))}">
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 1L6 6L11 1"></path></svg>
                    </div>`;
                }

                // Answer Styles
                let answerContainerClass = clsx("p-5 pt-0 flex items-start gap-4", isSwell && "px-6 pb-6", isLuxury && "bg-[#0f172a] p-6 pt-2 border-t border-[#ca8a04]/10", isCyber && "bg-cyan-950/20 p-5 border-t border-cyan-900/30", isEarth && "pt-2");
                let aIconClass = clsx("flex-shrink-0 flex items-center justify-center font-black", isSango && "w-10 h-10 rounded-full bg-gray-100 text-gray-500 text-lg", isSwell && "text-xl font-serif italic text-red-400", isLuxury && "text-2xl font-serif text-gray-600", isCyber && "w-8 h-8 text-cyan-700 text-sm", isEarth && "w-10 h-10 rounded-full border-2 border-[#d7ccc8] text-[#8d6e63]");
                let answerTextClass = clsx("flex-1 text-sm leading-loose whitespace-pre-wrap", isSango && "text-gray-600", isSwell && "text-gray-500", isLuxury && "font-serif text-gray-400", isCyber && "font-mono text-cyan-200/70", isEarth && "text-[#795548]");

                return `
                <${Tag} class="${containerClass}" ${disableAccordion ? '' : ''}>
                    <${SummaryTag} class="${qClass}">
                        <div class="${iconClass}" style="${iconStyle}">Q${isSwell ? '.' : ''}</div>
                        <h4 class="${titleClass}">${item.q || item.question || item.title}</h4>
                        ${toggleIcon}
                    </${SummaryTag}>
                    <div class="${disableAccordion ? '' : 'group-open:animate-fadeIn'}">
                        <div class="${answerContainerClass}">
                            <div class="${aIconClass}">A${isSwell ? '.' : ''}</div>
                            <div class="${answerTextClass}">${item.a || item.answer || item.content}</div>
                        </div>
                    </div>
                </${Tag}>`;
            }).join('');

            contentHtml = `<div class="max-w-3xl mx-auto space-y-4">${itemsHtml}</div>`;
        }
        else if (section.type === 'comparison') {
            const items = section.rows || section.items || [];
            const headers = section.headers || ["項目", "自社サービス", "他社サービス"];
            const design = section.design || 'standard';
            const theme = getDesignTheme(design); // Added theme
            const accent = section.accentColor || data.themeColor || theme.primary; // Updated accent

            // Design Flags
            const isSango = ['gentle', 'standard', 'modern'].includes(design);
            const isSwell = ['masculine', 'stylish'].includes(design);
            const isLuxury = design === 'luxury';
            const isCyber = design === 'cyber';
            const isEarth = design === 'earth';

            // Size Controls
            const cellPadding = 16;
            const minWidth = 120;
            const isMobile = false; // Export assumes desktop-ish or responsive, but hard to conditionalize. Use standard.

            // Icon Helper
            const getSymbolIcon = (val) => {
                const value = String(val).trim();
                // 1. Double Circle (◎)
                if (['◎', 'excellent'].includes(value)) {
                    return `<div class="flex items-center justify-center"><div class="rounded-full flex items-center justify-center border-4 ${isCyber ? "border-pink-500 shadow-[0_0_10px_#ec4899]" : "border-rose-500"}" style="width: 32px; height: 32px; border-color: ${!isCyber ? (isLuxury ? '#d97706' : '#ef4444') : ''}"><div class="rounded-full ${isCyber ? "bg-pink-500 shadow-[0_0_5px_#ec4899]" : "bg-rose-500"}" style="width: 16px; height: 16px; background-color: ${!isCyber ? (isLuxury ? '#d97706' : '#ef4444') : ''}"></div></div></div>`;
                }
                // 2. Circle (◯)
                if (['◯', 'o', 'ok', 'true'].includes(value)) {
                    return `<div class="flex items-center justify-center"><div class="rounded-full border-4 ${isCyber ? "border-cyan-400 shadow-[0_0_8px_cyan]" : ""}" style="width: 32px; height: 32px; border-color: ${isCyber ? '' : '#3b82f6'}"></div></div>`;
                }
                // 3. Triangle (△)
                if (value === '△') {
                    return `<div class="flex items-center justify-center pb-1"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="${isCyber ? "text-yellow-400 drop-shadow-[0_0_5px_yellow]" : "text-yellow-500"}"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path></svg></div>`;
                }
                // 4. Cross (×)
                if (['×', 'x', 'false'].includes(value)) {
                    return `<div class="flex items-center justify-center"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="${isCyber ? "text-gray-700" : "text-gray-300"}"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></div>`;
                }
                // Text
                return `<span class="font-bold leading-tight text-sm" style="color: ${isCyber ? '#22d3ee' : ''}">${val}</span>`;
            };

            const headersHtml = headers.map((h, i) => {
                let thStyle = `padding: ${cellPadding}px 16px; min-width: ${i === 0 ? 180 : minWidth}px; `;
                if (isEarth) thStyle += "border-color: #d7ccc8; ";

                let thClass = "text-center font-bold sticky top-0 z-20 border-b border-r last:border-r-0 ";
                if (isSwell) thClass += (i === 0 ? "bg-[#f1f5f9] text-gray-700 border-gray-300" : (i === 1 ? "bg-[#1e293b] text-white border-[#1e293b]" : "bg-white text-gray-600 border-gray-200"));
                else thClass += "bg-transparent border-gray-100 ";
                if (isEarth) thClass += "border-gray-300 bg-[#fffcf5] ";
                if (isCyber) thClass += "border-cyan-500/30 text-cyan-400 ";

                let inner = h;
                if (isSango && i === 1) inner = `<div class="inline-block px-3 py-1 rounded-full text-white shadow-md font-bold" style="background-color: ${accent}">${h}</div>`;
                if (isLuxury && i === 1) inner = `<span class="text-transparent bg-clip-text bg-gradient-to-b from-[#fcd34d] to-[#ca8a04]">${h}</span>`;

                return `<th class="${thClass}" style="${thStyle}">${inner}</th>`;
            }).join('');

            const rowsHtml = items.map((row, rIdx) => {
                const cellsHtml = row.map((cell, cIdx) => {
                    let tdClass = "align-middle text-center border-b border-r last:border-r-0 transition-all ";
                    if (isSwell) tdClass += (cIdx === 0 ? "bg-white font-bold text-gray-700 border-gray-300" : (cIdx === 1 ? "bg-[#f8fafc] font-bold border-[#1e293b] border-x-2" : "bg-white text-gray-500 border-gray-200"));
                    else tdClass += (isCyber ? "border-cyan-900/30" : "border-gray-200");
                    if (isEarth) tdClass += "border-[#d7ccc8] text-[#5d4037]";
                    if (cIdx === 0) tdClass += " font-bold text-gray-700 ";

                    let tdStyle = `padding: ${cellPadding}px 16px; `;
                    return `<td class="${tdClass}" style="${tdStyle}">${cIdx === 0 ? cell : getSymbolIcon(cell)}</td>`;
                }).join('');
                return `<tr class="group hover:bg-black/5 ${isCyber ? 'hover:bg-cyan-900/10' : ''}">${cellsHtml}</tr>`;
            }).join('');

            let containerClass = "w-full relative overflow-hidden rounded-xl ";
            if (isSango) containerClass += "shadow-2xl bg-white p-6";
            if (isSwell) containerClass += "border border-gray-200 shadow-xl bg-white";
            if (isLuxury) containerClass += "bg-[#0f172a] border border-[#ca8a04]/30 p-4";
            if (isCyber) containerClass += "bg-black p-1 shadow-[0_0_50px_rgba(6,182,212,0.3)] border border-cyan-500/50";
            if (isEarth) containerClass += "bg-[#fffcf5] border-2 border-[#8d6e63] rounded-[2rem] p-4";

            contentHtml = `
            <div class="mx-auto" style="max-width: ${section.contentWidth || 1000}px;">
                ${section.title ? `<div class="text-center mb-8 md:mb-16"><h3 class="font-black mb-4 text-3xl ${isLuxury ? 'text-yellow-600' : ''}">${section.title}</h3></div>` : ''}
                <div class="${containerClass}">
                    <div class="overflow-x-auto relative z-10">
                        <table class="w-full border-separate border-spacing-0 ${isSwell ? 'border-collapse' : ''}">${rowsHtml}</table>
                    </div>
                </div>
            </div>`;
        }
        else if (section.type === 'access') {
            const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(section.address || '')}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
            contentHtml = `
            <div class="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
                <div class="w-full md:w-1/2 min-h-[300px] bg-gray-200 rounded-2xl overflow-hidden shadow-lg relative">
                    <iframe width="100%" height="100%" frameborder="0" src="${mapUrl}" class="absolute inset-0"></iframe>
                </div>
                <div class="w-full md:w-1/2 space-y-6 flex flex-col justify-center">
                    <h3 class="text-2xl font-bold border-l-4 border-blue-600 pl-4">${section.title || "ACCESS"}</h3>
                    <div class="space-y-4 text-sm text-gray-600">
                        <p><span class="font-bold mr-4">住所</span>${section.address || ""}</p>
                        ${section.access ? `<p><span class="font-bold mr-4">アクセス</span>${section.access}</p>` : ''}
                        ${section.hours ? `<p><span class="font-bold mr-4">営業時間</span>${section.hours}</p>` : ''}
                        ${section.tel ? `<p><span class="font-bold mr-4">電話番号</span>${section.tel}</p>` : ''}
                    </div>
                </div>
            </div>`;
        }
        else if (section.type === 'review') {
            const items = section.items || section.reviews || [];
            const design = section.design || 'standard';
            const theme = getDesignTheme(design);
            const accent = section.accentColor || data.themeColor || theme.primary;
            const imagePos = section.imagePos || 'top';

            // Design Flags
            const isSango = ['gentle', 'standard', 'modern'].includes(design);
            const isSwell = ['masculine', 'stylish'].includes(design);
            const isLuxury = design === 'luxury';
            const isCyber = design === 'cyber';
            const isEarth = design === 'earth';

            const enableScroll = items.length >= 4;
            const isVertical = imagePos === 'top' || imagePos === 'bottom';
            const isReverse = imagePos === 'bottom';

            // Helper for Stars
            const renderStars = (rating) => {
                return Array(5).fill(0).map((_, i) => {
                    const fill = i < (rating || 5) ? (isLuxury ? '#ca8a04' : (isCyber ? '#22d3ee' : accent)) : 'none';
                    const stroke = i < (rating || 5) ? (isLuxury ? '#ca8a04' : (isCyber ? '#22d3ee' : accent)) : '#e5e7eb';
                    return `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="${fill}" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
                }).join('');
            };

            const itemsHtml = items.map(item => {
                // Container Classes
                let containerClass = "flex transition-all duration-300 relative group ";
                if (enableScroll) containerClass += "flex-shrink-0 w-[85vw] md:w-[350px] snap-center ";
                else containerClass += "w-full ";

                if (isVertical) containerClass += isReverse ? "flex-col-reverse " : "flex-col ";
                else containerClass += "flex-row items-center ";

                if (isSango) containerClass += "bg-white p-6 rounded-[2rem] shadow-lg border border-gray-100 hover:-translate-y-1 ";
                else if (isSwell) containerClass += "bg-white p-6 rounded-sm border border-gray-200 shadow-sm hover:shadow-lg ";
                else if (isLuxury) containerClass += "bg-[#0f172a] p-8 border border-[#ca8a04]/30 rounded-lg ";
                else if (isCyber) containerClass += "bg-black/80 p-6 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)] relative overflow-hidden ";
                else if (isEarth) containerClass += "bg-[#fffcf5] p-6 border-2 border-[#d7ccc8] rounded-[1.5rem] relative ";
                else containerClass += "bg-white p-6 rounded-lg shadow-sm border border-gray-100 "; // Fallback

                // Image Wrapper
                let imgWrapperClass = "flex-shrink-0 relative ";
                if (isVertical) imgWrapperClass += "mb-4 mx-auto ";
                else imgWrapperClass += "mr-6 ";
                if (isReverse && isVertical) imgWrapperClass += "mt-4 mb-0 ";

                if (isSango) imgWrapperClass += "filter drop-shadow-md ";
                if (isCyber) imgWrapperClass += "filter drop-shadow-[0_0_5px_cyan] ";

                // Image Inner
                let imgInnerClass = "overflow-hidden object-cover flex items-center justify-center ";
                imgInnerClass += isVertical ? "w-20 h-20 " : "w-16 h-16 md:w-20 md:h-20 ";

                if (isSango) imgInnerClass += "rounded-full ring-4 ring-white ";
                else if (isSwell) imgInnerClass += "rounded-full border border-gray-200 ";
                else if (isLuxury) imgInnerClass += "rounded-full border-2 border-[#ca8a04] p-0.5 ";
                else if (isCyber) imgInnerClass += "rounded-lg border border-cyan-400 ";
                else if (isEarth) imgInnerClass += "rounded-[30%_70%_70%_30%/30%_30%_70%_70%] border-2 border-[#8d6e63] ";
                else imgInnerClass += "rounded-full bg-gray-100 ";

                if (!item.image) imgInnerClass += (item.gender === 'female' ? " bg-pink-50 text-pink-500 " : " bg-blue-50 text-blue-500 ");

                // Image Content
                let imgContent = '';
                if (item.image) {
                    imgContent = `<img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover" />`;
                } else {
                    const iconPath = item.gender === 'female'
                        ? `<path d="M12 2C9.24 2 7 4.24 7 7C7 9.4 8.7 11.4 10.9 11.9C6.8 12.6 4 15.8 4 20C4 20.6 4.4 21 5 21H19C19.6 21 20 20.6 20 20C20 15.8 17.2 12.6 13.1 11.9C15.3 11.4 17 9.4 17 7C17 4.24 14.76 2 12 2ZM8 20C8.6 16.5 11 14 12 14C13 14 15.4 16.5 16 20H8ZM12 4C13.66 4 15 5.34 15 7C15 8.66 13.66 10 12 10C10.34 10 9 8.66 9 7C9 5.34 10.34 4 12 4Z"></path>`
                        : `<path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"></path>`;
                    imgContent = `<svg viewBox="0 0 24 24" fill="currentColor" class="w-2/3 h-3/4">${iconPath}</svg>`;
                }

                // Text Content
                let contentClass = "flex-1 min-w-0 " + (isVertical ? "text-center " : "");
                let textStyleClass = "text-sm mb-4 leading-relaxed whitespace-pre-wrap ";
                if (isSango) textStyleClass += "text-gray-600 font-medium ";
                else if (isSwell) textStyleClass += "text-gray-600 ";
                else if (isLuxury) textStyleClass += "text-gray-300 font-serif italic ";
                else if (isCyber) textStyleClass += "text-cyan-200/80 font-mono text-xs ";
                else if (isEarth) textStyleClass += "text-[#5d4037] ";
                else textStyleClass += "text-gray-600 ";

                // Name Block
                let nameBlockClass = "border-t pt-3 ";
                if (isLuxury) nameBlockClass += "border-[#ca8a04]/20 ";
                else if (isCyber) nameBlockClass += "border-cyan-900/50 ";
                else if (isEarth) nameBlockClass += "border-[#d7ccc8] ";
                else nameBlockClass += "border-gray-100 ";

                let nameClass = "font-bold text-sm truncate ";
                if (isSwell) nameClass += "text-gray-800 ";
                else if (isLuxury) nameClass += "text-[#fcd34d] font-serif ";
                else if (isCyber) nameClass += "text-cyan-400 font-mono tracking-wider ";
                else if (isEarth) nameClass += "text-[#5d4037] ";

                let roleClass = "text-[10px] uppercase tracking-widest opacity-50 truncate ";
                if (isLuxury) roleClass += "text-[#ca8a04] ";
                else if (isCyber) roleClass += "text-cyan-600 ";

                return `
                <div class="${containerClass}">
                    ${isCyber ? `<div class="absolute top-0 right-0 w-20 h-20 bg-cyan-500/20 blur-[40px] rounded-full pointer-events-none"></div>` : ''}
                    <div class="${imgWrapperClass}">
                        <div class="${imgInnerClass}">
                            ${imgContent}
                        </div>
                        ${isSango ? `<div class="absolute -bottom-1 -right-1 bg-yellow-400 text-white p-1 rounded-full shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-5.82 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></div>` : ''}
                    </div>
                    <div class="${contentClass}">
                        <div class="flex gap-1 mb-3 ${isVertical ? 'justify-center' : ''}">${renderStars(item.rating)}</div>
                        <div class="${textStyleClass}">"${item.content || item.text || item.comment || ''}"</div>
                        <div class="${nameBlockClass}">
                            <h4 class="${nameClass}">${item.name || 'User'}</h4>
                            <p class="${roleClass}">${item.role || item.position || ''}</p>
                        </div>
                    </div>
                </div>`;
            }).join('');

            let layoutClass = "";
            let layoutStyle = "";
            if (enableScroll) {
                layoutClass = "flex overflow-x-auto pb-8 snap-x gap-4 px-4 -mx-4 md:px-0 md:mx-0 scrollbar-hide";
            } else {
                layoutClass = "grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-3";
            }

            contentHtml = `
            <div class="mx-auto" style="max-width: ${section.contentWidth || 1100}px;">
                ${section.title ? `
                <div class="text-center mb-12 md:mb-16">
                    <h2 class="font-black mb-6 leading-tight text-3xl md:text-4xl ${isLuxury ? 'text-transparent bg-clip-text bg-gradient-to-b from-[#fcd34d] to-[#ca8a04] font-serif' : (isCyber ? 'text-cyan-400 font-mono tracking-widest uppercase drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]' : (isSwell ? 'tracking-tighter text-[#0f172a]' : (isEarth ? 'text-[#5d4037] font-serif' : '')))}">${section.title}</h2>
                    <div class="w-12 h-1 mx-auto rounded-full ${isCyber ? 'shadow-[0_0_15px_cyan]' : ''}" style="background-color: ${isCyber ? '#06b6d4' : accent}"></div>
                </div>` : ''}
                <div class="${layoutClass}" style="${layoutStyle}">
                    ${itemsHtml}
                </div>
            </div>`;
        }
        else if (section.type === 'links') {
            const linksTag = section.links.map(link => `
                <a href="${link.url}" target="_blank" class="group relative overflow-hidden bg-white/5 backdrop-blur-sm border border-current/10 rounded-lg p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 block text-left">
                    <div class="flex justify-between items-center relative z-10">
                        <div>
                            <div class="text-base md:text-lg font-medium tracking-wide mb-1">${link.label}</div>
                            ${link.subtext ? `<div class="text-xs opacity-60 font-light">${link.subtext}</div>` : ''}
                        </div>
                        <div class="w-8 h-8 rounded-full border border-current/20 flex items-center justify-center group-hover:bg-current group-hover:text-white group-hover:border-transparent transition-all"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></div>
                    </div>
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full"></div>
                </a>`).join('');
            contentHtml = `<div class="grid grid-cols-1 gap-4 max-w-md mx-auto">${linksTag}</div>`;
        }
        else if (section.type === 'columns') {
            const gridClass = section.columnCount === 3 ? 'md:grid-cols-3' : (section.columnCount === 2 ? 'md:grid-cols-2' : 'grid-cols-1');
            let itemsTag = '';
            section.items.forEach(item => {
                if (section.colType === 'card') {
                    itemsTag += `<div class="flex flex-col space-y-4"><div class="aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-100"><img src="${item.image}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" /></div><div><h4 class="text-lg font-medium mb-1">${item.title}</h4><p class="text-xs opacity-70">${item.text}</p></div></div>`;
                } else if (section.colType === 'text') {
                    itemsTag += `<div class="p-6 bg-white/5 rounded-lg border border-current/10 h-full"><h4 class="text-lg font-bold mb-2">${item.title}</h4><p class="text-sm opacity-80 leading-relaxed">${item.text}</p></div>`;
                } else if (section.colType === 'image') {
                    itemsTag += `<div class="aspect-square w-full overflow-hidden rounded-lg shadow-sm"><img src="${item.image}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></div>`;
                } else if (section.colType === 'social') {
                    if (item.platform === 'twitter') itemsTag += `<div class="flex justify-center overflow-hidden"><blockquote class="twitter-tweet" data-theme="light"><a href="${item.url}"></a></blockquote></div>`;
                } else if (section.colType === 'video') {
                    const yId = getYouTubeId(item.url);
                    itemsTag += `<div class="aspect-video w-full rounded-lg overflow-hidden bg-black shadow" style="aspect-ratio: 16/9;"><iframe width="100%" height="100%" src="https://www.youtube.com/embed/${yId}" frameborder="0" allowfullscreen></iframe></div>`;
                }
            });
            contentHtml = `<div class="grid grid-cols-1 ${gridClass} gap-8 md:gap-8">${itemsTag}</div>`;
        }
        else if (section.type === 'conversion_panel') {
            const items = section.plans || section.items || [];
            const design = section.design || 'standard';
            const theme = getDesignTheme(design);
            const accent = section.accentColor || data.themeColor || theme.primary;

            // Design Flags
            const isSango = ['gentle', 'standard', 'modern'].includes(design);
            const isSwell = ['masculine', 'stylish'].includes(design);
            const isLuxury = design === 'luxury';
            const isCyber = design === 'cyber';
            const isEarth = design === 'earth';

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
                if (iconName === 'cart') return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`;
                if (iconName === 'line') return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`;
                if (iconName === 'link') return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;
                return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:translate-x-1"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`;
            };

            // Container Classes
            let containerClass = "mx-auto overflow-hidden relative isolate transition-all px-6 py-12 md:px-16 md:py-20 text-center ";
            if (isSango) containerClass += "rounded-[2rem] md:rounded-[3rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border-white border-4 ring-1 ring-gray-100 ";
            else if (isEarth) containerClass += "rounded-[1.5rem] md:rounded-[2rem] shadow-lg border-2 border-dashed border-[#8d6e63] bg-[#fffcf5] ";
            else if (isSwell) containerClass += "rounded-sm border border-gray-100 shadow-xl bg-white ";
            else if (isLuxury) containerClass += "bg-gradient-to-br from-[#020617] to-[#0f172a] text-white border border-[#ca8a04]/30 shadow-2xl relative ";
            else if (isCyber) containerClass += "bg-[#0f172a] border-y md:border border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.15)] ";
            else containerClass += "rounded-xl bg-white shadow-xl ";

            // Container Styles
            let containerStyle = `max-width: ${section.contentWidth || 896}px; `;
            if (isSango) {
                containerStyle += `background-color: #ffffff; background-image: radial-gradient(${accent}15 2px, transparent 2px), radial-gradient(${accent}10 1px, transparent 1px); background-size: 32px 32px, 16px 16px; background-position: 0 0, 16px 16px;`;
            } else if (isCyber) {
                containerStyle += `background-image: linear-gradient(rgba(6,182,212,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.1) 1px, transparent 1px); background-size: 40px 40px;`;
            }

            // Title Style
            let titleClass = "font-black mb-6 leading-tight relative inline-block text-2xl md:text-4xl ";
            if (isSango) titleClass += "text-gray-800 ";
            if (isEarth) titleClass += "text-[#5d4037] tracking-widest ";
            if (isSwell) titleClass += "text-gray-900 border-b-2 pb-2 inline-block ";
            if (isLuxury) titleClass += "text-transparent bg-clip-text bg-gradient-to-b from-[#fcd34d] to-[#ca8a04] font-serif tracking-widest font-normal ";
            if (isCyber) titleClass += "text-cyan-400 font-mono tracking-tighter ";

            let titleStyle = "";
            if (isSwell) titleStyle = `border-color: ${accent};`;
            if (section.bgType === 'image') titleStyle += "text-shadow: 2px 2px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 2px 0 0 #fff, -2px 0 0 #fff;";

            // Micro Copy
            const microCopyHtml = section.microCopy ? `<p class="mt-6 text-xs font-bold opacity-50 ${isCyber ? 'text-cyan-600' : ''}">${section.microCopy}</p>` : '';

            // Buttons
            const buttonsHtml = buttons.map(btn => {
                const btnColor = getBtnColor(btn.color);
                let btnClass = "inline-flex items-center justify-center gap-2 font-black tracking-widest transition-all duration-300 group relative whitespace-nowrap px-8 py-5 text-lg w-full md:w-auto md:min-w-[280px] ";

                if (isSango) btnClass += "rounded-full text-white transform active:translate-y-1 active:shadow-none ";
                else if (isEarth) btnClass += "rounded-[1rem] text-white border-2 border-white/20 hover:-rotate-1 ";
                else if (isSwell) btnClass += "rounded-sm text-white overflow-hidden hover:brightness-110 shadow-md hover:shadow-lg ";
                else if (isLuxury) btnClass += "text-[#020617] bg-gradient-to-b from-[#fcd34d] to-[#d97706] hover:to-[#fcd34d] shadow-[0_0_20px_rgba(202,138,4,0.3)] hover:shadow-[0_0_30px_rgba(202,138,4,0.5)] border-none ";
                else if (isCyber) btnClass += "bg-cyan-950/80 text-cyan-400 border border-cyan-400 hover:bg-cyan-400 hover:text-cyan-950 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] font-mono ";
                else btnClass += "bg-gray-800 text-white rounded-lg shadow-lg hover:-translate-y-1 ";

                let btnStyle = `background-color: ${btnColor};`;
                if (isSango) btnStyle = `box-shadow: 0 6px 0 ${btnColor}cc, 0 12px 12px -2px rgba(0,0,0,0.15); background-color: ${btnColor};`;
                if (isEarth) btnStyle = `box-shadow: 3px 3px 0 rgba(93, 64, 55, 0.2); background-color: ${btnColor};`;
                if (isLuxury || isCyber) btnStyle = ``; // gradient/border handled in class

                return `<a href="${btn.url || '#'}" class="${btnClass}" style="${btnStyle}">
                    ${isSwell ? `<div class="absolute top-0 -left-full w-1/2 h-full bg-white/20 skew-x-[-20deg] group-hover:animate-[shine_0.75s_infinite]"></div>` : ''}
                    <span class="relative z-10 flex items-center gap-2">
                        ${getBtnIcon(btn.icon)}
                        ${btn.label || "CONTACT US"}
                    </span>
                </a>`;
            }).join('');

            contentHtml = `
            <div class="${containerClass}" style="${containerStyle}">
                ${isSwell ? `<div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-gray-50 to-transparent -z-10 rounded-bl-full opacity-50"></div><div class="absolute bottom-0 left-0 w-32 h-32 border-t border-r border-gray-100 -z-10"></div>` : ''}
                ${isEarth ? `<div class="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none" style="background-image: url('https://www.transparenttextures.com/patterns/cream-paper.png')"></div>` : ''}
                ${isLuxury ? `<div class="absolute inset-2 border border-[#ca8a04]/20 pointer-events-none"></div><div class="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-[#ca8a04] to-transparent opacity-50 shadow-[0_0_15px_#ca8a04]"></div>` : ''}
                ${isCyber ? `<div class="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent opacity-50"></div>` : ''}

                <h3 class="${titleClass}" style="${titleStyle}">
                    ${section.title || "Ready to get started?"}
                    ${isSango ? `<span class="absolute -bottom-2 left-0 w-full h-3 opacity-30 -rotate-1 rounded-full" style="background-color: ${accent}"></span>` : ''}
                </h3>
                
                <p class="mb-8 leading-relaxed mx-auto max-w-xl text-base ${isLuxury ? 'text-gray-300 font-serif' : (isCyber ? 'text-cyan-200/70 font-mono' : (isEarth ? 'text-[#795548]' : 'text-gray-600'))}">
                    ${section.content || section.text || "今すぐ無料体験にお申し込みいただき、ビジネスを加速させましょう。"}
                </p>

                <div class="flex flex-wrap justify-center gap-4">
                    ${buttonsHtml}
                </div>
                ${microCopyHtml}
            </div>`;
        }
        else if (section.type === 'point_list') {
            const items = section.items || [];
            const design = section.design || 'standard';
            const theme = getDesignTheme(design);
            const baseAccent = section.badgeColor || data.themeColor || theme.primary;

            // Design Flags
            const isSango = ['gentle', 'standard', 'modern'].includes(design);
            const isSwell = ['masculine', 'stylish'].includes(design);
            const isLuxury = design === 'luxury';
            const isCyber = design === 'cyber';
            const isEarth = design === 'earth';

            const itemsHtml = items.map((item, index) => {
                const displayNumber = String(index + 1).padStart(2, '0');
                const itemAccent = item.color || baseAccent;
                const isVertical = section.layout === 'vertical';
                const isMobile = false; // Always responsive logic

                // Container Logic
                let containerClass = "flex group transition-all duration-500 relative ";
                if (isVertical) containerClass += "flex-col md:flex-row md:items-center md:gap-12 md:text-left ";
                else containerClass += "flex-col ";

                if (!isVertical && isSango) containerClass += "items-center text-center ";
                if (!isVertical && isSwell) containerClass += "items-start text-left ";
                if (!isVertical && isEarth) containerClass += "items-center text-center ";

                // Image Area Class
                let imgAreaClass = "relative transition-all duration-500 shrink-0 ";
                if (isVertical) imgAreaClass += "w-full md:w-1/3 mb-6 md:mb-0 ";
                else imgAreaClass += "w-full mb-6 max-w-[400px] mx-auto "; // fallback max-width for column layout

                if (isSango) imgAreaClass += "rounded-[2.5rem] overflow-visible group-hover:-translate-y-2 ";
                if (isSwell) imgAreaClass += "rounded overflow-hidden shadow-sm group-hover:shadow-xl group-hover:-translate-y-1 ";
                if (isEarth) imgAreaClass += "rounded-[3rem] overflow-visible border-2 border-dashed border-gray-200 p-2 group-hover:rotate-1 ";
                if (isLuxury) imgAreaClass += "rounded-lg overflow-hidden border border-[#ca8a04]/20 shadow-lg group-hover:border-[#ca8a04]/60 ";
                if (isCyber) imgAreaClass += "rounded-xl overflow-hidden border border-cyan-500/30 bg-[#0f172a] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] ";

                // Badge Logic
                let badgeHtml = '';
                if (isSango) {
                    badgeHtml = `<div class="absolute top-0 left-0 -translate-x-2 -translate-y-2 z-30 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
                        <div class="w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-sm shadow-[0_4px_0_rgba(0,0,0,0.1)] border-4 border-white" style="background-color: ${itemAccent}">
                            ${index + 1}
                        </div>
                    </div>`;
                } else if (isSwell) {
                    badgeHtml = `<div class="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 z-30 pointer-events-none">
                        <div class="text-[60px] font-black text-gray-900/5 leading-none tracking-tighter group-hover:text-gray-900/10 transition-colors">
                            ${displayNumber}
                        </div>
                    </div>`;
                } else if (isEarth) {
                    badgeHtml = `<div class="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 z-30 pointer-events-none">
                        <div class="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold transform -rotate-12 shadow-sm" style="background-color: #8d6e63">
                            ${index + 1}
                        </div>
                    </div>`;
                } else if (isLuxury) {
                    badgeHtml = `<div class="absolute top-4 left-4 z-30 pointer-events-none">
                        <div class="text-[10px] font-bold tracking-[0.3em] text-white/90 bg-black/40 backdrop-blur-sm px-3 py-1 border border-white/20 uppercase">
                            Point ${index + 1}
                        </div>
                    </div>`;
                } else if (isCyber) {
                    badgeHtml = `<div class="absolute top-0 left-0 bg-cyan-500/10 px-3 py-1 border-b border-r border-cyan-500/30 z-30 pointer-events-none">
                        <span class="text-[10px] font-mono text-cyan-400">P${displayNumber}</span>
                    </div>`;
                } else {
                    // Fallback
                    badgeHtml = `<div class="absolute -top-3 -left-3 z-30 bg-blue-600 text-white font-bold w-10 h-10 flex items-center justify-center rounded-full shadow-lg border-2 border-white">${index + 1}</div>`;
                }

                // Image Inner
                let imgInnerClass = "relative aspect-[4/3] w-full bg-gray-50 flex items-center justify-center overflow-hidden ";
                if (isSango) imgInnerClass += "rounded-[2.5rem] shadow-lg border-4 border-white ";
                if (isEarth) imgInnerClass += "rounded-[2.5rem] ";

                const imgUrl = getImgUrl(item.image);
                let imgContent = '';
                if (imgUrl) {
                    imgContent = `<img src="${imgUrl}" alt="${item.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />`;
                } else {
                    imgContent = `<div class="flex flex-col items-center gap-2 opacity-30 group-hover:opacity-50 transition-opacity"><span class="text-[10px] font-black tracking-widest uppercase">Feature</span></div>`;
                }

                // Text Content
                let contentClass = "flex-1 ";
                let titleClass = "font-bold text-xl mb-3 ";
                if (isLuxury) titleClass += "text-[#fcd34d] font-serif ";
                if (isCyber) titleClass += "text-cyan-400 font-mono tracking-wider ";
                if (isEarth) titleClass += "text-[#5d4037] font-serif ";
                if (isSwell) titleClass += "text-gray-800 ";
                if (isSango) titleClass += "text-gray-800 ";

                let descClass = "leading-relaxed text-sm ";
                if (isLuxury) descClass += "text-gray-400 font-serif ";
                if (isCyber) descClass += "text-cyan-100/70 font-mono text-xs ";
                if (isEarth) descClass += "text-[#795548] ";
                if (isSwell) descClass += "text-gray-600 ";
                if (isSango) descClass += "text-gray-600 ";

                return `
                <div class="${containerClass}">
                    <div class="${imgAreaClass}">
                        ${badgeHtml}
                        <div class="${imgInnerClass}">
                            ${imgContent}
                            ${isLuxury ? `<div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>` : ''}
                        </div>
                    </div>
                    <div class="${contentClass}">
                        <h3 class="${titleClass}">${item.title}</h3>
                        <p class="${descClass}">${item.desc || item.description}</p>
                    </div>
                </div>`;
            }).join('');

            const gridClass = (section.layout === 'vertical') ? "grid-cols-1" : "grid-cols-1 md:grid-cols-3";
            const gap = section.itemSpacing || 48;

            contentHtml = `
            <div class="mx-auto" style="max-width: ${section.contentWidth || 1000}px;">
                <div class="grid ${gridClass}" style="gap: ${gap}px;">
                    ${itemsHtml}
                </div>
            </div>`;
        }
        else if (section.type === 'problem_checklist') {
            const items = section.items || [];
            const design = section.design || 'standard';
            const theme = getDesignTheme(design);
            const accent = section.accentColor || data.themeColor || theme.primary;

            // Design Flags
            const isSango = ['gentle', 'standard', 'modern'].includes(design);
            const isEarth = design === 'earth';
            const isSwell = ['masculine', 'stylish'].includes(design);
            const isLuxury = design === 'luxury';
            const isCyber = design === 'cyber';

            const itemsHtml = items.map((item, i) => {
                // Container Classes
                let itemClass = "flex items-start gap-4 transition-all duration-300 relative group ";
                if (isSango) itemClass += "bg-white rounded-[1.2rem] py-2 px-2 shadow-md border border-gray-100 md:rounded-[2rem] md:p-4 md:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.1)] md:hover:shadow-xl md:hover:-translate-y-1 ";
                else if (isSwell) itemClass += "bg-white py-2 px-2 shadow-sm border border-gray-100 flex items-center md:p-4 md:hover:shadow-md ";
                else if (isEarth) itemClass += "bg-[#fffcf5] py-2 px-2 rounded-[1.2rem] border-2 border-dashed border-[#8d6e63]/30 md:p-4 md:rounded-[2rem] md:hover:border-[#8d6e63]/50 ";
                else if (isLuxury) itemClass += "bg-gradient-to-r from-[#0f172a] to-[#1e293b] py-2 px-2 border border-[#ca8a04]/20 text-white md:p-4 md:shadow-xl md:hover:border-[#ca8a04]/60 ";
                else if (isCyber) itemClass += "bg-[#0f172a] py-2 px-2 border-l-4 border-cyan-500 md:p-4 md:shadow-[inset_0_0_20px_rgba(6,182,212,0.05)] md:hover:bg-[#16203a] ";
                else itemClass += "bg-white p-4 rounded-lg border border-gray-100 md:hover:shadow-md "; // Fallback

                // Icon Classes
                let iconWrapperClass = "flex-shrink-0 mt-0.5 ";
                let iconClass = "flex items-center justify-center transition-transform group-hover:scale-110 ";

                if (isSango) iconClass += "w-6 h-6 text-white rounded-full shadow-sm md:w-8 md:h-8 md:shadow-md ";
                if (isSwell) iconClass += "w-6 h-6 ";
                if (isEarth) iconClass += "w-7 h-7 border-2 border-[#8d6e63]/30 rounded-full text-[#8d6e63] md:w-10 md:h-10 ";
                if (isLuxury) iconClass += "w-6 h-6 bg-[#ca8a04]/10 rounded border border-[#ca8a04]/30 text-[#ca8a04] ";
                if (isCyber) iconClass += "w-6 h-6 text-red-500 ";

                let iconStyle = "";
                if (isSango) iconStyle = `background-color: ${accent};`;
                if (isSwell) iconStyle = `color: ${accent};`;

                let iconSvg = '';
                if (isCyber) {
                    iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
                } else {
                    iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${isSwell ? 20 : 18}" height="${isSwell ? 20 : 18}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
                }

                // Text Content
                let textClass = "font-bold leading-relaxed text-sm md:text-base flex-1 ";
                if (isLuxury) textClass += "font-serif text-gray-100 tracking-wide ";
                else if (isCyber) textClass += "font-mono text-cyan-50 tracking-tighter ";
                else if (isEarth) textClass += "text-[#5d4037] ";
                else textClass += "text-gray-700 ";

                return `
                <div class="${itemClass}">
                    <div class="${iconWrapperClass}">
                        <div class="${iconClass}" style="${iconStyle}">
                            ${iconSvg}
                        </div>
                    </div>
                    <p class="${textClass}">${item.text || item.content || item.title}</p>
                    ${isSwell ? `<div class="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"><svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>` : ''}
                </div>`;
            }).join('');

            // Footer / Solution Text
            let footerHtml = '';
            if (section.footerText) {
                let decoLineClass = "absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full opacity-30 ";
                if (isSango) decoLineClass += "bg-yellow-400";
                else if (isLuxury) decoLineClass += "bg-[#ca8a04]";
                else if (isCyber) decoLineClass += "bg-cyan-500 shadow-[0_0_10px_#06b6d4]";
                else decoLineClass += "bg-gray-200";

                let footerTextClass = "font-black tracking-tighter leading-tight inline-block text-2xl md:text-4xl ";
                if (isSango) footerTextClass += "text-red-500";
                else if (isLuxury) footerTextClass += "text-transparent bg-clip-text bg-gradient-to-b from-[#fcd34d] to-[#ca8a04] font-serif";
                else if (isCyber) footerTextClass += "text-cyan-400 font-mono italic uppercase shadow-cyan-400/50";
                else if (isEarth) footerTextClass += "text-[#5d4037] font-serif";
                else footerTextClass += "text-gray-900";

                let starsHtml = '';
                if (isSango) {
                    starsHtml = `<div class="mt-4 flex justify-center gap-1 opacity-40">
                        ${[1, 2, 3].map(i => `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#facc15" stroke="none" class="${i === 2 ? 'scale-125' : ''}"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`).join('')}
                    </div>`;
                }

                let textShadowStyle = (section.bgType === 'image') ? 'text-shadow: 2px 2px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 2px 0 0 #fff, -2px 0 0 #fff;' : '';

                footerHtml = `
                <div class="mt-10 text-center relative pt-8 md:pt-10">
                    <div class="${decoLineClass}"></div>
                    <p class="${footerTextClass}" style="${textShadowStyle}">
                        ${section.footerText}
                    </p>
                    ${starsHtml}
                </div>`;
            }

            // Title Logic
            let titleClass = "font-black tracking-tighter leading-tight mx-auto text-xl md:text-3xl ";
            if (isLuxury) titleClass += "font-serif text-[#ca8a04]";
            else if (isCyber) titleClass += "font-mono text-cyan-400 italic uppercase";
            else if (isEarth) titleClass += "text-[#5d4037] font-serif";
            else titleClass += "text-gray-900";

            let titleStyle = "";
            if (section.bgType === 'image') titleStyle = "text-shadow: 2px 2px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 2px 0 0 #fff, -2px 0 0 #fff;";

            contentHtml = `
            <div class="px-6 py-20 md:px-16 mx-auto" style="max-width: ${section.contentWidth || 768}px;">
                <div class="text-center mb-10">
                    <h2 class="${titleClass}" style="${titleStyle}">
                        ${section.title || "こんなお悩みありませんか？"}
                    </h2>
                </div>
                <div class="grid ${isSango ? 'md:gap-8' : ''}" style="grid-template-columns: 1fr; gap: ${section.itemSpacing || 16}px;">
                    ${itemsHtml}
                </div>
                ${footerHtml}
            </div>`;
        }

        return `
          <div id="section-${section.id}" class="relative ${pt} ${pb} ${commonClass}" style="${delayStyle} ${sectionBgStyle}">
             ${dividerTopHtml}
             ${sectionOverlay}
             ${section.type === 'problem_checklist' ? `<div class="absolute inset-0 opacity-10" style="background-image: url('https://www.transparenttextures.com/patterns/stardust.png'); mix-blend-mode: overlay;"></div>` : ''}
             ${boxWrapperStart}
             <div class="${section.boxStyle && section.boxStyle !== 'none' ? '' : innerMaxWidth}">
                ${contentHtml}
             </div>
             ${boxWrapperEnd}
             ${dividerBottomHtml}
          </div>`;
    }).join('\n');


    return `<!DOCTYPE html> <html lang="ja"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>${data.siteTitle}</title> <script src="https://cdn.tailwindcss.com"></script> <script> tailwind.config = { theme: { extend: { keyframes: { fadeInUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' }, } }, animation: { fadeInUp: 'fadeInUp 0.5s ease-out forwards', } } } } </script> <link rel="preconnect" href="https://fonts.googleapis.com"> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Noto+Sans+JP:wght@300;400;500;700&display=swap" rel="stylesheet"> <style> .font-serif { font-family: 'Cormorant Garamond', 'Noto Sans JP', serif; } .font-sans { font-family: 'Noto Sans JP', sans-serif; } @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } } .animate-fadeInUp { animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; } .hero-media { transition: transform 20s linear; transform: scale(1); } .hero-container:hover .hero-media { transform: scale(1.1); } #mobile-menu { transition: transform 0.3s ease-in-out; } html { scroll-behavior: smooth; } html { font-size: clamp(14px, 1.1vw, 22px); } summary::-webkit-details-marker { display: none; } .scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; } .bg-dots-pattern { background-image: radial-gradient(#333 1px, transparent 1px); background-size: 20px 20px; } @keyframes shimmer { 0% { transform: translateX(-150%) skewX(-15deg); } 20% { transform: translateX(150%) skewX(-15deg); } 100% { transform: translateX(150%) skewX(-15deg); } } .animate-shimmer { animation: shimmer 3s infinite; } @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } } .animate-bounce-slow { animation: bounce-slow 3s infinite ease-in-out; } </style> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> <script async src="//www.instagram.com/embed.js"></script> </head> <body class="antialiased" style="${bgStyle} color: ${data.textColor};"> <div class="relative min-h-screen flex flex-col ${fontClass}"> <header class="absolute top-0 left-0 w-full z-30 px-6 py-4 text-white"> <div class="flex justify-between items-center max-w-7xl mx-auto"> <div class="font-bold text-lg tracking-widest uppercase opacity-90 mix-blend-difference relative z-50">${data.siteTitle}</div> <nav class="hidden md:block mix-blend-difference"> <ul class="flex space-x-6 text-sm tracking-widest font-medium"> ${menuItemsHtml} </ul> </nav> <button id="menu-btn" class="md:hidden z-50 relative w-8 h-8 flex flex-col justify-center items-end gap-1.5 group mix-blend-difference"> <span class="w-full h-0.5 bg-current transition-all duration-300 origin-right"></span> <span class="w-2/3 h-0.5 bg-current transition-all duration-300 origin-right"></span> <span class="w-full h-0.5 bg-current transition-all duration-300 origin-right"></span> </button> </div> </header> <div id="mobile-menu" class="fixed inset-0 bg-black/95 z-40 transform translate-x-full flex items-center justify-center md:hidden"> <ul class="text-center space-y-8 text-white"> ${menuItemsHtml} </ul> </div> <div class="hero-container relative mx-auto overflow-hidden shadow-2xl transition-all duration-700 ${data.heroWidth < 100 ? 'rounded-3xl' : ''}" style="${heroStyle}">
            <div class="absolute inset-0 w-full h-full bg-gray-900">
                ${data.heroType === 'video' ? `<video class="w-full h-full object-cover" src="${data.heroUrl}" autoplay loop muted playsinline style="${mediaStyle}"></video>` : `<img src="${data.heroUrl || data.heroImageFallback}" class="hero-media w-full h-full object-cover" alt="Hero" style="${mediaStyle}">`}
            </div>
            
            <div class="absolute inset-0 transition-opacity duration-300 ${['earth', 'gentle', 'standard', 'modern'].includes(data.design || 'standard') ? 'bg-gradient-to-tr from-black/60 via-black/30 to-transparent' : 'bg-black'}" style="opacity: ${data.heroOverlayOpacity || 0.4};"></div>
            
            <div class="absolute inset-0 flex flex-col items-center justify-center text-center p-8 text-white z-10">
                <div class="max-w-4xl w-full translate-y-4 animate-fadeInUp">
                    ${data.heroLabel ? `<span class="inline-block px-4 py-1 rounded-full text-[10px] font-black tracking-[0.3em] uppercase mb-6 bg-white/20 backdrop-blur-md border border-white/30">${data.heroLabel}</span>` : ''}
                    
                    <h2 class="font-black leading-[1.1] mb-8 tracking-tighter opacity-0 animate-fadeInUp" style="animation-delay: 0.2s; font-size: ${data.fontSize.heroTitle}rem; text-shadow: 0 4px 12px rgba(0,0,0,0.3);">${data.heroTitle}</h2>
                    
                    <p class="max-w-2xl mx-auto font-medium opacity-90 leading-relaxed mb-10 opacity-0 animate-fadeInUp" style="animation-delay: 0.4s; font-size: ${data.fontSize.heroSubtitle}rem; letter-spacing: ${['earth', 'gentle', 'standard', 'modern'].includes(data.design || 'standard') ? '0.05em' : '0.15em'};">${data.heroSubtitle}</p>
                    
                    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fadeInUp" style="animation-delay: 0.6s;">
                        ${(data.buttons || []).length > 0 ? data.buttons.map((btn, idx) => `
                            <a href="${btn.url || '#'}" 
                               class="px-10 py-5 text-sm font-black tracking-widest uppercase transition-all active:scale-95 group overflow-hidden relative ${['earth', 'gentle', 'standard', 'modern'].includes(data.design || 'standard') ? 'rounded-full shadow-[0_6px_0_rgba(0,0,0,0.1)]' : 'rounded-lg'}"
                               style="background-color: ${idx === 0 ? (data.accentColor || '#3b82f6') : 'rgba(255,255,255,0.1)'}; backdrop-filter: ${idx === 0 ? 'none' : 'blur(10px)'}; border: ${idx === 0 ? 'none' : '1px solid rgba(255,255,255,0.3)'}; color: #ffffff;">
                               ${btn.label}
                               ${(!['earth', 'gentle', 'standard', 'modern'].includes(data.design || 'standard') && idx === 0) ? `<div class="absolute top-0 left-0 w-full h-full animate-shimmer pointer-events-none opacity-20"><div class="w-1/2 h-full bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12"></div></div>` : ''}
                            </a>
                        `).join('') : (data.buttonLabel ? `
                            <button class="px-12 py-5 text-sm font-black tracking-widest uppercase transition-all shadow-2xl active:scale-95 ${['earth', 'gentle', 'standard', 'modern'].includes(data.design || 'standard') ? 'rounded-full' : 'rounded-lg'}" style="background-color: ${data.accentColor || '#3b82f6'};">
                                ${data.buttonLabel}
                            </button>
                        ` : '')}
                    </div>
                </div>
                
                ${(data.features || []).length > 0 ? `
                <div class="absolute bottom-12 left-0 w-full flex justify-center gap-12 opacity-0 animate-fadeInUp hidden md:flex" style="animation-delay: 0.8s;">
                    ${data.features.slice(0, 3).map(f => `
                        <div class="flex flex-col items-center gap-2">
                            <div class="w-1 h-8 bg-white/30 rounded-full mb-1"></div>
                            <span class="text-[10px] font-bold tracking-widest uppercase opacity-70">${f}</span>
                        </div>
                    `).join('')}
                </div>` : ''}
            </div>
        </div> <div class="relative z-10 flex-1 flex flex-col w-full"> ${sectionsHtml} </div> <footer id="footer" class="py-8 text-center border-t border-current/10 opacity-60 mt-auto" style="background-color: ${data.pageBgType === 'color' ? data.pageBgValue : 'transparent'};"> <p class="text-[10px] uppercase tracking-widest">&copy; ${new Date().getFullYear()} ${data.siteTitle}. All Rights Reserved.</p> </footer> </div> <script> const menuBtn = document.getElementById('menu-btn'); const mobileMenu = document.getElementById('mobile-menu'); const spans = menuBtn.querySelectorAll('span'); let isOpen = false; menuBtn.addEventListener('click', () => { isOpen = !isOpen; if (isOpen) { mobileMenu.classList.remove('translate-x-full'); spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)'; spans[1].style.opacity = '0'; spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)'; } else { mobileMenu.classList.add('translate-x-full'); spans[0].style.transform = 'none'; spans[1].style.opacity = '1'; spans[2].style.transform = 'none'; } }); mobileMenu.querySelectorAll('a').forEach(link => { link.addEventListener('click', () => { isOpen = false; mobileMenu.classList.add('translate-x-full'); spans[0].style.transform = 'none'; spans[1].style.opacity = '1'; spans[2].style.transform = 'none'; }); }); </script> </body> </html>`;
};

export const exportConfig = (data) => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = "config.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const exportHTML = (data) => {
    const htmlContent = generateHTML(data);
    const blob = new Blob([htmlContent], { type: "text/html" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = "index.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
