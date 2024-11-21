import { UsersType } from "./UsersType";

export type RoomType = {
  pin: string;
  users: UsersType | {};
};
