import { NavLink } from 'react-router';
import { transactionDetails } from '../../mockApiResponses/transactionDetails.json';
import { faLessThan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from './TransactionDetail.module.css';
import { formatDateToMMDDYYYYHHMM } from '../../utils';

const TransactionDetail = () => {
  return (
    <main className={classNames.wrapper}>
      <NavLink to='/transactions/'>
        <FontAwesomeIcon icon={faLessThan} />
        <span className='sr-only'>Back to transactions</span>
      </NavLink>
      <section aria-labelledby='transaction-amount'>
        <h1 id='transaction-amount' className={classNames.amount}>
          ${transactionDetails.amount}
        </h1>
        <p className={classNames.name}>{transactionDetails.name}</p>
        <time className={classNames.date} dateTime={transactionDetails.date}>
          {formatDateToMMDDYYYYHHMM(transactionDetails.date)}
        </time>
      </section>
      <section className={classNames.infoList}>
        <div className={`${classNames.infoItem} ${classNames.infoItemStatus}`}>
          <p>
            <strong>Status:</strong> {transactionDetails.status}
          </p>
          <p>{transactionDetails.cardName}</p>
        </div>
        <div className={`${classNames.infoItem} ${classNames.infoItemTotals}`}>
          <p>
            <strong>Total</strong>
          </p>
          <p>
            <strong>${transactionDetails.amount}</strong>
          </p>
        </div>
      </section>
    </main>
  );
};

export { TransactionDetail };
