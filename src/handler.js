import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses";

// Set the AWS Region.
const REGION = "us-east-2";
// Create SES service object.
const sesClient = new SESClient({ region: REGION });

const createSendEmailCommand = (
  toAddress,
  fromAddress,
  replyTo,
  messageBody,
  firstName,
  lastName
) => {
  return new SendEmailCommand({
    Destination: {
      /* required */
      CcAddresses: [
        /* more items */
      ],
      ToAddresses: toAddress,
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: "UTF-8",
          Data: messageBody,
        },
        Text: {
          Charset: "UTF-8",
          Data: messageBody,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: `Ribbit Inquiry - ${firstName} ${lastName}`,
      },
    },
    Source: fromAddress,
    ReplyToAddresses: replyTo,
  });
};

const sendMail = async (event) => {
  console.log("** EVENT OBJECT ", event);
  const incomingMsg = event.body;
  const replyTo = incomingMsg.replyTo;
  const firstName = incomingMsg.firstName;
  const lastName = incomingMsg.lastName;
  const callSign = incomingMsg.callSign;
  const messageBody = incomingMsg.messageBody;

  const formattedMessage = `Greetings from ${firstName} ${lastName} ${callSign}:
  \n${messageBody}`;

  const sendEmailCommand = createSendEmailCommand(
    [
      "ke0cci@arrl.net",
      "inan@aicodix.de",
      "w4ckx@pekt.org",
      "neil@askneil.com",
    ],
    "ke0cci@arrl.net",
    [replyTo],
    formattedMessage,
    firstName,
    lastName
  );

  try {
    await sesClient.send(sendEmailCommand);
    return {
      statusCode: 200,
      body: JSON.stringify("Email sent!"),
    };
  } catch (e) {
    console.error("Failed to send email.");
    return {
      statusCode: 500,
      body: JSON.stringify(e.message),
    };
  }
};

export { sendMail };
