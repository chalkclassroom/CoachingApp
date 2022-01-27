import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import React from 'react'

import AppBar from '../../../components/AppBar'
import Firebase, { FirebaseContext } from '../../../components/Firebase'

interface ResourcePageLayoutProps {
  asideContent: React.ReactNode;
  mainContent: React.ReactNode;
}

/**
 * @return {ReactElement}
 */
export default function ResourcePageLayout({ asideContent, mainContent }: ResourcePageLayoutProps): React.ReactElement {
  return <>
    <FirebaseContext.Consumer>
      {(firebase: Firebase) => <AppBar firebase={firebase} noBack={false}/>}
    </FirebaseContext.Consumer>
    <Box p={4}>
      <Grid container spacing={4}>
        <Grid item xs={3}>
          {asideContent}
        </Grid>
        <Grid item xs={9}>
          {mainContent}
        </Grid>
      </Grid>
    </Box>
  </>
}
