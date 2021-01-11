import * as React from 'react'
import { Button, FormControl, Input, InputLabel, MenuItem, Select, makeStyles } from '@material-ui/core'
import * as xlsx from 'xlsx'
import CHALKLogoGIF from '../../../assets/images/CHALKLogoGIF.gif'
import { FirebaseContext } from '../../../components/Firebase'
import * as Types from '../../../constants/Types'

interface Props {
    isAdmin: boolean
}

interface State {
    loading: boolean,
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
        height: "100vh",
        flexDirection: "column",
        overflowX: 'hidden',
        overflowY: 'auto'
    },
    formControl: {
      minWidth: 120
    },
    comparisonText: {
        paddingLeft: '1em',
        lineHeight: '0.8em',
        fontFamily: 'Arimo'
    }
}));


/**
 *
 * @param {Event} event
 */
const handleChange = (event: React.ChangeEvent<{ value: unknown }>, setSelectedTables: Function) => {
    const { value } = event.target
    setSelectedTables(value as string[])
};

/**
 *
 */
const generateExcel = async (selectedTables: Array<string>, setLoading: Function, firebase: object) => {
    setLoading(true)
    const results = await Promise.all(selectedTables.map(async t => {
        return {
            table: t,
            data: await firebase.fetchExport(t),
        }
    }))

    const wb = xlsx.utils.book_new()
    results.forEach(r => {
        const wsName = r.table
        const wsData = r.data.split('\n').map(d => d.split(','))
        const ws = xlsx.utils.aoa_to_sheet(wsData)
        xlsx.utils.book_append_sheet(wb, ws, wsName)
    })

    xlsx.writeFile(wb, 'CoachingAppExport.xlsx')
    setLoading(false)
}
/**
 * @return {ReactNode}
 */
const AdminPage = ():React.ReactNode => {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [selectedTables, setSelectedTables] = React.useState([])
    return <div className={classes.root}>
        {loading ? <img src={CHALKLogoGIF} alt="Loading" width="80%" /> :
            <React.Fragment>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-mutiple-name-label">Name</InputLabel>
                    <Select
                        labelId="demo-mutiple-name-label"
                        id="demo-mutiple-name"
                        multiple
                        value={selectedTables}
                        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => handleChange(event, setSelectedTables)}
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
                        <MenuItem value="level">
                            Level
                        </MenuItem>
                        <MenuItem value="listening">
                            Listening
                        </MenuItem>
                        <MenuItem value="math">
                            Math
                        </MenuItem>
                        <MenuItem value="Sequential">
                            Sequential
                        </MenuItem>
                        <MenuItem value="Transition">
                            Transition
                        </MenuItem>
                    </Select>
                </FormControl>
                <FirebaseContext.Consumer>
                    {firebase => (
                        <Button
                            onClick={(_) => generateExcel(selectedTables, setLoading, firebase)}>Export</Button>)}
                </FirebaseContext.Consumer>
            </React.Fragment>
        }
    </div>
}

export default AdminPage