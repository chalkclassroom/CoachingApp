import * as React from 'react'
import { Button, FormControl, Input, InputLabel, MenuItem, Select } from '@material-ui/core'
import * as xlsx from 'xlsx'
import CHALKLogoGIF from '../../../assets/images/CHALKLogoGIF.gif'

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


/**
 *
 */
class AdminPage extends React.Component<Props, State> {

    /**
     *
     * @param {Props} props
     */
    constructor(props: Props) {
        super(props)
        this.state = {
            loading: false,
            selectedTables: [],
        }
    }

    /**
     *
     */
    async generateExcel() {
        this.setState({ loading: true })
        const results = await Promise.all(this.state.selectedTables.map(async t => {
            return {
                table: t,
                data: await this.context.fetchExport(t),
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
        this.setState({ loading: true })
    }

    /**
     *
     * @param {Event} event
     */
    handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const { options } = event.target
        const value = []
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value)
            }
        }
        this.setState({ selectedTables: value })
    };

    /**
     * @return {ReactNode}
     */
    render(): React.ReactNode {

        return <div>
            {this.state.loading ? <img src={CHALKLogoGIF} alt="Loading" width="80%" /> :
                <React.Fragment>
                    <FormControl>
                        <InputLabel id="demo-mutiple-name-label">Name</InputLabel>
                        <Select
                            labelId="demo-mutiple-name-label"
                            id="demo-mutiple-name"
                            multiple
                            value={this.state.selectedTables}
                            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => this.handleChange(event)}
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
                    <Button onClick={(_) => this.generateExcel()}>Export</Button>
                </React.Fragment>
            }
        </div>
    }
}

export default AdminPage