import React, { FunctionComponent } from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import TeacherBarDetails from "./TeacherBarDetails";
import TeacherDetailsHeader from "./TeacherDetailsHeader";
import TeacherDetailsLegend from "./TeacherDetailsLegend";

interface OwnProps {
  questionTextClass: string
  teacher1: number
  teacher2: number
  teacher3: number
  teacher4: number
  totalVisits: number
}

type Props = OwnProps;

const TeacherDetailsChart: FunctionComponent<Props> = (props) => {

  return (
    <div>
      <Grid justify={'center'} direction={'column'}>
        <TeacherDetailsHeader/>
        <TeacherDetailsLegend questionTextClass={props.questionTextClass}/>
        <TeacherBarDetails
          teacher1={props.teacher1}
          teacher2={props.teacher2}
          teacher3={props.teacher3}
          teacher4={props.teacher4}
          totalVisits={props.totalVisits}
        />
      </Grid>
    </div>
  );
};

export default TeacherDetailsChart;
