import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import DataQuestions from '../../ResultsComponents/DataQuestions'
import { MuiThemeProvider } from '@material-ui/core/styles'
import * as Constants from '../../../constants/Constants'
import { FirebaseContext } from '../../Firebase'

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
}

/**
 * data reflection question layout for listening to children
 * @class ListeningCoachingQuestions
 */
class ListeningCoachingQuestions extends React.Component<Props, State> {
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

    listeningClick = (): void => {
        if (this.state.categoryView !== 'listening') {
            this.setState({
                categoryView: 'listening',
                openPanel: '',
            })
        }
    }

    supportingClick = (): void => {
        if (this.state.categoryView !== 'supporting') {
            this.setState({
                categoryView: 'supporting',
                openPanel: '',
            })
        }
    }

    encouragingClick = (): void => {
        if (this.state.categoryView !== 'encouraging') {
            this.setState({
                categoryView: 'encouraging',
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
        const sequentialQuestions = [
            ...Constants.CoachingQuestions.Listening.Listening,
            ...Constants.CoachingQuestions.Listening.Supporting,
            ...Constants.CoachingQuestions.Listening.Encouraging,
        ]
        const questions = [].concat(
            ...sequentialQuestions.map(
                sequentialQuestion => sequentialQuestion.text
            )
        )

        const user = await this.context.getUserInformation()

        const faq = [
            {
                name: 'FAQ',
                title: 'FAQ',
                text: questions.filter(question =>
                    user.favouriteQuestions.includes(question.id)
                ),
            },
        ]

        this.setState({ faq })
    }

    /** lifecycle method invoked after component mounts */
    async componentDidMount(): void {
        this.faqQuestions()
    }

    // eslint-disable-next-line require-jsdoc
    componentDidUpdate(_, prevState) {
        if (
            prevState.categoryView !== 'FAQ' &&
            'FAQ' === this.state.categoryView
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

    /**
     * @return {ReactNode}
     */
    render(): React.ReactNode {
        const categories = [
            {
                clickFunction: this.listeningClick,
                categoryView: 'listening',
                title: 'Listening to Children',
                questions: Constants.CoachingQuestions.Listening.Listening,
            },
            {
                clickFunction: this.supportingClick,
                categoryView: 'supporting',
                title: 'Supporting Child Talk',
                questions: Constants.CoachingQuestions.Listening.Supporting,
            },
            {
                clickFunction: this.encouragingClick,
                categoryView: 'encouraging',
                title: 'Encouraging Peer Talk',
                questions: Constants.CoachingQuestions.Listening.Encouraging,
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
                                        theme={Constants.ListeningTheme}
                                    >
                                        <Button
                                            onClick={value.clickFunction}
                                            variant="contained"
                                            style={{
                                                width: '9em',
                                                height: '9em',
                                                backgroundColor:
                                                    this.state.categoryView ===
                                                    value.categoryView
                                                        ? Constants.Colors.LC
                                                        : '#f5f5f5',
                                                textTransform: 'none',
                                            }}
                                        >
                                            <Typography
                                                style={{ color: 'black' }}
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
                                    magic8={'Listening To Children'}
                                    color={Constants.Colors.LC}
                                />
                            ) : null
                        })}
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default ListeningCoachingQuestions
