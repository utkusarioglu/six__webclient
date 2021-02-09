import type { AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';
import { API_ENDPOINT } from '_base/config';
import {
  clearPostRepo,
  updatePostRepo,
} from '_slices/post-repo/posts-repo.slice';
import {
  CommentsGetRes,
  CommunitiesGetRes,
  PostGetRes,
  PostsGetRes,
  UserLoginPostRes,
  UserSignupPostRes,
  UserSessionGetRes,
  UserLogoutPostRes,
} from 'six__public-api';
import { PostsState } from '_slices/post-repo/posts-repo.slice.types';
import { setComments } from '_slices/comments/comments.slice';
import { setUser } from '_slices/user/user.slice';
import { setPost } from '_slices/post/post.slice';
import { setCommunities } from '_slices/communities/communities.slice';

class Rest {
  private _axios: AxiosInstance;

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

  getPosts() {
    this._axios
      .get<null, AxiosResponse<PostsGetRes>>('/posts')
      .then((axiosResponse) => {
        const data: PostsGetRes = axiosResponse.data;
        updatePostRepo(data.res);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  getPostBySlug(postSlug: PostsState['list'][0]['postSlug']) {
    this._axios
      .get<null, AxiosResponse<PostGetRes>>(`/post/slug/${postSlug}`)
      .then((axiosResponse) => {
        const data: PostGetRes = axiosResponse.data;
        setPost(data.res);
        // updatePostsRepo([data.res]);
      })
      .catch((e) => console.log(e));
  }

  getCommentsByPostSlug(postSlug: PostsState['list'][0]['postSlug']) {
    this._axios.get(`/post/slug/${postSlug}/comments`).then((axiosResponse) => {
      const data: CommentsGetRes = axiosResponse.data;
      setComments(data.res);
    });
  }

  // !any
  tryLogin(data: any) {
    this._axios
      .post(`/login`, data)
      .then((axiosResponse) => {
        const data: UserLoginPostRes = axiosResponse.data;
        setUser(data.res);
        clearPostRepo();
      })
      .catch((e) => console.log(e));
  }

  signup(data: any) {
    this._axios
      .post('/signup', data)
      .then((axiosResponse) => {
        const data: UserSignupPostRes = axiosResponse.data;
        setUser(data.res);
      })
      .catch(console.log);
  }

  logout() {
    this._axios
      .post('/logout')
      .then((response) => {
        const data: UserLogoutPostRes = response.data;

        // @ts-ignore
        setUser(data);
        clearPostRepo();
      })
      .catch(console.error);
  }

  getCommunities() {
    this._axios.get('/communities').then((axiosResponse) => {
      const data: CommunitiesGetRes = axiosResponse.data;
      setCommunities(data.res);
    });
  }

  getSession() {
    this._axios.get('/session').then((response) => {
      const data: UserSessionGetRes = response.data;
      // @ts-ignore
      setUser(data.res);
    });
  }
}

export default new Rest();
