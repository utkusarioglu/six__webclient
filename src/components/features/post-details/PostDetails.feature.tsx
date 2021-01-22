import type { FC } from 'react';
import type { Post } from 'six__public-api';
import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '_store/root.reducer';
import rest from '_services/rest/rest';
import { PostDetailsParams } from './PostDetails.feature.types';

const mapState = (state: RootState) => ({
  list: state.posts.list,
});
const mapDispatch = {};
const connector = connect(mapState, mapDispatch);

/** StoreProps shall match the props consumed by the view component */
type StoreProps = ConnectedProps<typeof connector>;
type ViewComponent<ViewComponentProps = StoreProps> = FC<ViewComponentProps>;
type OwnProps = {
  ViewComponent: ViewComponent;
};
type Props = OwnProps & StoreProps;

const PostDetailsFeature: FC<Props> = ({ ViewComponent, ...props }) => {
  const { postSlug } = useParams<PostDetailsParams>();

  const post: Post = props.list
    .filter((item) => item.postSlug === postSlug)
    .pop() as Post;

  if (!post) {
    setTimeout(() => {
      rest.get('posts');
    }, 2000);
  }

  return <ViewComponent {...{ ...props, post }} />;
};
const ConnectedComponent = connector(PostDetailsFeature);

type WithState<ViewComponentProps> = (
  ViewComponent: ViewComponent<ViewComponentProps>
) => () => JSX.Element;

export const withState: WithState<StoreProps> = (ViewComponent) => {
  return () => <ConnectedComponent {...{ ViewComponent }} />;
};
