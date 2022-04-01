import * as React from 'react'
import {useState} from 'react'
import {FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, Typography,} from '@material-ui/core'
import CHALKLogoGIF from '../../../assets/images/CHALKLogoGIF.gif'
import Firebase, {FirebaseContext} from '../../../components/Firebase'
import AppBar from '../../../components/AppBar'
import {connect} from 'react-redux'
import {Role} from '../../../state/actions/coach'
import BasicExport from "../../../components/AdminComponents/BasicExport";
import ActionPlanExport from "../../../components/AdminComponents/ActionPlanExport";

interface Props {
  isAdmin: boolean
}

interface State {
  loading: boolean
  selectedTables: Array<string>
}

type ToolSelect = {
  [key: string]: JSX.Element
}


const useStyles = makeStyles(_ => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    flexDirection: 'column',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  formControl: {
    minWidth: 120,
  },
  comparisonText: {
    paddingLeft: '1em',
    lineHeight: '0.8em',
    fontFamily: 'Arimo',
  },
  container: {
    marginLeft: '0',
  },
  select: {
    width: '15em',
  },
 toolSelect: {
    margin: '2rem 0',
 },
 toolGrid: {
    marginLeft: '2rem',
   margin: '2rem 0'
 }
}))


/**
 * @return {ReactNode}
 */
const AdminPage = ({isAdmin = false}): React.ReactNode => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [tool, setTool] = useState('none')

  const toolSelect: ToolSelect = {
    basic:  <BasicExport setLoading={setLoading} classes={classes}/>,
    actionPlan: <ActionPlanExport setLoading={setLoading} classes={classes}/>,
    none: <></>
  }


  if (!isAdmin) {
    return (
      <div className={classes.root}>
        <FirebaseContext.Consumer>
          {(firebase: Firebase): React.ReactNode => (
            <AppBar firebase={firebase}/>
          )}
        </FirebaseContext.Consumer>
        <Grid container spacing={2} className={classes.container}>
          <Grid item xs={12}>
            <Typography>
              You must be an admin to access this page.
            </Typography>
          </Grid>
        </Grid>
      </div>
    )
  }


  return (
    <div className={classes.root}>
      <FirebaseContext.Consumer>
        {(firebase: Firebase): React.ReactNode => (
          <AppBar firebase={firebase}/>
        )}
      </FirebaseContext.Consumer>
        <Grid container spacing={2} direction={"column"} className={classes.toolGrid}>
          <Grid item xs={2}>
            <Typography variant={'h4'}>
            Select a Tool:
            </Typography>
          </Grid>
          <Grid item xs={3} className={classes.toolSelect}>
          <FormControl fullWidth>
            <InputLabel id={'export-tool-select-label'}>Export Tool</InputLabel>
            <Select
              autoWidth={true}
            labelId={'export-tool-select-label'}
            id={'export-tool-select'}
            value={tool}
            onChange={(e)=> setTool(e.target.value)}
            >
              <MenuItem value={'basic'}>Basic</MenuItem>
              <MenuItem value={'actionPlan'}>Action Plan</MenuItem>
              <MenuItem value={'none'}>None</MenuItem>
            </Select>
          </FormControl>
          </Grid>
          <div>
            {loading ? (
              <img src={CHALKLogoGIF} alt="Loading" width="50%"/>
            ) :
              toolSelect[tool]
            }
          </div>
        </Grid>
    </div>
  )
}

export default connect(state => ({
  isAdmin: state.coachState.role === Role.ADMIN,
}))(AdminPage)
