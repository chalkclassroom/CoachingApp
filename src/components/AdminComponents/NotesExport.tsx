import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import {generateNotesXlsx} from "../../services/xlsxGenerator";
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
  observationId: string
  coachId: string
  teacherId: string
  dateModified: Date | null
  tool: string
  noteId: string
  timestamp: Date | null
  content: string
}


const NotesExport: FunctionComponent<Props> = (props) => {
  const {classes, setLoading} = props
  const [exportNotReady, setExportNotReady] = useState<bool>(true)
  const [notesList, setNotesList] = useState<ROW[]>([])
  const didMount = React.useRef(false);
  const firebase = useContext(FirebaseContext)

  useEffect( () => {

    (async () =>{
      var notes = await firebase.getNotesForExport()
      setNotesList(notes)
    })()
    return () => {
    }

  },[])


  // Activate the export button when the data is ready
  useEffect( () => {

    // Don't run on initial render
    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    // The data isn't quite finished saving to state. Wait til it is
    var checker = setInterval(() => {
      if(notesList.length > 0)
      {
        setExportNotReady(false);
        clearInterval(checker);
      }
    }, 100);

  },[notesList]);

  const handleExport = async () => {
    setLoading(true)
    let wb = generateNotesXlsx(notesList)
    xlsx.writeFile(wb, 'Notes.xlsx')
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
      onClick={() => handleExport()}
      disabled={exportNotReady}
      >
      Export
    </Button>
      </Grid>
    </Grid>
  );
};

export default NotesExport;
