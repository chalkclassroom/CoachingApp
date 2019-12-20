import * as React from 'react';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography/Typography';

interface Props {
  person: { name: string, role: string, job: string, affiliation: string}
}

/**
 * formatting for project advisor details
 * @class ProjectAdvisor
 */
class ProjectAdvisor extends React.Component<Props, {}> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);
  }

  static propTypes = {
    person: PropTypes.exact({
      name: PropTypes.string,
      role: PropTypes.string,
      job: PropTypes.string,
      affiliation: PropTypes.string
    }).isRequired
  }

  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    return(
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <Typography variant="h5" style={{fontFamily: "Arimo", textAlign: "center"}}>
            <strong>{this.props.person.name}</strong>
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6" style={{fontFamily: "Arimo", textAlign: "center"}}>
            {this.props.person.role}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6" style={{fontFamily: "Arimo", textAlign: "center"}}>
            {this.props.person.job}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6" style={{fontFamily: "Arimo", textAlign: "center"}}>
            {this.props.person.affiliation}
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

export default ProjectAdvisor;