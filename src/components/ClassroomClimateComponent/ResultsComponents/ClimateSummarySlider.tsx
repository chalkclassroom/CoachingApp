import * as React from 'react';
import * as PropTypes from "prop-types";
import BehaviorResponsesSummaryChart from './BehaviorResponsesSummaryChart';
import ToneSummary from './ToneSummary';
import Slider from "react-slick";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SignalWifi4BarIcon from '@material-ui/icons/SignalWifi4Bar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import * as Constants from '../../../constants/Constants';

interface Props {
  negativeResponses: number,
  positiveResponses: number,
  averageToneRating: number,
}

/**
 * @class ClimateSummarySlider
 */
class ClimateSummarySlider extends React.Component<Props, {}> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);
  }

  static propTypes = {
    negativeResponses: PropTypes.number.isRequired,
    positiveResponses: PropTypes.number.isRequired,
    averageToneRating: PropTypes.number
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
      <Slider {...settings}>
        <div>
          <Grid justify={"center"} direction={"column"}>
            <Typography align="left" variant="subtitle1" style={{fontFamily: 'Arimo', paddingTop: '0.5em', paddingBottom: '1em'}}>
              Compare how often the teacher: 
            </Typography>
            <Grid container direction="column" alignItems="center">
              <Grid item style={{width: '100%'}}>
                <List>
                  <ListItem style={{padding: 0}}>
                    <ListItemIcon style={{margin: 0}}>
                      <SignalWifi4BarIcon style={{fill: Constants.Colors.CC, transform: 'rotate(-45deg)'}} />
                    </ListItemIcon>
                    <ListItemText primary="Approved of children&apos;s behavior." />
                  </ListItem>
                  <ListItem style={{padding: 0}}>
                    <ListItemIcon style={{margin: 0}}>
                      <SignalWifi4BarIcon style={{fill: Constants.Colors.RedGraph, transform: 'rotate(-45deg)'}} />
                    </ListItemIcon>
                    <ListItemText primary="Disapproved of children&apos;s behavior." />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
            <Grid item style={{paddingTop: '1em'}}>
              <BehaviorResponsesSummaryChart
                negativeResponses={this.props.negativeResponses}
                positiveResponses={this.props.positiveResponses}
              />
            </Grid>
          </Grid>
        </div>
        <div>
          <Grid justify={"center"} direction={"column"}>
            <Typography align={"center"} variant={"h4"}>
              Average Tone
            </Typography>
            <ToneSummary
              averageToneRating={this.props.averageToneRating}
            />
          </Grid>
        </div>
      </Slider>
    );
  }
}

export default ClimateSummarySlider;