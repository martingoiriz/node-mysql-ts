import nodemailer from "nodemailer";

export default function mailTo(email: string, html: string): Promise<any> {
  return new Promise(resolve => {
    let transporter = nodemailer.createTransport({
      pool: true,
      host: "host-example.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "no-reply@martingoiriz.com.ar",
        pass: "aeiou"
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    let info = transporter.sendMail({
      from: "MG | Blog <no-reply@martingoiriz.com.ar>",
      to: email,
      subject: "Email subject",
      html: html // full body
    });

    resolve(info);
  });
}
