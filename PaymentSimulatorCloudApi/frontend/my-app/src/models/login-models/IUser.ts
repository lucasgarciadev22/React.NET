export interface IUser {
  accesLevel: UserType;
  userName: string;
  userPassword: string;
}

export enum UserType {
  Admin,
  User,
}
