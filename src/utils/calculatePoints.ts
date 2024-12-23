const formatPoints = (points: number): string => {
  return points > 1000 ? `${Math.round(points / 1000)}K` : points.toString();
};

const calculatePoints = (day: number) => {
  if (day < 1) throw new Error('Day must be greater than 0.');

  if (day === 1) return formatPoints(2);
  if (day === 2) return formatPoints(3);

  let prevPrevPoints = 2;
  let prevPoints = 3;
  let currentPoints = 0;

  for (let i = 3; i <= day; i++) {
    currentPoints = Math.round(prevPrevPoints + prevPoints * 0.6);
    prevPrevPoints = prevPoints;
    prevPoints = currentPoints;
  }

  return formatPoints(currentPoints);
};

export { calculatePoints };
