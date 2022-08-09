import { GraphQLClient } from 'graphql-request';


const graphqlRequestClient = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string
);

export default graphqlRequestClient;