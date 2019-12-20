import * as React from 'react';
import * as PropTypes from "prop-types";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from "@material-ui/core/styles";

const styles: object = {
  card: {
    paddingTop: 2,
    width: '95%',
    height: '100%',
    borderRadius: '10px'
  },
  titleText: {
    color: '#2f4b65',
    fontSize: 22,
    fontFamily: 'Arimo'
  },
  detailText: {
    color: '#5e7b97',
    fontSize: 18,
    fontFamily: 'Arimo'
  }
};

interface Style {
  card: string,
  titleText: string,
  detailText: string
}

interface Props {
  classes: Style,
  altText: string,
  icon: string,
  title: string,
  text: string
}

/**
 * formatting for features highlighted on landing page
 * @class FeaturesCard
 */
class FeaturesCard extends React.Component<Props, {}> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props){
    super(props);
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    altText: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  };

  /**
   * render function 
   * @return {ReactElement}
   */
  render() {
    const { classes } = this.props;
    return(
      <Card className={classes.card}>
        <CardContent>
          <Grid container direction="column">
            <Grid container direction="row" justify="center" alignItems="center" style={{height: '4em'}}>
              <Grid item xs={3}>
                <img alt={this.props.altText} src={this.props.icon} style={{width: '70%', height: '80%'}}/>
              </Grid>
              <Grid item xs={9}>
                <Typography className={classes.titleText}>
                  {this.props.title}
                </Typography>
              </Grid>
            </Grid>
            <Grid container direction="row" style={{paddingTop: 20}}>
              <Grid item xs={3} />
              <Grid item xs={9}>
                <Typography className={classes.detailText}>
                  {this.props.text}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(FeaturesCard);