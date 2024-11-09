export const SEOConfig = {
    defaultTitle: 'Your Brand Name - Primary Keyword',
    defaultDescription: 'Your compelling brand description with primary and secondary keywords',
    siteName: 'Your Brand Name',
    baseUrl: 'https://yourdomain.com',
};

export const generateMetaTags = (pageData) => {
    const title = `${pageData.title} | ${SEOConfig.siteName}`;
    const description = pageData.description || SEOConfig.defaultDescription;
    const url = `${SEOConfig.baseUrl}${pageData.path}`;
    
    return {
        title,
        description,
        canonical: url,
        openGraph: {
            title,
            description,
            url,
            siteName: SEOConfig.siteName,
            images: [
                {
                    url: pageData.image || `${SEOConfig.baseUrl}/default-og-image.jpg`,
                    width: 1200,
                    height: 630,
                    alt: pageData.imageAlt || title,
                }
            ],
        }
    };
}; 