import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Line } from "react-chartjs-2";

type TrendsData = {
  labels: Array<string>,
  datasets: Array<{
    label: string,
    backgroundColor: string,
    borderColor: string,
    fill: boolean,
    lineTension: number,
    data: Array<number>
  }>
}

interface Props {
  data(): TrendsData | undefined,
  completed?(): void,
  title?: boolean
}

const TeacherLineTrends: React.FC<Props> = (props: Props) => {
  const { completed, title } = props;

  return (
    <Line
      data={(): TrendsData | undefined => props.data()}
      options={{
        animation: {
          onComplete: function(): void {
            completed ? completed() : null
          }
        },
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
        title: {
          display: title,
          text: "Teacher Trends",
          fontSize: 20,
          fontColor: 'black',
          fontFamily: 'Arimo',
          fontStyle: "bold"
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Date",
                fontFamily: 'Arimo',
                fontSize: 18,
                fontColor: 'black'
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
                labelString: "% of 1-minute Intervals",
                fontFamily: 'Arimo',
                fontSize: 18,
                fontColor: 'black'
              }
            }
          ]
        },
        plugins: {
          datalabels: {
            display: "auto",
            color: "gray",
            align: function(value: {
              dataIndex: number,
              dataset: {
                data: Array<number>
              }
            }): string {
              return value.dataset.data[value.dataIndex] >= 95 ? "bottom" : "top";
            },
            formatter: function(value: number): string {
              return value + "%";
            }
          }
        }
      }}
      width={650}
      height={400}
    />
  );
}

TeacherLineTrends.propTypes = {
  data: PropTypes.func.isRequired,
  completed: PropTypes.func.isRequired
}

export default (TeacherLineTrends);