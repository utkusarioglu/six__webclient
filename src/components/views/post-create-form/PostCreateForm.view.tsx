import type { FC, ChangeEvent } from 'react';
import { useState } from 'react';
import rest from '_services/rest/rest';
import { selectUser } from '_slices/user/user.slice';
import { selectCommunities } from '_slices/community-repo/community-repo.slice';
import { useSelector } from 'react-redux';
import { delayIfDev } from '_helpers/dev/delayIfDev';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const PostCreateFormView: FC<{}> = () => {
  const classes = useStyles();
  const user = useSelector(selectUser);
  const { updatedAt: communitiesUpdatedAt, list: communities } = useSelector(
    selectCommunities
  );

  const [communityId, setCommunityId] = useState('');
  const [title, setTitle] = useState('first title');
  const [body, setBody] = useState('first body');

  if (user.state !== 'logged-in') {
    return <span>Login to create posts</span>;
  }

  const retrieveCommunities = () => delayIfDev(() => rest.getCommunities());

  if (!communitiesUpdatedAt) {
    retrieveCommunities();
  } else if (Date.now() - communitiesUpdatedAt > 10000) {
    retrieveCommunities();
  }

  if (!communitiesUpdatedAt) {
    return <span>Loading communities...</span>;
  }

  if (!!communitiesUpdatedAt && !communities.length) {
    return <span> no communities to post to</span>;
  }

  const { id: userId } = user;

  const submitOnClick = () => {
    rest.createPost({
      title,
      body,
      communityId,
      userId,
      mediaImagePath: '',
    });
  };

  const selectOnChange: (
    e: ChangeEvent<{ name?: string; value: unknown }>
  ) => void = (e) => {
    const value = e.target.value as string;
    setCommunityId(value);
  };

  return (
    <Container className={classes.root}>
      <TextField
        variant="filled"
        label="Post title"
        className={classes.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        variant="filled"
        label="Post body"
        className={classes.input}
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <FormControl variant="filled" className={classes.input}>
        <InputLabel>Community</InputLabel>
        <Select onChange={selectOnChange}>
          {communities.map((c) => (
            <MenuItem value={c.id}>{c.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        fullWidth={true}
        color="primary"
        onClick={submitOnClick}
      >
        Submit
      </Button>
    </Container>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(),
    },
    input: {
      minWidth: '100%',
      marginBottom: theme.spacing(),
    },
  })
);

export default PostCreateFormView;
