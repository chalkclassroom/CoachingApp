import * as React from 'react';
import { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles/index";
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Tabs, Tab } from "@material-ui/core";
import TabBar from "@material-ui/core/AppBar";
import Grid from '@material-ui/core/Grid';
import * as Constants from '../../constants/Constants';
import LiteracyFoundationalTeacher from './LiteracyFoundationalTeacher';
import LiteracyFoundationalChild from './LiteracyFoundationalChild';
import LiteracyWritingTeacher from './LiteracyWritingTeacher';
import LiteracyWritingChild from './LiteracyWritingChild';

const useStyles = makeStyles({
  tabBar: {
    marginBottom: "10px",
    height: "5%",
    width: "100%"
  }
});

interface Props {
  type: string | number
}

/**
 * @function LiteracyInstructionHelpCard
 * @return {ReactElement}
 */
export default function LiteracyInstructionHelpCard(props: Props): React.ReactElement {
  const [tabValue, setTabValue] = useState(0);
  const {type} = props;
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
      {type === 1 ? (
        <Grid container direction="column">
          <Grid item>
            <MuiThemeProvider theme={Constants.LiteracyTheme}>
              <TabBar position="static" color="default" className={classes.tabBar}>
                <Tabs
                  value={tabValue}
                  indicatorColor="secondary"
                  variant="fullWidth"
                >
                  <Tab
                    label="Teacher Behaviors"
                    onClick={handleChecklist1}
                    style={{
                      fontFamily: "Arimo",
                      fontSize: '1em',
                      color: 'black',
                      backgroundColor: tabValue === 0 ? Constants.Colors.LI : '#d3d3d3'
                    }}
                  />
                  <Tab
                    label="Child Behaviors"
                    onClick={handleChecklist2}
                    style={{
                      fontFamily: "Arimo",
                      fontSize: '1em',
                      color: 'black',
                      backgroundColor: tabValue === 1 ? Constants.Colors.LI : '#d3d3d3'
                    }}
                  />
                </Tabs>
              </TabBar>
            </MuiThemeProvider>
          </Grid>
          <Grid item>
            {tabValue === 0 ? <LiteracyFoundationalTeacher /> : <LiteracyFoundationalChild />}
          </Grid>
        </Grid>
      ) : type === 'FoundationalTeacher' ? (
        <Grid container direction='column'>
          <Grid item>
            <LiteracyFoundationalTeacher />
          </Grid>
        </Grid>
      ) : type === 'FoundationalChild' ? (
        <Grid container direction='column'>
          <Grid item>
            <LiteracyFoundationalChild />
          </Grid>
        </Grid>
      ) : type === 'WritingChild' ? (
        <Grid container direction='column'>
          <Grid item>
            <LiteracyWritingChild />
          </Grid>
        </Grid>
      ) : type === 'WritingTeacher' ? (
        <Grid container direction='column'>
          <Grid item>
            <LiteracyWritingTeacher />
          </Grid>
        </Grid>
      ) : (null)}
    </div>
  );
}