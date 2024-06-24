import IndexGallery from "./index-gallery";

async function getStaticProps() {
    const res = await fetch('https://testbooru.donmai.us/posts.json?page=1&tags=rating:g');
    const initialData = await res.json();
    return { props: {initialData} };
}

export default async function Page() {
    const initialData = await getStaticProps();
    return (
        <IndexGallery initialData={initialData}/>
    );
}