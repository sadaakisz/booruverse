'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

// KNOWLEDGE: Routing conventions: https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#example
// KNOWLEDGE: Fetching on load: https://nextjs.org/docs/pages/building-your-application/data-fetching/client-side#client-side-data-fetching-with-useeffect
// BUG: Sometimes when navigating towards this page it crashes.

const BooruImage = () => {
    const pathname = usePathname();
    const id = pathname.split('/')[2];
    const requestURL = `https://testbooru.donmai.us/posts/${id}.json`;

    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imagePreloaded, setImagePreloaded] = useState(false);

    useEffect(() => {
        fetch(requestURL)
            .then(res => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            });
    }, [requestURL]);

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No valid image url.</p>

    return (
        <div className='flex justify-center h-screen'>
            {
                !imageLoaded &&
                <Image 
                    className={`${(!imagePreloaded) ? 'opacity-0' : 'opacity-100 w-auto object-contain'}`}
                    onLoad={() => setImagePreloaded(true)}
                    src={data['large_file_url']}
                    alt=""
                    width={0} height={0} sizes="100vw"
                    style={{
                        width: 'auto',
                        height: 'auto',
                        transition: 'opacity 0.7s ease-out',
                        // transform 0 0 0 forces the GPU to be used
                        transform: 'translate3d(0, 0, 0)'
                    }}
                    priority={true}
                />
            }
            <Image
                className={`${(!imageLoaded) ? 'opacity-0' : 'opacity-100 w-auto object-contain'}`}
                onLoad={() => setImageLoaded(true)}
                src={data['file_url']}
                alt=""
                width={0} height={0} sizes="100vw"
                style={{
                    width: 'auto',
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

export default BooruImage;