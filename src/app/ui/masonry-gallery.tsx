// NOT USED

import MasonryImageHQ from "./masonry-image-hq";
import MasonryVideo from "./masonry-video";
import { BooruMedia } from '../lib/definitions';
// KNOWLEDGE: masonry grid: https://tailwindflex.com/@simon-scheffer/masonry-grid
// KNOWLEDGE: map loop urls: https://stackoverflow.com/a/71834386
// KNOWLEDGE: conditional component: https://stackoverflow.com/a/70923139
// LIMITATION: when loading new images, they jump because it's populated from topleft to bottomleft and the rest of the columns
// LIMITATION: MasonryGallery3c aims to fix it, with the caveat of potential whitespace at the end of the gallery

export default function MasonryGallery({ booruMediaArray }: { booruMediaArray: BooruMedia[]}) {
    return (
        // 
        // <div className="grid gap-3 space-y-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div className="columns-1 gap-3 space-y-3 sm:columns-2 md:columns-3 lg:columns-4 [&>Image:not(:first-child)]:mt-8">
            { booruMediaArray.map((booruMedia, i) => (
                <div key={i} className="grid-element">
                    { booruMedia.file_ext === "mp4" || booruMedia.file_ext === "webm"
                        ? <MasonryVideo videoURL={booruMedia.file_url}/>
                        : <MasonryImageHQ imageURL={booruMedia.file_url} previewURL={booruMedia.variants[2].url}/>
                    }
                </div>
            ))}
        </div>
    );
}