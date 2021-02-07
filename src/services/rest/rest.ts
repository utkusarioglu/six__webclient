import type { AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';
import { API_ENDPOINT } from '_base/config';
import { updatePostRepo } from '_slices/post-repo/posts-repo.slice';
import {
  CommentsGetRes,
  CommunitiesGetRes,
  PostGetRes,
  PostsGetRes,
  UserLoginPostRes,
  UserSignupPostRes,
} from 'six__public-api';
import { PostsState } from '_slices/post-repo/posts-repo.slice.types';
import { setComments } from '_slices/comments/comments.slice';
import { setUser } from '_slices/user/user.slice';
import { setPost } from '_slices/post/post.slice';

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
        setUser(data);
      })
      .catch((e) => console.log(e));
  }

  signup(data: any) {
    this._axios
      .post('/signup', data)
      .then((axiosResponse) => {
        const data: UserSignupPostRes = axiosResponse.data;
        console.log(data);
        setUser(data);
      })
      .catch(console.log);
  }

  getCommunities() {
    this._axios.get('/communities').then((axiosResponse) => {
      const data: CommunitiesGetRes = axiosResponse.data;
      console.log(data);
    });
  }
}

export default new Rest();
