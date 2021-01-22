import { PostsResponse } from 'six__public-api';
import _ from 'lodash';
import Chance from 'chance';

export const chance = new Chance();

export const mockPosts: () => PostsResponse = () =>
  Array(10)
    .fill(null)
    .map(() => ({
      id: chance.guid(),
      createdAt: chance.date().toDateString(),
      postTitle: chance.sentence(),
      postBody: chance.paragraph({ sentences: 5 }),
      postSlug: _.kebabCase(chance.sentence()),
      voteCount: chance.integer(),
      commentCount: chance.integer(),
      uniqueCommenterCount: chance.integer(),
      communityName: chance.animal(),
      communitySlug: chance.animal().toLowerCase(),
      mediaImagePath: chance.url({ extensions: ['jpg'] }),
      mediaType: 'none' as 'none',
    }));
