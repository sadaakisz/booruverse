import IndexGallery from "./index-gallery";

// https://nextjs.org/docs/pages/api-reference/components/image#placeholder

// TODO: Implement safe mode toggle
// TODO: Implement test and real danbooru calls switch

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