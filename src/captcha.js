import axios from "axios";

const verify = async (event) => {
  const incomingMsg = event.body;
  const captchaResponse = incomingMsg.captchaResponse;
  const KEY = "INSERT_SECRET_KEY_HERE";
  const URL = "https://www.google.com/recaptcha/api/siteverify";

  const verify = `${URL}?secret=${KEY}&response=${captchaResponse}`;
  try {
    const resp = await axios.post(verify);
    return {
      status: 200,
      body: {
        success: resp.data.success,
      },
    };
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
    return {
      status: 500,
      body: {
        error: JSON.stringify(error),
      },
    };
  }
};

export { verify };
