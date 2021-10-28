import { ADD_WATCHED_VIDEOS, WatchedVideosAction } from '../actions/watched-videos'

interface WatchedVideosState {
    watchedVideos: Array<string>
}

const initialState: WatchedVideosState = { watchedVideos: [] }

export default (
    state = initialState,
    action: WatchedVideosAction
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
