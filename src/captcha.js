exports.verify = async (event, context, callback) => {
  if (event.body) {
    let eventBody = JSON.parse(event.body);

    const responseBody = { message: `Hello, ${eventBody.callName}` };
    const response = {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      isBase64Encoded: false,
      body: JSON.stringify(responseBody),
    };

    return response;
  }

  return {
    statusCode: 400,
    headers: {
      "Content-Type": "application/json",
    },
    isBase64Encoded: false,
    body: { error: "No body" },
  };
};
