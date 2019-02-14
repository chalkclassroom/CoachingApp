import React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import slide1 from "../../assets/slides/slide1.png"
import slide2 from "../../assets/slides/slide2.png"
import slide3 from "../../assets/slides/slide3.png"
import slide4 from "../../assets/slides/slide4.png"



const styles = {
    root:{
        flexGrow: 1,
        display: 'flex',
        minHeight: 'calc(100%-100px)',
        flexDirection: 'column',
    },
    card: {
        width: '100%',
    },
    cardMedia: {
        paddingTop: '56.25%',
        height: '100%'
    },
    cardContent: {
        flexGrow: 1,
    },
    slide: {
        width: '100%',
        height: 'calc(100vh - 80px)',
        display: 'flex !important',
        justifyContent: 'center',
        alignItems: 'center'
    },
    slideImg:{
        position: 'relative',
        top: '2px',
        maxWidth: '100vw',
        maxHeight: 'calc(100vh - 82px)'
    }

};

class WelcomeCarousel extends React.Component {
    componentDidMount() {
        document.querySelector('button.slick-arrow.slick-next').remove();
    }

    render() {
        var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
            autoplay: true,
            autoplaySpeed: 5000,
        };
        const { classes } = this.props;

        return (
            <div className={classes.root}>
            <Slider {...settings}>
                <div className={classes.slide}>
                    <img
                        src={slide1}
                        title="Magic 8 Coaching"
                        className={classes.slideImg}
                    />
                </div>
                <div className={classes.slide}>
                    <img
                        src={slide2}
                        title="Magic 8 Coaching"
                        className={classes.slideImg}
                    />
                </div>
                <div className={classes.slide}>
                    <img
                        src={slide3}
                        title="Magic 8 Coaching"
                        className={classes.slideImg}
                    />
                </div>
                <div className={classes.slide}>
                    <img
                        src={slide4}
                        title="Magic 8 Coaching"
                        className={classes.slideImg}
                    />
                </div>
            </Slider>
            </div>
        );
    }
}

WelcomeCarousel.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WelcomeCarousel);
