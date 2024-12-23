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
      </NavLink>
      <div>
        <h1 className={classNames.amount}>${transactionDetails.amount}</h1>
        <div className={classNames.name}>{transactionDetails.name}</div>
        <div className={classNames.date}>
          {formatDateToMMDDYYYYHHMM(transactionDetails.date)}
        </div>
      </div>
      <div className={classNames.infoList}>
        <div className={classNames.infoItem + ' ' + classNames.infoItemStatus}>
          <b>Status: {transactionDetails.status}</b>
          <div>{transactionDetails.cardName}</div>
        </div>
        <div className={classNames.infoItem + ' ' + classNames.infoItemTotals}>
          <b>Total</b>
          <b>${transactionDetails.amount}</b>
        </div>
      </div>
    </main>
  );
};

export { TransactionDetail };
