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
 * data reflection question layout for math
 * @class MathCoachingQuestions
 */
class MathCoachingQuestions extends React.Component<Props, State> {
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

    countingClick = (): void => {
        if (this.state.categoryView !== 'counting') {
            this.setState({
                categoryView: 'counting',
                openPanel: '',
            })
        }
    }

    measurementClick = (): void => {
        if (this.state.categoryView !== 'measurement') {
            this.setState({
                categoryView: 'measurement',
                openPanel: '',
            })
        }
    }
    patternsClick = (): void => {
        if (this.state.categoryView !== 'patterns') {
            this.setState({
                categoryView: 'patterns',
                openPanel: '',
            })
        }
    }
    shapesClick = (): void => {
        if (this.state.categoryView !== 'shapes') {
            this.setState({
                categoryView: 'shapes',
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

    teacherSupportClick = (): void => {
        if (this.state.categoryView !== 'teacherSupport') {
            this.setState({
                categoryView: 'teacherSupport',
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
                    ...Constants.CoachingQuestions.Math.CountingAndNumbers,
                    ...Constants.CoachingQuestions.Math.MeasurementAndData,
                    ...Constants.CoachingQuestions.Math.Patterns,
                    ...Constants.CoachingQuestions.Math
                        .ShapesAndSpatialReasoning,
                    ...Constants.CoachingQuestions.Math.TeacherSupport,
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
                clickFunction: this.countingClick,
                categoryView: 'counting',
                title: 'Counting and Numbers',
                questions: Constants.CoachingQuestions.Math.CountingAndNumbers,
            },
            {
                clickFunction: this.measurementClick,
                categoryView: 'measurement',
                title: 'Measurement and Data',
                questions: Constants.CoachingQuestions.Math.MeasurementAndData,
            },
            {
                clickFunction: this.patternsClick,
                categoryView: 'patterns',
                title: 'Patterns',
                questions: Constants.CoachingQuestions.Math.Patterns,
            },
            {
                clickFunction: this.shapesClick,
                categoryView: 'shapes',
                title: 'Shapes and Spatial Reasoning',
                questions:
                    Constants.CoachingQuestions.Math.ShapesAndSpatialReasoning,
            },
            {
                clickFunction: this.teacherSupportClick,
                categoryView: 'teacherSupport',
                title: 'Teacher Support for Math',
                questions: Constants.CoachingQuestions.Math.TeacherSupport,
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
                                        theme={Constants.MathTheme}
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
                                                width: '11vw',
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
                                                                  .MI,
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
                                    magic8={'Math Instruction'}
                                    color={Constants.Colors.MI}
                                />
                            ) : null
                        })}
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default MathCoachingQuestions
