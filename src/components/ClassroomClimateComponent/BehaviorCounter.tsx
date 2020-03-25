import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import * as PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  popOffClimateStack,
  pushOntoClimateStack
} from "../../state/actions/classroom-climate";

const styles = {
  root: {
    flexGrow: 1
  }
};

interface Props {
  teacherId: string,
  firebase: {
    auth: {
      currentUser: {
        uid: string
      }
    },
    handleSession(entry: object): void,
    handlePushClimate(entry: object): void
  },
  pushOntoClimateStack(entry: object): void,
  popOffClimateStack(): void,
  climateStackSize: number
}

/**
 * Behavior Type Buttons for Climate Observation
 * @class BehaviorCounter
 * @param {Props} props
 */
class BehaviorCounter extends React.Component<Props, {}> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);
    const mEntry = {
      teacher: this.props.teacherId,
      observedBy: this.props.firebase.auth.currentUser.uid,
      type: "climate"
    };
    this.props.firebase.handleSession(mEntry);
  }

  /**
   * @param {string} type
   */
  handlePushFire = (type: string) => {
    const mEntry = {
      BehaviorResponse: type,
      // Type: this.props.climateType
      Type: "climate"
    };
    this.props.firebase.handlePushClimate(mEntry);
    this.props.pushOntoClimateStack(mEntry);
  };

  handleUndo = () => {
    if (this.props.climateStackSize > 0) {
      this.props.popOffClimateStack();
      // <<<<<<< Updated upstream
      const mEntry = {
        BehaviorResponse: "UNDO",
        Type: "UNDO"
      };
      this.props.firebase.handlePushClimate(mEntry);
    }
  };

  customUI2 = (props: Props) => {
    return (
      // <<<<<<< Updated upstream
      <svg width={595.172} height={555.055} {...props}>
        <defs>
          <style>{".prefix__cls-1{fill:#6465bb}"}</style>
          <linearGradient
            id="prefix__linear-gradient"
            x1={0.42}
            y1={0.86}
            x2={0.806}
            gradientUnits="objectBoundingBox"
          >
            <stop offset={0} stopColor="#029164" />
            <stop offset={1} stopColor="#1dbe89" />
          </linearGradient>
          <filter
            id="prefix__Rectangle"
            x={378.117}
            y={336.625}
            width={217.055}
            height={218}
            filterUnits="userSpaceOnUse"
          >
            <feOffset dy={4} />
            <feGaussianBlur stdDeviation={5} result="blur" />
            <feFlood floodColor="#949494" />
            <feComposite operator="in" in2="blur" />
            <feComposite in="SourceGraphic" />
          </filter>
          <linearGradient
            id="prefix__linear-gradient-2"
            x1={0.711}
            y1={-0.112}
            x2={0.468}
            y2={0.85}
            gradientUnits="objectBoundingBox"
          >
            <stop offset={0} stopColor="#ffc061" />
            <stop offset={1} stopColor="#e99c2e" />
          </linearGradient>
          <filter
            id="prefix__Rectangle_Copy_3"
            x={0}
            y={0}
            width={217.055}
            height={218}
            filterUnits="userSpaceOnUse"
          >
            <feOffset dy={4} />
            <feGaussianBlur stdDeviation={5} result="blur-2" />
            <feFlood floodColor="#949494" />
            <feComposite operator="in" in2="blur-2" />
            <feComposite in="SourceGraphic" />
          </filter>
          <linearGradient
            id="prefix__linear-gradient-3"
            x1={0.707}
            y1={0.081}
            x2={0.5}
            y2={1}
            gradientUnits="objectBoundingBox"
          >
            <stop offset={0} stopColor="#fb6988" />
            <stop offset={1} stopColor="#f53850" />
          </linearGradient>
          <filter
            id="prefix__Rectangle_Copy"
            x={0}
            y={337.055}
            width={217.055}
            height={218}
            filterUnits="userSpaceOnUse"
          >
            <feOffset dy={4} />
            <feGaussianBlur stdDeviation={5} result="blur-3" />
            <feFlood floodColor="#949494" />
            <feComposite operator="in" in2="blur-3" />
            <feComposite in="SourceGraphic" />
          </filter>
          <linearGradient
            id="prefix__linear-gradient-4"
            x1={0.755}
            y1={-0.044}
            x2={0.552}
            y2={0.443}
            gradientUnits="objectBoundingBox"
          >
            <stop offset={0} stopColor="#c169e5" />
            <stop offset={1} stopColor="#9337d3" />
          </linearGradient>
          <filter
            id="prefix__Rectangle_Copy_2"
            x={376.117}
            y={11.152}
            width={217.055}
            height={218}
            filterUnits="userSpaceOnUse"
          >
            <feOffset dy={4} />
            <feGaussianBlur stdDeviation={5} result="blur-4" />
            <feFlood floodColor="#646464" floodOpacity={0.502} />
            <feComposite operator="in" in2="blur-4" />
            <feComposite in="SourceGraphic" />
          </filter>
        </defs>
        <g
          id="prefix__Selection_Circles"
          data-name="Selection Circles"
          transform="translate(24.117 20.35)"
        >
          <g
            id="prefix__Group_4"
            data-name="Group 4"
            transform="translate(68 72)"
            style={
              {
                // stroke:
                //     this.props.climateType === "instruction"
                //         ? "#6465BB"
                //         : "#4FD9B3"
              }
            }
          >
            <path
              id="prefix__Combined_Shape"
              data-name="Combined Shape"
              className="prefix__cls-1"
              // style={{
              //     fill:
              //         this.props.climateType === "instruction"
              //             ? "#6465BB"
              //             : "#4FD9B3"
              // }}
              d="M406.883 388.276H0V0h406.883v388.275zM31.837 32.211v327.335h343.21V32.211z"
            />
          </g>
          <text
            id="ClimateStack"
            data-name={"ClimateStackSize"}
            transform="translate(271.841 274.519)"
            fontFamily="Helvetica-Bold,Helvetica"
            fontWeight={700}
            fontSize={30}
            fill="#6465bb"
            // style={{
            //             fill:
            //                 this.props.climateType === "instruction"
            //                     ? "#6465bb"
            //                     : "#4FD9B3"
            //         }}
          >
            <tspan x={-8.342} y={0}>
              {this.props.climateStackSize}
            </tspan>
          </text>
          <g
            id="prefix__Specific_Approval"
            data-name="Specific Approval"
            transform="translate(185 445.275)"
            // data-name="Group 1"
            onClick={() => this.handlePushFire("specificapproval")}
          >
            <g
              transform="translate(-209.12 -465.63)"
              filter="url(#prefix__Rectangle)"
            >
              <rect
                id="prefix__Rectangle-2"
                data-name="Rectangle"
                width={187.055}
                height={188}
                rx={93.528}
                transform="translate(393.12 347.63)"
                fill="url(#prefix__linear-gradient)"
              />
            </g>
            <text
              id="prefix__Specific_Approval-2"
              data-name="Specific Approval"
              transform="translate(277.071 -28.531)"
              fontSize={20}
              fill="#bdffd8"
              fontFamily="Helvetica-Bold,Helvetica"
              fontWeight={700}
            >
              <tspan x={-41.128} y={0}>
                {"Specific "}
              </tspan>
              <tspan x={-46.118} y={19}>
                {"Approval"}
              </tspan>
            </text>
          </g>
          <g
            id="prefix__Redirection"
            transform="translate(-9.117 -9.35)"
            data-name="Group 1"
            onClick={() => this.handlePushFire("redirection")}
          >
            <g
              transform="translate(-15 -11)"
              filter="url(#prefix__Rectangle_Copy_3)"
            >
              <rect
                id="prefix__Rectangle_Copy_3-2"
                data-name="Rectangle Copy 3"
                width={187.055}
                height={188}
                rx={93.528}
                transform="translate(15 11)"
                fill="url(#prefix__linear-gradient-2)"
              />
            </g>
            <text
              id="prefix__Redirection-2"
              data-name="Redirection"
              transform="translate(35.864 85.414)"
              fill="#fff7ec"
              fontSize={20}
              fontFamily="Helvetica-Bold,Helvetica"
              fontWeight={700}
            >
              <tspan x={0} y={15}>
                {"Redirection"}
              </tspan>
            </text>
          </g>
          <g
            id="prefix__Non-Specific_Approval"
            data-name="Non-Specific Approval"
            transform="translate(9.883 359.705)"
            onClick={() => this.handlePushFire("nonspecificapproval")}
          >
            <g
              transform="translate(-34 -380.06)"
              filter="url(#prefix__Rectangle_Copy)"
            >
              <path
                id="prefix__Rectangle_Copy-2"
                data-name="Rectangle Copy"
                d="M93.528 0a93.528 93.528 0 0 1 93.528 93.528v.945A93.528 93.528 0 0 1 0 94.472v-.945A93.528 93.528 0 0 1 93.528 0z"
                transform="translate(15 348.06)"
                fill="url(#prefix__linear-gradient-3)"
              />
            </g>
            <text
              id="prefix__Non-Specific_Approval"
              data-name="Non-Specific Approval"
              transform="translate(-4.491 47.393)"
              fill="#ffeaed"
              fontSize={20}
              fontFamily="Helvetica-Bold,Helvetica"
              fontWeight={700}
            >
              <tspan x={18.28} y={15}>
                {"Non-Specific"}
              </tspan>
              <tspan x={36.058} y={36}>
                {"Approval"}
              </tspan>
            </text>
          </g>
          <g
            id="prefix__Disapproval_"
            data-name="Disapproval"
            transform="translate(487 -123.198)"
            // data-name="Group 1"
            onClick={() => this.handlePushFire("disapproval")}
          >
            <g
              transform="translate(-511.12 102.85)"
              filter="url(#prefix__Rectangle_Copy_2)"
            >
              <rect
                id="prefix__Rectangle_Copy_2-2"
                data-name="Rectangle Copy 2"
                width={187.055}
                height={188}
                rx={93.528}
                transform="translate(391.12 22.15)"
                fill="url(#prefix__linear-gradient-4)"
              />
            </g>
            <text
              id="prefix__Disapproval"
              transform="translate(-98.212 206.89)"
              fill="#f4e3ff"
              fontSize={20}
              fontFamily="Helvetica-Bold,Helvetica"
              fontWeight={700}
            >
              <tspan x={14.446} y={15}>
                {"Disapproval"}
              </tspan>
            </text>
          </g>
          <g
            id="prefix__undo-arrow-in-a-black-circle"
            transform="translate(246.5 296.275)"
            onClick={() => this.handleUndo()}
          >
            <svg width={50} height={50} {...props}>
              <path
                data-name="Path 1"
                d="M6.629 18.196l5.29 25.649 30.863-3.085-4.591-31.55L16.35 7.09z"
                fill="#fff"
                stroke="#6465bb"
                // style={{
                //     stroke:
                //         this.props.climateType === "instruction"
                //             ? "#6465bb"
                //             : "#4FD9B3"
                // }}
                strokeMiterlimit={10}
              />
              <path
                data-name="Path 2"
                d="M25 0A25 25 0 1 1 0 25 25 25 0 0 1 25 0zm-3.125 34.375v-6.25s12.5-3.125 18.75 6.25a18.749 18.749 0 0 0-18.75-18.75v-6.25l-12.5 12.5z"
                fill="#6465bb"
                // style={{
                //     fill:
                //         this.props.climateType === "instruction"
                //             ? "#6465bb"
                //             : "#4FD9B3"
                // }}
              />
            </svg>
          </g>
          <text
            id="prefix__Total_Reponses:"
            data-name="Total Reponses:"
            transform="translate(271.681 215.786)"
            fontSize={17}
            fontFamily="Helvetica-Bold,Helvetica"
            fontWeight={700}
            fill="#6465bb"
            // style={{
            //             fill:
            //                 this.props.climateType === "instruction"
            //                     ? "#6465bb"
            //                     : "#4FD9B3"
            //         }}
          >
            <tspan x={-22.039} y={0}>
              {"Total "}
            </tspan>
            <tspan x={-45.351} y={17}>
              {"Responses"}
            </tspan>
          </text>
        </g>
      </svg>
    );
  };

  static propTypes = {
    teacherId: PropTypes.string.isRequired,
    climateStackSize: PropTypes.number.isRequired,
    firebase: PropTypes.object.isRequired,
    pushOntoClimateStack: PropTypes.func.isRequired,
    popOffClimateStack: PropTypes.func.isRequired
  }
  
  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    return <>{this.customUI2(this.props)}</>;
  }
}

BehaviorCounter.propTypes = {
  // climateType: PropTypes.string.isRequired,
  teacherId: PropTypes.string.isRequired,
  climateStackSize: PropTypes.number.isRequired,
  firebase: PropTypes.object.isRequired,
  pushOntoClimateStack: PropTypes.func.isRequired,
  popOffClimateStack: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    // climateType: state.climateTypeState.climateType,
    climateStackSize: state.climateStackState.climateStack.length
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, { pushOntoClimateStack, popOffClimateStack })(
    BehaviorCounter
  )
);
