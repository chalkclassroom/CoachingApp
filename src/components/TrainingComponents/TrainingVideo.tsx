import 'react-html5video/dist/styles.css'

import * as React from 'react'
import { DefaultPlayer as Video } from 'react-html5video/dist'

import { FirebaseContext } from '../Firebase'

interface Props {
  videoUrl: string
}

export default function TrainingVideo({ videoUrl }: Props): React.ReactNode {
  const [playedVideos, setPlayedVideos] = React.useState<Array<string>>([])
  const [ready, setReady] = React.useState<boolean>(false)

  const firebaseContext = React.useContext(FirebaseContext)

  React.useEffect(() => {
    setReady(false)

    firebaseContext.getUserInformation().then(userDocument => {
      let newPlayedVideos: Array<string>

      if (userDocument) {
        newPlayedVideos = userDocument?.playedVideos ?? []
      } else {
        newPlayedVideos = []
      }

      if (newPlayedVideos.includes(videoUrl)) {
        setPlayedVideos(playedVideos)
      } else {
        firebaseContext.updatePlayedVideos(videoUrl)
        setPlayedVideos([...playedVideos, videoUrl])
      }

      setReady(true)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firebaseContext, videoUrl])

  return (
    ready && (
      <Video
        loop
        muted
        autoPlay={false}
        controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
        poster="http://sourceposter.jpg"
      >
        <source src={videoUrl} type="video/mp4" />
        <track
          label="English"
          kind="subtitles"
          srcLang="en"
          src="http://source.vtt"
          default
        />
      </Video>
    )
  )
}
