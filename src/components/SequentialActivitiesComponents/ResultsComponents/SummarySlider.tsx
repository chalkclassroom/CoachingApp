import * as React from "react";
import * as PropTypes from "prop-types";
import Slider from "react-slick";
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import ChildPieSummary from "./ChildPieSummary";
import TeacherPieSummary from "./TeacherPieSummary";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import SignalWifi4BarIcon from '@material-ui/icons/SignalWifi4Bar';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import * as Constants from '../../../constants/Constants';

interface Props {
  sequential: number,
  notSequential: number,
  support: number,
  noSupport: number,
  noTeacherOpp: number
}

/**
 * Swipe View for Child and Teacher Sequential Pie Charts
 * @class SummarySlider
 * @return {void}
 */
class SummarySlider extends React.Component<Props, {}> {

  static propTypes = {
    sequential: PropTypes.number.isRequired,
    notSequential: PropTypes.number.isRequired,
    support: PropTypes.number.isRequired,
    noSupport: PropTypes.number.isRequired,
    noTeacherOpp: PropTypes.number.isRequired
  }
  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div>
        <Slider {...settings}>
          <div>
            <Grid container justify={"center"} direction={"column"}>
              <Typography align={"center"} variant="h5" style={{fontFamily: 'Arimo'}}>
                Child Behaviors
              </Typography>
              <Typography align="left" variant="subtitle1" style={{fontFamily: 'Arimo', paddingTop: '0.5em'}}>
                Compare how often children:
              </Typography>
              <Grid container direction="column" alignItems="center">
                <Grid item style={{width: '100%'}}>
                  <List>
                    <ListItem style={{padding: 0}}>
                      <ListItemIcon style={{margin: 0}}>
                        <SignalWifi4BarIcon style={{fill: Constants.Colors.SA, transform: 'rotate(-45deg)'}} />
                      </ListItemIcon>
                      <ListItemText primary="Did sequential activities." />
                    </ListItem>
                    <ListItem style={{padding: 0}}>
                      <ListItemIcon style={{margin: 0}}>
                        <SignalWifi4BarIcon style={{fill: Constants.Colors.RedGraph, transform: 'rotate(-45deg)'}} />
                      </ListItemIcon>
                      <ListItemText primary="Did non-sequential activities." />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
              <ChildPieSummary
                sequential={this.props.sequential}
                notSequential={this.props.notSequential}
              />
            </Grid>
          </div>
          <div>
            <Grid container justify={"center"} direction={"column"}>
              <Typography align={"center"} variant="h5" style={{fontFamily: 'Arimo'}}>
                Teacher Behaviors
              </Typography>
              <Typography align="left" variant="subtitle1" style={{fontFamily: 'Arimo', paddingTop: '0.5em'}}>
                Compare how often the children were:
              </Typography>
              <Grid container direction="column" alignItems="center">
                <Grid item style={{width: '100%'}}>
                  <List>
                    <ListItem style={{padding: 0}}>
                      <ListItemIcon style={{margin: 0}}>
                        <SignalWifi4BarIcon style={{fill: Constants.Colors.AppBar, transform: 'rotate(-45deg)'}} />
                      </ListItemIcon>
                      <ListItemText primary="Supported children&apos;s sequential activities." />
                    </ListItem>
                    <ListItem style={{padding: 0}}>
                      <ListItemIcon style={{margin: 0}}>
                        <SignalWifi4BarIcon style={{fill: Constants.Colors.RedGraph, transform: 'rotate(-45deg)'}} />
                      </ListItemIcon>
                      <ListItemText primary="Was present in the center but did not support sequential activities." />
                    </ListItem>
                    <ListItem style={{padding: 0}}>
                      <ListItemIcon style={{margin: 0}}>
                        <SignalWifi4BarIcon style={{fill: '#bababa', transform: 'rotate(-45deg)'}} />
                      </ListItemIcon>
                      <ListItemText primary="Was not present in the centers observed." />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
              <TeacherPieSummary
                support={this.props.support}
                noSupport={this.props.noSupport}
                noTeacherOpp={this.props.noTeacherOpp}
              />
            </Grid>
          </div>
        </Slider>
      </div>
    );
  }
}

export default SummarySlider;