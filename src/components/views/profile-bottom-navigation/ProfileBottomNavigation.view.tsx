import type { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PersonIcon from '@material-ui/icons/Person';
import NoteIcon from '@material-ui/icons/Note';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

interface ProfileBottomNavigationViewProps {
  activeTab: number;
  tabChangeFunction: (newValue: number) => void;
}

const ProfileBottomNavigationView: FC<ProfileBottomNavigationViewProps> = ({
  activeTab,
  tabChangeFunction,
}) => {
  const classes = useStyles();

  return (
    <BottomNavigation
      value={activeTab}
      onChange={(_event, newValue) => {
        tabChangeFunction(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        label="Overview"
        icon={<PersonIcon />}
        value={0}
      />
      <BottomNavigationAction label="Posts" icon={<NoteIcon />} value={1} />
      <BottomNavigationAction
        label="Comments"
        icon={<ChatBubbleIcon />}
        value={2}
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
