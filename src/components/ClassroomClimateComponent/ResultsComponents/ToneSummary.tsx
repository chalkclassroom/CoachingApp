import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

interface Props {
  averageToneRating: number
}

/**
 * displays average tone scale for climate data summary
 * @class ToneSummary
 */
class ToneSummary extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    return (
      <Grid direction="column" justify="center" alignItems="center">
        <Grid item>
          <Typography variant="h4">
            What was the teacher's average tone rating?
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h2">
            {this.props.averageToneRating ? this.props.averageToneRating.toString() : '0'}
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

export default ToneSummary;