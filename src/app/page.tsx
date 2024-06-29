import IndexGallery from "./index-gallery";
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'booruverse',
}

// https://nextjs.org/docs/pages/api-reference/components/image#placeholder

// TODO: Implement safe mode toggle
// TODO: Implement test and real danbooru calls switch
// TODO: Consider using large_file_url instead of variants[2]

async function getStaticProps(domain: string) {
    const res = await fetch(`https://${domain}/posts.json?page=1&limit=40&tags=rating:g`);
    const initialData = await res.json();
    return { props: {initialData} };
}

export default async function Page() {
    const domain = 'danbooru.donmai.us';
    const initialData = await getStaticProps(domain);
    return (
        <IndexGallery initialData={initialData} domain={domain}/>
    );
}