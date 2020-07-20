import { IResolvers } from "graphql-tools";
import JWT from "../lib/jwt";
import bcryptjs from "bcryptjs";

const query: IResolvers = {
  Query: {
    async users(_: void, { user }, { db }): Promise<any> {
      return await db.collection("users").find().toArray();
    },
    async login(_: void, { email, password }, { db }): Promise<any> {
      const user = await db.collection("users").findOne({ email });
      if (!user) {
        return {
          status: false,
          message: "Wrong email",
          token: null,
        };
      }
      if (!bcryptjs.compareSync(password, user.password)) {
        return {
          status: false,
          message: "Wrong password",
          token: null,
        };
      }
      delete user.password;
      return {
        status: true,
        message: "User login correctly",
        token: new JWT().sign({ user }),
      };
    },
    async me(_: void, __: any, { token }) {
      let info: any = new JWT().verify(token);
      if (info === "token error") {
        return {
          status: false,
          message: info,
          user: null,
        };
      }
      return {
        status: true,
        message: "Token ok",
        user: info.user,
      };
    },
  },
};

export default query;
