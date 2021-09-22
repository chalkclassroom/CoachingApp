export const ADD_WATCHED_VIDEOS = 'add_watched_videos'

export type WatchedVideosAction =
    | { type: typeof ADD_WATCHED_VIDEOS, url: string }

export const addWatchedVideos = (url: string): WatchedVideosAction => {
    return {
        type: ADD_WATCHED_VIDEOS,
        url,
    }
}