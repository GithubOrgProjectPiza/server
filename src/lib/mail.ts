import Handlebars, { template } from "handlebars";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

import mjml from "./mjml";

export let mailAccount = {
  user: process.env.MAILUSER + "@mail." + process.env.DOMAIN,
  pass: process.env.MAILPASSWORD || "password",
};

let transporter =
  process.env.DEV == "true" || process.env.DOMAIN == undefined
    ? (async () => {
        mailAccount = await nodemailer.createTestAccount();
        //mailAccount = {
        //  user: "",
        //  pass: "",
        //};
        if (process.env.NODE_ENV != "test") {
          console.log(mailAccount);
        }
        return nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: mailAccount.user, // generated ethereal user
            pass: mailAccount.pass, // generated ethereal password
          },
        });
      })()
    : nodemailer.createTransport(
        new SMTPTransport({
          host: "localhost",
          port: 587,
          secure: false,
          auth: {
            user: mailAccount.user,
            pass: mailAccount.pass,
          },
          tls: {
            rejectUnauthorized: false,
            secureProtocol: "TLSv1_method",
          },
        })
      );

const sendMail = async (from: string, to: string, subject: string, text?: string, html?: string) => {
  return await (
    await transporter
  ).sendMail({
    from: from,
    to: to,
    subject: subject,
    text: text,
    html: html,
  });
};

export const verificationMail = async (to: string, id: string) => {
  const raw = mjml.getTemplate("verify");

  //TODO: Replace other handlebars with final values
  const message = Handlebars.compile(raw);

  const data = {};
  const compiled = message(data);

  sendMail(mailAccount.user, to, "Verify Email", undefined, compiled);
};

export default { sendMail };
