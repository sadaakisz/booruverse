import MasonryImage from "./masonry-image";

// masonry grid: https://tailwindflex.com/@simon-scheffer/masonry-grid
// map loop urls: https://stackoverflow.com/a/71834386*/
export default function MasonryGallery({ imageURLList }: { imageURLList: string[]}) {
    return (
        <div className="columns-1 gap-3 sm:columns-2 md:columns-3 lg:columns-4 [&>Image:not(:first-child)]:mt-8">
            { imageURLList.map((imageURL, i) => (
                <div key={i}>
                    <MasonryImage imageURL={imageURL}/>
                </div>
            ))}
        </div>
    );
}