import { UsersType } from "../types/UsersType";
import { UserType } from "../types/UserType";
import { Request, Response } from "express";

export class UserController {
  users: UsersType = {};

  getUsers(req: Request, res: Response): void {
    res.status(201).json(this.users);
  }

  saveUser(req: Request, res: Response): void {
    const { nickname, password } = req.body as any;

    const user: UserType = {
      nickname,
      password,
    };

    res.status(201).json(user);
  }
}
