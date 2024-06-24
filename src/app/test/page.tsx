import IndexPage from "./index-page";

async function getStaticProps() {
    const res = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=10');
    const initialData = await res.json();
    return { props: { initialData } };
}

export default async function Page() {
    const initialData = await getStaticProps();
    return (
        <IndexPage initialData={initialData}/>
    );
}