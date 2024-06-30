import InfiniteGallery from "./infinite-gallery";
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'booruverse',
}

// https://nextjs.org/docs/pages/api-reference/components/image#placeholder

// TODO: Implement safe mode toggle
// TODO: Implement test and real danbooru calls switch

async function getStaticProps(domain: string) {
    const res = await fetch(`https://${domain}/posts.json?page=1&limit=40&tags=rating:g`);
    const initialData = await res.json();
    return initialData;
}

export default async function Page() {
    const domain = 'testbooru.donmai.us';
    const initialData = await getStaticProps(domain);

    
    return (
        <InfiniteGallery initialData={initialData} domain={domain}/>
    );
}