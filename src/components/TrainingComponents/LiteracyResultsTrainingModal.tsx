import * as React from 'react'
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles/index'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import LiteracyResultsTrainingBadge from './LiteracyResultsTrainingBadge'
import TrainingVideo from './TrainingVideo'

/**
 * specifies styling for modal
 * @return {CSSProperties}
 */
function getModalStyle(): React.CSSProperties {
  return {
    position: 'relative',
  } as React.CSSProperties
}

const useStyles = makeStyles({
  root: {
    backgroundColor: '#ffffff',
  },
  paper: {
    position: 'relative',
    height: 'fit-content',
    width: '60vw',
    backgroundColor: 'white',
    borderRadius: 8,
  },
})

interface Props {}

/**
 * Modal to confirm view results
 * @function LiteracyModal
 * @param {Props} props
 * @return {ReactElement}
 */
function LiteracyResultsTrainingModal(props: Props): React.ReactElement {
  const [videoData, setVideoData] = useState({
    type: 'Foundational Skills',
    url:
      'https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Foundational%20Skills%20Results-720p-220107.mp4?alt=media&token=be52c691-187f-40a8-a4a4-98284210ea39',
  })

  const classes = useStyles()
  return (
    <div style={getModalStyle()} className={classes.paper}>
      <Grid
        container
        alignItems="center"
        direction="column"
        justify="flex-start"
        className={classes.root}
      >
        <Grid item style={{ width: '100%' }}>
          <Grid
            container
            alignItems="center"
            direction="row"
            justify="flex-end"
            style={{ width: '100%' }}
          >
            <Grid item xs={10}>
              <Typography
                variant="h4"
                align="center"
                style={{ fontFamily: 'Arimo' }}
              >
                Literacy Instruction Results Training
              </Typography>
              <Typography
                variant="h5"
                align="center"
                style={{ fontFamily: 'Arimo', padding: '1rem'}}
              >
                {videoData.type} Results
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Grid
                container
                alignItems="center"
                direction="row"
                justify="flex-end"
              ></Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          wrap={'nowrap'}
          direction={'row'}
          alignItems={'center'}
          spacing={3}
          style={{ paddingTop: '1em', height: '100%' }}
        >
          <Grid
            item
            direction="column"
            justify="space-between"
            alignItems="center"
            xs={4}
            spacing={3}
          >
            <LiteracyResultsTrainingBadge
              handleClick={() =>
                setVideoData({
                  url:
                    'https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Foundational%20Skills%20Results-720p-220107.mp4?alt=media&token=be52c691-187f-40a8-a4a4-98284210ea39',
                  type: 'Foundational Skills',
                })
              }
              title={'Foundational Skills'}
            />
            <LiteracyResultsTrainingBadge
              handleClick={() =>
                setVideoData({
                  url:
                    'https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Writing%20Results-720p-220107.mp4?alt=media&token=fa9d4c8b-f5c3-44db-9d3f-e2096d49fbfb',
                  type: 'Writing',
                })
              }
              title={'Writing'}
            />
            <LiteracyResultsTrainingBadge
              handleClick={() =>
                setVideoData({
                  url:
                    'https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Book%20Reading%20Results-720p-220123.mp4?alt=media&token=da524fcf-8108-44fd-b8e9-2c95b61b65c6',
                  type: 'Book Reading',
                })
              }
              title={'Book Reading'}
            />
            <LiteracyResultsTrainingBadge
              handleClick={() =>
                setVideoData({
                  url:
                    'https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Language%20Environment%20Results-720p-220127.mp4?alt=media&token=14f151c1-c70f-4869-9813-ddd3eac6e813',
                  type: 'Language Environment',
                })
              }
              title={'Language Environment'}
            />
          </Grid>
          <Grid item direction={'row'} justifyContent={'center'} xs={8}>
            <TrainingVideo videoUrl={videoData.url} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}


export default LiteracyResultsTrainingModal
