'use client';

import { useCallback, useEffect, useState } from "react";
import { BooruMedia } from './lib/definitions';
import MasonryGallery2c from "./ui/masonry-gallery-2c";
import MasonryGallery3c from "./ui/masonry-gallery-3c";
import MasonryGallery4c from "./ui/masonry-gallery-4c";
import { Squares2X2Icon } from '@heroicons/react/24/outline';
import { getCookieValue, setCookie } from "./lib/actions";

// BUG: It crashes when hot reloading, don't know if it's affected by another scenario. Solves itself reloading the page.
// It crashes when it's loading more pages and the window changes (whether by realoding the project or clicking a link).
// The issue is gone when useEffect is commented. Probably the loadMoreData or onScroll functions are problematic.

// TODO: Check if https://react.dev/learn/passing-data-deeply-with-context can help with maintaining the state of loaded images when going back or reloading here.

// KNOWLEDGE: infinite scroll: https://dev.to/kawanedres/implementing-infinite-scroll-in-nextjs-with-ssg-without-any-library-29g9

function addProperties(booruMediaArray: BooruMedia[], domain: string): BooruMedia[] {
    return booruMediaArray.map((media: BooruMedia) => ({
        ...media,
        image_ratio: Math.round((media.image_height/media.image_width)*100),
        domain: domain,
    }));
}

function filterEmptyURLs(booruMediaArray: BooruMedia[]): BooruMedia[] {
    return booruMediaArray.filter((media: BooruMedia) => typeof media.file_url !== "undefined");
}

const InfiniteGallery = ({ initialData, domain, colsCookieValue }: { initialData: BooruMedia[], domain: string, colsCookieValue: number }) => {
    const [booruMediaArray, setBooruMediaArray] = useState(
        filterEmptyURLs(
            addProperties(initialData, domain)
        )
    );
    const [cols, setCols] = useState(colsCookieValue);
    const [page, setPage] = useState(1);
    const [requestedPages, setRequestedPages] = useState(Array.prototype);
    const [isLoading, setIsLoading] = useState(false);

    const loadMoreData = useCallback(async () => {
        setIsLoading(true);
        const requestPage = page + 1
        const requestURL = `https://${domain}/posts.json?page=${requestPage}&limit=40&tags=rating:g`
        const moreData = await fetch(requestURL)
            .then(res => res.json());

        if (!requestedPages.includes(requestPage)) {
            const moreBooruMedia =
                filterEmptyURLs(
                    addProperties(moreData, domain)
                );
            setBooruMediaArray((currentBooruMediaArray: BooruMedia[]) => [...currentBooruMediaArray, ...moreBooruMedia]);
            setRequestedPages((currentRequestedPages: any) => [...currentRequestedPages, requestPage]);
            setPage(currentPage => currentPage + 1);
        }
        setIsLoading(false);
    }, [domain, page, requestedPages]);

    const onScroll = useCallback(async () => {
        // KNOWLEDGE: it fetches more pages when 0.75x of the gallery height
        if (window.scrollY + window.innerHeight >= document.body.offsetHeight * (3/4) && !isLoading) {
            await loadMoreData();
        }
    }, [isLoading, loadMoreData]);

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [onScroll]);

    async function changeColsNum() {
        if (cols == 2) {
            setCookie('cols', '3');
        }
        else if (cols == 3) {
            setCookie('cols', '4');
        }
        else {
            setCookie('cols', '2');
        }
        setCols(Number(await getCookieValue('cols')));
    }

    return (
        <div>
            { cols == 2
                ? <MasonryGallery2c booruMediaArray={ booruMediaArray }/>
                : cols == 3
                    ? <MasonryGallery3c booruMediaArray={ booruMediaArray }/>
                    : cols == 4
                        ? <MasonryGallery4c booruMediaArray={ booruMediaArray }/>
                        : <h1>Invalid colsNum value. {cols}</h1>
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

export default InfiniteGallery;