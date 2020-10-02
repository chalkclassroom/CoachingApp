import * as React from 'react';
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles/index";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import LOIHelpCardHighLevel from './LOIHelpCardHighLevel';
import LOIHelpCardLowLevel from './LOIHelpCardLowLevel';
import { Tabs, Tab } from "@material-ui/core";
import TabBar from "@material-ui/core/AppBar";
import Grid from '@material-ui/core/Grid';

const LOITheme = createMuiTheme({
  palette: {
    primary: {
      main: "#38761d"
    },
    secondary: {
      main: "#1155cc"
    }
  }
});

const styles: object = {
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

interface State {
  tabValue: number
}

/**
 * 
 * @class LevelOfInstructionHelpCard
 */
class LevelOfInstructionHelpCard extends React.Component<Props, State> {
  /**
   * @param {Props} props
   */
  constructor(props: Props){
    super(props);

    this.state = {
      tabValue: 0,
    }
  }

  /**
   * @return {void}
   */
  handleHighLevel = (): void => {
    if (this.state.tabValue !== 0) {
      this.setState({
        tabValue: 0
      })
    }
  };

  /**
   * @return {void}
   */
  handleLowLevel = (): void => {
    if (this.state.tabValue !== 1) {
      this.setState({
        tabValue: 1
      })
    }
  };

  static propTypes = {
    classes: PropTypes.object.isRequired
  }
  
  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    return (
      <div>
        <Grid container direction="column">
          <Grid item>
            <MuiThemeProvider theme={LOITheme}>
              <TabBar position="static" color="default" className={classes.tabBar}>
                <Tabs
                  value={this.state.tabValue}
                  indicatorColor={this.state.tabValue === 0 ? "primary" : "secondary"}
                  variant="fullWidth"
                >
                  <Tab
                    label="High-Level Instruction"
                    onClick={this.handleHighLevel}
                    style={{
                      fontFamily: "Arimo",
                      fontSize: '1em',
                      backgroundColor: this.state.tabValue === 0 ? '#6aa84f' : "#d3d3d3"
                    }}
                  />
                  <Tab
                    label="Low-Level Instruction"
                    onClick={this.handleLowLevel}
                    style={{
                      fontFamily: "Arimo",
                      fontSize: '1em',
                      backgroundColor: this.state.tabValue === 1 ? '#c9daf8' : "#d3d3d3"
                    }}
                  />
                </Tabs>
              </TabBar>
            </MuiThemeProvider>
          </Grid>
          <Grid item>
            {this.state.tabValue === 0 ? <LOIHelpCardHighLevel /> : <LOIHelpCardLowLevel />}
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(LevelOfInstructionHelpCard);
