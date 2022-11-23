import * as React from 'react'
import {
  Grid,
  withStyles,
  Slider,
} from '@material-ui/core'
/*
 * These are for the tone average slider that show beneath Classroom Climate's averages chart
 */


 const ClimateSlider = withStyles({
   root: {
     color: '#0988EC',
     height: 3,
     padding: '13px 0',
   },
   thumb: {
     '& .bar': {
       // display: inline-block !important;
       height: 9,
       width: 1,
       backgroundColor: '#0988EC',
       marginLeft: 1,
       marginRight: 1,
     },
   },
   markLabel: {
     fontSize: '20px',
     maxWidth: '68px',
     whiteSpace: 'normal',
     textAlign: 'center'
   }

 })(Slider);

 const ClimateSliderLabels = withStyles({
   root: {
     color: '#0988EC',
     height: 3,
     padding: '13px 0',
   },
   thumb: {
      display: 'none',
   },
   markLabel: {
     fontSize: '15px',
     maxWidth: '68px',
     whiteSpace: 'normal',
     textAlign: 'center'
   },
   rail: {
     display: 'none',
   },
   track: {
     display: 'none',
   },

 })(Slider);


class ClimateToneSliderAverages extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render(){
    return(
      <>
        <Grid style={{display: 'flex', flexWrap: 'no-wrap', justifyContent: 'center', width: '100%', paddingTop: '50px',}}>
          <h3 style={{whiteSpace: 'no-wrap', marginRight: '45px'}}>Teacher Tone</h3>
          <ClimateSlider
            value={this.props.toneAverage}
            aria-labelledby="discrete-slider-always"
            step={1}
            max={5}
            min={1}
            style={{width: '66%',}}
            marks={[
              {
                value: 1,
                label: '1',
              },
              {
                value: 2,
                label: '2',
              },
              {
                value: 3,
                label: '3',
              },
              {
                value: 4,
                label: '4',
              },
              {
                value: 5,
                label: '5',
              },
            ]}
            color="primary"
            getAriaValueText={this.valuetext}
            valueLabelDisplay="on"
            sx={{
              "& .MuiSlider-markLabel": {
                fontSize: '3em',
                color: 'black',
                fontFamily: 'Arimo'
              },
              '& .MuiSlider-thumb': {
                borderRadius: '1px',
              },
            }}

          />
        </Grid>

        <Grid style={{display: 'flex', flexWrap: 'no-wrap', justifyContent: 'center', width: '100%', marginTop: '-30px', marginBottom: '20px',}}>
          <h3 style={{whiteSpace: 'no-wrap', marginRight: '45px', color: 'rgba(0,0,0,0)'}}>Teacher Tone</h3>

          <ClimateSliderLabels
            value={this.props.toneAverage}
            aria-labelledby="discrete-slider-always"
            step={1}
            max={5}
            min={1}
            style={{width: '66%',}}
            marks={[
              {
                value: 1,
                label: 'Anger',
              },
              {
                value: 2,
                label: 'Irritation',
              },
              {
                value: 3,
                label: 'Neutral',
              },
              {
                value: 4,
                label: 'Positive Interest',
              },
              {
                value: 5,
                label: 'Excitement',
              },
            ]}
            color="primary"
            valueLabelDisplay="on"

          />
        </Grid>
      </>
    )
  }
}

export default ClimateToneSliderAverages;
