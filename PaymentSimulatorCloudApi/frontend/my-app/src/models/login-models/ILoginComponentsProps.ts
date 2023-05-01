import { IUser } from "./IUser";
export interface ILoginFormProps {
  onSubmit: (user: IUser) => void;
  user: IUser;
}
