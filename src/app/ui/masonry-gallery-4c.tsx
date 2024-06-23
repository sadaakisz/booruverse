import { BooruMedia } from '../lib/definitions';
import MasonryGalleryCol from "./masonry-gallery-col";

// LIMITATION: when in the end of the gallery, there is potential for whitespace due to height differences between cols

export default function MasonryGallery3c({ booruMediaArray }: { booruMediaArray: BooruMedia[]}) {
    const bmArrayC1 = []
    const bmArrayC2 = []
    const bmArrayC3 = []
    const bmArrayC4 = []
    
    for (var i = 1; i <= booruMediaArray.length; i++) {
        if (i % 4 == 1) {
            bmArrayC1.push(booruMediaArray[i-1])
        } else if (i % 4 == 2) {
            bmArrayC2.push(booruMediaArray[i-1])
        } else if (i % 4 == 3) {
            bmArrayC3.push(booruMediaArray[i-1])
        } else {
            bmArrayC4.push(booruMediaArray[i-1])
        }
    }

    return (
        <div className="grid gap-3 grid-cols-4">
            <MasonryGalleryCol booruMediaArray={bmArrayC1}/>
            <MasonryGalleryCol booruMediaArray={bmArrayC2}/>
            <MasonryGalleryCol booruMediaArray={bmArrayC3}/>
            <MasonryGalleryCol booruMediaArray={bmArrayC4}/>
        </div>
    );
}