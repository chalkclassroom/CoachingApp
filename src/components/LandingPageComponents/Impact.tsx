import * as React from 'react';
import * as PropTypes from 'prop-types';
import Grid, { GridItemsAlignment } from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";


const styles: object = {
  titleText: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Arimo'
  },
  bodyText: {
    fontSize: 20,
    color: '#2f4b65',
    fontFamily: 'Arimo'
  },
  "@media (max-width: 700px)": {
    root: {
      display: "none"
    },
  },
  "@media (min-width: 701px)": {
    mobileRoot: {
      display: "none"
    }
  }
};

interface Style {
  root: string,
  mobileRoot: string,
  titleText: string,
  bodyText: string,
  '@media (max-width: 700px)': string,
  '@media (min-width: 701px)': string
}

interface Props {
  classes: Style,
  position: GridItemsAlignment,
  paddingTop?: string,
  color: string,
  icon: string,
  title: string,
  text: string | object,
  list?: Array<string>
}

/**
 * formatting for impact icons and descriptions on landing page
 * @class Impact
 */
class Impact extends React.Component<Props, {}> {
  /**
   * @param {Props} props
   */
  constructor(props: Props){
    super(props);
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    position: PropTypes.oneOf<GridItemsAlignment>(['baseline', 'center', 'flex-end', 'flex-start', 'stretch']).isRequired,
    icon: PropTypes.string.isRequired,
    paddingTop: PropTypes.string,
    color: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    list: PropTypes.array
  }
  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    return(
      <div>
        <div className={classes.root}>
          <Grid container direction="row" justify="flex-start" alignItems={this.props.position}>
            <Grid item xs={2} />
            <Grid item xs={3}>
              <Grid container direction="row" justify="flex-end" alignItems="center">
                <Grid container direction="column" justify="center" alignItems="center">
                  <Grid item>
                    <img alt="School" src={this.props.icon} style={{paddingTop:this.props.paddingTop}}/>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.titleText} style={{color: this.props.color}}>
                      <strong>{this.props.title}</strong>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={5}>
              <Grid container direction="row" justify="flex-start" alignItems="center">
                <Typography className={classes.bodyText}>
                  {this.props.text}
                </Typography>
                {this.props.list ? (
                  <ul>
                    {this.props.list.map((value, index) => {
                      return (
                        <li key={index}>
                          <Typography className={classes.bodyText}>
                            {value}
                          </Typography>
                        </li>
                      )
                    })}
                  </ul>
                ) : (null)}
              </Grid>
            </Grid>
            <Grid item xs={2} />
          </Grid>
        </div>
        <div className={classes.mobileRoot}>
          <Grid container direction="row" justify="flex-start" alignItems={this.props.position}>
            <Grid item xs={4}>
              <Grid container direction="row" justify="flex-end" alignItems="center">
                <Grid container direction="column" justify="center" alignItems="center">
                  <Grid item>
                    <img alt="School" src={this.props.icon} width="95%" style={{paddingTop:this.props.paddingTop}}/>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.titleText} style={{color: this.props.color}}>
                      <strong>{this.props.title}</strong>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={8} style={{paddingLeft: '1em'}}>
              <Grid container direction="row" justify="flex-start" alignItems="center">
                <Typography className={classes.bodyText}>
                  {this.props.text}
                </Typography>
                {this.props.list ? (
                  <ul>
                    {this.props.list.map((value, index) => {
                      return (
                        <li key={index}>
                          <Typography className={classes.bodyText}>
                            {value}
                          </Typography>
                        </li>
                      )
                    })}
                  </ul>
                ) : (null)}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Impact);