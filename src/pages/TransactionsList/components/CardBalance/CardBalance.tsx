import classNames from './CardBalance.module.css';
import { cardBalance } from '../../../../mockApiResponses/cardBalance.json';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const formatUSD = (number: number) => '$' + String(number);

// Utility function to format large numbers in "K" format
const formatPoints = (points: number): string => {
  return points > 1000 ? `${Math.round(points / 1000)}K` : points.toString();
};

// Function to calculate daily points
const calculatePoints = (day: number): string => {
  if (day < 1) throw new Error('Day must be greater than 0.');

  if (day === 1) return formatPoints(2);
  if (day === 2) return formatPoints(3);

  let prevPrevPoints = 2; // Points from the first day
  let prevPoints = 3; // Points from the second day
  let currentPoints = 0;

  for (let i = 3; i <= day; i++) {
    currentPoints = Math.round(prevPrevPoints * 1 + prevPoints * 0.6);
    prevPrevPoints = prevPoints;
    prevPoints = currentPoints;
  }

  return formatPoints(currentPoints);
};

const getCurrentDayOfSeason = (): number => {
  const date = new Date();
  // Define the start dates of each season
  const seasonStartDates: { [key: string]: Date } = {
    spring: new Date(date.getFullYear(), 2, 1), // March 1
    summer: new Date(date.getFullYear(), 5, 1), // June 1
    autumn: new Date(date.getFullYear(), 8, 1), // September 1
    winter: new Date(date.getFullYear(), 11, 1), // December 1
  };

  // Determine the current season
  let currentSeasonStart = seasonStartDates.spring;

  if (date >= seasonStartDates.winter || date < seasonStartDates.spring) {
    currentSeasonStart = seasonStartDates.winter;
  } else if (date >= seasonStartDates.autumn) {
    currentSeasonStart = seasonStartDates.autumn;
  } else if (date >= seasonStartDates.summer) {
    currentSeasonStart = seasonStartDates.summer;
  }

  // Calculate the day of the season
  const diffInMs = date.getTime() - currentSeasonStart.getTime();
  const dayOfSeason = Math.floor(diffInMs / (1000 * 60 * 60 * 24)) + 1;

  return dayOfSeason;
};

// describe('calculateDailyPoints', () => {
//   it('should return 2 points on day 1', () => {
//     expect(calculateDailyPoints(1)).toBe('2');
//   });
//
//   it('should return 3 points on day 2', () => {
//     expect(calculateDailyPoints(2)).toBe('3');
//   });
//
//   it('should calculate points correctly for day 3', () => {
//     expect(calculateDailyPoints(3)).toBe('5'); // 2 + 0.6 * 3 = 5
//   });
//
//   it('should calculate points correctly for day 4', () => {
//     expect(calculateDailyPoints(4)).toBe('8'); // 3 + 0.6 * 5 = 8
//   });
//
//   it('should calculate points correctly for large days with formatting', () => {
//     expect(calculateDailyPoints(50)).toBe('264K');
//   });
//
//   it('should throw an error for invalid days', () => {
//     expect(() => calculateDailyPoints(0)).toThrow('Day must be greater than 0.');
//   });
// });

// describe('getCurrentDayOfSeason', () => {
//   it('should return the correct day of the season for a spring date', () => {
//     const date = new Date('2024-03-15');
//     expect(getCurrentDayOfSeason(date)).toBe(15);
//   });
//
//   it('should return the correct day of the season for a summer date', () => {
//     const date = new Date('2024-06-10');
//     expect(getCurrentDayOfSeason(date)).toBe(10);
//   });
//
//   it('should return the correct day of the season for an autumn date', () => {
//     const date = new Date('2024-09-20');
//     expect(getCurrentDayOfSeason(date)).toBe(20);
//   });
//
//   it('should return the correct day of the season for a winter date', () => {
//     const date = new Date('2024-12-25');
//     expect(getCurrentDayOfSeason(date)).toBe(25);
//   });
// });

const CardBalance = () => {
  const { limit, balance } = cardBalance;

  return (
    <div className={classNames.wrapper}>
      <section className={classNames.balance}>
        <h5 className={classNames.balanceSubheader}>Card Balance</h5>
        <h4 className={classNames.balanceHeader}>{formatUSD(balance)}</h4>
        <p className={classNames.text}>
          {formatUSD(limit + balance)} Available
        </p>
      </section>
      <div className={classNames.points}>
        <h5>Daily Points</h5>
        <p className={classNames.text}>
          {calculatePoints(getCurrentDayOfSeason())}
        </p>
      </div>
      <div className={classNames.paymentDue}>
        <div>
          <h4>No payment due</h4>
          <p className={classNames.text}>You've paid your September balance.</p>
        </div>
        <div className={classNames.paymentDueCheckIcon}>
          <FontAwesomeIcon icon={faCheck} size='2xl' />
        </div>
      </div>
    </div>
  );
};

export { CardBalance };
