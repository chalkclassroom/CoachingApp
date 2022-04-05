import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import {generateActionPlanXlsx, generateConferencePlanXlsx} from "../../services/xlsxGenerator";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Firebase, { FirebaseContext } from '../Firebase';
import * as xlsx from 'xlsx'
import {Select, MenuItem, FormControl, InputLabel, FormControlLabel, Typography} from "@material-ui/core";

const ALL_COACH_VALUE = "ALL_COACHES"

interface OwnProps {
  setLoading: Function
  classes: {container: string}
}

type Props = OwnProps;

type Coach = {
  firstName: string
  lastName: string
  id: string
}



const getCoaches = async (firebase:Firebase):Promise<Coach[]> => {
  let coaches = await firebase.getCoaches()
  return coaches.map(coach => {
    return {
      firstName: coach.firstName,
      lastName: coach.lastName,
      id: coach.id
    }
  })

}

const ConferencePlanExport: FunctionComponent<Props> = (props) => {
  const {classes, setLoading} = props
  const [coachId, setCoachId] = useState(ALL_COACH_VALUE)
  const [coachList, setCoachList] = useState<Coach[]>([])
  const firebase = useContext(FirebaseContext)

  useEffect( () => {
    (async () =>{
      setCoachList( await getCoaches(firebase))
    })()
    return () => {
    }
  },[])

  const handleExport = async (id: string) => {
    setLoading(true)
    let rows = await firebase.getConferencePlansForExport(id !== ALL_COACH_VALUE ? id : undefined)
    let wb = generateConferencePlanXlsx(rows)
    xlsx.writeFile(wb, 'Conference_Plans.xlsx')
    setLoading(false)
  }

  const handleChange = (e) => {
    setCoachId(e.target.value)}


  return (
    <Grid container direction={'column'} spacing={2} className={classes.container}>
      <Grid item xs={3}>
        <Typography>
          Export conference plans created by one or all coaches
        </Typography>
      </Grid>
      <Grid item xs={3}>

        <FormControl fullWidth>
          <InputLabel id={'coach-select-label'}>Select a Coach</InputLabel>
          <Select
            labelId={'coach-select-label'}
            id={'coach-select'}
            value={coachId}
            label={'Coach'}
            onChange={handleChange}>
            <MenuItem value={ALL_COACH_VALUE}>All</MenuItem>
            {coachList.map(coach => <MenuItem value={coach.id} key={coach.id}>{`${coach.firstName} ${coach.lastName}`}</MenuItem>)}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleExport(coachId)}>
          Export
        </Button>
      </Grid>
    </Grid>
  );
};

export default ConferencePlanExport;
