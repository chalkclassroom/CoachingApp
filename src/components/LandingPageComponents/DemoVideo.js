import React from "react";
import { DefaultPlayer as Video } from 'react-html5video/dist';
import 'react-html5video/dist/styles.css';
import PropTypes from "prop-types";

/**
 * specifies controls and default settings for demo video on landing page
 * @class DemoVideo
 */
class DemoVideo extends React.Component {
  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    return (
      <Video 
        autoPlay
        muted
        controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
        poster="http://sourceposter.jpg"
        onCanPlayThrough={() => {
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
    );
  }
}

DemoVideo.propTypes = {
  videoUrl: PropTypes.string.isRequired
};

export default DemoVideo;
