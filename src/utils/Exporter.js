import { DEFAULT_DATA } from "../data/defaultData";

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
            const borderClass = section.design === 'underline' ? 'border-b border-current pb-4' : '';
            contentHtml = `
             <div class="max-w-4xl mx-auto ${alignClass}">
                <div class="inline-block ${borderClass} px-4 ${containerClasses}">
                  <h2 class="font-medium tracking-widest leading-tight ${textClasses}" style="font-size: ${data.fontSize.sectionTitle * 1.2}rem;">${section.text}</h2>
                  ${section.subText ? `<p class="text-sm mt-2 opacity-60 tracking-wider ${textClasses}">${section.subText}</p>` : ''}
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
            const plans = section.plans || [];
            const design = section.design || 'standard';

            const plansHtml = plans.map(plan => {
                const isFeatured = plan.isFeatured;
                const accentColor = plan.color || '#3b82f6';
                const priceSize = plan.priceSize || 2.5;

                let cardClass = "relative flex flex-col p-8 transition-all duration-500 ";
                let cardStyle = "";

                if (design === 'standard') {
                    cardClass += "rounded-[2rem] bg-white border border-gray-100 shadow-sm ";
                    if (isFeatured) cardClass += "ring-2 ring-opacity-25 shadow-2xl scale-105 z-10";
                } else if (design === 'minimal') {
                    cardClass += "rounded-xl border border-gray-200 bg-white ";
                    if (isFeatured) cardClass += "ring-1 ring-gray-900 border-gray-900";
                } else if (design === 'dark') {
                    cardClass += "rounded-2xl bg-gray-900 text-white border border-gray-800 ";
                    if (isFeatured) cardClass += "ring-2 ring-blue-500 shadow-xl scale-105 z-10";
                }

                const featuresHtml = (plan.features || []).map(f => `
                    <li class="flex items-start gap-3">
                        <div class="mt-0.5" style="color: ${accentColor};">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        <span class="text-sm font-medium leading-snug">${f}</span>
                    </li>`).join('');

                return `
                <div class="${cardClass}" style="${isFeatured && design === 'standard' ? `border-color: ${accentColor}; ring-color: ${accentColor}40;` : ''}">
                    ${isFeatured ? `<div class="absolute left-1/2 -translate-x-1/2 -top-4 text-white px-6 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase whitespace-nowrap z-20" style="background-color: ${accentColor}">${plan.badgeText || 'RECOMMENDED'}</div>` : ''}
                    <div class="mb-8">
                        <h4 class="text-[11px] font-black uppercase tracking-[0.2em] mb-4 text-gray-400">${plan.name}</h4>
                        <div class="flex items-baseline">
                            <span class="font-black tracking-tighter" style="font-size: ${priceSize}rem;">${plan.price}</span>
                            <span class="text-sm text-gray-400 ml-1 font-bold">${plan.period}</span>
                        </div>
                    </div>
                    <ul class="flex-1 space-y-4 mb-8">${featuresHtml}</ul>
                    <a href="${plan.buttonUrl || '#'}" class="w-full py-4 rounded-xl font-bold text-xs tracking-widest text-center shadow-lg transition-transform hover:scale-105" style="background-color: ${isFeatured ? accentColor : '#f3f4f6'}; color: ${isFeatured ? '#fff' : '#374151'};">
                        ${plan.buttonText || 'SELECT'}
                    </a>
                </div>`;
            }).join('');

            contentHtml = `<div class="grid gap-8 ${plans.length === 2 ? 'md:grid-cols-2 max-w-4xl' : 'md:grid-cols-3'} max-w-7xl mx-auto">${plansHtml}</div>`;
        }
        else if (section.type === 'process') {
            const steps = section.steps || [];
            const accentColor = section.accentColor || '#3b82f6';
            const stepsHtml = steps.map((step, i) => `
                <div class="flex gap-4 md:gap-6 items-start group">
                    <div class="flex flex-col items-center pt-2">
                        <div class="w-10 h-10 md:w-12 md:h-12 rounded-full text-white flex items-center justify-center font-bold text-lg md:text-xl shadow-lg z-10" style="background-color: ${accentColor}">${i + 1}</div>
                        ${i !== (steps.length - 1) ? `<div class="w-0.5 h-full bg-gray-200 min-h-[40px] my-2"></div>` : ''}
                    </div>
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex-1 relative">
                        <div class="absolute top-6 -left-2 w-4 h-4 bg-white transform rotate-45 border-l border-b border-gray-100"></div>
                        <h4 class="font-bold text-lg mb-2 text-gray-800">${step.title}</h4>
                        <p class="text-gray-600 text-sm leading-relaxed">${step.desc || step.content}</p>
                    </div>
                </div>`).join('');
            contentHtml = `<div class="max-w-3xl mx-auto space-y-6">${stepsHtml}</div>`;
        }
        else if (section.type === 'staff') {
            const members = section.members || [];
            const membersHtml = members.map(m => `
                <div class="flex flex-col items-center text-center">
                    <div class="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-4 shadow-lg border-4 border-white">
                        <img src="${m.image}" class="w-full h-full object-cover" />
                    </div>
                    <h4 class="font-bold text-gray-800 text-sm md:text-base">${m.name}</h4>
                    <p class="text-blue-500 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-2">${m.role}</p>
                    <p class="text-gray-500 text-[10px] md:text-xs leading-relaxed">${m.desc || ''}</p>
                </div>`).join('');
            contentHtml = `<div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">${membersHtml}</div>`;
        }
        else if (section.type === 'faq') {
            const design = section.design || 'simple';
            const items = section.items || [];
            if (design === 'bubble') {
                contentHtml = `<div class="max-w-3xl mx-auto space-y-8">${items.map(item => `
                    <div class="space-y-4">
                        <div class="flex justify-start items-start gap-4 flex-row-reverse">
                            <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-[10px] text-gray-500 font-bold">Q</div>
                            <div class="bg-blue-100 p-4 rounded-2xl rounded-tr-sm text-gray-800 max-w-[80%]">${item.q}</div>
                        </div>
                        <div class="flex justify-start items-start gap-4">
                            <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-[10px] text-red-500 font-bold">A</div>
                            <div class="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-sm text-gray-800 max-w-[80%]">${item.a}</div>
                        </div>
                    </div>`).join('')}</div>`;
            } else {
                contentHtml = `<div class="max-w-3xl mx-auto space-y-4">${items.map(item => `
                    <details class="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <summary class="flex items-center justify-between p-6 cursor-pointer list-none bg-gray-50/50">
                            <h4 class="font-bold text-gray-800 flex items-center gap-3"><span class="text-blue-500 font-black">Q.</span>${item.q}</h4>
                            <span class="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <div class="p-6 pt-0 text-sm text-gray-600 border-t border-gray-100/50">
                            <span class="font-bold text-red-400 mr-2">A.</span>${item.a}
                        </div>
                    </details>`).join('')}</div>`;
            }
        }
        else if (section.type === 'comparison') {
            const headers = section.headers || [];
            const rows = section.rows || [];
            const headersHtml = headers.map((h, i) => `<th class="p-4 text-center ${i === 1 ? 'bg-blue-600 text-white' : ''}">${h}</th>`).join('');
            const rowsHtml = rows.map(row => `
                <tr class="border-b border-gray-100">
                    ${row.map((cell, i) => {
                let content = cell;
                if (cell === '◎') content = '<span class="text-red-500 font-black text-lg">◎</span>';
                if (cell === '◯') content = '<span class="text-red-500 font-bold text-lg">◯</span>';
                if (cell === '△') content = '<span class="text-yellow-500 font-bold text-lg">△</span>';
                if (cell === '×') content = '<span class="text-blue-300 font-bold text-lg">×</span>';
                return `<td class="p-4 text-center ${i === 1 ? 'bg-blue-50/20' : ''}">${content}</td>`;
            }).join('')}
                </tr>`).join('');
            contentHtml = `<div class="max-w-4xl mx-auto overflow-x-auto"><table class="w-full bg-white rounded-xl overflow-hidden shadow-lg"><thead><tr class="bg-gray-800 text-white">${headersHtml}</tr></thead><tbody>${rowsHtml}</tbody></table></div>`;
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
            const items = section.items || [];
            const design = section.design || 'card';
            const reviewsHtml = items.map(item => {
                const starsHtml = Array(5).fill(0).map((_, i) => `
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="${i < item.stars ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" class="${i < item.stars ? 'text-yellow-400' : 'text-gray-300'}"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                `).join('');

                let blockClass = "p-6 rounded-2xl transition-all ";
                if (design === 'card') blockClass += "bg-white shadow-sm border border-gray-100";
                else if (design === 'minimal') blockClass += "border-l-2 border-blue-500 pl-6";
                else if (design === 'bubble') blockClass += "bg-blue-50";

                return `
                <div class="flex flex-col h-full ${blockClass}">
                    <div class="mb-3 flex gap-0.5">${starsHtml}</div>
                    <p class="text-gray-700 text-sm leading-relaxed flex-1">「${item.content}」</p>
                    <div class="flex items-center gap-4 mt-6">
                        <div class="w-12 h-12 rounded-full overflow-hidden bg-gray-200 border-2 border-white shadow-sm">
                            <img src="${item.image}" class="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h4 class="font-bold text-gray-900 text-sm">${item.name}</h4>
                            <p class="text-gray-500 text-[10px] uppercase tracking-wider">${item.role}</p>
                        </div>
                    </div>
                </div>`;
            }).join('');
            contentHtml = `<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">${reviewsHtml}</div>`;
        }
        else if (section.type === 'accordion') {
            const design = section.design || 'simple';
            const accTag = section.items.map(item => {
                let detailsClass = "group overflow-hidden transition-all duration-300";
                let summaryClass = "flex justify-between items-center font-medium cursor-pointer list-none select-none";
                let contentClass = "text-sm opacity-80 leading-loose whitespace-pre-wrap";
                let iconClass = "transition-transform duration-300 w-6 h-6 flex items-center justify-center rounded-full group-open:rotate-180";

                if (design === 'simple') {
                    detailsClass += " border border-current/10 rounded-lg bg-white/5";
                    summaryClass += " p-5";
                    contentClass += " p-5 pt-0 pb-6 border-t border-current/5";
                } else if (design === 'flat') {
                    detailsClass += " border-b border-current/10 bg-transparent rounded-none";
                    summaryClass += " p-4 px-0 hover:opacity-70 transition-opacity";
                    contentClass += " pb-6 animate-fadeIn";
                } else if (design === 'card') {
                    detailsClass += " bg-white/5 backdrop-blur-sm shadow-sm rounded-xl border border-white/10 hover:shadow-md mb-4"; // Added mb-4 for card spacing
                    summaryClass += " p-6";
                    contentClass += " p-6 pt-0 text-base";
                    iconClass += " bg-white/10";
                }

                return `
            <details class="${detailsClass}">
              <summary class="${summaryClass}">
                <span class="text-lg">${item.title}</span>
                <span class="${iconClass}">
                    <svg fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="18"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div class="${contentClass}">
                <div class="pt-2">${item.content}</div>
              </div>
            </details>`;
            }).join('');
            contentHtml = `<div class="max-w-3xl mx-auto flex flex-col gap-4">${accTag}</div>`;
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
            const buttonsHtml = (section.buttons || []).map(btn => {
                let colorClass = 'bg-white text-gray-800 border-gray-200';
                if (btn.color === 'orange') colorClass = 'bg-gradient-to-r from-orange-400 to-orange-500 text-white border-orange-600 shadow-orange-200';
                else if (btn.color === 'red') colorClass = 'bg-gradient-to-r from-red-500 to-red-600 text-white border-red-700 shadow-red-200';
                else if (btn.color === 'green') colorClass = 'bg-gradient-to-r from-green-500 to-green-600 text-white border-green-700 shadow-green-200';
                else if (btn.color === 'blue') colorClass = 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-700 shadow-blue-200';
                else if (btn.color === 'black') colorClass = 'bg-gradient-to-r from-gray-800 to-black text-white border-gray-900 shadow-gray-400';

                let iconSvg = '';
                if (btn.icon === 'cart') iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>`;
                else if (btn.icon === 'line') iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>`; // Approximate MessageCircle
                else iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;

                return `
                <a href="${btn.url}" class="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-xl font-bold text-lg shadow-lg transform transition-transform active:scale-95 hover:-translate-y-0.5 border-b-4 ${colorClass}">
                    ${iconSvg}
                    <span>${btn.label}</span>
                </a>`;
            }).join('');

            const innerContent = `
            <div class="w-full max-w-md mx-auto p-4 space-y-3 ${section.isSticky ? 'bg-white/90 backdrop-blur-md shadow-inner border-t border-gray-100' : ''}">
                ${section.title ? `<p class="text-center text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">${section.title}</p>` : ''}
                <div class="flex flex-col gap-3">
                    ${buttonsHtml}
                </div>
                ${section.microCopy ? `<p class="text-center text-[10px] text-gray-400 mt-2">${section.microCopy}</p>` : ''}
            </div>`;

            if (section.isSticky) {
                // Wrapper for sticky positioning
                contentHtml = `
                <div class="fixed bottom-0 left-0 w-full z-50 pointer-events-none">
                    <div class="pointer-events-auto">
                        ${innerContent}
                    </div>
                </div>
                <!-- Placeholder to prevent content from being hidden behind sticky header -->
                <div class="h-24 md:hidden"></div>`;
            } else {
                contentHtml = innerContent;
            }
        }
        else if (section.type === 'point_list') {
            const itemsHtml = (section.items || []).map((item, index) => {
                const isEven = index % 2 === 1;
                return `
                <div class="flex flex-col md:flex-row gap-8 items-center ${isEven ? 'md:flex-row-reverse' : ''}">
                    <div class="w-full md:w-1/2 relative group">
                        <div class="absolute -top-4 -left-4 bg-yellow-400 text-black font-bold py-1 px-4 shadow-lg z-10" style="transform: skewX(-10deg);">
                            <span class="block" style="transform: skewX(10deg); font-size: 0.875rem; letter-spacing: 0.05em;">POINT ${String(index + 1).padStart(2, '0')}</span>
                        </div>
                        <div class="overflow-hidden rounded-xl shadow-lg border-4 border-white">
                            <img src="${item.image}" alt="${item.title}" class="w-full h-auto object-cover transform transition-transform duration-500 hover:scale-110" />
                        </div>
                    </div>
                    <div class="w-full md:w-1/2 space-y-4">
                        <h3 class="text-2xl font-bold border-b-2 border-yellow-400 pb-2 inline-block">${item.title}</h3>
                        <p class="text-gray-600 leading-relaxed font-light">${item.desc}</p>
                    </div>
                </div>`;
            }).join('');
            contentHtml = `<div class="space-y-16 max-w-5xl mx-auto px-6 py-12">${itemsHtml}</div>`;
        }
        else if (section.type === 'problem_checklist') {
            const itemsHtml = (section.items || []).map(item => `
                <div class="flex items-start gap-4 p-3 border-b border-white/10 last:border-0 hover:bg-white/5 transition-colors rounded-lg">
                    <div class="bg-red-500 rounded-full p-1 flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <p class="font-medium text-lg leading-snug">${item.text}</p>
                </div>`).join('');

            contentHtml = `
            <div class="max-w-2xl mx-auto relative z-10 text-white">
                <div class="text-center mb-10">
                    <span className="bg-red-600 text-white px-4 py-1 text-xs font-bold rounded-full mb-4 inline-block tracking-widest">CHECK LIST</span>
                    <h2 class="text-2xl md:text-3xl font-bold tracking-wider leading-relaxed">
                        ${section.title || "こんなお悩みありませんか？"}
                    </h2>
                </div>
                <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 md:p-10 shadow-2xl space-y-4">
                    ${itemsHtml}
                </div>
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


    return `<!DOCTYPE html> <html lang="ja"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>${data.siteTitle}</title> <script src="https://cdn.tailwindcss.com"></script> <script> tailwind.config = { theme: { extend: { keyframes: { fadeInUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' }, } }, animation: { fadeInUp: 'fadeInUp 0.5s ease-out forwards', } } } } </script> <link rel="preconnect" href="https://fonts.googleapis.com"> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Noto+Sans+JP:wght@300;400;500;700&display=swap" rel="stylesheet"> <style> .font-serif { font-family: 'Cormorant Garamond', 'Noto Sans JP', serif; } .font-sans { font-family: 'Noto Sans JP', sans-serif; } @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } } .animate-fadeInUp { animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; } .hero-media { transition: transform 20s linear; transform: scale(1); } .hero-container:hover .hero-media { transform: scale(1.1); } #mobile-menu { transition: transform 0.3s ease-in-out; } html { scroll-behavior: smooth; } summary::-webkit-details-marker { display: none; } .scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; } .bg-dots-pattern { background-image: radial-gradient(#333 1px, transparent 1px); background-size: 20px 20px; } @keyframes shimmer { 0% { transform: translateX(-150%) skewX(-15deg); } 20% { transform: translateX(150%) skewX(-15deg); } 100% { transform: translateX(150%) skewX(-15deg); } } .animate-shimmer { animation: shimmer 3s infinite; } @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } } .animate-bounce-slow { animation: bounce-slow 3s infinite ease-in-out; } </style> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> <script async src="//www.instagram.com/embed.js"></script> </head> <body class="antialiased" style="${bgStyle} color: ${data.textColor};"> <div class="relative min-h-screen flex flex-col ${fontClass}"> <header class="absolute top-0 left-0 w-full z-30 px-6 py-4 text-white"> <div class="flex justify-between items-center max-w-7xl mx-auto"> <div class="font-bold text-lg tracking-widest uppercase opacity-90 mix-blend-difference relative z-50">${data.siteTitle}</div> <nav class="hidden md:block mix-blend-difference"> <ul class="flex space-x-6 text-sm tracking-widest font-medium"> ${menuItemsHtml} </ul> </nav> <button id="menu-btn" class="md:hidden z-50 relative w-8 h-8 flex flex-col justify-center items-end gap-1.5 group mix-blend-difference"> <span class="w-full h-0.5 bg-current transition-all duration-300 origin-right"></span> <span class="w-2/3 h-0.5 bg-current transition-all duration-300 origin-right"></span> <span class="w-full h-0.5 bg-current transition-all duration-300 origin-right"></span> </button> </div> </header> <div id="mobile-menu" class="fixed inset-0 bg-black/95 z-40 transform translate-x-full flex items-center justify-center md:hidden"> <ul class="text-center space-y-8 text-white"> ${menuItemsHtml} </ul> </div> <div class="hero-container relative mx-auto overflow-hidden shadow-lg group" style="${heroStyle}"> <div class="absolute inset-0 w-full h-full"> ${data.heroType === 'video' ? `<video class="w-full h-full object-cover" src="${data.heroUrl}" autoplay loop muted playsinline style="${mediaStyle}"></video>` : `<img src="${data.heroUrl || data.heroImageFallback}" class="hero-media w-full h-full object-cover" alt="Hero" style="${mediaStyle}">`} </div> <div class="absolute inset-0 bg-black transition-opacity duration-300" style="opacity: ${data.heroOverlayOpacity};"></div> <div class="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-white z-10"> <h2 class="font-light leading-tight mb-6 opacity-0 animate-fadeInUp" style="animation-delay: 0.2s; font-size: ${data.fontSize.heroTitle}rem;">${data.heroTitle}</h2> <p class="uppercase tracking-[0.2em] opacity-0 animate-fadeInUp leading-loose whitespace-pre-wrap" style="animation-delay: 0.4s; font-size: ${data.fontSize.heroSubtitle}rem;">${data.heroSubtitle}</p> </div> <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white/50 animate-bounce"> <div class="w-[1px] h-8 bg-white/50 mx-auto"></div> </div> </div> <div class="relative z-10 flex-1 flex flex-col w-full"> ${sectionsHtml} </div> <footer id="footer" class="py-8 text-center border-t border-current/10 opacity-60 mt-auto" style="background-color: ${data.pageBgType === 'color' ? data.pageBgValue : 'transparent'};"> <p class="text-[10px] uppercase tracking-widest">&copy; ${new Date().getFullYear()} ${data.siteTitle}. All Rights Reserved.</p> </footer> </div> <script> const menuBtn = document.getElementById('menu-btn'); const mobileMenu = document.getElementById('mobile-menu'); const spans = menuBtn.querySelectorAll('span'); let isOpen = false; menuBtn.addEventListener('click', () => { isOpen = !isOpen; if (isOpen) { mobileMenu.classList.remove('translate-x-full'); spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)'; spans[1].style.opacity = '0'; spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)'; } else { mobileMenu.classList.add('translate-x-full'); spans[0].style.transform = 'none'; spans[1].style.opacity = '1'; spans[2].style.transform = 'none'; } }); mobileMenu.querySelectorAll('a').forEach(link => { link.addEventListener('click', () => { isOpen = false; mobileMenu.classList.add('translate-x-full'); spans[0].style.transform = 'none'; spans[1].style.opacity = '1'; spans[2].style.transform = 'none'; }); }); </script> </body> </html>`;
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
