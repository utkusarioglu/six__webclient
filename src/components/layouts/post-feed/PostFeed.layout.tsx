import PostCreateButtonView from '_views/post-create-button/PostCreateButton.view';
import PostFeedView from '_views/post-feed/PostFeed.view';

const PostFeedLayout = () => {
  return (
    <>
      <PostCreateButtonView />
      <PostFeedView />
    </>
  );
};

export default PostFeedLayout;
