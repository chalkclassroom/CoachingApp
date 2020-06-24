import * as React from 'react';
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles/index";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabBar from "@material-ui/core/AppBar";
import Grid from '@material-ui/core/Grid';
import SequentialHelpDefinitions from './SequentialHelpDefinitions';
import SequentialHelpChild from './SequentialHelpChild';
import SequentialHelpTeacher from './SequentialHelpTeacher';
import * as Constants from '../../constants/Constants';

const SequentialTheme = createMuiTheme({
  palette: {
    primary: {
      main: Constants.Colors.SA
    },
    secondary: {
      main: '#000000'
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
 * hints and reminders for sequential activities observation
 * @param {Props} props
 */
class SequentialHelpCard extends React.Component<Props, State> {
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
  handleDefinitions = (): void => {
    if (this.state.tabValue !== 0) {
      this.setState({
        tabValue: 0
      })
    }
  };

  /**
   * @return {void}
   */
  handleChild = (): void => {
    if (this.state.tabValue !== 1) {
      this.setState({
        tabValue: 1
      })
    }
  };

  /**
   * @return {void}
   */
  handleTeacher = (): void => {
    if (this.state.tabValue !== 2) {
      this.setState({
        tabValue: 2
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
            <MuiThemeProvider theme={SequentialTheme}>
              <TabBar position="static" color="default" className={classes.tabBar}>
                <Tabs
                  value={this.state.tabValue}
                  indicatorColor="secondary"
                  variant="fullWidth"
                >
                  <Tab
                    label="Definitions"
                    onClick={this.handleDefinitions}
                    style={{
                      fontFamily: "Arimo",
                      fontSize: '1em',
                      color: 'black',
                      backgroundColor: this.state.tabValue === 0 ? '#b4d6f7' : '#d3d3d3'
                    }}
                  />
                  <Tab
                    label="Child Behaviors"
                    onClick={this.handleChild}
                    style={{
                      fontFamily: "Arimo",
                      fontSize: '1em',
                      color: 'black',
                      backgroundColor: this.state.tabValue === 1 ? Constants.Colors.SA : '#d3d3d3'
                    }}
                  />
                  <Tab
                    label="Teacher Behaviors"
                    onClick={this.handleTeacher}
                    style={{
                      fontFamily: "Arimo",
                      fontSize: '1em',
                      color: 'black',
                      backgroundColor: this.state.tabValue === 2 ? Constants.Colors.AppBar : '#d3d3d3'
                    }}
                  />
                </Tabs>
              </TabBar>
            </MuiThemeProvider>
          </Grid>
          <Grid item>
            {this.state.tabValue === 0 ?
              <SequentialHelpDefinitions />
            : this.state.tabValue === 1 ?
              <SequentialHelpChild />
            : <SequentialHelpTeacher />}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(SequentialHelpCard);
