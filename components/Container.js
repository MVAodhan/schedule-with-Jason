import { Box, Grid } from "@chakra-ui/react";

import Episode from "./Episode";
import { DateTime } from "luxon";

const Container = ({ data }) => {
  return (
    <Box h="100%" w="80vw">
      <Grid templateColumns="repeat(2, 1fr)" gap={8} w="100%" mt="40px">
        {data.map((data) => {
          // Making a base object date and time from Supabase Date data
          let objFromData = DateTime.fromISO(
            `${data.default_date}T${data.default_time}`
          );

          let zone = data.is_pt ? "America/Los_Angeles" : "Pacific/Auckland";
          let usDate;
          let nzDate;

          let altText = `${data.title} with ${data.guest}`;

          //Creating the base date object in PT, so the initial date can be entered into the db as PT
          let zoneISO = DateTime.fromObject(
            {
              day: objFromData.c.day,
              hour: objFromData.c.hour,
              minute: objFromData.c.minute,
              month: objFromData.c.month,
              year: objFromData.c.year,
            },
            { zone }
          );

          if (zoneISO.zone.zoneName === "America/Los_Angeles") {
            usDate = zoneISO.toFormat("ff");
          } else {
            usDate = zoneISO.setZone("America/Los_Angeles").toFormat("ff");
          }

          if (zoneISO.zone.zoneName === "Pacific/Auckland") {
            nzDate = zoneISO.toFormat("ff");
          } else {
            nzDate = zoneISO.setZone("Pacific/Auckland").toFormat("ff");
          }

          let bufferTwoWeeks = zoneISO
            .setZone("America/Los_Angeles")
            .minus({ weeks: 2 })
            .toFormat("ff");

          let bufferNinetyMinutes = zoneISO
            .setZone("America/Los_Angeles")
            .minus({ minutes: 90 })
            .toFormat("ff");

          return (
            <Box w="100%" key={data.id}>
              <Episode
                key={data.id}
                data={data}
                usDate={usDate}
                nzDate={nzDate}
                bufferTwoWeeks={bufferTwoWeeks}
                bufferNinetyMinutes={bufferNinetyMinutes}
                altText={altText}
              />
            </Box>
          );
        })}

        <Box w="100%" h="10"></Box>
      </Grid>
    </Box>
  );
};

export default Container;
