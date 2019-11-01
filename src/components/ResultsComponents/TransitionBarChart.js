import React, { Component } from 'react';
import Chart from 'chart.js';
import { lightGreen, orange, deepOrange, blue, indigo, red } from '@material-ui/core/colors';
import { HorizontalBar } from 'react-chartjs-2';

/* const data = {
  labels: [
    "Waiting in Line",
    "Traveling",
    "Children Waiting", 
    "Classroom Routines",
    "Behavior Management",
    "Other"
  ],
  datasets: [
    {
      
      data: [45],
      backgroundColor: lightGreen[300],
      hoverBackgroundColor: lightGreen[300],
      hoverBorderColor: "#D3D3D3"
    },
    {
      
      data: [7],
      backgroundColor: orange[400],
      hoverBackgroundColor: orange[400],
      hoverBorderColor: "#D3D3D3"
    }
  ]
}

class TransitionBarChart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <HorizontalBar data={data} />
      </div>
    )
  }
} */

class TransitionBarChart extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  state={
/*     line: this.props.line,
    traveling: this.props.traveling,
    waiting: this.props.waiting,
    routines: this.props.routines,
    behaviorManagement: this.props.behaviorManagement,
    other: this.props.other */
  };

  componentDidMount() {
    console.log(this.props.line, this.props.traveling, this.props.waiting, this.props.routines, this.props.behaviorManagement, this.props.other);
    this.myChart = new Chart(this.chartRef.current, {
      type: 'horizontalBar',
      data: {
        labels: [
          "Waiting in Line",
          "Traveling",
          "Children Waiting", 
          "Classroom Routines",
          "Behavior Management",
          "Other"
        ],
        datasets: [
          {
            data: [this.props.line, this.props.traveling, this.props.waiting, this.props.routines, this.props.behaviorManagement, this.props.other],
            backgroundColor: [lightGreen[300], orange[400], deepOrange[400], blue[300], red['A200'], indigo['A200']],
            hoverBackgroundColor: [lightGreen[300], orange[400], deepOrange[400], blue[300], red['A200'], indigo['A200']],
          }
        ]
      },
      options: {
        scales: {
          xAxes: [
            {
              ticks: {
                min: 0,
                max: 100,
                fontSize: 16
              },
              scaleLabel: {
                display: true,
                labelString: "Percentage of Time in Each Transition Type",
                fontSize: 22,
                fontColor: "#000000",
              },
              afterFit: function(scale) {
                scale.height = 100 //creates pading between ticks and scaleLabel
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                fontSize: 16
              },
              scaleLabel: {
                display: true,
                labelString: "Transition Types",
                fontSize: 22,
                fontColor: "#000000"
              },
              afterFit: function(scale) {
                scale.width = 260
              },
            }
          ]
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        legend: {
          display: false,
        },
        plugins: {
          datalabels: {
            display: 'auto',
            color: 'black',
            font: {
              size: 14,
              weight: 'bold'
            },
            formatter: function(value) {
              if (value > 0) {
                return value + '%';
              } else {
                return null;
              }
            }
          }
        }
      }
    });
  }
  

  render() {
    console.log(this.props.line);
    return (
        <canvas ref={this.chartRef} />
    );
  }
}

export default TransitionBarChart;