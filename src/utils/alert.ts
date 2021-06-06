import axios from 'axios';

export const sendAlert = async (text: string) => {
  const body = {
    from: process.env.VONAGE_SMS_NUMBER,
    to: process.env.SMS_TO,
    api_key: process.env.VONAGE_API_KEY,
    api_secret: process.env.VONAGE_API_SECRET,
    text,
  };

  const response = await axios.post(process.env.VONAGE_API_URL as string, body);
  return response.data;
};
