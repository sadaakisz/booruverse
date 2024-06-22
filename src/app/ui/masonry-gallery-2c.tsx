import { BooruMediaSource } from '../lib/definitions';
import MasonryGalleryCol from "./masonry-gallery-col";

// LIMITATION: when in the end of the gallery, there is potential for whitespace due to height differences between cols

export default function MasonryGallery2c({ booruMediaSourceArray }: { booruMediaSourceArray: BooruMediaSource[]}) {
    const bmsArrayC1 = []
    const bmsArrayC2 = []
    
    for (var i = 1; i <= booruMediaSourceArray.length; i++) {
        if (i % 2 == 1) {
            bmsArrayC1.push(booruMediaSourceArray[i-1])
        } else {
            bmsArrayC2.push(booruMediaSourceArray[i-1])
        }
    }

    return (
        <div className="grid gap-3 grid-cols-2">
            <MasonryGalleryCol booruMediaSourceArray={bmsArrayC1}/>
            <MasonryGalleryCol booruMediaSourceArray={bmsArrayC2}/>
        </div>
    );
}