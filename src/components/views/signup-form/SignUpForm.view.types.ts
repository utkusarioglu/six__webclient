import { UserEndpoint_signup_req_body } from '_types/public-api';
import { Overwrite } from 'utility-types';

export type SignUpFormViewProps = {};
type SingupFormValues = UserEndpoint_signup_req_body;
export type Errors = Partial<
  Overwrite<
    SingupFormValues,
    {
      [key in keyof SingupFormValues]: string;
    }
  > & {
    passwordRepeat: string;
  }
>;
