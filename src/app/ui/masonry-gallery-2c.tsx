import { BooruMedia } from '../lib/definitions';
import MasonryGalleryCol from "./masonry-gallery-col";

// LIMITATION: when in the end of the gallery, there is potential for whitespace due to height differences between cols

export default function MasonryGallery2c({ booruMediaArray }: { booruMediaArray: BooruMedia[]}) {
    const bmArrayC1 = []
    const bmArrayC2 = []
    
    for (var i = 1; i <= booruMediaArray.length; i++) {
        if (i % 2 == 1) {
            bmArrayC1.push(booruMediaArray[i-1])
        } else {
            bmArrayC2.push(booruMediaArray[i-1])
        }
    }

    return (
        <div className="grid gap-3 grid-cols-2">
            <MasonryGalleryCol booruMediaArray={bmArrayC1}/>
            <MasonryGalleryCol booruMediaArray={bmArrayC2}/>
        </div>
    );
}