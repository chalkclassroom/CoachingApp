import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { Pie } from "react-chartjs-2";

const styles = {
    //idk how this works
};

/**
 * specifies data sets (and formatting) for child behaviors pie chart
 */
// const childBehaviorsData = {
//     labels: [
//         'Assoc./Coop. Interaction',
//         'No Assoc./Coop. Interaction',
//         'No Opportunity (1 Child)'
//     ],
//     datasets: [{
//         data: [300, 50, 100],
//         backgroundColor: [
//             '#6F39C4',
//             '#E99C2E',
//             '#E55529'
//         ],
//         hoverBackgroundColor: [
//             '#6F39C4',
//             '#E99C2E',
//             '#E55529'
//         ]
//     }]
// };

class ChildBehaviorsPie extends React.Component {
    constructor(props){
        super(props);
    }

    state = {


    };
    render() {
        const { classes } = this.props;

        let childBehaviorsData = {
            labels: [
                'Assoc./Coop. Interaction',
                'No Assoc./Coop. Interaction',
                'No Opportunity'
            ],
            datasets: [{
                data: [this.props.acTime, this.props.noAcTime, this.props.noOppTime],
                backgroundColor: [
                    '#6F39C4',
                    '#E99C2E',
                    '#E55529'
                ],
                hoverBackgroundColor: [
                    '#6F39C4',
                    '#E99C2E',
                    '#E55529'
                ]
            }]


        };

        return (
            <Pie data={childBehaviorsData} options={{
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
                }
            }}
                 width="650"
                 height="400"
            />
        );
    }
}

 ChildBehaviorsPie.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
};

export default withStyles(styles)(ChildBehaviorsPie);