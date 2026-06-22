import app from "./app.js";
import { env } from "./config/env.js";

const PORT = env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
});