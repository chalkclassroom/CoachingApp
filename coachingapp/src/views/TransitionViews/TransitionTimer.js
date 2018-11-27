import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import PropTypes from "prop-types";
import 'react-circular-progressbar/dist/styles.css';
import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";
import ms from 'pretty-ms';

class TransitionTimer extends React.Component {
    state = {
        anchorEl: null,
        percentage: 0,
        isOn:false,
        time: 0,
        start: 0
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    onStart= () =>{
        this.setState({isOn: !this.state.isOn});

    }

    onCancel= () =>{
        this.setState({ isOn: false, time:0 , percentage:0})
    }

    render() {
        const {classes} = this.props;
        const { anchorEl } = this.state;

        if(this.state.isOn){
            setTimeout(() => {
                this.setState({percentage: (this.state.percentage + 1) % 100})
            }, 100);
        }

        return (
            <div style={{width: 400, marginTop:20}}>
                <CircularProgressbar
                    percentage={this.state.percentage}
                    text={this.state.time===0? '0:00': ms(this.state.time)}
                    initialAnimation={false}
                    styles={{
                        path: { stroke: 'rgba(29, 233, 182, 1)', },
                        text: { fill: '#000', fontSize: '16px' },
                    }}
                />
                <Grid container alignItems={"center"} justify={"center"} direction={"row"}>
                    <Button variant="fab" mini color="primary" aria-label="Cancel" onClick={this.onCancel}>
                        Cancel
                    </Button>
                    <Button variant="fab" color="secondary" aria-label="Start" onClick={this.onStart}>
                        {this.state.isOn? 'Stop' : 'Start' }
                    </Button>
                </Grid>
            </div>
        );
    }
}

TransitionTimer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default TransitionTimer;