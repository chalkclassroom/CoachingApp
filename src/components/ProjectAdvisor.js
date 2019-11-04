import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography/Typography';

class ProjectAdvisor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Grid container direction="column" justify="center" alignItems="center" style={{paddingLeft: 10}}>
        <Grid item>
          <Typography>
            <strong>{this.props.person.name}</strong>
          </Typography>
        </Grid>
        <Grid item>
          <Typography>
            {this.props.person.role}
          </Typography>
        </Grid>
        <Grid item>
          <Typography>
            {this.props.person.job}
          </Typography>
        </Grid>
        <Grid item>
          <Typography>
            {this.props.person.affiliation}
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

export default ProjectAdvisor;