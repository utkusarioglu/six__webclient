import type { FC, ChangeEvent } from 'react';
import { useState } from 'react';
import Container from '@material-ui/core/Container';
import { useSelector } from 'react-redux';
import PostCardComfyView from '_views/post-card-comfy/PostCardComfy.view';
import PostCardCompactView from '_views/post-card-compact/PostCardCompact.view';
import rest from '_services/rest/rest';
import { selectPostRepo } from '_slices/post-repo/posts-repo.slice';
import { emptyPost } from '_slices/post/post.slice.constants';
import { delayIfDev } from '_helpers/dev/delayIfDev';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import domLinkHelper from '_helpers/dom-link/DomLink.helper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import ViewStreamIcon from '@material-ui/icons/ViewStream';
import { createStyles, makeStyles } from '@material-ui/core/styles';

type SelectOnChange = (e: ChangeEvent<{ value: unknown }>) => void;

interface PostFeedViewProps {
  communitySlug?: string;
}

const PostFeedView: FC<PostFeedViewProps> = ({ communitySlug }) => {
  const classes = useStyles();
  const { updatedAt, list: posts } = useSelector(selectPostRepo);
  const getPosts = () =>
    delayIfDev(() => {
      if (communitySlug) {
        rest.getCommunityPosts(communitySlug);
      } else {
        rest.getPosts();
      }
    });
  const [feedType, setFeedType] = useState('best');
  const [cardType, setCardType] = useState('comfy');
  // This is faulty logic
  if (!updatedAt) {
    getPosts();
    return <PostCardComfySkeletonsView />;
  } else if (Date.now() - updatedAt > 10000) {
    // instead show a prompt to the user
    getPosts();
  }

  if (updatedAt && !posts.length) {
    return <FollowMoreCommunitiesView />;
  }

  const selectFeedTypeOnChange: SelectOnChange = (e) => {
    const value = e.target.value as string;
    setFeedType(value);
  };

  const selectCardTypeOnChange: SelectOnChange = (e) => {
    const value = e.target.value as string;
    setCardType(value);
  };

  return (
    <>
      <Container>
        <Grid container className={classes.postFeedControls}>
          <Select
            value={feedType}
            onChange={selectFeedTypeOnChange}
            disableUnderline
          >
            <MenuItem value="best">Best</MenuItem>
            <MenuItem value="new">New</MenuItem>
            <MenuItem value="top">Top</MenuItem>
          </Select>

          <Select
            value={cardType}
            onChange={selectCardTypeOnChange}
            disableUnderline
          >
            <MenuItem value="comfy">
              <ViewStreamIcon />
            </MenuItem>
            <MenuItem value="compact">
              <FormatAlignJustifyIcon />
            </MenuItem>
          </Select>
        </Grid>
      </Container>
      <Container disableGutters className={classes.postCardContainer}>
        {posts &&
          cardType === 'comfy' &&
          posts.map((post) => (
            <PostCardComfyView
              {...{ key: post.id, asSkeleton: false, ...post }}
            />
          ))}
        {posts &&
          cardType === 'compact' &&
          posts.map((post) => (
            <PostCardCompactView
              {...{ key: post.id, asSkeleton: false, ...post }}
            />
          ))}
      </Container>
    </>
  );
};

export default PostFeedView;

const PostCardComfySkeletonsView = () => {
  return (
    <>
      {Array(3)
        .fill(null)
        .map((_, idx) => (
          <PostCardComfyView
            {...{
              key: idx,
              asSkeleton: true,
              ...emptyPost,
            }}
          />
        ))}
    </>
  );
};

const FollowMoreCommunitiesView = () => (
  <Container>
    <Typography>There isn't anything new...</Typography>
    <Typography>
      You need to follow more communities.{' '}
      <Link component={domLinkHelper('/communities')}>Click here</Link>
    </Typography>
  </Container>
);

const useStyles = makeStyles((theme) =>
  createStyles({
    postFeedControls: {
      justifyContent: 'space-between',
    },
    postCardContainer: {
      paddingBottom: theme.spacing(),
    },
  })
);
