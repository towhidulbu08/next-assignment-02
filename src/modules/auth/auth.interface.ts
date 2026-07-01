type URole = "contributor" | "maintainer";
export interface IUser {
  name: string;
  email: string;
  password: string;
  role?: URole;
}
