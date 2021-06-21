import Box from '@material-ui/core/Box';
import CardMedia from '@material-ui/core/CardMedia';
import Link from '@material-ui/core/Link';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import React, { useEffect, useState } from 'react'

export const ResourceLabel = withStyles({
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

export const ResourceCardContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(Box)

export const ResourceCardMedia = withStyles({
  root: {
    backgroundSize: 'cover',
    height: 0,
    paddingTop: '75%' // 4:3 aspect ratio
  }
})(CardMedia)

export const ResourceCardSkeleton = withStyles({
  root: {
    height: 0,
    paddingTop: '75%' // 4:3 aspect ratio
  }
})(Skeleton)

export const StyledLink = withStyles(theme => ({
  root: {
    color: theme.palette.primary.main,
    filter: `drop-shadow(0px 2px 2px ${theme.palette.text.primary})`,
  }
}))(Link)

export const cards = {
  'coaching-cycle': {
    label: 'Coaching Cycle',
    imageImport: () => import('../../../assets/images/CoachingResources/coaching-cycle.jpg'),
    linkUrl: '/CoachingResources/CoachingCycle'
  },
  'professional-development-materials': {
    label: 'Professional Development Materials',
    imageImport: () => import('../../../assets/images/CoachingResources/professional-development-materials.jpg'),
    linkUrl: '/CoachingResources/ProfessionalDevelopmentMaterials'
  },
  'coaching-best-practices': {
    label: 'Coaching Best Practices',
    imageImport: () => import('../../../assets/images/CoachingResources/coaching-best-practices.jpg'),
    linkUrl: '/CoachingResources/CoachingBestPractices'
  },
  'chalk-crosswalks': {
    label: 'CHALK Crosswalks',
    imageImport: () => import('../../../assets/images/CoachingResources/chalk-crosswalks.jpg'),
    linkUrl: '/CoachingResources/ChalkCrosswalks'
  }
}

interface LazyLoadedResourceCardMediaProps {
  imageImport: () => Promise<typeof import('*.jpg')>,
}

/**
 * @return {ReactElement}
 */
export function LazyLoadedResourceCardMedia({ imageImport }: LazyLoadedResourceCardMediaProps): React.ReactElement {
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
