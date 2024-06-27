import MasonryImageHQ from "./masonry-image-hq";
import MasonryImageLQ from "./masonry-image-lq";
import MasonryVideo from "./masonry-video";
import { BooruMedia } from '../lib/definitions';


// LIMITATION: when in the end of the gallery, there is potential for whitespace due to height differences between cols
// KNOWLEDGE: map loop urls: https://stackoverflow.com/a/71834386
// KNOWLEDGE: conditional component: https://stackoverflow.com/a/70923139

export default function MasonryGalleryCol({ booruMediaArray, hq }: { booruMediaArray: BooruMedia[], hq: boolean }) {
    return (
        <div className="grid-element space-y-3">
            { booruMediaArray.map((booruMedia, i) => (
                <div key={i}>
                    { booruMedia.file_ext === "mp4" || booruMedia.file_ext === "webm"
                        ? <MasonryVideo videoURL={booruMedia.file_url}/>
                        : hq
                            ? <MasonryImageHQ imageURL={booruMedia.file_url} previewURL={booruMedia.variants[2].url}/>
                            : <MasonryImageLQ imageURL={booruMedia.file_url} previewURL={booruMedia.variants[2].url}/>
                    }
                </div>
            ))}
        </div>
    );
}