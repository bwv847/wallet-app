import { CardBalance, LatestTransactions } from './components';
import classNames from './TransactionsList.module.css';

const TransactionList = () => {
  return (
    <main className={classNames.wrapper}>
      <CardBalance />
      <LatestTransactions />
    </main>
  );
};

export { TransactionList };
