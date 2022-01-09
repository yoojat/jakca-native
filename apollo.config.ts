module.exports = {
  client: {
    includes: ['./**/*.{tsx, ts}'],
    tagName: 'gql',
    service: {
      name: 'jakca-backend',
      url: 'http://localhost:4000/graphql',
    },
  },
};
