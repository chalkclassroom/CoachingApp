import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import {generateEmailXlsx} from "../../services/xlsxGenerator";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { FirebaseContext } from '../Firebase';
import * as xlsx from 'xlsx'
import { Typography } from "@material-ui/core";



interface OwnProps {
  setLoading: Function
  classes: {container: string}
}

type Props = OwnProps;

type ROW = {
  email: string
  timestamp: Date | null
}


const MailingListExport: FunctionComponent<Props> = (props) => {
  const {classes, setLoading} = props
  const [emailList, setEmailList] = useState<ROW[]>([])
  const firebase = useContext(FirebaseContext)

  useEffect( () => {
    (async () =>{
     setEmailList( await firebase.getEmailForExport())
    })()
    return () => {
    }
  },[])

  const handleExport = async () => {
    setLoading(true)
    console.log(emailList)
    let wb = generateEmailXlsx(emailList)
    xlsx.writeFile(wb, 'MailingList.xlsx')
    setLoading(false)

  }


  return (
    <Grid container direction={'column'} spacing={2} className={classes.container}>
    <Grid item xs={3}>
      <Typography>
        Please wait a few seconds to allow the data to load.
      </Typography>
      </Grid>
      <Grid item xs={3}></Grid>
    <Grid item xs={3}>
    <Button
      variant="contained"
      color="primary"
      onClick={() => handleExport()}>
      Export
    </Button>
      </Grid>
    </Grid>
  );
};

export default MailingListExport;
