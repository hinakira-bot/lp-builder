/* eslint-disable */
import React from 'react';
import { clsx } from 'clsx';
import { ShoppingCart, MessageCircle, ExternalLink, Check, Sparkles, Crown, Star, Medal, Award } from 'lucide-react';

export const ConversionPanel = ({ section }) => {
    // Default buttons if none provided
    const buttons = section.buttons || [
        { id: 1, label: 'Amazonで購入する', url: '#', color: 'orange', icon: 'cart' },
        { id: 2, label: '楽天で購入する', url: '#', color: 'red', icon: 'cart' }
    ];

    const isSticky = section.isSticky || false;

    // Helper to get button style based on color name
    const getButtonStyle = (color) => {
        switch (color) {
            case 'orange': return 'bg-gradient-to-r from-orange-400 to-orange-500 text-white border-orange-600 shadow-orange-200';
            case 'red': return 'bg-gradient-to-r from-red-500 to-red-600 text-white border-red-700 shadow-red-200';
            case 'green': return 'bg-gradient-to-r from-green-500 to-green-600 text-white border-green-700 shadow-green-200';
            case 'blue': return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-700 shadow-blue-200';
            case 'black': return 'bg-gradient-to-r from-gray-800 to-black text-white border-gray-900 shadow-gray-400';
            default: return 'bg-white text-gray-800 border-gray-200';
        }
    };

    const getIcon = (iconName) => {
        switch (iconName) {
            case 'cart': return <ShoppingCart size={20} />;
            case 'line': return <MessageCircle size={20} />;
            default: return <ExternalLink size={20} />;
        }
    };

    const Content = () => (
        <div className={clsx(
            "w-full max-w-md mx-auto p-4 space-y-3",
            isSticky ? "bg-white/90 backdrop-blur-md shadow-inner border-t border-gray-100" : ""
        )}>
            {section.title && (
                <p className="text-center text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">
                    {section.title}
                </p>
            )}
            <div className="flex flex-col gap-3">
                {buttons.map((btn, idx) => (
                    <a
                        key={idx}
                        href={btn.url}
                        className={clsx(
                            "flex items-center justify-center gap-3 w-full py-4 px-6 rounded-xl font-bold text-lg shadow-lg transform transition-transform active:scale-95 hover:-translate-y-0.5 border-b-4",
                            getButtonStyle(btn.color)
                        )}
                    >
                        {getIcon(btn.icon)}
                        <span>{btn.label}</span>
                    </a>
                ))}
            </div>
            {section.microCopy && (
                <p className="text-center text-[10px] text-gray-400 mt-2">
                    {section.microCopy}
                </p>
            )}
        </div>
    );

    if (isSticky) {
        return (
            <div className="fixed bottom-0 left-0 w-full z-50 pointer-events-none">
                {/* Wrapper to center content and enable pointer events only on buttons */}
                <div className="pointer-events-auto">
                    <Content />
                </div>
            </div>
        );
    }

    return (
        <div className="py-8 px-4 bg-gray-50">
            <Content />
        </div>
    );
};

export const PointList = ({ section, viewMode }) => {
    const isMobile = viewMode === 'mobile';
    return (
        <div className="space-y-16 max-w-5xl mx-auto px-6 py-12">
            {section.items.map((item, index) => {
                const isEven = index % 2 === 1;
                return (
                    <div key={item.id} className={`flex flex-col ${isMobile ? '' : 'md:flex-row'} gap-8 items-center ${!isMobile && isEven ? 'md:flex-row-reverse' : ''}`}>
                        <div className={`w-full ${isMobile ? '' : 'md:w-1/2'} relative group`}>
                            <div className="absolute -top-4 -left-4 bg-yellow-400 text-black font-bold py-1 px-4 shadow-lg z-10 skew-x-[-10deg]">
                                <span className="block skew-x-[10deg] text-sm tracking-wider">POINT {String(index + 1).padStart(2, '0')}</span>
                            </div>
                            <div className="overflow-hidden rounded-xl shadow-lg border-4 border-white">
                                <img src={item.image} alt={item.title} className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-110" />
                            </div>
                        </div>
                        <div className={`w-full ${isMobile ? '' : 'md:w-1/2'} space-y-4`}>
                            <h3 className="text-2xl font-bold border-b-2 border-yellow-400 pb-2 inline-block">{item.title}</h3>
                            <p className="text-gray-600 leading-relaxed font-light">{item.desc}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export const ProblemChecklist = ({ section, viewMode }) => {
    const isMobile = viewMode === 'mobile';

    return (
        <div className={`py-12 ${isMobile ? 'px-4' : 'px-6'} bg-gray-800 text-white relative overflow-hidden`}>
            {/* Background noise texture simulation */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>

            <div className="max-w-2xl mx-auto relative z-10">
                <div className={`text-center ${isMobile ? 'mb-6' : 'mb-10'}`}>
                    <span className="bg-red-600 text-white px-4 py-1 text-xs font-bold rounded-full mb-4 inline-block tracking-widest">CHECK LIST</span>
                    <h2 className={`${isMobile ? 'text-xl' : 'text-2xl md:text-3xl'} font-bold tracking-wider leading-relaxed`}>
                        {section.title || "こんなお悩みありませんか？"}
                    </h2>
                </div>

                <div className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl ${isMobile ? 'p-4' : 'p-6 md:p-10'} shadow-2xl space-y-4`}>
                    {section.items.map((item, i) => (
                        <div key={i} className={`flex items-start ${isMobile ? 'gap-3' : 'gap-4'} p-3 border-b border-white/10 last:border-0 hover:bg-white/5 transition-colors rounded-lg`}>
                            <div className={`bg-red-500 rounded-full ${isMobile ? 'p-0.5' : 'p-1'} flex-shrink-0 mt-0.5`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={isMobile ? "14" : "16"} height={isMobile ? "14" : "16"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                            </div>
                            <p className={`font-medium ${isMobile ? 'text-base' : 'text-lg'} leading-snug`}>{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const SpeechBubbleRenderer = ({ section, viewMode }) => {
    const isMobile = viewMode === 'mobile';
    // User requested "Left bubble, Right character".
    // So Flex container: [Bubble] [Character]
    // Default (align='left' or undefined) logic:
    // We want the Bubble on the LEFT of the Character? Or the Bubble on the Left Side of the screen?
    // Usually "Right Character" means the character is positioned on the right side.
    // So the layout is [Bubble (Flexible)] ... [Character (Fixed)]

    // Let's support swapping via 'align'.
    // align='right' (Default in user request context? "Right to character"): Character on Right.
    // align='left': Character on Left.

    const isCharRight = section.align !== 'left'; // Default to Right for Character as per request.

    const bubbleColor = section.bubbleColor || '#ffffff';
    const textColor = section.textColor || '#333333';

    return (
        <div className={`flex items-start gap-4 ${isMobile ? 'px-2' : 'max-w-3xl mx-auto px-6'} ${isCharRight ? 'justify-end' : 'justify-start'}`}>

            {/* Character (If Left) */}
            {!isCharRight && (
                <div className="flex-shrink-0 flex flex-col items-center gap-1">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-white shadow-md bg-gray-200">
                        {section.characterImage ? (
                            <img src={section.characterImage} alt="Speaker" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Img</div>
                        )}
                    </div>
                    {section.characterName && <p className="text-[10px] text-center text-gray-500 font-bold">{section.characterName}</p>}
                </div>
            )}

            {/* Speech Bubble */}
            <div className="relative max-w-[70%]">
                <div
                    className="p-4 md:p-6 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed whitespace-pre-wrap border border-gray-100"
                    style={{ backgroundColor: bubbleColor, color: textColor }}
                >
                    {section.text}
                </div>

                {/* Tail */}
                <div
                    className={`absolute top-6 w-3 h-3 rotate-45 border-b border-r ${isCharRight ? '-right-1.5' : '-left-1.5'} border-gray-100`}
                    style={{ backgroundColor: bubbleColor, borderColor: 'transparent ' + (isCharRight ? 'transparent #f3f4f6 #f3f4f6' : '#f3f4f6 #f3f4f6 transparent transparent') }} // Simplified tail color logic via simple bg
                ></div>
                {/* Better CSS Triangle Tail */}
                <div className={`absolute top-6 w-0 h-0 border-8 border-transparent ${isCharRight ? '-right-4 border-l-white' : '-left-4 border-r-white'}`}
                    style={isCharRight ? { borderLeftColor: bubbleColor } : { borderRightColor: bubbleColor }}></div>
            </div>

            {/* Character (If Right) - Default */}
            {isCharRight && (
                <div className="flex-shrink-0 flex flex-col items-center gap-1">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-white shadow-md bg-gray-200">
                        {section.characterImage ? (
                            <img src={section.characterImage} alt="Speaker" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Img</div>
                        )}
                    </div>
                    {section.characterName && <p className="text-[10px] text-center text-gray-500 font-bold">{section.characterName}</p>}
                </div>
            )}
        </div>
    );
};

export const PricingRenderer = ({ section, viewMode, fontSize }) => {
    const isMobile = viewMode === 'mobile';
    const plans = section.plans || [];

    const getPlanIcon = (iconName) => {
        switch (iconName) {
            case 'crown': return <Crown size={16} className="text-yellow-500" />;
            case 'star': return <Star size={16} className="text-yellow-400" />;
            case 'medal': return <Medal size={16} className="text-blue-400" />;
            case 'award': return <Award size={16} className="text-orange-400" />;
            default: return <Sparkles size={16} className="text-blue-500" />;
        }
    };

    const designPattern = section.design || 'standard';

    if (designPattern === 'horizontal') {
        return (
            <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
                {plans.map((plan) => (
                    <div key={plan.id} className={clsx(
                        "flex flex-col md:flex-row items-center justify-between p-6 rounded-2xl border transition-all",
                        plan.isFeatured ? "bg-white shadow-xl border-blue-200 ring-2 ring-blue-500/10" : "bg-white border-gray-100 shadow-sm"
                    )}>
                        <div className="flex-1 text-center md:text-left mb-4 md:mb-0">
                            <h4 className="text-xl font-bold text-gray-800">{plan.name}</h4>
                            <div className="flex items-baseline justify-center md:justify-start mt-2">
                                <span className="text-3xl font-black text-gray-900">{plan.price}</span>
                                <span className="text-sm text-gray-500 ml-1">{plan.period}</span>
                            </div>
                        </div>
                        <div className="flex-1 mb-6 md:mb-0">
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {plan.features.map((f, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                        <Check size={14} className="text-blue-500 flex-shrink-0" />
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex-shrink-0 w-full md:w-auto">
                            <button className={clsx(
                                "w-full md:px-8 py-3 rounded-xl font-bold transition-all transform active:scale-95",
                                plan.isFeatured ? "bg-blue-600 text-white shadow-lg hover:bg-blue-500" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            )}>
                                {plan.buttonText}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className={clsx(
            "grid gap-8 max-w-7xl mx-auto px-6 py-12",
            isMobile ? "grid-cols-1" : (plans.length === 2 ? "md:grid-cols-2 max-w-4xl" : "md:grid-cols-3")
        )}>
            {plans.map((plan) => {
                const accentColor = plan.color || '#3b82f6';
                const textColor = plan.textColor || '#ffffff';
                const priceSize = plan.priceSize || 2.5;

                return (
                    <div
                        key={plan.id}
                        className={clsx(
                            "relative flex flex-col p-8 rounded-[2.5rem] transition-all duration-700 group",
                            plan.isFeatured
                                ? "bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] ring-2 scale-105 z-10"
                                : "bg-white/60 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1"
                        )}
                        style={plan.isFeatured ? { ringColor: accentColor + '20', borderColor: accentColor } : {}}
                    >
                        {plan.isFeatured && (
                            <div
                                className="absolute -top-5 left-1/2 -translate-x-1/2 text-white px-8 py-2 rounded-full text-[10px] font-black tracking-[0.2em] flex items-center gap-2 shadow-xl whitespace-nowrap animate-bounce-subtle"
                                style={{ backgroundColor: accentColor }}
                            >
                                {getPlanIcon(plan.icon || 'sparkle')} {plan.badgeText || 'RECOMMENDED'}
                            </div>
                        )}

                        <div className="mb-10">
                            <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                                {!plan.isFeatured && plan.icon && getPlanIcon(plan.icon)}
                                {plan.name}
                            </h4>
                            <div className="flex items-baseline mb-2">
                                <span className="font-black text-gray-900 tracking-tighter" style={{ fontSize: `${priceSize}rem` }}>
                                    {plan.price}
                                </span>
                                <span className="text-sm text-gray-400 ml-1 font-bold">{plan.period}</span>
                            </div>
                            {plan.subText && <p className="text-[10px] text-gray-400 font-medium">{plan.subText}</p>}
                        </div>

                        <ul className="flex-1 space-y-5 mb-10">
                            {(plan.features || []).map((feature, i) => (
                                <li key={i} className="flex items-start gap-4 group/item">
                                    <div
                                        className="p-1 rounded-full mt-0.5 transition-colors"
                                        style={{ backgroundColor: accentColor + '10', color: accentColor }}
                                    >
                                        <Check size={12} strokeWidth={4} />
                                    </div>
                                    <span className="text-sm text-gray-600 font-medium leading-snug group-hover/item:text-gray-900 transition-colors">
                                        {feature}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <button
                            className="w-full py-4.5 rounded-2xl font-black text-sm tracking-widest transition-all transform active:scale-95 shadow-lg flex items-center justify-center gap-2"
                            style={{
                                backgroundColor: plan.isFeatured ? accentColor : '#f9fafb',
                                color: plan.isFeatured ? textColor : '#374151'
                            }}
                        >
                            {plan.buttonText}
                        </button>
                    </div>
                );
            })}
        </div>
    );
};
