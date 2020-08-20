const { graphQLServer, GraphQLServer } = require('graphql-yoga');

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}];

let idCount = links.length;

const findLink = (args) => links.find( l => l.id === args.id) ;

const updateLink = (args) => {
    const link = findLink(args);
    if (link) {
        link.description = args.description;
        link.url = args.url;    
    }
    return link;
}

const deleteLink = (args) => {
    const linkToDelete = findLink(args);
    links = links.filter(link => link != linkToDelete );
    return linkToDelete;
}

const resolvers = {
    Query: {
        info: () => `This is the query of HackerNews Clone`,  
        feed: () => links,
        link: (parent, args) => findLink(args) 
    },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            }
            links.push(link);
            return link;
        },
        updateLink: (parent, args) => updateLink(args),
        deleteLink: (parent, args) => deleteLink(args)
    },
    Link: {
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url,
      }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
})
server.start(() => console.log(`Server is running on http://localhost:4000`));

