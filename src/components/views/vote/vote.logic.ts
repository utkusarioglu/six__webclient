import rest from '_services/rest/rest';
import snacks from '_services/snacks/snacks';
import { delayIfDev } from '_helpers/dev/delayIfDev';
import { StoreUser } from '_slices/user/user.slice.types';

export function votePost(
  user: StoreUser,
  setIsSubmittingVote: (i: boolean) => void,
  id: string
) {
  return (voteSelection: 1 | -1) => {
    if (user.state === 'logged-in') {
      setIsSubmittingVote(true);

      delayIfDev(() => {
        rest
          .votePost({
            voteType: voteSelection,
            userId: user.id,
            postId: id,
          })
          .then((response) => {
            setIsSubmittingVote(false);
            if (!response || response.state === 'fail') {
              snacks.push('voteSubmitFail');
              return;
            }
          });
      });
    }
  };
}
