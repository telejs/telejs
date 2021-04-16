import { readFileSync, writeFileSync } from 'fs';
import { mkdirSync } from 'fs';
import { dirname, resolve } from 'path';

export default class JSONStorage {
  private path: string;
  private data: Record<string, string>;
  private dirname: string;
  constructor(path: string) {
    this.path = path ? path : './data.json';
    this.dirname = dirname(resolve(this.path));
    mkdirSync(this.dirname, { recursive: true });
    try {
      this.data = JSON.parse(readFileSync(this.path, 'utf-8'));
    } catch (e) {
      writeFileSync(this.path, JSON.stringify({}));
      this.data = {};
    }
  }

  async getItem(key: string): Promise<string | null> {
    this.data = JSON.parse(readFileSync(this.path, 'utf-8'));
    return this.data[key] ? this.data[key] : null;
  }

  async setItem(key: string, value: string): Promise<void> {
    this.data[key] = value;
    writeFileSync(this.path, JSON.stringify(this.data));
  }
}
