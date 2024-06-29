import IndexGallery from "./index-gallery";
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'booruverse',
}

// https://nextjs.org/docs/pages/api-reference/components/image#placeholder

// TODO: Implement safe mode toggle
// TODO: Implement test and real danbooru calls switch
// TODO: Consider using large_file_url instead of variants[2]

async function getStaticProps() {
    const res = await fetch('https://testbooru.donmai.us/posts.json?page=1&limit=40&tags=rating:g');
    const initialData = await res.json();
    return { props: {initialData} };
}

export default async function Page() {
    const initialData = await getStaticProps();
    return (
        <IndexGallery initialData={initialData}/>
    );
}