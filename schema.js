const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLSList,
    GraphQLSNoNull
} = require('graphql');

//hard code -> json file
const customers = [
    {id:'1', name:'John', email:'john@gmai.com', age: 25},
    {id:'2', name:'Ellen', email:'ellen@gmai.com', age: 28},
    {id:'3', name:'Steven', email:'steven@gmai.com', age: 39},
];

const CustomerType = new GraphQLObjectType({
    name: 'customer',
    fields:() => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt},
    })
});


//Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer: {
            type: CustomerType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parentValue, args){
                for(let i=0; i<customers.length; i++){
                    if(customers[i].id == args.id){
                        return customers[i];
                    }
                }
            }
        }
    }

});

module.exports = new GraphQLSchema({
    query: RootQuery
});
