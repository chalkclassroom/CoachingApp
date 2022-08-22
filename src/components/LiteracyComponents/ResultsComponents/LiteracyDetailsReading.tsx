import * as React from 'react';
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import LiteracyDetailsReadingChart from './LiteracyDetailsReadingChart';
import * as Constants from '../../../constants/Constants';
import { GridWrapperDetails } from '../../ResultsComponents/ChartWrappers';

interface Props {
  literacy1: number,
  literacy2: number,
  literacy3: number,
  literacy4: number,
  literacy5: number,
  literacy6: number,
  literacy7: number,
  literacy8: number,
  literacy9: number,
  literacy10: number,
  sessionTime: number,
  who: string
}

export default function LiteracyDetailsReading(props: Props) {
  const {
    literacy1,
    literacy2,
    literacy3,
    literacy4,
    literacy5,
    literacy6,
    literacy7,
    literacy8,
    literacy9,
    literacy10,
    sessionTime,
    who
  } = props;

  return (
    <div>
      <Grid container justify={"center"} direction={"column"}>
        <Grid item style={{paddingTop: '0.5em'}}>
          <Typography variant="h5" style={{textAlign: "center", fontFamily: 'Arimo'}}>
            {who === 'Teacher' ? 'Teacher ' : 'Child '} Behaviors
          </Typography>
        </Grid>
        <Grid container justify={"center"} direction={"column"}>
          <Grid item>
            <Grid container direction="column" justify="flex-start">
              <Typography align="left" variant="body2" style={{fontFamily: 'Arimo', paddingLeft: '1em'}}>
                How often did the teacher:
              </Typography>
              <Grid container direction="row">
                <Grid item xs={6}>
                  <Grid container direction="column" alignItems="center">
                    <Grid item style={{width: '100%'}}>
                      <List>
                        <ListItem style={{paddingTop: 0, paddingBottom: 0}}>
                          <ListItemIcon style={{margin: 0, minWidth: '1.2em'}}>
                            <div style={{borderRadius: '0.2em', width: '0.8em', height: '0.8em', backgroundColor: '#3c78d8'}} />
                          </ListItemIcon>
                          <ListItemText primary="Focus on vocabulary, concepts, or comprehension" primaryTypographyProps={{variant:'body2'}} />
                        </ListItem>
                        <ListItem style={{paddingTop: 0, paddingBottom: 0}}>
                          <ListItemIcon style={{margin: 0, minWidth: '1.2em'}}>
                            <div style={{borderRadius: '0.2em', width: '0.8em', height: '0.8em', backgroundColor: '#6aa84f'}} />
                          </ListItemIcon>
                          <ListItemText primary="Make connections to children's language, cultural backgrounds, and experiences" primaryTypographyProps={{variant:'body2'}} />
                        </ListItem>
                      </List>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid container direction="column" alignItems="center">
                    <Grid item style={{width: '100%'}}>
                      <List>
                        <ListItem style={{paddingTop: 0, paddingBottom: 0}}>
                          <ListItemIcon style={{margin: 0, minWidth: '1.2em'}}>
                            <div style={{borderRadius: '0.2em', width: '0.8em', height: '0.8em', backgroundColor: '#f1c232'}} />
                          </ListItemIcon>
                          <ListItemText primary="Support children's speaking and listening skills" primaryTypographyProps={{variant:'body2'}} />
                        </ListItem>
                        <ListItem style={{paddingTop: 0, paddingBottom: 0}}>
                          <ListItemIcon style={{margin: 0, minWidth: '1.2em'}}>
                            <div style={{borderRadius: '0.2em', width: '0.8em', height: '0.8em', backgroundColor: Constants.Colors.LI}} />
                          </ListItemIcon>
                          <ListItemText primary="Facilitate discussions around equity/fairness" primaryTypographyProps={{variant:'body2'}} />
                        </ListItem>
                        <ListItem style={{paddingTop: 0, paddingBottom: 0}}>
                          <ListItemIcon style={{margin: 0, minWidth: '1.2em'}}>
                            <div style={{borderRadius: '0.2em', width: '0.8em', height: '0.8em', backgroundColor: '#674ea7'}} />
                          </ListItemIcon>
                          <ListItemText primary="Use multimodal instruction" primaryTypographyProps={{variant:'body2'}} />
                        </ListItem>
                      </List>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <GridWrapperDetails>
          <LiteracyDetailsReadingChart
            literacy1={literacy1}
            literacy2={literacy2}
            literacy3={literacy3}
            literacy4={literacy4}
            literacy5={literacy5}
            literacy6={literacy6}
            literacy7={literacy7}
            literacy8={literacy8}
            literacy9={literacy9}
            literacy10={literacy10}
            who={who}
          />
        </GridWrapperDetails>
        <Typography variant="h5" style={{textAlign: "center", fontFamily: 'Arimo'}}>
          Total Length of Observation: {Math.floor((sessionTime/1000)/60)}m {Math.round((((sessionTime/1000)/60) % 1) * 60) }s
        </Typography>
      </Grid>
    </div>
  );
}