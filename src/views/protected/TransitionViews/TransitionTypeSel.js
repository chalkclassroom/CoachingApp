import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = ({
  });
  
  class TransitionTypeSel extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        selectedWaiting: false, 
        selectedTraveling: false,
        selectedRoutines: false, 
        selectedBehavior: false, 
        selectedMaterials: false,
        selectedOther: false
      }
    }
    handleClick= (waiting, traveling, routines, behavior,materials, other) => {
      console.log("Did something") 
      this.setState({
        selectedWaiting: waiting, 
        selectedTraveling: traveling, 
        selectedRoutines: routines, 
        selectedBehavior: behavior, 
        selectedMaterials: materials,
        selectedOther: other
      })
    }
      //Backend work
    TransitionType = props => {
      return (
    <svg width={317} height={520} {...props}>
    <g transform="translate(-108 -130)" onClick = {() => this.handleClick(true, false, false, false, false, false)}>
      <rect
        width={137}
        height={137}
        rx={23}
        transform="translate(108 130)"
        fill="#8b8600"
        strokeWidth = "3"
        style = {{
          stroke:  
            this.state.selectedWaiting ? "#4FD9B3" : "#8b8600"
        }}
      />
      <path
        d="M188.416 211.33a5.073 5.073 0 0 1-1.289-.167v16.685a2.744 2.744 0 0 0 .909.209 3.407 3.407 0 0 0 3.158-3.61V210.43a5.357 5.357 0 0 1-1.012.576 5.006 5.006 0 0 1-1.767.324zm17.1-32.114a5.8 5.8 0 0 0-5.528-4.039h-9.034a5.724 5.724 0 0 0-4.189 1.888c-.2.273-.418.533-.644.785a6.094 6.094 0 0 0-.346.682 8.657 8.657 0 0 1 5.383 5.525l5.85 18.1a6.294 6.294 0 0 1 .287 2.5 6.371 6.371 0 0 1-.446 1.85v16.686a3.487 3.487 0 1 0 6.973 0v-26.8l.991 3.067a3.447 3.447 0 0 0 6.552-2.145l-5.85-18.1zm-13.328-7.181a7.438 7.438 0 1 0-5.057-7.027 7.386 7.386 0 0 0 5.057 7.027zm-5.654 12.606a5.8 5.8 0 0 0-5.528-4.041h-9.034a5.724 5.724 0 0 0-4.19 1.888c-.2.273-.418.533-.644.785a5.693 5.693 0 0 0-.346.681 8.658 8.658 0 0 1 5.384 5.525l5.849 18.1a6.315 6.315 0 0 1-.159 4.348v16.69a3.487 3.487 0 1 0 6.974 0v-26.8l.991 3.068a3.45 3.45 0 0 0 3.275 2.4 3.41 3.41 0 0 0 1.066-.172 3.461 3.461 0 0 0 2.367-3 3.423 3.423 0 0 0-.157-1.368l-5.85-18.1zm-14.387 32.112a5.068 5.068 0 0 1-1.289-.167v16.686a2.747 2.747 0 0 0 .909.209 3.407 3.407 0 0 0 3.158-3.61v-14.017a5.311 5.311 0 0 1-1.011.575 5.01 5.01 0 0 1-1.767.325zm1.059-39.294a7.458 7.458 0 0 0 9.857-7.027 7.458 7.458 0 1 0-9.857 7.027zm-5.731 13.962a5.872 5.872 0 0 0-5.6-4.04h-9.15a5.871 5.871 0 0 0-5.6 4.04l-5.925 18.1a3.379 3.379 0 0 0-.159 1.368 3.493 3.493 0 0 0 6.8.777l1-3.068v26.8a3.531 3.531 0 0 0 7.063 0v-20.971h2.79v20.966a3.531 3.531 0 0 0 7.063 0v-26.8l1 3.068a3.494 3.494 0 0 0 6.8-.777 3.406 3.406 0 0 0-.159-1.368l-5.925-18.1zm-13.252-7.182a7.458 7.458 0 0 0 9.858-7.026 7.458 7.458 0 1 0-9.858 7.026z"
        fill="#fff"
      />
      <text
        data-name="Waiting in line/lining up"
        transform="translate(108 279)"
        fill="#707070"
        fontSize={13}
        fontFamily="HelveticaNeue, Helvetica Neue"
      >
        <tspan x={0} y={0}>
          {'Waiting in line/lining up'}
        </tspan>
      </text>
    </g>
    <g transform="translate(-108 -130)"  >
      <rect
        width={137}
        height={137}
        rx={23}
        transform="translate(288 130)"
        fill="#e37f4a"
        strokeWidth = "3"
        style = {{
          stroke:  
            this.state.selectedRoutines ? "#4FD9B3" : "#e37f4a"
        }}
      />
      <path
        d="M322.458 218.172h2.629v2.629h-2.629zm0 5.267h2.629v2.629h-2.629zm21.433-6.192c-1.42 1.42-3.865 1.942-5.45 2.134.33-2.107 1.035-5.276 2.217-7.053 1.5-2.253 4.7-3 6.6-3.242-.412 2.409-1.411 6.2-3.371 8.161zm4.873-10.909c-.293 0-7.318.055-10.3 4.534-2.226 3.334-2.821 9.553-2.849 9.81l-.128 1.438h1.445c.238 0 5.844-.037 8.821-3.013 3.655-3.655 4.3-11.028 4.323-11.339l.119-1.42zm5.523 7.886a4.206 4.206 0 0 1 2.748-2.684l12.97-3.893h7.5l12.924 3.874a4.293 4.293 0 0 1 2.784 2.7zm16.835-14.463h5.258v5.3l-5.258-.037zm0-36.83a2.629 2.629 0 1 1 5.258 0v34.191h-5.258V162.93zm23.842 53.931h1.154v-1.32a7.073 7.073 0 0 0-4.882-6.522l-12.219-3.664V162.93a5.258 5.258 0 1 0-10.515 0v42.482l-12.255 3.627a7.054 7.054 0 0 0-4.845 6.5v1.319h1.154l-2.473 20.884 2.61.311 2.5-21.2h1.383l-1.237 20.966 2.629.156 1.246-21.122h1.392v21.039h2.626v-21.031h1.319V237.9h2.62v-21.039h1.319V237.9h2.629v-21.039h1.319V237.9h2.629v-21.039h1.319V237.9h2.629v-21.039h1.319V237.9h2.629v-21.039h1.319V237.9h2.629v-21.039h1.392l1.246 21.122 2.629-.156-1.246-20.966h1.383l2.491 21.2 2.61-.311-2.455-20.884zm-55.405 14.462h9.205v2.629h-9.205zm-21.049 2.628a2.635 2.635 0 0 1 2.629-2.629h6.577a3.95 3.95 0 1 0 0-7.9v2.629a1.319 1.319 0 1 1 0 2.638h-6.577a5.258 5.258 0 1 0 0 10.515h26.306v-2.629h-26.3a2.625 2.625 0 0 1-2.638-2.629zm24.337-53.262a1.319 1.319 0 1 1-1.315 1.319 1.319 1.319 0 0 1 1.315-1.319zm0 5.258a3.948 3.948 0 1 0-3.948-3.948 3.954 3.954 0 0 0 3.948 3.947zm-11.184 4.607a2.629 2.629 0 1 1-2.629 2.629 2.635 2.635 0 0 1 2.629-2.629zm0 7.886a5.258 5.258 0 1 0-5.258-5.258 5.264 5.264 0 0 0 5.258 5.258zm-9.205 9.214a8.51 8.51 0 0 1 4.406 1.319 8.429 8.429 0 0 1-4.406 1.31 6.063 6.063 0 0 1-3.206-1.319 6.124 6.124 0 0 1 3.206-1.31zm0 5.258a11.358 11.358 0 0 0 7.5-3.013l.934-.934-.934-.934a11.364 11.364 0 0 0-7.5-3.013c-3.087 0-5.88 2.711-6.192 3.013l-.934.925.934.943c.311.3 3.105 3.013 6.192 3.013z"
        fill="#fff"
      />
      <text
        data-name="Classroom Routines"
        transform="translate(296 279)"
        fill="#707070"
        fontSize={13}
        fontFamily="HelveticaNeue, Helvetica Neue"
      >
        <tspan x={0} y={0}>
          {'Classroom Routines'}
        </tspan>
      </text>
    </g>
    <g transform="translate(-108 -126)" onClick = {() => this.handleClick(false, true, false, false, false, false)}>
      <rect
        width={137}
        height={137}
        rx={23}
        transform="translate(108 297)"
        fill="#457159"
        strokeWidth = "3"
        style = {{
          stroke:  
            this.state.selectedTraveling ? "#4FD9B3" : "#457159"
        }}
      />
      <path
        d="M190.29 362.529v12.859l11.857 27.13s3.617 5.627-2.211 7.436a5.521 5.521 0 0 1-5.627-3.014l-10.45-19.9s-2.412-5.828-4.22-3.818l-7.436 8.239s-2.01 4.22-2.01 15.876c0 0 .8 2.813-4.622 2.813 0 0-3.818.2-3.818-2.612v-10.647s.6-12.259 11.455-24.517v-3.618l-1.809-10.048s-2.211-2.613-3.617-.4c0 0 .4 3.014-5.828 6.23l-7.23 2.61s-4.019 1.407-4.622-.8c0 0-1.407-3.215.8-4.019l6.431-3.617s7.637-5.024 7.235-11.455c0 0 1.206-7.235 7.838-9.244a7.588 7.588 0 0 1 7.235-1l17.083 7.829s2.412 1.407 2.412 3.215v16.881s.4 3.215-1.809 3.215c0 0-3.818-1.206-3.818-2.412l-.2-12.862s-.4-1-3.215-2.813l-2.813-2.211s-3.215-2.211-2.612.8c-.006.206 5.621 8.646 5.621 13.874zM168.184 336.2a7.436 7.436 0 0 1 0-14.871 7.3 7.3 0 0 1 7.44 7.436 7.3 7.3 0 0 1-7.44 7.435z"
        fill="#fff"
      />
      <text
        data-name="Traveling outside classroom"
        transform="translate(177 446)"
        fill="#707070"
        fontSize={13}
        fontFamily="HelveticaNeue, Helvetica Neue"
      >
        <tspan x={-27.566} y={0}>
          {'Traveling '}
        </tspan>
        <tspan x={-55.022} y={15}>
          {'outside classroom'}
        </tspan>
      </text>
    </g>
    <g transform="translate(-108 -130)" onClick = {() => this.handleClick(false, false, false, true, false, false)}>
      <rect
        width={137}
        height={137}
        rx={23}
        transform="translate(288 301)"
        fill="#0087b9"
        strokeWidth = "3"
        style = {{
          stroke:  
            this.state.selectedBehavior ? "#4FD9B3" : "#00087b9"
        }}
      />
      <g
        data-name="Group 10"
        transform="translate(313.288 324.861)"
        fill="#fff"
      >
        <path
          data-name="Path 57"
          d="M62.686 46.34a60.682 60.682 0 0 0-8.524-5.88 25.636 25.636 0 0 1-17.317 6.851c-6.851 0-12.731-2.751-17.748-6.851-11.383 5.934-19.1 13.648-19.1 27.782h36.686l12.623-21.9h13.38z"
        />
        <ellipse
          data-name="Ellipse 4"
          cx={20.5}
          cy={20.931}
          rx={20.5}
          ry={20.931}
          transform="translate(15.914)"
        />
      </g>
      <path
        data-name="Path 58"
        d="M387.248 373.035h-23.467l-11.76 20.338 11.76 20.338h23.467l11.76-20.338z"
        fill="none"
        stroke="#fff"
        strokeMiterlimit={10}
        strokeWidth={3}
      />
      <text
        transform="translate(362.308 396.11)"
        fill="#fff"
        fontSize={10}
        fontFamily="ArialRoundedMTBold, Arial Rounded MT Bold"
      >
        <tspan x={0} y={0}>
          {'STOP'}
        </tspan>
      </text>
      <text
        data-name="Behavior Management Disruption"
        transform="translate(357 450)"
        fill="#707070"
        fontSize={13}
        fontFamily="HelveticaNeue, Helvetica Neue"
      >
        <tspan x={-65.618} y={0}>
          {'Behavior Management'}
        </tspan>
        <tspan x={-31.545} y={15}>
          {' Disruption'}
        </tspan>
      </text>
    </g>
    <g data-name="Waiting" transform="translate(-108 -130)"onClick = {() => this.handleClick(false, false, false, false, true, false)}>
      <rect
        data-name="Waiting_Rectangle"
        width={137}
        height={137}
        rx={23}
        transform="translate(108 479)"
        fill="#b25660"
        strokeWidth = "3"
        style = {{
          stroke:  
            this.state.selectedMaterials ? "#4FD9B3" : "b25660"
        }}
      />
      <g data-name="Child Waiting" fill="#fff">
        <path
          data-name="Path 48"
          d="M195.074 566.778a25.214 25.214 0 0 0-1.49-8.3c.609-.066 1.219-.148 1.828-.206l1.737-.329-.478-1.729a28.474 28.474 0 0 0-54.536-.313l-.321.955 1.268 1.268 2.347.206a25.1 25.1 0 0 0-1.556 8.646 6.242 6.242 0 0 0-4.438 5.7v.156c0 3.442 3.038 6.11 6.818 6.11h.527a25.625 25.625 0 0 0 45.387-.049 7.918 7.918 0 0 0 1.029.091c3.648 0 6.818-2.7 6.818-6.192a6.209 6.209 0 0 0-4.941-5.929zm-52.477 5.962a2.816 2.816 0 0 1 1.518-2.475 26.152 26.152 0 0 0 1.268 5.295 3.054 3.054 0 0 1-2.783-2.882zm26.794 16.164a21.92 21.92 0 0 1-21.886-21.928 21.467 21.467 0 0 1 1.647-8.317l5.92.552 3.006-4.941 2.223 4.6.478.823h.955c1.1 0 3.969.165 8.086.165 5.229 0 12.187-.206 19.812-.947a21.483 21.483 0 0 1 1.6 8.086 21.9 21.9 0 0 1-21.878 21.887zm24.143-13.175a25.526 25.526 0 0 0 1.35-5.583 2.973 2.973 0 0 1 1.943 2.618c0 1.573-1.416 2.758-3.294 2.907z"
        />
        <path
          data-name="Path 49"
          d="M157.896 571.34a2.882 2.882 0 1 0 5.764 0 2.882 2.882 0 0 0-5.764 0z"
        />
        <path
          data-name="Path 50"
          d="M183.735 568.853a2.83 2.83 0 1 0 1.449 2.47 2.841 2.841 0 0 0-1.449-2.47z"
        />
        <path data-name="Path 51" d="M186.107 508.398h1.317v22.348h-1.317z" />
        <path
          data-name="Path 52"
          d="M187.572 530.877h-1.589v-22.603h1.589zm-1.342-.247h1.087v-22.117h-1.084z"
        />
        <path data-name="Path 53" d="M185.629 529.642h15.324v1.34h-15.324z" />
        <path
          data-name="Path 54"
          d="M201.102 531.109h-15.6v-1.59h15.571v1.59zm-15.324-.255h15.077v-1.08h-15.077z"
        />
        <path
          data-name="Path 55"
          d="M186.288 557.342a27.017 27.017 0 1 1 26.959-27.013 27.017 27.017 0 0 1-26.959 27.013zm0-52.773a25.757 25.757 0 1 0 25.7 25.757 25.757 25.757 0 0 0-25.7-25.757z"
        />
        <path
          data-name="Path 56"
          d="M186.766 532.541a1.787 1.787 0 1 1 1.762-1.8 1.787 1.787 0 0 1-1.762 1.8zm0-2.339a.527.527 0 1 0 .527.527.527.527 0 0 0-.527-.527z"
        />
      </g>
      <text
        data-name="Children waiting on Teacher/materials"
        transform="translate(176 632)"
        fill="#707070"
        fontSize={13}
        fontFamily="HelveticaNeue, Helvetica Neue"
      >
        <tspan x={-57.661} y={0}>
          {'Children waiting on '}
        </tspan>
        <tspan x={-53.085} y={15}>
          {'Teacher/materials'}
        </tspan>
      </text>
    </g>
    <g transform="translate(-108 -130)">
      <rect
        width={137}
        height={137}
        rx={23}
        transform="translate(288 479)"
        fill="#9820ad"
        strokeWidth = "3"
        style = {{
          stroke:  
            this.state.selectedOther ? "#4FD9B3" : "9820ad"
        }}
      />
      <text
        data-name="Other"
        transform="translate(361 635)"
        fill="#707070"
        fontSize={13}
        fontFamily="HelveticaNeue, Helvetica Neue"
      >
        <tspan x={-16.257} y={0}>
          {'Other'}
        </tspan>
      </text>
      <path
        d="M371.875 544.346a4.6 4.6 0 1 0 2.294 3.981 4.582 4.582 0 0 0-2.294-3.981zm18.635-7.054a35.8 35.8 0 0 0-3.077-7.03 2.254 2.254 0 0 0-3.851-.242 2.338 2.338 0 0 0-.014 2.662 31.181 31.181 0 0 1 2.859 24.374 31.963 31.963 0 1 1-15.006-36.552 2.456 2.456 0 0 0 1.616.386 2.281 2.281 0 0 0 .677-4.324 35.786 35.786 0 0 0-25.97-3.829 36.464 36.464 0 1 0 44.3 39.151 35.884 35.884 0 0 0-1.534-14.596zm-36.989 7.054a4.589 4.589 0 1 0 4.589 0 4.6 4.6 0 0 0-4.589 0zm-13.753 0a4.589 4.589 0 1 0 4.589 0 4.6 4.6 0 0 0-4.586 0z"
        fill="#fff"
      />
    </g>
  </svg>
      )}
  render() {
    return(
        <div>
         {this.TransitionType(this.props)}
        </div>
    )}   
    }

  export default withStyles(styles) 
(TransitionTypeSel)

