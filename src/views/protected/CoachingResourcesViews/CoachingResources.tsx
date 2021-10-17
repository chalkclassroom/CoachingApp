import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { Link } from 'react-router-dom'

import AppBar from '../../../components/AppBar'
import { FirebaseContext } from '../../../components/Firebase'
import Firebase from '../../../components/Firebase'

import {
    ResourceLabel,
    ResourceCardContent,
    LazyLoadedResourceCardMedia,
    cards,
} from './Common'

/**
 * @return {ReactElement}
 */
export default function CoachingResources(): React.ReactElement {
    return (
        <>
            <FirebaseContext.Consumer>
                {(firebase: Firebase) => <AppBar firebase={firebase} noBack />}
            </FirebaseContext.Consumer>
            <Box py={6}>
                <Typography variant="h4" component="h1" align="center">
                    CHALK Coaching Resources
                </Typography>
            </Box>
            <Container maxWidth="sm">
                <Grid container spacing={6}>
                    {Object.entries(cards).map(
                        ([
                            key,
                            { label, imageImport, linkUrl, backgroundColor },
                        ]) => (
                            <Grid item xs={6} key={key}>
                                <Card>
                                    <CardActionArea
                                        component={Link}
                                        to={linkUrl}
                                    >
                                        <LazyLoadedResourceCardMedia
                                            imageImport={imageImport}
                                            backgroundColor={backgroundColor}
                                            backgroundSize={'160px'}
                                        />
                                        <ResourceCardContent>
                                            <ResourceLabel>
                                                {label}
                                            </ResourceLabel>
                                        </ResourceCardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        )
                    )}
                </Grid>
            </Container>
        </>
    )
}
