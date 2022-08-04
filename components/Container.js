import { Box, Grid } from '@chakra-ui/react';

import Episode from './Episode';
import { DateTime } from 'luxon';

const Container = ({ data }) => {
  const templateRowsBreakpoints = {
    base: '1fr',
    lg: '1fr 1fr',
  };
  return (
    <Box h="100%" w="80vw">
      <Grid
        templateColumns={templateRowsBreakpoints}
        gap={8}
        w="100%"
        mt="40px"
      >
        {data.map((data) => {
          // Making a base object date and time from Supabase Date data

          let usDate;
          let nzDate;

          let slug;
          let twoWeekTweet;
          let bufferTwoWeeks;
          let ninetyMinTweet;
          let bufferNinetyMinutes;
          let liveTweet;
          let altText;

          if (data.default_date && data.default_time) {
            let zone = data.is_pt ? 'America/Los_Angeles' : 'Pacific/Auckland';

            const convertToSlug = (text) => {
              return text
                .toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, '');
            };

            if (data.title && data.guest) {
              altText = `${data.title} with ${data.guest}`;
            }

            if (data.title) {
              slug = convertToSlug(data.title);
            }

            if (data.description) {
              twoWeekTweet = `📣 Just Scheduled! 📣
          
          ${data.description}
          
          ⬇️ Details Here ⬇️
          https://www.learnwithjason.dev/${slug}
          `;
            }

            if (data.description) {
              ninetyMinTweet = `⚠️ Starting in 90 Minutes! ⚠️
          
          ${data.description}
          
          ⬇️ Details Here ⬇️
          https://www.learnwithjason.dev/${slug}
          `;
            }

            if (data.description) {
              liveTweet = `🔴 We're Live! 🔴  
            ${data.description} 
            
            
            ⬇️  Watch Live Here  👀 
             https://twitch.tv/jlengstorf
          `;
            }

            let objFromData = DateTime.fromISO(
              `${data.default_date}T${data.default_time}`
            );

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

            if (zoneISO.zone.zoneName === 'America/Los_Angeles') {
              usDate = zoneISO.toFormat('ff');
            } else {
              usDate = zoneISO.setZone('America/Los_Angeles').toFormat('ff');
            }

            if (zoneISO.zone.zoneName === 'Pacific/Auckland') {
              nzDate = zoneISO.toFormat('ff');
            } else {
              nzDate = zoneISO.setZone('Pacific/Auckland').toFormat('ff');
            }

            let bufferTwoWeeks = zoneISO
              .setZone('America/Los_Angeles')
              .minus({ weeks: 2 })
              .toFormat('ff');

            let bufferNinetyMinutes = zoneISO
              .setZone('America/Los_Angeles')
              .minus({ minutes: 90 })
              .toFormat('ff');
          }

          if (data.title) {
            return (
              <Box w="100%" key={data.id}>
                <Episode
                  key={data.id}
                  title={data.title}
                  data={data}
                  usDate={usDate ? usDate : 'no date'}
                  nzDate={nzDate ? nzDate : 'no date'}
                  bufferTwoWeeks={bufferTwoWeeks ? bufferTwoWeeks : 'no data'}
                  bufferNinetyMinutes={
                    bufferNinetyMinutes ? bufferNinetyMinutes : 'no data'
                  }
                  altText={altText ? altText : 'no alt text'}
                  twoWeekTweet={
                    twoWeekTweet
                      ? twoWeekTweet
                      : 'No data from supabase to copy'
                  }
                  ninetyMinTweet={
                    ninetyMinTweet
                      ? ninetyMinTweet
                      : 'No data from supabase to copy'
                  }
                  liveTweet={
                    liveTweet ? liveTweet : 'No data from supabase to copy'
                  }
                />
              </Box>
            );
          }
        })}

        <Box w="100%" h="10"></Box>
      </Grid>
    </Box>
  );
};

export default Container;
