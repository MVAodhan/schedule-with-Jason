import { DateTime } from 'luxon';

export const getDate = (ep) => {
  let dt = DateTime.fromISO(`${ep.default_date}T${ep.default_time}`);

  let zone = ep.is_pt ? 'America/Los_Angeles' : 'Pacific/Auckland';
  let usDate;

  let zonedDt = DateTime.fromObject(
    {
      day: dt.c.day,
      hour: dt.c.hour,
      minute: dt.c.minute,
      month: dt.c.month,
      year: dt.c.year,
    },
    { zone }
  );

  if (zonedDt.zone.zoneName !== 'America/Los_Angeles') {
    usDate = zonedDt.setZone('America/Los_Angeles').toLocaleString({
      day: 'numeric',
      month: 'short',
    });
  } else {
    usDate = zonedDt.toLocaleString({
      day: 'numeric',
      month: 'short',
    });
  }

  return usDate;
};
