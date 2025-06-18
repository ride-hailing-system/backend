import { GraphQLNonNull, GraphQLString } from "graphql";
import { UserType } from "../types/userType";
import { changePasswordResolver, resetPasswordResolver } from "../resolvers/authResolver";

export const authMutations = {
    resetPassword: {
        type: UserType,
        description: "reset the user password.",
        args: {
          _id: { type: new GraphQLNonNull(GraphQLString) },
          password: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: resetPasswordResolver,
      },
      changePassword: {
        type: UserType,
        description: "change the user password.",
        args: {
          _id: { type: new GraphQLNonNull(GraphQLString) },
          oldPassword: { type: new GraphQLNonNull(GraphQLString) },
          password: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: changePasswordResolver,
      },
}