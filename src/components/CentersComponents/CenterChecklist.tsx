import * as React from 'react';
import * as PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import * as Constants from '../../constants';

interface Props {
  switchToCenterMenu(): void,
  addCenter(checked: string): void
}

interface State {
  checked: Array<string>
}

/**
 * Center Checklist
 * @class CenterChecklist
 * @return {void}
 */
class CenterChecklist extends React.Component<Props, State> {
  /**
   *
   * @param {Props} props
   */
  constructor(props: Props){
    super(props);

    this.state = {
      checked: []
    }
  }

  /**
   * adds checked center string to array, or removes if already checked
   * @param {string} value
   * @return {void}
   */
  handleToggle = (value: string) => (): void => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

  /**
   * records all checked centers and changes view to center menu
   */
  handleDone = (): void => {
    this.state.checked.forEach(checked => {
      this.props.addCenter(checked);
    });
    this.props.switchToCenterMenu();
  };

  static propTypes = {
    addCenter: PropTypes.func.isRequired,
    switchToCenterMenu: PropTypes.func.isRequired
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    return (
      <div>
        <Grid container direction="column" justify="center" alignItems="center" style={{paddingTop: '1em'}}>
          <Typography
            component="h4"
            variant="h4"
            align="center"
            style={{ padding: "10px", fontFamily: 'Arimo' }}
          >
            Which centers are open?
          </Typography>
          <Typography variant="h5" align="center" style={{padding: 10, fontFamily: 'Arimo'}}>
            You will have the opportunity to add additional centers if the ones
            in your classroom are not listed here.
          </Typography>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
          >
            <Grid item>
              <List>
                {Constants.CentersFirstHalf.map((value: string, index: number) => (
                  <ListItem
                    key={index}
                    role={undefined}
                    dense
                    button
                    disableRipple
                    onClick={this.handleToggle(value)}
                  >
                    <Checkbox
                      checked={this.state.checked.includes(value)}
                      tabIndex={-1}
                      disableRipple
                    />
                    <ListItemText
                      primary={<Typography variant="h6" style={{fontFamily: "Arimo"}}>{value}</Typography>}
                      disableTypography
                      style={{ whiteSpace: "normal", wordWrap: "break-word", fontFamily: 'Arimo' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item>
              <List>
                {Constants.CentersSecondHalf.map((value: string, index: number) => (
                  <ListItem
                    key={index}
                    role={undefined}
                    dense
                    button
                    disableRipple
                    onClick={this.handleToggle(value)}
                  >
                    <Checkbox
                      checked={this.state.checked.includes(value)}
                      tabIndex={-1}
                      disableRipple
                    />
                    <ListItemText
                      primary={<Typography variant="h6" style={{fontFamily: "Arimo"}}>{value}</Typography>}
                      disableTypography
                      style={{ whiteSpace: "normal", wordWrap: "break-word", fontFamily: 'Arimo' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.handleDone}
            style={{fontFamily: 'Arimo'}}
          >
            Done
          </Button>
        </Grid>
      </div>
    );
  }
}

export default CenterChecklist;