import * as React from 'react';
import { useState } from 'react';
import { withStyles } from "@material-ui/core/styles/index";
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Tabs, Tab } from "@material-ui/core";
import TabBar from "@material-ui/core/AppBar";
import Grid from '@material-ui/core/Grid';
import BehaviorResponsesHelp from './BehaviorResponsesHelp';
import TeacherToneHelp from './TeacherToneHelp';
import * as Constants from '../../constants/Constants';

const styles = {
  tabBar: {
    marginBottom: "10px",
    height: "5%",
    width: "100%"
  },
};

interface Props {
  classes: {
    tabBar: string
  }
}

/**
 * @function ClassroomClimateHelp
 * @param {Props} props
 * @return {ReactElement}
 */
function ClassroomClimateHelpCard(props: Props): React.ReactElement {
  const { classes } = props;
  const [tabValue, setTabValue] = useState(0);

  const handleBehaviorResponses = (): void => {
    if (tabValue !== 0) {
      setTabValue(0)
    }
  };

  const handleTone = (): void => {
    if (tabValue !== 1) {
      setTabValue(1)
    }
  };

  return (
    <div>
      <Grid container direction="column">
        <Grid item>
          <MuiThemeProvider theme={Constants.ClimateTheme}>
            <TabBar position="static" color="default" className={classes.tabBar}>
              <Tabs
                value={tabValue}
                variant="fullWidth"
                TabIndicatorProps={{
                  style: {
                    backgroundColor: tabValue === 0 ? Constants.Colors.TT : Constants.Colors.MI
                  }
                }
                }
              >
                <Tab
                  label="Behavior Responses"
                  onClick={handleBehaviorResponses}
                  style={{
                    fontFamily: "Arimo",
                    fontSize: '1em',
                    color: tabValue === 0? 'white' : 'black',
                    backgroundColor: tabValue === 0 ?  Constants.ClimateTypeColors.disapproval : '#d3d3d3'
                  }}
                />
                <Tab
                  label="Teacher Tone"
                  onClick={handleTone}
                  style={{
                    fontFamily: "Arimo",
                    fontSize: '1em',
                    backgroundColor: tabValue === 1 ? Constants.Colors.CC: '#d3d3d3'
                  }}
                />
              </Tabs>
            </TabBar>
          </MuiThemeProvider>
        </Grid>
        <Grid item>
          {tabValue === 0 ? <BehaviorResponsesHelp /> : <TeacherToneHelp />}
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(ClassroomClimateHelpCard);