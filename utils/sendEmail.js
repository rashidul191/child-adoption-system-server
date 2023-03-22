const { google } = require("googleapis");
const nodemailer = require("nodemailer");
require("dotenv").config();

const oAuth2Client = new google.auth.OAuth2(
  // process.env.SEND_MAIL_CLIENT_ID,
  "536465196733-nfpsls2n6ja5cppf5kkotvs3uj09aqtq.apps.googleusercontent.com ",
  //  process.evn.SEND_MAIL_CLIENT_SECRET,
  "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", //CLIENT_SECRET
  "https://developers.google.com/oauthplayground"
);

oAuth2Client.setCredentials({
  refresh_token: process.env.SENDMAIL_REFRESH_TOKEN,
});

module.exports.sendMailWithGmail = async (data) => {
  let toMail = Array.from(new Set(data.to)); // remove duplicates email
  const year = new Date().getFullYear(); // copyright year
  const access_Token = await oAuth2Client.getAccessToken();
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      //   user: process.evn.SENDER_MAIL,
      user: "rashidul.nk9090@gmail.com",
      //   clientId: process.evn.SEND_MAIL_CLIENT_ID,
      clientId:
        "536465196733-nfpsls2n6ja5cppf5kkotvs3uj09aqtq.apps.googleusercontent.com ",
      //   clientSecret: process.evn.SEND_MAIL_CLIENT_SECRET,
      clientSecret: "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",
      //   refreshToken: process.evn.SENDMAIL_REFRESH_TOKEN,
      refreshToken:
        "1//049NC4kD5Tcl2CgYIARAAGAQSNwF-L9Ire5IDwxq0Js9GH8woRyVQorCOebuWsxHem9DLgJ3k5bEWY-j-EqBOyukMvAupzJwdzQE",
      accessToken: access_Token,
    },
  });

  let mailData = {
    // from: process.evn.SENDER_MAIL,
    from: "rashidul.nk9090@gmail.com",
    to: toMail,
    subject: `Child Adoption System Ador - ${data.subject}`,
    text: `Child Adoption System Ador - ${data.text}`,
    html: `    
    <div style="background-color: #403D3D; font-family: verdana; max-width:100% ; margin: 50px 35px; padding: 20px 50px;">    
        <div style="background-color: #ffffff;  padding: 20px;">
            <div>
                <h2 style="text-align: center"> Child-Adoption-System-Ador </h2>
                <p>As-salamu alaykum</p>
                <p>Dear, <span style="color: gray">User</span></p>
            </div>
            <div style="text-align: center">${data.html}</div>
            <p> visit our site click here: <a href='https://child-adoption-system.web.app'>Child-Adoption-System-Ador</a></p>
        </div>
        <div style="text-align: center;">
            <div style="color: #ffffff;">
                <p>Thanks for your time,</p>  
                <p>Regards,</p>
                <p>Team child-adoption-system-ador</p>
            </div>
            <hr/>
            <div style="color: #ffffff;">
                <p>You have received this email because your are registered member on child-adoption-system-ador</p>
                <p> 
                    <a href='https://child-adoption-system.web.app/contact-us'>Contact-Us</a> |
                    <a href='https://child-adoption-system.web.app/terms-of-service'>Terms of Service</a> |
                    <a href='https://child-adoption-system.web.app/about'>About-us</a>
                </p>
                <p>Copyright © ${year} - All right <span style="color: yellow;">Child-Adoption-System-Ador</span></p>
            </div>
        </div> 
    </div>
    `,
  };

    console.log("Mail data: ",mailData);
  let info = await transporter.sendMail(mailData);
  //   console.log("Message sent successfully : %s", info.messageId);
  //   console.log("Preview URL : %s", nodemailer.getTestMessageUrl(info));

  return info?.messageId;
};
