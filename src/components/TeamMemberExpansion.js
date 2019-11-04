import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography/Typography';



class TeamMemberExpansion extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Grid container direction="row" justify="center" alignItems="center" style={{paddingTop: 10, paddingBottom: 10}}>
        <Grid item xs={2} />
          <Grid item xs={8}>
            <Typography variant="subtitle1" style={{textAlign: 'left', paddingTop: 20}}>
              <strong>{this.props.person.name}</strong>
            </Typography>
            <Typography variant="subtitle1" style={{textAlign: 'left', paddingBottom: 6}}>
              {this.props.person.role}
            </Typography>
            <Typography variant="body1" style={{textAlign: 'justify', paddingBottom: 20}}>
              {this.props.person.description}
            </Typography>
          </Grid>
        <Grid item xs={2} />
      </Grid>
    );
  }
}

export default TeamMemberExpansion;