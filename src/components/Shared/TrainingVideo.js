import React from "react";
import { DefaultPlayer as Video } from 'react-html5video/dist';
import 'react-html5video/dist/styles.css';
const sintelTrailer = 'http://techslides.com/demos/sample-videos/small.mp4';


class TrainingVideo extends React.Component {

render() {
    return (
        <Video autoPlay loop muted
               controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
               poster="http://sourceposter.jpg"
               onCanPlayThrough={() => {
                   // Do stuff
               }}>
            <source src={sintelTrailer} type="video/mp4" />
            <track label="English" kind="subtitles" srcLang="en" src="http://source.vtt" default />
        </Video>
    );
}
}

export default TrainingVideo;
