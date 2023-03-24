import * as React from "react";
import { Bar } from "react-chartjs-2";

interface Props {
    data: Array<Object>
    LI: String
}

interface State {
    teacherNames: Array<String>
    chartTitle: String
    barColors: Array<String>
    averageLineWrapStyle: {
        display: String
        alignItems: String
        justifyContent: String
        marginBottom: Number
        height: String
        width: String
        position: String
        left: String
        top: String
    }
    dataSets: Array<Object>
}


/**
 * Horizontal Bar Graph for LiteracyInstructionBarDetails
 * @class LiteracyInstructionBarDetails
 * @return {void}
 */
class LiteracyInstructionBarDetails extends React.Component<Props, State> {
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      teacherNames: [],
      chartTitle: "",
      barColors: [],
      averageLineWrapStyle: {
          display:'flex',
          alignItems:'center',
          justifyContent:'flex-start',
          marginBottom: 8,
          height: '20px',
          width: '96%',
          position: 'absolute',
          left: '95px',
          top: '36px',
      },
      dataSets: []
    }
  }

  // What to do when the data is recieved
  componentDidUpdate(nextProps) {
    const { data} = this.props

    if (nextProps.data !== data) {
      this.setData();
    }
  }

  componentDidMount = () => {
    this.setData();
  }

  setData = () => {
    const { data } = this.props

    let for_sorting = [];
    let teacherNames = [];
    let literacyInstruction = [];
    let noBehaviors = [];

    for(let teacherIndex in data)
    {
      let teacher = data[teacherIndex];
      // teacherNames.push(teacher.name);
      if(teacher.name === "Site Average" || teacher.name === undefined)
      {
        continue;
      }


      let literacy = (Math.round((teacher['totalInstruction'] + Number.EPSILON) * 100) / 100);
      let noB = (Math.round((teacher['noBehaviors'] + Number.EPSILON) * 100) / 100);

      for_sorting.push([teacher.name, literacy, noB])

    }

    for_sorting.sort((a,b) => (b[0].split(' ')[1].charAt(0) < a[0].split(' ')[1].charAt(0)) ? 1 : ((a[0].split(' ')[1].charAt(0) < b[0].split(' ')[1].charAt(0)) ? -1 : 0))
    for (let index = 0; index < for_sorting.length; index++) {
      teacherNames.push(for_sorting[index][0])
      literacyInstruction.push(for_sorting[index][1])
      noBehaviors.push(for_sorting[index][2])
    }

    teacherNames.push("Site Average")

    let dataSize = Object.keys(data).length
    let siteAverageLiteracyInstruction = new Array(dataSize).fill(0)
    let siteAverageNoBehaviors = new Array(dataSize).fill(0)
    
    siteAverageLiteracyInstruction[dataSize - 1] = Math.round((data.siteBar.totalInstruction + Number.EPSILON) * 100) / 100;
    siteAverageNoBehaviors[dataSize - 1] = Math.round((data.siteBar.noBehaviors + Number.EPSILON) * 100) / 100;

    let instructionLabel = "";
    let siteAverageInstructionLabel = "";

    switch(this.props.LI) {
        case  "foundationSkills":
            instructionLabel = "Foundational Skills Instruction";
            siteAverageInstructionLabel = "Foundational Skills Site Average";
            break;
        case  "writing":
            instructionLabel = "Writing Instruction";
            siteAverageInstructionLabel = "Writing Site Average";
            break;
        case  "bookReading":
            instructionLabel = "Book Reading Instruction";
            siteAverageInstructionLabel = "Book Reading Site Average";
            break;
        case  "languageEnvironment":
            instructionLabel = "Supporting Language Development";
            siteAverageInstructionLabel = "Supporting Language Development Site Average";
            break;
    }

    // Use that data to create our dataset
    var dataSets = [
      {
        label: instructionLabel,
        data: literacyInstruction,
        backgroundColor: "#C4395A",
      },
      {
        label: 'No Target Behaviors Observed',
        data: noBehaviors,
        backgroundColor: "#E5E5E5",
      },

      // The total Site Averages
      {
        label: siteAverageInstructionLabel,
        data: siteAverageLiteracyInstruction,
        backgroundColor: "#FFF",
        borderColor: "#C4395A",
        borderWidth: 4,
      },
      {
        label: 'No Target Behaviors Observed Site Average',
        data: siteAverageNoBehaviors,
        backgroundColor: "#FFF",
        borderColor: "#E5E5E5",
        borderWidth: 4,
      },
    ]

    this.setState({teacherNames: teacherNames, dataSets: dataSets});

  }


  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const childBehaviorsData = {
      labels: this.state.teacherNames,
      datasets: this.state.dataSets
    };

    // Adds some space between the legend
    const plugin = {
      beforeInit(chart) {
        // Get reference to the original fit function
        const originalFit = chart.legend.fit;

        // Override the fit function
        chart.legend.fit = function fit() {
          // Call original function and bind scope in order to use `this` correctly inside it
          originalFit.bind(chart.legend)();
          // Change the height as suggested in another answers
          this.height += 30;
        };
      }
    };

    let width = this.props.id == "actual" ? 300 + this.state.teacherNames.length *160 : "100%"

    return (
      <div style={{padding: '30px 30px 0px 30px', marginTop: '30px', overflowX: 'scroll', maxWidth: '70vw',}}>
        <h2 style={{width: '100%', textAlign: 'center', position: 'absolute', top: '0'}}>Literacy Instruction</h2>
        <div className={"realChart"} style={{height: 500, width: width}}>
          <Bar
            data={childBehaviorsData}
            options={{
              animation: {
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      display:true,
                      min: 0,
                      max: 100,
                      stepSize: 10,
                      fixedStepSize: 1,
                      fontSize: 16,
                      fontColor: 'black',
                      padding: 20,
                      // Include a percent sign in the ticks
                      callback: function(value, index, values) {
                          return value + '%';
                      },
                    },
                    scaleLabel: {
                      display: false,
                      labelString: '',
                      fontSize: 16,
                      fontColor: 'black'
                    },
                    stacked: true,
                    gridLines: {
                      drawBorder: false,
                      drawTicks: false,
                    }
                  }
                ],
                xAxes: [
                  {
                    ticks: {
                      fontSize: 16,
                      fontColor: 'black',
                      callback: (value, index, values) => {
                        return value
                      }
                    },
                    stacked: true,
                    gridLines: {
                      display: false,
                      color: "rgba(0,0,0,0)",
                    }
                  }
                ]
              },
              legend: {
                display: true,
                labels: {
                  filter: function(legendItem, data) {
                        return !legendItem.text.includes('Site Average')
                  },
                  padding: 20,
                  boxWidth: 12,
                },
                position: 'bottom',
              },
              title: {
                text: this.state.chartTitle,
                fontSize: 14,
                fontColor: 'black',
                fontFamily: 'Arimo',
                fontStyle: "bold"
              },
              plugins: {
                datalabels: {
                  display: 'auto',
                  color: 'black',
                  font: {
                    size: 14,
                    weight: '400'
                  },
                  formatter: function(value: number): number | null {
                    if (value > 0) {
                      return value + "%";
                    } else {
                      return null;
                    }
                  }
                },

              },
              maintainAspectRatio: false
            }}
            plugins={[plugin]}
          />
        </div>
      </div>
    );
  }
}


export default LiteracyInstructionBarDetails;
