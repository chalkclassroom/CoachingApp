import * as React from 'react';
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import LiteracyDetailsLanguageChart from './LiteracyDetailsLanguageChart';
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

export default function LiteracyDetailsLanguage(props: Props) {
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
        <Grid item style={{paddingTop: '0.5em'}}>
          <Typography variant="h5" style={{textAlign: "center", fontFamily: 'Arimo'}}>
            {who === 'Teacher' ? 'Teacher ' : 'Child '} Behaviors
          </Typography>
        </Grid>
        <Grid container justify={"center"} direction={"column"}>
          <Grid item>
            <Grid container direction="column" justify="flex-start">
              <Typography align="left" variant="body2" style={{fontFamily: 'Arimo', paddingLeft: '1em'}}>
                How often did teachers:
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
                          <ListItemText primary="Talk with children about vocabulary or social-emotional topics" primaryTypographyProps={{variant:'body2'}} />
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
                            <div style={{borderRadius: '0.2em', width: '0.8em', height: '0.8em', backgroundColor: '#6aa84f'}} />
                          </ListItemIcon>
                          <ListItemText primary="Encourage children to talk" primaryTypographyProps={{variant:'body2'}} />
                        </ListItem>
                        <ListItem style={{paddingTop: 0, paddingBottom: 0}}>
                          <ListItemIcon style={{margin: 0, minWidth: '1.2em'}}>
                            <div style={{borderRadius: '0.2em', width: '0.8em', height: '0.8em', backgroundColor: Constants.Colors.LI}} />
                          </ListItemIcon>
                          <ListItemText primary="Respond to children" primaryTypographyProps={{variant:'body2'}} />
                        </ListItem>
                      </List>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <LiteracyDetailsLanguageChart
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