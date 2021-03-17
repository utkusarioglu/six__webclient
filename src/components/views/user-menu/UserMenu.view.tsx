import type { MouseEvent, KeyboardEvent } from 'react';
import { useState } from 'react';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import IconButton from '@material-ui/core/IconButton';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import ListItem from '@material-ui/core/ListItem';
import PostAddIcon from '@material-ui/icons/PostAdd';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AppsIcon from '@material-ui/icons/Apps';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import { useSelector } from 'react-redux';
import domLinkHelper from '_helpers/dom-link/DomLink.helper';
import { selectUser } from '_slices/user/user.slice';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const RightDrawerMenuView = () => {
  const classes = useStyles();
  const user = useSelector(selectUser);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (
    event: KeyboardEvent | MouseEvent
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as KeyboardEvent).key === 'Tab' ||
        (event as KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setIsDrawerOpen(open);
  };

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {user.state === 'logged-in' ? (
        <Container
          className={classes.userCardContainer}
          component={domLinkHelper(user.userUrl)}
        >
          <Avatar className={classes.avatar} />
          <Typography align="center" variant="h5" color="textPrimary">
            {user.username}
          </Typography>
          <Typography align="center" variant="body2" color="textPrimary">
            {user.userStylizedUrl}
          </Typography>
        </Container>
      ) : (
        <Container className={classes.userCardContainer}>
          <Avatar className={classes.avatar} />
          <Typography align="center" variant="h5">
            visitor
          </Typography>
        </Container>
      )}

      <Divider />

      <List>
        <ListItem button component={domLinkHelper('/post/create')}>
          <ListItemIcon>
            <PostAddIcon />
          </ListItemIcon>
          <ListItemText primary="Create a Post" />
        </ListItem>
      </List>

      <Divider />

      <List>
        <ListItem button component={domLinkHelper('/communities')}>
          <ListItemIcon>
            <AppsIcon />
          </ListItemIcon>
          <ListItemText primary="Communities" />
        </ListItem>

        <ListItem button component={domLinkHelper('/community/create')}>
          <ListItemIcon>
            <AddCircleOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="Create a community" />
        </ListItem>
      </List>

      <Divider />

      <List>
        {user.state === 'logged-in' ? (
          <>
            <ListItem button component={domLinkHelper(user.userUrl)}>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>

            <ListItem button component={domLinkHelper('/settings')}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>

            <ListItem button component={domLinkHelper('/logout')}>
              <ListItemIcon>
                <DirectionsRunIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button component={domLinkHelper('/signup')}>
              <ListItemIcon>
                <EmojiPeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Sign up" />
            </ListItem>
            <ListItem button component={domLinkHelper('/login')}>
              <ListItemIcon>
                <BubbleChartIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
          </>
        )}
      </List>
    </div>
  );

  const anchor = 'right';

  return (
    <div>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-haspopup="true"
        color="inherit"
        onClick={toggleDrawer(true)}
      >
        {user.state === 'logged-in' ? <AccountCircle /> : <MenuIcon />}
      </IconButton>
      <SwipeableDrawer
        anchor={anchor}
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    </div>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    list: {
      width: 250,
    },
    avatar: {
      height: 100,
      width: 100,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: theme.spacing(),
    },
    userCardContainer: {
      marginTop: 30,
      marginBottom: 30,
      textDecoration: 'none',
    },
  })
);

export default RightDrawerMenuView;
