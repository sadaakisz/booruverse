'use client';

import Image from "next/image";
import { useState } from "react";

// KNOWLEDGE: width auto fill: https://stackoverflow.com/a/76008677
// KNOWLEDGE: skeletons: https://stackoverflow.com/a/77031188
// decided not to go the skeleton route with onLoad, because it's firing early on some images.
// KNOWLEDGE: staking images for placeholder loading: https://stackoverflow.com/a/1997397

export default function MasonryImageHQ({ imageURL, previewURL }: { imageURL: string, previewURL: string }) {
    const [loaded, setLoaded] = useState(false);
    const [preloaded, setPreloaded] = useState(false);
    return (
        <div className="relative top-0 left-0">
            <Image
                className={`${(!preloaded) ? 'opacity-0' : 'opacity-100 h-auto'} rounded-lg relative top-0 left-0 z-0`}
                onLoad={() => setPreloaded(true)}
                src={previewURL}
                alt=""
                width={0} height={0} sizes="100vw"
                style={{
                    width: '100%',
                    height: 'auto',
                    transition: 'opacity 0.7s ease-out',
                    // transform 0 0 0 forces the GPU to be used
                    transform: 'translate3d(0, 0, 0)'
                }}
                priority={true}
            />
            <Image
                className={`rounded-lg absolute top-0 left-0 z-1`}
                onLoad={() => setLoaded(true)}
                src={imageURL}
                alt=""
                width={0} height={0} sizes="100vw"
                style={{
                    width: '100%',
                    height: 'auto',
                    transition: 'opacity 0.7s ease-out',
                    // transform 0 0 0 forces the GPU to be used
                    transform: 'translate3d(0, 0, 0)'
                }}
                priority={true}
            />
        </div>
    );
}