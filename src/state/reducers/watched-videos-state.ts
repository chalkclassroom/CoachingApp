import { ADD_WATCHED_VIDEOS, WatchedTypes } from '../actions/watched-videos.ts'

interface WatchedVideosState {
    watchedVideos: Array<string>
}

const initialState: WatchedVideosState = { watchedVideos: [] }

export default (
    state = initialState,
    action: WatchedTypes
): WatchedVideosState => {
    switch (action.type) {
        case ADD_WATCHED_VIDEOS:
            return {
                ...state,
                watchedVideos: [...state.watchedVideos, action.url],
            }
        default:
            return state
    }
}
