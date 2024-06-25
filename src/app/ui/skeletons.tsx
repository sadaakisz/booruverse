// Loading animation
const shimmer =
    'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function BooruMediaSkeleton() {
    return (
    <div
        className={`animate-pulse relative overflow-hidden rounded-lg bg-neutral-900 p-2 shadow-sm h-96`}
    >
    </div>
    );
}