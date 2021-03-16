import type {
  CommentEp_save_req_body,
  CommentEp_save,
  CommunityEp_list,
  CommunityEp_single_res_body_id,
  CommunityEp_single,
  CommunityEp_posts,
  PostEp_comments,
  PostEp_create_req_body,
  PostEp_create,
  PostEp_list,
  PostEp_single_res_body_id,
  PostEp_single_res_body_slug,
  PostEp_single,
  PostEp_vote_req_params,
  PostEp_vote,
  UserEndpoint_ucs_alter_req_params_actionType,
  UserEndpoint_ucs_alter,
  UserEp_login_req_body,
  UserEp_login,
  UserEp_logout,
  UserEp_session_res_body_success_id,
  UserEp_session,
  UserEp_signup_req_body,
  UserEp_signup,
} from '_types/public-api';
import type { AxiosInstance } from 'axios';
import axios from 'axios';
import { API_ENDPOINT } from '_config';
import {
  clearPostRepo,
  updatePostRepo,
  amendPostRepoVote,
} from '_slices/post-repo/posts-repo.slice';
import { setComments } from '_slices/comments/comments.slice';
import { setUser } from '_slices/user/user.slice';
import { setPost } from '_slices/post/post.slice';
import { setCommunities } from '_slices/community-repo/community-repo.slice';
import { setCommunity } from '_slices/community/community.slice';
import { amendPostDetailsVote } from '_slices/post/post.slice';

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
    type Method = PostEp_list;
    type Response = Method['_get']['_res']['Union'];
    type Endpoint = Method['Endpoint'];
    type Params = Method['_get']['_req']['Params'];

    const requestId = this.createRequestId();

    return this._axios
      .get<Response>(
        this.prepareEndpoint<Endpoint, Params>('/posts/v1/:requestId', {
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
   * Retrieves Posts for post repo
   */
  getCommunityPosts(communitySlug: string) {
    type Method = CommunityEp_posts;
    type Response = Method['_get']['_res']['Union'];
    type Endpoint = Method['Endpoint'];
    type Params = Method['_get']['_req']['Params'];

    const requestId = this.createRequestId();

    return this._axios
      .get<Response>(
        this.prepareEndpoint<Endpoint, Params>(
          '/community/posts/v1/:communitySlug/:requestId',
          {
            requestId,
            communitySlug,
          }
        )
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
  getPostBySlug(postSlug: PostEp_single_res_body_slug) {
    type Method = PostEp_single;
    type Response = Method['_get']['_res']['Union'];
    type Endpoint = Method['Endpoint'];
    type Params = Method['_get']['_req']['Params'];

    const requestId = this.createRequestId();

    return this._axios
      .get<Response>(
        this.prepareEndpoint<Endpoint, Params>(
          '/post/slug/v1/:postSlug/:requestId',
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
    type Method = CommunityEp_list;
    type Response = Method['_get']['_res']['Union'];
    type Endpoint = Method['Endpoint'];
    type Params = Method['_get']['_req']['Params'];

    const requestId = this.createRequestId();

    return this._axios
      .get<Response>(
        this.prepareEndpoint<Endpoint, Params>(
          '/community/list/v1/:requestId',
          {
            requestId,
          }
        )
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
  getCommentsByPostId(postId: PostEp_single_res_body_id) {
    type Method = PostEp_comments;
    type Response = Method['_get']['_res']['Union'];
    type Endpoint = Method['Endpoint'];
    type Params = Method['_get']['_req']['Params'];

    const requestId = this.createRequestId();

    return this._axios
      .get<Response>(
        this.prepareEndpoint<Endpoint, Params>(
          '/post/:postId/comments/v1/:requestId',
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
    userId: UserEp_session_res_body_success_id,
    communityId: CommunityEp_single_res_body_id,
    actionType: UserEndpoint_ucs_alter_req_params_actionType
  ) {
    type Method = UserEndpoint_ucs_alter;
    type Response = Method['_post']['_res']['Union'];
    type Endpoint = Method['Endpoint'];
    type Params = Method['_post']['_req']['Params'];

    const requestId = this.createRequestId();

    return this._axios
      .post<Response>(
        this.prepareEndpoint<Endpoint, Params>('/user/ucs/:requestId', {
          requestId,
        }),
        {
          userId,
          communityId,
          actionType,
        }
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
    type Method = UserEp_logout;
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

  login(requestInput: UserEp_login_req_body) {
    type Method = UserEp_login;
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

  signup(data: UserEp_signup_req_body) {
    type Method = UserEp_signup;
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
    type Method = UserEp_session;
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

  saveComment(data: CommentEp_save_req_body) {
    type Method = CommentEp_save;
    type Response = Method['_post']['_res']['Union'];
    type Endpoint = Method['Endpoint'];
    type Params = Method['_post']['_req']['Params'];
    const requestId = this.createRequestId();

    return this._axios
      .post<Response>(
        this.prepareEndpoint<Endpoint, Params>('/comment/save/v1/:requestId', {
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

  getCommunitySingle(communitySlug: string) {
    type Method = CommunityEp_single;
    type Response = Method['_get']['_res']['Union'];
    type Endpoint = Method['Endpoint'];
    type Params = Method['_get']['_req']['Params'];
    const requestId = this.createRequestId();

    return this._axios
      .get<Response>(
        this.prepareEndpoint<Endpoint, Params>(
          '/community/v1/:communitySlug/:requestId',
          { communitySlug, requestId }
        )
      )
      .then(({ data }) => {
        if (data.state === 'fail') {
          this.handleError(data);
        } else {
          setCommunity(data.body);
        }
        return data;
      })
      .catch(this.handleError);
  }

  async votePost(body: PostEp_vote_req_params) {
    type Method = PostEp_vote;
    type Response = Method['_post']['_res']['Union'];
    type Endpoint = Method['Endpoint'];
    type Params = Method['_post']['_req']['Params'];
    const requestId = this.createRequestId();

    return this._axios
      .post<Response>(
        this.prepareEndpoint<Endpoint, Params>('/post/vote/v1/:requestId', {
          requestId,
        }),
        body
      )
      .then(({ data }) => {
        if (data.state === 'fail') {
          this.handleError(data);
        } else {
          amendPostRepoVote(data.body);
          amendPostDetailsVote(data.body);
        }
        return data;
      })
      .catch(this.handleError);
  }

  async createPost(body: PostEp_create_req_body) {
    type Method = PostEp_create;
    type Response = Method['_post']['_res']['Union'];
    type Endpoint = Method['Endpoint'];
    type Params = Method['_post']['_req']['Params'];
    const requestId = this.createRequestId();

    return this._axios
      .post<Response>(
        this.prepareEndpoint<Endpoint, Params>('/post/create/v1/:requestId', {
          requestId,
        }),
        body
      )
      .then(({ data }) => {
        if (data.state === 'fail') {
          this.handleError(data);
        } else {
          setPost(data.body);
        }
        return data;
      })
      .catch(this.handleError);
  }
}

export default new Rest();
