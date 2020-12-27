import express from "express";
import SqlGeneric from "../services/sqlGeneric";
import mailTo from "../services/mailer";

const router = express.Router();
const sqlGeneric = new SqlGeneric();

// ==== SEND TEST MAIL ====
router.post("/sendMail", async (req: any, res: any) => {
  let r = req.body;

  /*
      I use 2 columns in the table 'subscriptor' besides the id
      -email
      -token
  */

  // ** Only for test [token = 'test'] **
  if (r.pass === "test") {
    sendTest().then(report =>
      // Send the email only to the emails that has 'test' as token.
      res.json(
        sqlGeneric.delivery_response(200, { sqlMessage: "sent" }, report)
      )
    );
    return;
  }
  // ****

  if (r.pass === "prod") {
    sendAndReport(r.html).then(report =>
      res.json(
        sqlGeneric.delivery_response(200, { sqlMessage: "sent" }, report)
      )
    );
    return;
  }
});

async function sendAndReport(html?: string) {
  let report: any[] = [];

  let htmlDefault = `<html> <p>Prod email</p> </html>`;
  let query = "SELECT email FROM subscriptor";

  return await sqlGeneric.select(query).then(async (emailList: any) => {
    for (let item of emailList["data"]) {
      await mailTo(item.email, html ? html : htmlDefault).then(sent => {
        report.push(sent);
      });
    }
    return report;
  });
}

async function sendTest() {
  let report: any[] = [];

  let query = "SELECT * FROM subscriptor WHERE token = 'test';";
  let html = `<html> <p>Test email</p> </html>`;

  return await sqlGeneric.select(query).then(async (emailList: any) => {
    for (let item of emailList["data"]) {
      await mailTo(item.email, html).then(sent => {
        report.push(sent);
      });
    }
    return report;
  });
}

export default router;
