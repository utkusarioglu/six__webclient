import {
  PostEndpoint,
  UserEndpoint,
  CommunityEndpoint,
  CommentEndpoint,
  CommunityActionTypes,
  UserLoginResSuccessful,
} from 'six__public-api';

/**
 * Post
 */
export type PostEndpoint_single = PostEndpoint['_single']['_v1'];
export type PostEndpoint_single_res_body = PostEndpoint_single['_get']['_res']['Success']['body'];
export type PostEndpoint_single_res_body_slug = PostEndpoint_single_res_body['postSlug'];
export type PostEndpoint_single_res_body_id = PostEndpoint_single_res_body['id'];

export type PostEndpoint_list = PostEndpoint['_list']['_v1'];
export type PostEndpoint_list_res_body = PostEndpoint_list['_get']['_res']['Success']['body'];

export type PostEndpoint_comments = PostEndpoint['_comments']['_v1'];

export type PostEndpoint_comments_res_body = PostEndpoint_comments['_get']['_res']['Success']['body'];
export type PostEndpoint_comment_res_body = PostEndpoint_comments['_get']['_res']['Success']['body'][0];

/**
 * User community subscription
 */
export type UserEndpoint_ucs_alter = UserEndpoint['_user_community_subscription']['_alter']['_v1'];
export type UserEndpoint_ucs_alter_req_params_actionType = UserEndpoint_ucs_alter['_post']['_req']['Params']['actionType'];

/**
 * Signup, login, logout
 */
export type UserEndpoint_logout = UserEndpoint['_logout']['_v1'];

export type UserEndpoint_login = UserEndpoint['_login']['_v1'];
export type UserEndpoint_login_req_body = UserEndpoint_login['_post']['_req']['Body'];

export type UserEndpoint_signup = UserEndpoint['_signup']['_v1'];
export type UserEndpoint_signup_req_body = UserEndpoint_signup['_post']['_req']['Body'];

export type UserEndpoint_session = UserEndpoint['_session']['_v1'];
export type UserEndpoint_session_res_body = UserEndpoint_session['_get']['_res']['Success']['body'];

export type UserEndpoint_session_res_body_success = UserLoginResSuccessful;
export type UserEndpoint_session_res_body_success_username = UserLoginResSuccessful['username'];
export type UserEndpoint_session_res_body_success_id = UserLoginResSuccessful['id'];

export type UserEndpoint_ucs_id_list = UserEndpoint['_user_community_subscription']['_id_list']['_v1'];

/**
 * Community
 */
export type CommunityEndpoint_list = CommunityEndpoint['_list']['_v1'];
export type CommunityEndpoint_list_res_body = CommunityEndpoint_list['_get']['_res']['Success']['body'];

export type CommunityEndpoint_single = CommunityEndpoint['_single']['_v1'];
export type CommunityEndpoint_single_res_body = CommunityEndpoint_single['_get']['_res']['Success']['body'];
export type CommunityEndpoint_single_res_body_id = CommunityEndpoint_single_res_body['id'];

export type { CommunityActionTypes };

/**
 * Comment
 */
export type CommentEndpoint_save = CommentEndpoint['_save']['_v1'];
export type CommentEndpoint_save_req_body = CommentEndpoint_save['_post']['_req']['Body'];
