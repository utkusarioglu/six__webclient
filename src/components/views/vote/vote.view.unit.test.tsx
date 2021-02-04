import { createMount } from '@material-ui/core/test-utils';
import VoteView from './vote.view';
import { VoteViewProps } from './vote.view.types';
import Chance from 'chance';

let render: any;
const chance = Chance();

describe('VoteView', () => {
  beforeEach(() => {
    render = createMount();
  });

  it('Sets right vote-count', () => {
    Array(100)
      .fill(null)
      .forEach((_) => {
        const props: VoteViewProps = {
          likeCount: chance.integer(),
          dislikeCount: chance.integer(),
        };

        const wrapper = render(<VoteView {...props} />);
        expect(wrapper.prop('likeCount')).toEqual(props.likeCount);
        expect(wrapper.prop('dislikeCount')).toEqual(props.dislikeCount);
        expect(
          wrapper.find('[data-testid="vote-count"]').last().text()
        ).toEqual((props.likeCount - props.dislikeCount).toString());
      });
  });

  it.only('Sets tooltip title correctly', () => {
    const props: VoteViewProps = {
      likeCount: chance.integer(),
      dislikeCount: chance.integer(),
    };

    const wrapper = render(<VoteView {...props} />);

    const propTitle = wrapper
      .find('[data-testid="tooltip"]')
      .last()
      .prop('title');

    expect(propTitle).toContain(props.likeCount);
    expect(propTitle).toContain(props.dislikeCount);
    expect(propTitle).toContain(`like${props.likeCount === 1 ? '' : 's'}`);
    expect(propTitle).toContain(
      `dislike${props.dislikeCount === 1 ? '' : 's'}`
    );
  });
});
