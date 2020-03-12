import * as React from 'react';
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles/index";
import Table from '@material-ui/core/Table/index';
import TableHead from '@material-ui/core/TableHead/index';
import TableRow from '@material-ui/core/TableRow/index';
import TableBody from '@material-ui/core/TableBody/index';
import TableCell from '@material-ui/core/TableCell/index';
import Slider from "react-slick";

const styles: object = {
  paper: {
    position: "absolute",
    width: "67%",
    backgroundColor: 'white',
    padding: '2em',
    borderRadius: 8
  },
  inferentialTitle: {
    backgroundColor: "#38761d",
    color: "white",
    fontSize: 24,
    textAlign: "center",
    width: "100%"
  },
  inferentialSubtitle: {
    backgroundColor: "#6aa84f",
    color: "white",
    fontSize: 18,
    textAlign: "center",
    width: '50%'
  },
  basicTitle: {
    backgroundColor: "#c9daf8",
    color: "white",
    fontSize: 24,
    textAlign: "center",
    width: "100%"
  },
  basicSubtitle: {
    backgroundColor: "#1155cc",
    color: "white",
    fontSize: 18,
    textAlign: "center",
    width: '50%'
  },
  example: {
    backgroundColor: "#f3f3f3",
    color: 'black',
    padding: "1%",
    width: '50%'
  }
};

interface Props {
  classes: {
    paper: string,
    inferentialTitle: string,
    inferentialSubtitle: string,
    basicTitle: string,
    basicSubtitle: string,
    example: string
  }
}

/**
 * 
 * @param {Props} props 
 * @return {ReactElement}
 */
function LOIHelpCardBasic(props: Props): React.ReactElement {
  const { classes } = props;
  return (
    <div>
      <Table padding="checkbox">
        {/* <TableHead>
          <TableRow>
            <TableCell colSpan={2} className={classes.basicTitle}>
              Basic Skills Instruction
            </TableCell>
          </TableRow>
        </TableHead> */}
        <TableBody>
          <TableRow>
            <TableCell className={classes.basicSubtitle}>
              Ask Low-Level Questions
            </TableCell>
            <TableCell className={classes.basicSubtitle}>
              Teach Specific Skills
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.example}>
              <strong>
                Teacher asks questions with predetermined answers, with the goal
                of having children learn or recite the correct response.
              </strong>
            </TableCell>
            <TableCell className={classes.example}>
              <strong>
                Teacher gives information about specific, concrete skills
              </strong>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.example}>
              <b>What</b> sound does 'g' make?
            </TableCell>
            <TableCell className={classes.example}>
              A triangle has 3 sides.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.example}>
              <b>Show me</b> the number 2.
            </TableCell>
            <TableCell className={classes.example}>
              Run rhymes with fun.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.example}>
              <b>Do</b> we have more girls or boys here today?
            </TableCell>
            <TableCell className={classes.example}>
              A tree gets water and food from its roots.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

LOIHelpCardBasic.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LOIHelpCardBasic);
