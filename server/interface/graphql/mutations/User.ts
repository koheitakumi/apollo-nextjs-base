import { AuthenticationError } from "apollo-server-express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import todoStore from "../../db/todoStore";
import userStore from "../../db/userStore";
import { MutationResolvers, User } from "../generated/graphql";
import { JWT_NAME, JWT_SECRET } from "../../../constants";

interface CookieProps {
  user: User;
  res: any;
}

function setCookie({ user, res }: CookieProps) {
  // For token
  res.cookie(JWT_NAME, user.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 1000 * 2,
  });
}

function generateToken(user) {
  const { email } = user;
  const token = jwt.sign({ email }, JWT_SECRET, {
    expiresIn: "2h",
  }); //can also be 60 * 60 * 2
  return token;
}

export const Mutation: MutationResolvers = {
  async addTodo(_parent, args, { user }, _info) {
    if (!user) {
      throw new AuthenticationError("Authentication is necessary");
    }
    return todoStore.addTodo(args.content);
  },
  async deleteTodo(_parent, args, _context, _info) {
    return todoStore.deleteTodo(args.id);
  },
  async signUp(_, { user: { email, password } }, { req }) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = userStore.addUser(email, hashedPassword);

      const token = generateToken(user);
      setCookie({
        user: { email, token },
        res: req.res,
      });

      return {
        email,
        token,
      };
    } catch (err) {
      throw new AuthenticationError(err);
    }
  },
  async login(_, { user: { email, password } }, { req }) {
    try {
      const user = userStore.findUser(email);
      if (!user) throw "No user in DB";
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw "Invalid password";

      const token = generateToken(user);
      setCookie({
        user: { email, token },
        res: req.res,
      });

      return {
        email,
        token,
      };
    } catch (err) {
      throw new AuthenticationError(err);
    }
  },
  async logout(_, __, { req }) {
    try {
      req.res.clearCookie(JWT_NAME);
      return true;
    } catch (err) {
      throw err;
    }
  },
};