import React, { FunctionComponent } from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";

interface OwnProps {
  questionTextClass: string
  questions: string[]
}

type Props = OwnProps;

const BarChartLegend: FunctionComponent<Props> = (props) => {
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item style={{width: '100%'}}>
        <Grid container direction="row">
          <Grid item xs={11}>
            <Grid container direction="column" justify="center" alignItems="flex-start" style={{height:'100%'}}>
              {props.questions.map(question => {
                return (
                  <Grid key={question} item style={{height:'33%', paddingBottom: '1.8em'}}>
                    <Typography variant="subtitle1" className={props.questionTextClass}>
                      {question}
                    </Typography>
                  </Grid>
                )
              })}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BarChartLegend;
