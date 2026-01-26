import { clsx } from "clsx";
import { getImgUrl, getDesignTheme } from '../../utils/helpers';

export const HeroSection = ({ data: section, viewMode, accentColor: globalAccent }) => {
    const design = section.design || 'standard';
    const theme = getDesignTheme(design);
    const isMobile = viewMode === 'mobile';

    const heroStyle = {
        width: `${section.heroWidth}%`,
        height: `${section.heroHeight || 80}vh`,
        marginTop: section.heroWidth < 100 ? '20px' : '0',
        borderRadius: section.heroWidth < 100 ? theme.radius : '0',
    };

    const mediaStyle = {
        filter: `blur(${section.heroBlur || 0}px)`,
        objectPosition: `${section.heroPositionX || 50}% ${section.heroPositionY || 50}%`,
    };

    const scale = isMobile ? 0.7 : 1;
    const titleSize = (section.fontSize?.heroTitle || 3.5) * scale;
    const subtitleSize = (section.fontSize?.heroSubtitle || 1.1) * (isMobile ? 0.8 : 1);

    const isSangoLine = ['earth', 'gentle', 'standard', 'modern'].includes(design);
    const accent = section.accentColor || globalAccent || theme.accent;

    return (
        <div className={clsx(
            "hero-container relative mx-auto overflow-hidden shadow-2xl transition-all duration-700",
            section.heroWidth < 100 ? "rounded-3xl" : ""
        )} style={heroStyle}>

            {/* Background Media */}
            <div className="absolute inset-0 w-full h-full bg-gray-900">
                {section.heroType === 'video' ? (
                    (section.heroUrl && section.heroUrl.trim().length > 0) ? (
                        <video className="w-full h-full object-cover" src={section.heroUrl} autoPlay loop muted playsInline style={mediaStyle}></video>
                    ) : null
                ) : (
                    (section.heroUrl && section.heroUrl.trim().length > 0) ? (
                        <img src={section.heroUrl} className="w-full h-full object-cover" alt="Hero" style={mediaStyle} />
                    ) : null
                )}
            </div>

            {/* Premium Overlay & Gradient */}
            <div className={clsx(
                "absolute inset-0 transition-opacity duration-700",
                isSangoLine ? "bg-gradient-to-tr from-black/60 via-black/30 to-transparent" : "bg-black"
            )} style={{ opacity: section.heroOverlayOpacity || 0.4 }}></div>

            {/* Content Area */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 text-white z-10">
                <div className="max-w-4xl w-full translate-y-4 animate-fadeInUp">
                    {section.heroLabel && (
                        <span className="inline-block px-4 py-1 rounded-full text-[10px] font-black tracking-[0.3em] uppercase mb-6 bg-white/20 backdrop-blur-md border border-white/30">
                            {section.heroLabel}
                        </span>
                    )}

                    <h2 className="font-black leading-[1.1] mb-8 tracking-tighter"
                        style={{ fontSize: `${titleSize}rem`, textShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
                        {section.heroTitle || "A Beautiful Landing Page"}
                    </h2>

                    <p className="max-w-2xl mx-auto font-medium opacity-90 leading-relaxed mb-10"
                        style={{ fontSize: `${subtitleSize}rem`, tracking: isSangoLine ? '0.05em' : '0.15em' }}>
                        {section.heroSubtitle}
                    </p>

                    {/* CTA Section */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        {(section.buttons || []).length > 0 ? (
                            section.buttons.map((btn, idx) => (
                                <a key={btn.id} href={btn.url || '#'}
                                    className={clsx(
                                        "px-10 py-5 text-sm font-black tracking-widest uppercase transition-all active:scale-95 group overflow-hidden relative",
                                        isSangoLine ? "rounded-full shadow-[0_6px_0_rgba(0,0,0,0.1)]" : "rounded-lg"
                                    )}
                                    style={{
                                        backgroundColor: idx === 0 ? accent : 'rgba(255,255,255,0.1)',
                                        backdropFilter: idx === 0 ? 'none' : 'blur(10px)',
                                        border: idx === 0 ? 'none' : '1px solid rgba(255,255,255,0.3)',
                                        color: '#ffffff'
                                    }}>
                                    {btn.label}
                                    {!isSangoLine && idx === 0 && (
                                        <div className="absolute top-0 left-0 w-full h-full animate-shimmer pointer-events-none opacity-20">
                                            <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12"></div>
                                        </div>
                                    )}
                                </a>
                            ))
                        ) : (
                            section.buttonLabel && (
                                <button className={clsx(
                                    "px-12 py-5 text-sm font-black tracking-widest uppercase transition-all shadow-2xl active:scale-95",
                                    isSangoLine ? "rounded-full" : "rounded-lg"
                                )} style={{ backgroundColor: accent }}>
                                    {section.buttonLabel}
                                </button>
                            )
                        )}
                    </div>
                </div>

                {/* Hero Bottom - Mini Features (Optional) */}
                {!isMobile && (section.features || []).length > 0 && (
                    <div className="absolute bottom-12 left-0 w-full flex justify-center gap-12 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
                        {section.features.slice(0, 3).map((f, i) => (
                            <div key={i} className="flex flex-col items-center gap-2">
                                <div className="w-1 h-8 bg-white/30 rounded-full mb-1"></div>
                                <span className="text-[10px] font-bold tracking-widest uppercase opacity-70">{f}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
