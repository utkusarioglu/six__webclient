import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

interface ProfileRouteParams {
  userSlug: string;
}

const ProfileRoute = () => {
  const { userSlug } = useParams<ProfileRouteParams>();
  const { pathname, search } = window.location;
  ReactGA.pageview(pathname + search);

  return (
    <>
      <Helmet>
        <title>{userSlug} - Reddit</title>
      </Helmet>
      <span>This is where the user profile will be displayed</span>
    </>
  );
};

export default ProfileRoute;
