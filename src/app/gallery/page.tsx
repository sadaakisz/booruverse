import MasonryGallery from "../ui/masonry-gallery";

const url = "https://testbooru.donmai.us/posts.json?page=1&limit=40";

async function getImageURLList() {
    const response = await fetch(url);
    const data = await response.json();
    const urlArr = data.map((imageObj: any) => imageObj.file_url);
    const cleanUrlArr = urlArr.filter((url: string) => typeof url !== "undefined");
    //console.log(cleanUrlArr);
    return cleanUrlArr;
}

export default async function Page() {

    const testbooruURLList = [
        "https://testbooru-cdn.donmai.us/original/ac/5e/ac5ee35f708f2d78b752263cab8f8ed3.jpg",
        "https://testbooru-cdn.donmai.us/sample/ab/7a/sample-ab7a8707cbe7b6af6a67c4007b6f16a5.jpg",
        "https://testbooru-cdn.donmai.us/sample/d4/86/sample-d486dd141db10be5f0770bb0e4f23950.jpg",
        "https://testbooru-cdn.donmai.us/sample/f9/39/sample-f9392964ff34cc0115497746b221202f.jpg",
        "https://testbooru-cdn.donmai.us/sample/4d/af/sample-4daf54039c040b02b76f1f2937605208.jpg",
        "https://testbooru-cdn.donmai.us/sample/70/aa/sample-70aa1aa95900b053c6edefff5da3ba7d.jpg",
        "https://testbooru-cdn.donmai.us/original/47/cd/47cdf772be0433ece14c970517a277cf.jpg",
        "https://testbooru-cdn.donmai.us/sample/46/97/sample-469799de68d48c94cc9d61d35f6d14df.jpg",
        "https://testbooru-cdn.donmai.us/sample/76/41/sample-7641d7b58f0d34b7962f053e845da28a.jpg",
        "https://testbooru-cdn.donmai.us/sample/5d/ee/sample-5dee9cb1e8697d54f026d6442009a4f1.jpg",
        "https://testbooru-cdn.donmai.us/sample/6b/3b/sample-6b3b1a79aa05eea62d5b4c44a9d94273.jpg",
        "https://testbooru-cdn.donmai.us/sample/52/6c/sample-526c1cb458669e9696f2e2ce4857c948.jpg",
        "https://testbooru-cdn.donmai.us/sample/bc/d4/sample-bcd4253f4ee4bdc464825f2d5e7c3778.jpg",
        "https://testbooru-cdn.donmai.us/sample/71/4b/sample-714bad19b70d93266e6f49f3cf56ca31.jpg",
        "https://testbooru-cdn.donmai.us/sample/3b/2e/sample-3b2eb9c7f4e06f6de67a863b7adf05ff.jpg",
        "https://testbooru-cdn.donmai.us/sample/df/5e/sample-df5eae4a9f41eaa1dbd0ee95635bc7ab.jpg"
    ]

    const picsumURLList = [
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

    const imagesURLList = await getImageURLList();
    return (
        <div>
            {/* <button onClick={e => callAPIWithURL()}>Make API Call</button> */}
            <MasonryGallery imageURLList={ imagesURLList }/>
        </div>
    );
}