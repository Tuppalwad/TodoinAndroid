import axios from 'axios';

const baseUri = 'http://192.168.1.9:3000/api/';

export const sendOTP = async (phone) => {
  try {
    const response = await axios.post(baseUri + "auth/send-otp", { phone });
    console.log(response.data, 'data');
    return response.data;
  } catch (error) {
    console.log(error);
    return error.message;
  }
}


export const verifyOTP = async (phone, otp) => {
  try {
    const response = await axios.post(baseUri + "auth/verify-otp", { phone:phone, otp:otp });
    return response.data
  } catch (error) {
    console.log(error)
    return error.message
  }
}

