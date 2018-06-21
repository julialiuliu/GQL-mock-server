const axios = require("axios");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLSNoNull
} = require('graphql');


const MemberType = new GraphQLObjectType({
    name: 'member',
    fields:() => ({
        id: {type: GraphQLString},
        username: {type: GraphQLString},
        password: {type: GraphQLString},
        airpointsNumber: {type: GraphQLInt},
        title: {type: GraphQLString},
        firstname: {type: GraphQLString},
        surname: {type: GraphQLString},
        loyaltyTier: {type: GraphQLString},
        passengerType: {type: GraphQLString},
        email: {type: GraphQLString},
        customerGuid: {type: GraphQLInt}
    })
});


//Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        member: {
            type: MemberType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parentValue, args) {
                return axios.get('http://localhost:3000/members/' + args.id)
                    .then(res => res.data);
            }
        }
        // },
        // member: {
        //     type: new GraphQLList(MemeberType),
        //     resolve(parentValue, args) {
        //         return axios.get( 'http://localhost:3000/members/')
        //             .then(res => res.data);
        //     }
        // }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
