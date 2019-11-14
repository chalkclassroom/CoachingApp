import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { Pie } from "react-chartjs-2";
import FirebaseContext from "../../components/Firebase/context";

const styles = {
  //idk how this works
};


class TransitionTimePie extends React.Component {
  constructor(props){
    super(props);
  }

  state = {

  };




  render() {
    const { classes } = this.props;
    console.log("inside time: ", this.state.inside);
    console.log("total session time: " + this.props.sessionTotal)
    let transitionData = {
      labels: [
        'Transition Time',
        'Learning Activity (No Transition)'
      ],
      datasets: [{
        data: [this.props.transitionTime, this.props.learningActivityTime],
        backgroundColor: [
          '#E55529',
          '#0988EC'
        ],
        hoverBackgroundColor: [
          '#E55529',
          '#0988EC'
        ]
      }]
    };

    return (
      <Pie 
        data={transitionData}
        options={{
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                var dataset = data.datasets[tooltipItem.datasetIndex];
                var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                var total = meta.total;
                var currentValue = dataset.data[tooltipItem.index];
                var percentage = parseFloat((currentValue/total*100).toFixed(1));
                return currentValue + ' (' + percentage + '%)';
              },
              title: function(tooltipItem, data) {
                return data.labels[tooltipItem[0].index];
              }
            }
          },
          legend: {
            onClick: null,
            position: "bottom",
            labels: {
              padding: 20,
              fontColor: "black",
              fontSize: 14,
            }
          },
          plugins: {
            datalabels: {
              display: 'auto',
              color: 'white',
              font: {
                size: 20
              },
              formatter: function(value) {
                return (
                  Math.floor((value/1000)/60) + "m "
                  + Math.round((((value/1000)/60) % 1) * 60) + "s"
                );
              }
            }
          }
        }}
        width={650}
        height={400}
      />
    );
  }
}

TransitionTimePie.propTypes = {
  classes: PropTypes.object.isRequired,
  //data: PropTypes.object.isRequired
  transitionTime: PropTypes.number.isRequired,
  learningActivityTime: PropTypes.number.isRequired
};

TransitionTimePie.contextType = FirebaseContext;
export default withStyles(styles)(TransitionTimePie);