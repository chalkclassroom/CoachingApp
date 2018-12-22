import React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {withStyles} from "@material-ui/core";

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";
import slide1 from "../../assets/slides/slide1.png"


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
        width:'auto',
        height: '100%'
    }
};

class WelcomeCarousel extends React.Component {
    render() {
        var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
            autoplay: false,
            autoplaySpeed: 2000,
        };
        const { classes } = this.props;

        return (
            <div className={classes.root}>
            <Slider {...settings}>
                 <CardMedia
                                className={classes.cardMedia}
                                image={slide1}
                                title="Magic 8 Coaching"
                            />
                <div>
                        <img
                            className={classes.slide}
                            src={slide1}
                            title="Magic 8 Coaching"
                        />
                </div>
                <div>
                        <CardMedia
                            className={classes.cardMedia}
                            image={slide1}
                            title="Magic 8 Coaching"
                        />
                </div>
                <div>
                    <CardMedia
                            className={classes.cardMedia}
                            image={slide1}
                            title="Magic 8 Coaching"
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
