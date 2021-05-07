import * as React from 'react';
import * as PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Collapse, Button, Divider } from "@material-ui/core";

interface Props {
  handleBegin(checklistType?: string): void,
  checklistType: string
  type: number,
  literacyType: number,
  teacherInstruction1: string,
  teacherInstruction2: string,
  childInstruction1: string,
  childInstruction2: string
}

/**
 * Collapsible Instructions and Begin Observation Buttons for Literacy Types
 * @function LiteracyObservationOptions
 * @param {Props} props
 * @return {ReactElement}
 */
function LiteracyObservationOptions(props: Props): React.ReactElement {
  const {
    handleBegin,
    checklistType,
    type,
    literacyType,
    teacherInstruction1,
    teacherInstruction2,
    childInstruction1,
    childInstruction2
  } = props;
  return (
    <Collapse in={literacyType===type}>
      <Grid item>
        <Grid container direction='row' justify='center' alignItems='center'>
          <Grid item xs={5}>
            <Typography variant="h6" align="left" style={{fontFamily: 'Arimo'}}>
              <ul>
                <li>
                  {teacherInstruction1}
                </li>
                <li>
                  {teacherInstruction2}
                </li>
              </ul>
            </Typography>
            <Grid container direction="row" justify="center" alignItems="center">
              <Button onClick={(): void => {handleBegin(checklistType + 'Teacher')}} variant="contained" color="primary">
                BEGIN TEACHER OBSERVATION
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={2} style={{height: '100%'}}>
            <Grid container direction="row" justify="center" alignItems="center">
              <Divider orientation="vertical" flexItem style={{height: '5em'}} />
            </Grid>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h6" align="left" style={{fontFamily: 'Arimo'}}>
              <ul>
                <li>
                  {childInstruction1}
                </li>
                <li>
                  {childInstruction2}
                </li>
              </ul>
            </Typography>
            <Grid container direction="row" justify="center" alignItems="center">
              <Button onClick={(): void => {handleBegin(checklistType + 'Child')}} variant="contained" color="primary">
                BEGIN CHILD OBSERVATION
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Collapse>
  );
}

LiteracyObservationOptions.propTypes = {
  handleBegin: PropTypes.func.isRequired,
  checklistType: PropTypes.string.isRequired,
  type: PropTypes.number.isRequired,
  literacyType: PropTypes.number.isRequired,
  teacherInstruction1: PropTypes.string.isRequired,
  teacherInstruction2: PropTypes.string.isRequired,
  childInstruction1: PropTypes.string.isRequired,
  childInstruction2: PropTypes.string.isRequired
}

export default LiteracyObservationOptions;