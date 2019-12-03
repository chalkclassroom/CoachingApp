import React from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import HomepageIllustrationImage from "../../assets/images/HomepageIllustrationImage.svg";
import Helmet from "react-helmet";
import ChildrenWalkingImage from "../../assets/images/ChildrenWalkingImage.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SlideOneImage from "../../assets/images/SlideOneImage.png";
import SlideTwoImage from "../../assets/images/SlideTwoImage.png";
import SlideThreeImage from "../../assets/images/SlideThreeImage.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const styles = {
  paper: {
    background: "blue"
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  },
  root: {
    flexGrow: 1,
    display: "flex",
    minHeight: "calc(100%-100px)",
    flexDirection: "column",
    justifyContent: "center"
  },
  card: {
    width: "100%"
  },
  cardMedia: {
    paddingTop: "56.25%",
    height: "100%"
  },
  cardContent: {
    flexGrow: 1
  },
  slide: {
    width: "100%",
    height: "calc(100vh - 80px)",
    display: "flex !important",
    justifyContent: "center",
    alignItems: "center"
  },
  slideImg: {
    position: "relative",
    top: "2px",
    maxWidth: "100vw",
    maxHeight: "calc(100vh - 82px)"
  }
};

class LandingPage extends React.Component {
  topCard = props => {
    return (
      <svg viewBox="0 0 1470 845" {...props}>
        <defs>
          <linearGradient
            id="prefix__a"
            x1={0.5}
            y1={0.325}
            x2={0.5}
            y2={1}
            gradientUnits="objectBoundingBox"
          >
            <stop offset={0} stopColor="#a1c4fd" />
            <stop offset={1} stopColor="#c2e9fb" />
          </linearGradient>
        </defs>
        <g data-name="Top Card" transform="translate(0 -16)">
          <path
            data-name="Rectangle 14"
            d="M0 0h1469.155v767.529a78 78 0 0 1-78 78H78a78 78 0 0 1-78-78V0z"
            transform="translate(0 16)"
            fill="url(#prefix__a)"
          />
          <text
            data-name="CONNECT WITH US!"
            transform="translate(118.231 548.334)"
            fill="#fff"
            fontSize={30}
            fontFamily="Avenir-Black, Avenir"
            fontWeight={800}
          >
            <tspan x={0} y={0}>
              {"CONNECT WITH US!"}
            </tspan>
          </text>
          <text
            data-name="\u25CB Collect Information about Relevant Classroom Practices \u25CB Identify Areas of Strength and Areas of Opportunity \u25CB Develop Strategies for Success"
            transform="translate(118.587 422.904)"
            fill="#fff"
            fontSize={15}
            fontFamily="LucidaGrande-Bold, Lucida Grande"
            fontWeight={700}
          >
            <tspan x={0} y={0}>
              {"\u25CB"}
            </tspan>
            <tspan y={0} fontFamily="Avenir-Medium, Avenir" fontWeight={500}>
              {" Collect Information about Relevant Classroom Practices"}
            </tspan>
            <tspan x={0} y={20}>
              {"\u25CB"}
            </tspan>
            <tspan y={20} fontFamily="Avenir-Medium, Avenir" fontWeight={500}>
              {" Identify Areas of Strength and Areas of Opportunity"}
            </tspan>
            <tspan x={0} y={40}>
              {"\u25CB"}
            </tspan>
            <tspan y={40} fontFamily="Avenir-Medium, Avenir" fontWeight={500}>
              {" Develop Strategies for Success"}
            </tspan>
            <tspan fontFamily="Avenir-Medium, Avenir" fontWeight={500} />
          </text>
          <text
            data-name="We are currently selecting a small group of schools to get access to our Beta Version Sign up for our mailing list to be the first to get updates!"
            transform="translate(118.231 578.654)"
            fill="#fff"
            fontSize={15}
            fontFamily="Avenir-Medium, Avenir"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"We are currently selecting a small group of schools to get"}
            </tspan>
            <tspan x={0} y={20}>
              {"access to our Beta Version "}
            </tspan>
            <tspan x={0} y={60}>
              {"Sign up for our mailing list to be the first to get updates!"}
            </tspan>
          </text>
          <g
            data-name="Group 200"
            fontSize={85}
            fontFamily="Avenir-Black, Avenir"
            fontWeight={800}
          >
            <text
              data-name="OUR TOOL"
              transform="translate(130.782 256.392)"
              fill="#8eb1eb"
            >
              <tspan x={0} y={0}>
                {"OUR "}
              </tspan>
              <tspan x={0} y={116}>
                {"TOOL"}
              </tspan>
            </text>
            <text
              data-name="OUR TOOL"
              transform="translate(118.587 256.392)"
              fill="#fff"
            >
              <tspan x={0} y={0}>
                {"OUR "}
              </tspan>
              <tspan x={0} y={116}>
                {"TOOL"}
              </tspan>
            </text>
          </g>
          <image
            data-name={2068180}
            width={950}
            height={950}
            transform="translate(560 -80)"
            xlinkHref={HomepageIllustrationImage}
          />
        </g>
      </svg>
    );
  };

  problemScope = props => {
    return (
      <svg
        id="prefix__Layer_1"
        x={0}
        y={0}
        viewBox="0 0 930.8 430.9"
        xmlSpace="preserve"
        {...props}
      >
        <style>
          {
            ".prefix__st0{fill:#fff}.prefix__st1{font-family:'Avenir-Black'}.prefix__st4{fill:#8eb1eb}.prefix__st5{font-size:6.9767px}.prefix__st6{fill:#86b1f8}"
          }
        </style>
        <g id="prefix__Problem_Scope" transform="translate(-4137 1186.165)">
          <text
            transform="translate(4542.306 -1121.839)"
            className="prefix__st0 prefix__st1"
            fontSize={20.058}
          >
            {"Problem/Scope"}
          </text>
          <text
            transform="translate(4580 -770)"
            className="prefix__st0 prefix__st1"
            fontSize={20.058}
          >
            {"The big 3"}
          </text>
          <g id="prefix__Group_201">
            <path
              className="prefix__st0"
              d="M4978.5-838.8h-629.1c-43.1 0-78-34.9-78-78v-157.6h629.1c43.1 0 78 34.9 78 78v157.6z"
            />
            <g transform="translate(4137 -1186.17)">
              <path
                id="prefix__Rectangle_133-2"
                d="M375 96.9h159.6c38.5 0 69.8 31.2 69.8 69.8v201.4H444.7c-38.5 0-69.8-31.2-69.8-69.8V96.9h.1z"
                fill="#324993"
              />
            </g>
          </g>
          <text
            transform="translate(4331.331 -896.8)"
            className="prefix__st4 prefix__st1 prefix__st5"
          >
            {"There are over 1.5 million children enrolled"}
          </text>
          <text
            transform="translate(4373.517 -887.208)"
            className="prefix__st4 prefix__st1 prefix__st5"
          >
            {"In pre-k in the US"}
          </text>
          <text
            transform="translate(4760.189 -896.8)"
            className="prefix__st4 prefix__st1 prefix__st5"
          >
            {"Observation Tools must be designed to differentiate,"}
          </text>
          <text
            transform="translate(4754.125 -887.208)"
            className="prefix__st4 prefix__st1 prefix__st5"
          >
            {"And it\u2019s not enough to provide scores without a roadmap"}
          </text>
          <g id="prefix__achievement" transform="translate(4546.372 -1043.636)">
            <path
              id="prefix__Path_33"
              className="prefix__st6"
              d="M81.2 38.8l4.5 9c1.4 2.8 4.1 4.8 7.2 5.2l10 1.4-7.1 6.8c-2.3 2.3-3.4 5.5-2.8 8.7l1.7 9.6-9.2-4.7c-2.7-1.4-6-1.4-8.7 0l-9.2 4.7 1.7-9.6c.6-3.2-.5-6.5-2.8-8.7l-7.1-6.8 10-1.4c3.1-.4 5.8-2.4 7.2-5.2l4.6-9m0-9.8c-1.3 0-2.4.7-3 1.9L71.1 45c-.5 1-1.4 1.7-2.5 1.8L53 49.1c-1.9.3-3.2 2.2-2.8 4.1.1.7.5 1.4 1 1.9l11.1 10.6c.8.8 1.2 2 1 3.1L60.6 84c-.4 1.8.8 3.6 2.6 4h.1c.2 0 .4 0 .6.1.5 0 1.1-.1 1.6-.4l14.2-7.4c1-.5 2.1-.5 3.1 0L97 87.8c.5.3 1 .4 1.6.4 1.9 0 3.4-1.6 3.4-3.5v-.6l-2.7-15.2c-.2-1.1.2-2.3 1-3.1l11.1-10.6c1.4-1.3 1.4-3.6.1-5-.5-.5-1.2-.9-1.9-1L93.9 47c-1.1-.2-2-.9-2.5-1.8l-7.3-14.3c-.5-1.2-1.7-1.9-2.9-1.9z"
            />
            <g id="prefix__Group_7" transform="translate(0 73.337)">
              <path
                id="prefix__Path_34"
                className="prefix__st6"
                d="M78.2 32.3zm0 0zm39.4-6.8c-10.3.2-24.4.5-33.2 5.1 8.9-4 22.9-4.1 33.2-3.5v3.8c-10.4-1.1-24.8-3.6-33.5-.1-.3.1-.5.3-.8.5-.4.2-.7.6-.7 1-.1.7-.7 1.3-1.5 1.3h-1.4c-.7 0-1.4-.5-1.5-1.3-.1-.4-.3-.7-.6-.9 0 0-.1 0-.1-.1-.3-.2-.5-.3-.8-.5-8.8-3.5-23.3-1-33.7.1v-3.8c10.2-.7 24.2-.5 33.1 3.4-8.8-4.6-22.8-4.9-33.1-5v-3.4c11.8-.7 25.6-8.5 37.4 7.6 11.9-16.1 25.6-8.3 37.3-7.6l-.1 3.4zm-39.4 6.8z"
              />
            </g>
          </g>
          <text
            transform="translate(4537.736 -902.88)"
            className="prefix__st4 prefix__st1 prefix__st5"
          >
            {"The quality of a child\u2019s pre-k classroom environment"}
          </text>
          <text
            transform="translate(4556.934 -893.288)"
            className="prefix__st4 prefix__st1 prefix__st5"
          >
            {"sets the stage for later achievement, but"}
          </text>
          <text
            transform="translate(4552.576 -883.695)"
            className="prefix__st4 prefix__st1 prefix__st5"
          >
            {"understanding and assessing quality is hard"}
          </text>
          <path
            id="prefix__observation"
            className="prefix__st6"
            d="M4899.4-945.5l-7.2-6c2.5-3.8 3.4-8.4 2.4-12.8-1.3-6.2-6.5-10.4-12.3-11.5v-30.3c0-.8-.7-1.5-1.5-1.5h-38.6c-5.6 0-9.9 3.6-10.2 9.5v39.2c0 .2 0 .3.1.5.5 4.8 4.4 8.5 9.2 8.6h27.7c.2.2.3.3.4.5 4.8 4.9 12.3 5.4 18.1 2.1 1.2-.7 2.3-1.5 3.2-2.5l7.1 5.8c1.1.9 2.7-.7 1.6-1.6zm-55.1-59.1h35v28.6c-5 .3-9.5 3-12.2 7.2h-25.7c-2.4-.1-4.7.8-6.4 2.5V-998v-.2c.3-5.7 4.9-6.4 9.3-6.4zm-3 51.7h-.1c-8.1-.4-8.1-13.3.1-12.8h24.3c-.5 1.6-.8 3.2-.8 4.9h-23.6c-.8 0-1.5.8-1.4 1.6 0 .8.7 1.4 1.4 1.4h23.8c.3 1.7.9 3.4 1.7 4.9h-25.4zm45.4 2.6c-4.5 3-10.4 2.7-14.5-.7-4.6-3.7-5.5-10.3-2.9-15.5.5-.6.8-1.3 1.3-1.9 2.5-3.1 6.3-4.8 10.3-4.5 11.2 1 15.1 15.9 5.8 22.6zm-39.7-34.1c0-.6.5-1.1 1.1-1.2s1.1.5 1.2 1.1v8.6c0 .6-.5 1.1-1.1 1.2-.6 0-1.1-.5-1.2-1.1v-8.6zm6.1-3.7c0-.6.5-1.1 1.1-1.2.6 0 1.1.5 1.2 1.1V-975.9c0 .6-.5 1.1-1.1 1.2s-1.1-.5-1.2-1.1V-988.1zm6.2 3.3c0-.6.5-1.1 1.1-1.1.6 0 1.1.5 1.1 1.1v8.9c0 .6-.5 1.1-1.1 1.1-.6 0-1.1-.5-1.1-1.1v-8.9zm6.3-3.3c0-.6.5-1.1 1.1-1.2.6 0 1.1.5 1.2 1.1V-975.9c0 .6-.5 1.1-1.1 1.2s-1.1-.5-1.2-1.1V-988.1zm-16.7-1.4c-.5.4-1.2.3-1.6-.1-.4-.4-.3-1 0-1.5l5.8-5.8c.4-.4 1.1-.4 1.6 0l6.6 6.5h-1.6l6.1-6.5c.5-.4 1.2-.3 1.6.2.3.4.3 1 0 1.4l-6.1 6.5c-.4.4-1.1.5-1.5 0l-6.6-6.5h1.6l-5.9 5.8z"
          />
          <g id="prefix__Group_10" transform="translate(4262.507 -1029.88)">
            <text
              transform="translate(149.3 72.65)"
              className="prefix__st4 prefix__st1"
              fontSize={21.802}
              id="prefix__Student_Icon"
            >
              {"1.5M+"}
            </text>
            <g id="prefix__children">
              <path
                id="prefix__Path_42"
                className="prefix__st6"
                d="M128.8 92.6v-4.3h4.3c.8 0 1.4-.6 1.4-1.4 0-.8-.6-1.4-1.4-1.4h-4.3v-4.3c0-.8-.6-1.4-1.4-1.4-.8 0-1.4.6-1.4 1.4v4.3h-4.3c-.8 0-1.4.6-1.4 1.4 0 .8.6 1.4 1.4 1.4h4.3v4.3h2.8z"
              />
              <path
                id="prefix__Path_43"
                className="prefix__st6"
                d="M144.9 65.9c0-5.5-3.4-10.5-8.5-12.6v-1.1c.1-12.9-10.4-23.4-23.3-23.5-12.9-.1-23.4 10.4-23.5 23.3v.2l-.4.2c-5.8 1.5-9.9 6.8-9.9 12.8 0 6.8 5 12.8 11.2 13.8l-2.9 13.9H91l3.1-15c0-.6 0-1.2-.2-1.8-.3-.4-.8-.7-1.4-.7-5.5-.1-9.9-4.6-9.9-10.1 0-4.5 3-8.5 7.4-9.6 1.4 8.5 7.4 16.4 15.7 19.2l-3.8 17.9h3.4l4.3-18.6c.3-.9-.2-1.9-1.1-2.2-8.8-2.4-14.9-10.4-15-19.5-.1-11.1 8.9-20.2 20.1-20.3s20.2 8.9 20.3 20.1c.1 9.4-6.3 17.5-15.4 19.7-.4 0-.9.4-1.1.7-.2.4-.3.9-.2 1.4l1.6 6.1c-1.9 2.3-3 5.3-2.9 8.3 0 1.7.3 3.3.9 4.9h2.4c-.7-2.2-1.1-3.4-1.1-4.9 0-5.4 4.3-10.1 9.6-10.1 5.4 0 9.6 4.7 9.6 10.1 0 1.6-.4 2.4-1.1 4.7h2.4c.4-2.2.9-3.4.9-4.9 0-3.4-1.4-6.6-3.8-8.9 5.4-2.1 9.2-7.5 9.2-13.5zm-10.7 9.9l-2.9.7c-1.4-.5-2.8-.8-4.3-.9-2.2 0-4.4.6-6.3 1.8l-.7-2.7c8.1-2.5 14.2-9.3 15.9-17.7 3.4 1.8 5.6 5.3 5.6 9.2 0 4.5-3 8.4-7.3 9.6z"
              />
              <path
                id="prefix__Path_44"
                className="prefix__st6"
                d="M98.6 52.7c0 1.9 1.5 3.4 3.4 3.4s3.4-1.5 3.4-3.4-1.5-3.4-3.4-3.4c-1.9.1-3.4 1.6-3.4 3.4z"
              />
              <path
                id="prefix__Path_45"
                className="prefix__st6"
                d="M121.2 52.7c0 1.7 1.4 3.1 3.1 3.1 1.7 0 3.1-1.4 3.1-3.1 0-1.7-1.4-3.1-3.1-3.1-1.7 0-3.1 1.4-3.1 3.1z"
              />
              <g id="prefix__Group_9" transform="translate(10.798)">
                <path
                  id="prefix__Path_46"
                  className="prefix__st6"
                  d="M83.9 46.3l4.6-7.3 4.1 7.9c.2 0 13.8 2 34.2-.6-3.7-12.4-11-19.1-25.2-19.1-14.1 0-19.7 6-23.6 18.2"
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    );
  };

  benefits = props => {
    return (
      <svg data-name="Layer 1" viewBox="0 0 1000 1000" {...props}>
        <title>{"Benefits"}</title>
        <circle cx={804.73} cy={300.28} r={189.5} fill="#ffd9d9" />
        <text
          transform="translate(30 24.81)"
          style={{
            isolation: "isolate"
          }}
          fontSize={29.05}
          fill="#fff"
          fontFamily="Avenir-Black,Avenir"
          fontWeight={800}
          data-name="Benefits"
        >
          {"Benefits"}
        </text>
        <text
          transform="translate(30 67.22)"
          style={{
            isolation: "isolate"
          }}
          fontSize={17.43}
          fill="#fff"
          fontFamily="Avenir-Black,Avenir"
          fontWeight={800}
          data-name="Grounded in Rigorous Research"
        >
          {"G"}
          <tspan x={13.56} y={0} letterSpacing="-.018em">
            {"r"}
          </tspan>
          <tspan x={20.34} y={0}>
            {"ounded in Rigo"}
          </tspan>
          <tspan x={145.24} y={0} letterSpacing="-.018em">
            {"r"}
          </tspan>
          <tspan x={152.02} y={0}>
            {"ous Resea"}
          </tspan>
          <tspan x={234.62} y={0} letterSpacing="-.018em">
            {"r"}
          </tspan>
          <tspan x={241.4} y={0}>
            {"ch"}
          </tspan>
        </text>
        <text
          transform="translate(30.58 191.55)"
          style={{
            isolation: "isolate"
          }}
          fontSize={17.43}
          fill="#fff"
          fontFamily="Avenir-Black,Avenir"
          fontWeight={800}
          data-name="Data that Matters"
        >
          {"Data that Matters"}
        </text>
        <text
          transform="translate(30 289.16)"
          style={{
            isolation: "isolate"
          }}
          fontSize={17.43}
          fill="#fff"
          fontFamily="Avenir-Black,Avenir"
          fontWeight={800}
          data-name="Feedback is Individualized and Timely"
        >
          {"Feedback is Individualized and Timely"}
        </text>
        <text
          transform="translate(30.58 426.85)"
          style={{
            isolation: "isolate"
          }}
          fontSize={17.43}
          fill="#fff"
          fontFamily="Avenir-Black,Avenir"
          fontWeight={800}
          data-name="Emphasis on Teacher Learning"
        >
          {"Emphasis on "}
          <tspan x={108.11} y={0} letterSpacing="-.111em">
            {"T"}
          </tspan>
          <tspan x={116.18} y={0}>
            {"eacher Lea"}
          </tspan>
          <tspan x={204.94} y={0} letterSpacing=".018em">
            {"r"}
          </tspan>
          <tspan x={212.34} y={0}>
            {"ning"}
          </tspan>
        </text>
        <text
          transform="translate(548.82 534.92)"
          style={{
            isolation: "isolate"
          }}
          fontSize={17.43}
          fill="#fff"
          fontFamily="Avenir-Black,Avenir"
          fontWeight={800}
          data-name="Works Across Any Curriculum"
        >
          <tspan letterSpacing="-.018em">{"W"}</tspan>
          <tspan x={17.12} y={0}>
            {"orks Ac"}
          </tspan>
          <tspan x={79.08} y={0} letterSpacing="-.018em">
            {"r"}
          </tspan>
          <tspan x={85.86} y={0}>
            {"oss Any Curriculum"}
          </tspan>
        </text>
        <g
          data-name="The Magic 8 practices observed using the CQ-REF were developed and validated through observations in hundreds of preschool classrooms. Each one is included because it predicts child gains across multiple academic and self-regulation domains. If the scor"
          style={{
            isolation: "isolate"
          }}
          fontSize={13.363}
          fill="#fff"
        >
          <text
            transform="translate(30.58 86.97)"
            style={{
              isolation: "isolate"
            }}
            fontFamily="Avenir-Medium,Avenir"
            fontWeight={500}
          >
            {"The Magic 8 practices observed using the CQ-REF we"}
            <tspan x={325.94} y={0} letterSpacing="-.018em">
              {"r"}
            </tspan>
            <tspan x={330.65} y={0}>
              {"e developed and validated th"}
            </tspan>
            <tspan x={508.12} y={0} letterSpacing="-.018em">
              {"r"}
            </tspan>
            <tspan x={512.82} y={0}>
              {"ough observations in hund"}
            </tspan>
            <tspan x={673.49} y={0} letterSpacing="-.018em">
              {"r"}
            </tspan>
            <tspan x={678.19} y={0}>
              {"eds of p"}
            </tspan>
            <tspan x={727.7} y={0} letterSpacing="-.018em">
              {"r"}
            </tspan>
            <tspan x={732.41} y={0}>
              {"eschool class"}
            </tspan>
            <tspan x={810.89} y={0} letterSpacing="-.018em">
              {"r"}
            </tspan>
            <tspan x={815.59} y={0}>
              {"ooms."}
            </tspan>
          </text>
          <text
            transform="translate(30.58 104.98)"
            style={{
              isolation: "isolate"
            }}
            fontFamily="Avenir-Medium,Avenir"
            fontWeight={500}
          >
            {"Each one is included because it p"}
            <tspan x={200.75} y={0} letterSpacing="-.018em">
              {"r"}
            </tspan>
            <tspan x={205.45} y={0}>
              {"edicts child gains ac"}
            </tspan>
            <tspan x={326.21} y={0} letterSpacing="-.018em">
              {"r"}
            </tspan>
            <tspan x={330.91} y={0} letterSpacing="0em">
              {"oss multiple academic and self-"}
            </tspan>
            <tspan x={519.26} y={0} letterSpacing="-.018em">
              {"r"}
            </tspan>
            <tspan x={523.96} y={0}>
              {"egulation domains."}
            </tspan>
          </text>
          <text
            transform="translate(30.58 141.01)"
            style={{
              isolation: "isolate"
            }}
            fontFamily="Avenir-Black,Avenir"
            fontWeight={800}
          >
            {"If the sco"}
            <tspan x={58.37} y={0} letterSpacing="-.018em">
              {"r"}
            </tspan>
            <tspan x={63.57} y={0}>
              {"e for a class"}
            </tspan>
            <tspan x={138.28} y={0} letterSpacing="-.018em">
              {"r"}
            </tspan>
            <tspan x={143.47} y={0}>
              {"oom goes up, outcomes for child"}
            </tspan>
            <tspan x={350.99} y={0} letterSpacing="-.018em">
              {"r"}
            </tspan>
            <tspan x={356.19} y={0} letterSpacing="0em">
              {"en imp"}
            </tspan>
            <tspan x={399.01} y={0} letterSpacing="-.018em">
              {"r"}
            </tspan>
            <tspan x={404.2} y={0} letterSpacing="0em">
              {"ove!"}
            </tspan>
          </text>
        </g>
        <image
          data-name={972}
          width={896}
          height={1031}
          transform="matrix(.3 0 0 .3 667.56 146.91)"
          xlinkHref={ChildrenWalkingImage}
          style={{
            isolation: "isolate"
          }}
        />
        <g
          data-name="The CQ-REF observation tool only collects information that truly matters for children s outcomes. No fluff no frills only meaningful information tied to action that can affect real change."
          style={{
            isolation: "isolate"
          }}
          fontSize={13.363}
          fill="#fff"
          fontFamily="Avenir-Medium,Avenir"
          fontWeight={500}
        >
          <text
            transform="translate(30.58 217.12)"
            style={{
              isolation: "isolate"
            }}
          >
            {
              "The CQ-REF observation tool only collects information that truly matters for child"
            }
            <tspan x={492.07} y={0} letterSpacing="-.018em">
              {"r"}
            </tspan>
            <tspan x={496.77} y={0}>
              {"en"}
            </tspan>
            <tspan x={511.63} y={0} letterSpacing="-.074em">
              {"\u2019"}
            </tspan>
            <tspan x={514.35} y={0} letterSpacing="0em">
              {"s"}
            </tspan>
          </text>
          <text
            transform="translate(30.58 235.13)"
            style={{
              isolation: "isolate"
            }}
          >
            {"outcomes. No flu"}
            <tspan x={104.24} y={0} letterSpacing="-.018em">
              {"f"}
            </tspan>
            <tspan x={108.45} y={0}>
              {
                "f, no frills, only meaningful information tied to action that can a"
              }
            </tspan>
            <tspan x={489.15} y={0} letterSpacing="-.018em">
              {"f"}
            </tspan>
            <tspan x={493.36} y={0}>
              {"fect "}
            </tspan>
            <tspan x={520.34} y={0} letterSpacing="-.018em">
              {"r"}
            </tspan>
            <tspan x={525.04} y={0}>
              {"eal"}
            </tspan>
          </text>
          <text
            transform="translate(30.58 253.14)"
            style={{
              isolation: "isolate"
            }}
          >
            {"change."}
          </text>
        </g>
        <g
          data-name="Observed behaviors are instantly summarized and available for coaches and instructional leaders to have meaningful and collaborative conversations with teachers but it doesn t stop there. When an area of opportunity for a teacher is identified the tool p"
          style={{
            isolation: "isolate"
          }}
          fontSize={13.363}
          fill="#fff"
          fontFamily="Avenir-Medium,Avenir"
          fontWeight={500}
        >
          <text
            transform="translate(30 314.72)"
            style={{
              isolation: "isolate"
            }}
          >
            {"Observed behaviors a"}
            <tspan x={132.89} y={0} letterSpacing="-.018em">
              {"r"}
            </tspan>
            <tspan x={137.6} y={0}>
              {
                "e instantly summarized and available for coaches and instructional"
              }
            </tspan>
          </text>
          <text
            transform="translate(30 332.73)"
            style={{
              isolation: "isolate"
            }}
          >
            {
              "leaders to have meaningful and collaborative conversations with teachers, but it doesn"
            }
            <tspan x={523.52} y={0} letterSpacing="-.018em">
              {"\u2019"}
            </tspan>
            <tspan x={527} y={0}>
              {"t"}
            </tspan>
          </text>
          <text
            transform="translate(30 350.74)"
            style={{
              isolation: "isolate"
            }}
          >
            {"stop the"}
            <tspan x={50.5} y={0} letterSpacing="-.018em">
              {"r"}
            </tspan>
            <tspan x={55.2} y={0}>
              {"e. When an a"}
            </tspan>
            <tspan x={133.93} y={0} letterSpacing="-.018em">
              {"r"}
            </tspan>
            <tspan x={138.64} y={0}>
              {"ea of opportunity for a teacher is identified, the tool p"}
            </tspan>
            <tspan x={466.62} y={0} letterSpacing="-.018em">
              {"r"}
            </tspan>
            <tspan x={471.33} y={0}>
              {"ovides an"}
            </tspan>
          </text>
          <text
            transform="translate(30 368.75)"
            style={{
              isolation: "isolate"
            }}
          >
            {"easy-to-use action plan generator so you\u2019"}
            <tspan x={250.1} y={0} letterSpacing="-.018em">
              {"r"}
            </tspan>
            <tspan x={254.8} y={0}>
              {"e never left wondering, \u201CWhat now?\u201D."}
            </tspan>
          </text>
        </g>
        <g
          data-name="Feedback reflection and professional development are cornerstones of growth and the continual process to refine one s craft. Our tool supports teachers and coaches on their journey to provide the highest quality experiences for the children and families"
          style={{
            isolation: "isolate"
          }}
          fontSize={13.363}
          fill="#fff"
          fontFamily="Avenir-Medium,Avenir"
          fontWeight={500}
        >
          <text
            transform="translate(31.16 452.42)"
            style={{
              isolation: "isolate"
            }}
          >
            {"Feedback, "}
            <tspan x={66.6} y={0} letterSpacing="-.018em">
              {"r"}
            </tspan>
            <tspan x={71.3} y={0}>
              {"eflection, and p"}
            </tspan>
            <tspan x={165.62} y={0} letterSpacing="-.018em">
              {"r"}
            </tspan>
            <tspan x={170.32} y={0}>
              {"ofessional development a"}
            </tspan>
            <tspan x={325.29} y={0} letterSpacing="-.018em">
              {"r"}
            </tspan>
            <tspan x={329.99} y={0}>
              {"e cornerstones of g"}
            </tspan>
            <tspan x={447.85} y={0} letterSpacing="-.018em">
              {"r"}
            </tspan>
            <tspan x={452.55} y={0} letterSpacing="0em">
              {"owth and the"}
            </tspan>
          </text>
          <text
            transform="translate(31.16 470.43)"
            style={{
              isolation: "isolate"
            }}
          >
            {"continual p"}
            <tspan x={66.84} y={0} letterSpacing="-.018em">
              {"r"}
            </tspan>
            <tspan x={71.54} y={0} letterSpacing="0em">
              {"ocess to "}
            </tspan>
            <tspan x={125.53} y={0} letterSpacing="-.018em">
              {"r"}
            </tspan>
            <tspan x={130.23} y={0}>
              {"efine one"}
            </tspan>
            <tspan x={186.69} y={0} letterSpacing="-.074em">
              {"\u2019"}
            </tspan>
            <tspan x={189.42} y={0} letterSpacing="0em">
              {"s craft. Our tool supports teachers and coaches on their"}
            </tspan>
          </text>
          <text
            transform="translate(31.16 488.44)"
            style={{
              isolation: "isolate"
            }}
          >
            {"journey to p"}
            <tspan x={73.53} y={0} letterSpacing="-.018em">
              {"r"}
            </tspan>
            <tspan x={78.24} y={0} letterSpacing="0em">
              {"ovide the highest quality experiences for the child"}
            </tspan>
            <tspan x={380.93} y={0} letterSpacing="-.018em">
              {"r"}
            </tspan>
            <tspan x={385.63} y={0}>
              {"en and families they serve."}
            </tspan>
          </text>
        </g>
        <g
          data-name="The Magic 8 practices are not tied to any specific curricula and can be observed in any pre-k classroom making the CQ-REF an ideal observation tool for schools across the nation."
          style={{
            isolation: "isolate"
          }}
          fontSize={13.363}
          fill="#fff"
          fontFamily="Avenir-Medium,Avenir"
          fontWeight={500}
        >
          <text
            transform="translate(548.82 564.55)"
            style={{
              isolation: "isolate"
            }}
          >
            {"The Magic 8 practices a"}
            <tspan x={143.05} y={0} letterSpacing="-.018em">
              {"r"}
            </tspan>
            <tspan x={147.75} y={0}>
              {"e not tied to any specific curricula and can"}
            </tspan>
          </text>
          <text
            transform="translate(548.82 582.56)"
            style={{
              isolation: "isolate"
            }}
          >
            {"be observed in any p"}
            <tspan x={126.99} y={0} letterSpacing="-.018em">
              {"r"}
            </tspan>
            <tspan x={131.69} y={0}>
              {"e-k class"}
            </tspan>
            <tspan x={182.44} y={0} letterSpacing="-.018em">
              {"r"}
            </tspan>
            <tspan x={187.14} y={0}>
              {"oom making the CQ-REF an ideal"}
            </tspan>
          </text>
          <text
            transform="translate(548.82 600.57)"
            style={{
              isolation: "isolate"
            }}
          >
            {"observation tool for schools ac"}
            <tspan x={185.95} y={0} letterSpacing="-.018em">
              {"r"}
            </tspan>
            <tspan x={190.66} y={0}>
              {"oss the nation."}
            </tspan>
          </text>
        </g>
        <g
          data-name="Coaches and instructional leaders can engage in training and get certified to use the CQ-REF from anywhere. No expensive travel or spending days at a time sitting in a conference room. Our modular approach also makes sure you learn what you need as you nee"
          style={{
            isolation: "isolate"
          }}
          fontSize={13.363}
          fill="#fff"
          fontFamily="Avenir-Medium,Avenir"
          fontWeight={500}
        >
          <text
            transform="translate(548.82 618.58)"
            style={{
              isolation: "isolate"
            }}
          >
            {"Coaches and instructional leaders can engage in training and get"}
          </text>
          <text
            transform="translate(548.82 636.59)"
            style={{
              isolation: "isolate"
            }}
          >
            {"certified to use the CQ-REF f"}
            <tspan x={175.46} y={0} letterSpacing="-.018em">
              {"r"}
            </tspan>
            <tspan x={180.17} y={0} letterSpacing="0em">
              {"om anywhe"}
            </tspan>
            <tspan x={249.25} y={0} letterSpacing="-.018em">
              {"r"}
            </tspan>
            <tspan x={253.96} y={0}>
              {"e. No expensive travel or"}
            </tspan>
          </text>
          <text
            transform="translate(548.82 654.6)"
            style={{
              isolation: "isolate"
            }}
          >
            {"spending days at a time sitting in a confe"}
            <tspan x={248.22} y={0} letterSpacing="-.018em">
              {"r"}
            </tspan>
            <tspan x={252.93} y={0}>
              {"ence "}
            </tspan>
            <tspan x={285.37} y={0} letterSpacing="-.018em">
              {"r"}
            </tspan>
            <tspan x={290.08} y={0}>
              {"oom. Our modular"}
            </tspan>
          </text>
          <text
            transform="translate(548.82 672.61)"
            style={{
              isolation: "isolate"
            }}
          >
            {"app"}
            <tspan x={23.26} y={0} letterSpacing="-.018em">
              {"r"}
            </tspan>
            <tspan x={27.97} y={0}>
              {"oach also makes su"}
            </tspan>
            <tspan x={143.85} y={0} letterSpacing="-.018em">
              {"r"}
            </tspan>
            <tspan x={148.55} y={0}>
              {"e you learn what you need as you need it,"}
            </tspan>
          </text>
          <text
            transform="translate(548.82 690.62)"
            style={{
              isolation: "isolate"
            }}
          >
            {"which aids in "}
            <tspan x={80.67} y={0} letterSpacing="-.018em">
              {"r"}
            </tspan>
            <tspan x={85.37} y={0}>
              {"etention and training satisfaction."}
            </tspan>
          </text>
        </g>
      </svg>
    );
  };

  screenshotGrid = props => {
    const { classes } = this.props;
    return (
      <div length={500} width={500}>
        <Carousel swipeable={true}>
          <div>
            <img src={SlideOneImage} alt="sample" />
            <p className="legend">Legend 1</p>
          </div>
          <div>
            <img src={SlideTwoImage} alt="sample" />
            <p className="legend">Legend 2</p>
          </div>
          <div>
            <img src={SlideThreeImage} alt="sample" />
            <p className="legend">Legend 3</p>
          </div>
        </Carousel>
      </div>
    );
  };
  render() {
    const { classes } = this.props;
    return (
      <>
        <div>
          {this.topCard(this.props)}
          <br></br>
          {this.problemScope(this.props)}
          <br></br>
          <div>{this.screenshotGrid(this.props)}</div>
          <br></br>
          {this.benefits(this.props)}
          <Helmet>
            <style>{"body { background-color: #86B1F8;}"}</style>
          </Helmet>
        </div>
      </>
    );
  }
}
LandingPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LandingPage);
