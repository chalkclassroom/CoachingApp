import * as React from 'react'
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
 * data reflection question layout for Student Engagement
 * @class StudentEngagementCoachingQuestions
 */
class StudentEngagementCoachingQuestions extends React.Component<Props, State> {
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

    static contextType = FirebaseContext

    offTaskBehaviorClick = (): void => {
        if (this.state.categoryView !== 'offTaskBehavior') {
            this.setState({
                categoryView: 'offTaskBehavior',
                openPanel: '',
            })
        }
    }

    mildEngagementClick = (): void => {
        if (this.state.categoryView !== 'mildEngagement') {
            this.setState({
                categoryView: 'mildEngagement',
                openPanel: '',
            })
        }
    }

    highEngagementClick = (): void => {
        if (this.state.categoryView !== 'highEngagement') {
            this.setState({
                categoryView: 'highEngagement',
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

    // eslint-disable-next-line require-jsdoc
    async faqQuestions(): void {
        this.setState({
            faq: getFaqSection({
                questions: [
                    ...Constants.CoachingQuestions.Engagement.OffTask,
                    ...Constants.CoachingQuestions.Engagement.MildEngagement,
                    ...Constants.CoachingQuestions.Engagement.HighEngagement,
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
     * @return {ReactNode}
     */
    render(): React.ReactNode {
        const categories = [
            {
                clickFunction: this.offTaskBehaviorClick,
                categoryView: 'offTaskBehavior',
                title: 'Off Task Behavior',
                questions: Constants.CoachingQuestions.Engagement.OffTask,
            },
            {
                clickFunction: this.mildEngagementClick,
                categoryView: 'mildEngagement',
                title: 'Mild Engagement',
                questions:
                    Constants.CoachingQuestions.Engagement.MildEngagement,
            },
            {
                clickFunction: this.highEngagementClick,
                categoryView: 'highEngagement',
                title: 'High Engagement',
                questions:
                    Constants.CoachingQuestions.Engagement.HighEngagement,
            },
            {
                clickFunction: this.faqSupportClick,
                categoryView: 'FAQ',
                title: 'FAQ',
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
                                        theme={Constants.EngagementTheme}
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
                                                                  .SE,
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
                                    magic8={'Student Engagement'}
                                    color={Constants.Colors.SE}
                                />
                            ) : null
                        })}
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default StudentEngagementCoachingQuestions
