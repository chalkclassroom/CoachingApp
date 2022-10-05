import * as React from 'react'
import * as PropTypes from 'prop-types'
import ReactRouterPropTypes from 'react-router-prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import LiteracySummaryChart from './ResultsComponents/LiteracySummaryChart'
import { connect } from 'react-redux'
import { clearTeacher } from '../../state/actions/teacher'
import { clearLiteracyCount } from '../../state/actions/literacy-instruction'
import { MuiThemeProvider } from '@material-ui/core/styles'
import * as Constants from '../../constants/Constants'
import { LiteracyTypes } from '../../constants/Constants'
import * as Types from '../../constants/Types'
import * as H from 'history'
import { PieWrapperDialog } from '../ResultsComponents/ChartWrappers'

interface Props {
    open: boolean,
    history: H.History,

    clearTeacher(): void,

    literacyCount: number,
    noLiteracyCount: number,

    clearLiteracyCount(): void,

    literacyType: string | undefined
}

/**
 * Translates the subtype to the {LiteracyTypes} constant
 * @param {string} literacyType
 * @return {LiteracyTypes}
 */
function getLiteracyType(literacyType: string | undefined): LiteracyTypes {
    switch (literacyType) {
        case 'FoundationalTeacher':
        case 'FoundationalChild':
            return LiteracyTypes.FOUNDATIONAL
        case 'WritingTeacher':
        case 'WritingChild':
            return LiteracyTypes.WRITING
        case 'ReadingTeacher':
        case 'ReadingChild':
            return LiteracyTypes.READING
        case 'LanguageTeacher':
        case 'LanguageChild':
            return LiteracyTypes.LANGUAGE
        default:
            return LiteracyTypes.NONE
    }
}

/**
 * @param {Props} props
 * @return {ReactElement}
 */
function LiteracyResultsDialog(props: Props): React.ReactElement {
    const {
        open,
        history,
        clearTeacher,
        literacyCount,
        noLiteracyCount,
        clearLiteracyCount,
        literacyType,
    } = props

    return (
        <div>
            <Dialog
                open={open}
                disableBackdropClick
            >
                <DialogTitle style={{ fontFamily: 'Arimo' }}>
                    Results Preview
                </DialogTitle>
                <DialogContent>
                    <PieWrapperDialog>
                        <LiteracySummaryChart
                            literacy={literacyCount}
                            noLiteracy={noLiteracyCount}
                            type={getLiteracyType(literacyType)}
                        />
                    </PieWrapperDialog>
                </DialogContent>
                <Grid container direction="row" justify="space-around" alignItems="center"
                      style={{ paddingBottom: '1em' }}>
                    <Grid item>
                        <MuiThemeProvider theme={Constants.LiteracyTheme}>
                            <Button
                                style={{ fontFamily: 'Arimo' }}
                                onClick={(): void => {
                                    clearTeacher()
                                    clearLiteracyCount()
                                    history.push('/Home')
                                }}
                            >
                                Return Home
                            </Button>
                        </MuiThemeProvider>
                    </Grid>
                    <Grid item>
                        <MuiThemeProvider theme={Constants.LiteracyTheme}>
                            <Button
                                color="primary"
                                variant="contained"
                                style={{ fontFamily: 'Arimo' }}
                                onClick={async () => {
                                    const delay = ms => new Promise(res => setTimeout(res, ms));
                                    await delay(3000);
                                    history.push(`/LiteracyInstructionResults`, {type: getLiteracyType(literacyType)})
                                    clearLiteracyCount()
                                }}
                            >
                                View Results
                            </Button>
                        </MuiThemeProvider>
                    </Grid>
                </Grid>
            </Dialog>
        </div>
    )
}

const mapStateToProps = (state: Types.ReduxState): {
    literacyCount: number,
    noLiteracyCount: number
} => {
    return {
        literacyCount: state.literacyCountState.literacyCount,
        noLiteracyCount: state.literacyCountState.noLiteracyCount,
    }
}

LiteracyResultsDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    history: ReactRouterPropTypes.history.isRequired,
    clearTeacher: PropTypes.func.isRequired,
    literacyCount: PropTypes.number.isRequired,
    noLiteracyCount: PropTypes.number.isRequired,
    clearLiteracyCount: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, { clearTeacher, clearLiteracyCount })(LiteracyResultsDialog)