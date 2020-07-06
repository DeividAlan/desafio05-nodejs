import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Request): Transaction {
    const balance = this.transactionsRepository.getBalance();

    if (type !== 'income' && type !== 'outcome') {
      throw Error('Transaction type is wrong');
    }

    if (value <= 0) {
      throw Error('Value cannot be less than or equal to 0');
    }

    if (type === 'outcome' && value > balance.total) {
      throw Error('insufficient funds');
    }

    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    return transaction;
  }
}

export default CreateTransactionService;
