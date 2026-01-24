import React from 'react';
import { clsx } from 'clsx';

export const HeroSection = ({ data, viewMode }) => {
    const heroStyle = {
        width: `${data.heroWidth}%`,
        height: `${data.heroHeight}vh`,
        marginTop: data.heroWidth < 100 ? '20px' : '0',
        borderRadius: data.heroWidth < 100 ? '16px' : '0',
    };

    const mediaStyle = {
        filter: `blur(${data.heroBlur}px)`,
        objectPosition: `${data.heroPositionX}% ${data.heroPositionY}%`,
    };

    // Calculate responsive font size locally or accept from props
    // In LivePreview we calculated it but didn't pass it to HeroSection yet.
    // It's cleaner to do it here or pass it. Let's calculate it here for simplicity or accept it.
    // Actually, LivePreview logic didn't pass it to HeroSection.

    // Scale factor
    const scale = viewMode === 'mobile' ? 0.6 : 1;
    const titleSize = data.fontSize.heroTitle * scale;
    const subtitleSize = data.fontSize.heroSubtitle * (viewMode === 'mobile' ? 0.8 : 1);

    return (
        <div className="hero-container relative mx-auto overflow-hidden shadow-lg group" style={heroStyle}>
            <div className="absolute inset-0 w-full h-full">
                {data.heroType === 'video' ? (
                    (data.heroUrl && data.heroUrl.trim().length > 0) ? (
                        <video
                            className="w-full h-full object-cover"
                            src={data.heroUrl}
                            autoPlay
                            loop
                            muted
                            playsInline
                            style={mediaStyle}
                        ></video>
                    ) : (
                        <div className="w-full h-full bg-gray-500 opacity-20"></div>
                    )
                ) : (
                    (data.heroUrl && data.heroUrl.trim().length > 0) ? (
                        <img
                            src={data.heroUrl}
                            className="hero-media w-full h-full object-cover"
                            alt="Hero"
                            style={mediaStyle}
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-500 opacity-20"></div>
                    )
                )}
            </div>
            <div className="absolute inset-0 bg-black transition-opacity duration-300" style={{ opacity: data.heroOverlayOpacity }}></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-white z-10">
                <h2
                    className="font-light leading-tight mb-6 opacity-0 animate-fadeInUp"
                    style={{ animationDelay: '0.2s', fontSize: `${titleSize}rem` }}
                >
                    {data.heroTitle}
                </h2>
                <p
                    className="uppercase tracking-[0.2em] opacity-0 animate-fadeInUp leading-loose whitespace-pre-wrap"
                    style={{ animationDelay: '0.4s', fontSize: `${subtitleSize}rem` }}
                >
                    {data.heroSubtitle}
                </p>
            </div>


        </div>
    );
};
