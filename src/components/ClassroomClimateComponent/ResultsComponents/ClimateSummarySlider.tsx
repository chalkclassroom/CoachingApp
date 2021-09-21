import * as React from 'react';
import * as PropTypes from "prop-types";
import BehaviorResponsesSummaryChart from './BehaviorResponsesSummaryChart';
import AverageTone from './AverageTone';
import Slider from "react-slick";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SignalWifi4BarIcon from '@material-ui/icons/SignalWifi4Bar';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
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
      slidesToScroll: 1,
      arrows: false,
    };
    return (
      <Slider {...settings}>
        <div>
          <Grid justify={"center"} direction={"column"}>
            <Grid item style={{paddingTop: '1em'}}>
              <Typography variant="h5" style={{textAlign: "center", fontFamily: 'Arimo'}}>
                Classroom Climate
              </Typography>
            </Grid>
            <Typography align="left" variant="subtitle1" style={{fontFamily: 'Arimo', paddingTop: '0.5em', paddingBottom: '1em'}}>
              Compare how often the teacher: 
            </Typography>
            <Grid container direction="column" alignItems="center">
              <Grid item style={{width: '100%'}}>
                <List>
                  <ListItem style={{padding: 0}}>
                    <ListItemIcon style={{margin: 0}}>
                      <SignalWifi4BarIcon style={{fill: Constants.ClimateTypeColors.positiveBar, transform: 'rotate(-45deg)'}} />
                    </ListItemIcon>
                    <ListItemText primary="Approved of children&apos;s behavior." />
                  </ListItem>
                  <ListItem style={{padding: 0}}>
                    <ListItemIcon style={{margin: 0}}>
                      <SignalWifi4BarIcon style={{fill: Constants.ClimateTypeColors.negativeBar, transform: 'rotate(-45deg)'}} />
                    </ListItemIcon>
                    <ListItemText primary="Disapproved of or redirected children&apos;s behavior." />
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
            <Grid item style={{paddingTop: '1em'}}>
              <Typography variant="h5" style={{textAlign: "center", fontFamily: 'Arimo'}}>
                Average Tone
              </Typography>
            </Grid>
            <AverageTone
              averageToneRating={this.props.averageToneRating}
            />
          </Grid>
        </div>
      </Slider>
    );
  }
}

export default ClimateSummarySlider;