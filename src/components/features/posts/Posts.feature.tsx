import type { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '_store/root.reducer';
import rest from '_services/rest/rest';

const mapState = (state: RootState) => ({
  list: state.posts.list,
});
const mapDispatch = {};
const connector = connect(mapState, mapDispatch);

/** StoreProps shall match the props consumed by the view component */
type StoreProps = ConnectedProps<typeof connector>;
type ViewComponent = FC<StoreProps>;
type OwnProps = {
  ViewComponent: ViewComponent;
};
type Props = OwnProps & StoreProps;

const PostsFeature: FC<Props> = ({ ViewComponent, ...props }) => {
  if (props.list.length === 0) {
    setTimeout(() => {
      rest.get('posts');
    }, 1000);
  }

  return <ViewComponent {...props} />;
};
const ConnectedComponent = connector(PostsFeature);

type WithState = (ViewComponent: ViewComponent) => () => JSX.Element;
export const withState: WithState = (ViewComponent) => {
  return () => <ConnectedComponent {...{ ViewComponent }} />;
};
