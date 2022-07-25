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

const getMonth = (ep) => {
  let zone = 'America/Los_Angeles';
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
  return month;
};

export const getColumns = (eps) => {
  let columnNamesSet = new Set();
  for (let ep in eps) {
    let zone = 'America/Los_Angeles';
    let upcomingObjData = DateTime.fromISO(eps[ep].default_date);
    let monthDate = DateTime.fromObject(
      {
        day: upcomingObjData.c.day,
        month: upcomingObjData.c.month,
      },
      { zone }
    ).toLocaleString({ month: 'long', day: '2-digit' });

    let month = monthDate.split(' ');
    month = month[0].toLowerCase();
    columnNamesSet.add(month);
  }
  let columnNamesArray = [...columnNamesSet];

  let columnsObjMap = new Map();

  for (let column of columnNamesArray) {
    columnsObjMap.set(column, []);
  }

  for (let ep in eps) {
    let month = getMonth(eps[ep]);

    let hasMonth = columnsObjMap.has(month);

    if (hasMonth) {
      const recievedArray = columnsObjMap.get(month);
      recievedArray.push(eps[ep]);
    }
  }

  return columnsObjMap;
};
