import * as React from 'react';
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import LiteracyDetailsFoundationalChart from './LiteracyDetailsFoundationalChart';
import * as Constants from '../../../constants/Constants';
import { GridWrapperDetails_lg } from '../../ResultsComponents/ChartWrappers';

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
    literacy9,
    literacy10,
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
                How often did {who === 'Teacher' ? 'the teacher' : 'children'} focus on:
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
                          <ListItemText primary="Phonological awareness or the sounds of language" primaryTypographyProps={{variant:'body2'}} />
                        </ListItem>
                        <ListItem style={{paddingTop: 0, paddingBottom: 0}}>
                          <ListItemIcon style={{margin: 0, minWidth: '1.2em'}}>
                            <div style={{borderRadius: '0.2em', width: '0.8em', height: '0.8em', backgroundColor: '#6aa84f'}} />
                          </ListItemIcon>
                          <ListItemText primary="The alphabetic principle and print concepts" primaryTypographyProps={{variant:'body2'}} />
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
                          <ListItemText primary={who === 'Teacher' ? "Open-ended questions or prompts" : "Responding to open-ended questions"} primaryTypographyProps={{variant:'body2'}} />
                        </ListItem>
                        <ListItem style={{paddingTop: 0, paddingBottom: 0}}>
                          <ListItemIcon style={{margin: 0, minWidth: '1.2em'}}>
                            <div style={{borderRadius: '0.2em', width: '0.8em', height: '0.8em', backgroundColor: Constants.Colors.LI}} />
                          </ListItemIcon>
                          <ListItemText primary="Realistic reading and writing" primaryTypographyProps={{variant:'body2'}} />
                        </ListItem>
                        {who === 'Teacher' ? (
                          <ListItem style={{paddingTop: 0, paddingBottom: 0}}>
                            <ListItemIcon style={{margin: 0, minWidth: '1.2em'}}>
                              <div style={{borderRadius: '0.2em', width: '0.8em', height: '0.8em', backgroundColor: '#674ea7'}} />
                            </ListItemIcon>
                            <ListItemText primary="Multimodal instruction" primaryTypographyProps={{variant:'body2'}} />
                          </ListItem>
                        ) : (<div />)}
                      </List>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <GridWrapperDetails_lg>
          <LiteracyDetailsFoundationalChart
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
        </GridWrapperDetails_lg>
      </Grid>
    </div>
  );
}