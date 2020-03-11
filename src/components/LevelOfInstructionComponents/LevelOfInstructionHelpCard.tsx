import * as React from 'react';
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles/index";
import Table from '@material-ui/core/Table/index';
import TableHead from '@material-ui/core/TableHead/index';
import TableRow from '@material-ui/core/TableRow/index';
import TableBody from '@material-ui/core/TableBody/index';
import TableCell from '@material-ui/core/TableCell/index';
import Slider from "react-slick";
import LevelOfInstructionHelpCard1 from './LevelOfInstructionHelpCard1';
import LevelOfInstructionHelpCard2 from './LevelOfInstructionHelpCard2';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabBar from "@material-ui/core/AppBar";
import Grid from '@material-ui/core/Grid';

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
    example: string
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

  handleInferential = () => {
    if (this.state.tabValue !== 0) {
      this.setState({
        tabValue: 0
      })
    }
  };

  handleBasic = () => {
    if (this.state.tabValue !== 1) {
      this.setState({
        tabValue: 1
      })
    }
  };
  
  render(): React.ReactNode {
    const { classes } = this.props;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div>
          {/* <Slider {...settings}>
            <div>
              <LevelOfInstructionHelpCard1 />
            </div>
            <div>
              <LevelOfInstructionHelpCard2 />
            </div>
          </Slider> */}
          <Grid container direction="column">
            <Grid item>
            <TabBar position="static" color="default" className={classes.tabBar}>
                        <Tabs
                          value={this.state.tabValue}
                          indicatorColor="primary"
                          textColor="primary"
                          variant="fullWidth"
                        >
                          <Tab label="Inferential Instruction" onClick={this.handleInferential} style={{fontFamily: "Arimo", fontSize: '1em'}} />
                          <Tab label="Basic Skills Instruction" onClick={this.handleBasic} style={{fontFamily: "Arimo", fontSize: '1em'}} />
                        </Tabs>
                      </TabBar>
            </Grid>
            <Grid item>
              {this.state.tabValue === 0 
              ? <LevelOfInstructionHelpCard1 />
              : <LevelOfInstructionHelpCard2 />
              }
            </Grid>
          </Grid>
          
      </div>
    )
  }
}

LevelOfInstructionHelpCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LevelOfInstructionHelpCard);
