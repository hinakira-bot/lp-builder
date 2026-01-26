import React from 'react';
import { clsx } from 'clsx';
import { Dividers } from './Dividers';

/**
 * SectionWrapper
 * Standardizes padding, background colors, and background images across all LP sections.
 * Supports dividers and advanced box styles.
 */
export const SectionWrapper = ({ section, children, className, globalPadding = 24 }) => {
    // 1. Background Logic
    // Support multiple fields for backward compatibility
    const bgImage = (section.bgType === 'image' && section.bgValue)
        ? section.bgValue
        : (section.bgImage || section.style?.bgImage || 'none');

    const bgColor = section.backgroundColor || section.style?.bgColor || (section.bgType === 'color' ? section.bgValue : 'transparent');
    const bgOverlay = section.bgOverlay !== undefined ? section.bgOverlay : (section.style?.bgOverlay || 0);

    const style = {
        backgroundColor: bgColor,
        backgroundImage: (bgImage && bgImage !== 'none') ? `url('${bgImage}')` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        paddingTop: section.pTop !== undefined ? `${section.pTop}px` : undefined,
        paddingBottom: section.pBottom !== undefined ? `${section.pBottom}px` : undefined,
    };

    // 2. Box Style Logic
    const boxColor = section.boxColor || '#3b82f6';
    const boxClasses = clsx(
        section.boxStyle === 'shadow' && 'bg-white shadow-xl text-gray-800',
        section.boxStyle === 'border' && 'border',
        section.boxStyle === 'fill' && 'bg-gray-100/50',
        section.boxStyle === 'stitch' && 'border-2 border-dashed',
        section.boxStyle === 'double' && 'border-4 border-double',
        section.boxStyle === 'comic' && 'border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white text-gray-900',
        section.boxStyle === 'neon' && 'border-2 bg-black/80 text-white',
        section.boxStyle === 'glass' && 'backdrop-blur-md bg-white/40 border'
    );

    const boxStyle = {
        borderColor: (section.boxStyle === 'border' || section.boxStyle === 'stitch' || section.boxStyle === 'double' || section.boxStyle === 'neon' || section.boxStyle === 'glass') ? boxColor : undefined,
        boxShadow: section.boxStyle === 'neon' ? `0 0 20px ${boxColor}, inset 0 0 10px ${boxColor}` : (section.boxStyle === 'comic' ? `8px 8px 0px 0px ${boxColor}` : undefined),
        borderStyle: section.boxStyle === 'stitch' ? 'dashed' : (section.boxStyle === 'double' ? 'double' : undefined)
    };

    const isBoxed = section.boxStyle && section.boxStyle !== 'none';
    const boxPadding = isBoxed ? 'p-8 md:p-12 rounded-xl' : '';

    // 3. Layout Logic
    const hasGlobalPadding = globalPadding > 0;
    const paddingXStyle = { paddingLeft: `${globalPadding}px`, paddingRight: `${globalPadding}px` };

    // Use numeric contentWidth if available, otherwise fallback to default max-w-5xl (approx 1024px)
    const containerStyle = {
        ...paddingXStyle,
        maxWidth: section.contentWidth ? `${section.contentWidth}px` : (hasGlobalPadding ? '1024px' : 'none'),
        marginLeft: 'auto',
        marginRight: 'auto'
    };

    const innerMaxWidth = isBoxed || section.type === 'full_width' ? 'w-full' : 'w-full';

    return (
        <section
            id={`section-${section.id}`}
            className={clsx(
                "relative overflow-hidden transition-all duration-300",
                section.pt || (!isBoxed ? 'py-4' : ''),
                section.pb,
                className
            )}
            style={style}
        >
            {/* Background Overlay */}
            {(bgImage !== 'none' || bgOverlay > 0) && (
                <div className="absolute inset-0 bg-black z-0 pointer-events-none" style={{ opacity: bgOverlay }}></div>
            )}

            <Dividers type={section.dividerTop} color={section.dividerTopColor} position="top" />

            <div className="relative z-10">
                {isBoxed ? (
                    <div className="w-full max-w-5xl mx-auto">
                        <div className={clsx(boxClasses, boxPadding)} style={boxStyle}>
                            <div className={innerMaxWidth} style={containerStyle}>
                                {children}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={innerMaxWidth} style={containerStyle}>
                        {children}
                    </div>
                )}
            </div>

            <Dividers type={section.dividerBottom} color={section.dividerBottomColor} position="bottom" />
        </section>
    );
};
