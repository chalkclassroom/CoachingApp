import React from "react";
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom';
import AppBar from '../../components/AppBar';
import FirebaseContext from "../../components/Firebase/context";
import { withStyles } from '@material-ui/core/styles';
import Helmet from 'react-helmet';

const styles = {
    root: {
        flexGrow: 1,
        backgroundColor:'#ffffff',
        height: '100vh'
    },
    grow: {
        flexGrow: 1,
    }
};

class Team extends React.Component {

    teamCards = props => {
        return(
            <svg data-name="Layer 1" viewBox="150 200 1000 1000" {...props}>
            <title>{'Our Team'}</title>
            <g data-name="Our Team">
              <path fill="#a1c4fd" d="M0 0h1337.58v1108.5H0z" />
              <rect
                data-name="Rectangle 16"
                x={841.16}
                y={310.17}
                width={170.37}
                height={168.25}
                rx={19.11}
                fill="#fff"
              />
              <rect
                data-name="Rectangle 16-2"
                x={333.76}
                y={587.75}
                width={170.37}
                height={168.25}
                rx={19.11}
                fill="#fff"
              />
              <rect
                data-name="Rectangle 16-3"
                x={587.46}
                y={587.75}
                width={170.37}
                height={168.25}
                rx={19.11}
                fill="#fff"
              />
              <rect
                data-name="Rectangle 16-3"
                x={585.91}
                y={309.42}
                width={170.37}
                height={168.25}
                rx={19.11}
                fill="#fff"
              />
              <rect
                data-name="Rectangle 16-3"
                x={334.01}
                y={310.97}
                width={170.37}
                height={168.25}
                rx={19.11}
                fill="#fff"
              />
              <rect
                data-name="Rectangle 16-4"
                x={841.16}
                y={587.75}
                width={170.37}
                height={168.25}
                rx={19.11}
                fill="#fff"
              />
              <text
                transform="translate(613.47 263.46)"
                style={{
                  isolation: 'isolate',
                }}
                fontSize={26.537}
                fill="#fff"
                fontFamily="HelveticaNeue-Bold,Helvetica Neue"
                fontWeight={700}
                data-name="Our Team-2"
              >
                {'Our '}
                <tspan x={54.08} y={0} letterSpacing="-.111em">
                  {'T'}
                </tspan>
                <tspan x={67.35} y={0}>
                  {'eam'}
                </tspan>
              </text>
              <g data-name="Group 11">
                <path
                  data-name="Path 48"
                  d="M756.56 324.93v31.22l34.24-31.22z"
                  fill="#bfa069"
                />
                <path
                  data-name="Path 49"
                  d="M645.79 293.71h145v31.22h-145z"
                  fill="#e8c383"
                />
              </g>
              <g data-name="Group 13">
                <path
                  data-name="Path 48-2"
                  d="M758.21 608.88v31.22l34.24-31.22z"
                  fill="#bfa069"
                />
                <path
                  data-name="Path 49-2"
                  d="M647.43 577.66h145v31.22h-145z"
                  fill="#e8c383"
                />
              </g>
              <g data-name="Group 14">
                <path
                  data-name="Path 48-3"
                  d="M503.98 608.35v31.22l34.24-31.22z"
                  fill="#bfa069"
                />
                <path
                  data-name="Path 49-3"
                  d="M393.21 577.13h145v31.22h-145z"
                  fill="#e8c383"
                />
              </g>
              <g data-name="Group 15">
                <path
                  data-name="Path 48-4"
                  d="M504.51 324.93v31.22l34.24-31.22z"
                  fill="#bfa069"
                />
                <path
                  data-name="Path 49-4"
                  d="M393.74 293.71h145v31.22h-145z"
                  fill="#e8c383"
                />
              </g>
              <g data-name="Group 12">
                <path
                  data-name="Path 48-5"
                  d="M1012.44 324.93v31.22l34.23-31.22z"
                  fill="#bfa069"
                />
                <path
                  data-name="Path 49-5"
                  d="M901.66 293.71h145v31.22h-145z"
                  fill="#e8c383"
                />
              </g>
              <g data-name="Group 12-2">
                <path
                  data-name="Path 48-6"
                  d="M1012.44 608.88v31.22l34.23-31.22z"
                  fill="#bfa069"
                />
                <path
                  data-name="Path 49-6"
                  d="M901.66 577.66h145v31.22h-145z"
                  fill="#e8c383"
                />
              </g>
              <g data-name="Rectangle 17" opacity={0.376}>
                <path
                  d="M333.79 439.69h171.43v19.64a20.17 20.17 0 0 1-20.17 20.17H353.96a20.17 20.17 0 0 1-20.17-20.17v-19.64z"
                  fill="#646464"
                />
                <path
                  d="M334.32 439.96h170.37a.26.26 0 0 1 .26.26v19.11a19.9 19.9 0 0 1-19.9 19.9H353.96a19.9 19.9 0 0 1-19.91-19.9v-19.09a.27.27 0 0 1 .27-.28z"
                  fill="none"
                  stroke="#707070"
                />
              </g>
              <g data-name="Rectangle 17-2" opacity={0.376}>
                <path
                  d="M585.26 438.58h171.43v19.66a20.17 20.17 0 0 1-20.17 20.17H605.43a20.17 20.17 0 0 1-20.17-20.17v-19.66z"
                  fill="#646464"
                />
                <path
                  d="M585.79 438.85h170.37a.27.27 0 0 1 .27.26v19.13a19.9 19.9 0 0 1-19.91 19.9H605.43a19.9 19.9 0 0 1-19.9-19.9v-19.13a.26.26 0 0 1 .26-.26z"
                  fill="none"
                  stroke="#707070"
                />
              </g>
              <g data-name="Rectangle 17-3" opacity={0.376}>
                <path
                  d="M840.63 439.14h171.43v19.64a20.17 20.17 0 0 1-20.17 20.16h-131.1a20.17 20.17 0 0 1-20.16-20.16v-19.64z"
                  fill="#646464"
                />
                <path
                  d="M841.16 439.4h170.37a.27.27 0 0 1 .26.27v19.11a19.9 19.9 0 0 1-19.9 19.9h-131.1a19.9 19.9 0 0 1-19.9-19.9v-19.11a.27.27 0 0 1 .27-.27z"
                  fill="none"
                  stroke="#707070"
                />
              </g>
              <g data-name="Rectangle 17-5" opacity={0.376}>
                <path
                  d="M840.63 717.78h171.43v19.64a20.17 20.17 0 0 1-20.17 20.17h-131.1a20.17 20.17 0 0 1-20.16-20.17v-19.64z"
                  fill="#646464"
                />
                <path
                  d="M841.16 718.05h170.37a.26.26 0 0 1 .26.26v19.11a19.9 19.9 0 0 1-19.9 19.9h-131.1a19.9 19.9 0 0 1-19.9-19.9v-19.11a.26.26 0 0 1 .27-.26z"
                  fill="none"
                  stroke="#707070"
                />
              </g>
              <text
                transform="translate(369.35 464.11)"
                style={{
                  isolation: 'isolate',
                }}
                fontSize={10.615}
                fill="#fff"
                fontFamily="HelveticaNeue-Light,Helvetica Neue"
                fontWeight={300}
                data-name="Christopher Caroline"
              >
                {'Christophe'}
                <tspan x={49.93} y={0} letterSpacing="-.092em">
                  {'r'}
                </tspan>
                <tspan x={52.3} y={0} letterSpacing="0em">
                  {', Ca'}
                </tspan>
                <tspan x={71.18} y={0} letterSpacing="-.018em">
                  {'r'}
                </tspan>
                <tspan x={74.33} y={0}>
                  {'oline'}
                </tspan>
              </text>
              <text
                transform="translate(446.18 314.35)"
                style={{
                  isolation: 'isolate',
                }}
                fontSize={10.615}
                fill="#fff"
                fontFamily="HelveticaNeue-Light,Helvetica Neue"
                fontWeight={300}
                data-name="Christopher Caroline"
              >
                {'PRO '}
                <tspan x={24.58} y={0} letterSpacing="-.111em">
                  {'T'}
                </tspan>
                <tspan x={29.31} y={0}>
                  {'eam'}
                </tspan>
              </text>
              <text
                transform="translate(692.25 314.35)"
                style={{
                  isolation: 'isolate',
                }}
                fontSize={10.615}
                fill="#fff"
                fontFamily="HelveticaNeue-Light,Helvetica Neue"
                fontWeight={300}
                data-name="Christopher Caroline"
              >
                {'PRO '}
                <tspan x={24.58} y={0} letterSpacing="-.111em">
                  {'T'}
                </tspan>
                <tspan x={29.31} y={0}>
                  {'eam'}
                </tspan>
              </text>
              <text
                transform="translate(625.07 463)"
                style={{
                  isolation: 'isolate',
                }}
                fontSize={10.615}
                fill="#fff"
                fontFamily="HelveticaNeue-Light,Helvetica Neue"
                fontWeight={300}
                data-name="Christopher Caroline-2"
              >
                {'Christophe'}
                <tspan x={49.93} y={0} letterSpacing="-.092em">
                  {'r'}
                </tspan>
                <tspan x={52.3} y={0} letterSpacing="0em">
                  {', Ca'}
                </tspan>
                <tspan x={71.18} y={0} letterSpacing="-.018em">
                  {'r'}
                </tspan>
                <tspan x={74.33} y={0}>
                  {'oline'}
                </tspan>
              </text>
              <text
                transform="translate(884.68 463.55)"
                style={{
                  isolation: 'isolate',
                }}
                fontSize={10.615}
                fill="#fff"
                fontFamily="HelveticaNeue-Light,Helvetica Neue"
                fontWeight={300}
                data-name="Christopher Caroline-3"
              >
                {'Christophe'}
                <tspan x={49.93} y={0} letterSpacing="-.092em">
                  {'r'}
                </tspan>
                <tspan x={52.3} y={0}>
                  {', Ca'}
                </tspan>
                <tspan x={71.18} y={0} letterSpacing="-.018em">
                  {'r'}
                </tspan>
                <tspan x={74.33} y={0}>
                  {'oline'}
                </tspan>
              </text>
              <text
                transform="translate(882.03 741.13)"
                style={{
                  isolation: 'isolate',
                }}
                fontSize={10.615}
                fill="#fff"
                fontFamily="HelveticaNeue-Light,Helvetica Neue"
                fontWeight={300}
                data-name="Christopher Caroline-4"
              >
                {'Christophe'}
                <tspan x={49.93} y={0} letterSpacing="-.092em">
                  {'r'}
                </tspan>
                <tspan x={52.3} y={0}>
                  {', Ca'}
                </tspan>
                <tspan x={71.18} y={0} letterSpacing="-.018em">
                  {'r'}
                </tspan>
                <tspan x={74.33} y={0}>
                  {'oline'}
                </tspan>
              </text>
              <g data-name="Rectangle 17-5" opacity={0.376}>
                <path
                  d="M586.91 716.74h171.41v19.64a20.17 20.17 0 0 1-20.16 20.17H607.08a20.17 20.17 0 0 1-20.17-20.17v-19.64z"
                  fill="#646464"
                />
                <path
                  d="M587.44 717.01h170.37a.27.27 0 0 1 .27.26v19.11a19.9 19.9 0 0 1-19.9 19.9h-131.1a19.9 19.9 0 0 1-19.9-19.9v-19.14a.26.26 0 0 1 .26-.23z"
                  fill="none"
                  stroke="#707070"
                />
              </g>
              <text
                transform="translate(629.31 740.1)"
                style={{
                  isolation: 'isolate',
                }}
                fontSize={10.615}
                fill="#fff"
                fontFamily="HelveticaNeue-Light,Helvetica Neue"
                fontWeight={300}
                data-name="Christopher Caroline-4"
              >
                {'Christophe'}
                <tspan x={49.93} y={0} letterSpacing="-.092em">
                  {'r'}
                </tspan>
                <tspan x={52.3} y={0} letterSpacing="0em">
                  {', Ca'}
                </tspan>
                <tspan x={71.18} y={0} letterSpacing="-.018em">
                  {'r'}
                </tspan>
                <tspan x={74.33} y={0}>
                  {'oline'}
                </tspan>
              </text>
              <g data-name="Rectangle 17-5" opacity={0.376}>
                <path
                  d="M333.13 716.74h171.43v19.64a20.17 20.17 0 0 1-20.17 20.17H353.32a20.17 20.17 0 0 1-20.17-20.17v-19.64z"
                  fill="#646464"
                />
                <path
                  d="M333.66 717.01h170.37a.27.27 0 0 1 .27.26v19.11a19.91 19.91 0 0 1-19.91 19.86H353.32a19.91 19.91 0 0 1-19.91-19.9v-19.1a.27.27 0 0 1 .25-.23z"
                  fill="none"
                  stroke="#707070"
                />
              </g>
              <text
                transform="translate(374.53 740.1)"
                style={{
                  isolation: 'isolate',
                }}
                fontSize={10.615}
                fill="#fff"
                fontFamily="HelveticaNeue-Light,Helvetica Neue"
                fontWeight={300}
                data-name="Christopher Caroline-4"
              >
                {'Christophe'}
                <tspan x={49.93} y={0} letterSpacing="-.092em">
                  {'r'}
                </tspan>
                <tspan x={52.3} y={0} letterSpacing="0em">
                  {', Ca'}
                </tspan>
                <tspan x={71.18} y={0} letterSpacing="-.018em">
                  {'r'}
                </tspan>
                <tspan x={74.33} y={0}>
                  {'oline'}
                </tspan>
              </text>
              <g
                data-name="Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                style={{
                  isolation: 'isolate',
                }}
                fontSize={10.615}
                fill="#fff"
                fontFamily="HelveticaNeue-Light,Helvetica Neue"
                fontWeight={300}
              >
                <text
                  transform="translate(342.26 501.77)"
                  style={{
                    isolation: 'isolate',
                  }}
                >
                  {'Lo'}
                  <tspan x={11.6} y={0} letterSpacing="-.018em">
                    {'r'}
                  </tspan>
                  <tspan x={14.75} y={0}>
                    {'em ipsum dolor sit amet,'}
                  </tspan>
                </text>
                <text
                  transform="translate(342.26 514.51)"
                  style={{
                    isolation: 'isolate',
                  }}
                >
                  {'consectetur adipiscing elit, sed do'}
                </text>
                <text
                  transform="translate(342.26 527.24)"
                  style={{
                    isolation: 'isolate',
                  }}
                >
                  {'eiusmod tempor incididunt ut labo'}
                  <tspan x={155.89} y={0} letterSpacing="-.018em">
                    {'r'}
                  </tspan>
                  <tspan x={159.04} y={0} letterSpacing="0em">
                    {'e'}
                  </tspan>
                </text>
                <text
                  transform="translate(342.26 539.98)"
                  style={{
                    isolation: 'isolate',
                  }}
                >
                  {'et dolo'}
                  <tspan x={31.46} y={0} letterSpacing="-.018em">
                    {'r'}
                  </tspan>
                  <tspan x={34.61} y={0}>
                    {'e magna aliqua.'}
                  </tspan>
                </text>
              </g>
              <g
                data-name="Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 2"
                style={{
                  isolation: 'isolate',
                }}
                fontSize={10.615}
                fill="#fff"
                fontFamily="HelveticaNeue-Light,Helvetica Neue"
                fontWeight={300}
              >
                <text
                  transform="translate(590.12 501.77)"
                  style={{
                    isolation: 'isolate',
                  }}
                >
                  {'Lo'}
                  <tspan x={11.6} y={0} letterSpacing="-.018em">
                    {'r'}
                  </tspan>
                  <tspan x={14.75} y={0}>
                    {'em ipsum dolor sit amet,'}
                  </tspan>
                </text>
                <text
                  transform="translate(590.12 514.51)"
                  style={{
                    isolation: 'isolate',
                  }}
                >
                  {'consectetur adipiscing elit, sed do'}
                </text>
                <text
                  transform="translate(590.12 527.24)"
                  style={{
                    isolation: 'isolate',
                  }}
                >
                  {'eiusmod tempor incididunt ut labo'}
                  <tspan x={155.89} y={0} letterSpacing="-.018em">
                    {'r'}
                  </tspan>
                  <tspan x={159.04} y={0} letterSpacing="0em">
                    {'e'}
                  </tspan>
                </text>
                <text
                  transform="translate(590.12 539.98)"
                  style={{
                    isolation: 'isolate',
                  }}
                >
                  {'et dolo'}
                  <tspan x={31.46} y={0} letterSpacing="-.018em">
                    {'r'}
                  </tspan>
                  <tspan x={34.61} y={0}>
                    {'e magna aliqua.'}
                  </tspan>
                </text>
              </g>
              <g
                data-name="Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 3"
                style={{
                  isolation: 'isolate',
                }}
                fontSize={10.615}
                fill="#fff"
                fontFamily="HelveticaNeue-Light,Helvetica Neue"
                fontWeight={300}
              >
                <text
                  transform="translate(848.59 501.77)"
                  style={{
                    isolation: 'isolate',
                  }}
                >
                  {'Lo'}
                  <tspan x={11.6} y={0} letterSpacing="-.018em">
                    {'r'}
                  </tspan>
                  <tspan x={14.75} y={0}>
                    {'em ipsum dolor sit amet,'}
                  </tspan>
                </text>
                <text
                  transform="translate(848.59 514.51)"
                  style={{
                    isolation: 'isolate',
                  }}
                >
                  {'consectetur adipiscing elit, sed do'}
                </text>
                <text
                  transform="translate(848.59 527.24)"
                  style={{
                    isolation: 'isolate',
                  }}
                >
                  {'eiusmod tempor incididunt ut labo'}
                  <tspan x={155.89} y={0} letterSpacing="-.018em">
                    {'r'}
                  </tspan>
                  <tspan x={159.04} y={0}>
                    {'e'}
                  </tspan>
                </text>
                <text
                  transform="translate(848.59 539.98)"
                  style={{
                    isolation: 'isolate',
                  }}
                >
                  {'et dolo'}
                  <tspan x={31.46} y={0} letterSpacing="-.018em">
                    {'r'}
                  </tspan>
                  <tspan x={34.61} y={0}>
                    {'e magna aliqua.'}
                  </tspan>
                </text>
              </g>
              <g
                data-name="Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 4"
                style={{
                  isolation: 'isolate',
                }}
                fontSize={10.615}
                fill="#fff"
                fontFamily="HelveticaNeue-Light,Helvetica Neue"
                fontWeight={300}
              >
                <text
                  transform="translate(848.59 775.1)"
                  style={{
                    isolation: 'isolate',
                  }}
                >
                  {'Lo'}
                  <tspan x={11.6} y={0} letterSpacing="-.018em">
                    {'r'}
                  </tspan>
                  <tspan x={14.75} y={0}>
                    {'em ipsum dolor sit amet,'}
                  </tspan>
                </text>
                <text
                  transform="translate(848.59 787.84)"
                  style={{
                    isolation: 'isolate',
                  }}
                >
                  {'consectetur adipiscing elit, sed do'}
                </text>
                <text
                  transform="translate(848.59 800.58)"
                  style={{
                    isolation: 'isolate',
                  }}
                >
                  {'eiusmod tempor incididunt ut labo'}
                  <tspan x={155.89} y={0} letterSpacing="-.018em">
                    {'r'}
                  </tspan>
                  <tspan x={159.04} y={0}>
                    {'e'}
                  </tspan>
                </text>
                <text
                  transform="translate(848.59 813.32)"
                  style={{
                    isolation: 'isolate',
                  }}
                >
                  {'et dolo'}
                  <tspan x={31.46} y={0} letterSpacing="-.018em">
                    {'r'}
                  </tspan>
                  <tspan x={34.61} y={0}>
                    {'e magna aliqua.'}
                  </tspan>
                </text>
              </g>
              <g
                data-name="Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 5"
                style={{
                  isolation: 'isolate',
                }}
                fontSize={10.615}
                fill="#fff"
                fontFamily="HelveticaNeue-Light,Helvetica Neue"
                fontWeight={300}
              >
                <text
                  transform="translate(590.12 779.35)"
                  style={{
                    isolation: 'isolate',
                  }}
                >
                  {'Lo'}
                  <tspan x={11.6} y={0} letterSpacing="-.018em">
                    {'r'}
                  </tspan>
                  <tspan x={14.75} y={0}>
                    {'em ipsum dolor sit amet,'}
                  </tspan>
                </text>
                <text
                  transform="translate(590.12 792.09)"
                  style={{
                    isolation: 'isolate',
                  }}
                >
                  {'consectetur adipiscing elit, sed do'}
                </text>
                <text
                  transform="translate(590.12 804.82)"
                  style={{
                    isolation: 'isolate',
                  }}
                >
                  {'eiusmod tempor incididunt ut labo'}
                  <tspan x={155.89} y={0} letterSpacing="-.018em">
                    {'r'}
                  </tspan>
                  <tspan x={159.04} y={0} letterSpacing="0em">
                    {'e'}
                  </tspan>
                </text>
                <text
                  transform="translate(590.12 817.56)"
                  style={{
                    isolation: 'isolate',
                  }}
                >
                  {'et dolo'}
                  <tspan x={31.46} y={0} letterSpacing="-.018em">
                    {'r'}
                  </tspan>
                  <tspan x={34.61} y={0}>
                    {'e magna aliqua.'}
                  </tspan>
                </text>
              </g>
              <g
                data-name="Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 6"
                style={{
                  isolation: 'isolate',
                }}
                fontSize={10.615}
                fill="#fff"
                fontFamily="HelveticaNeue-Light,Helvetica Neue"
                fontWeight={300}
              >
                <text
                  transform="translate(342.26 779.35)"
                  style={{
                    isolation: 'isolate',
                  }}
                >
                  {'Lo'}
                  <tspan x={11.6} y={0} letterSpacing="-.018em">
                    {'r'}
                  </tspan>
                  <tspan x={14.75} y={0}>
                    {'em ipsum dolor sit amet,'}
                  </tspan>
                </text>
                <text
                  transform="translate(342.26 792.09)"
                  style={{
                    isolation: 'isolate',
                  }}
                >
                  {'consectetur adipiscing elit, sed do'}
                </text>
                <text
                  transform="translate(342.26 804.82)"
                  style={{
                    isolation: 'isolate',
                  }}
                >
                  {'eiusmod tempor incididunt ut labo'}
                  <tspan x={155.89} y={0} letterSpacing="-.018em">
                    {'r'}
                  </tspan>
                  <tspan x={159.04} y={0} letterSpacing="0em">
                    {'e'}
                  </tspan>
                </text>
                <text
                  transform="translate(342.26 817.56)"
                  style={{
                    isolation: 'isolate',
                  }}
                >
                  {'et dolo'}
                  <tspan x={31.46} y={0} letterSpacing="-.018em">
                    {'r'}
                  </tspan>
                  <tspan x={34.61} y={0}>
                    {'e magna aliqua.'}
                  </tspan>
                </text>
              </g>
            </g>
          </svg>)
    }

    render() {
        const {classes} = this.props;
        return ( 
            <div>
            <Helmet>
            <style>{'body { background-color: #A1C4FD;}'}</style>
          </Helmet>  
            <div className={classes.root}>
              <Helmet>
                <style>{'body { background-color: #A1C4FD;}'}</style>
              </Helmet>  
                        <FirebaseContext.Consumer>
                            {
                                firebase => <AppBar firebase={firebase}/>
                            }
                        </FirebaseContext.Consumer>
                        {this.teamCards(this.props)}
            </div>
            </div>
        );
    }
}
Team.propTypes = {
    classes: PropTypes.object.isRequired
  };

const TeamwRouter = withRouter(Team)
export default withStyles(styles)(TeamwRouter);
