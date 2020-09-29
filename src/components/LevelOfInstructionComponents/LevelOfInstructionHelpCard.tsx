import * as React from 'react';
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles/index";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import LOIHelpCardInferential from './LOIHelpCardInferential';
import LOIHelpCardBasic from './LOIHelpCardBasic';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
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
  paper: {
    position: "absolute",
    width: "67%",
    backgroundColor: 'white',
    padding: '2em',
    borderRadius: 8
  },
  inferentialTitle: {
    backgroundColor: "#38761d",
    color: "white",
    fontSize: 24,
    textAlign: "center",
    width: "100%"
  },
  inferentialSubtitle: {
    backgroundColor: "#6aa84f",
    color: "white",
    fontSize: 18,
    textAlign: "center",
    width: '50%'
  },
  basicTitle: {
    backgroundColor: "#1155cc",
    color: "white",
    fontSize: 24,
    textAlign: "center",
    width: "100%"
  },
  basicSubtitle: {
    backgroundColor: "#c9daf8",
    color: "black",
    fontSize: 18,
    textAlign: "center",
    width: '50%'
  },
  example: {
    backgroundColor: "#f3f3f3",
    color: 'black',
    padding: "1%",
    width: '50%'
  },
  tabBar: {
    marginBottom: "10px",
    height: "5%",
    width: "100%"
  },
};

interface Props {
  classes: {
    paper: string,
    inferentialTitle: string,
    inferentialSubtitle: string,
    basicTitle: string,
    basicSubtitle: string,
    example: string,
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
  handleInferential = (): void => {
    if (this.state.tabValue !== 0) {
      this.setState({
        tabValue: 0
      })
    }
  };

  /**
   * @return {void}
   */
  handleBasic = (): void => {
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
                    label="Inferential Instruction"
                    onClick={this.handleInferential}
                    style={{
                      fontFamily: "Arimo",
                      fontSize: '1em',
                      backgroundColor: this.state.tabValue === 0 ? '#6aa84f' : "#d3d3d3"
                    }}
                  />
                  <Tab
                    label="Basic Skills Instruction"
                    onClick={this.handleBasic}
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
            {this.state.tabValue === 0 ? <LOIHelpCardInferential /> : <LOIHelpCardBasic />}
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(LevelOfInstructionHelpCard);
