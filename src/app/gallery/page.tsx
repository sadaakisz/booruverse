import MasonryGallery from "../ui/masonry-gallery";
import MasonryGallery2c from "../ui/masonry-gallery-2c";
import MasonryGallery3c from "../ui/masonry-gallery-3c";
import MasonryGallery4c from '../ui/masonry-gallery-4c';
import { BooruMedia, BooruMediaSource } from '../lib/definitions';

const url = "https://testbooru.donmai.us/posts.json?page=10&limit=40";

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
            tag_string_general: media.tag_string_general,
            tag_string_character: media.tag_string_character,
            tag_string_artist: media.tag_string_artist,
            tag_string_meta: media.tag_string_meta,
            file_url: media.file_url,
        }
    ));
    const cleanBooruMediaArr = booruMediaArr.filter((media: BooruMedia) => typeof media.file_url !== "undefined");
    return cleanBooruMediaArr;
}
// TODO: Search how to implement skeletons and shimer components using the dimensions when loading.
export default async function Page() {
    const colsNum: Number = 4;
    const picsumURLArray = [
        "https://picsum.photos/200/300",
        "https://picsum.photos/400/300",
        "https://picsum.photos/200/600",
        "https://picsum.photos/300/700",
        "https://picsum.photos/250/450",
        "https://picsum.photos/300/500",
        "https://picsum.photos/400/900",
        "https://picsum.photos/500/900",
        "https://picsum.photos/600/300",
        "https://picsum.photos/700/200",
        "https://picsum.photos/200/400",
        "https://picsum.photos/700/300",
        "https://picsum.photos/500/300",
        "https://picsum.photos/900/900",
        "https://picsum.photos/500/900",
        "https://picsum.photos/750/300"
    ]

    const booruMediaArray = await getBooruMediaArray();
    const booruMediaSourceArray: Array<BooruMediaSource> = booruMediaArray.map((media: BooruMedia) => ({
        file_url: media.file_url,
        file_ext: media.file_ext
    }));
    return (
        <div>
            { colsNum == 2
                ? <MasonryGallery2c booruMediaSourceArray={ booruMediaSourceArray }/>
                : colsNum == 3
                    ? <MasonryGallery3c booruMediaSourceArray={ booruMediaSourceArray }/>
                    : colsNum == 4
                        ? <MasonryGallery4c booruMediaSourceArray={ booruMediaSourceArray }/>
                        : <h1>Invalid colsNum value.</h1>
            }
        </div>
    );
}