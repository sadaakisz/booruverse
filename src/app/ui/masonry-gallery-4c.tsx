import { BooruMediaSource } from '../lib/definitions';
import MasonryGalleryCol from "./masonry-gallery-col";

// LIMITATION: when in the end of the gallery, there is potential for whitespace due to height differences between cols

export default function MasonryGallery3c({ booruMediaSourceArray }: { booruMediaSourceArray: BooruMediaSource[]}) {
    const bmsArrayC1 = []
    const bmsArrayC2 = []
    const bmsArrayC3 = []
    const bmsArrayC4 = []
    
    for (var i = 1; i <= booruMediaSourceArray.length; i++) {
        if (i % 4 == 1) {
            bmsArrayC1.push(booruMediaSourceArray[i-1])
        } else if (i % 4 == 2) {
            bmsArrayC2.push(booruMediaSourceArray[i-1])
        } else if (i % 4 == 3) {
            bmsArrayC3.push(booruMediaSourceArray[i-1])
        } else {
            bmsArrayC4.push(booruMediaSourceArray[i-1])
        }
    }

    return (
        <div className="grid gap-3 grid-cols-4">
            <MasonryGalleryCol booruMediaSourceArray={bmsArrayC1}/>
            <MasonryGalleryCol booruMediaSourceArray={bmsArrayC2}/>
            <MasonryGalleryCol booruMediaSourceArray={bmsArrayC3}/>
            <MasonryGalleryCol booruMediaSourceArray={bmsArrayC4}/>
        </div>
    );
}