import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLSchema } from "graphql";
import { getMessageLog } from "./database";

const MessageType = new GraphQLObjectType({
  name: "Message",
  fields: () => ({
    id: { type: GraphQLInt },
    chat_message: { type: GraphQLString },
    from_user: { type: GraphQLString },
    time: { type: GraphQLString },
  }),
});

/** Query */
const MessageQuery = new GraphQLObjectType({
  name: "MessageQueryType",
  fields: {
    messages: {
      type: new GraphQLList(MessageType),
      resolve(_parent, _args) {
        return getMessageLog();
      },
    },
  },
});

export default new GraphQLSchema({
  query: MessageQuery,
});
