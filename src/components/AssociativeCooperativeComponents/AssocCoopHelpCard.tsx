import * as React from 'react';
import * as PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles/index";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabBar from "@material-ui/core/AppBar";
import Grid from '@material-ui/core/Grid';
import * as Constants from '../../constants';
import ACHelpChild from './ACHelpChild';
import ACHelpTeacher from './ACHelpTeacher';

const ACTheme = createMuiTheme({
    palette: {
        primary: {
            main: Constants.Colors.AC
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
 * @class AssocCoopHelpCard
 */
class AssocCoopHelpCard extends React.Component<Props, State> {
    static propTypes = {
        classes: PropTypes.object.isRequired
    };

    /**
     * @param {Props} props
     */
    constructor(props: Props) {
        super(props);

        this.state = {
            tabValue: 0,
        }
    }

    /**
     * @return {void}
     */
    handleChild = (): void => {
        if (this.state.tabValue !== 0) {
            this.setState({
                tabValue: 0
            })
        }
    };

    /**
     * @return {void}
     */
    handleTeacher = (): void => {
        if (this.state.tabValue !== 1) {
            this.setState({
                tabValue: 1
            })
        }
    };

    /**
     * render function
     * @return {ReactNode}
     */
    render(): React.ReactNode {
        const {classes} = this.props;
        return (
            <div>
                <Grid container direction="column">
                    <Grid item>
                        <MuiThemeProvider theme={ACTheme}>
                            <TabBar position="static" color="default" className={classes.tabBar}>
                                <Tabs
                                    value={this.state.tabValue}
                                    indicatorColor="secondary"
                                    variant="fullWidth"
                                >
                                    <Tab
                                        label="Child Behaviors"
                                        onClick={this.handleChild}
                                        style={{
                                            fontFamily: "Arimo",
                                            fontSize: '1em',
                                            color: this.state.tabValue === 0 ? 'white' : 'black',
                                            backgroundColor: this.state.tabValue === 0 ? Constants.Colors.AC : '#d3d3d3'
                                        }}
                                    />
                                    <Tab
                                        label="Teacher Behaviors"
                                        onClick={this.handleTeacher}
                                        style={{
                                            fontFamily: "Arimo",
                                            fontSize: '1em',
                                            backgroundColor: this.state.tabValue === 1 ? Constants.AppBarColor : '#d3d3d3'
                                        }}
                                    />
                                </Tabs>
                            </TabBar>
                        </MuiThemeProvider>
                    </Grid>
                    <Grid item>
                        {this.state.tabValue === 0 ? <ACHelpChild/> : <ACHelpTeacher/>}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(AssocCoopHelpCard);