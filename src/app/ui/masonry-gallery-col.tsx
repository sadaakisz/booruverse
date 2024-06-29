import MasonryImageHQ from "./masonry-image-hq";
import MasonryImageLQ from "./masonry-image-lq";
import MasonryVideo from "./masonry-video";
import { BooruMedia } from '../lib/definitions';
import Link from "next/link";

// LIMITATION: when in the end of the gallery, there is potential for whitespace due to height differences between cols
// KNOWLEDGE: map loop urls: https://stackoverflow.com/a/71834386
// KNOWLEDGE: conditional component: https://stackoverflow.com/a/70923139

// TODO: Check nextjs router: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#metadata
// TODO: Alternatively, pass the id and provider and get the image in the component building the url.

export default function MasonryGalleryCol({ booruMediaArray, hq }: { booruMediaArray: BooruMedia[], hq: boolean }) {
    return (
        <div className="grid-element space-y-3">
            { booruMediaArray.map((booruMedia, i) => (
                <Link
                    key={i}
                    href={`/?imageId=${booruMedia.id}`}
                    as={`/i/${booruMedia.id}`}
                    shallow
                    className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
                >
                    { booruMedia.file_ext === "mp4" || booruMedia.file_ext === "webm"
                        ? <MasonryVideo videoURL={booruMedia.file_url}/>
                        : hq
                            ? <MasonryImageHQ imageURL={booruMedia.file_url} previewURL={booruMedia.variants[2].url}/>
                            : <MasonryImageLQ imageURL={booruMedia.file_url} previewURL={booruMedia.variants[2].url}/>
                    }
                </Link>
            ))}
        </div>
    );
}