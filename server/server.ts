import app from './app';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 9001;

app.listen(PORT, () => {
  console.log(`⚡️Express:${PORT} ⚡️`);
});
