import type { FC } from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PersonIcon from '@material-ui/icons/Person';
import NoteIcon from '@material-ui/icons/Note';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import domLinkHelper from '_base/components/helpers/dom-link/DomLink.helper';

interface ProfileBottomNavigationViewProps {
  tabChangeFunction: (newValue: string) => void;
}

const ProfileBottomNavigationView: FC<ProfileBottomNavigationViewProps> = ({
  tabChangeFunction,
}) => {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState('overview');

  const OverviewLink = domLinkHelper('/u/profile/overview');

  // console.log(tabValue);

  return (
    <BottomNavigation
      value={tabValue}
      onChange={(_event, newValue) => {
        setTabValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        component={OverviewLink}
        label="Overview"
        icon={<PersonIcon />}
        value="overview"
      />
      <BottomNavigationAction label="Posts" icon={<NoteIcon />} value="posts" />
      <BottomNavigationAction
        label="Comments"
        icon={<ChatBubbleIcon />}
        value="comments"
      />
    </BottomNavigation>
  );
};

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default ProfileBottomNavigationView;
