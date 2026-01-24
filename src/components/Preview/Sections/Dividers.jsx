import React from 'react';

/**
 * Dividers Component
 * Renders decorative SVG dividers for sections.
 */
export const Dividers = ({ type, color, position }) => {
    if (!type || type === 'none') return null;

    const paths = {
        'wave': "M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z",
        'tilt-right': "M0,120L1440,0L1440,120L0,120Z",
        'tilt-left': "M0,0L1440,120L0,120Z",
        'triangle': "M720,0L1440,120L0,120Z",
        'curve': "M0,0 C480,120 960,120 1440,0 L1440,120 L0,120 Z",
    };

    if (!paths[type]) return null;

    const style = position === 'top'
        ? { top: 0, transform: 'translateY(-1px) rotate(180deg)', left: 0 }
        : { bottom: 0, transform: 'translateY(1px)', left: 0 };

    return (
        <div className="absolute w-full overflow-hidden leading-[0] z-20" style={style}>
            <svg viewBox="0 0 1440 120" fill={color || 'currentColor'} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <path d={paths[type]}></path>
            </svg>
        </div>
    );
};
