import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
  } from 'graphql';
  import { RideType } from './rideType';
  
  const CountGroupType = new GraphQLObjectType({
    name: 'CountGroup',
    fields: {
      total: { type: GraphQLInt },
      available: { type: GraphQLInt },
      completed: { type: GraphQLInt },
      canceled: { type: GraphQLInt },
      accepted: { type: GraphQLInt },
      rejected: { type: GraphQLInt },
    },
  });
  
  const RegistrationCountType = new GraphQLObjectType({
    name: 'RegistrationCount',
    fields: {
      riders: { type: GraphQLInt },
      drivers: { type: GraphQLInt },
    },
  });
  
  export const DashboardType = new GraphQLObjectType({
    name: 'Dashboard',
    fields: {
      cardsCount: {
        type: new GraphQLObjectType({
          name: 'CardsCount',
          fields: {
            drivers: { type: CountGroupType },
            rideRequests: { type: CountGroupType },
            weeklyRegistration: { type: RegistrationCountType },
          },
        }),
      },
      weeklyRideRequests: { type: CountGroupType },
      monthlyRideRequests: { type: CountGroupType },
      dailyRideRequests: { type: new GraphQLList(RideType) },
    },
  });
  