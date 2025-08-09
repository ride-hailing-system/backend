import { GraphQLBoolean, GraphQLFloat, GraphQLID, GraphQLInputObjectType, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import { SettingType } from '../types/settingType';
import { saveSettingResolver } from '../resolvers/settingResolver';

const AfterNightHoursInput = new GraphQLInputObjectType({
  name: 'AfterNightHoursInput',
  fields: {
    start: { type: new GraphQLNonNull(GraphQLString) },
    end: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const GeneralInput = new GraphQLInputObjectType({
  name: 'GeneralInput',
  fields: {
    appName: { type: new GraphQLNonNull(GraphQLString) },
    supportEmail: { type: new GraphQLNonNull(GraphQLString) },
    supportPhone: { type: new GraphQLNonNull(GraphQLString) },
    currency: { type: new GraphQLNonNull(GraphQLString) },
    afterNightHours: { type: AfterNightHoursInput },
  },
});

const LocationInput = new GraphQLInputObjectType({
  name: 'LocationInput',
  fields: {
    pickupRadius: { type: new GraphQLNonNull(GraphQLInt) },
    locationUpdateInterval: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

const RideInput = new GraphQLInputObjectType({
  name: 'RideInput',
  fields: {
    baseFare: { type: new GraphQLNonNull(GraphQLFloat) },
    ratePerKm: { type: new GraphQLNonNull(GraphQLFloat) },
    ratePerKmAfterNight: { type: new GraphQLNonNull(GraphQLFloat) },
    cancelationTimeLimit: { type: new GraphQLNonNull(GraphQLInt) },
    maxRideDistance: { type: new GraphQLNonNull(GraphQLFloat) },
    rideRequestTimeout: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

const PaymentInput = new GraphQLInputObjectType({
  name: 'PaymentInput',
  fields: {
    paymentMethods: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))) },
    taxRate: { type: new GraphQLNonNull(GraphQLFloat) },
    driverCommission: { type: new GraphQLNonNull(GraphQLFloat) },
  },
});

const UserInput = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: {
    requireKyc: { type: new GraphQLNonNull(GraphQLBoolean) },
    requireDriverApproval: { type: new GraphQLNonNull(GraphQLBoolean) },
  },
});

const NotificationInput = new GraphQLInputObjectType({
  name: 'NotificationInput',
  fields: {
    enableSms: { type: new GraphQLNonNull(GraphQLBoolean) },
    enablePush: { type: new GraphQLNonNull(GraphQLBoolean) },
    enableEmail: { type: new GraphQLNonNull(GraphQLBoolean) },
  },
});

const TemplatesInput = new GraphQLInputObjectType({
  name: 'TemplatesInput',
  fields: {
    driverAssigned: { type: new GraphQLNonNull(GraphQLString) },
    rideCanceled: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export const settingMutations = {
  saveSetting: {
    type: SettingType,
    args: {
      _id: { type: GraphQLString },
      general: { type: new GraphQLNonNull(GeneralInput) },
      location: { type: new GraphQLNonNull(LocationInput) },
      ride: { type: new GraphQLNonNull(RideInput) },
      payment: { type: new GraphQLNonNull(PaymentInput) },
      user: { type: new GraphQLNonNull(UserInput) },
      notification: { type: new GraphQLNonNull(NotificationInput) },
      templates: { type: new GraphQLNonNull(TemplatesInput) },
    },
    resolve: saveSettingResolver,
  },
}