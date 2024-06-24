import MasonryGallery from "../ui/masonry-gallery";
import MasonryGallery2c from "../ui/masonry-gallery-2c";
import MasonryGallery3c from "../ui/masonry-gallery-3c";
import MasonryGallery4c from '../ui/masonry-gallery-4c';
import { BooruMedia } from '../lib/definitions';

const url = "https://testbooru.donmai.us/posts.json?page=11&limit=40&tags=rating:g";

// KNOWLEDGE: how to reduce specific object parameters: https://stackoverflow.com/a/60408924
async function getBooruMediaArray() {
    const response = await fetch(url);
    const data = await response.json();
    const booruMediaArr: Array<BooruMedia> = data.map((media: any) => (
        {
            id: media.id,
            score: media.score,
            rating: media.rating,
            file_ext: media.file_ext,
            file_url: media.file_url,
            image_height: media.image_height,
            image_width: media.image_width,
            image_ratio: Math.round((media.image_height/media.image_width)*100),
            tag_string_general: media.tag_string_general,
            tag_string_character: media.tag_string_character,
            tag_string_artist: media.tag_string_artist,
            tag_string_meta: media.tag_string_meta,
        }
    ));
    const cleanBooruMediaArr = booruMediaArr.filter((media: BooruMedia) => typeof media.file_url !== "undefined");
    return cleanBooruMediaArr;
}
export default async function Page() {
    const colsNum: Number = 4;
    const booruMediaArray = await getBooruMediaArray();
    return (
        <div>
            { colsNum == 2
                ? <MasonryGallery2c booruMediaArray={ booruMediaArray }/>
                : colsNum == 3
                    ? <MasonryGallery3c booruMediaArray={ booruMediaArray }/>
                    : colsNum == 4
                        ? <MasonryGallery4c booruMediaArray={ booruMediaArray }/>
                        : <h1>Invalid colsNum value.</h1>
            }
        </div>
    );
}