import ProfileBottomNavigationView from '_base/components/views/profile-bottom-navigation/ProfileBottomNavigation.view';

const ProfileLayout = () => {
  // this value should be a string literal union
  const tabSelection = (selectionValue: string) => {
    console.log('tabSelection', selectionValue);
  };

  return (
    <>
      <ProfileBottomNavigationView tabChangeFunction={tabSelection} />
    </>
  );
};

export default ProfileLayout;
