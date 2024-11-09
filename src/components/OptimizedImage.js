import { useState, useEffect } from 'react';

export const OptimizedImage = ({ 
    src, 
    alt, 
    width, 
    height, 
    loading = 'lazy',
    sizes = '100vw'
}) => {
    const [imageSrc, setImageSrc] = useState(src);

    useEffect(() => {
        // Generate responsive image srcset
        const generateSrcSet = () => {
            const widths = [320, 640, 768, 1024, 1366, 1600];
            return widths
                .map(w => `${src}?width=${w} ${w}w`)
                .join(', ');
        };

        if (src) {
            setImageSrc(src);
        }
    }, [src]);

    return (
        <img
            src={imageSrc}
            alt={alt}
            width={width}
            height={height}
            loading={loading}
            sizes={sizes}
            srcSet={generateSrcSet()}
            style={{
                maxWidth: '100%',
                height: 'auto',
            }}
        />
    );
}; 