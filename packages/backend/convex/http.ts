import { httpRouter } from "convex/server";

import { revenuecat } from "./revenuecat";

const http = httpRouter();

/**
 * RevenueCat Webhook Endpoint
 *
 * This endpoint receives webhook events from RevenueCat when subscription
 * states change (purchases, renewals, cancellations, etc.)
 *
 * @see {@link https://www.revenuecat.com/docs/webhooks|RevenueCat Webhooks Documentation}
 */
http.route({
	path: "/webhooks/revenuecat",
	method: "POST",
	handler: revenuecat.httpHandler(),
});

export default http;
