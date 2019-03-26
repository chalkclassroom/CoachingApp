import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { popOffClimateStack, pushOntoClimateStack } from "../../state/actions/classroom-climate";

const styles = ({
    root: {
        flexGrow: 1
    }
});

class BehaviorCounter extends React.Component {
    constructor(props) {
        super(props);
        let mEntry = {
            teacher: this.props.teacherId,
            observedBy: this.props.firebase.auth.currentUser.uid,
            type: "Climate"
        };
        this.props.firebase.handleSession(mEntry);
    }

    handlePushFire = entry => {
        let mEntry = {
            BehaviorResponse: entry,
            Type: this.props.climateType
        };
        this.props.firebase.handlePushFireStore(mEntry);
        this.props.pushOntoClimateStack(mEntry);
    };


  handleUndo = () => {
    if (this.props.climateStackSize > 0) {
      this.props.popOffClimateStack();

      let mEntry = {
        BehaviorResponse: "UNDO",
        Type: "UNDO"
      };
      this.props.firebase.handlePushFireStore(mEntry);
    }
  };

  CustomUI = (props) => {
    return (<svg width={565.685} height={565.685} {...props}>
      <g fill="rgba(255,255,255,0)" style={{
        stroke:
          this.props.climateType === "instruction"
            ? "#76e9e9"
            : "#68b0ff"
      }} strokeWidth={30}>
        <path
          stroke="none"
          d="M282.843 0l282.843 282.843-282.843 282.842L0 282.843z"
        />
        <path
          fill="none"
          d="M282.843 21.213l261.63 261.63-261.63 261.63-261.63-261.63z"
        />
      </g>
      <g data-name="Group 1" onClick={() =>
        this.handlePushFire("specificapproval")
      }>
        <g data-name="Rectangle 2" fill="#55efc4" stroke="#fff" strokeWidth={2}>
          <path stroke="none" d="M207.843 19.553h150v150h-150z"/>
          <path fill="none" d="M208.843 20.553h148v148h-148z"/>
        </g>
      </g>
      <text
        data-name="Specific Approval"
        transform="translate(239.843 89.553)"
        fill="#fff"
        fontSize={20}
        fontFamily="SegoeUI-Bold, Segoe UI"
        fontWeight={700}
      >
        <tspan x={0} y={0}>
          {"Specific"}
        </tspan>
        <tspan x={0} y={27}>
          {"Approval"}
        </tspan>
      </text>
      <g data-name="Path 2" fill="#ff7675" onClick={() =>
        this.handlePushFire("disapproval")
      }>
        <path d="M356.843 544.553h-148v-148h148v148z"/>
        <path
          d="M209.843 397.553v146h146v-146h-146m-2-2h150v150h-150v-150z"
          fill="#fff"
        />
      </g>
      <text
        data-name="Disapproval"
        transform="translate(224.843 479.553)"
        fill="#fff"
        fontSize={20}
        fontFamily="SegoeUI-Bold, Segoe UI"
        fontWeight={700}
      >
        <tspan x={0} y={0}>
          {"Disapproval"}
        </tspan>
      </text>
      <g data-name="Rectangle 4" fill="#fab1a0" stroke="#fff" strokeWidth={2} onClick={() =>
        this.handlePushFire("redirection")}>
        <path stroke="none" d="M42.843 213.553h150v150h-150z"/>
        <path fill="none" d="M43.843 214.553h148v148h-148z"/>
      </g>
      <text
        transform="translate(63.843 297.553)"
        fill="#fff"
        fontSize={20}
        fontFamily="SegoeUI-Bold, Segoe UI"
        fontWeight={700}
      >
        <tspan x={0} y={0}>
          {"Redirection"}
        </tspan>
      </text>
      <g>
        <g data-name="Path 1" fill="#fede78" onClick={() =>
          this.handlePushFire("nonspecificapproval")
        }>
          <path d="M522.843 362.553h-148v-148h148v148z"/>
          <path
            d="M375.843 215.553v146h146v-146h-146m-2-2h150v150h-150v-150z"
            fill="#fff"
          />
        </g>
        <text
          data-name="Non Specific Approval"
          transform="translate(389.843 285.553)"
          fill="#fff"
          fontSize={20}
          fontFamily="SegoeUI-Bold, Segoe UI"
          fontWeight={700}
        >
          <tspan x={0} y={0}>
            {"Non Specific"}
          </tspan>
          <tspan x={0} y={27}>
            {" Approval"}
          </tspan>
        </text>
      </g>
      <g transform="translate(-229.157 -107.447)">
        <text
          data-name="Total Responses"
          transform="translate(438 343)"
          fontSize={20}
          fontFamily="SegoeUI-Bold, Segoe UI"
          fontWeight={700}
        >
          <tspan x={0} y={0}>
            {"Total Responses"}
          </tspan>
        </text>
        <text
          transform="translate(501 384)"
          fontSize={20}
          fontFamily="SegoeUI-Bold, Segoe UI"
          fontWeight={700}
        >
          <tspan x={0} y={0}>
            {this.props.climateStackSize}
          </tspan>
        </text>
        <image
          onClick={() =>
            this.handleUndo()
          }
          width={50}
          height={50}
          transform="rotate(45 -226.414 817.861)"
          xlinkHref="data:image/png;base64,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"
        />
      </g>
    </svg>);
  };


  render() {
    return (
      <>
        {this.CustomUI(this.props)}
      </>
        );
    }
}

BehaviorCounter.propTypes = {
    climateType: PropTypes.string.isRequired,
    teacherId: PropTypes.string.isRequired,
  climateStackSize: PropTypes.number.isRequired

};

const mapStateToProps = state => {
    return {
      climateType: state.climateTypeState.climateType,
      climateStackSize: state.climateStackState.climateStack.length
    };
};

export default withStyles(styles)(
    connect(
        mapStateToProps,
      { pushOntoClimateStack, popOffClimateStack }
    )(BehaviorCounter)
);
