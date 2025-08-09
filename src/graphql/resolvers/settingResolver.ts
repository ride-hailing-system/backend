import settingModel from "../../models/settingModel";

export const saveSettingResolver = async (_: any, args: any) => {
  try {
    const { _id, general, location, ride, payment, user, notification, templates } = args;

    const setting = await settingModel.findByIdAndUpdate(_id, {
      general,
      location,
      ride,
      payment,
      user,
      notification,
      templates
    }, { new: true });
    return setting;
  } catch (error: any) {
    throw new Error(error.message);
  }
};


export const getSettingResolver = async (_: any, args: any) => {
  try {
    const setting = await settingModel.findById(args.id);
    if (!setting) throw new Error("Setting is not configured.");
    return setting;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
   