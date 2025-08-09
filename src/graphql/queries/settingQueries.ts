import { getSettingResolver } from "../resolvers/settingResolver";
import { SettingType } from "../types/settingType";

export const settingQueries = {
  getSetting: {
    type:  SettingType,
    resolve: getSettingResolver,
  },
};