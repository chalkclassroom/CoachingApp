import * as React from "react";
import * as PropTypes from "prop-types";
import { Pie } from "react-chartjs-2";

interface Props {
  ac: number,
  noAc: number,
  noChildOpp: number
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
    ac: PropTypes.number.isRequired,
    noAc: PropTypes.number.isRequired,
    noChildOpp: PropTypes.number.isRequired,
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    // const { classes } = this.props;

    const childBehaviorsData = {
      labels: [
        "Assoc./Coop. Interaction",
        "No Assoc./Coop. Interaction",
        "No Opportunity"
      ],
      datasets: [
        {
          data: [this.props.ac, this.props.noAc, this.props.noChildOpp],
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
                data: { datasets: Array<{data: Array<number>, backgroundColor: Array<string>, hoverBackgroundColor: Array<string>}> }): string {
                const dataset = data.datasets[tooltipItem.datasetIndex];
                const meta = dataset._meta[Object.keys(dataset._meta)[0]];
                const total = meta.total;
                const currentValue = dataset.data[tooltipItem.index];
                const percentage = parseFloat(
                  ((currentValue / total) * 100).toFixed(1)
                );
                return currentValue + " (" + percentage + "%)";
              },
              title: function(tooltipItem: Array<{ index: number }>, data: { labels: Array<string> }): string {
                return data.labels[tooltipItem[0].index];
              }
            },
            bodyFontSize: 16
          }
        }}
        // width={650}
        // height={400}
        width = {300}
      />
    );
  }
}

export default ChildBehaviorsPie;
