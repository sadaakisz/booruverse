import { BooruMediaSource } from '../lib/definitions';
import MasonryGalleryCol from "./masonry-gallery-col";

// LIMITATION: when in the end of the gallery, there is potential for whitespace due to height differences between cols

export default function MasonryGallery3c({ booruMediaSourceArray }: { booruMediaSourceArray: BooruMediaSource[]}) {
    const bmsArrayC1 = []
    const bmsArrayC2 = []
    const bmsArrayC3 = []
    
    for (var i = 1; i <= booruMediaSourceArray.length; i++) {
        if (i % 3 == 1) {
            bmsArrayC1.push(booruMediaSourceArray[i-1])
        } else if (i % 3 == 2) {
            bmsArrayC2.push(booruMediaSourceArray[i-1])
        } else {
            bmsArrayC3.push(booruMediaSourceArray[i-1])
        }
    }

    return (
        <div className="grid gap-3 grid-cols-3">
            <MasonryGalleryCol booruMediaSourceArray={bmsArrayC1}/>
            <MasonryGalleryCol booruMediaSourceArray={bmsArrayC2}/>
            <MasonryGalleryCol booruMediaSourceArray={bmsArrayC3}/>
        </div>
    );
}