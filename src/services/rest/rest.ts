import type {
  PostEndpoint_list,
  PostEndpoint_single,
  PostEndpoint_single_res_body_id,
  PostEndpoint_comments,
  UserEndpoint_ucs_alter,
  UserEndpoint_logout,
  UserEndpoint_login,
  UserEndpoint_signup,
  UserEndpoint_session,
  CommunityEndpoint_list,
  CommunityEndpoint_single,
  CommunityEndpoint_single_res_body_id,
  CommentEndpoint_save,
  UserEndpoint_session_res_body_success_id,
  UserEndpoint_ucs_alter_req_params_actionType,
  PostEndpoint_single_res_body_slug,
  UserEndpoint_login_req_body,
  CommentEndpoint_save_req_body,
  UserEndpoint_signup_req_body,
  UserEndpoint_ucs_id_list,
} from '_types/public-api';
import type { AxiosInstance } from 'axios';
import axios from 'axios';
import { API_ENDPOINT } from '_config';
import {
  clearPostRepo,
  updatePostRepo,
} from '_slices/post-repo/posts-repo.slice';
import { setComments } from '_slices/comments/comments.slice';
import { setUser } from '_slices/user/user.slice';
import { setPost } from '_slices/post/post.slice';
import { setCommunities } from '_slices/community-repo/community-repo.slice';
import { setUcsIds } from '_slices/ucs/ucs.slice';
import { setCommunity } from '_slices/community/community.slice';

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
    type Method = PostEndpoint_list;
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
  getPostBySlug(postSlug: PostEndpoint_single_res_body_slug) {
    type Method = PostEndpoint_single;
    type Response = Method['_get']['_res']['Union'];
    type Endpoint = Method['Endpoint'];
    type Params = Method['_get']['_req']['Params'];

    const requestId = this.createRequestId();

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
    type Method = CommunityEndpoint_list;
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
  getCommentsByPostId(postId: PostEndpoint_single_res_body_id) {
    type Method = PostEndpoint_comments;
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
    userId: UserEndpoint_session_res_body_success_id,
    communityId: CommunityEndpoint_single_res_body_id,
    actionType: UserEndpoint_ucs_alter_req_params_actionType
  ) {
    type Method = UserEndpoint_ucs_alter;
    type Response = Method['_post']['_res']['Union'];
    type Endpoint = Method['Endpoint'];
    type Params = Method['_post']['_req']['Params'];

    const requestId = this.createRequestId();

    return this._axios
      .post<Response>(
        this.prepareEndpoint<Endpoint, Params>(
          '/user/:userId/:actionType/:communityId/:requestId',
          {
            requestId,
            userId,
            communityId,
            actionType,
          }
        )
      )
      .then(({ data }) => {
        if (data.state === 'fail') {
          this.handleError(data);
        } else {
          console.log(data);
          clearPostRepo();
        }

        return data;
      })
      .catch(this.handleError);
  }

  logout() {
    type Method = UserEndpoint_logout;
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
          this.handleError(data);
        } else {
          setUser(data.body);
          clearPostRepo();
        }

        return data;
      })
      .catch(this.handleError);
  }

  login(requestInput: UserEndpoint_login_req_body) {
    type Method = UserEndpoint_login;
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

  signup(data: UserEndpoint_signup_req_body) {
    type Method = UserEndpoint_signup;
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
    type Method = UserEndpoint_session;
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
          this.handleError(data);
        } else {
          setUser(data.body);
        }

        return data;
      })
      .catch(this.handleError);
  }

  saveComment(data: CommentEndpoint_save_req_body) {
    type Method = CommentEndpoint_save;
    type Response = Method['_post']['_res']['Union'];
    type Endpoint = Method['Endpoint'];
    type Params = Method['_post']['_req']['Params'];
    const requestId = this.createRequestId();

    return this._axios
      .post<Response>(
        this.prepareEndpoint<Endpoint, Params>('/comment/save/:requestId', {
          requestId,
        }),
        data
      )
      .then(({ data }) => {
        if (data.state === 'fail') {
          this.handleError(data);
        } else {
          console.log('comment post response: \n', data);
        }
        return data;
      })
      .catch(this.handleError);
  }

  getUcsIdsForUserId(userId: UserEndpoint_session_res_body_success_id) {
    type Method = UserEndpoint_ucs_id_list;
    type Response = Method['_get']['_res']['Union'];
    type Endpoint = Method['Endpoint'];
    type Params = Method['_get']['_req']['Params'];
    const requestId = this.createRequestId();

    return this._axios
      .get<Response>(
        this.prepareEndpoint<Endpoint, Params>(
          '/user/:userId/subscriptions/id/:requestId',
          {
            userId,
            requestId,
          }
        )
      )
      .then(({ data }) => {
        if (data.state === 'fail') {
          this.handleError(data);
        } else {
          setUcsIds(data.body);
        }
      })
      .catch(this.handleError);
  }

  getCommunitySingle(communitySlug: string) {
    type Method = CommunityEndpoint_single;
    type Response = Method['_get']['_res']['Union'];
    type Endpoint = Method['Endpoint'];
    type Params = Method['_get']['_req']['Params'];
    const requestId = this.createRequestId();

    return this._axios
      .get<Response>(
        this.prepareEndpoint<Endpoint, Params>(
          '/community/:communitySlug/:requestId',
          { communitySlug, requestId }
        )
      )
      .then(({ data }) => {
        if (data.state === 'fail') {
          this.handleError(data);
        } else {
          setCommunity(data.body);
        }
      })
      .catch(this.handleError);
  }
}

export default new Rest();
