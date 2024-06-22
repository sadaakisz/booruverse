// video component: https://imagekit.io/blog/nextjs-video-player/
// research a way to autoplay mute and unmute on click (like TikTok and Instagram)
export default function MasonryVideo({ videoURL }: { videoURL: string }) {
    return (
        <video className="mb-3 rounded-xl" controls playsInline>
            <source src={videoURL} />
            Your browser does not support the video tag...
        </video>
    );
}