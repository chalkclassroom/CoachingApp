import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardActionArea } from "@material-ui/core";
import styled from "styled-components";
import LockImage from "../assets/images/LockImage.png";
import CheckmarkImage from "../assets/images/CheckmarkImage.png";

const styles: object = {
  overlayImage: {
    color: "white",
    fontSize: 100,
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center"
  },
  card: {
    height: "160px;",
    boxShadow: "none"
  },
  cardAction: {
    height: "160px",
    width: "160px"
  }
};

const CardBase = styled.div`
  margin: 5px;
  position: relative;
  display: inline-block;
  //border: dashed 2px #808080;
  border-radius: 5px;
`;

const BackgroundImage = styled.div`
  flex: 1,
  width: null,
  height: null`;

const Overlay = styled.div`
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  z-index: 1000;
  opacity: 0.8,
`;

interface Style {
  overlayImage: string,
  card: string,
  cardAction: string
}

interface Props {
  classes: Style,
  onClick(selected: string, title: string): void,
  numSelected: number,
  title: string,
  icon: string,
  page: string,
  unlocked: boolean
}

interface State {
  selected: boolean
}

/**
 * magic 8 selection button
 * @class Magic8Card
 */
class Magic8Card extends React.Component<Props, State> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      selected: false
    };
  }

  /** @param {event} e */
  onClick(e) {
    e.preventDefault();
    const { onClick, numSelected } = this.props;
    onClick(this.state.selected, this.props.title);
    if (this.state.selected) {
      this.setState({ selected: false });
    } else if (numSelected < 1) {
      this.setState({ selected: true });
    }
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    numSelected: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    page: PropTypes.string.isRequired,
    unlocked: PropTypes.bool.isRequired
  }

  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    const { classes } = this.props;
    return (
      <CardBase>
        <Card
          className={classes.card}
          onClick={this.onClick}
          style={{ opacity: this.state.selected ? 0.5 : 1 }}
        >
          <CardActionArea className={classes.cardAction}>
            <BackgroundImage>
              <img src={this.props.icon} style={{ display: "block" }} />
            </BackgroundImage>
            {this.props.page === "Training" ? (
              this.props.unlocked ? (
                <Overlay>
                  <img
                    src={CheckmarkImage}
                    className={classes.overlayImage}
                    style={{ width: "100px" }}
                  />
                </Overlay>
              ) : (
                <div />
              )
            ) : this.props.unlocked ? (
              <div />
            ) : (
              <Overlay>
                <img src={LockImage} className={classes.overlayImage} />
              </Overlay>
            )}
          </CardActionArea>
        </Card>
      </CardBase>
    );
  }
}

export default withStyles(styles)(Magic8Card);
