import classNames from './CardBalance.module.css';
import { cardBalance } from '../../../../mockApiResponses/cardBalance.json';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { calculatePoints, getCurrentDayOfSeason } from '../../../../utils';

const Balance = () => {
  const { limit, balance } = cardBalance;

  return (
    <section className={classNames.balance}>
      <h5 className={classNames.balanceSubheader}>Card Balance</h5>
      <h4 className={classNames.balanceHeader}>${balance}</h4>
      <p className={classNames.text}>${limit + balance} Available</p>
    </section>
  );
};

const DailyPoints = () => (
  <section className={classNames.points}>
    <h5>Daily Points</h5>
    <p className={classNames.text}>
      {calculatePoints(getCurrentDayOfSeason())}
    </p>
  </section>
);

const PaymentDue = () => (
  <section className={classNames.paymentDue}>
    <div>
      <h4>No payment due</h4>
      <p className={classNames.text}>You've paid your September balance.</p>
    </div>
    <div className={classNames.paymentDueCheckIcon}>
      <FontAwesomeIcon icon={faCheck} size='2xl' />
    </div>
  </section>
);

const CardBalance = () => (
  <div className={classNames.wrapper}>
    <Balance />
    <DailyPoints />
    <PaymentDue />
  </div>
);

export { CardBalance };
