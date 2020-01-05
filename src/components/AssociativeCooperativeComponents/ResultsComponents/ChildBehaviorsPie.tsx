import * as React from "react";
import * as PropTypes from "prop-types";
import { Pie } from "react-chartjs-2";

interface Props {
  acTime: number,
  noAcTime: number,
  noOppTime: number
}

/**
 * Pie Chart for Associative&Cooperative Child Behaviors
 * @class ChildBehaviorsPie
 * @return {void}
 */
class ChildBehaviorsPie extends React.Component<Props, {}> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);
  }

  static propTypes = {
    acTime: PropTypes.number.isRequired,
    noAcTime: PropTypes.number.isRequired,
    noOppTime: PropTypes.number.isRequired,
  };

  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    // const { classes } = this.props;

    const childBehaviorsData = {
      labels: [
        "Assoc./Coop. Interaction",
        "No Assoc./Coop. Interaction",
        "No Opportunity"
      ],
      datasets: [
        {
          data: [this.props.acTime, this.props.noAcTime, this.props.noOppTime],
          backgroundColor: ["#6F39C4", "#E99C2E", "#E55529"],
          hoverBackgroundColor: ["#6F39C4", "#E99C2E", "#E55529"]
        }
      ]
    };

    return (
      <Pie
        data={childBehaviorsData}
        options={{
          tooltips: {
            callbacks: {
              label: function(tooltipItem: { datasetIndex: number, index: number },
                data: { datasets: Array<{data: Array<number>, backgroundColor: Array<string>, hoverBackgroundColor: Array<string>}> }) {
                const dataset = data.datasets[tooltipItem.datasetIndex];
                const meta = dataset._meta[Object.keys(dataset._meta)[0]];
                const total = meta.total;
                const currentValue = dataset.data[tooltipItem.index];
                const percentage = parseFloat(
                  ((currentValue / total) * 100).toFixed(1)
                );
                return currentValue + " (" + percentage + "%)";
              },
              title: function(tooltipItem: Array<{ index: number }>, data: { labels: Array<string> }) {
                return data.labels[tooltipItem[0].index];
              }
            },
            bodyFontSize: 16
          }
        }}
        width={650}
        height={400}
      />
    );
  }
}

export default ChildBehaviorsPie;
