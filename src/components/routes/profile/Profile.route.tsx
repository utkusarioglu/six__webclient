import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import ProfileLayout from '_layouts/profile/Profile.layout';

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
      <ProfileLayout />
    </>
  );
};

export default ProfileRoute;
