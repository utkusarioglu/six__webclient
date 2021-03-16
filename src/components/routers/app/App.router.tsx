import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import AppBarView from '_views/app-bar/AppBar.view';
import PostFeeRoute from '_routes/post-feed/PostFeed.route';
import PostDetailsRoute from '_routes/post-details/PostDetails.route';
import ProfileRoute from '_routes/profile/Profile.route';
import SettingsRoute from '_routes/settings/Settings.route';
import CommunityRoute from '_routes/community/Community.route';
import SnacksView from '_views/snacks/Snacks.view';
import LoginRoute from '_routes/login/Login.route';
import SignupRoute from '_routes/signup/Signup.route';
import CommunitiesRoute from '_routes/communities/Communities.route';
import LogoutRoute from '_routes/logout/Logout.route';
import PostCreateRoute from '_routes/post-create/PostCreate.route';
import CommunityCreateRoute from '_routes/community-create/CommunityCreate.route';

const AppRouter = () => {
  return (
    <>
      <Router>
        <AppBarView />
        <Switch>
          <Route path="/" exact>
            <PostFeeRoute />
          </Route>

          <Route path="/login" exact>
            <LoginRoute />
          </Route>

          <Route path="/signup" exact>
            <SignupRoute />
          </Route>

          <Route path="/logout" exact>
            <LogoutRoute />
          </Route>

          <Route path="/communities" exact>
            <CommunitiesRoute />
          </Route>

          <Route path="/community/create" exact>
            <CommunityCreateRoute />
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

          <Route path="/post/create">
            <PostCreateRoute />
          </Route>

          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>

        <SnacksView />
      </Router>
    </>
  );
};

export default AppRouter;
