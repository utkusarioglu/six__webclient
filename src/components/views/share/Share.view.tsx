import type { FC } from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import ShareIcon from '@material-ui/icons/Share';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import CodeIcon from '@material-ui/icons/Code';
import MailIcon from '@material-ui/icons/Mail';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const useStyles = makeStyles({
  fullList: {
    width: 'auto',
  },
});

export default function ShareView() {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setIsOpen(open);
  };

  const ListContent = () => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <DividedListBuilder {...{ dividedItems: shareOptions }} />
    </div>
  );

  return (
    <div>
      <>
        <IconButton
          aria-label="share"
          onClick={toggleDrawer(true)}
          size="small"
        >
          <ShareIcon fontSize="small" />
        </IconButton>
        <Drawer anchor="bottom" open={isOpen} onClose={toggleDrawer(false)}>
          <ListContent />
        </Drawer>
      </>
    </div>
  );
}

interface ShareListItem {
  text: string;
  icon: React.ReactNode;
}

const shareOptions: ShareListItem[][] = [
  [
    { text: 'Facebook', icon: <FacebookIcon /> },
    { text: 'Instagram', icon: <InstagramIcon /> },
    { text: 'Twitter', icon: <TwitterIcon /> },
    { text: 'WhatsApp', icon: <WhatsAppIcon /> },
    { text: 'Linkedin', icon: <LinkedInIcon /> },
    { text: 'Mail', icon: <MailIcon /> },
  ],
  [
    { text: 'Copy Link', icon: <FileCopyIcon /> },
    { text: 'Crosspost', icon: <ShuffleIcon /> },
    { text: 'Embed', icon: <CodeIcon /> },
  ],
];

interface ListBuilderProps {
  items: ShareListItem[];
}

const ListBuilder: FC<ListBuilderProps> = ({ items }) => (
  <List>
    {items.map((item) => (
      <ListItem button key={item.text}>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.text} />
      </ListItem>
    ))}
  </List>
);

interface DividedListBuilderProps {
  dividedItems: ShareListItem[][];
}

// @ts-ignore
const DividedListBuilder: FC<DividedListBuilderProps> = ({ dividedItems }) => {
  return dividedItems.reduce((prev, list, index) => {
    prev.push(<ListBuilder {...{ items: list }} />);
    index < dividedItems.length - 1 && prev.push(<Divider />);
    return prev;
  }, [] as React.ReactNode[]);
};
