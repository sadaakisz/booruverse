import { BooruMedia } from '../lib/definitions';
import MasonryGalleryCol from "./masonry-gallery-col";

// LIMITATION: when in the end of the gallery, there is potential for whitespace due to height differences between cols

export default function MasonryGallery3c({ booruMediaArray }: { booruMediaArray: BooruMedia[]}) {
    const bmArrayC1 = [];
    const bmArrayC2 = [];
    const bmArrayC3 = [];
    const bmArrayC4 = [];
    let hC1 = 0;
    let hC2 = 0;
    let hC3 = 0;
    let hC4 = 0;

    for (var i = 1; i <= booruMediaArray.length; i++) {
        let hMin = Math.min(hC1, hC2, hC3, hC4);
        if (hMin == hC1) {
            bmArrayC1.push(booruMediaArray[i-1]);
            hC1 = hC1 + booruMediaArray[i-1].image_ratio;
        } else if (hMin == hC2) {
            bmArrayC2.push(booruMediaArray[i-1]);
            hC2 = hC2 + booruMediaArray[i-1].image_ratio;
        } else if (hMin == hC3) {
            bmArrayC3.push(booruMediaArray[i-1]);
            hC3 = hC3 + booruMediaArray[i-1].image_ratio;
        } else {
            bmArrayC4.push(booruMediaArray[i-1]);
            hC4 = hC4 + booruMediaArray[i-1].image_ratio;
        }
    }

    const minPrune = Math.min(hC1, hC2, hC3, hC4);
    hC1 = hC1 - minPrune;
    hC2 = hC2 - minPrune;
    hC3 = hC3 - minPrune;
    hC4 = hC4 - minPrune;

    return (
        <div className="grid gap-3 grid-cols-4">
            <MasonryGalleryCol booruMediaArray={bmArrayC1} hq={false}/>
            <MasonryGalleryCol booruMediaArray={bmArrayC2} hq={false}/>
            <MasonryGalleryCol booruMediaArray={bmArrayC3} hq={false}/>
            <MasonryGalleryCol booruMediaArray={bmArrayC4} hq={false}/>
        </div>
    );
}