import InfiniteGallery from "./infinite-gallery";
import { Metadata } from 'next'
import { getCookieValue, setCookie } from "./lib/cookies";

export const metadata: Metadata = {
    title: 'booruverse',
}

// https://nextjs.org/docs/pages/api-reference/components/image#placeholder

// TODO: Implement safe mode toggle
// TODO: Implement test and real danbooru calls switch: Use cookies to store the URL.

async function getStaticProps(domain: string) {
    const res = await fetch(`https://${domain}/posts.json?page=1&limit=40&tags=rating:g`);
    const initialData = await res.json();
    return initialData;
}

export default async function Page() {
    const domain = 'testbooru.donmai.us';
    const initialData = await getStaticProps(domain);
    let colsCookieValue = Number(await getCookieValue('cols'));
    if (colsCookieValue == 0) {
        setCookie('cols', '2');
        colsCookieValue = 2;
    }

    return (
        <InfiniteGallery initialData={initialData} domain={domain} colsCookieValue={colsCookieValue}/>
    );
}