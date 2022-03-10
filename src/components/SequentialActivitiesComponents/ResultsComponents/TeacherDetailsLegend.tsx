import React, { FunctionComponent } from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";

interface OwnProps {
  questionTextClass: string
}

type Props = OwnProps;

const TeacherDetailsLegend: FunctionComponent<Props> = (props) => {

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item style={{ width: '100%' }}>
        <Grid container direction="row">
          <Grid item xs={11}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="flex-start"
              style={{ height: '100%' }}
            >
              <Grid
                item
                style={{ height: '33%', paddingBottom: '2em' }}
              >
                <Typography
                  variant="subtitle1"
                  className={props.questionTextClass}
                >
                  Was there a strategy the teacher used more often to
                  support children&apos;s sequential activities?
                </Typography>
              </Grid>
              <Grid
                item
                style={{ height: '33%', paddingTop: '0.5em' }}
              >
                <Typography
                  variant="subtitle1"
                  className={props.questionTextClass}
                >
                  Was there a strategy the teacher used less often?
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TeacherDetailsLegend;
