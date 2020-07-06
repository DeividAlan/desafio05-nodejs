import Transaction from '../models/Transaction';

interface CreateTransaction {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const ttIncome = this.transactions.reduce((total, next) => {
      if (next.type === 'income') {
        return total + next.value;
      }
      return total + 0;
    }, 0);

    const ttOutcome = this.transactions.reduce((total, next) => {
      if (next.type === 'outcome') {
        return total + next.value;
      }
      return total + 0;
    }, 0);

    const balance: Balance = {
      income: ttIncome,
      outcome: ttOutcome,
      total: ttIncome - ttOutcome,
    };

    return balance;
  }

  public create({ title, type, value }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
