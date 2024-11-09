export const SEOConfig = {
    defaultTitle: 'Adv Sanjay Jain | Property & Legal Expert in Pune',
    defaultDescription: 'Property lawyer in Pune, agreement drafting & registration, cooperative housing society, title transfer, cheque bounce cases',
    siteName: 'Adv Sanjay Jain',
    baseUrl: 'https://advsanjayjain.in',
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