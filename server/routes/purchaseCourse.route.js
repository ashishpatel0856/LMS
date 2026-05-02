import express from "express";
import { createCheckoutSession, stripeWebhook } from "../controllers/coursePurchase.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js"
const router = express.Router();

router.route("/checkout/create-checkout-session").post(isAuthenticated,createCheckoutSession)
router.route("/webhook").post(express.raw({type:"application/json"}),stripeWebhook);
// router.route("/course/:courseId/detail-with-status").get();
// router.route("/").get();

router.route("/course/:courseId/detail-with-status").get((req, res) => {
  res.send("course detail with status");
});

router.route("/").get((req, res) => {
  res.send("all purchased courses");
});
export default router;