import React from "react";
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom';
import AppBar from '../../components/AppBar';
import FirebaseContext from "../../components/Firebase/FirebaseContext";
import { withStyles } from '@material-ui/core/styles';
import Helmet from 'react-helmet';
import PlaceholderIcon from "../../assets/icons/KeanuReeves.jpg"

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
     <svg viewBox="150 50 1500 2300"{...props}>
      <defs>
        <pattern
          id="prefix__a"
          preserveAspectRatio="xMidYMid slice"
          width="100%"
          height="100%"
          viewBox="0 0 220 292"
        >
          <image width={220} height={292} xlinkHref={PlaceholderIcon} />
        </pattern>
      </defs>
      <g data-name="Our Team" transform="translate(90 -56.693)">
        <path
          data-name="Rectangle 22"
          fill="#a1c4fd"
          d="M-90 56.693h1810v2014H-90z"
        />
        <path
          data-name="8b65615a490dfc96026906837e8b0a15"
          d="M25.307 0h175.039a25.307 25.307 0 0 1 25.307 25.307v172.227a25.307 25.307 0 0 1-25.307 25.307H25.307A25.307 25.307 0 0 1 0 197.534V25.307A25.307 25.307 0 0 1 25.307 0z"
          transform="translate(361.534 450.336)"
          fill="url(#prefix__a)"
        />
        <rect
          data-name="8b65615a490dfc96026906837e8b0a15"
          width={225.653}
          height={222.841}
          rx={36}
          transform="translate(1002.233 449.501)"
          fill="url(#prefix__a)"
        />
        <rect
          data-name="8b65615a490dfc96026906837e8b0a15"
          width={225.653}
          height={222.841}
          rx={36}
          transform="translate(336.83 929.281)"
          fill="url(#prefix__a)"
        />
        <rect
          data-name="8b65615a490dfc96026906837e8b0a15"
          width={225.653}
          height={222.841}
          rx={36}
          transform="translate(977.076 934.289)"
          fill="url(#prefix__a)"
        />
        <rect
          data-name="8b65615a490dfc96026906837e8b0a15"
          width={225.653}
          height={222.841}
          rx={36}
          transform="translate(163.392 1429.289)"
          fill="url(#prefix__a)"
        />
        <rect
          data-name="8b65615a490dfc96026906837e8b0a15"
          width={225.653}
          height={222.841}
          rx={36}
          transform="translate(306.392 1796.289)"
          fill="url(#prefix__a)"
        />
        <rect
          data-name="8b65615a490dfc96026906837e8b0a15"
          width={225.653}
          height={222.841}
          rx={36}
          transform="translate(494.315 1422.435)"
          fill="url(#prefix__a)"
        />
        <rect
          data-name="8b65615a490dfc96026906837e8b0a15"
          width={225.653}
          height={222.841}
          rx={36}
          transform="translate(637.315 1789.435)"
          fill="url(#prefix__a)"
        />
        <rect
          data-name="8b65615a490dfc96026906837e8b0a15"
          width={225.653}
          height={222.841}
          rx={36}
          transform="translate(809.378 1427.443)"
          fill="url(#prefix__a)"
        />
        <rect
          data-name="8b65615a490dfc96026906837e8b0a15"
          width={225.653}
          height={222.841}
          rx={36}
          transform="translate(952.378 1794.443)"
          fill="url(#prefix__a)"
        />
        <rect
          data-name="8b65615a490dfc96026906837e8b0a15"
          width={225.653}
          height={222.841}
          rx={36}
          transform="translate(1110.378 1422.443)"
          fill="url(#prefix__a)"
        />
        <text
          data-name="Our Team"
          transform="translate(722.816 339.449)"
          fill="#fff"
          fontSize={34}
          fontFamily="HelveticaNeue-Bold, Helvetica Neue"
          fontWeight={700}
        >
          <tspan x={0} y={0}>
            {'Our Team'}
          </tspan>
        </text>
        <text
          transform="translate(709.193 1389.923)"
          fill="#fff"
          fontSize={34}
          fontFamily="HelveticaNeue-Bold, Helvetica Neue"
          fontWeight={700}
        >
          <tspan x={0} y={0}>
            {'Advisors'}
          </tspan>
        </text>
        <g data-name="Group 11">
          <path
            data-name="Path 48"
            d="M1227.553 470.726v41.348l45.349-41.348z"
            fill="#bfa069"
          />
          <path
            data-name="Path 49"
            d="M1080.834 429.378h192.068v41.348h-192.068z"
            fill="#e8c383"
          />
        </g>
        <g data-name="Group 14">
          <path
            data-name="Path 48"
            d="M562.282 956.569v41.348l45.349-41.348z"
            fill="#bfa069"
          />
          <path
            data-name="Path 49"
            d="M415.563 915.221h192.068v41.348H415.563z"
            fill="#e8c383"
          />
        </g>
        <g data-name="Group 19">
          <path
            data-name="Path 48"
            d="M1202.528 961.578v41.348l45.349-41.348z"
            fill="#bfa069"
          />
          <path
            data-name="Path 49"
            d="M1055.809 920.23h192.068v41.348h-192.068z"
            fill="#e8c383"
          />
        </g>
        <g data-name="Group 16">
          <path
            data-name="Path 48"
            d="M387.175 1449.899v41.348l45.349-41.348z"
            fill="#bfa069"
          />
          <path
            data-name="Path 49"
            d="M240.456 1408.551h192.068v41.348H240.456z"
            fill="#e8c383"
          />
        </g>
        <g data-name="Group 21">
          <path
            data-name="Path 48"
            d="M530.175 1816.899v41.348l45.349-41.348z"
            fill="#bfa069"
          />
          <path
            data-name="Path 49"
            d="M383.456 1775.551h192.068v41.348H383.456z"
            fill="#e8c383"
          />
        </g>
        <g data-name="Group 17">
          <path
            data-name="Path 48"
            d="M719.767 1449.723v41.348l45.349-41.348z"
            fill="#bfa069"
          />
          <path
            data-name="Path 49"
            d="M573.048 1408.375h192.068v41.348H573.048z"
            fill="#e8c383"
          />
        </g>
        <g data-name="Group 22">
          <path
            data-name="Path 48"
            d="M862.767 1816.723v41.348l45.349-41.348z"
            fill="#bfa069"
          />
          <path
            data-name="Path 49"
            d="M716.048 1775.375h192.068v41.348H716.048z"
            fill="#e8c383"
          />
        </g>
        <g data-name="Group 18">
          <path
            data-name="Path 48"
            d="M1034.829 1454.732v41.348l45.349-41.348z"
            fill="#bfa069"
          />
          <path
            data-name="Path 49"
            d="M888.11 1413.384h192.068v41.348H888.11z"
            fill="#e8c383"
          />
        </g>
        <g data-name="Group 23">
          <path
            data-name="Path 48"
            d="M1177.829 1821.732v41.348l45.349-41.348z"
            fill="#bfa069"
          />
          <path
            data-name="Path 49"
            d="M1031.11 1780.384h192.068v41.348H1031.11z"
            fill="#e8c383"
          />
        </g>
        <g data-name="Group 20">
          <path
            data-name="Path 48"
            d="M1335.829 1449.732v41.348l45.349-41.348z"
            fill="#bfa069"
          />
          <path
            data-name="Path 49"
            d="M1189.11 1408.384h192.068v41.348H1189.11z"
            fill="#e8c383"
          />
        </g>
        <g data-name="Group 15">
          <path
            data-name="Path 48"
            d="M587.688 469.892v41.348l45.349-41.348z"
            fill="#bfa069"
          />
          <path
            data-name="Path 49"
            d="M440.969 428.544h192.068v41.348H440.969z"
            fill="#e8c383"
          />
        </g>
        <g
          data-name="Rectangle 17"
          fill="#646464"
          stroke="#707070"
          opacity={0.376}
        >
          <path
            d="M360.831 621.157H587.89v14.723a38 38 0 0 1-38 38H398.831a38 38 0 0 1-38-38v-14.723z"
            stroke="none"
          />
          <path
            d="M361.831 621.657H586.89a.5.5 0 0 1 .5.5v13.723a37.5 37.5 0 0 1-37.5 37.5H398.831a37.5 37.5 0 0 1-37.5-37.5v-13.723a.5.5 0 0 1 .5-.5z"
            fill="none"
          />
        </g>
        <g
          data-name="Rectangle 17"
          fill="#646464"
          stroke="#707070"
          opacity={0.376}
        >
          <path
            d="M1002.365 620.322h227.059v14.723a38 38 0 0 1-38 38h-151.059a38 38 0 0 1-38-38v-14.723z"
            stroke="none"
          />
          <path
            d="M1003.365 620.822h225.059a.5.5 0 0 1 .5.5v13.723a37.5 37.5 0 0 1-37.5 37.5h-151.059a37.5 37.5 0 0 1-37.5-37.5v-13.723a.5.5 0 0 1 .5-.5z"
            fill="none"
          />
        </g>
        <g
          data-name="Rectangle 18"
          fill="#646464"
          stroke="#707070"
          opacity={0.376}
        >
          <path
            d="M336.83 1099.97h227.059v14.723a38 38 0 0 1-38 38H374.83a38 38 0 0 1-38-38v-14.723z"
            stroke="none"
          />
          <path
            d="M337.83 1100.47h225.059a.5.5 0 0 1 .5.5v13.723a37.5 37.5 0 0 1-37.5 37.5H374.83a37.5 37.5 0 0 1-37.5-37.5v-13.723a.5.5 0 0 1 .5-.5z"
            fill="none"
          />
        </g>
        <g
          data-name="Rectangle 23"
          fill="#646464"
          stroke="#707070"
          opacity={0.376}
        >
          <path
            d="M977.076 1104.979h227.059v14.723a38 38 0 0 1-38 38h-151.059a38 38 0 0 1-38-38v-14.723z"
            stroke="none"
          />
          <path
            d="M978.076 1105.479h225.059a.5.5 0 0 1 .5.5v13.723a37.5 37.5 0 0 1-37.5 37.5h-151.059a37.5 37.5 0 0 1-37.5-37.5v-13.723a.5.5 0 0 1 .5-.5z"
            fill="none"
          />
        </g>
        <g
          data-name="Rectangle 19"
          fill="#646464"
          stroke="#707070"
          opacity={0.376}
        >
          <path
            d="M163.392 1600.813h227.059v14.723a38 38 0 0 1-38 38H201.392a38 38 0 0 1-38-38v-14.723z"
            stroke="none"
          />
          <path
            d="M164.392 1601.313h225.059a.5.5 0 0 1 .5.5v13.723a37.5 37.5 0 0 1-37.5 37.5H201.392a37.5 37.5 0 0 1-37.5-37.5v-13.723a.5.5 0 0 1 .5-.5z"
            fill="none"
          />
        </g>
        <g
          data-name="Rectangle 24"
          fill="#646464"
          stroke="#707070"
          opacity={0.376}
        >
          <path
            d="M306.392 1967.813h227.059v14.723a38 38 0 0 1-38 38H344.392a38 38 0 0 1-38-38v-14.723z"
            stroke="none"
          />
          <path
            d="M307.392 1968.313h225.059a.5.5 0 0 1 .5.5v13.723a37.5 37.5 0 0 1-37.5 37.5H344.392a37.5 37.5 0 0 1-37.5-37.5v-13.723a.5.5 0 0 1 .5-.5z"
            fill="none"
          />
        </g>
        <g
          data-name="Rectangle 20"
          fill="#646464"
          stroke="#707070"
          opacity={0.376}
        >
          <path
            d="M494.315 1592.29h227.059v14.723a38 38 0 0 1-38 38H532.315a38 38 0 0 1-38-38v-14.723z"
            stroke="none"
          />
          <path
            d="M495.315 1592.79h225.059a.5.5 0 0 1 .5.5v13.723a37.5 37.5 0 0 1-37.5 37.5H532.315a37.5 37.5 0 0 1-37.5-37.5v-13.723a.5.5 0 0 1 .5-.5z"
            fill="none"
          />
        </g>
        <g
          data-name="Rectangle 25"
          fill="#646464"
          stroke="#707070"
          opacity={0.376}
        >
          <path
            d="M637.315 1959.29h227.059v14.723a38 38 0 0 1-38 38H675.315a38 38 0 0 1-38-38v-14.723z"
            stroke="none"
          />
          <path
            d="M638.315 1959.79h225.059a.5.5 0 0 1 .5.5v13.723a37.5 37.5 0 0 1-37.5 37.5H675.315a37.5 37.5 0 0 1-37.5-37.5v-13.723a.5.5 0 0 1 .5-.5z"
            fill="none"
          />
        </g>
        <g
          data-name="Rectangle 21"
          fill="#646464"
          stroke="#707070"
          opacity={0.376}
        >
          <path
            d="M807.972 1597.562h227.059v14.723a38 38 0 0 1-38 38H845.972a38 38 0 0 1-38-38v-14.723z"
            stroke="none"
          />
          <path
            d="M808.972 1598.062h225.059a.5.5 0 0 1 .5.5v13.723a37.5 37.5 0 0 1-37.5 37.5H845.972a37.5 37.5 0 0 1-37.5-37.5v-13.723a.5.5 0 0 1 .5-.5z"
            fill="none"
          />
        </g>
        <g
          data-name="Rectangle 27"
          fill="#646464"
          stroke="#707070"
          opacity={0.376}
        >
          <path
            d="M1109.972 1593.562h227.059v14.723a38 38 0 0 1-38 38h-151.059a38 38 0 0 1-38-38v-14.723z"
            stroke="none"
          />
          <path
            d="M1110.972 1594.062h225.059a.5.5 0 0 1 .5.5v13.723a37.5 37.5 0 0 1-37.5 37.5h-151.059a37.5 37.5 0 0 1-37.5-37.5v-13.723a.5.5 0 0 1 .5-.5z"
            fill="none"
          />
        </g>
        <g
          data-name="Rectangle 26"
          fill="#646464"
          stroke="#707070"
          opacity={0.376}
        >
          <path
            d="M950.972 1964.562h227.059v14.723a38 38 0 0 1-38 38H988.972a38 38 0 0 1-38-38v-14.723z"
            stroke="none"
          />
          <path
            d="M951.972 1965.062h225.059a.5.5 0 0 1 .5.5v13.723a37.5 37.5 0 0 1-37.5 37.5H988.972a37.5 37.5 0 0 1-37.5-37.5v-13.723a.5.5 0 0 1 .5-.5z"
            fill="none"
          />
        </g>
        <text
          data-name="Caroline Christopher, PhD"
          transform="translate(400.417 651.303)"
          fill="#fff"
          fontSize={12}
          fontFamily="HelveticaNeue-Light, Helvetica Neue"
          fontWeight={300}
        >
          <tspan x={0} y={0}>
            {'Caroline Christopher, PhD'}
          </tspan>
        </text>
        <text
          data-name="[Role]"
          transform="translate(517.593 454.603)"
          fill="#fff"
          fontSize={12}
          fontFamily="HelveticaNeue-Light, Helvetica Neue"
          fontWeight={300}
        >
          <tspan x={0} y={0}>
            {'[Role]'}
          </tspan>
        </text>
        <text
          data-name="[Role]"
          transform="translate(492.889 937.766)"
          fill="#fff"
          fontSize={12}
          fontFamily="HelveticaNeue-Light, Helvetica Neue"
          fontWeight={300}
        >
          <tspan x={0} y={0}>
            {'[Role]'}
          </tspan>
        </text>
        <text
          data-name="[Role]"
          transform="translate(1133.136 942.774)"
          fill="#fff"
          fontSize={12}
          fontFamily="HelveticaNeue-Light, Helvetica Neue"
          fontWeight={300}
        >
          <tspan x={0} y={0}>
            {'[Role]'}
          </tspan>
        </text>
        <text
          data-name="[Role]"
          transform="translate(320.286 1433.6)"
          fill="#fff"
          fontSize={12}
          fontFamily="HelveticaNeue-Light, Helvetica Neue"
          fontWeight={300}
        >
          <tspan x={0} y={0}>
            {'[Role]'}
          </tspan>
        </text>
        <text
          data-name="CQ-REF Pilot Study Independent Evaluator"
          transform="translate(386.286 1800.6)"
          fill="#fff"
          fontSize={10}
          fontFamily="HelveticaNeue-Light, Helvetica Neue"
          fontWeight={300}
        >
          <tspan x={0} y={0}>
            {'CQ-REF Pilot Study Independent Evaluator'}
          </tspan>
        </text>
        <text
          data-name="[Role]"
          transform="translate(650.374 1430.92)"
          fill="#fff"
          fontSize={12}
          fontFamily="HelveticaNeue-Light, Helvetica Neue"
          fontWeight={300}
        >
          <tspan x={0} y={0}>
            {'[Role]'}
          </tspan>
        </text>
        <text
          data-name="CQ-REF Advisory Board Member"
          transform="translate(720.374 1797.92)"
          fill="#fff"
          fontSize={12}
          fontFamily="HelveticaNeue-Light, Helvetica Neue"
          fontWeight={300}
        >
          <tspan x={0} y={0}>
            {'CQ-REF Advisory Board Member'}
          </tspan>
        </text>
        <text
          data-name="Director of CQ-REF Pilot Study"
          transform="translate(904.437 1437.928)"
          fill="#fff"
          fontSize={12}
          fontFamily="HelveticaNeue-Light, Helvetica Neue"
          fontWeight={300}
        >
          <tspan x={0} y={0}>
            {'Director of CQ-REF Pilot Study'}
          </tspan>
        </text>
        <text
          data-name="Early Childhood Content Expert"
          transform="translate(1047.437 1804.928)"
          fill="#fff"
          fontSize={12}
          fontFamily="HelveticaNeue-Light, Helvetica Neue"
          fontWeight={300}
        >
          <tspan x={0} y={0}>
            {'Early Childhood Content Expert'}
          </tspan>
        </text>
        <text
          data-name="CQ-REF Advisory Board Member"
          transform="translate(1199.437 1431.928)"
          fill="#fff"
          fontSize={12}
          fontFamily="HelveticaNeue-Light, Helvetica Neue"
          fontWeight={300}
        >
          <tspan x={0} y={0}>
            {'CQ-REF Advisory Board Member'}
          </tspan>
        </text>
        <text
          data-name="[Role]"
          transform="translate(1158.995 453.768)"
          fill="#fff"
          fontSize={12}
          fontFamily="HelveticaNeue-Light, Helvetica Neue"
          fontWeight={300}
        >
          <tspan x={0} y={0}>
            {'[Role]'}
          </tspan>
        </text>
        <text
          data-name="Deanna Meador, M.A."
          transform="translate(1069.015 648.491)"
          fill="#fff"
          fontSize={12}
          fontFamily="HelveticaNeue-Light, Helvetica Neue"
          fontWeight={300}
        >
          <tspan x={0} y={0}>
            {'Deanna Meador, M.A.'}
          </tspan>
        </text>
        <text
          data-name="Clare Speer"
          transform="translate(411.345 1131.082)"
          fill="#fff"
          fontSize={12}
          fontFamily="HelveticaNeue-Light, Helvetica Neue"
          fontWeight={300}
        >
          <tspan x={0} y={0}>
            {'Clare Speer'}
          </tspan>
        </text>
        <text
          data-name="Katherine Newman, PhD"
          transform="translate(1019.871 1136.091)"
          fill="#fff"
          fontSize={12}
          fontFamily="HelveticaNeue-Light, Helvetica Neue"
          fontWeight={300}
        >
          <tspan x={0} y={0}>
            {'Katherine Newman, PhD'}
          </tspan>
        </text>
        <text
          data-name="Jules White"
          transform="translate(237.072 1630.256)"
          fill="#fff"
          fontSize={12}
          fontFamily="HelveticaNeue-Light, Helvetica Neue"
          fontWeight={300}
        >
          <tspan x={0} y={0}>
            {'Jules White'}
          </tspan>
        </text>
        <text
          data-name="Sandra Jo Wilson, Ph.D"
          transform="translate(380.072 1997.256)"
          fill="#fff"
          fontSize={12}
          fontFamily="HelveticaNeue-Light, Helvetica Neue"
          fontWeight={300}
        >
          <tspan x={0} y={0}>
            {'Sandra Jo Wilson, Ph.D'}
          </tspan>
        </text>
        <text
          data-name="Doug Schmidt"
          transform="translate(568.83 1624.237)"
          fill="#fff"
          fontSize={12}
          fontFamily="HelveticaNeue-Light, Helvetica Neue"
          fontWeight={300}
        >
          <tspan x={0} y={0}>
            {'Doug Schmidt'}
          </tspan>
        </text>
        <text
          data-name="Lisa Wiltshire, M.S"
          transform="translate(711.83 1991.237)"
          fill="#fff"
          fontSize={12}
          fontFamily="HelveticaNeue-Light, Helvetica Neue"
          fontWeight={300}
        >
          <tspan x={0} y={0}>
            {'Lisa Wiltshire, M.S'}
          </tspan>
        </text>
        <text
          data-name="Mary Fuhs, Ph.D"
          transform="translate(883.893 1629.245)"
          fill="#fff"
          fontSize={12}
          fontFamily="HelveticaNeue-Light, Helvetica Neue"
          fontWeight={300}
        >
          <tspan x={0} y={0}>
            {'Mary Fuhs, Ph.D'}
          </tspan>
        </text>
        <text
          data-name="Dale Farran, Ph.D"
          transform="translate(1026.893 1996.245)"
          fill="#fff"
          fontSize={12}
          fontFamily="HelveticaNeue-Light, Helvetica Neue"
          fontWeight={300}
        >
          <tspan x={0} y={0}>
            {'Dale Farran, Ph.D'}
          </tspan>
        </text>
        <text
          data-name="Laura Moore, M.P.P"
          transform="translate(1184.893 1624.245)"
          fill="#fff"
          fontSize={12}
          fontFamily="HelveticaNeue-Light, Helvetica Neue"
          fontWeight={300}
        >
          <tspan x={0} y={0}>
            {'Laura Moore, M.P.P'}
          </tspan>
        </text>
        <text
          data-name="Dr. Christopher is the Principal Investigator on the project. In 2018, she received a grant from the National Science Foundation (DRK-12-1813008) to develop a web-based coaching tool that guides coaches and instructional leaders to collect objective obser"
          transform="translate(180.791 701.603)"
          fill="#fff"
          fontSize={20}
          fontFamily="HelveticaNeue-Light, Helvetica Neue"
          fontWeight={300}
        >
          <tspan x={0} y={19}>
            {
              'Dr. Christopher is the Principal Investigator on the project. In 2018, '
            }
          </tspan>
          <tspan x={0} y={43}>
            {'she received a grant from the National Science Foundation '}
          </tspan>
          <tspan x={0} y={67}>
            {'(DRK-12-1813008) to develop a web-based coaching tool that '}
          </tspan>
          <tspan x={0} y={91}>
            {'guides coaches and instructional leaders to collect objective '}
          </tspan>
          <tspan x={0} y={115}>
            {
              'observation data and then links those data with coaching practices. '
            }
          </tspan>
          <tspan x={0} y={139}>
            {'Her current and previous research experience has included working '}
          </tspan>
          <tspan x={0} y={163}>
            {'collaboratively with community partners to implement data-driven'}
          </tspan>
        </text>
        <text
          data-name="Ms. Speer is a Senior Research Specialist on this project. She contributes significantly to both the research team and to the engineering team with her background in statistics and programming. This combination of skills allows her to understand the lang"
          transform="translate(184.469 1181.015)"
          fill="#fff"
          fontSize={20}
          fontFamily="HelveticaNeue-Light, Helvetica Neue"
          fontWeight={300}
        >
          <tspan x={0} y={19}>
            {'Ms. Speer is a Senior Research Specialist on this project. She '}
          </tspan>
          <tspan x={0} y={43}>
            {'contributes significantly to both the research team and to the '}
          </tspan>
          <tspan x={0} y={67}>
            {'engineering team with her background in statistics and '}
          </tspan>
          <tspan x={0} y={91}>
            {'programming. This combination of skills allows her to understand '}
          </tspan>
          <tspan x={0} y={115}>
            {
              'the language of both groups and provides continuity over the course'
            }
          </tspan>
        </text>
        <text
          data-name="Dr. Newman is the Research Coordinator on this project. She comes to us with both a researcher and a coaching lens as she received her doctorate in Teaching and Learning from Vanderbilt University and has worked as an instructional coach for Metro Nashvil"
          transform="translate(858.104 1181.015)"
          fill="#fff"
          fontSize={20}
          fontFamily="HelveticaNeue-Light, Helvetica Neue"
          fontWeight={300}
        >
          <tspan x={0} y={19}>
            {'Dr. Newman is the Research Coordinator on this project. She '}
          </tspan>
          <tspan x={0} y={43}>
            {'comes to us with both a researcher and a coaching lens as she '}
          </tspan>
          <tspan x={0} y={67}>
            {'received her doctorate in Teaching and Learning from Vanderbilt '}
          </tspan>
          <tspan x={0} y={91}>
            {'University and has worked as an instructional coach for Metro '}
          </tspan>
          <tspan x={0} y={115}>
            {'Nashville Public Schools. She was previously one of our coaching '}
          </tspan>
          <tspan x={0} y={139}>
            {
              'partners, which gives her the ability to understand the perspectives'
            }
          </tspan>
        </text>
        <text
          data-name="Ms. Meador is the Associate Director of Vanderbilt University\u2019s Center for Innovation, the Wond\u2019ry, and serves as a content developer and liaison between the education research team and the Wond\u2019ry interns. Her prior background working with the Peabody Res"
          transform="translate(861.104 701.603)"
          fill="#fff"
          fontSize={20}
          fontFamily="HelveticaNeue-Light, Helvetica Neue"
          fontWeight={300}
        >
          <tspan x={0} y={19}>
            {
              'Ms. Meador is the Associate Director of Vanderbilt University\u2019s '
            }
          </tspan>
          <tspan x={0} y={43}>
            {'Center for Innovation, the Wond\u2019ry, and serves as a content '}
          </tspan>
          <tspan x={0} y={67}>
            {'developer and liaison between the education research team and the '}
          </tspan>
          <tspan x={0} y={91}>
            {
              'Wond\u2019ry interns. Her prior background working with the Peabody '
            }
          </tspan>
          <tspan x={0} y={115}>
            {'Research Office, in-depth knowledge of their data collection'}
          </tspan>
        </text>
        <text
          data-name="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          transform="translate(163.788 1663.026)"
          fill="#fff"
          fontSize={20}
          fontFamily="HelveticaNeue-Light, Helvetica Neue"
          fontWeight={300}
        >
          <tspan x={0} y={19}>
            {'Lorem ipsum dolor sit '}
          </tspan>
          <tspan x={0} y={43}>
            {'amet, consectetur '}
          </tspan>
          <tspan x={0} y={67}>
            {'adipiscing elit, sed do'}
          </tspan>
        </text>
        <text
          data-name="Principal Associate, Social and Economic Policy Abt Associates"
          transform="translate(306.788 2030.026)"
          fill="#fff"
          fontSize={20}
          fontFamily="HelveticaNeue-Light, Helvetica Neue"
          fontWeight={300}
        >
          <tspan x={0} y={19}>
            {'Principal Associate, '}
          </tspan>
          <tspan x={0} y={43}>
            {'Social and Economic '}
          </tspan>
          <tspan x={0} y={67}>
            {'Policy'}
          </tspan>
          <tspan fontFamily="HelveticaNeue-Bold, Helvetica Neue" fontWeight={700}>
            <tspan x={0} y={92}>
              {'Abt Associates'}
            </tspan>
          </tspan>
        </text>
        <text
          data-name="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          transform="translate(505.563 1662.85)"
          fill="#fff"
          fontSize={20}
          fontFamily="HelveticaNeue-Light, Helvetica Neue"
          fontWeight={300}
        >
          <tspan x={0} y={19}>
            {'Lorem ipsum dolor sit '}
          </tspan>
          <tspan x={0} y={43}>
            {'amet, consectetur '}
          </tspan>
          <tspan x={0} y={67}>
            {'adipiscing elit, sed do'}
          </tspan>
        </text>
        <text
          data-name="Policy Director Tennesseans for Quality Early Education"
          transform="translate(648.563 2029.85)"
          fill="#fff"
          fontSize={20}
          fontFamily="HelveticaNeue-Light, Helvetica Neue"
          fontWeight={300}
        >
          <tspan x={0} y={19}>
            {'Policy Director'}
          </tspan>
          <tspan fontFamily="HelveticaNeue-Bold, Helvetica Neue" fontWeight={700}>
            <tspan x={0} y={44}>
              {'Tennesseans for '}
            </tspan>
            <tspan x={0} y={69}>
              {'Quality Early Education'}
            </tspan>
          </tspan>
        </text>
        <text
          data-name="Assistant Professor of Psychology University of Dayton"
          transform="translate(820.625 1667.859)"
          fill="#fff"
          fontSize={20}
          fontFamily="HelveticaNeue-Light, Helvetica Neue"
          fontWeight={300}
        >
          <tspan x={0} y={19}>
            {'Assistant Professor of '}
          </tspan>
          <tspan x={0} y={43}>
            {'Psychology'}
          </tspan>
          <tspan fontFamily="HelveticaNeue-Bold, Helvetica Neue" fontWeight={700}>
            <tspan x={0} y={68}>
              {'University of Dayton'}
            </tspan>
          </tspan>
        </text>
        <text
          data-name="Former Project Affiliate, Professor of Teaching and Learning Vanderbilt University"
          transform="translate(963.625 2034.859)"
          fill="#fff"
          fontSize={20}
          fontFamily="HelveticaNeue-Light, Helvetica Neue"
          fontWeight={300}
        >
          <tspan x={0} y={19}>
            {'Former Project Affiliate, '}
          </tspan>
          <tspan x={0} y={43}>
            {'Professor of Teaching and '}
          </tspan>
          <tspan x={0} y={67}>
            {'Learning'}
          </tspan>
          <tspan fontFamily="HelveticaNeue-Bold, Helvetica Neue" fontWeight={700}>
            <tspan x={0} y={92}>
              {'Vanderbilt University'}
            </tspan>
          </tspan>
        </text>
        <text
          data-name="Deputy Policy Director for Opportunity Insights Harvard University"
          transform="translate(1121.625 1662.859)"
          fill="#fff"
          fontSize={20}
          fontFamily="HelveticaNeue-Light, Helvetica Neue"
          fontWeight={300}
        >
          <tspan x={0} y={19}>
            {'Deputy Policy Director for '}
          </tspan>
          <tspan x={0} y={43}>
            {'Opportunity Insights'}
          </tspan>
          <tspan fontFamily="HelveticaNeue-Bold, Helvetica Neue" fontWeight={700}>
            <tspan x={0} y={68}>
              {'Harvard University'}
            </tspan>
          </tspan>
        </text>
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

