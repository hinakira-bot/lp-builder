/* eslint-disable */
import React from 'react';
import { HeroSection } from './HeroSection';
import { TextRenderer, ImageRenderer, HeadingRenderer, VideoRenderer, ButtonRenderer } from './Sections/Renderers';
import { SocialRenderer, AccordionRenderer, PostCardRenderer, ColumnsRenderer, LinksRenderer, BoxRenderer } from './Sections/ComplexRenderers';
import { ConversionPanel, PointList, ProblemChecklist, SpeechBubbleRenderer, PricingRenderer, ProcessRenderer, StaffRenderer, FAQRenderer, ComparisonRenderer, AccessRenderer, ReviewRenderer } from './Sections/BusinessRenderers';
import { SectionWrapper } from './Sections/SectionWrapper';
import { TYPE_ALIASES } from '../../utils/componentRegistry';
import { normalizeSectionForRender } from '../../utils/normalization';
import { getImgUrl } from '../../utils/helpers';

// Map of all available renderers
export const renderers = {
    text: TextRenderer,
    image: ImageRenderer,
    image_text: ({ section, fontSize, viewMode, globalPadding }) => {
        const isRight = section.imagePosition === 'right';
        const isMobile = viewMode === 'mobile';
        const imgUrl = getImgUrl(section.image);

        // Text Styles Logic
        let textClasses = "";
        if (section.textShadow === 'soft') textClasses += " drop-shadow-md";
        if (section.textShadow === 'strong') textClasses += " drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]";

        let containerClasses = "";
        if (section.textBackdrop === 'blur') containerClasses += " backdrop-blur-md bg-white/10 p-6 rounded-xl border border-white/20 shadow-lg";
        if (section.textBackdrop === 'white') containerClasses += " bg-white/90 backdrop-blur text-gray-800 p-6 rounded-xl shadow-lg";
        if (section.textBackdrop === 'black') containerClasses += " bg-black/70 backdrop-blur text-white p-6 rounded-xl shadow-lg";

        return (
            <SectionWrapper section={section} globalPadding={globalPadding}>
                <div className={`flex flex-col ${isMobile ? '' : 'md:flex-row'} gap-10 items-center`}>
                    <div className={`w-full ${isMobile ? '' : 'md:w-1/2'} ${!isMobile && isRight ? 'md:order-2' : ''}`}>
                        {imgUrl ? (
                            <img src={imgUrl} alt={section.title} className="w-full h-auto rounded-lg shadow-lg object-cover aspect-[4/3]" />
                        ) : (
                            <div className="w-full h-auto aspect-[4/3] bg-gray-200 flex items-center justify-center rounded-lg text-gray-400">No Image</div>
                        )}
                    </div>
                    <div className={`w-full ${isMobile ? '' : 'md:w-1/2'} ${!isMobile && isRight ? 'md:order-1 md:pr-10' : (isMobile ? '' : 'md:pl-10')}`}>
                        <div className={containerClasses}>
                            <h3 className={`font-medium tracking-widest mb-6 leading-tight ${textClasses}`} style={{ fontSize: `${fontSize.sectionTitle}rem` }}>{section.title}</h3>
                            <p className={`leading-loose whitespace-pre-wrap font-light ${textClasses}`} style={{ fontSize: `${fontSize.body}rem` }}>{section.content}</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>
        );
    },
    heading: HeadingRenderer,
    video: VideoRenderer,
    button: ButtonRenderer,
    social: SocialRenderer,
    accordion: AccordionRenderer,
    post_card: PostCardRenderer,
    columns: ColumnsRenderer,
    links: LinksRenderer,
    box: BoxRenderer,
    conversion_panel: ConversionPanel,
    point_list: PointList,
    problem_checklist: ProblemChecklist,
    speech_bubble: SpeechBubbleRenderer,
    pricing: PricingRenderer,

    // New Components
    process: ProcessRenderer,
    staff: StaffRenderer,
    faq: FAQRenderer,
    comparison: ComparisonRenderer,
    review: ReviewRenderer,
    access: AccessRenderer
};

export const SectionDispatcher = ({ sections, viewMode, fontSize, accentColor, globalPadding }) => {
    if (!sections || sections.length === 0) return null;

    return (
        <>
            {sections.map((section) => {
                // If section is sticky, it's handled elsewhere usually, but if nested, we might render it?
                // For now, assume top-level sticky handling filters them out, but nested ones might display normally.
                // Actually, sticky usually implies "fixed to viewport", which is bad if nested. 
                // We will render it normally if nested.

                const normalizedSection = normalizeSectionForRender(section);
                const resolvedType = renderers[normalizedSection.type] ? normalizedSection.type : (TYPE_ALIASES[normalizedSection.type] || normalizedSection.type);
                const Renderer = renderers[resolvedType] || (() => (
                    <div className="text-red-500 p-8 border-2 border-dashed border-red-200 rounded-2xl bg-red-50/50 font-serif my-8 text-center">
                        <p className="font-bold text-lg mb-2">Unknown Section: {section.type}</p>
                        <p className="text-sm opacity-70">
                            ご不便をおかけしております。このコンポーネントは現在準備中か、名称が変更された可能性があります。<br />
                            AI生成をやり直すか、別のパーツへの差し替えをお試しください。
                        </p>
                    </div>
                ));

                // Handle Children (Nesting)
                // If the section has 'children' (e.g. Box, FullWidth), we pass a function or node to render them.
                // But Renderers need to accept 'children' prop.
                // We will render the children HERE and pass them as `children` prop.

                const childrenNodes = section.children && section.children.length > 0 ? (
                    <SectionDispatcher sections={section.children} viewMode={viewMode} fontSize={fontSize} globalPadding={globalPadding} />
                ) : null;

                return (
                    <Renderer
                        key={normalizedSection.id}
                        section={normalizedSection}
                        fontSize={fontSize}
                        viewMode={viewMode}
                        accentColor={accentColor}
                        globalPadding={globalPadding}
                    >
                        {childrenNodes}
                    </Renderer>
                );
            })}
        </>
    );
};
