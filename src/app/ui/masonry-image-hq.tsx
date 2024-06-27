'use client';

import Image from "next/image";
import { useState } from "react";

// KNOWLEDGE: width auto fill: https://stackoverflow.com/a/76008677
// KNOWLEDGE: skeletons: https://stackoverflow.com/a/77031188
// decided not to go the skeleton route with onLoad, because it's firing early on some images.
export default function MasonryImageHQ({ imageURL, previewURL }: { imageURL: string, previewURL: string }) {
    const [loaded, setLoaded] = useState(false);
    const [preloaded, setPreloaded] = useState(false);
    return (
        <div>
            {
                !loaded &&
                <Image 
                    className={`${(!preloaded) ? 'opacity-0' : 'opacity-100 h-auto'} rounded-lg`}
                    onLoad={() => setPreloaded(true)}
                    src={previewURL}
                    alt=""
                    width={0} height={0} sizes="100vw"
                    style={{ width: '100%', height: 'auto', transition: 'opacity 0.7s ease-out' }}
                    priority={true}
                />
            }
            <Image
                className={`${(!loaded) ? 'h-0' : 'h-auto'} rounded-lg`}
                onLoad={() => setLoaded(true)}
                src={imageURL}
                alt=""
                width={0} height={0} sizes="100vw"
                style={{ width: '100%', height: 'auto', transition: 'opacity 0.7s ease-out' }}
                priority={true}
            />
        </div>
        
    );
}