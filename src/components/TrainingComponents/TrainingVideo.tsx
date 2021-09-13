import * as React from 'react'
import { DefaultPlayer as Video } from 'react-html5video/dist'
import 'react-html5video/dist/styles.css'
import * as PropTypes from 'prop-types'
import { addWatchedVideos } from '../../state/actions/watched-videos'
import { connect } from 'react-redux'

interface Props {
    videoUrl: string
    watchedVideos: Array<string>
}

interface State {
    watchedVideos: Array
}

/**
 * specifies controls and default settings for demo video on landing page
 * @class DemoVideo
 */
class TrainingVideo extends React.Component<Props, State> {
    /**
     * @param {Props} props
     */
    constructor(props: Props) {
        // section -> one of ('transition','climate','ac',etc...)
        super(props)
        this.state = {
            videoUrl: [],
            autoPlay: false,
        }
    }

    static propTypes = {
        videoUrl: PropTypes.string.isRequired,
    }

    componentDidMount() {
        if (this.props.watchedVideos.includes(this.props.videoUrl)) {
            this.state.autoPlay = false
        } else {
            this.state.autoPlay = true
            this.props.addWatchedVideos(this.props.videoUrl)
        }
    }

    // const videoWatched =

    /**
     * render function
     * @return {ReactNode}
     */
    render(): React.ReactNode {
        return (
            <Video
                loop
                muted
                autoPlay={this.state.autoPlay}
                controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                poster="http://sourceposter.jpg"
                onCanPlayThrough={(): void => {
                    // Do stuff
                }}
            >
                <source src={this.props.videoUrl} type="video/mp4" />
                <track
                    label="English"
                    kind="subtitles"
                    srcLang="en"
                    src="http://source.vtt"
                    default
                />
            </Video>
        )
    }
}

const mapStateToProps = (
    state: Types.ReduxState
): {
    watchedVideos: Array<Types.Teacher>
} => {
    return {
        watchedVideos: state.watchedVideosState.watchedVideos,
    }
}

export default connect(mapStateToProps, { addWatchedVideos })(TrainingVideo)
