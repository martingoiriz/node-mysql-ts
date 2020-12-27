import express from "express";
import SqlGeneric from "../services/sqlGeneric";

const router = express.Router();
const sqlGeneric = new SqlGeneric();

// ==== GET ALL SUBSCRIPTORS ====
router.post("/getAllSubscriptors", (req: any, res: any) => {
  sqlGeneric.select("SELECT * FROM subscriptor").then(x => {
    res.json(x);
  });
});

// ==== GET ONE ====
router.post("/getSubscriptor", (req: any, res: any) => {
  let r = req.body;
  let sql = `SELECT * FROM subscriptor WHERE subscriptor_id = ${r.subscriptor_id} AND token = ${r.token};`;
  sqlGeneric.select(sql).then(x => {
    res.json(x);
  });
});

// ==== INSERT ONE ====
router.post("/addSubscriptor", (req: any, res: any) => {
  let r = req.body;
  let sql = `SELECT * FROM subscriptor WHERE email = '${r.email}';`;
  sqlGeneric.select(sql).then((x: any) => {
    if (x.data.length === 0) {
      let sql2 = `INSERT INTO subscriptor (email, token) VALUES ('${r.email}', '${r.token}');`;
      sqlGeneric.insert(sql2).then(finalRes => {
        res.json(finalRes);
      });
    } else {
      if (x.data[0].active === 0) {
        let sql3 = `UPDATE subscriptor SET active = 1 WHERE email = '${r.email}'`;
        sqlGeneric.update(sql3).then(finalRes => {
          res.json(finalRes);
        });
      } else {
        res.json(
          sqlGeneric.delivery_response(
            500,
            { sqlMessage: "duplicated" },
            x.data
          )
        );
      }
    }
  });
});

export default router;
