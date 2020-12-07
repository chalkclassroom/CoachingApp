import * as React from 'react';
import { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles/index";
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Tabs, Tab } from "@material-ui/core";
import TabBar from "@material-ui/core/AppBar";
import Grid from '@material-ui/core/Grid';
import * as Constants from '../../constants/Constants';
import ListeningHelp1 from './ListeningHelp1';
import ListeningHelp2 from './ListeningHelp2';

const useStyles = makeStyles({
  tabBar: {
    marginBottom: "10px",
    height: "5%",
    width: "100%"
  }
});

/**
 * @function ListeningToChildrenHelpCard
 * @return {ReactElement}
 */
export default function ListeningToChildrenHelpCard(): React.ReactElement {
  const [tabValue, setTabValue] = useState(0);
  const classes = useStyles();

  const handleChecklist1 = (): void => {
    if (tabValue !== 0) {
      setTabValue(0)
    }
  };

  const handleChecklist2 = (): void => {
    if (tabValue !== 1) {
      setTabValue(1)
    }
  };

  return (
    <div>
      <Grid container direction="column">
        <Grid item>
          <MuiThemeProvider theme={Constants.ListeningTheme}>
            <TabBar position="static" color="default" className={classes.tabBar}>
              <Tabs
                value={tabValue}
                indicatorColor="secondary"
                variant="fullWidth"
              >
                <Tab
                  label="Listening"
                  onClick={handleChecklist1}
                  style={{
                    fontFamily: "Arimo",
                    fontSize: '1em',
                    color: 'black',
                    backgroundColor: tabValue === 0 ? Constants.Colors.LC : '#d3d3d3'
                  }}
                />
                <Tab
                  label="Supporting Child Talk"
                  onClick={handleChecklist2}
                  style={{
                    fontFamily: "Arimo",
                    fontSize: '1em',
                    color: 'black',
                    backgroundColor: tabValue === 1 ? Constants.Colors.LC: '#d3d3d3'
                  }}
                />
              </Tabs>
            </TabBar>
          </MuiThemeProvider>
        </Grid>
        <Grid item>
          {tabValue === 0 ? <ListeningHelp1 /> : <ListeningHelp2 />}
        </Grid>
      </Grid>
    </div>
  );
}