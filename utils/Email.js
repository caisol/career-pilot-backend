import nodemailer from "nodemailer";
import config from "config";

class Email {
  static sendEmail = async (settings) => {
    const { emailSettings, to, subject, body, cc, attachments } = settings;

    let fromName, email, user, pass;

    console.log("emailSettings UP", emailSettings);

    if (emailSettings) {
      fromName = emailSettings.fromName;
      email = emailSettings.email; // from email
      // user = emailSettings.user;
      user = emailSettings.email; // smtp user
      pass = emailSettings.password;
      // user = "vantage3600@gmail.com"; // smtp user
      // pass = "hfri qtge purl leyi"; // smtp password
    }

    try {
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: user,
          pass: pass
        }
      });

      var mailOptions = {
        from: `${fromName} <${email}>`,
        to: to,
        cc: cc,
        subject: subject,
        html: body,
        attachments: attachments ? attachments : []
      };

      const sentEmail = await transporter.sendMail(mailOptions)

      const { info, error } = sentEmail;

      return { info, error };
    } catch (error) {

      const { emailSettings, to, subject, body, cc, attachments } = settings;

      let fromName, email, apiToken;

      console.log("emailSettings DOWN", emailSettings);

      if (emailSettings) {
        fromName = emailSettings.fromName;
        email = emailSettings.email; // from email
        apiToken = emailSettings.password; // taken from mailtrap
      }

      // Regular expressions to check email domains
      const caisolRegex = /@caisol\.com$/i;
      const primevcsRegex = /@primevcs\.com$/i;

      if (caisolRegex.test(email)) {
        return this.mailTrapCaisol(email, to, cc, subject, body, attachments, fromName);

      } else if (primevcsRegex.test(email)) {
        return this.mailTrapPrimeVCS(email, to, cc, subject, body, attachments, fromName);
      }
      else {
        return this.mailTrap(email, to, cc, subject, body, attachments, fromName, apiToken);

      }

      // if (caisolRegex.test(email)) {
      //   return this.mailTrapCaisol(email, to, cc, subject, body, attachments, fromName);

      // } else if (primevcsRegex.test(email)) {
      //   return this.mailTrapPrimeVCS(email, to, cc, subject, body, attachments, fromName);

      // } else {

      //   email = "contact@caisol.com"
      //   return this.mailTrapCaisol(email, to, cc, subject, body, attachments, fromName);
      // }
    }
  }

  static mailTrap = async (email, to, cc, subject, body, attachments, fromName, apiToken) => {
    if ( !apiToken ) {
      console.log(`No API Token provided. Now sending from @Caisol for ${fromName}`);
      
      email = "contact@caisol.com";
      return this.mailTrapCaisol(email, to, cc, subject, body, attachments, fromName);
    }

    try {
      var transporter1 = nodemailer.createTransport({
        service: 'live.smtp.mailtrap.io',
        host: 'live.smtp.mailtrap.io',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: 'api',
          pass: apiToken
          // pass: '83a295b5a24edfd2434ac5a52593d055'
        }
      });

      var mailOptions1 = {
        from: `${fromName} <${email}>`,
        to: to,
        cc: cc,
        subject: subject,
        html: body,
        attachments: attachments ? attachments : []
      };

      const sendEmailMailTrap = await transporter1.sendMail(mailOptions1);
      const { info: mailTrapInfo, error: mailTrapError } = sendEmailMailTrap;
      return { info: mailTrapInfo, error: mailTrapError };

    } catch (e) {
      // return { error: e };
      console.log("sendEmail Error while sending from mailtrap: ", e);
      console.log("Now sending from @Caisol");
      email = "contact@caisol.com";
      
      return this.mailTrapCaisol(email, to, cc, subject, body, attachments, fromName);
    }
  }

  static mailTrapCaisol = async (email, to, cc, subject, body, attachments, fromName) => {
    try {
      var transporter1 = nodemailer.createTransport({
        service: 'live.smtp.mailtrap.io',
        host: 'live.smtp.mailtrap.io',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: 'api',
          pass: '83a295b5a24edfd2434ac5a52593d055'
        }
      });

      var mailOptions1 = {
        from: `${fromName} <${email}>`,
        to: to,
        cc: cc,
        subject: subject,
        html: body,
        attachments: attachments ? attachments : []
      };

      const sendEmailMailTrap = await transporter1.sendMail(mailOptions1);
      const { info: mailTrapInfo, error: mailTrapError } = sendEmailMailTrap;
      return { info: mailTrapInfo, error: mailTrapError };

    } catch (e) {
      return { error: e };
    }
  }

  static mailTrapPrimeVCS = async (email, to, cc, subject, body, attachments, fromName) => {
    try {
      var transporter1 = nodemailer.createTransport({
        service: 'live.smtp.mailtrap.io',
        host: 'live.smtp.mailtrap.io',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: 'api',
          pass: '55a96e95f30612bdc256bdaad792c8d3'
        }
      });

      var mailOptions1 = {
        from: `${fromName} <${email}>`,
        // from: email,
        to: to,
        cc: cc,
        subject: subject,
        html: body,
        attachments: attachments ? attachments : []
      };

      const sendEmailMailTrap = await transporter1.sendMail(mailOptions1);
      const { info: mailTrapInfo, error: mailTrapError } = sendEmailMailTrap;
      return { info: mailTrapInfo, error: mailTrapError };

    } catch (e) {
      return { error: e };
    }
  }
}

export default Email;