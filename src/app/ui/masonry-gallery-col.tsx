import MasonryImage from "./masonry-image";
import MasonryVideo from "./masonry-video";
import { BooruMediaSource } from '../lib/definitions';

// LIMITATION: when in the end of the gallery, there is potential for whitespace due to height differences between cols
// KNOWLEDGE: map loop urls: https://stackoverflow.com/a/71834386
// KNOWLEDGE: conditional component: https://stackoverflow.com/a/70923139

export default function MasonryGalleryCol({ booruMediaSourceArray }: { booruMediaSourceArray: BooruMediaSource[]}) {
    return (
        <div className="grid-element space-y-3">
            { booruMediaSourceArray.map((booruMediaSource, i) => (
                <div key={i}>
                    { booruMediaSource.file_ext === "mp4" || booruMediaSource.file_ext === "webm"
                        ? <MasonryVideo videoURL={booruMediaSource.file_url}/>
                        : <MasonryImage imageURL={booruMediaSource.file_url}/>
                    }
                </div>
            ))}
        </div>
    );
}