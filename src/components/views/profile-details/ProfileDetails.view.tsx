import ProfileBottomNavigationView from '_views/profile-bottom-navigation/ProfileBottomNavigation.view';

const ProfileView = () => {
  // this value should be a string literal union
  const tabSelection = (selectionValue: string) => {
    console.log('tabSelection', selectionValue);
  };

  return <ProfileBottomNavigationView tabChangeFunction={tabSelection} />;
};

export default ProfileView;
