/**
 * UI Normalization Layer
 * Reconciles AI output with specific UI renderer requirements.
 */

import { getImgUrl } from './helpers';

export function normalizeSectionForRender(section) {
    if (!section) return section;

    const normalized = { ...section };

    // 1. Background Normalization (bgType / bgValue)
    const bgImage =
        normalized.bgImage ||
        normalized.style?.bgImage ||
        normalized.style?.backgroundImage ||
        normalized.imageConfig?.bgImage ||
        normalized.bgValue;

    if (bgImage && typeof bgImage === 'string' && bgImage.length > 0) {
        normalized.bgType = 'image';
        normalized.bgValue = bgImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
    } else if (normalized.backgroundColor || (normalized.bgType === 'color' && normalized.bgValue)) {
        normalized.bgType = 'color';
        normalized.bgValue = normalized.backgroundColor || normalized.bgValue;
    }

    // 2. Text Key Mapping (heading / text)
    if (!normalized.heading && normalized.title) {
        normalized.heading = normalized.title;
    }
    if (!normalized.text && normalized.content) {
        normalized.text = normalized.content;
    }

    // 3. Image Object Mapping (Guard against empty URLs or empty objects {})
    if (normalized.image) {
        const url = getImgUrl(normalized.image);
        if (url && typeof url === 'string' && url.trim().length > 0) {
            normalized.image = {
                url,
                alt: normalized.image?.alt || normalized.title || normalized.heading || 'section image'
            };
        } else {
            // Important: Handle {} case by setting to null or deleting
            normalized.image = null;
        }
    }

    // 4. Type-Specific Normalization (colType, stepType, layoutType)
    const design = (normalized.design || '').toLowerCase();

    if (normalized.type === 'columns') {
        if (!normalized.colType) {
            if (design.includes('card')) normalized.colType = 'card';
            else if (design.includes('image')) normalized.colType = 'image';
            else if (design.includes('social')) normalized.colType = 'social';
            else if (design.includes('video')) normalized.colType = 'video';
            else normalized.colType = 'text';
        }
    }

    if (normalized.type === 'process') {
        if (!normalized.stepType) {
            if (design.includes('timeline')) normalized.stepType = 'timeline';
            else if (design.includes('card')) normalized.stepType = 'card';
            else normalized.stepType = 'simple';
        }
    }

    if (normalized.type === 'review' || normalized.type === 'staff') {
        if (!normalized.layoutType) {
            if (design.includes('bubble')) normalized.layoutType = 'bubble';
            else if (design.includes('grid')) normalized.layoutType = 'grid';
            else if (design.includes('minimal')) normalized.layoutType = 'minimal';
            else normalized.layoutType = 'card';
        }
    }

    // 5. Items Normalization (Guard against empty item images + stable keys)
    const normalizeItems = (arr, prefix) => {
        if (!Array.isArray(arr)) return arr;
        return arr.map((item, idx) => {
            if (!item) return item;

            const body = item.text || item.content || item.description || item.desc || item.answer || "";
            const title = item.title || item.name || item.label || item.question || "";

            let img = item.image;
            if (img) {
                const url = getImgUrl(img);
                img = (url && typeof url === 'string' && url.trim().length > 0) ? { url, alt: title || normalized.title || 'item image' } : null;
            }

            return {
                ...item,
                title,
                text: body,
                content: body,
                image: img,
                id: item.id || item._id || `${normalized.id}-${prefix}-${idx}`
            };
        });
    };

    if (normalized.items) normalized.items = normalizeItems(normalized.items, 'item');
    if (normalized.bubbles) normalized.bubbles = normalizeItems(normalized.bubbles, 'bubble');
    if (normalized.plans) normalized.plans = normalizeItems(normalized.plans, 'plan');
    if (normalized.members) normalized.members = normalizeItems(normalized.members, 'member');
    if (normalized.faqs) normalized.faqs = normalizeItems(normalized.faqs, 'faq');
    if (normalized.features) normalized.features = normalizeItems(normalized.features, 'feature');

    // 6. Speech Bubble Normalization
    if (normalized.type === 'speech_bubble') {
        if (!normalized.text && (normalized.content || normalized.message)) {
            normalized.text = normalized.content || normalized.message;
        }
    }

    return normalized;
}

export function normalizeGlobalDataForRender(data) {
    if (!data) return data;

    const normalized = { ...data };

    // 1. Hero Data Normalization - ALWAYS prioritize AI generated background
    const heroBg =
        normalized.heroConfig?.bgImage ||
        normalized.heroConfig?.image?.url ||
        normalized.heroUrl ||
        normalized.heroImageFallback;

    if (heroBg && typeof heroBg === 'string' && heroBg.trim().length > 0) {
        normalized.heroUrl = heroBg;
        normalized.heroImageFallback = heroBg;
        normalized.heroBgType = 'image';
        normalized.heroBgValue = heroBg;
    }

    // 2. Global Background Normalization
    if (normalized.pageBgType === 'image' && normalized.pageBgValue) {
        normalized.pageBgValue = getImgUrl(normalized.pageBgValue);
    }

    // 3. Ensure Font Sizes exist
    if (!normalized.fontSize) {
        normalized.fontSize = { heroTitle: 4, heroSubtitle: 1, sectionTitle: 2, body: 1 };
    }

    // 4. Normalize sections
    if (Array.isArray(normalized.sections)) {
        normalized.sections = normalized.sections.map(normalizeSectionForRender);
    }

    return normalized;
}
