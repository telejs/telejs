import * as dotenv from 'dotenv';
dotenv.config();

export function logger(message: any): void {
  if (process.env.DEBUG) {
    const date = new Date();
    console.debug(`[${date.toISOString()}]: `, message);
  }
}
