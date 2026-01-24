/* eslint-disable */
import React from 'react';
import { clsx } from 'clsx';
import { ShoppingCart, MessageCircle, ExternalLink, Check, Sparkles, Crown, Star, Medal, Award, X } from 'lucide-react';
import { getImgUrl } from '../../../utils/helpers';
import { SectionWrapper } from './SectionWrapper';

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

    return (
        <SectionWrapper section={section}>
            <Content />
        </SectionWrapper>
    );
};

export const PointList = ({ section, viewMode }) => {
    const isMobile = viewMode === 'mobile';
    const design = section.design || 'alternating';
    const badgeText = section.badgeText || 'POINT';
    const badgeColor = section.badgeColor || '#facc15';

    const Badge = ({ index, className }) => (
        <div className={clsx("bg-yellow-400 text-black font-bold py-1 px-4 shadow-lg z-10 skew-x-[-10deg]", className)} style={{ backgroundColor: badgeColor }}>
            <span className="block skew-x-[10deg] text-sm tracking-wider">{badgeText} {String(index + 1).padStart(2, '0')}</span>
        </div>
    );

    const items = section.items || [];

    if (design === 'cards') {
        return (
            <SectionWrapper section={section}>
                <div className={`grid gap-8 max-w-6xl mx-auto px-6 py-12 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
                    {items.map((item, index) => (
                        <div key={item.id || index} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group hover:translate-y-1 transition-transform">
                            <div className="relative h-48 overflow-hidden">
                                <div className="absolute top-0 right-0 p-4">
                                    <Badge index={index} className="!py-1 !px-3 !text-xs !shadow-md !skew-x-0 !rounded text-white" />
                                </div>
                                {getImgUrl(item.image) ? (
                                    <img src={getImgUrl(item.image)} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                ) : (
                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs opacity-50">No Image</div>
                                )}
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold mb-3 pb-2 border-b-2 inline-block" style={{ borderBottomColor: badgeColor }}>{item.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{item.desc || item.content || item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </SectionWrapper>
        );
    }

    if (design === 'simple') {
        return (
            <SectionWrapper section={section}>
                <div className="space-y-12 max-w-3xl mx-auto px-6 py-12">
                    {items.map((item, index) => (
                        <div key={item.id || index} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col items-start gap-4">
                            <div className="flex items-center gap-4 w-full border-b border-gray-100 pb-4 mb-2">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-md" style={{ backgroundColor: badgeColor }}>
                                    {index + 1}
                                </div>
                                <h3 className="text-xl font-bold flex-1">{item.title}</h3>
                            </div>
                            <div className="flex flex-col md:flex-row gap-6 w-full">
                                <div className="w-full md:w-1/3 flex-shrink-0">
                                    {getImgUrl(item.image) ? (
                                        <img src={getImgUrl(item.image)} alt={item.title} className="w-full h-40 object-cover rounded-lg shadow-sm" />
                                    ) : (
                                        <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center text-xs opacity-50">No Image</div>
                                    )}
                                </div>
                                <p className="text-gray-600 flex-1 leading-relaxed text-sm md:text-base">{item.desc || item.content || item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </SectionWrapper>
        );
    }

    return (
        <SectionWrapper section={section}>
            <div className="space-y-16 max-w-5xl mx-auto px-6 py-12">
                {items.map((item, index) => {
                    const isEven = index % 2 === 1;
                    return (
                        <div key={item.id || index} className={`flex flex-col ${isMobile ? '' : 'md:flex-row'} gap-8 items-center ${!isMobile && isEven ? 'md:flex-row-reverse' : ''}`}>
                            <div className={`w-full ${isMobile ? '' : 'md:w-1/2'} relative group`}>
                                <div className="absolute -top-4 -left-4">
                                    <Badge index={index} />
                                </div>
                                <div className="overflow-hidden rounded-xl shadow-lg border-4 border-white">
                                    {getImgUrl(item.image) ? (
                                        <img src={getImgUrl(item.image)} alt={item.title} className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-110" />
                                    ) : (
                                        <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center text-xs opacity-50">No image</div>
                                    )}
                                </div>
                            </div>
                            <div className={`w-full ${isMobile ? '' : 'md:w-1/2'} space-y-4`}>
                                <h3 className="text-2xl font-bold border-b-2 pb-2 inline-block" style={{ borderBottomColor: badgeColor }}>{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed font-light">{item.desc || item.content || item.text}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </SectionWrapper>
    );
};

export const ProblemChecklist = ({ section, viewMode }) => {
    const isMobile = viewMode === 'mobile';

    return (
        <SectionWrapper section={section}>
            <div className={`py-12 ${isMobile ? 'px-4' : 'px-6'} bg-gray-800 text-white relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>

                <div className="max-w-2xl mx-auto relative z-10">
                    <div className={`text-center ${isMobile ? 'mb-6' : 'mb-10'}`}>
                        <span className="bg-red-600 text-white px-4 py-1 text-xs font-bold rounded-full mb-4 inline-block tracking-widest">CHECK LIST</span>
                        <h2 className={`${isMobile ? 'text-xl' : 'text-2xl md:text-3xl'} font-bold tracking-wider leading-relaxed text-white`}>
                            {section.title || "こんなお悩みありませんか？"}
                        </h2>
                    </div>

                    <div className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl ${isMobile ? 'p-4' : 'p-6 md:p-10'} shadow-2xl space-y-4`}>
                        {section.items.map((item, i) => (
                            <div key={i} className={`flex items-start ${isMobile ? 'gap-3' : 'gap-4'} p-3 border-b border-white/10 last:border-0 hover:bg-white/5 transition-colors rounded-lg text-white`}>
                                <div className={`bg-red-500 rounded-full ${isMobile ? 'p-0.5' : 'p-1'} flex-shrink-0 mt-0.5`}>
                                    <X className="text-white" size={isMobile ? 14 : 16} strokeWidth={3} />
                                </div>
                                <p className={`font-medium ${isMobile ? 'text-base' : 'text-lg'} leading-snug`}>{item.text || item.content || item.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};

export const SpeechBubbleRenderer = ({ section, viewMode }) => {
    const isMobile = viewMode === 'mobile';
    const isCharRight = section.align !== 'left';
    const bubbleColor = section.bubbleColor || '#ffffff';
    const textColor = section.textColor || '#333333';
    const charImg = getImgUrl(section.characterImage || section.image);

    return (
        <SectionWrapper section={section}>
            <div className={`flex items-start gap-4 ${isMobile ? 'px-2' : 'max-w-3xl mx-auto px-6'} ${isCharRight ? 'justify-end' : 'justify-start'}`}>

                {!isCharRight && (
                    <div className="flex-shrink-0 flex flex-col items-center gap-1">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-white shadow-md bg-gray-200">
                            {charImg ? (
                                <img src={charImg} alt="Speaker" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs text-center font-bold p-1">No Img</div>
                            )}
                        </div>
                        {section.characterName && <p className="text-[10px] text-center text-gray-500 font-bold">{section.characterName}</p>}
                    </div>
                )}

                <div className="relative max-w-[70%]">
                    <div
                        className="p-4 md:p-6 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed whitespace-pre-wrap border border-gray-100"
                        style={{ backgroundColor: bubbleColor, color: textColor }}
                    >
                        {section.text || section.content}
                    </div>

                    <div className={`absolute top-6 w-0 h-0 border-8 border-transparent ${isCharRight ? '-right-4 border-l-white' : '-left-4 border-r-white'}`}
                        style={isCharRight ? { borderLeftColor: bubbleColor } : { borderRightColor: bubbleColor }}></div>
                </div>

                {isCharRight && (
                    <div className="flex-shrink-0 flex flex-col items-center gap-1">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-white shadow-md bg-gray-200">
                            {charImg ? (
                                <img src={charImg} alt="Speaker" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs text-center font-bold p-1">No Img</div>
                            )}
                        </div>
                        {section.characterName && <p className="text-[10px] text-center text-gray-500 font-bold">{section.characterName}</p>}
                    </div>
                )}
            </div>
        </SectionWrapper>
    );
};

export const PricingRenderer = ({ section, viewMode, accentColor }) => {
    const isMobile = viewMode === 'mobile';
    const plans = section.plans || [];
    const design = section.design || 'modern';

    const getPlanIcon = (iconName) => {
        if (iconName === 'crown') return <Crown size={14} />;
        if (iconName === 'star') return <Star size={14} />;
        if (iconName === 'medal') return <Medal size={14} />;
        if (iconName === 'award') return <Award size={14} />;
        return <Sparkles size={14} />;
    };

    const containerClasses = clsx(
        "max-w-7xl mx-auto px-6 py-12",
        design === 'horizontal' ? "flex flex-col gap-6 max-w-4xl" :
            clsx("grid gap-8", isMobile ? "grid-cols-1" : (plans.length === 2 ? "md:grid-cols-2 max-w-4xl" : "md:grid-cols-3"))
    );

    return (
        <SectionWrapper section={section}>
            <div className={containerClasses}>
                {plans.map((plan) => {
                    const planAccentColor = plan.color || accentColor || '#3b82f6';
                    const planTextColor = plan.textColor || '#ffffff';
                    const isFeatured = plan.isFeatured;

                    return (
                        <div key={plan.id} className={clsx(
                            "relative flex flex-col p-8 transition-all duration-300 rounded-3xl overflow-hidden bg-white shadow-xl border border-gray-100",
                            isFeatured && "ring-4 scale-105 z-10"
                        )} style={isFeatured ? { ringColor: planAccentColor } : {}}>

                            {isFeatured && (
                                <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: planAccentColor }}></div>
                            )}

                            <div className="mb-6">
                                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 flex items-center gap-2">
                                    {plan.icon && getPlanIcon(plan.icon)}
                                    {plan.name}
                                </h4>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-black text-gray-900">{plan.price}</span>
                                    {plan.period && <span className="text-sm text-gray-400 font-bold">/{plan.period}</span>}
                                </div>
                            </div>

                            <ul className="flex-1 space-y-4 mb-8">
                                {(plan.features || []).map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                                        <Check size={14} strokeWidth={4} style={{ color: planAccentColor }} className="mt-0.5 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <a href={plan.url || '#'} className="w-full py-4 rounded-xl font-bold text-center transition-all hover:scale-105"
                                style={{ backgroundColor: planAccentColor, color: planTextColor }}>
                                {plan.buttonText || '申し込む'}
                            </a>
                        </div>
                    );
                })}
            </div>
        </SectionWrapper>
    );
};

export const ProcessRenderer = ({ section, viewMode, accentColor: globalAccent }) => {
    const isMobile = viewMode === 'mobile';
    const accentColor = section.accentColor || globalAccent || '#3b82f6';
    const design = section.design || 'cards';
    const steps = section.steps || section.items || [];

    if (design === 'cards') {
        return (
            <SectionWrapper section={section}>
                <div className="max-w-6xl mx-auto px-6 py-12">
                    <div className={clsx("grid gap-8", isMobile ? "grid-cols-1" : "grid-cols-3")}>
                        {steps.map((step, i) => {
                            const imgUrl = getImgUrl(step.image);
                            return (
                                <div key={i} className="flex flex-col bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: accentColor }}></div>
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-4xl font-black opacity-10" style={{ color: accentColor }}>{String(i + 1).padStart(2, '0')}</span>
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: accentColor }}>
                                            {i + 1}
                                        </div>
                                    </div>
                                    {imgUrl && (
                                        <div className="mb-4 h-32 rounded-lg overflow-hidden border border-gray-100">
                                            <img src={imgUrl} alt={step.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                    )}
                                    <h4 className="font-bold text-lg mb-3 text-gray-800">{step.title}</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">{step.desc || step.content || step.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </SectionWrapper>
        );
    }

    return (
        <SectionWrapper section={section}>
            <div className="max-w-3xl mx-auto px-6 py-12">
                <div className="space-y-6">
                    {steps.map((step, i) => {
                        const imgUrl = getImgUrl(step.image);
                        return (
                            <div key={i} className="flex gap-4 md:gap-6 items-start group">
                                <div className="flex flex-col items-center pt-2 font-bold text-white">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: accentColor }}>
                                        {i + 1}
                                    </div>
                                    {i !== (steps.length - 1) && (
                                        <div className="w-0.5 h-full bg-gray-200 min-h-[40px] my-2"></div>
                                    )}
                                </div>
                                <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex-1 hover:shadow-md transition-shadow relative">
                                    <div className="absolute top-6 -left-2 w-4 h-4 bg-white transform rotate-45 border-l border-b border-gray-100"></div>
                                    {imgUrl && (
                                        <div className="mb-4 h-40 overflow-hidden rounded-xl border border-gray-100">
                                            <img src={imgUrl} alt={step.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                    )}
                                    <h4 className="font-bold text-lg mb-2 text-gray-800">{step.title}</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">{step.desc || step.content || step.text}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </SectionWrapper>
    );
};

export const StaffRenderer = ({ section, viewMode }) => {
    const isMobile = viewMode === 'mobile';
    const members = section.members || section.items || [];
    return (
        <SectionWrapper section={section}>
            <div className={clsx("grid gap-6 max-w-5xl mx-auto px-6 py-12", isMobile ? "grid-cols-2" : "grid-cols-4")}>
                {members.map((member, i) => {
                    const imgUrl = getImgUrl(member.image);
                    return (
                        <div key={i} className="flex flex-col items-center text-center group">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-4 shadow-lg border-4 border-white relative bg-gray-100">
                                {imgUrl ? (
                                    <img src={imgUrl} alt={member.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-[10px] font-bold p-1">No Img</div>
                                )}
                            </div>
                            <h4 className="font-bold text-gray-800 text-sm md:text-base">{member.name}</h4>
                            <p className="text-blue-500 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-2">{member.role || member.position}</p>
                            {(member.desc || member.bio) && <p className="text-gray-500 text-[10px] md:text-xs leading-relaxed">{member.desc || member.bio}</p>}
                        </div>
                    );
                })}
            </div>
        </SectionWrapper>
    );
};

export const FAQRenderer = ({ section, viewMode }) => {
    const isMobile = viewMode === 'mobile';
    const design = section.design || 'simple';
    const items = section.items || [];

    return (
        <SectionWrapper section={section}>
            <div className="max-w-3xl mx-auto px-6 py-12 space-y-4">
                {items.map((item, i) => (
                    <details key={i} className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden open:ring-2 open:ring-blue-100 transition-all">
                        <summary className="flex items-center justify-between p-4 md:p-6 cursor-pointer list-none bg-gray-50/50 hover:bg-gray-50 transition-colors">
                            <h4 className="font-bold text-gray-800 text-sm md:text-base flex items-center gap-3">
                                <span className="text-blue-500 font-black">Q.</span>
                                {item.q || item.question}
                            </h4>
                            <span className="text-gray-400 transition-transform group-open:rotate-180">▼</span>
                        </summary>
                        <div className="p-4 md:p-6 pt-0 text-sm text-gray-600 leading-relaxed border-t border-gray-100/50">
                            <div className="pt-4 flex gap-3">
                                <span className="font-bold text-red-500 flex-shrink-0">A.</span>
                                <div>{item.a || item.answer}</div>
                            </div>
                        </div>
                    </details>
                ))}
            </div>
        </SectionWrapper>
    );
};

export const ComparisonRenderer = ({ section, viewMode }) => {
    const isMobile = viewMode === 'mobile';
    const headers = section.headers || section.companies || ['項目', '当社', '他社A', '他社B'];
    const rows = section.rows || [];

    const renderCell = (cell) => {
        if (cell === '◎') return <div className="text-red-500 font-black text-lg">◎</div>;
        if (cell === '◯' || cell === '○') return <div className="text-red-500 font-bold text-lg">◯</div>;
        if (cell === '△') return <div className="text-yellow-500 font-bold text-lg">△</div>;
        if (cell === '×') return <div className="text-blue-300 font-bold text-lg">×</div>;
        return <span className="text-gray-600 font-medium">{cell}</span>;
    };

    return (
        <SectionWrapper section={section}>
            <div className="max-w-5xl mx-auto px-4 md:px-6 py-12 overflow-x-auto">
                <table className="w-full bg-white rounded-xl overflow-hidden shadow-lg border-collapse">
                    <thead>
                        <tr className="bg-gray-800 text-white text-sm">
                            {headers.map((h, i) => {
                                const isUs = i === 1;
                                return (
                                    <th key={i} className={clsx("p-4 text-center whitespace-nowrap", isUs && "bg-blue-600")}>
                                        {h}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, rI) => {
                            const cells = Array.isArray(row) ? row : (row.values || []);
                            const label = Array.isArray(row) ? row[0] : row.label;
                            const actualValues = Array.isArray(row) ? row : [label, ...cells];

                            return (
                                <tr key={rI} className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors">
                                    {actualValues.map((cell, cI) => (
                                        <td key={cI} className={clsx("p-4 text-center text-sm", cI === 0 && "text-left font-bold bg-gray-50/50 pl-6", cI === 1 && "bg-blue-50/20")}>
                                            {cI === 0 ? cell : renderCell(cell)}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </SectionWrapper>
    );
};

export const AccessRenderer = ({ section, viewMode }) => {
    const isMobile = viewMode === 'mobile';
    const address = section.address || section.location || "住所が設定されていません";
    const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

    return (
        <SectionWrapper section={section}>
            <div className={clsx("max-w-5xl mx-auto px-6 py-12 flex flex-col gap-8", !isMobile && "md:flex-row")}>
                <div className={clsx("w-full min-h-[300px] bg-gray-200 rounded-2xl overflow-hidden shadow-lg border border-gray-100 relative order-1", !isMobile && "md:w-1/2")}>
                    <iframe
                        src={mapUrl}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        className="absolute inset-0 w-full h-full"
                        loading="lazy"
                    ></iframe>
                </div>

                <div className={clsx("w-full space-y-6 flex flex-col justify-center order-2", !isMobile && "md:w-1/2 md:pl-8")}>
                    <h3 className="text-2xl font-black border-l-4 border-blue-600 pl-4">{section.title || "ACCESS"}</h3>
                    <div className="space-y-4 text-sm text-gray-600">
                        <p className="flex items-start gap-3"><span className="font-bold min-w-[4em]">住所</span><span>{address}</span></p>
                        {section.hours && <p className="flex items-start gap-3"><span className="font-bold min-w-[4em]">営業時間</span><span>{section.hours}</span></p>}
                        {section.tel && <p className="flex items-start gap-3"><span className="font-bold min-w-[4em]">電話番号</span><span>{section.tel}</span></p>}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};

export const ReviewRenderer = ({ section, viewMode }) => {
    const isMobile = viewMode === 'mobile';
    const items = section.items || section.reviews || [];
    const design = section.design || 'card';

    return (
        <SectionWrapper section={section}>
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className={clsx("grid gap-6", isMobile ? "grid-cols-1" : "grid-cols-2 lg:grid-cols-3")}>
                    {items.map((item, i) => {
                        const imgUrl = getImgUrl(item.image);
                        return (
                            <div key={i} className={clsx("bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full")}>
                                <div className="flex gap-0.5 text-yellow-400 mb-3">
                                    {[...Array(5)].map((_, s) => (
                                        <Star key={s} size={14} fill={(item.rating || 5) > s ? 'currentColor' : 'none'} className={(item.rating || 5) <= s ? 'text-gray-300' : ''} />
                                    ))}
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1 italic">"{item.text || item.content || item.comment}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                                        {imgUrl ? <img src={imgUrl} alt={item.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">No Img</div>}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-900">{item.name || item.author}</h4>
                                        {(item.role || item.position) && <p className="text-[10px] text-gray-500">{item.role || item.position}</p>}
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
export { SectionWrapper };
