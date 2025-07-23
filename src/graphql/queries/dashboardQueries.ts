import { getDashboardDatasResolver } from "../resolvers/dashboardResolver";
import { DashboardType } from "../types/dashboardType";

export const dashboardQueries = {
  getDashboardDatas: {
    type: DashboardType,
    resolve: getDashboardDatasResolver,
  },
};