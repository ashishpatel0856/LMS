import Stripe from "stripe";
import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
    try {
        const userId = req.id;
        const { courseId } = req.body;

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({
            message: 'Course not found!'
        });

        // create a new course purchase record
        const newPurchase = new CoursePurchase({
            courseId,
            userId,
            amount: course.coursePrice,
            status: "pending"
        });

        // create a stripe checkout sesson
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: course.courseTitle,
                            images: [course.courseThumbnail],
                        },
                        unit_amount: course.coursePrice * 100 // amount in paise
                    },
                    quantity: 1,
                },
            ],

            mode: "payment",
            success_url: `http://localhost:5173/course-progress/${courseId}`,
            cancel_url: `http://localhost:5173/course-details/${courseId}`,
            metadata: {
                courseId: courseId,
                userId: userId,
            },

            shipping_address_collection: {
                allowed_countries: ["IN"], // optionally restrict allowed countries
            },
        });

        if (!session.url) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Error while creating session"
                });
        }

        // save the purchase record
        newPurchase.paymentId = session.id;
        await newPurchase.save();

        return res.status(200).json({
            success: true,
            url: session.url,  // return the stripe checkout url
        });
    } catch (error) {
        console.log(error);

    }
}

export const stripeWebhook = async (req, res) => {
    let event;
    try {
        const payloadString = JSON.stringify(req.body, null, 2);
        const secret = process.env.WEBHOOK_ENDPOINT_SECRET;

        const header = stripe.webhooks.generateTestHeaderString({
            payload: payloadString,
            secret,
        });

        event = stripe.webhooks.constructEvent(payloadString, header, secret);
    } catch (error) {
        console.log("webhook error:", error.message);
        return res.status(400).send(`webhook error: ${error.message}`);
    }

    // handle the checkout session completed event
    if (event.type === "checkout.session.completed") {
        try {
            const session = event.data.object;

            const purchase = await CoursePurchase.findOne({
                paymentIntentId: session.id,
            }).populate({ path: "courseId" });

            if (!purchase) {
                return res.status(404).json({ message: "Purchase not found" });
            }

            if (session.amount_total) {
                purchase.amount = session.amount_total / 100;
            }
            purchase.status = 'completed';

            // make all lectures visible by setting 'isPreviewFree to true
            if (purchase.courseId && purchase.courseId.lectures.length > 0) {
                await Lecture.updateMany(
                    { _id: { $in: purchase.courseId.lectures } },
                    { $set: { isPreviewFree: true } }
                );
            }

            await purchase.save();

            // update user enrolled courses
            await User.findByIdAndUpdate(
                { $addToSet: { enrolledCourses: purchase.courseId._id } }, // add course id
                { new: true }
            );

            // update course to add userID to enrolledstudents

            await Course.findByIdAndUpdate(
                purchase.courseId._id,
                { $addToSet: { enrolledStudents: purchase.userId } }, // add user to enrolled course
                { new: true }
            );
        } catch (error) {
            console.log("error handling events:", error);
            return res.status(500).json({
                message: "Internal server error"
            });
        }
    }
    res.status(200).send();
}