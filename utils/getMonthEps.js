import { DateTime } from 'luxon';
export const getMonthsEps = (eps, columnName) => {
  let lowercaseColumnName = columnName.toLowerCase();
  let columnEps = new Set();

  let zone = 'America/Los_Angeles';
  eps.forEach((ep) => {
    let upcomingObjData = DateTime.fromISO(ep.default_date);
    let monthDate = DateTime.fromObject(
      {
        day: upcomingObjData.c.day,
        month: upcomingObjData.c.month,
      },
      { zone }
    ).toLocaleString({ month: 'long', day: '2-digit' });

    let month = monthDate.split(' ');
    month = month[0].toLowerCase();

    if (month === lowercaseColumnName) {
      columnEps.add(ep);
    }
  });
  let epsArray = [...columnEps];
  return epsArray;
};

export const getColumns = (eps) => {
  let columns = 'columns';
  return columns;
};
