import { useState } from 'react';
import ProfileBottomNavigationView from '_views/profile-bottom-navigation/ProfileBottomNavigation.view';
import { TabPanelView } from '_views/tab-panel/TabPanel.view';
import { selectUser } from '_slices/user/user.slice';
import { useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const ProfileView = () => {
  const classes = useStyles();
  const user = useSelector(selectUser);

  const [activeTab, setActiveTab] = useState(0);

  // this value should be a string literal union
  const tabSelection = (selectionValue: number) => {
    setActiveTab(selectionValue);
  };

  return (
    <>
      <TabPanelView value={activeTab} index={0}>
        <Container className={classes.userDetailsContainer}>
          <Avatar className={classes.avatar} />
          <Typography variant="h4" align="center">
            Username
          </Typography>
          <Typography variant="subtitle1" align="center">
            u/user-slug
          </Typography>
        </Container>
      </TabPanelView>

      <TabPanelView value={activeTab} index={1}>
        <span>posts</span>
      </TabPanelView>

      <TabPanelView value={activeTab} index={2}>
        <span>comments</span>
      </TabPanelView>

      <ProfileBottomNavigationView
        activeTab={activeTab}
        tabChangeFunction={tabSelection}
      />
    </>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    avatar: {
      height: 120,
      width: 120,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(),
    },
    userDetailsContainer: {
      marginTop: theme.spacing(),
    },
  })
);

export default ProfileView;
