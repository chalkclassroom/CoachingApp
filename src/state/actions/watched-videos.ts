export const ADD_WATCHED_VIDEOS = 'add_watched_videos'

export const addWatchedVideos = (url: string): GetUnlocked => {
    return {
        type: ADD_WATCHED_VIDEOS,
        url,
    }
}

interface addWatchedVideos {
    type: typeof ADD_WATCHED_VIDEOS
    url: string
}

export type WatchedTypes = addWatchedVideos
