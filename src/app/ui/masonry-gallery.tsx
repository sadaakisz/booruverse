import MasonryImage from "./masonry-image";
import MasonryVideo from "./masonry-video";

// masonry grid: https://tailwindflex.com/@simon-scheffer/masonry-grid
// map loop urls: https://stackoverflow.com/a/71834386
// conditional component: https://stackoverflow.com/a/70923139
export default function MasonryGallery({ mediaURLList }: { mediaURLList: string[]}) {
    return (
        <div className="columns-1 gap-3 sm:columns-2 md:columns-3 lg:columns-4 [&>Image:not(:first-child)]:mt-8">
            { mediaURLList.map((mediaURL, i) => (
                <div key={i}>
                    { mediaURL.endsWith('.mp4') // Replace endsWith with file_ext
                        ? <MasonryVideo videoURL={mediaURL}/>
                        : <MasonryImage imageURL={mediaURL}/>
                    }
                </div>
            ))}
        </div>
    );
}