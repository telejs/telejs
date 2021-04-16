import dotenv from 'dotenv';
dotenv.config();

export function logger(message: any): void {
  if (process.env.DEBUG) {
    console.log(message);
  }
}
