import type { AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';
import { API_ENDPOINT } from '_base/config';
import { updatePosts } from '_slices/posts/posts.slice';
import {
  CommentsGetRes,
  PostGetRes,
  PostsGetRes,
  UserLoginPostRes,
} from 'six__public-api';
import { PostsState } from '_slices/posts/posts.slice.types';
import { updateComments } from '_slices/comments/comments.slice';
import { updateUser } from '_slices/user/user.slice';

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
        updatePosts(data.res);
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
        updatePosts([data.res]);
      })
      .catch((e) => console.log(e));
  }

  getCommentsByPostSlug(postSlug: PostsState['list'][0]['postSlug']) {
    this._axios.get(`/post/slug/${postSlug}/comments`).then((axiosResponse) => {
      const data: CommentsGetRes = axiosResponse.data;
      updateComments(data.res);
    });
  }

  // !any
  tryLogin(data: any) {
    this._axios
      .post(`/login`, data)
      .then((axiosResponse) => {
        const data: UserLoginPostRes = axiosResponse.data;
        updateUser(data);
      })
      .catch((e) => console.log(e));
  }
}

export default new Rest();
