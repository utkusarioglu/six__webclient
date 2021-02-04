import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import AppBarView from '_base/components/views/app-bar/AppBar.view';
import PostFeeRoute from '_base/components/routes/post-feed/PostFeed.route';
import PostDetailsRoute from '_routes/post-details/PostDetails.route';
import ProfileRoute from '_routes/profile/Profile.route';
import SettingsRoute from '_routes/settings/Settings.route';
import CommunityRoute from '_routes/community/Community.route';

const AppRouter = () => {
  return (
    <>
      <Router>
        <AppBarView />
        <Switch>
          <Route path="/" exact>
            <PostFeeRoute />
          </Route>

          <Route path="/r/:communitySlug" exact>
            <CommunityRoute />
          </Route>

          <Route path="/r/:communitySlug/:postSlug" exact>
            <PostDetailsRoute />
          </Route>

          <Route path="/u/settings" exact>
            <SettingsRoute />
          </Route>

          <Route path="/u/:userSlug" exact>
            <ProfileRoute />
          </Route>

          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default AppRouter;
