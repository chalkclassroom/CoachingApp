import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography/Typography";
import { withStyles } from "@material-ui/core/styles";
import CC from "../assets/icons/CCImage.jpg";
import DM from "../assets/icons/DMImage.jpg";
import KN from "../assets/icons/KNImage.jpg";
import CS from "../assets/icons/CSImage.jpg";

const styles = {
  imageBox: {
    width: '60%',
    textAlign: 'center',
    borderRadius: '15px',
  },
  image: {
    borderRadius: '15px 15px 0px 0px',
    width: '100%'
  }
}

class TeamMemberCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null
    };
  }

  componentDidMount = () => {
    this.props.person.initials==='CC' ? this.setState({ image: CC })
      : this.props.person.initials==='DM' ? this.setState({ image: DM })
      : this.props.person.initials==='KN' ? this.setState({ image: KN })
      : this.setState({ image: CS })
  };

  render() {
    const { classes } = this.props;
    return(
      <Grid container justify="center" alignItems="center">
        <div
          style={{
            boxShadow: this.props.open
              ? '4px 4px 8px 4px rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
              : '0 2px 2px 0 rgba(0, 0, 0, 0.2)'
          }}
          className={classes.imageBox}
          onClick={this.props.handleClick}
        >
          <img src={this.state.image} alt={this.props.person.name} className={classes.image}/>
          <div style={{padding: 8}}>
            <Typography variant="subtitle1">
              <strong>{this.props.person.name}</strong>
            </Typography>
            <Typography variant="subtitle1">
              {this.props.person.role}
            </Typography>
          </div>
        </div>
      </Grid>
    );
  }
}

TeamMemberCard.propTypes = {
  person: PropTypes.object.isRequired,
};
export default withStyles(styles)(TeamMemberCard);