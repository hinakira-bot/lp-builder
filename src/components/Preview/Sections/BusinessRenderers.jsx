/* eslint-disable */
import React from 'react';
import { clsx } from 'clsx';
import { ShoppingCart, MessageCircle, ExternalLink, Check, Sparkles, Crown, Star, Medal, Award } from 'lucide-react';

export const ConversionPanel = ({ section, accentColor }) => {
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
            case 'accent': return ''; // Handled by inline style
            default: return 'bg-white text-gray-800 border-gray-200';
        }
    };

    const getDynamicStyle = (color) => {
        if (color === 'accent') {
            return {
                backgroundColor: accentColor || '#D4AF37',
                color: '#fff',
                borderColor: 'rgba(0,0,0,0.1)',
                boxShadow: `0 4px 14px 0 ${accentColor}40`
            };
        }
        return {};
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
                        style={getDynamicStyle(btn.color)}
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
    const design = section.design || 'alternating'; // Default to alternating to match previous look
    const badgeText = section.badgeText || 'POINT';
    const badgeColor = section.badgeColor || '#facc15';

    // Helper for Badge
    const Badge = ({ index, className }) => (
        <div className={clsx("bg-yellow-400 text-black font-bold py-1 px-4 shadow-lg z-10 skew-x-[-10deg]", className)} style={{ backgroundColor: badgeColor }}>
            <span className="block skew-x-[10deg] text-sm tracking-wider">{badgeText} {String(index + 1).padStart(2, '0')}</span>
        </div>
    );

    if (design === 'cards') {
        return (
            <div className={`grid gap-8 max-w-6xl mx-auto px-6 py-12 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
                {(section.items || []).map((item, index) => (
                    <div key={item.id || index} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group hover:translate-y-1 transition-transform">
                        <div className="relative h-48 overflow-hidden">
                            <div className="absolute top-0 right-0 p-4">
                                <Badge index={index} className="!py-1 !px-3 !text-xs !shadow-md !skew-x-0 !rounded text-white" />
                            </div>
                            <img src={item.image?.url || item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        </div>
                        <div className="p-6">
                            <h3 className="text-lg font-bold mb-3 pb-2 border-b-2 inline-block" style={{ borderBottomColor: badgeColor }}>{item.title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (design === 'simple') {
        return (
            <div className="space-y-12 max-w-3xl mx-auto px-6 py-12">
                {(section.items || []).map((item, index) => (
                    <div key={item.id || index} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col items-start gap-4">
                        <div className="flex items-center gap-4 w-full border-b border-gray-100 pb-4 mb-2">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-md" style={{ backgroundColor: badgeColor }}>
                                {index + 1}
                            </div>
                            <h3 className="text-xl font-bold flex-1">{item.title}</h3>
                        </div>
                        <div className="flex flex-col md:flex-row gap-6 w-full">
                            <div className="w-full md:w-1/3 flex-shrink-0">
                                <img src={item.image?.url || item.image} alt={item.title} className="w-full h-40 object-cover rounded-lg shadow-sm" />
                            </div>
                            <p className="text-gray-600 flex-1 leading-relaxed text-sm md:text-base">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // Default: Alternating (ZigZag)
    return (
        <div className="space-y-16 max-w-5xl mx-auto px-6 py-12">
            {(section.items || []).map((item, index) => {
                const isEven = index % 2 === 1;
                return (
                    <div key={item.id || index} className={`flex flex-col ${isMobile ? '' : 'md:flex-row'} gap-8 items-center ${!isMobile && isEven ? 'md:flex-row-reverse' : ''}`}>
                        <div className={`w-full ${isMobile ? '' : 'md:w-1/2'} relative group`}>
                            <div className="absolute -top-4 -left-4">
                                <Badge index={index} />
                            </div>
                            <div className="overflow-hidden rounded-xl shadow-lg border-4 border-white">
                                <img src={item.image?.url || item.image} alt={item.title} className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-110" />
                            </div>
                        </div>
                        <div className={`w-full ${isMobile ? '' : 'md:w-1/2'} space-y-4`}>
                            <h3 className="text-2xl font-bold border-b-2 pb-2 inline-block" style={{ borderBottomColor: badgeColor }}>{item.title}</h3>
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
                        {(section.characterImage || section.image?.url || section.image) ? (
                            <img src={section.characterImage || section.image?.url || section.image} alt="Speaker" className="w-full h-full object-cover" />
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
                        {(section.characterImage || section.image?.url || section.image) ? (
                            <img src={section.characterImage || section.image?.url || section.image} alt="Speaker" className="w-full h-full object-cover" />
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



export const PricingRenderer = ({ section, viewMode }) => {
    const isMobile = viewMode === 'mobile';
    const plans = section.plans || [];
    const design = section.design || 'standard';

    const getPlanIcon = (iconName) => {
        if (iconName === 'crown') return <Crown size={14} />;
        if (iconName === 'star') return <Star size={14} />;
        if (iconName === 'medal') return <Medal size={14} />;
        if (iconName === 'award') return <Award size={14} />;
        return <Sparkles size={14} />;
    };

    // Design-specific container classes
    const containerClasses = clsx(
        "max-w-7xl mx-auto px-6 py-12",
        design === 'horizontal' ? "flex flex-col gap-6 max-w-4xl" :
            clsx(
                "grid gap-8",
                isMobile ? "grid-cols-1" :
                    (plans.length === 2 ? "md:grid-cols-2 max-w-4xl" : "md:grid-cols-3")
            )
    );

    return (
        <div className={containerClasses}>
            {plans.map((plan) => {
                const accentColor = plan.color || '#3b82f6';
                const textColor = plan.textColor || '#ffffff';
                const priceSize = plan.priceSize || 2.5;
                const isFeatured = plan.isFeatured;

                // Base Card Style Construction
                let cardClass = "relative flex flex-col p-8 transition-all duration-500 group ";
                let cardStyle = {};

                if (design === 'standard') {
                    cardClass += "rounded-[2rem] ";
                    if (isFeatured) {
                        cardClass += "bg-white shadow-2xl ring-2 scale-105 z-10";
                        cardStyle = { ringColor: accentColor + '40', borderColor: accentColor };
                    } else {
                        cardClass += "bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1";
                    }
                }
                else if (design === 'minimal') {
                    cardClass += "rounded-xl border border-gray-200 bg-white hover:border-gray-400 ";
                    if (isFeatured) cardClass += "ring-1 ring-gray-900 border-gray-900";
                }
                else if (design === 'modern') {
                    cardClass += "rounded-[2.5rem] bg-white/80 backdrop-blur-md border border-white/50 shadow-lg ";
                    if (isFeatured) cardClass += "shadow-2xl bg-white/95 scale-105 z-10";
                }
                else if (design === 'bold') {
                    cardClass += "rounded-none border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ";
                    if (isFeatured) cardClass += "bg-yellow-50";
                }
                else if (design === 'dark') {
                    cardClass += "rounded-2xl bg-gray-900 text-white border border-gray-800 ";
                    if (isFeatured) cardClass += "ring-2 ring-blue-500 shadow-blue-900/50 shadow-xl scale-105 z-10";
                }
                else if (design === 'horizontal') {
                    cardClass += "flex-row items-center gap-8 rounded-2xl bg-white shadow-sm border border-gray-100 p-6 ";
                    if (isMobile) cardClass = cardClass.replace("flex-row", "flex-col text-center"); // Fallback for mobile
                }

                return (
                    <div key={plan.id} className={cardClass} style={cardStyle}>
                        {/* Featured Badge */}
                        {isFeatured && (
                            <div
                                className={clsx(
                                    "absolute left-1/2 -translate-x-1/2 text-white px-6 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase flex items-center gap-2 whitespace-nowrap z-20",
                                    design === 'horizontal' ? "top-0 -translate-y-1/2 left-8 translate-x-0" : "-top-4"
                                )}
                                style={{ backgroundColor: design === 'dark' ? '#3b82f6' : design === 'bold' ? '#000' : accentColor }}
                            >
                                {getPlanIcon(plan.icon || 'crown')} {plan.badgeText || 'RECOMMENDED'}
                            </div>
                        )}

                        {/* Content Header */}
                        <div className={clsx("mb-8", design === 'horizontal' && !isMobile ? "mb-0 w-1/4" : "")}>
                            <h4 className={clsx(
                                "text-[11px] font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2",
                                design === 'dark' ? "text-gray-400" : "text-gray-400"
                            )}>
                                {!isFeatured && plan.icon && getPlanIcon(plan.icon)}
                                {plan.name}
                            </h4>
                            <div className="flex items-baseline">
                                <span className={clsx("font-black tracking-tighter", design === 'dark' ? "text-white" : "text-gray-900")} style={{ fontSize: `${priceSize}rem` }}>
                                    {plan.price}
                                </span>
                                <span className="text-sm text-gray-400 ml-1 font-bold">{plan.period}</span>
                            </div>
                            {plan.subText && <p className="text-[10px] text-gray-400 font-medium mt-1">{plan.subText}</p>}
                        </div>

                        {/* Features List */}
                        <ul className={clsx(
                            "flex-1 space-y-4 mb-8",
                            design === 'horizontal' && !isMobile ? "mb-0 border-l border-gray-100 pl-8 grid grid-cols-2 gap-x-8 gap-y-2 space-y-0" : ""
                        )}>
                            {(plan.features || []).map((feature, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div
                                        className="mt-0.5"
                                        style={{ color: design === 'dark' || design === 'bold' ? (isFeatured ? accentColor : '#6b7280') : accentColor }}
                                    >
                                        <Check size={14} strokeWidth={4} />
                                    </div>
                                    <span className={clsx("text-sm font-medium leading-snug", design === 'dark' ? "text-gray-300" : "text-gray-600")}>
                                        {feature}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        {/* CTAction */}
                        <div className={clsx(design === 'horizontal' && !isMobile ? "w-48" : "w-full")}>
                            <button
                                className={clsx(
                                    "w-full py-4 rounded-xl font-bold text-xs tracking-widest transition-all hover:scale-105 active:scale-95 shadow-lg",
                                    design === 'bold' ? "border-2 border-black bg-black text-white shadow-none hover:bg-yellow-400 hover:text-black hover:border-black" : ""
                                )}
                                style={design === 'bold' ? {} : {
                                    backgroundColor: isFeatured ? (design === 'dark' ? '#3b82f6' : accentColor) : (design === 'dark' ? '#1f2937' : '#f3f4f6'),
                                    color: isFeatured ? textColor : (design === 'dark' ? '#fff' : '#374151')
                                }}
                            >
                                {plan.buttonText || 'SELECT'}
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};


export const ProcessRenderer = ({ section, viewMode }) => {
    const isMobile = viewMode === 'mobile';
    const accentColor = section.accentColor || '#3b82f6';
    const design = section.design || 'simple';

    if (design === 'cards') {
        return (
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className={clsx("grid gap-8", isMobile ? "grid-cols-1" : "grid-cols-3")}>
                    {(section.steps || []).map((step, i) => (
                        <div key={i} className="flex flex-col bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: accentColor }}></div>
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-4xl font-black opacity-10" style={{ color: accentColor }}>{String(i + 1).padStart(2, '0')}</span>
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: accentColor }}>
                                    {i + 1}
                                </div>
                            </div>
                            <h4 className="font-bold text-lg mb-3 text-gray-800">{step.title}</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">{step.desc || step.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (design === 'timeline') {
        return (
            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="relative">
                    {/* Center Line */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform md:-translate-x-1/2"></div>

                    {(section.steps || []).map((step, i) => {
                        const isEven = i % 2 === 0; // Left side if even (in desktop)
                        // On Mobile, always right side of the line which is on left
                        return (
                            <div key={i} className={clsx("relative flex items-center mb-12 last:mb-0", isMobile ? "" : (isEven ? "md:justify-start" : "md:justify-end"))}>

                                {/* Center Dot */}
                                <div className="absolute left-[20px] md:left-1/2 w-4 h-4 rounded-full border-4 border-white shadow-sm z-10 transform -translate-x-1/2" style={{ backgroundColor: accentColor }}></div>

                                {/* Content Card */}
                                <div className={clsx(
                                    "relative ml-12 md:ml-0 bg-white p-6 rounded-xl shadow-md border border-gray-100 w-full md:w-[45%]",
                                    !isMobile && isEven ? "md:mr-auto md:pr-10" : "",
                                    !isMobile && !isEven ? "md:ml-auto md:pl-10" : ""
                                )}>
                                    <div className="absolute top-4 -left-2 md:hidden w-4 h-4 bg-white transform rotate-45 border-l border-b border-gray-100"></div>

                                    {/* Desktop Arrows */}
                                    {!isMobile && isEven && <div className="hidden md:block absolute top-[18px] -right-2 w-4 h-4 bg-white transform rotate-45 border-r border-t border-gray-100"></div>}
                                    {!isMobile && !isEven && <div className="hidden md:block absolute top-[18px] -left-2 w-4 h-4 bg-white transform rotate-45 border-l border-b border-gray-100"></div>}

                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs font-bold px-2 py-0.5 rounded text-white" style={{ backgroundColor: accentColor }}>STEP {i + 1}</span>
                                    </div>
                                    <h4 className="font-bold text-lg mb-2 text-gray-800">{step.title}</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">{step.desc || step.content}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    // Default: Simple Vertical
    return (
        <div className="max-w-3xl mx-auto px-6 py-12">
            <div className="space-y-6">
                {(section.steps || []).map((step, i) => (
                    <div key={i} className="flex gap-4 md:gap-6 items-start group">
                        <div className="flex flex-col items-center pt-2">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full text-white flex items-center justify-center font-bold text-lg md:text-xl shadow-lg relative z-10 group-hover:scale-110 transition-transform" style={{ backgroundColor: accentColor }}>
                                {i + 1}
                            </div>
                            {i !== (section.steps.length - 1) && (
                                <div className="w-0.5 h-full bg-gray-200 min-h-[40px] my-2"></div>
                            )}
                        </div>
                        <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex-1 hover:shadow-md transition-shadow relative">
                            {/* Triangle */}
                            <div className="absolute top-6 -left-2 w-4 h-4 bg-white transform rotate-45 border-l border-b border-gray-100"></div>

                            <h4 className="font-bold text-lg mb-2 text-gray-800">{step.title}</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">{step.desc || step.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const StaffRenderer = ({ section, viewMode }) => {
    const isMobile = viewMode === 'mobile';
    return (
        <div className={clsx("grid gap-6 max-w-5xl mx-auto px-6 py-12", isMobile ? "grid-cols-2" : "grid-cols-4")}>
            {(section.members || []).map((member, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-4 shadow-lg border-4 border-white relative">
                        <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 transition-colors"></div>
                        {member.image ? (
                            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">No Img</div>
                        )}
                    </div>
                    <h4 className="font-bold text-gray-800 text-sm md:text-base">{member.name}</h4>
                    <p className="text-blue-500 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-2">{member.role}</p>
                    {member.desc && <p className="text-gray-500 text-[10px] md:text-xs leading-relaxed">{member.desc}</p>}
                </div>
            ))}
        </div>
    );
};

export const FAQRenderer = ({ section, viewMode }) => {
    const isMobile = viewMode === 'mobile';
    const design = section.design || 'simple';

    if (design === 'bubble') {
        return (
            <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
                {(section.items || []).map((item, i) => (
                    <div key={i} className="space-y-4">
                        {/* Q (Right/User) */}
                        <div className="flex justify-start items-start gap-3 md:gap-4 flex-row-reverse">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 flex flex-col items-center justify-center text-[10px] text-gray-500 font-bold flex-shrink-0">
                                Q
                            </div>
                            <div className="bg-blue-100 p-4 rounded-2xl rounded-tr-sm text-sm md:text-base text-gray-800 shadow-sm max-w-[80%] leading-relaxed">
                                {item.q}
                            </div>
                        </div>
                        {/* A (Left/Admin) */}
                        <div className="flex justify-start items-start gap-3 md:gap-4">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-100 flex flex-col items-center justify-center text-[10px] text-red-500 font-bold flex-shrink-0">
                                A
                            </div>
                            <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-sm text-sm md:text-base text-gray-800 shadow-sm max-w-[80%] leading-relaxed">
                                {item.a}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (design === 'box') {
        return (
            <div className="max-w-3xl mx-auto px-6 py-12 grid gap-6">
                {(section.items || []).map((item, i) => (
                    <div key={i} className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                        <div className="flex gap-4 mb-4 items-start">
                            <span className="text-blue-500 font-black text-xl italic flex-shrink-0">Q.</span>
                            <h4 className="font-bold text-lg text-gray-800 pt-0.5 leading-snug">{item.q}</h4>
                        </div>
                        <div className="flex gap-4 items-start border-t border-gray-100 pt-4">
                            <span className="text-red-500 font-black text-xl italic flex-shrink-0">A.</span>
                            <p className="text-gray-600 leading-relaxed text-sm md:text-base pt-0.5">{item.a}</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // Default: Simple (Accordion)
    return (
        <div className="max-w-3xl mx-auto px-6 py-12 space-y-4">
            {(section.items || []).map((item, i) => (
                <details key={i} className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden open:ring-2 open:ring-blue-100 transition-all">
                    <summary className="flex items-center justify-between p-4 md:p-6 cursor-pointer list-none bg-gray-50/50 hover:bg-gray-50 transition-colors">
                        <h4 className="font-bold text-gray-800 text-sm md:text-base flex items-center gap-3">
                            <span className="text-blue-500 font-black">Q.</span>
                            {item.q}
                        </h4>
                        <span className="text-gray-400 transform transition-transform group-open:rotate-180">▼</span>
                    </summary>
                    <div className="p-4 md:p-6 pt-0 text-sm text-gray-600 leading-relaxed border-t border-gray-100/50">
                        <span className="font-bold text-red-400 mr-2">A.</span>
                        {item.a}
                    </div>
                </details>
            ))}
        </div>
    );
};

export const ComparisonRenderer = ({ section, viewMode }) => {
    const isMobile = viewMode === 'mobile';
    const headers = section.headers || ['項目', '自社', '他社A', '他社B'];
    const rows = section.rows || [];
    const design = section.design || 'standard';

    const renderCell = (cell) => {
        if (cell === 'double' || cell === '◎') return <div className="text-red-500 font-black text-lg">◎</div>;
        if (cell === 'circle' || cell === 'o' || cell === '◯') return <div className="text-red-500 font-bold text-lg">◯</div>;
        if (cell === 'triangle' || cell === 'tri' || cell === '△') return <div className="text-yellow-500 font-bold text-lg">△</div>;
        if (cell === 'cross' || cell === 'x' || cell === '×') return <div className="text-blue-300 font-bold text-lg">×</div>;
        if (cell === 'hyphen' || cell === '-') return <span className="text-gray-300">-</span>;
        return <span className="text-gray-600 font-medium">{cell}</span>;
    };

    // Design Config
    const isMinimal = design === 'minimal';
    const isModern = design === 'modern';

    const containerClass = clsx(
        "max-w-4xl mx-auto px-4 md:px-6 py-12 overflow-x-auto",
        isMinimal ? "" : ""
    );

    const tableClass = clsx(
        "w-full min-w-[300px] border-collapse text-sm",
        isMinimal ? "border-t-2 border-b-2 border-gray-200" : "bg-white rounded-xl overflow-hidden shadow-lg"
    );

    const headerRowClass = clsx(
        isMinimal ? "bg-white text-gray-800 border-b border-gray-200" :
            isModern ? "bg-gray-100 text-gray-800" :
                "bg-gray-800 text-white" // Standard
    );

    return (
        <div className={containerClass}>
            <table className={tableClass}>
                <thead>
                    <tr className={headerRowClass}>
                        {headers.map((h, i) => {
                            const isWinCol = i === 1;
                            let thClass = `p-4 text-center whitespace-nowrap ${i === 0 ? 'text-left pl-6 w-1/4' : ''} `;

                            if (isWinCol) {
                                if (isMinimal) thClass += "bg-blue-50 text-blue-800 font-bold ";
                                else if (isModern) thClass += "bg-blue-100 text-blue-900 font-bold ";
                                else thClass += "bg-blue-600 relative overflow-hidden "; // Standard
                            }

                            return (
                                <th key={i} className={thClass}>
                                    {!isMinimal && !isModern && isWinCol && <div className="absolute top-0 right-0 bg-yellow-400 text-black text-[9px] font-bold px-1 rounded-bl">Win</div>}
                                    {isModern && isWinCol && <span className="text-xs bg-blue-200 text-blue-800 px-1.5 py-0.5 rounded-full mr-1">Win</span>}
                                    {h}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rI) => (
                        <tr key={rI} className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors">
                            {row.map((cell, cI) => {
                                const isWinCol = cI === 1;
                                let tdClass = `p-4 text-center ${cI === 0 ? 'text-left font-bold text-gray-800 pl-6 bg-gray-50/50' : ''} `;

                                if (isWinCol) {
                                    if (isMinimal) tdClass += "bg-blue-50/10 ";
                                    else if (isModern) tdClass += "bg-blue-50/30 font-bold text-blue-900 ";
                                    else tdClass += "bg-blue-50/20 ";
                                } else {
                                    if (!isWinCol && cI !== 0) tdClass += "text-gray-500 ";
                                }

                                return (
                                    <td key={cI} className={tdClass}>
                                        {cI === 0 ? cell : renderCell(cell)}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export const AccessRenderer = ({ section, viewMode }) => {
    const isMobile = viewMode === 'mobile';
    const address = section.address || "東京都港区1-1-1";
    // Using a simpler embed URL format that often works without key for basic pin
    const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

    return (
        <div className={clsx("max-w-5xl mx-auto px-6 py-12 flex flex-col gap-8", !isMobile && "md:flex-row")}>
            {/* Map Column */}
            <div className={clsx("w-full min-h-[300px] bg-gray-200 rounded-2xl overflow-hidden shadow-lg border border-gray-100 relative order-1", !isMobile && "md:w-1/2 md:order-1")}>
                <iframe
                    title="map"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    src={mapUrl}
                    className="absolute inset-0 w-full h-full"
                    loading="lazy"
                ></iframe>
            </div>

            {/* Info Column */}
            <div className={clsx("w-full space-y-6 flex flex-col justify-center order-2", !isMobile && "md:w-1/2 md:order-2")}>
                <h3 className="text-2xl font-bold border-l-4 border-blue-600 pl-4">{section.title || "ACCESS"}</h3>
                <div className="space-y-4 text-sm leading-relaxed text-gray-600">
                    <p className="flex items-start gap-3">
                        <span className="font-bold min-w-[4em]">住所</span>
                        <span>{section.address || "住所が設定されていません"}</span>
                    </p>
                    {section.access && (
                        <p className="flex items-start gap-3">
                            <span className="font-bold min-w-[4em]">アクセス</span>
                            <span>{section.access}</span>
                        </p>
                    )}
                    {section.hours && (
                        <p className="flex items-start gap-3">
                            <span className="font-bold min-w-[4em]">営業時間</span>
                            <span>{section.hours}</span>
                        </p>
                    )}
                    {section.tel && (
                        <p className="flex items-start gap-3">
                            <span className="font-bold min-w-[4em]">電話番号</span>
                            <span>{section.tel}</span>
                        </p>
                    )}
                </div>
                {section.buttonText && (
                    <a href={section.buttonUrl || '#'} className="inline-block bg-gray-800 text-white px-8 py-3 rounded-lg font-bold hover:bg-black transition-colors self-start">
                        {section.buttonText}
                    </a>
                )}
            </div>
        </div>
    );
};
export const ReviewRenderer = ({ section, viewMode }) => {
    const isMobile = viewMode === 'mobile';
    const design = section.design || 'card';
    const items = section.items || [];

    const StarRating = ({ count }) => (
        <div className="flex gap-0.5 text-yellow-400">
            {[1, 2, 3, 4, 5].map(s => (
                <Star key={s} size={14} fill={count >= s ? 'currentColor' : 'none'} className={count < s ? 'text-gray-300' : ''} />
            ))}
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <div className={clsx("grid gap-6", isMobile ? "grid-cols-1" : "grid-cols-2 lg:grid-cols-3")}>
                {items.map((item, i) => (
                    <div key={i} className={clsx(
                        "flex flex-col h-full transition-all duration-300",
                        design === 'card' && "bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md",
                        design === 'bubble' && "relative pb-8",
                        design === 'minimal' && "border-l-2 border-blue-500 pl-6 py-2"
                    )}>
                        {/* Quote/Bubble Content */}
                        <div className={clsx(
                            "flex-1",
                            design === 'bubble' && "bg-blue-50 p-6 rounded-2xl mb-4 relative after:content-[''] after:absolute after:top-full after:left-8 after:border-[12px] after:border-transparent after:border-t-blue-50"
                        )}>
                            <div className="mb-3">
                                <StarRating count={item.stars} />
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap font-light">
                                「{item.content}」
                            </p>
                        </div>

                        {/* Person Info */}
                        <div className={clsx(
                            "flex items-center gap-4 mt-4",
                            design === 'bubble' && "ml-4"
                        )}>
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 border-2 border-white shadow-sm flex-shrink-0">
                                {item.image ? (
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400"><Star size={16} /></div>
                                )}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
                                <p className="text-gray-500 text-[10px] uppercase tracking-wider">{item.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
