export const unsplashService = {
    // Get Access Key from local storage
    getAccessKey: () => {
        return localStorage.getItem('lp_builder_unsplash_key');
    },

    // Set Access Key
    setAccessKey: (key) => {
        localStorage.setItem('lp_builder_unsplash_key', key);
    },

    // Search Images
    searchImages: async (query, page = 1, perPage = 20) => {
        const accessKey = unsplashService.getAccessKey();

        if (!accessKey) {
            throw new Error('ACCESS_KEY_MISSING');
        }

        const response = await fetch(`https://api.unsplash.com/search/photos?page=${page}&per_page=${perPage}&query=${encodeURIComponent(query)}&lang=ja`, {
            headers: {
                'Authorization': `Client-ID ${accessKey}`
            }
        });

        if (!response.ok) {
            if (response.status === 403 || response.status === 401) {
                throw new Error('INVALID_KEY_OR_LIMIT');
            }
            throw new Error(`Unsplash API Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.results.map(img => ({
            id: img.id,
            url: img.urls.regular,      // Good for web usage
            thumb: img.urls.small,      // For grid display
            alt: img.alt_description || 'Unsplash Image',
            width: img.width,
            height: img.height,
            user: {
                name: img.user.name,
                username: img.user.username,
                link: img.user.links.html
            },
            link: img.links.html,       // Initial link to photo on Unsplash
            downloadLink: img.links.download_location // Required for tracking downloads
        }));
    },

    // Trigger Download (Required by Unsplash API guideline to count views)
    triggerDownload: async (downloadLocation) => {
        const accessKey = unsplashService.getAccessKey();
        if (accessKey && downloadLocation) {
            try {
                await fetch(downloadLocation, {
                    headers: { 'Authorization': `Client-ID ${accessKey}` }
                });
            } catch (e) {
                console.warn('Failed to trigger download event', e);
            }
        }
    }
};
