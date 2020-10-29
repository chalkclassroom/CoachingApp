import * as React from 'react';
import AppBar from '../../../components/AppBar';
import LogoImage from '../../../assets/images/LogoImage.svg';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FirebaseContext from '../../../components/Firebase/FirebaseContext';
import * as Types from '../../../constants/Types';

/**
 * @function LiteracyTrainingPage
 * @return {ReactElement}
 */
function LiteracyTrainingPage(): React.ReactElement {
  return (
    <div style={{width: '100vw', height: '100vh'}}>
      <FirebaseContext.Consumer>
        {(firebase: Types.FirebaseAppBar): React.ReactNode => <AppBar firebase={firebase} />}
      </FirebaseContext.Consumer>
      <Grid container direction="column" justify="center" alignItems="center" style={{height: '88vh'}}>
        <Grid item>
          <img src={LogoImage} alt="CHALK" height="100vh" />
        </Grid>
        <Grid item style={{paddingTop: '3em'}}>
          <Typography variant="h4" style={{fontFamily: 'Arimo'}}>
            Literacy Training coming soon!
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default LiteracyTrainingPage;