import express from "express";
import pizzeRouter from "./routes/pizze.js";
import narudzbeRouter from "./routes/narudzbe.js";

const app = express();
const PORT = 3000;
app.use(express.json());
app.use("/pizze", pizzeRouter);
app.use("/narudzbe", narudzbeRouter);

app.listen(PORT, (error) => {
  if (error) {
    console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
  } else {
    console.log(`Server je pokrenut na http://localhost:${PORT}`);
  }
});
