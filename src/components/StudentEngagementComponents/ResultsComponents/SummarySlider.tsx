import * as React from "react";
import * as PropTypes from "prop-types";
import Slider from "react-slick";
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import PieSummary from "./PieSummary";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import AvgBarSummary from "../../StudentEngagementComponents/ResultsComponents/AvgBarSummary";
import SignalWifi4BarIcon from '@material-ui/icons/SignalWifi4Bar';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import * as Constants from '../../../constants/Constants';

interface Props {
  offTask: number,
  engaged: number,
  avgRating: number
}

/**
 * Swipe View for Child and Teacher Sequential Pie Charts
 * @class SummarySlider
 * @return {void}
 */
class SummarySlider extends React.Component<Props, {}> {

  static propTypes = {
    offTask: PropTypes.number.isRequired,
    engaged: PropTypes.number.isRequired,
    avgRating: PropTypes.number.isRequired
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
      slidesToScroll: 1,
      arrows: false
    };
    return (
      <div>
        <Typography variant="h5" style={{textAlign: "center", fontFamily: 'Arimo', paddingTop: '1em', paddingBottom: '0.5em'}}>
          Student Engagement
        </Typography>
        <Slider {...settings}>
          <div>
            <Grid container justify={"center"} direction={"column"}>
              <Typography align="left" variant="subtitle1" style={{fontFamily: 'Arimo'}}>
                Compare how often the children were:
              </Typography>
              <Grid container direction="column" alignItems="center">
                <Grid item style={{width: '100%'}}>
                  <List>
                    <ListItem style={{padding: 0}}>
                      <ListItemIcon style={{margin: 0}}>
                        <SignalWifi4BarIcon style={{fill: Constants.Colors.SE, transform: 'rotate(-45deg)'}} />
                      </ListItemIcon>
                      <ListItemText primary="Engaged" />
                    </ListItem>
                    <ListItem style={{padding: 0}}>
                      <ListItemIcon style={{margin: 0}}>
                        <SignalWifi4BarIcon style={{fill: Constants.Colors.RedGraph, transform: 'rotate(-45deg)'}} />
                      </ListItemIcon>
                      <ListItemText primary="Off Task" />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
              <PieSummary
                offTask={this.props.offTask}
                engaged={this.props.engaged}
              />
            </Grid>
          </div>
          <div>
            <Grid container justify={"center"} direction={"column"}>
              <Typography align={"center"} variant="subtitle1" style={{fontFamily: 'Arimo', marginTop: '50px'}}>
                What do you notice about the average class room engagement?
              </Typography>
              <Typography align={"center"} variant="subtitle1" style={{fontFamily: 'Arimo', paddingTop: '0.5em', marginBottom: '100px'}}>
                Average Level of Engagement Score: {Math.round((this.props.avgRating + Number.EPSILON) * 100) / 100}
              </Typography>
              <AvgBarSummary avgRating={this.props.avgRating}/>
            </Grid>
          </div>
        </Slider>
      </div>
    );
  }
}

export default SummarySlider;