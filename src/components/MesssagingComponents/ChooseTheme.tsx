import * as React from 'react';
import { Select, MenuItem } from '@material-ui/core';
// import actionPlanIcon from '../../assets/icons/talk.svg';
// import feedbackIcon from '../../assets/icons/check-mark.svg';
// import newMessageIcon from '../../assets/icons/files-and-folders.svg';
// import thankYouIcon from '../../assets/icons/chat-bubbles.svg';
import { ThemeOptions, SelectOption } from './MessagingTypes';

interface ChooseThemeProps {
  // what the current theme of the message is
  currentTheme: ThemeOptions;
  // called when another theme is selected
  changeTheme: (newTheme: keyof typeof ThemeOptions) => void;
};

const ChooseTheme: React.FC<ChooseThemeProps> = (props: ChooseThemeProps) => {
  
  /*
  // commented out as styling of the component itself is currently weird
  // get icon related to the current theme
  const getIcon = (theme: ThemeOptions) => {
    if(theme === ThemeOptions.THANK_YOU) {
      return thankYouIcon;
    } else if (theme === ThemeOptions.FEEDBACK) {
      return feedbackIcon;
    } else if (theme === ThemeOptions.ACTION_PLAN) {
      return actionPlanIcon;
    } else {
      return newMessageIcon;
    }
  };
  */

  // Select component needs the array of objects to have keys "value" and "label". It 
  // displays the content in "label" and returns the content in "value". This is creating
  // a list of options for the dropdown 
  const themeList: SelectOption[] = Object.keys(ThemeOptions).map(o => { return {value: ThemeOptions[o], id: '', label: ThemeOptions[o]} });
  console.log(themeList);

  return (
    <Select
      value={props.currentTheme}
      onChange={props.changeTheme}
    >
      {
        themeList.map((theme: SelectOption): JSX.Element => 
          <MenuItem value={theme.value} key={theme.value}>{theme.label}</MenuItem>
        )
      }
    </Select>
  );
};

export default ChooseTheme;

