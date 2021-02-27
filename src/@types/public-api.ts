import {
  PostEndpoint,
  UserEndpoint,
  CommunityEndpoint,
  CommentEndpoint,
  CommunityActionTypes,
  SuccessfulUserLoginRes,
} from 'six__public-api';

export type PostEndpoint_list = PostEndpoint['_list']['_v1'];
export type PostEndpoint_single = PostEndpoint['_single']['_v1'];
export type PostEndpoint_comments = PostEndpoint['_comments']['_v1'];
export type PostGetRes = PostEndpoint_single['_get']['_res']['Success']['body'];
export type PostsGetRes = PostEndpoint_list['_get']['_res']['Success']['body'];

export type UserEndpoint_ucs_alter = UserEndpoint['_user_community_subscription']['_alter']['_v1'];
export type UserEndpoint_logout = UserEndpoint['_logout']['_v1'];
export type UserEndpoint_login = UserEndpoint['_login']['_v1'];
export type UserEndpoint_signup = UserEndpoint['_signup']['_v1'];
export type UserEndpoint_session = UserEndpoint['_session']['_v1'];
export type UserSessionRes = UserEndpoint_session['_get']['_res']['Success']['body'];
export type UserSignupPostReq = UserEndpoint_signup['_post']['_req']['Body'];
export type { SuccessfulUserLoginRes };

export type CommunityEndpoint_list = CommunityEndpoint['_list']['_v1'];
export type CommunityEndpoint_single = CommunityEndpoint['_single']['_v1'];
export type { CommunityActionTypes };

export type CommentEndpoint_save = CommentEndpoint['_save']['_v1'];
