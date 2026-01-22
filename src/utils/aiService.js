export const aiService = {
    // Key Management
    getApiKey: () => {
        return localStorage.getItem('lp_builder_ai_key');
    },

    setApiKey: (key) => {
        localStorage.setItem('lp_builder_ai_key', key);
    },

    getOpenAIKey: () => {
        return localStorage.getItem('lp_builder_openai_key');
    },

    setOpenAIKey: (key) => {
        localStorage.setItem('lp_builder_openai_key', key);
    },

    // Gemini prompt optimization (Internal)
    generateOptimizedPrompt: async (apiKey, originalPrompt, style) => {
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `You are an expert AI art prompter. Convert the following Japanese user request into a highly detailed, English stable-diffusion style prompt.
                            
                            User Input: "${originalPrompt}"
                            Selected Style: "${style}"

                            Rules:
                            1. Translate the core concept to English accurately.
                            2. Enhance with high-quality keywords (e.g., 8k, cinematic, detailed) matching the selected style.
                            3. Output ONLY the raw English prompt text. No markdown, no explanations.`
                        }]
                    }]
                })
            });

            if (!response.ok) return null;
            const data = await response.json();
            return data.candidates[0].content.parts[0].text.trim();
        } catch (e) {
            console.error("Gemini optimization failed", e);
            return null;
        }
    },

    // OpenAI DALL-E 3 Generation
    generateImageOpenAI: async (apiKey, prompt, style) => {
        // Try to optimize prompt using Gemini if Google Key is available
        // ChatGPT automatically rewrites prompts; we mimic this using Gemini.
        const googleKey = aiService.getApiKey();
        let optimizedPrompt = null;

        if (googleKey) {
            try {
                optimizedPrompt = await aiService.generateOptimizedPrompt(googleKey, prompt, style);
            } catch (e) {
                console.warn("Prompt optimization failed for DALL-E, using raw prompt", e);
            }
        }

        const basePrompt = optimizedPrompt || prompt;
        const finalPrompt = `${basePrompt} ${style ? `in ${style} style` : ''}`;

        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "dall-e-3",
                prompt: finalPrompt,
                n: 1,
                size: "1024x1024",
                quality: "hd", // High Definition for better quality
                response_format: "url"
            })
        });

        if (!response.ok) {
            const cleanError = await response.json();
            throw new Error(`OpenAI Error: ${cleanError.error?.message || response.statusText}`);
        }

        const data = await response.json();
        return {
            url: data.data[0].url,
            usedPrompt: finalPrompt,
            isOptimized: !!optimizedPrompt,
            provider: 'openai'
        };
    },

    // Google Imagen 3 Generation
    generateImageGemini: async (apiKey, prompt, style) => {
        // Optimize prompt first using Flash (cheaper/faster for text)
        const optimizedPrompt = await aiService.generateOptimizedPrompt(apiKey, prompt, style);
        const finalPrompt = optimizedPrompt || `${prompt}, ${style} style`;

        // Imagen 3 endpoint on AI Studio (Generative Language API)
        // We try the standard stable ID.
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    instances: [
                        { prompt: finalPrompt }
                    ],
                    parameters: {
                        sampleCount: 1,
                        aspectRatio: "1:1",
                        includeAdversarialGeometries: false
                    }
                })
            });

            if (!response.ok) {
                const errorText = await response.json().catch(() => ({ error: { message: response.statusText } }));
                // Specific handling for 404/403 (Not Found/Permission)
                if (response.status === 404) {
                    throw new Error(`Imagen 3 Model not found (404). Your API Key version may not support it yet, or the model ID is different for your region.`);
                }
                throw new Error(`Gemini/Imagen Error: ${errorText.error?.message || response.statusText}`);
            }

            const data = await response.json();
            if (!data.predictions || !data.predictions[0]?.bytesBase64Encoded) {
                throw new Error('Gemini/Imagen: Unexpected response behavior.');
            }

            const base64Image = data.predictions[0].bytesBase64Encoded;
            return {
                url: `data:image/jpeg;base64,${base64Image}`,
                usedPrompt: finalPrompt,
                isOptimized: !!optimizedPrompt,
                provider: 'gemini'
            };
        } catch (e) {
            console.error("Imagen 3 generation failed:", e);
            throw e; // Propagate to UI
        }
    },

    // Unified Image Generation Entry Point
    generateImage: async (prompt, style = '', provider = 'gemini') => {
        const googleKey = aiService.getApiKey();
        const openaiKey = aiService.getOpenAIKey();

        // Dispatch based on provider
        if (provider === 'openai') {
            if (!openaiKey) throw new Error('API_KEY_MISSING_OPENAI');
            return await aiService.generateImageOpenAI(openaiKey, prompt, style);
        } else if (provider === 'gemini') {
            if (googleKey) {
                // Try Google Native (Imagen 3)
                try {
                    return await aiService.generateImageGemini(googleKey, prompt, style);
                } catch (e) {
                    console.error("Gemini native generation failed, falling back to standard mode", e);
                    // Fallthrough to fallback if native fails? 
                    // Or re-throw? 
                    // User explicitly wants Google Native. We should probably throw or return specific error.
                    // But to be kind, we can fallback to Pollinations if they just want an image.
                    // Let's re-throw for now so UI shows "Gemini Error" clearly as requested.
                    throw e;
                }
            }
        }

        // Fallback / Standard Mode (Pollinations)
        // This runs if provider is 'pollinations' (future) or if 'gemini' was selected but no key (demo mode)
        const finalPrompt = `${prompt}, ${style} style`; // Simple append
        const seed = Math.floor(Math.random() * 99999999);
        const url = `https://pollinations.ai/p/${encodeURIComponent(finalPrompt)}?nologo=true&t=${Date.now()}`;

        return {
            url,
            usedPrompt: finalPrompt,
            isOptimized: false,
            provider: 'standard'
        };
    }
};
