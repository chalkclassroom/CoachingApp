// props: questions array of objects with name, title, and text for data driven coaching questions
import * as React from 'react'
import * as PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AddIcon from '@material-ui/icons/Add'
import Star from '@material-ui/icons/Star'
import StarBorder from '@material-ui/icons/StarBorder'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { FirebaseContext } from '../Firebase'

const styles: object = {
    expansionPanel: {
        overflow: 'hidden',
    },
    expansionPanelTitle: {
        variant: 'subtitle2',
        fontWeight: 'bold',
    },
    expansionPanelText: {
        variant: 'body2',
    },
}

interface Style {
    expansionPanel: string
    expansionPanelTitle: string
    expansionPanelText: string
}

interface Props {
    classes: Style
    questions: Array<{ name: string; title: string; text: Array<string> }>
    openPanel: string
    handlePanelChange(panel: string): void
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
    magic8: string
    color: string
}

interface State {
    favouriteQuestions: array
}

/**
 * formatting for expansion panel of data-driven coaching questions
 * @class DataQuestions
 */
class DataQuestions extends React.Component<Props, State> {
    /**
     * @param {Props} props
     */
    constructor(props: Props) {
        super(props)
        this.state = {
            user: {},
        }
    }

    static contextType = FirebaseContext

    static propTypes = {
        classes: PropTypes.object.isRequired,
        questions: PropTypes.arrayOf(
            PropTypes.exact({
                name: PropTypes.string,
                title: PropTypes.string,
                text: PropTypes.array,
            })
        ).isRequired,
        openPanel: PropTypes.string,
        handlePanelChange: PropTypes.func.isRequired,
        handleAddToPlan: PropTypes.func.isRequired,
        sessionId: PropTypes.string.isRequired,
        teacherId: PropTypes.string.isRequired,
        magic8: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
    }

    /** lifecycle method invoked after component mounts */
    async componentDidMount(): void {
        this.setState({
            user: await this.context.getUserInformation(),
        })
    }

    // eslint-disable-next-line require-jsdoc
    async toggleQuestion(id) {
        await this.context.updateFavouriteQuestions(id)
        this.setState({ user: await this.context.getUserInformation() })
    }

    /**
     * render function
     * @return {ReactNode}
     */
    render(): React.ReactNode {
        const { classes } = this.props
        return (
            <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="center"
            >
                <Grid item>
                    {this.props.questions.map((item, index) => (
                        <ExpansionPanel
                            key={index}
                            className={classes.expansionPanel}
                            expanded={
                                this.props.openPanel === item.name ||
                                item.name === 'FAQ'
                            }
                            onChange={this.props.handlePanelChange.bind(
                                this,
                                item.name
                            )}
                        >
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography
                                    className={classes.expansionPanelTitle}
                                    style={{
                                        fontFamily: 'Arimo',
                                    }}
                                >
                                    {item.title}
                                </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Grid container direction="column">
                                    {item.text.map(({ label, id }) => (
                                        <Grid
                                            container
                                            direction="row"
                                            alignItems="center"
                                            key={id}
                                        >
                                            <Grid item xs={10}>
                                                <div
                                                    className={
                                                        classes.expansionPanelText
                                                    }
                                                >
                                                    <ul
                                                        style={{
                                                            fontFamily: 'Arimo',
                                                        }}
                                                    >
                                                        {label}
                                                    </ul>
                                                </div>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Button
                                                    onClick={this.props.handleAddToPlan.bind(
                                                        this,
                                                        item.name,
                                                        id,
                                                        label,
                                                        this.props.sessionId,
                                                        this.props.teacherId,
                                                        this.props.magic8
                                                    )}
                                                >
                                                    <AddIcon
                                                        style={{
                                                            fill: this.props
                                                                .color,
                                                        }}
                                                    />
                                                </Button>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Button
                                                    onClick={(): void => {
                                                        this.toggleQuestion(id)
                                                    }}
                                                >
                                                    {this.state.user?.favouriteQuestions?.includes(
                                                        id
                                                    ) ? (
                                                        <Star
                                                            style={{
                                                                fill: this.props
                                                                    .color,
                                                            }}
                                                        />
                                                    ) : (
                                                        <StarBorder
                                                            style={{
                                                                fill: this.props
                                                                    .color,
                                                            }}
                                                        />
                                                    )}
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    ))}
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    ))}
                </Grid>
                <Grid item style={{ paddingTop: '1em' }}>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item style={{ paddingRight: '0.5em' }}>
                            <AddIcon style={{ fill: this.props.color }} />
                        </Grid>
                        <Grid item style={{ paddingLeft: '0.5em' }}>
                            <Typography style={{ fontFamily: 'Arimo' }}>
                                Add to Conference Plan
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(DataQuestions)
