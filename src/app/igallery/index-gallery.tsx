'use client';

import { useCallback, useEffect, useState } from "react";
import { BooruMedia } from '../lib/definitions';
import MasonryGallery2c from "../ui/masonry-gallery-2c";
import MasonryGallery3c from "../ui/masonry-gallery-3c";
import MasonryGallery4c from "../ui/masonry-gallery-4c";

// BUG: It crashes when hot reloading, don't know if it's affected by another scenario. Solves itself reloading the page.
// SOLUTION: https://stackoverflow.com/a/75339011
// Added suppressHydrationWarning={true} in Root Layout. 
// Sometimes it still happens when changing significant code? Only with extensions on though.
// It appears that using setRequestedPages instead of pushing directly solves it.

// KNOWLEDGE: infinite scroll: https://dev.to/kawanedres/implementing-infinite-scroll-in-nextjs-with-ssg-without-any-library-29g9

// TODO: Figure out a way to balance columns (math) or begin loading when that smallest column ends (this is kinda a workaround).
const IndexGallery = ({ initialData }: { initialData: any}) => {
    // TODO: Change this value to be in Page component?
    const colsNum: Number = 4;

    const [data, setData] = useState(initialData.props.initialData);
    const [booruMediaArray, setBooruMediaArray] = useState(
        data.map((media: any) => (
            {
                id: media.id,
                score: media.score,
                rating: media.rating,
                file_ext: media.file_ext,
                file_url: media.file_url,
                image_height: media.image_height,
                tag_string_general: media.tag_string_general,
                tag_string_character: media.tag_string_character,
                tag_string_artist: media.tag_string_artist,
                tag_string_meta: media.tag_string_meta,
            }
        )).filter((media: BooruMedia) => typeof media.file_url !== "undefined")
    );
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false); // New state for loading
    const [requestedPages, setRequestedPages] = useState(Array.prototype);

    const onScroll = useCallback(async () => {
    const loadMoreData = async () => {
        setIsLoading(true);
        const requestPage = page + 1
        const requestURL = `https://testbooru.donmai.us/posts.json?page=${requestPage}&limit=40&tags=rating:g`
        const moreData = await fetch(requestURL)
            .then(res => res.json());
        if (!requestedPages.includes(requestPage)) {
            setRequestedPages((currentRequestedPages: any) => [...currentRequestedPages, requestPage]);
            setData((currentData: any) => [...currentData, ...moreData]);
            const tmpBMA = data.map((media: any) => (
                {
                    id: media.id,
                    score: media.score,
                    rating: media.rating,
                    file_ext: media.file_ext,
                    file_url: media.file_url,
                    image_height: media.image_height,
                    tag_string_general: media.tag_string_general,
                    tag_string_character: media.tag_string_character,
                    tag_string_artist: media.tag_string_artist,
                    tag_string_meta: media.tag_string_meta,
                }
            ));
            const cleanTmpBMA = tmpBMA.filter((media: BooruMedia) => typeof media.file_url !== "undefined")
            setBooruMediaArray(cleanTmpBMA);
            setPage(currentPage => currentPage + 1);
            }
            setIsLoading(false);
        };
        /* console.log('window.innerHeight:', window.innerHeight);
        console.log('window.scrollY:', window.scrollY);
        console.log('document.body.offsetHeight:', document.body.offsetHeight); */
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - window.innerHeight && !isLoading) {
            await loadMoreData();
        }
    }, [data, isLoading, page, requestedPages]); // Dependencies

    useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
    }, [onScroll]);
    return (
        <div>
            { colsNum == 2
                ? <MasonryGallery2c booruMediaArray={ booruMediaArray }/>
                : colsNum == 3
                    ? <MasonryGallery3c booruMediaArray={ booruMediaArray }/>
                    : colsNum == 4
                        ? <MasonryGallery4c booruMediaArray={ booruMediaArray }/>
                        : <h1>Invalid colsNum value.</h1>
            }
            {isLoading && <p>Loading more images...</p>} {/* Loading indicator */}
        </div>
    );
};

export default IndexGallery;