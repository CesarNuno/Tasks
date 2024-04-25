import { createPool } from "mysql2/promise";

export const pool = createPool({
        host: "todolist-todolistdb.h.aivencloud.com",
        user: "avnadmin",
        password: "AVNS_gED-UbS6qmQDibJLwh1",
        database: "todolistdb",
        port: 18756
})
