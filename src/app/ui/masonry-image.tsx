'use client';

import Image from "next/image";
import { useState } from "react";

// KNOWLEDGE: width auto fill: https://stackoverflow.com/a/76008677
// KNOWLEDGE: skeletons: https://stackoverflow.com/a/77031188
// decided not to go the skeleton route with onLoad, because it's firing early on some images.
export default function MasonryImage({ imageURL }: { imageURL: string }) {
    const [loaded, setLoaded] = useState(false)
    return (
        <Image
            className={`${(!loaded) ? 'opacity-0' : 'opacity-100'} rounded-xl`}
            onLoad={() => setLoaded(true)}
            src={imageURL}
            alt=""
            width={0} height={0} sizes="100vw"
            style={{ width: '100%', height: 'auto', transition: 'opacity 0.7s ease-out' }}
            priority={true}
            unoptimized
        />
    );
}