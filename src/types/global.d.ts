/**
 * Define your global interfaces here
 */

declare interface IUserSignup {
  fName: string;
  lastName: string;
  email: string;
  password: string;
}

declare interface IUserLogin {
  email: string;
  password: string;
}

declare interface IAPIResponse {
  success: boolean;
}
