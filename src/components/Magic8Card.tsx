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
  onClick(title: string, unlocked: boolean): void,
  title: string,
  icon: string,
  training: boolean,
  unlocked: boolean,
  type: string
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
    
    this.state = {
      selected: false
    };
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    training: PropTypes.bool.isRequired,
    unlocked: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    return (
      <CardBase>
        <Card
          className={classes.card}
          onClick={(): void => this.props.onClick(this.props.title, this.props.unlocked)}
        >
          <CardActionArea className={classes.cardAction}>
            <BackgroundImage>
              <img src={this.props.icon} style={{ display: "block" }} />
            </BackgroundImage>
            {this.props.training ? (
              this.props.type === "Observe" && this.props.unlocked ? (
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
