import {
  UserEp,
  CommunityEp,
  CommentEp,
  PostEp,
  CommunityActionTypes,
  UserLoginResSuccessful,
  VoteTypes,
} from 'six__public-api';

/**
 * Post
 */
export type PostEp_single = PostEp['_single']['_v1'];
export type PostEp_single_res_body = PostEp_single['_get']['_res']['Success']['body'];
export type PostEp_single_res_body_slug = PostEp_single_res_body['postSlug'];
export type PostEp_single_res_body_id = PostEp_single_res_body['id'];

export type PostEp_list = PostEp['_list']['_v1'];
export type PostEp_list_res_body = PostEp_list['_get']['_res']['Success']['body'];

export type PostEp_comments = PostEp['_comments']['_v1'];

export type PostEp_comments_res_body = PostEp_comments['_get']['_res']['Success']['body'];
export type PostEp_comment_res_body = PostEp_comments['_get']['_res']['Success']['body'][0];

export type PostEp_vote = PostEp['_vote']['_v1'];
export type PostEp_vote_req_body = PostEp_vote['_post']['_req']['Body'];
export type PostEp_vote_req_params = PostEp_vote['_post']['_req']['Body'];

export type PostEp_create = PostEp['_create']['_v1'];
export type PostEp_create_req_body = PostEp_create['_post']['_req']['Body'];

export type { VoteTypes };

/**
 * User community subscription
 */
export type UserEndpoint_ucs_alter = UserEp['_user_community_subscription']['_ucs']['_v1'];
export type UserEndpoint_ucs_alter_req_params_actionType = UserEndpoint_ucs_alter['_post']['_req']['Body']['actionType'];

/**
 * Signup, login, logout
 */
export type UserEp_logout = UserEp['_logout']['_v1'];

export type UserEp_login = UserEp['_login']['_v1'];
export type UserEp_login_req_body = UserEp_login['_post']['_req']['Body'];

export type UserEp_signup = UserEp['_signup']['_v1'];
export type UserEp_signup_req_body = UserEp_signup['_post']['_req']['Body'];

export type UserEp_session = UserEp['_session']['_v1'];
export type UserEp_session_res_body = UserEp_session['_get']['_res']['Success']['body'];

export type UserEp_session_res_body_success = UserLoginResSuccessful;
export type UserEp_session_res_body_success_username = UserLoginResSuccessful['username'];
export type UserEp_session_res_body_success_id = UserLoginResSuccessful['id'];

export type UserEp_ucs_id_list = UserEp['_user_community_subscription']['_id_list']['_v1'];

/**
 * Community
 */
export type CommunityEp_list = CommunityEp['_list']['_v1'];
export type CommunityEp_list_res_body = CommunityEp_list['_get']['_res']['Success']['body'];

export type CommunityEp_single = CommunityEp['_single']['_v1'];
export type CommunityEp_single_res_body = CommunityEp_single['_get']['_res']['Success']['body'];
export type CommunityEp_single_res_body_id = CommunityEp_single_res_body['id'];

export type { CommunityActionTypes };

/**
 * Comment
 */
export type CommentEp_save = CommentEp['_save']['_v1'];
export type CommentEp_save_req_body = CommentEp_save['_post']['_req']['Body'];
