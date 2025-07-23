import driverModel from "../../models/driverModel";
import rideModel from "../../models/rideModel";
import userModel from "../../models/userModel";
import dayjs from 'dayjs';

export const getDashboardDatasResolver = async (_: any, args: any) => {
  try {
    const now = dayjs();

    const startOfWeek = now.startOf('week').toDate();
    const startOfMonth = now.startOf('month').toDate();

    const startOfDay = now.startOf('day').toDate();
    const endOfDay = now.endOf('day').toDate();
  
    const [totalDrivers, availableDrivers] = await Promise.all([
      driverModel.countDocuments(),
      driverModel.countDocuments({ isAvailable: true }),
    ]);
  
    const [completedRides, canceledRides] = await Promise.all([
      rideModel.countDocuments({ status: 'completed' }),
      rideModel.countDocuments({ status: 'canceled' }),
    ]);
  
    const [weeklyRiders, weeklyDrivers] = await Promise.all([
      userModel.countDocuments({
        role: 'rider',
        createdAt: { $gte: startOfWeek },
      }),
      userModel.countDocuments({
        role: 'driver',
        createdAt: { $gte: startOfWeek },
      }),
    ]);
  
    const weeklyRideRequests = await getStatusCounts({ createdAt: { $gte: startOfWeek } });
    const monthlyRideRequests = await getStatusCounts({ createdAt: { $gte: startOfMonth } });

    const dailyRideRequests = await rideModel
      .find({ createdAt: { $gte: startOfDay, $lte: endOfDay } })
      .lean();
  
    return {
      cardsCount: {
        drivers: { total: totalDrivers, available: availableDrivers },
        rideRequests: { completed: completedRides, canceled: canceledRides },
        weeklyRegistration: { riders: weeklyRiders, drivers: weeklyDrivers },
      },
      weeklyRideRequests: weeklyRideRequests,
      monthlyRideRequests: monthlyRideRequests,
      dailyRideRequests,
    };
  } catch (error) {
    console.error("Error getting dashboard datas:", error);
    throw new Error("Failed to get dashboard datas");
  }
  
};

const getStatusCounts = async (matchCondition = {}) => {
    const result = await rideModel.aggregate([
      { $match: matchCondition },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);
  
    const counts: Record<string, number> = {};
    result.forEach(({ _id, count }) => {
      counts[_id] = count;
    });

  
    return counts;
  };
  