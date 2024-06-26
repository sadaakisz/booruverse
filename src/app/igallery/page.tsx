import IndexGallery from "./index-gallery";

// TODO: Figure out a way to add image to gallery if loaded to prevent those gaps
// SOLUTION: Made the height of the image 0 if not loaded. It shows unloaded images tho.
// POSSIBLE WORKAROUND: Pass blurURL as placeholder or pass a lower resolution url (media_asset - variants - [2?] or type "720x720" - url)
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