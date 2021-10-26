import * as React from 'react'
import * as PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import DataQuestions from '../../ResultsComponents/DataQuestions'
import { MuiThemeProvider } from '@material-ui/core/styles'
import * as Constants from '../../../constants/Constants'
import { FirebaseContext } from '../../Firebase'
import getFaqSection from '../../faqSection.ts'

interface Props {
    handleAddToPlan(
        panelTitle: string,
        index: number,
        question: string,
        sessionId: string,
        teacherId: string,
        magic8: string
    ): void
    sessionId: string
    teacherId: string
}

interface State {
    categoryView: string
    openPanel: string
    faq: array
}

/**
 * data reflection question layout for classroom climate
 * @class ClimateCoachingQuestions
 */
class ClimateCoachingQuestions extends React.Component<Props, State> {
    /**
     * @param {Props} props
     */
    constructor(props: Props) {
        super(props)

        this.state = {
            categoryView: '',
            openPanel: '',
            faq: [],
        }
    }

    approvalsClick = (): void => {
        if (this.state.categoryView !== 'approvals') {
            this.setState({
                categoryView: 'approvals',
                openPanel: '',
            })
        }
    }

    redirectionsClick = (): void => {
        if (this.state.categoryView !== 'redirections') {
            this.setState({
                categoryView: 'redirections',
                openPanel: '',
            })
        }
    }

    disapprovalsClick = (): void => {
        if (this.state.categoryView !== 'disapprovals') {
            this.setState({
                categoryView: 'disapprovals',
                openPanel: '',
            })
        }
    }

    faqSupportClick = (): void => {
        if (this.state.categoryView !== 'FAQ') {
            this.setState({
                categoryView: 'FAQ',
                openPanel: '',
            })
        }
    }

    // eslint-disable-next-line require-jsdoc
    async faqQuestions(): void {
        this.setState({
            faq: getFaqSection({
                questions: [
                    ...Constants.CoachingQuestions.Climate.Approvals,
                    ...Constants.CoachingQuestions.Climate.Redirections,
                    ...Constants.CoachingQuestions.Climate.Disapprovals,
                ],
                user: await this.context.getUserInformation(),
            }),
        })
    }
    /** lifecycle method invoked after component mounts */
    async componentDidMount(): void {
        this.faqQuestions()
    }

    // eslint-disable-next-line require-jsdoc
    componentDidUpdate(_, prevState) {
        if (
            prevState.categoryView !== 'FAQ' &&
            this.state.categoryView === 'FAQ'
        ) {
            this.faqQuestions()
        }
    }

    /**
     * @param {string} panel
     */
    handlePanelChange = (panel: string): void => {
        if (this.state.openPanel === panel) {
            this.setState({ openPanel: '' })
        } else {
            this.setState({ openPanel: panel })
        }
    }

    static contextType = FirebaseContext

    static propTypes = {
        handleAddToPlan: PropTypes.func.isRequired,
        sessionId: PropTypes.string.isRequired,
        teacherId: PropTypes.string.isRequired,
    }

    /**
     * @return {ReactNode}
     */
    render(): React.ReactNode {
        const categories = [
            {
                clickFunction: this.approvalsClick,
                categoryView: 'approvals',
                title: 'Behavior Approvals',
                questions: Constants.CoachingQuestions.Climate.Approvals,
            },
            {
                clickFunction: this.redirectionsClick,
                categoryView: 'redirections',
                title: 'Redirections',
                questions: Constants.CoachingQuestions.Climate.Redirections,
            },
            {
                clickFunction: this.disapprovalsClick,
                categoryView: 'disapprovals',
                title: 'Disapprovals',
                questions: Constants.CoachingQuestions.Climate.Disapprovals,
            },
            {
                clickFunction: this.faqSupportClick,
                categoryView: 'FAQ',
                title: 'Favorite Questions',
                questions: this.state.faq,
            },
        ]
        return (
            <Grid container direction="column">
                <Grid item>
                    <Grid
                        container
                        direction="row"
                        justify="space-around"
                        alignItems="center"
                        style={{ marginTop: '1vh' }}
                    >
                        {categories.map((value, index) => {
                            return (
                                <Grid item key={index}>
                                    <MuiThemeProvider
                                        theme={Constants.ClimateTheme}
                                    >
                                        <Button
                                            onClick={value.clickFunction}
                                            variant="contained"
                                            color={
                                                this.state.categoryView ===
                                                value.categoryView
                                                    ? 'primary'
                                                    : 'default'
                                            }
                                            style={{
                                                width: '9em',
                                                height: '9em',
                                                textTransform: 'none',
                                            }}
                                        >
                                            <Typography
                                                style={{
                                                    color:
                                                        this.state
                                                            .categoryView ===
                                                        value.categoryView
                                                            ? 'white'
                                                            : Constants.Colors
                                                                  .CC,
                                                }}
                                            >
                                                {value.title}
                                            </Typography>
                                        </Button>
                                    </MuiThemeProvider>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid
                        container
                        direction="column"
                        style={{ marginTop: '1vh' }}
                    >
                        {categories.map((value, index) => {
                            return this.state.categoryView ===
                                value.categoryView ? (
                                <DataQuestions
                                    key={index}
                                    questions={value.questions}
                                    openPanel={this.state.openPanel}
                                    handlePanelChange={this.handlePanelChange}
                                    handleAddToPlan={this.props.handleAddToPlan}
                                    sessionId={this.props.sessionId}
                                    teacherId={this.props.teacherId}
                                    magic8={'Classroom Climate'}
                                    color={Constants.Colors.CC}
                                />
                            ) : null
                        })}
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default ClimateCoachingQuestions
