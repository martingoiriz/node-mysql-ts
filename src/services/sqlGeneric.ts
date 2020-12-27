import mysqlConnection from "../database";

export default class SqlGeneric {
  constructor() {}

  select(queryString: string): Promise<Object> {
    return new Promise(resolve => {
      mysqlConnection.query(queryString, (err: any, rows: any) => {
        let resp;
        if (err) {
          resp = this.delivery_response(err.errno, err || "not found", []);
        }
        if (!rows || rows.length === 0) {
          resp = this.delivery_response(200, "not found", rows);
        } else {
          resp = this.delivery_response(200, "event found", rows);
        }
        resolve(resp);
      });
    });
  }

  insert(queryString: string): Promise<Object> {
    return new Promise(resolve => {
      mysqlConnection.query(queryString, (err: any, rows: any) => {
        let resp;

        if (err) {
          resp = this.delivery_response(err.errno, err, []);
        }

        if (rows.affectedRows === 1) {
          resp = this.delivery_response(200, "inserted", [
            {
              insertId: rows.insertId
            }
          ]);
        } else {
          resp = this.delivery_response(200, "insert failed", []);
        }
        resolve(resp);
      });
    });
  }

  update(queryString: string): Promise<Object> {
    return new Promise(resolve => {
      mysqlConnection.query(queryString, (err: any, rows: any) => {
        let resp;

        if (err) {
          resp = this.delivery_response(err.errno, err, []);
        }

        if (rows.affectedRows === 1) {
          resp = this.delivery_response(200, "updated", []);
        } else {
          resp = this.delivery_response(200, "update failed", []);
        }
        resolve(resp);
      });
    });
  }

  delete(queryString: string): Promise<Object> {
    return new Promise(resolve => {
      mysqlConnection.query(queryString, (err: any, rows: any) => {
        let resp;

        if (err) {
          resp = this.delivery_response(err.errno, err, []);
        }

        if (rows.affectedRows === 1) {
          resp = this.delivery_response(200, "deleted", []);
        } else {
          resp = this.delivery_response(200, "delete failed", []);
        }
        resolve(resp);
      });
    });
  }

  delivery_response(status: number, status_message: any, data: Array<any>) {
    return {
      status: status,
      status_message:
        status === 200
          ? status_message
          : {
              sqlMessage: status_message.sqlMessage,
              sql: status_message.sql
            },

      data: data
    };
  }
}
