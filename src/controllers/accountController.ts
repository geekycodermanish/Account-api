import { Request, Response } from 'express';
import { AccountService } from '../services/accountService';
import { sendEmailNotification } from '../services/emailService';

export class AccountController {
  static async signup(req: Request, res: Response) {
    const { first_name, last_name, email, phone, password, birthday } = req.body;
    try {
      await AccountService.createAccount(first_name, last_name, email, phone, password, birthday);
      await sendEmailNotification(email);
      res.status(201).send({ message: 'Account created' });
    } catch (error) {
      res.status(400).send({ message: 'Error creating account', error });
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const token = await AccountService.authenticate(email, password);
      res.status(200).send({ token });
    } catch (error) {
      res.status(401).send({ message: 'Invalid credentials', error });
    }
  }

  static async getAccounts(req: Request, res: Response) {
    const limit = parseInt(req.query.limit as string) || 10;
    try {
      const accounts = await AccountService.getAccounts(limit);
      res.status(200).send(accounts);
    } catch (error) {
      res.status(500).send({ message: 'Error fetching accounts', error });
    }
  }

  static async getAccountById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const account = await AccountService.getAccountById(id);
      if (account) {
        res.status(200).send(account);
      } else {
        res.status(404).send({ message: 'Account not found' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Error fetching account', error });
    }
  }

  static async updateAccount(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const { first_name, last_name, email, phone, birthday } = req.body;
    try {
      const updated = await AccountService.updateAccount(id, first_name, last_name, email, phone, birthday);
      if (updated) {
        res.status(200).send({ message: 'Account updated' });
      } else {
        res.status(404).send({ message: 'Account not found' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Error updating account', error });
    }
  }

  static async deleteAccount(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const deleted = await AccountService.deleteAccount(id) ;
      if (deleted) {
        res.status(200).send({ message: 'Account deleted' });
      } else {
        res.status(404).send({ message: 'Account not found' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Error deleting account', error });
    }
  }
}
