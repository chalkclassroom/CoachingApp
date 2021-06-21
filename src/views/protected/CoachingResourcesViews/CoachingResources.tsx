import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

import AppBar from '../../../components/AppBar'
import { FirebaseContext } from '../../../components/Firebase'
import * as Types from '../../../constants/Types';

const ResourceLabel = withStyles({
  root: {
    alignItems: 'center',
    display: 'flex',
    fontSize: '1.25rem',
    justifyContent: 'center',
    lineHeight: 1.15,
    letterSpacing: '0.02em',
    minHeight: '2.3em',
    textAlign: 'center',
  }
})(Typography)

const ResourceCardContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(Box)

const ResourceCardMedia = withStyles({
  root: {
    backgroundSize: 'cover',
    height: 0,
    paddingTop: '75%' // 4:3 aspect ratio
  }
})(CardMedia)

const ResourceCardSkeleton = withStyles({
  root: {
    height: 0,
    paddingTop: '75%' // 4:3 aspect ratio
  }
})(Skeleton)

const cards: Array<{
  key: string,
  label: string,
  imageImport: () => Promise<typeof import('*.jpg')>,
  linkUrl: string
}> = [
  {
    key: 'coaching-cycle',
    label: 'Coaching Cycle',
    imageImport: () => import('../../../assets/images/CoachingResources/coaching-cycle.jpg'),
    linkUrl: '/CoachingResources/CoachingCycle'
  },
  {
    key: 'professional-development-materials',
    label: 'Professional Development Materials',
    imageImport: () => import('../../../assets/images/CoachingResources/professional-development-materials.jpg'),
    linkUrl: '/CoachingResources/ProfessionalDevelopmentMaterials'
  },
  {
    key: 'coaching-best-practices',
    label: 'Coaching Best Practices',
    imageImport: () => import('../../../assets/images/CoachingResources/coaching-best-practices.jpg'),
    linkUrl: '/CoachingResources/CoachingBestPractices'
  },
  {
    key: 'chalk-crosswalks',
    label: 'CHALK Crosswalks',
    imageImport: () => import('../../../assets/images/CoachingResources/chalk-crosswalks.jpg'),
    linkUrl: '/CoachingResources/ChalkCrosswalks'
  }
]

interface LazyLoadedResourceCardMediaProps {
  imageImport: () => Promise<typeof import('*.jpg')>;
}

/**
 * @return {ReactElement}
 */
function LazyLoadedResourceCardMedia({ imageImport }: LazyLoadedResourceCardMediaProps): React.ReactElement {
  const [ imageSource, setImageSource ] = useState<string | null>(null)

  useEffect(() => {
    imageImport().then(image => {
      setImageSource(image.default)
    }).catch(() => {
      console.warn('Could not load resource card image')
    })
  }, [])

  return imageSource ? (
    <ResourceCardMedia image={imageSource}/>
  ) : (
    <ResourceCardSkeleton animation="wave" variant="rect" />
  )
}

/**
 * @return {ReactElement}
 */
export default function CoachingResources(): React.ReactElement {
  return <>
    <FirebaseContext.Consumer>
      {(firebase: Types.FirebaseAppBar) => <AppBar firebase={firebase} />}
    </FirebaseContext.Consumer>
    <Box py={6}>
      <Typography variant='h4' component='h1' align='center'>CHALK Coaching Resources</Typography>
    </Box>
    <Container maxWidth='sm'>
      <Grid container spacing={6}>
        {cards.map(
          ({ key, label, imageImport, linkUrl }) => (
            <Grid item xs={6} key={key}>
              <Card>
                <CardActionArea component={Link} to={linkUrl}>
                  <LazyLoadedResourceCardMedia imageImport={imageImport} />
                  <ResourceCardContent>
                    <ResourceLabel>{label}</ResourceLabel>
                  </ResourceCardContent>
                </CardActionArea>
              </Card>
            </Grid>
          )
        )}
      </Grid>
    </Container>
  </>
}
