// pages/index.js
export async function getStaticProps() {
    const res = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=10');
    const initialData = await res.json();
    return { props: { initialData } };
  }