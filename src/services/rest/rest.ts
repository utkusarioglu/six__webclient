import type { AxiosInstance } from 'axios';
import axios from 'axios';
import { API_ENDPOINT } from '_base/config';
import {
  clearPostRepo,
  updatePostRepo,
} from '_slices/post-repo/posts-repo.slice';
import {
  UserEndpoint,
  PostEndpoint,
  CommunityEndpoint,
  SuccessfulUserLoginRes,
  CommunityActionTypes,
  CommentEndpoint,
} from 'six__public-api';
import { PostsState } from '_slices/post-repo/posts-repo.slice.types';
import { setComments } from '_slices/comments/comments.slice';
import { setUser } from '_slices/user/user.slice';
import { setPost } from '_slices/post/post.slice';
import { setCommunities } from '_slices/communities/communities.slice';

class Rest {
  private _axios: AxiosInstance;
  private _requestCounter: number = 0;

  /**
   * Creates axios instance with the
   */
  constructor() {
    const axiosConfig = {
      baseURL: API_ENDPOINT,
      timeout: 1000,
    };
    this._axios = axios.create(axiosConfig);
  }

  /**
   * Prepares an endpoint to which the app will connect. The method also ensures
   * type safety through the generics
   *
   * @generics
   * @param Endpoint endpoint string literal from public api
   * @param Params types for the parameters that will be placed as request params
   * and will be accessed by the express server with `req.params`
   *
   * @param endpoint endpoint to format skeleton to which the connection will be made
   * @param params params that shall be placed into the skeleton
   */
  private prepareEndpoint<Endpoint extends string, Params>(
    endpoint: Endpoint,
    params?: Params
  ): string {
    let preparedEndpoint: string = endpoint;

    if (params) {
      Object.entries(params).forEach(([strRepresentation, param]) => {
        preparedEndpoint = preparedEndpoint.replace(
          `:${strRepresentation}`,
          param
        );
      });
    }
    console.log(preparedEndpoint);
    return preparedEndpoint;
  }

  /**
   * Creates a unique request id to be used in each request to the server
   */
  createRequestId(): string {
    this._requestCounter++;
    return this._requestCounter.toString();
  }

  // !any
  handleError(data: any): void {
    console.error('Server returned error: \n', data);
  }

  /**
   * Retrieves Posts for post repo
   */
  getPosts() {
    type Method = PostEndpoint['_list']['_v1'];
    type Response = Method['_get']['_res']['Union'];
    type Endpoint = Method['Endpoint'];
    type Params = Method['_get']['_req']['Params'];

    const requestId = this.createRequestId();

    return this._axios
      .get<Response>(
        this.prepareEndpoint<Endpoint, Params>('/posts/:requestId', {
          requestId,
        })
      )
      .then(({ data }) => {
        if (data.state === 'fail') {
          return this.handleError(data);
        } else {
          updatePostRepo(data.body);
        }

        return data;
      })
      .catch(this.handleError);
  }

  /**
   * Retrieves a single post by its slug
   *
   * @param postSlug slug for the post to be retrieved
   */
  getPostBySlug(postSlug: PostsState['list'][0]['postSlug']) {
    type Method = PostEndpoint['_single']['_v1'];
    type Response = Method['_get']['_res']['Union'];
    type Endpoint = Method['Endpoint'];
    type Params = Method['_get']['_req']['Params'];

    const requestId = this.createRequestId();
    console.log('requestId', requestId);

    return this._axios
      .get<Response>(
        this.prepareEndpoint<Endpoint, Params>(
          '/post/slug/:postSlug/:requestId',
          {
            postSlug,
            requestId,
          }
        )
      )
      .then(({ data }) => {
        if (data.state === 'fail') {
          return this.handleError(data);
        } else {
          setPost(data.body);
        }

        return data;
      })
      .catch(this.handleError);
  }

  getCommunities() {
    type Method = CommunityEndpoint['_list']['_v1'];
    type Response = Method['_get']['_res']['Union'];
    type Endpoint = Method['Endpoint'];
    type Params = Method['_get']['_req']['Params'];

    const requestId = this.createRequestId();

    return this._axios
      .get<Response>(
        this.prepareEndpoint<Endpoint, Params>('/communities/:requestId', {
          requestId,
        })
      )
      .then(({ data }) => {
        if (data.state === 'fail') {
          return this.handleError(data);
        } else {
          setCommunities(data.body);
        }

        return data;
      })
      .catch(this.handleError);
  }

  /**
   * Retrieves the comments for a single post by the post slug
   *
   * @param postId slug of the post for which the comments will be retrieved
   */
  getCommentsByPostId(postId: PostsState['list'][0]['postId']) {
    type Method = PostEndpoint['_comments']['_v1'];
    type Response = Method['_get']['_res']['Union'];
    type Endpoint = Method['Endpoint'];
    type Params = Method['_get']['_req']['Params'];

    const requestId = this.createRequestId();

    return this._axios
      .get<Response>(
        this.prepareEndpoint<Endpoint, Params>(
          '/post/:postId/comments/:requestId',
          {
            requestId,
            postId,
          }
        )
      )
      .then(({ data }) => {
        if (data.state === 'fail') {
          return this.handleError(data);
        } else {
          setComments(data.body);
        }

        return data;
      })
      .catch(this.handleError);
  }

  userCommunitySubscription(
    username: SuccessfulUserLoginRes['username'],
    communityId: CommunityEndpoint['_single']['_v1']['_get']['_res']['Success']['body']['id'],
    actionType: CommunityActionTypes
  ) {
    type Method = UserEndpoint['_user_community_subscription']['_alter']['_v1'];
    type Response = Method['_post']['_res']['Union'];
    type Endpoint = Method['Endpoint'];
    type Params = Method['_post']['_req']['Params'];

    const requestId = this.createRequestId();

    return this._axios
      .post<Response>(
        this.prepareEndpoint<Endpoint, Params>(
          'user/:username/:actionType/:communityId/:requestId',
          {
            requestId,
            username,
            communityId,
            actionType,
          }
        )
      )
      .then((response) => {
        console.log(response);
      })
      .catch(this.handleError);
  }

  logout() {
    type Method = UserEndpoint['_logout']['_v1'];
    type Response = Method['_post']['_res']['Union'];
    type Endpoint = Method['Endpoint'];
    type Params = Method['_post']['_req']['Params'];

    const requestId = this.createRequestId();
    return this._axios
      .post<Response>(
        this.prepareEndpoint<Endpoint, Params>('/logout/v1/:requestId', {
          requestId,
        })
      )
      .then(({ data }) => {
        if (data.state === 'fail') {
          return this.handleError(data);
        } else {
          setUser(data.body);
          clearPostRepo();
        }

        return data;
      })
      .catch(this.handleError);
  }

  login(requestInput: UserEndpoint['_login']['_v1']['_post']['_req']['Body']) {
    type Method = UserEndpoint['_login']['_v1'];
    type Response = Method['_post']['_res']['Union'];
    type Endpoint = Method['Endpoint'];
    type Params = Method['_post']['_req']['Params'];

    const requestId = this.createRequestId();

    return this._axios
      .post<Response>(
        this.prepareEndpoint<Endpoint, Params>('/login/v1/:requestId', {
          requestId,
        }),
        requestInput
      )
      .then(({ data }) => {
        if (data.state === 'fail') {
          this.handleError(data);
        } else {
          setUser(data.body);
          clearPostRepo();
        }

        return data;
      })
      .catch(this.handleError);
  }

  signup(data: UserEndpoint['_signup']['_v1']['_post']['_req']['Body']) {
    type Method = UserEndpoint['_signup']['_v1'];
    type Response = Method['_post']['_res']['Union'];
    type Endpoint = Method['Endpoint'];
    type Params = Method['_post']['_req']['Params'];

    const requestId = this.createRequestId();

    return this._axios
      .post<Response>(
        this.prepareEndpoint<Endpoint, Params>('/signup/v1/:requestId', {
          requestId,
        }),
        data
      )
      .then(({ data }) => {
        if (data.state === 'fail') {
          this.handleError(data);
        } else {
          setUser(data.body);
        }

        return data;
      })
      .catch(this.handleError);
  }

  getSession() {
    type Method = UserEndpoint['_session']['_v1'];
    type Response = Method['_get']['_res']['Union'];
    type Endpoint = Method['Endpoint'];
    type Params = Method['_get']['_req']['Params'];
    const requestId = this.createRequestId();

    return this._axios
      .get<Response>(
        this.prepareEndpoint<Endpoint, Params>('/session/v1/:requestId', {
          requestId,
        })
      )
      .then(({ data }) => {
        if (data.state === 'fail') {
          return this.handleError(data);
        } else {
          setUser(data.body);
        }

        return data;
      })
      .catch(this.handleError);
  }
}

export default new Rest();
