'use client';

import { useCallback, useEffect, useState } from "react";
import { BooruMedia } from './lib/definitions';
import MasonryGallery2c from "./ui/masonry-gallery-2c";
import MasonryGallery3c from "./ui/masonry-gallery-3c";
import MasonryGallery4c from "./ui/masonry-gallery-4c";
import { Squares2X2Icon } from '@heroicons/react/24/outline';

// BUG: It crashes when hot reloading, don't know if it's affected by another scenario. Solves itself reloading the page.
// It crashes when it's loading more pages and the window changes (whether by realoding the project or clicking a link).
// The issue is gone when useEffect is commented. Probably the loadMoreData or onScroll functions are problematic.

// KNOWLEDGE: infinite scroll: https://dev.to/kawanedres/implementing-infinite-scroll-in-nextjs-with-ssg-without-any-library-29g9

const IndexGallery = ({ initialData, domain }: { initialData: any, domain: string}) => {
    const [colsNum, setColsNum] = useState(2);
    const [data, setData] = useState(initialData.props.initialData);
    const [booruMediaArray, setBooruMediaArray] = useState(
        data.map((media: any) => (
            {
                id: media.id,
                score: media.score,
                rating: media.rating,
                file_ext: media.file_ext,
                file_url: media.file_url,
                variants: media.media_asset.variants,
                image_height: media.image_height,
                image_width: media.image_width,
                image_ratio: Math.round((media.image_height/media.image_width)*100),
                tag_string_general: media.tag_string_general,
                tag_string_character: media.tag_string_character,
                tag_string_artist: media.tag_string_artist,
                tag_string_meta: media.tag_string_meta,
                domain: String(media.file_url).split('/')[2],
            }
        )).filter((media: BooruMedia) => typeof media.file_url !== "undefined")
    );
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false); // New state for loading
    const [requestedPages, setRequestedPages] = useState(Array.prototype);

    const loadMoreData = useCallback(async () => {
        setIsLoading(true);
        const requestPage = page + 1
        const requestURL = `https://${domain}/posts.json?page=${requestPage}&limit=40&tags=rating:g`
        const moreData = await fetch(requestURL)
            .then(res => res.json());
        if (!requestedPages.includes(requestPage)) {
            setRequestedPages((currentRequestedPages: any) => [...currentRequestedPages, requestPage]);
            setData((currentData: any) => [...currentData, ...moreData]);
            // (media_asset - variants - [2?] or type "720x720" - url)
            const tmpBMA = data.map((media: any) => (
                {
                    id: media.id,
                    score: media.score,
                    rating: media.rating,
                    file_ext: media.file_ext,
                    file_url: media.file_url,
                    variants: media.media_asset.variants,
                    image_height: media.image_height,
                    image_width: media.image_width,
                    image_ratio: Math.round((media.image_height/media.image_width)*100),
                    tag_string_general: media.tag_string_general,
                    tag_string_character: media.tag_string_character,
                    tag_string_artist: media.tag_string_artist,
                    tag_string_meta: media.tag_string_meta,
                    domain: String(media.file_url).split('/')[2],
                }
            ));
            const cleanTmpBMA = tmpBMA.filter((media: BooruMedia) => typeof media.file_url !== "undefined")
            setBooruMediaArray(cleanTmpBMA);
            setPage(currentPage => currentPage + 1);
        }
        setIsLoading(false);
    }, [data, domain, page, requestedPages]);

    const onScroll = useCallback(async () => {
        // KNOWLEDGE: it fetches more pages when 0.75x of the gallery height
        if (window.scrollY + window.innerHeight >= document.body.offsetHeight * (3/4) && !isLoading) {
            await loadMoreData();
        }
    }, [isLoading, loadMoreData]); // Dependencies

    useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
    }, [onScroll]);

    function changeColsNum() {
        console.log('colsNum:', colsNum)
        if (colsNum == 2) setColsNum(3);
        else if (colsNum == 3) setColsNum(4);
        else setColsNum(2);
    }

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
            <div onClick={() => { loadMoreData() }} className="flex items-center justify-center w-full my-4">
                <div className="flex items-center justify-center bg-slate-800 rounded-xl h-[48px] w-[192px]">
                    <h1>Load more</h1>
                </div>
            </div>

            <div
            className="flex items-center justify-center fixed bottom-4 right-16 mr-2 h-[48px] w-[48px] bg-gray-900 rounded-xl"
            >
                {
                    !isLoading &&
                    <h1>{page}</h1>
                }
                {
                    isLoading &&
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                }
            </div>
            <div 
                className="flex items-center justify-center fixed bottom-4 right-4 h-[48px] w-[48px] bg-gray-900 rounded-xl"
                onClick={() => changeColsNum()}
            >
                <Squares2X2Icon className="h-[24px] w-[24px] text-gray-300 peer-focus:text-gray-900"/>
            </div>
        </div>
    );
};

export default IndexGallery;