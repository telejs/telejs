import { readFileSync, writeFileSync } from 'fs';

export class JSONStorage {
  path: string;
  data: Record<string, string>;
  constructor(path: string) {
    this.path = path ? path : './data';
    try {
      this.data = JSON.parse(readFileSync(this.path, 'utf-8'));
    } catch (e) {
      writeFileSync(this.path, JSON.stringify({}));
      this.data = {};
    }
  }

  getItem(key: string): string {
    this.data = JSON.parse(readFileSync(this.path, 'utf-8'));
    return this.data[key];
  }

  setItem(key: string, value: string): void {
    this.data[key] = value;
    writeFileSync(this.path, JSON.stringify(this.data));
  }
}
