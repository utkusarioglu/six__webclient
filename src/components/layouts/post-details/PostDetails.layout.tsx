import type { FC } from 'react';
import CommentsView from '_base/components/views/comments/Comments.view';
import PostDetailsView from '_views/post-details/PostDetails.view';

//! these props are connected to the router slug, this connection should be established
type PostDetailsLayoutProps = {
  communitySlug: string;
  postSlug: string;
};

const PostDetailsLayout: FC<PostDetailsLayoutProps> = ({
  communitySlug,
  postSlug,
}) => {
  return (
    <>
      <PostDetailsView {...{ communitySlug, postSlug }} />
      <CommentsView {...{ postSlug }} />
    </>
  );
};

export default PostDetailsLayout;
