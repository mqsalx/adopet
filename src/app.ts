import express, { Response } from "express";
import router from "./routes/index.js";


const app = express();
app.use(express.json());

router(app)

function createPet(id: number, name: string, species: string, age: number, adopt: boolean) {
  return {
    id,
    name,
    species,
    age,
    adopt,
  };
}

let id = 0
function genId() {
  id = id + 1;
  return id;
}

app.post("/pets", (_, res) => {
  const pet1 = createPet(genId(), "Bolt", "dog", 3, false);
  const pet2 = createPet(genId(), "Mel", "cat", 2, false);

  res.send([pet1, pet2]);
});

export default app;
