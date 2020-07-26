//utilities
const CustomError = require("../../utils/customError");
const responseHandler = require("../../utils/responseHandler");

//models
const MsAdmin = require("../../models/msadmins");
const SubscriptionModel = require("../../models/subscriptions");

/**
 * @author Ekeyekwu Oscar
 *
 * gets all application subscribed to a plan.
 *
 * @param {*} req - The request object
 * @param {*} res - The response object
 * @param {*} next - The function executed to call the next middleware
 */

const getAllAppSubscriptions = async (req, res, next) => {
  const { msAdminId } = req.token;

  try {
    //check if msadmin exists
    const msAdmin = await MsAdmin.findById(msAdminId);

    if (!msAdmin) {
      next(
        new CustomError(401, "You are not authorized to access this resource")
      );
      return;
    }

    //get all subscriptions from model
    const subscriptions = await SubscriptionModel.find();
    if (!subscriptions) {
      next(new CustomError(404, "No Subscription record found"));
      return;
    }

    const allSubscriptions = subscriptions.map((subs) => {
      return {
        subscriptionId: subs._id,
        applicationId: subs.applicationId,
        planName: subs.planName,
        dailyLimits: subs.dailyLimits,
        perMinuteLimits: subs.perMinuteLimits,
        logging: subs.logging,
        subscriptionStartDate: subs.subscriptionStartDate,
      };
    });

    responseHandler(
      res,
      200,
      allSubscriptions,
      "Application subscriptions retrieved successfully"
    );
  } catch (error) {
    next(error);
    next(new CustomError(500, "Something went wrong, please try again..."));
    return;
  }
};

module.exports = getAllAppSubscriptions;
