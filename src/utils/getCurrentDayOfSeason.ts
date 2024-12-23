const getCurrentDayOfSeason = () => {
  const date = new Date();
  const seasonStartDates: { [key: string]: Date } = {
    spring: new Date(date.getFullYear(), 2, 1), // March 1
    summer: new Date(date.getFullYear(), 5, 1), // June 1
    autumn: new Date(date.getFullYear(), 8, 1), // September 1
    winter: new Date(date.getFullYear(), 11, 1), // December 1
  };

  let currentSeasonStart = seasonStartDates.spring;

  if (date >= seasonStartDates.winter || date < seasonStartDates.spring) {
    currentSeasonStart = seasonStartDates.winter;
  } else if (date >= seasonStartDates.autumn) {
    currentSeasonStart = seasonStartDates.autumn;
  } else if (date >= seasonStartDates.summer) {
    currentSeasonStart = seasonStartDates.summer;
  }

  const diffInMs = date.getTime() - currentSeasonStart.getTime();
  return Math.floor(diffInMs / (1000 * 60 * 60 * 24)) + 1;
};

export { getCurrentDayOfSeason };
