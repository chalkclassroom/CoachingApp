import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Line } from "react-chartjs-2";

interface Props {
  data(): {
    labels: Array<string>,
    datasets: Array<{
      label: string,
      backgroundColor: string,
      borderColor: string,
      fill: boolean,
      lineTension: number,
      data: Array<number>
    }>
  } | undefined
}

const ChildBehaviorTrendsOptions = {
  showScale: true,
  pointDot: true,
  showLines: true,
  tooltips: {
    mode: "index",
    intersect: false
  },
  hover: {
    mode: "nearest",
    intersect: true
  },
  scales: {
    xAxes: [
      {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Date",
          fontStyle: "bold"
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 100,
          callback: function(value: number): string {
            return value + "%";
          }
        },
        scaleLabel: {
          display: true,
          labelString: "% of Visits",
          fontStyle: "bold"
        }
      }
    ]
  },
  plugins: {
    datalabels: {
      display: "auto",
      color: "gray",
      align: "top",
      formatter: function(value: number): string {
        return value + "%";
      }
    }
  }
};

const ChildLineTrends: React.FC<Props> = (props: Props) => {

  return (
    <Line
      data={props.data}
      options={ChildBehaviorTrendsOptions}
      width={650}
      height={400}
    />
  );
}

ChildLineTrends.propTypes = {
  data: PropTypes.func.isRequired
}

export default (ChildLineTrends);