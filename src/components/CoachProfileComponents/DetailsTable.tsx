import * as React from "react";

const practicesArr = {
  "transition": "Transition Time",
  "climate": "Classroom Climate",
  "math": "Math Instruction",
  "level": "Level of Instruction",
  "engagement": "Student Engagement",
  "listening": "Listening to Children",
  "sequential": "Sequential Activities",
  "literacyFoundationalChild": "Foundation Skills - Child",
  "literacyFoundationalTeacher": "Foundation Skills - Teacher",
  "literacyWritingChild": "Writing - Child",
  "literacyWritingTeacher": "Writing - Teacher",
  "literacyReadingTeacher": "Book Reading",
  "literacyLanguageTeacher": "Language Environment",
  "ac": "Associative and Cooperative",
}

const tableStyle = {
  'border': 'solid 1px rgb(234, 234, 234)',
  'border-collapse': 'collapse'
}

const tdStyle = {
  'border': 'solid 1px rgb(234, 234, 234)',
  padding: '8px',
  fontSize: '12px',
  'text-align': 'left'
}

class DetailsTable extends React.Component<Props, {}> {
  /**
   * @param {Props} props
   */
  constructor(props) {
    super(props);
    this.state = {
      selectedTeachers: [],
      observations: [],
      observationsRow: [],
      teacherRows: [],
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.dataSet !== this.props.dataSet) {

      var teachers = this.props.selectedTeachers;
      var data = this.props.dataSet;

      this.setState({selectedTeachers: teachers});
      this.setState({data: this.props.dataSet});

      // Let's set the observation types that are available so we know which ones to add to the table
      var observations = [...new Set(data.map(item => item.type))];

      // Sort it just so it's in the same order every time
      observations.sort();
      this.setState({observations: observations});

      // Build the observation header tds
      var observationsRow = [];
      observations.forEach(item => {
        observationsRow.push(<td style={tdStyle}>{practicesArr[item]}</td>);

      });
      this.setState({observationsRow: observationsRow});

      // Get the total observation count for each teacher
      this.getTotalCount(teachers, data, observations);


    }
  }

  getTotalCount = (teachers, data, observations) => {
    // Get total number of observations for each teacher
    var count = {};

    // Initialize count for each teacher
    teachers.forEach(item => {
      count[item.id] = {total: 0};
    });

    // Build total count
    data.forEach(item => {
      var tempTeacher = item.teacher.split("/")[2];

      count[tempTeacher].total += item.count;
    });

    this.setState({count: count});

    // Set the rows for the teachers
    this.buildTeacherRows(teachers, data, observations, count);
  }


  buildTeacherRows = (teachers, data, observations, count) => {

    var teacherRows = [];

    teachers.forEach(teacher => {
      var tempRow;
      console.log("TEACHER -> " + teacher.firstName);

      //tempRow = <tr><td><h1>SWWEEEET</h1></td></tr>;
      var tempObservationData = [];
      for (var observationIndex in observations) {
        var observation = observations[observationIndex];

        var tempTeacher = "/user/" + teacher.id;

        // Find the data we're looking for
        var tempData = data.find(item => item.teacher === tempTeacher && item.type === observation);

        console.log("TempDATA : ", tempData);

        var tempTd;
        if(tempData)
        {
          tempTd = <td style={tdStyle}>{tempData.count}</td>;
        }
        else
        {
          tempTd = <td style={tdStyle}>0</td>
        }
        tempObservationData.push(tempTd);
      }

      teacherRows.push(<tr><td style={tdStyle}>{teacher.firstName}  {teacher.lastName}</td><td style={tdStyle}>{count[teacher.id].total}</td><td style={tdStyle}></td><td style={tdStyle}></td>{tempObservationData}</tr>);
    });

    this.setState({teacherRows: teacherRows});

  }



  render(){

    // Create the header
    var header1 = this.props.selectedTeacher == "all" ? <span>Coach: <b>{this.props.selectedCoachName}</b></span> : <span></span>;
    var header2 = this.props.selectedTeacher == "all" ? <span><b>Observations by CHALK Classroom Practice</b></span> : <span>Focal Classroom Practice</span>;

    // The first 4 tds in the second row
    var header3 = this.props.selectedTeacher == "all" ? ["Teacher", "Number of Observations", "Average Duration of Observation", "Number of Goals Met"] : ["Coach", "Teacher", "Number of Observations", "Number of Action Plans"];

    return (
      <div style={{'overflow-x': 'auto', 'max-width': '80vw', paddingBottom: '20px'}}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th colSpan={4} style={tdStyle}>{header1}</th>
              <th colSpan={this.state.observations.length}  style={tdStyle}>{header2}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyle}>{header3[0]}</td>
              <td style={tdStyle}>{header3[1]}</td>
              <td style={tdStyle}>{header3[2]}</td>
              <td style={tdStyle}>{header3[3]}</td>
              {this.state.observationsRow}
            </tr>
            {this.state.teacherRows}
          </tbody>

        </table>
      </div>
    )
  }

}

export default DetailsTable;
