import * as React from 'react';
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles/index";
import Table from '@material-ui/core/Table/index';
import TableHead from '@material-ui/core/TableHead/index';
import TableRow from '@material-ui/core/TableRow/index';
import TableBody from '@material-ui/core/TableBody/index';
import TableCell from '@material-ui/core/TableCell/index';

const styles: object = {
    sectionTitle: {
        backgroundColor: "#e69138",
        color: "black",
        fontSize: 18,
        textAlign: "center",
        width: "50%",
        fontFamily: "Arimo"
    },
    taskTitle: {
        backgroundColor: "#f9cb9c",
        fontFamily: "Arimo"
    },
    childExample1: {
        backgroundColor: "#f3f3f3",
        fontFamily: "Arimo"
    },
    childExample2: {
        backgroundColor: "#f3f3f3",
        fontFamily: "Arimo"
    },
    childExample3: {
        backgroundColor: "#f3f3f3",
        fontFamily: "Arimo"
    },
    childExample4: {
        backgroundColor: "#f3f3f3",
        fontFamily: "Arimo"
    }
};

interface Props {
    classes: {
        sectionTitle: string,
        childExample1: string,
        childExample2: string,
        childExample3: string,
        childExample4: string,
        taskTitle: string,
    }
}

/**
 * hints and reminders for Student Engagement
 * @param {Props} props
 * @return {ReactNode}
 */
function StudentEngagementHelpCard(props: Props): React.ReactNode {
    const { classes } = props;
    return (
        <div>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox" colSpan={4} className={classes.sectionTitle}>
                            Level of Student Engagement
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell padding="checkbox" className={classes.taskTitle}>
                            <strong>0 <br/> Off Task
                            </strong>
                        </TableCell>
                        <TableCell padding="checkbox" className={classes.taskTitle}>
                            <strong>
                                1 <br/> Mildly Engaged
                            </strong>
                        </TableCell>
                        <TableCell padding="checkbox" className={classes.taskTitle}>
                            <strong>
                                2 <br/> Engaged
                            </strong>
                        </TableCell>
                        <TableCell padding="checkbox" className={classes.taskTitle}>
                            <strong>
                                3 <br/>  Highly Engaged
                            </strong>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell padding="checkbox" className={classes.childExample1}>
                            Not attentive or is being disruptive
                        </TableCell>
                        <TableCell padding="checkbox" className={classes.childExample2}>
                            Pays attention to the activity in an inconsistent manner
                        </TableCell>
                        <TableCell padding="checkbox" className={classes.childExample3}>
                            Focuses on the activity and shows interest in learning
                        </TableCell>
                        <TableCell padding="checkbox" className={classes.childExample4}>
                            Focuses intensely on the activity, is an active participant, and displays genuine
                            involvement in learning
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell padding="checkbox" className={classes.childExample1}>
                            Sits with materials but stares off into space
                        </TableCell>
                        <TableCell padding="checkbox" className={classes.childExample2}>
                            Alternates between paying attention to the activity and looking around to see what
                            others are doing/being distracted from the activity
                        </TableCell>
                        <TableCell padding="checkbox" className={classes.childExample3}>
                            Volunteers responses and shows an eager expression
                        </TableCell>
                        <TableCell padding="checkbox" className={classes.childExample4}>
                            Shows no signs of distraction
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell padding="checkbox" className={classes.childExample1}>
                            Looks at what other children are doing with little interest
                        </TableCell>
                        <TableCell padding="checkbox" className={classes.childExample2}>
                            Seems interested in the activity but could also easily give it up for another activity
                        </TableCell>
                        <TableCell padding="checkbox" className={classes.childExample3}>
                            Persists in looking at the teacher and/or learning materials
                        </TableCell>
                        <TableCell padding="checkbox" className={classes.childExample4}>
                            Seems oblivious to noise and and the behaviors of other children
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell padding="checkbox" className={classes.childExample1}>
                            Looks at what other children are doing with little interest
                        </TableCell>
                        <TableCell padding="checkbox" className={classes.childExample2}/>
                        <TableCell padding="checkbox" className={classes.childExample3}/>
                        <TableCell padding="checkbox" className={classes.childExample4}>
                            Appears to be concentrating and seriously pursuing the activity
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

StudentEngagementHelpCard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StudentEngagementHelpCard);
