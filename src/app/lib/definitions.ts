export interface BooruMedia {
    id: number;
    score: number;
    rating: string;
    file_ext: string;
    tag_string_general: string;
    tag_string_character: string;
    tag_string_artist: string;
    tag_string_meta: string;
    file_url: string;
}
export interface BooruMediaSource {
    file_ext: string;
    file_url: string;
}