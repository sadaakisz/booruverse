import { BooruMedia } from '../lib/definitions';
import MasonryGalleryCol from "./masonry-gallery-col";

// LIMITATION: when in the end of the gallery, there is potential for whitespace due to height differences between cols

export default function MasonryGallery3c({ booruMediaArray }: { booruMediaArray: BooruMedia[]}) {
    const bmsArrayC1 = []
    const bmsArrayC2 = []
    const bmsArrayC3 = []
    
    for (var i = 1; i <= booruMediaArray.length; i++) {
        if (i % 3 == 1) {
            bmsArrayC1.push(booruMediaArray[i-1])
        } else if (i % 3 == 2) {
            bmsArrayC2.push(booruMediaArray[i-1])
        } else {
            bmsArrayC3.push(booruMediaArray[i-1])
        }
    }

    return (
        <div className="grid gap-3 grid-cols-3">
            <MasonryGalleryCol booruMediaArray={bmsArrayC1}/>
            <MasonryGalleryCol booruMediaArray={bmsArrayC2}/>
            <MasonryGalleryCol booruMediaArray={bmsArrayC3}/>
        </div>
    );
}