import * as React from "react";
import * as PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import { withStyles } from "@material-ui/core/styles";
import CCImage from "../../assets/images/CCImage.jpg";
import DMImage from "../../assets/images/DMImage.jpg";
import KNImage from "../../assets/images/KNImage.jpg";
import CSImage from "../../assets/images/CSImage.jpg";

const styles: object = {
  imageBox: {
    width: "60%",
    textAlign: "center",
    borderRadius: "15px"
  },
  image: {
    borderRadius: "15px 15px 0px 0px",
    width: "100%"
  }
};

interface Style {
  imageBox: string,
  image: string
}

interface Props {
  classes: Style,
  person: { email: string, name: string, role: string, initials: string, description: string, link: string },
  open: boolean,
  handleClick(): void
}

interface State {
  image: string
}

/**
 * formatting for card for each team member
 * @class TeamMemberCard
 */
class TeamMemberCard extends React.Component<Props, State> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      image: null
    };
  }

  /** lifecycle method invoked after component mounts */
  componentDidMount() {
    this.props.person.initials === "CC"
      ? this.setState({ image: CCImage })
      : this.props.person.initials === "DM"
      ? this.setState({ image: DMImage })
      : this.props.person.initials === "KN"
      ? this.setState({ image: KNImage })
      : this.setState({ image: CSImage });
  };

  static propTypes = {
    person: PropTypes.exact({
      email: PropTypes.string,
      name: PropTypes.string,
      initials: PropTypes.string,
      role: PropTypes.string,
      description: PropTypes.string,
      link: PropTypes.string
    }),
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    handleClick: PropTypes.func.isRequired
  };

  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    const { classes } = this.props;
    return (
      <Grid container justify="center" alignItems="center">
        <div
          style={{
            boxShadow: this.props.open
              ? "4px 4px 8px 4px rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
              : "0 2px 2px 0 rgba(0, 0, 0, 0.2)"
          }}
          className={classes.imageBox}
          onClick={this.props.handleClick}
        >
          <img
            src={this.state.image}
            alt={this.props.person.name}
            className={classes.image}
          />
          <div style={{ padding: 8 }}>
            <Typography variant="subtitle1" style={{fontFamily: "Arimo"}}>
              <strong>{this.props.person.name}</strong>
            </Typography>
            <Typography variant="subtitle1" style={{fontFamily: "Arimo"}}>
              {this.props.person.role}
            </Typography>
          </div>
        </div>
      </Grid>
    );
  }
}


export default withStyles(styles)(TeamMemberCard);
