import * as React from "react";
import { DefaultPlayer as Video } from "react-html5video/dist";
import "react-html5video/dist/styles.css";
import * as PropTypes from "prop-types";

interface Props {
  videoUrl: string
}

/**
 * specifies controls and default settings for demo video on landing page
 * @class DemoVideo
 */
class TrainingVideo extends React.Component<Props, {}> {
  static propTypes = {
    videoUrl: PropTypes.string.isRequired
  }
  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    return (
      <Video
        loop
        muted
        controls={["PlayPause", "Seek", "Time", "Volume", "Fullscreen"]}
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
      </Video
        autoPlay>
    );
  }
}

export default TrainingVideo;
