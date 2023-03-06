export interface IUserBody {
  username: string | null | undefined;
  password: string | null | undefined;
  recaptchaResponse: string;
}
