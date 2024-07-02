import { initDatabase } from '../models/accountModel';
import { hashPassword, comparePassword, generateToken } from '../utils/utils';

export class AccountService {
  static async createAccount(first_name: string, last_name: string, email: string, phone: string, password: string, birthday: string) {
    const hashedPassword = await hashPassword(password);
    const createdAt = new Date().toISOString();
    const lastModified = createdAt;

    const db = await initDatabase();

    await db.run(`
    INSERT INTO accounts (first_name, last_name, email, phone, password, birthday, created_at, last_modified)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [first_name, last_name, email, phone, hashedPassword, birthday, createdAt, lastModified]);
  }

  static async authenticate(email: string, password: string) {
    const db = await initDatabase();
    const account = await db.get(`SELECT * FROM accounts WHERE email = ?`, [email]);

    if (account && await comparePassword(password, account.password)) {
      return generateToken(account.id);
    } else {
      throw new Error('Invalid credentials');
    }
  }

  static async getAccounts(limit: number) {
    const db = await initDatabase();
    return db.all(`SELECT * FROM accounts LIMIT ?`, [limit]);
  }

  static async getAccountById(id: number) {
    const db = await initDatabase();
    return db.get(`SELECT * FROM accounts WHERE id = ?`, [id]);
  }

  static async updateAccount(id: number, first_name: string, last_name: string, email: string, phone: string, birthday: string) {
    const lastModified = new Date().toISOString();

    const db = await initDatabase();
    const account = await db.get(`SELECT * FROM accounts WHERE id = ?`, [id]);

    if (account) {
      await db.run(`
        UPDATE accounts
        SET first_name = ?, last_name = ?, email = ?, phone = ?, birthday = ?, last_modified = ?
        WHERE id = ?
      `, [first_name, last_name, email, phone, birthday, lastModified, id]);

      return true;
    } else {
      return false;
    }
  }

  static async deleteAccount(id: number) {
    const db = await initDatabase();
    const account = await db.get(`SELECT * FROM accounts WHERE id = ?`, [id]);

    if (account) {
      await db.run(`DELETE FROM accounts WHERE id = ?`, [id]);
      return true;
    } else {
      return false;
    }
  }
}
