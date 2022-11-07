import {
    Button,
    FormControl,
    FormHelperText,
    Grid,
    Item,
    Input,
    InputLabel,
    Typography,
    withStyles,
    MenuItem,
    Select,
    TextField,
    Checkbox,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Tab,
    Tabs,
    Radio,
    RadioGroup
} from '@material-ui/core'

import CalendarIcon from '../../assets/icons/CalendarIcon.png';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import * as React from 'react';
import { Component } from 'react';
import Firebase, { FirebaseContext } from '../../components/Firebase'

import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

import GraphHeader from '../LayoutComponents/GraphLayouts/GraphHeader'
import { Line } from 'react-chartjs-2'
import DetailsTable from './DetailsTable';
import CHALKLogoGIF from '../../assets/images/CHALKLogoGIF.gif';




const centerRow = {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    marginBottom: 8
}
const startRow = {
    display:'flex',
    alignItems:'center',
    justifyContent:'flex-start',
    marginBottom: 8
}
const endRow = {
    display:'flex',
    alignItems:'center',
    justifyContent:'flex-end',
    marginBottom: 8
}


const startColumn = {
  display:'flex',
  flexDirection: 'column',
  alignItems:'flex-start',
  justifyContent:'flex-start',
  marginBottom: 8
}

const centerColumn = {
  display:'flex',
  flexDirection: 'column',
  alignItems:'center',
  justifyContent:'flex-start',
  marginBottom: 8
}

// Array used to match the name of a practice to the value that's saved
const practicesArr = {
  "transitionTime": "Transition Time",
  "classroomClimate": "Classroom Climate",
  "mathInstruction": "Math Instruction",
  "levelOfInstruction": "Level of Instruction",
  "studentEngagement": "Student Engagement",
  "listeningToChildren": "Listening to Children",
  "sequentialActivities": "Sequential Activities",
  "foundationSkills": "Foundation Skills",
  "writing": "Writing",
  "bookReading": "Book Reading",
  "languageEnvironment": "Language Environment",
  "associativeAndCooperative": "Associative and Cooperative",
}



class CoachProfileResults extends React.Component {

  constructor(props){
      super(props);
      this.state = {
        lineGraphData: {},
        tabState: 0,
        reportDate: new Date(),
        siteCoaches: [],
        teacherInfo: [],
        teacherNames: [],
        BQData: [],

        averages: [],
        trends: [],
        trendsDataSet: [
          {
            label: 'Dataset 1',
            data: [2,7,3,5,4,6,8,2,7,8,9,1],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
        lineColors: [],
      }
  }

  componentDidMount(): void {
    const firebase = this.context;

    // Save the teacher id's as an array so we can pass it to the table
    var selectedTeacherIds;
    var selectedTeachers;
    if(this.props.selectedTeacher === "all")
    {
      // Save the ID's of all the teachers
      selectedTeacherIds = this.props.teacherOptions.map(teacher => { if(teacher.id !== "all"){return teacher.id} } );
      selectedTeachers = this.props.teacherOptions.filter(teacher => teacher.id !== "all" );
    }
    else
    {
      selectedTeacherIds = [this.props.teacherOptions.find(x => x.id === this.props.selectedTeacher).id];
      selectedTeachers = [this.props.teacherOptions.find(x => x.id === this.props.selectedTeacher)];
    }

    // Save the IDs
    this.setState({selectedTeachers: selectedTeachers, selectedTeacherIds: selectedTeacherIds});

    // Get the info from BigQuery
    this.getResultsFromBQ(selectedTeacherIds);


  }


  /*
   * Get all the Results data from each of the teachers between the two given dates
   */
  getResultsFromBQ = (teachers) => {
    const firebase = this.context;

    // This function is throwing an 'undefined' value in teachers for no reason, so we have to check for that
    teachers = teachers.filter(o => o !== undefined);

    // Grab results data
    firebase.fetchCoachProfileData({startDate: this.props.startDate, endDate: this.props.endDate, teacherIds: teachers, coachId: this.props.selectedCoach})
      .then( (data) => {
        this.setState({BQData: data});
      });

  }




   // Handle downloading the PDF
   downloadPDF = () => {
     console.log("Downloading!");
     const input = document.getElementById('CoachProfileResultsContainer');
      html2canvas(input)
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const imgWidth = 190;
          const pageHeight = 265;
          const imgHeight = canvas.height * imgWidth / canvas.width;
          let heightLeft = imgHeight;
          const pdf = new jsPDF('p', 'mm', 'a4', true); // true compresses the pdf
          let position = 10;
          pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
          while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
          }

          const currDate = new Date();


          pdf.save("Coach_Profile_Results_" + currDate.getMonth() + '_' + currDate.getDate() + "_" + currDate.getFullYear() + ".pdf");
        });
   }






    render() {

      return (
        <div id="CoachProfileResultsContainer">

        <Grid container style={{paddingLeft: '30px', paddingRight: '30px', marginBottom: '30px'}}>
            <Grid container>
                <Grid item xs={12} style={{paddingTop: 12}} onClick={() => this.props.handlePageChange(1)}>
                    <span>&#12296; Back to Report Criteria</span>
                </Grid>

                <Grid item xs={12}>
                    <h2>Coach Profile</h2>
                </Grid>

                {/*
                  Profile information section
                */}
                <Grid container item xs={12} style={startColumn}>
                  <Grid style={startRow}>Program: {this.props.selectedProgramName}</Grid>
                  <Grid style={startRow}>Coach: {this.props.selectedCoachName}</Grid>
                  <Grid style={startRow}>Teacher: {this.props.selectedTeacherName}</Grid>
                  <Grid style={startRow}>Report Period: {this.props.startDate.toLocaleString("en-US", {month: "long", year: "numeric", day: "numeric", timeZone: 'UTC'})} - {this.props.endDate.toLocaleString("en-US", {month: "long", year: "numeric", day: "numeric", timeZone: 'UTC'})}</Grid>
                  <Grid style={startRow}>Generated on: {this.state.reportDate.toLocaleString("en-US", {month: "long", year: "numeric", day: "numeric", timeZone: 'UTC'})}</Grid>
                </Grid>

                {/*
                  Table
                */}
                <Grid container item xs={12} style={startColumn}>

                  <DetailsTable
                    selectedTeacher={this.props.selectedTeacher}
                    selectedCoach={this.props.selectedCoach}
                    selectedCoachName={this.props.selectedCoachName}
                    dataSet={this.state.BQData}
                    selectedTeachers={this.state.selectedTeachers}
                    firebase={this.context}
                    startDate={this.props.startDate}
                    endDate={this.props.endDate}
                    />
                </Grid>


                {/*
                  Download PDF button
                  */}
                <Grid item xs={12} style={centerRow}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.downloadPDF()}
                    >
                    Download as PDF
                  </Button>
                </Grid>
            </Grid>
        </Grid>
        </div>
        )
    }
  }

CoachProfileResults.contextType = FirebaseContext

export default CoachProfileResults;
