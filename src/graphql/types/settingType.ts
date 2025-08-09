import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';

const AfterNightHoursType = new GraphQLObjectType({
  name: 'AfterNightHours',
  fields: {
    start: { type: new GraphQLNonNull(GraphQLString) },
    end: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const GeneralType = new GraphQLObjectType({
  name: 'General',
  fields: {
    appName: { type: new GraphQLNonNull(GraphQLString) },
    supportEmail: { type: new GraphQLNonNull(GraphQLString) },
    supportPhone: { type: new GraphQLNonNull(GraphQLString) },
    currency: { type: new GraphQLNonNull(GraphQLString) },
    afterNightHours: { type: new GraphQLNonNull(AfterNightHoursType) },
  },
});

const LocationType = new GraphQLObjectType({
  name: 'Location',
  fields: {
    pickupRadius: { type: new GraphQLNonNull(GraphQLInt) },
    locationUpdateInterval: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

const RideType = new GraphQLObjectType({
  name: 'RideSetting',
  fields: {
    baseFare: { type: new GraphQLNonNull(GraphQLFloat) },
    ratePerKm: { type: new GraphQLNonNull(GraphQLFloat) },
    ratePerKmAfterNight: { type: new GraphQLNonNull(GraphQLFloat) },
    cancelationTimeLimit: { type: new GraphQLNonNull(GraphQLInt) },
    maxRideDistance: { type: new GraphQLNonNull(GraphQLFloat) },
    rideRequestTimeout: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

const PaymentType = new GraphQLObjectType({
  name: 'PaymentSetting',
  fields: {
    paymentMethods: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))) },
    taxRate: { type: new GraphQLNonNull(GraphQLFloat) },
    driverCommission: { type: new GraphQLNonNull(GraphQLFloat) },
  },
});

const UserType = new GraphQLObjectType({
  name: 'UserSetting',
  fields: {
    requireKyc: { type: new GraphQLNonNull(GraphQLBoolean) },
    requireDriverApproval: { type: new GraphQLNonNull(GraphQLBoolean) },
  },
});

const NotificationType = new GraphQLObjectType({
  name: 'NotificationSetting',
  fields: {
    enableSms: { type: new GraphQLNonNull(GraphQLBoolean) },
    enablePush: { type: new GraphQLNonNull(GraphQLBoolean) },
    enableEmail: { type: new GraphQLNonNull(GraphQLBoolean) },
  },
});

const TemplatesType = new GraphQLObjectType({
  name: 'Templates',
  fields: {
    driverAssigned: { type: new GraphQLNonNull(GraphQLString) },
    rideCanceled: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export const SettingType = new GraphQLObjectType({
  name: 'Setting',
  fields: {
    general: { type: new GraphQLNonNull(GeneralType) },
    location: { type: new GraphQLNonNull(LocationType) },
    ride: { type: new GraphQLNonNull(RideType) },
    payment: { type: new GraphQLNonNull(PaymentType) },
    user: { type: new GraphQLNonNull(UserType) },
    notification: { type: new GraphQLNonNull(NotificationType) },
    templates: { type: new GraphQLNonNull(TemplatesType) },
  },
});
