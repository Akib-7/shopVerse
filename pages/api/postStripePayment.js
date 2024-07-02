import { Stripe } from 'stripe'; // Import Stripe module

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY, {
  apiVersion: '2020-08-27', // Use the appropriate API version
});


export default async (req, res) => {
  try {
    const event = stripe.webhooks.constructEvent(
      req.body, // The request body as a Buffer
      req.headers['stripe-signature'], // The Stripe signature header
      process.env.STRIPE_WEBHOOK_SECRET // Your webhook secret
    );
    switch (event.type) {
      
        case 'checkout.session.completed':
          const checkoutSessionCompleted = event.data.object;
          // Update order status in the database
          console.log("Order ID: "+checkoutSessionCompleted )
          await orderModel.findOneAndUpdate(
            { orderId: checkoutSessionCompleted.client_reference_id },
            { $set: { status: 'Paid' } }
          );
          break;
      
        case 'checkout.session.expired':
          const checkoutSessionExpired = event.data.object;
          // Then define and call a function to handle the event checkout.session.expired
          break;
      
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

    // // Handle the event based on its type
    // switch (event.type) {
        
    //   case 'checkout.session.completed':
    //     // This event is sent when a payment is successful
    //     const session = event.data.object;
    //     // Update your order status in the database to 'Paid'
    //     await orderModel.findOneAndUpdate(
    //       { orderId: session.client_reference_id },
    //       { $set: { status: 'Paid' } }
    //     );
    //     break;

    //   // Add more cases for other events you want to handle

    //   default:
    //     console.warn(`Unhandled event type: ${event.type}`);
    // }

    // Respond to the webhook event
    res.json({ received: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }
};
