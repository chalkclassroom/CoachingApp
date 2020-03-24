import * as React from 'react';
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles/index";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabBar from "@material-ui/core/AppBar";
import Grid from '@material-ui/core/Grid';
import * as Constants from '../../constants';
import ListeningHelp1 from './ListeningHelp1';
import ListeningHelp2 from './ListeningHelp2';

const ListeningTheme = createMuiTheme({
  palette: {
    primary: {
      main: Constants.ListeningColor
    },
    secondary: {
      main: '#000000'
    }
  }
});

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

interface State {
  tabValue: number
}

/**
 * @class ListeningToChildrenHelpCard
 */
class ListeningToChildrenHelpCard extends React.Component<Props, State>  {
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
  handleChecklist1 = (): void => {
    if (this.state.tabValue !== 0) {
      this.setState({
        tabValue: 0
      })
    }
  };

  /**
   * @return {void}
   */
  handleChecklist2 = (): void => {
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
            <MuiThemeProvider theme={ListeningTheme}>
              <TabBar position="static" color="default" className={classes.tabBar}>
                <Tabs
                  value={this.state.tabValue}
                  indicatorColor="secondary"
                  variant="fullWidth"
                >
                  <Tab
                    label="Listening"
                    onClick={this.handleChecklist1}
                    style={{
                      fontFamily: "Arimo",
                      fontSize: '1em',
                      color: 'black',
                      backgroundColor: this.state.tabValue === 0 ? Constants.ListeningColor : '#d3d3d3'
                    }}
                  />
                  <Tab
                    label="Supporting Child Talk"
                    onClick={this.handleChecklist2}
                    style={{
                      fontFamily: "Arimo",
                      fontSize: '1em',
                      color: 'black',
                      backgroundColor: this.state.tabValue === 1 ? Constants.ListeningColor: '#d3d3d3'
                    }}
                  />
                </Tabs>
              </TabBar>
            </MuiThemeProvider>
          </Grid>
          <Grid item>
            {this.state.tabValue === 0 ? <ListeningHelp1 /> : <ListeningHelp2 />}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(ListeningToChildrenHelpCard);