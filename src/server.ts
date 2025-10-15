import app from "./app";
import { serverPort } from "./config";
import { dbConfig } from "./dbConfig/dbConfig";

// db connection
dbConfig();

app.listen(serverPort, () => console.log(`http://localhost:${serverPort}`));
