import { BooruMedia } from '../lib/definitions';
import MasonryGalleryCol from "./masonry-gallery-col";

// LIMITATION: when in the end of the gallery, there is potential for whitespace due to height differences between cols

export default function MasonryGallery3c({ booruMediaArray }: { booruMediaArray: BooruMedia[]}) {
    const bmArrayC1 = [];
    const bmArrayC2 = [];
    const bmArrayC3 = [];
    let hC1 = 0;
    let hC2 = 0;
    let hC3 = 0;
    
    for (var i = 1; i <= booruMediaArray.length; i++) {
        let hMin = Math.min(hC1, hC2, hC3);
        if (hMin == hC1) {
            bmArrayC1.push(booruMediaArray[i-1]);
            hC1 = hC1 + booruMediaArray[i-1].image_ratio;
        } else if (hMin == hC2) {
            bmArrayC2.push(booruMediaArray[i-1]);
            hC2 = hC2 + booruMediaArray[i-1].image_ratio;
        } else {
            bmArrayC3.push(booruMediaArray[i-1]);
            hC3 = hC3 + booruMediaArray[i-1].image_ratio;
        }
    }

    const minPrune = Math.min(hC1, hC2, hC3);
    hC1 = hC1 - minPrune;
    hC2 = hC2 - minPrune;
    hC3 = hC3 - minPrune;

    return (
        <div className="grid gap-3 grid-cols-3">
            <MasonryGalleryCol booruMediaArray={bmArrayC1}/>
            <MasonryGalleryCol booruMediaArray={bmArrayC2}/>
            <MasonryGalleryCol booruMediaArray={bmArrayC3}/>
        </div>
    );
}