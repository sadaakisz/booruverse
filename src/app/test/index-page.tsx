'use client';
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const IndexPage = ({ initialData }: { initialData: any}) => {
  const [data, setData] = useState(initialData.props.initialData);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // New state for loading
  const [requestedPages, setRequestedPages] = useState(Array.prototype);

  const onScroll = useCallback(async () => { 
    const loadMoreData = async () => {
      setIsLoading(true);
      const requestPage = page + 1
      const requestURL = `https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${requestPage}`
      const moreData = await fetch(requestURL)
        .then(res => res.json());
      if (!requestedPages.includes(requestPage)) {
        requestedPages.push(requestPage);
        setData((currentData: any) => [...currentData, ...moreData]);
        setPage(currentPage => currentPage + 1);
      }
      setIsLoading(false);
    };
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isLoading) {
      await loadMoreData();
    }
  }, [isLoading, page, requestedPages]); // Dependencies

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {data.map((item: any) => (
        <div
          key={item.id}
          style={{
            marginBottom: "20px",
            position: "relative",
            width: "400px",
            height: "400px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image
            src={item.url}
            alt={item.title}
            fill
            sizes="40vw"
            style={{ objectFit: "contain" }}
          />
        </div>
      ))}
      {isLoading && <p>Loading more images...</p>} {/* Loading indicator */}
    </div>
  );
};

export default IndexPage;