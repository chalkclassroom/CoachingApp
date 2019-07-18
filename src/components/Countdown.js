import React from 'react';
import Grid from "@material-ui/core/Grid";
import { Line } from 'rc-progress';
import ms from "pretty-ms";
import RatingModal from "./ClassroomClimateComponent/RatingModal";

// marginTop: "5px",

const RATING_INTERVAL = 130000;
const TEN_PERCENT = 0.1 * RATING_INTERVAL;

class Countdown extends React.Component{
    constructor(props){
        super(props);

        this.state ={
            time: this.props.timerTime,
            tenPercent: 0.1 * this.props.timerTime,
            ratingIsOpen: false,
            color:"",

        }
    }

    tick = () => {
        if (this.state.time <= 0) {
          this.handleRatingModal();
          this.setState({ time: this.props.timerTime });
        } else {
            if (this.state.time - 1000 < 0) {
                this.setState({ time: 0 });
            } else {
                this.setState({ time: this.state.time - 1000 });
            }
        }
    };

    componentDidMount() {
        this.timer = setInterval(this.tick, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }
    
    handleRatingModal = () => {
        this.setState({ ratingIsOpen: true });
    };
      
    render() {
        return(
            <Grid container 
                direction="column"
                justify="flex-end"
                alignItems="center"
                height="28vh"
                >
                <Grid item style={{width:'215px', height:"225px"}}>
                    <div style={{marginTop:"47%"}} />
                    <Line
                        style={{ transform: "rotate(270deg)" }}
                        percent={`${100 *
                        (this.state.time /
                            this.props.timerTime)}`}
                        strokeWidth="10"
                        strokeColor={
                            this.state.time > this.state.tenPercent
                                ? this.props.color
                                : "#E55529"
                        }
                        
                        trailWidth="10"
                    />
                </Grid>
                <Grid item
                    style={{
                    textAlign: "center",
                    }}
                >
                    {ms(this.state.time)}
                </Grid>
            </Grid>
        );
    }
}

export default Countdown;