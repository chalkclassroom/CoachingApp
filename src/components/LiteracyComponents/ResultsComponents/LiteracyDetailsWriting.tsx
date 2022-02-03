import * as React from 'react';
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import LiteracyDetailsWritingChart from './LiteracyDetailsWritingChart';
import * as Constants from '../../../constants/Constants';

interface Props {
  literacy1: number,
  literacy2: number,
  literacy3: number,
  literacy4: number,
  literacy5: number,
  literacy6: number,
  literacy7: number,
  literacy8: number,
  who: string
}

export default function LiteracyDetailsFoundational(props: Props) {
  const {
    literacy1,
    literacy2,
    literacy3,
    literacy4,
    literacy5,
    literacy6,
    literacy7,
    literacy8,
    who
  } = props;

  return (
    <div>
      <Grid container justify={"center"} direction={"column"}>
        <Grid item style={{paddingTop: '1em'}}>
          <Typography variant="h5" style={{textAlign: "center", fontFamily: 'Arimo'}}>
            {who === 'Teacher' ? 'Teacher' : 'Child'} Behaviors
          </Typography>
        </Grid>
        <Grid container justify={"center"} direction={"column"}>
          <Grid item>
            <Typography align="left" variant="subtitle1" style={{fontFamily: 'Arimo', paddingLeft: '1em'}}>
              What strategies did the teacher use during the observation?
            </Typography>
          </Grid>
          <Grid item>
            <Grid container direction="column" justify="flex-start">
              <Typography align="left" variant="subtitle1" style={{fontFamily: 'Arimo', paddingLeft: '1em'}}>
                How often did {who === 'Teacher' ? 'the teacher' : 'children'} focus on:
              </Typography>
              <Grid container direction="column" alignItems="center">
                <Grid item style={{width: '100%'}}>
                  <List>
                    <ListItem style={{paddingBottom: 0}}>
                      <ListItemIcon style={{margin: 0}}>
                        <div style={{borderRadius: '0.2em', width: '1em', height: '1em', backgroundColor: '#45818e'}} />
                      </ListItemIcon>
                      <ListItemText primary="The content or meaning of the writing" />
                    </ListItem>
                    <ListItem style={{paddingTop: 0}}>
                      <ListItemIcon style={{margin: 0}}>
                        <div style={{borderRadius: '0.2em', width: '1em', height: '1em', backgroundColor: Constants.Colors.LI}} />
                      </ListItemIcon>
                      <ListItemText primary={who === 'Teacher' ? ("Print processes (e.g., letter forms, demonstrations, sounds/spelling)") : ("Print processes (e.g., letter forms, “reading” their message, sounds/spelling)")} />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <LiteracyDetailsWritingChart
          literacy1={literacy1}
          literacy2={literacy2}
          literacy3={literacy3}
          literacy4={literacy4}
          literacy5={literacy5}
          literacy6={literacy6}
          literacy7={literacy7}
          literacy8={literacy8}
          who={who}
        />
      </Grid>
    </div>
  );
}