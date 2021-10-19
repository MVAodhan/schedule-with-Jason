import { Box, Grid } from "@chakra-ui/react";

import Episode from "./Episode";
import { DateTime } from "luxon";

const Container = ({ data }) => {
  return (
    <Box as="main" h="100%" w="80vw" d="flex" justifyContent="center">
      <Grid templateColumns="repeat(2, 1fr)" gap={8} w="100%" mt="40px">
        {data.map((data) => {
          // Making an object date and timefrom Supabase Date data
          let objFromData = DateTime.fromISO(`${data.us_date}T${data.us_time}`);

          //Creating the base date object in PT, so the initial date can be entered into the db as PT
          let ptObj = DateTime.fromObject(
            {
              day: objFromData.c.day,
              hour: objFromData.c.hour,
              minute: objFromData.c.minute,
              month: objFromData.c.month,
              year: objFromData.c.year,
            },
            { zone: "America/Los_Angeles" }
          );

          //Formatting the Pt object to a friendly user format
          let usDate = ptObj.toFormat("ff");

          // Converting the PT object to a a NZ object
          let nzObj = ptObj.setZone("Pacific/Auckland");

          // Formatting the NZ object to a friendly user format
          let nzDate = nzObj.toFormat("ff");
          return (
            <Box w="100%" key={data.id}>
              <Episode
                key={data.id}
                data={data}
                usDate={usDate}
                nzDate={nzDate}
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
