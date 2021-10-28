import 'react-html5video/dist/styles.css'

import * as React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { DefaultPlayer as Video } from 'react-html5video/dist'

import { addWatchedVideos } from '../../state/actions/watched-videos'
import { RootState } from '../../state/store'

interface Props extends PropsFromRedux {
  videoUrl: string
}

interface State {
  autoPlay: boolean
}

/**
 * specifies controls and default settings for demo video on landing page
 */
class TrainingVideo extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      autoPlay: !props.watchedVideos.includes(props.videoUrl),
    }
  }

  componentDidMount(): void {
    if (this.state.autoPlay) {
      this.props.addWatchedVideos(this.props.videoUrl)
    }
  }

  render(): React.ReactNode {
    return (
      <Video
        loop
        muted
        autoPlay={this.state.autoPlay}
        controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
        poster="http://sourceposter.jpg"
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
  state: RootState
): {
  watchedVideos: Array<string>
} => ({
  watchedVideos: state.watchedVideosState.watchedVideos,
})

const connector = connect(mapStateToProps, { addWatchedVideos })

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(TrainingVideo)
