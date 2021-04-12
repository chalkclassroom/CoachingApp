import * as React from 'react';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {useState} from 'react';
import {
  Collapse,
  Divider
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
// import SmallGroupIconImage from '../../assets/images/SmallGroupIconImage.svg';
import Button from '@material-ui/core/Button';
import * as Constants from '../../constants/Constants';

interface Props {
  handleBegin(): void
}

/**
 * reminders for listening to children observation
 * @param {Props} props
 * @return {ReactElement}
 */
export default function LiteracyInstructionObservationPopUp(props: Props): React.ReactElement {
  const { handleBegin } = props;
  const [type, setType] = useState(0);
  return (
    <div>
      <Grid container direction="column" justify="center" alignItems="center" style={{paddingTop: '1em'}}>
        <Grid item>
          <Grid container direction="column" justify="center" alignItems="center">
            <Collapse in={type===0 || type === 1}>
              <Grid item style={{paddingBottom: '1em'}}>
                <Grid container direction="row" justify="space-around" alignItems="center">
                  <Grid item xs={3}>
                    <Card
                      onClick={(): void => {type === 1 ? setType(0) : setType(1)}}
                      elevation={4}
                      style={{
                        // backgroundColor: '#d5748b',
                        color: Constants.Colors.LI,
                        height: '10em',
                        borderColor: Constants.Colors.LI,
                        borderWidth: '1px',
                        borderStyle: 'solid'
                      }}
                    >
                      <Grid container direction="column" justify="center" alignItems="center" style={{height: '100%'}}>
                        <Typography variant="h5" align="center" style={{fontFamily: 'Arimo', fontWeight: 'bold', padding: '0.5em'}}>
                          Foundational Skills
                        </Typography>
                      </Grid>
                    </Card>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="h6" style={{fontFamily: 'Arimo', paddingLeft: '0.5em', paddingRight: '0.5em'}}>
                      Observe lessons and activities designed to foster children’s phonological
                      awareness and develop their knowledge of the alphabetic principle and
                      print concepts through realistic reading and writing experiences.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Collapse>
            <Collapse in={type===1}>
              <Grid item>
                <Grid container direction='row' justify='center' alignItems='center'>
                  <Grid item xs={5}>
                    <Typography variant="h6" align="left" style={{fontFamily: 'Arimo'}}>
                      <ul>
                        <li>
                          Observe the teacher delivering instruction or interacting with children.
                        </li>
                        <li>
                          Select the types of foundational skills instruction that occur.
                        </li>
                      </ul>
                    </Typography>
                    <Grid container direction="row" justify="center" alignItems="center">
                      <Button onClick={handleBegin} variant="contained" color="primary">
                        BEGIN TEACHER OBSERVATION
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid item xs={2} style={{height: '100%'}}>
                    <Grid container direction="row" justify="center" alignItems="center">
                      <Divider orientation="vertical" flexItem style={{height: '5em'}} />
                    </Grid>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h6" align="left" style={{fontFamily: 'Arimo'}}>
                      <ul>
                        <li>
                          Observe children participating in lessons or activities.
                        </li>
                        <li>
                          Select the types of foundational skills and knowledge that children are using.
                        </li>
                      </ul>
                    </Typography>
                    <Grid container direction="row" justify="center" alignItems="center">
                      <Button variant="contained" color="primary">
                        BEGIN CHILD OBSERVATION
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Collapse>
            <Collapse in={type===0 || type === 2}>
              <Grid item style={{paddingBottom: '1em'}}>
                <Grid container direction="row" justify="space-around" alignItems="center">
                  <Grid item xs={3}>
                    <Card
                      onClick={(): void => {type === 2 ? setType(0) : setType(2)}}
                      elevation={4}
                      style={{
                        // backgroundColor: '#d5748b',
                        color: Constants.Colors.LI,
                        height: '10em',
                        borderColor: Constants.Colors.LI,
                        borderWidth: '1px',
                        borderStyle: 'solid'
                      }}
                    >
                      <Grid container direction="column" justify="center" alignItems="center" style={{height: '100%'}}>
                        <Typography variant="h5" align="center" style={{fontFamily: 'Arimo', fontWeight: 'bold', padding: '0.5em'}}>
                          Language and Comprehension
                        </Typography>
                      </Grid>
                    </Card>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="h6" style={{fontFamily: 'Arimo', padding: '0.5em'}}>
                      Observe activities designed to nurture children’s language and content
                      development, listening comprehension, and critical responses to culturally
                      diverse texts.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Collapse>
            <Collapse in={type===0 || type === 3}>
              <Grid item>
                <Grid container direction="row" justify="space-around" alignItems="center">
                  <Grid item xs={3}>
                    <Card
                      onClick={(): void => {type === 3 ? setType(0) : setType(3)}}
                      elevation={4}
                      style={{
                        // backgroundColor: '#d5748b',
                        color: Constants.Colors.LI,
                        height: '10em',
                        borderColor: Constants.Colors.LI,
                        borderWidth: '1px',
                        borderStyle: 'solid'
                      }}
                    >
                      <Grid container direction="column" justify="center" alignItems="center" style={{height: '100%'}}>
                        <Typography variant="h5" align="center" style={{fontFamily: 'Arimo', fontWeight: 'bold', padding: '0.5em'}}>
                          Writing
                        </Typography>
                      </Grid>
                    </Card>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="h6" style={{fontFamily: 'Arimo', padding: '0.5em'}}>
                      Observe activities designed to engage children in writing that conveys meaning.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Collapse>
            <Collapse in={type===3}>
              <Grid item>
                <Grid container direction='row' justify='center' alignItems='center'>
                  <Grid item xs={5}>
                    <Typography variant="h6" align="left" style={{fontFamily: 'Arimo'}}>
                      <ul>
                        <li>
                          Observe the teacher delivering instruction or interacting with children.
                        </li>
                        <li>
                          Select the types of writing instruction that occur.
                        </li>
                      </ul>
                    </Typography>
                    <Grid container direction="row" justify="center" alignItems="center">
                      <Button onClick={handleBegin} variant="contained" color="primary">
                        BEGIN TEACHER OBSERVATION
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid item xs={2} style={{height: '100%'}}>
                    <Grid container direction="row" justify="center" alignItems="center">
                      <Divider orientation="vertical" flexItem style={{height: '5em'}} />
                    </Grid>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h6" align="left" style={{fontFamily: 'Arimo'}}>
                      <ul>
                        <li>
                          Observe children writing independently or with teachers/peers.
                        </li>
                        <li>
                          Select the types of child writing behaviors that occur.
                        </li>
                      </ul>
                    </Typography>
                    <Grid container direction="row" justify="center" alignItems="center">
                      <Button variant="contained" color="primary">
                        BEGIN CHILD OBSERVATION
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Collapse>
          </Grid>
        </Grid>

        {/* {type === 0 ? (
          <Grid item>
            {/* <Grid container direction="row" justify="flex-start" alignItems="center">
              <Grid item xs={3}>
                <Grid container direction="column" justify="center" alignItems="center">
                  <Grid item style={{paddingBottom: '1em'}}>
                    <Grid container direction="row" justify="space-around" alignItems="center">
                      <Grid item xs={3}>
                        <Card style={{height: '10em'}}>
                          <Grid container direction="column" justify="center" alignItems="center" style={{height: '100%'}}>
                            <Typography variant="h5" align="center" style={{fontFamily: 'Arimo', padding: '0.5em'}}>
                              Foundational Skills
                            </Typography>
                          </Grid>
                        </Card>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="h6" style={{fontFamily: 'Arimo', padding: '0.5em'}}>
                          Observe lessons and activities designed to foster children’s phonological
                          awareness and develop their knowledge of the alphabetic principle and
                          print concepts through realistic reading and writing experiences.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item style={{paddingBottom: '1em'}}>
                    <Grid container direction="row" justify="space-around" alignItems="center">
                      <Grid item xs={3}>
                        <Card style={{height: '10em'}}>
                          <Grid container direction="column" justify="center" alignItems="center" style={{height: '100%'}}>
                            <Typography variant="h5" align="center" style={{fontFamily: 'Arimo', padding: '0.5em'}}>
                              Language and Comprehension
                            </Typography>
                          </Grid>
                        </Card>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="h6" style={{fontFamily: 'Arimo', padding: '0.5em'}}>
                          Observe activities designed to nurture children’s language and content
                          development, listening comprehension, and critical responses to culturally
                          diverse texts.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container direction="row" justify="space-around" alignItems="center">
                      <Grid item xs={3}>
                        <Card style={{height: '10em'}}>
                          <Grid container direction="column" justify="center" alignItems="center" style={{height: '100%'}}>
                            <Typography variant="h5" align="center" style={{fontFamily: 'Arimo', padding: '0.5em'}}>
                              Writing
                            </Typography>
                          </Grid>
                        </Card>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="h6" style={{fontFamily: 'Arimo', padding: '0.5em'}}>
                          Observe activities designed to engage children in writing that conveys meaning.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* <Grid item>
                    <Button>
                      Foundational Skills
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button>
                      Language and Comprehension
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button>
                      Writing
                    </Button>
                  </Grid>
                </Grid>
              {/* </Grid>
            </Grid>
          </Grid>
        ) : type === 1 ? (
          <Grid item>
          </Grid>
        ) : (null)} */}

        {/* <Grid item style={{paddingTop: '1em'}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell colSpan={2}>
                  <Typography>
                    Foundational Skills
                  </Typography>
                </TableCell>
                <TableCell colSpan={2}>
                  <Typography>
                    Language and Comprehension
                  </Typography>
                </TableCell>
                <TableCell colSpan={2}>
                  <Typography>
                    Writing
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell colSpan={2} style={{width: '33%'}}>
                  <Typography>
                    Observe lessons and activities designed to foster children’s phonological awareness and develop their knowledge of the alphabetic principle and print concepts through realistic reading and writing experiences.
                  </Typography>
                </TableCell>
                <TableCell colSpan={2} style={{width: '33%'}}>
                  <Typography>
                    Observe activities designed to nurture children’s language and content development, listening comprehension, and critical responses to culturally diverse texts.
                  </Typography>
                </TableCell>
                <TableCell colSpan={2} style={{width: '33%'}}>
                  <Typography>
                    Observe activities designed to engage children in writing that conveys meaning.
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography>
                    <ul>
                      <li>
                        Observe the teacher delivering instruction or interacting with children.
                      </li>
                      <li>
                        Select the types of foundational skills instruction that occur.
                      </li>
                    </ul>
                  </Typography>
                </TableCell>
                <TableCell style={{width: '33%'}}>
                  <Typography>
                    Observe activities designed to nurture children’s language and content development, listening comprehension, and critical responses to culturally diverse texts.
                  </Typography>
                </TableCell>
                <TableCell style={{width: '33%'}}>
                  <Typography>
                    Observe activities designed to engage children in writing that conveys meaning.
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          {/* <Typography variant="h6" align="left" style={{fontFamily: 'Arimo'}}>
            <ul>
              <li>
                Observe the teacher interacting with children.
              </li>
              <li>
                Select the types of behaviors that show teachers
                <ul>
                  <li>
                    listening to children
                  </li>
                  <li>
                    encouraging child talk
                  </li>
                </ul>
              </li>
            </ul>
          </Typography>
        </Grid>
        <Grid item style={{paddingTop: '0.5em'}}>
          <Grid container direction="column" justify="center" alignItems="center">
            <Grid item>
              <Typography variant="h6">
                ACTIVITY SETTING:
              </Typography>
            </Grid>
              <Grid item>
              <img src={SmallGroupIconImage} width={150}/>
              </Grid>
            <Grid item>
              <Typography variant="h6">
                Centers / Small Groups / Table Activities / Mealtimes
              </Typography>
            </Grid>
          </Grid>
        </Grid> */}
      </Grid>
    </div>
  )
}

LiteracyInstructionObservationPopUp.propTypes = {
  handleBegin: PropTypes.func.isRequired
}