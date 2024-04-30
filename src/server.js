const app = require("./app");
const db = require("./config/db.config");

const PORT = 3001;

//-----MongoDB connection & Express startup-----//
const startServer = async () => {
  await db.connectDB();
  app.listen(PORT, () =>
    console.log(`*** Express server listening on ${PORT} ***`)
  );
};

startServer().catch((err) => console.error("Error starting server:", err));
