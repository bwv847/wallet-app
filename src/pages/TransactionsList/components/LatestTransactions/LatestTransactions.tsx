import classNames from './LatestTransactions.module.css';
import { latestTransactions } from '../../../../mockApiResponses/latestTransactions.json';
import { Link } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple } from '@fortawesome/free-brands-svg-icons';
import { faBullseye, faGreaterThan } from '@fortawesome/free-solid-svg-icons';
import { formatTransactionItemDate } from '../../../../utils';

type TransactionIconProps = {
  icon: string;
};

const TransactionIcon = ({ icon }: TransactionIconProps) => {
  if (icon === 'apple') {
    return <FontAwesomeIcon icon={faApple} color={'white'} size={'xl'} />;
  }

  if (icon === 'ikea') {
    return (
      <i style={{ color: 'yellow', fontStyle: 'normal', fontWeight: 'bold' }}>
        IKEA
      </i>
    );
  }

  if (icon === 'target') {
    return <FontAwesomeIcon icon={faBullseye} color={'red'} size={'2xl'} />;
  }

  return null;
};

enum TransactionType {
  Credit = 'Credit',
  Payment = 'Payment',
}

type TransactionItem = {
  id: string;
  type: TransactionType;
  amount: number;
  name: string | null;
  description: string | null;
  date: string;
  pending: boolean;
  authorizedUser: string | null;
  icon: string;
};

type TransactionItemProps = {
  transaction: TransactionItem;
};

const TransactionItem = ({ transaction }: TransactionItemProps) => (
  <li key={transaction.id} className={classNames.transaction}>
    <div
      className={
        transaction.type === 'Payment'
          ? classNames.transactionImage +
            ' ' +
            classNames.paymentTransactionBackground
          : classNames.transactionImage
      }
    >
      <TransactionIcon icon={transaction.icon} />
    </div>
    <div className={classNames.transactionBody}>
      <div className={classNames.transactionHeader}>
        <div className={classNames.transactionName}>
          {transaction.type === 'Credit' ? transaction.name : 'Payment'}
        </div>
        <div
          style={{ marginLeft: 'auto' }}
          className={classNames.transactionAmount}
        >
          {transaction.type === 'Credit' && '+'}${transaction.amount}
        </div>
        <Link
          to={'/transactions/' + transaction.id}
          className={classNames.transactionDetailsLink}
        >
          <FontAwesomeIcon icon={faGreaterThan} />
        </Link>
      </div>
      <div className={classNames.text}>
        {transaction.pending
          ? 'Pending - Card Number Used'
          : transaction.description}
      </div>
      <div className={classNames.text}>
        {transaction.authorizedUser}
        {transaction.authorizedUser && ' - '}
        {formatTransactionItemDate(transaction.date.toString())}
      </div>
    </div>
  </li>
);

const LatestTransactions = () => {
  return (
    <section className={classNames.wrapper}>
      <h2>Latest Transactions</h2>
      <ul className={classNames.transactions}>
        {latestTransactions.map(transaction => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction as TransactionItem}
          />
        ))}
      </ul>
    </section>
  );
};

export { LatestTransactions };
