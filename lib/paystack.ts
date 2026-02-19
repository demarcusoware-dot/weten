import axios from "axios";

export const paystack = axios.create({
  baseURL: "https://api.paystack.co",
  headers: {
    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    "Content-Type": "application/json",
  },
});

export const onetime = async (email: string) =>
  await paystack.post("/transaction/initialize", {
    email,
    amount: 5000 * 100,
    metadata: {
      purpose: "registration_fee",
    },
  });
