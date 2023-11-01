import app from './app.js';
import { relationModel } from './config/database/associations.js';
import { authenticate, syncUp } from './config/database/database.js';
import { envs } from './config/enviroments/enviroments.js';

async function main() {
  try {
    await authenticate();
    relationModel();
    await syncUp();
  } catch (error) {
    console.log(error);
  }
}
main();

app.listen(envs.PORT, () => {
  console.log(`Server running on port ${envs.PORT}`);
});
