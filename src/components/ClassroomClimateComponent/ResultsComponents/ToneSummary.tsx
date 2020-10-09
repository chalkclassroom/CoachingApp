import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';

interface Props {
  averageToneRating: number
}

/**
 * displays average tone scale for climate data summary
 * @class ToneSummary
 */
class ToneSummary extends React.Component<Props, {}> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const marks = [
      {
        value: 1,
        label: '1',
      },
      {
        value: 2,
        label: '2',
      },
      {
        value: 3,
        label: '3',
      },
      {
        value: 4,
        label: '4',
      },
      {
        value: 5,
        label: '5'
      }
    ];
    return (
      <Grid direction="column" justify="center" alignItems="center">
        <Grid item style={{paddingTop: '1em'}}>
          <Typography variant="subtitle1">
            What was the teacher&apos;s average tone rating?
          </Typography>
        </Grid>
        <Grid item style={{padding: '1em'}}>
          <Slider
            value={this.props.averageToneRating}
            aria-labelledby="continuous-slider"
            step={1}
            min={1}
            max={5}
            marks={marks}
            valueLabelDisplay="on"
          />
        </Grid>
      </Grid>
    );
  }
}

export default ToneSummary;