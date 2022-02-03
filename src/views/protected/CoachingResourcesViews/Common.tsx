import Box from '@material-ui/core/Box'
import CardMedia from '@material-ui/core/CardMedia'
import Link from '@material-ui/core/Link'
import Skeleton from '@material-ui/lab/Skeleton'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles'
import withStyles from '@material-ui/core/styles/withStyles'
import React, { useEffect, useState } from 'react'
import Card from '@material-ui/core/Card'
import ClassroomClimateIcon from '../../../assets/images/ClassroomClimateIconImage.svg'

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
    },
})(Typography)

export const ResourceCardContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(Box)

export const ResourceCardMedia = withStyles({
    root: {
        backgroundSize: 'cover',
        height: 0,
        paddingTop: '60%', // 4:3 aspect ratio
        paddingLeft: '25%',
    },
    media: {
        height: '125px',
        width: '190px',
    },
})(CardMedia)

export const ResourceCardSkeleton = withStyles({
    root: {
        height: 0,
        paddingTop: '100%', // 4:3 aspect ratio
        paddingLeft: '25%',
    },
})(Skeleton)

export const StyledLink = withStyles(theme => ({
    root: {
        color: theme.palette.primary.main,
        filter: `drop-shadow(0px 2px 2px ${theme.palette.text.primary})`,
    },
}))(Link)

export const cards = {
    'coaching-cycle': {
        label: 'Coaching Cycle',
        imageImport: () =>
            import(
                '../../../assets/images/CoachingResources/CoachingCycle.png'
            ),
        linkUrl: '/CoachingResources/CoachingCycle',
        backgroundColor: '#FF7059',
    },
    'professional-development-materials': {
        label: 'Professional Development Materials',
        imageImport: () =>
            import('../../../assets/images/CoachingResources/ProfDev.png'),
        linkUrl: '/CoachingResources/ProfessionalDevelopmentMaterials',
        backgroundColor: '#733CB7',
    },
    'coaching-best-practices': {
        label: 'Coaching Best Practices',
        imageImport: () =>
            import('../../../assets/images/CoachingResources/CoachingBest.png'),
        linkUrl: '/CoachingResources/CoachingBestPractices',
        backgroundColor: '#1786D5',
    },
    'chalk-crosswalks': {
        label: 'CHALK Crosswalks',
        imageImport: () =>
            import('../../../assets/images/CoachingResources/Crosswalks.png'),
        linkUrl: '/CoachingResources/ChalkCrosswalks',
        backgroundColor: '#11BF89',
    },
}

interface LazyLoadedResourceCardMediaProps {
    imageImport: () => Promise<typeof import('*.jpg')>
    backgroundColor: string
    backgroundSize: string
}

/**
 * @return {ReactElement}
 */
export function LazyLoadedResourceCardMedia({
    imageImport,
    backgroundColor,
    backgroundSize,
}: LazyLoadedResourceCardMediaProps): React.ReactElement {
    const [imageSource, setImageSource] = useState<string | null>(null)

    useEffect(() => {
        imageImport()
            .then(image => {
                setImageSource(image.default)
            })
            .catch(e => {
                console.warn('Could not load resource card image', e)
            })
    }, [])
    return imageSource ? (
        <ResourceCardMedia
            style={{ backgroundColor, backgroundSize}}
            image={imageSource}
        />
    ) : (
        <ResourceCardSkeleton
            style={{ backgroundColor }}
            animation="wave"
            variant="rect"
        />
    )
}

interface AsideContentProps {
  imageImport: () => Promise<typeof import('*.jpg')>,
  label: string,
  backgroundColor: string
}

const asideStyles = makeStyles({
  asideIcon: {
    objectFit: 'contain',
    width: '60%',
    marginLeft: '20%',
  },
})
interface IconOnlyAsideContent {
  icon:string
}
/**
 * @return {ReactElement}
 */
export function IconOnlyAsideContent({icon}:IconOnlyAsideContent): React.ReactElement {
  const styles = asideStyles()
  return <>
    <img src={icon} className={styles.asideIcon} />
  </>
}

/**
 * @return {ReactElement}
 */
export function ResourcesLandingAsideContent({ imageImport, label, backgroundColor }: AsideContentProps): React.ReactElement {
  return <>
    <Card style={{maxWidth: "70%", marginLeft:"15%"}}>
      <LazyLoadedResourceCardMedia imageImport={imageImport}
                                   backgroundColor={backgroundColor}
                                   backgroundSize={"60%"} />
      <ResourceCardContent>
        <ResourceLabel>{label}</ResourceLabel>
      </ResourceCardContent>
    </Card>
  </>
}

interface LazyLoadedPreviewImageProps {
    docUrl: string
    imageImport: () => Promise<typeof import('*.jpg')>
}

const useLazyPreviewImageStyles = makeStyles(theme => ({
    previewBox: {
        maxWidth: '50%',
    },
    previewImage: {
        boxShadow: theme.shadows['3'],
        maxHeight: 500,
        objectFit: 'contain',
        width: '100%',
    },
}))

/**
 * @return {ReactElement}
 */
export function LazyLoadedPreviewImage({
    docUrl,
    imageImport,
}: LazyLoadedPreviewImageProps): React.ReactElement {
    const [imageSource, setImageSource] = useState<string | null>(null)

    const styles = useLazyPreviewImageStyles()

    useEffect(() => {
        imageImport()
            .then(image => {
                setImageSource(image.default)
            })
            .catch(() => {
                console.warn('Could not load preview image')
            })
    }, [])

    return imageSource ? (
        <Box
            display="flex"
            flexDirection="column"
            className={styles.previewBox}
        >
            <img src={imageSource} className={styles.previewImage} />
            <Box pt={4} display="flex" justifyContent="center">
                <StyledLink href={docUrl} download>
                    Download
                </StyledLink>
            </Box>
        </Box>
    ) : (
        <Skeleton
            animation="wave"
            variant="rect"
            width="50%"
            height={500}
            className={styles.previewImage}
        />
    )
}
