import * as React from 'react'
import {
    Button,
    FormControl,
    Input,
    InputLabel,
    MenuItem,
    Select,
    makeStyles,
    Grid,
    withStyles,
    Typography,
} from '@material-ui/core'
import * as xlsx from 'xlsx'
import CHALKLogoGIF from '../../../assets/images/CHALKLogoGIF.gif'
import Firebase, { FirebaseContext } from '../../../components/Firebase'
import * as Types from '../../../constants/Types'
import AppBar from '../../../components/AppBar'
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import moment from 'moment'
import DateFnsUtils from '@date-io/date-fns'
import { connect } from 'react-redux'
import { Role } from '../../../state/actions/coach'

interface Props {
    isAdmin: boolean
}

interface State {
    loading: boolean
    selectedTables: Array<string>
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
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
        marginLeft: '1em',
    },
    select: {
        width: '15em',
    },
}))

/**
 *
 * @param event
 * @param setSelectedTables
 */
const handleChange = (
    event: React.ChangeEvent<{ value: unknown }>,
    setSelectedTables: Function
) => {
    const { value } = event.target
    setSelectedTables(value as string[])
}

const ISO_DATE_REG = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/

/**
 *
 */
const maybeTransformForTime = (
  record: string
): string => {
  if (ISO_DATE_REG.test(record)) {
    return new Date(record).toLocaleString('en-US', { timeZone:'America/New_York'} )
  } else {
    return record
  }
}

/**
 *
 * @param selectedTables
 * @param from
 * @param to
 * @param setLoading
 * @param firebase
 */
const generateExcel = async (
    selectedTables: Array<string>,
    from: string,
    to: string,
    setLoading: Function,
    firebase: object
) => {
    setLoading(true)
    const results = await Promise.all(
        selectedTables.map(async t => {
            return {
                table: t,
                data: await firebase.fetchExport(t, from, to),
            }
        })
    )

    const wb = xlsx.utils.book_new()
    results.forEach(r => {
        const wsName = r.table
        if (r.data.data) {
            const wsData = r.data.data.split('\n')
              .map(d => d.split(',').map(r => maybeTransformForTime(r)))
            const ws = xlsx.utils.aoa_to_sheet(wsData)
            xlsx.utils.book_append_sheet(wb, ws, wsName)
        }
    })

    xlsx.writeFile(wb, 'CoachingAppExport.xlsx')
    setLoading(false)
}

const StyledFormControl = withStyles(() => ({
    root: {
        marginBottom: '1.3rem',
    },
}))(FormControl)

/**
 * @return {ReactNode}
 */
const AdminPage = ({ isAdmin = false }): React.ReactNode => {
    const classes = useStyles()
    if (!isAdmin) {
        return (
            <div className={classes.root}>
                <FirebaseContext.Consumer>
                    {(firebase: Firebase): React.ReactNode => (
                        <AppBar firebase={firebase} />
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

    const [loading, setLoading] = React.useState(false)
    const [selectedTables, setSelectedTables] = React.useState([])
    const [from, setFrom] = React.useState(moment().add(-7, 'days'))
    const [to, setTo] = React.useState(moment())
    return (
        <div className={classes.root}>
            <FirebaseContext.Consumer>
                {(firebase: Types.FirebaseAppBar | null): React.ReactNode => (
                    <AppBar firebase={firebase} />
                )}
            </FirebaseContext.Consumer>
            {loading ? (
                <img src={CHALKLogoGIF} alt="Loading" width="80%" />
            ) : (
                <Grid container spacing={2} className={classes.container}>
                    <Grid item xs={12}>
                        <Typography>
                            Configure your export by selecting the tables to
                            export along with the date range to include.
                        </Typography>
                    </Grid>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid item xs={12}>
                            <StyledFormControl className={classes.formControl}>
                                <InputLabel id="demo-mutiple-name-label">
                                    Tables
                                </InputLabel>
                                <Select
                                    labelId="demo-mutiple-name-label"
                                    id="demo-mutiple-name"
                                    multiple
                                    className={classes.select}
                                    autoWidth={true}
                                    value={selectedTables}
                                    onChange={(
                                        event: React.ChangeEvent<
                                            HTMLSelectElement
                                        >
                                    ) => handleChange(event, setSelectedTables)}
                                    input={<Input />}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem value="ac">
                                        Associative Cooperative
                                    </MenuItem>
                                    <MenuItem value="climate">
                                        Classroom Climate
                                    </MenuItem>
                                    <MenuItem value="engagement">
                                        Engagement
                                    </MenuItem>
                                    <MenuItem value="level">Level</MenuItem>
                                    <MenuItem value="listening">
                                        Listening
                                    </MenuItem>
                                    <MenuItem value="math">Math</MenuItem>
                                    <MenuItem value="sequential">
                                        Sequential
                                    </MenuItem>
                                    <MenuItem value="transition">
                                        Transition
                                    </MenuItem>
                                    <MenuItem value="literacyFoundationalChild">
                                        Literacy - Foundational Child
                                    </MenuItem>
                                    <MenuItem value="literacyWritingChild">
                                        Literacy - Writing Child
                                    </MenuItem>
                                    <MenuItem value="literacyFoundationalTeacher">
                                        Literacy - Foundational Teacher
                                    </MenuItem>
                                    <MenuItem value="literacyLanguageTeacher">
                                        Literacy - Language Teacher
                                    </MenuItem>
                                    <MenuItem value="literacyReadingTeacher">
                                        Literacy - Reading Teacher
                                    </MenuItem>
                                    <MenuItem value="literacyWritingTeacher">
                                        Literacy - Writing Teacher
                                    </MenuItem>
                                </Select>
                            </StyledFormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <StyledFormControl>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    label="Start"
                                    margin="normal"
                                    id="date-picker-inline"
                                    autoOk={true} // closes date picker on selection
                                    value={from.toDate()}
                                    onChange={(date: Date | null): void => {
                                        setFrom(moment(date))
                                    }}
                                />
                            </StyledFormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <StyledFormControl>
                                <KeyboardDatePicker
                                    disableToolbar
                                    label="End"
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    autoOk={true} // closes date picker on selection
                                    value={to.toDate()}
                                    onChange={(date: Date | null): void => {
                                        setTo(moment(date))
                                    }}
                                />
                            </StyledFormControl>
                        </Grid>
                        <Grid item xs={6} />
                        <Grid item xs={2}>
                            <FirebaseContext.Consumer>
                                {firebase => (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={_ =>
                                            generateExcel(
                                                selectedTables,
                                                from.format('yyyy-MM-DD'),
                                                to.format('yyyy-MM-DD'),
                                                setLoading,
                                                firebase
                                            )
                                        }
                                    >
                                        Export
                                    </Button>
                                )}
                            </FirebaseContext.Consumer>
                        </Grid>
                    </MuiPickersUtilsProvider>
                </Grid>
            )}
        </div>
    )
}

export default connect(state => ({
    isAdmin: state.coachState.role === Role.ADMIN,
}))(AdminPage)
