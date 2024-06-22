import Image from "next/image";

// width auto fill: https://stackoverflow.com/a/76008677
export default function MasonryImage({ imageURL }: { imageURL: string }) {
    return (
        <Image
            className="mb-3 rounded-xl"
            src={imageURL} 
            alt="" 
            width={0} height={0} sizes="100vw" 
            style={{ width: '100%', height: 'auto' }}
        />
    );
}