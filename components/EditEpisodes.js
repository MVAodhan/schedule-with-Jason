import { useRef, useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Checkbox,
  Textarea,
  useToast,
  IconButton,
} from '@chakra-ui/react';
import { BiCopyAlt } from 'react-icons/bi';

import { DateTime } from 'luxon';

import copy from 'copy-to-clipboard';
import { sessionAtom } from '../atoms';
import { useAtom } from 'jotai';

import { useSupabase } from '../hooks/useSupabase.js';

import { useRouter } from 'next/router';

const AddEpisode = ({ pid }) => {
  const router = useRouter();
  const [session, setSession] = useAtom(sessionAtom);
  const [episode, setEpisode] = useState('');
  const [isPt, setIsPt] = useState('');

  const toast = useToast();

  const guestRef = useRef('');
  const dateRef = useRef('');
  const timeRef = useRef('');
  const checkboxRef = useRef('');
  const titleRef = useRef('');
  const descriptionRef = useRef('');
  const twitterRef = useRef('');

  const supabase = useSupabase();

  const handleCopy = (textToCopy) => {
    let stringToCopy = textToCopy.toString();
    copy(stringToCopy);
  };

  const handleCopyText = (ref) => {
    handleCopy(ref.current.value);
    toast({
      title: 'Text copied.',
      description: 'The text has been copied to your clipboard.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  useEffect(async () => {
    let { data, error } = await supabase
      .from('episodes')
      .select('*')
      .eq('id', pid);

    if (error) {
      console.log(error);
    }
    if (data) {
      setIsPt(data[0].is_pt);
      console.log(data[0]);
    }

    setEpisode(data);
  }, []);

  // if (episode && episode[0].is_pt) {
  //   setIsPt(episode[0].is_pt);
  // }

  console.log('is pt', episode && episode[0].is_pt);
  console.log('is pt state', isPt);

  const handleEdit = async () => {
    const { data, error } = await supabase.from('episodes').insert([
      {
        guest: guestRef.current.value,
        default_date: dateRef.current.value,
        default_time: timeRef.current.value,
        is_pt: checkboxRef.current.checked,
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        twitter: twitterRef.current.value,
      },
    ]);

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }

    guestRef.current.value = '';
    dateRef.current.value = '';
    timeRef.current.value = '';
    checkboxRef.current.checked = '';
    titleRef.current.value = '';
    descriptionRef.current.value = '';
    twitterRef.current.value = '';

    toast({
      title: 'Episode updated',
      description: 'This episode has been edited in the database.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <FormControl
      w="40%"
      d="flex"
      flexDir="column"
      mt="50px"
      bgColor="#ededed"
      borderRadius="10px"
    >
      <FormLabel id="guest" htmlFor="guest" d="flex" justifyContent="center">
        Guest Name
      </FormLabel>
      <Box w="100%" d="flex" justifyContent="space-around">
        <Input
          id="guest"
          type="text"
          ref={guestRef}
          defaultValue={episode ? episode[0].guest : null}
          width="80%"
        />
        <IconButton
          aria-label="Copy guest"
          icon={<BiCopyAlt />}
          onClick={() => handleCopyText(guestRef)}
        />
      </Box>

      <Box
        width="100%"
        d="flex"
        flexDirection="row"
        mt="20px"
        alignItems="center"
      >
        <Box w="35%">
          <FormLabel
            id="date"
            htmlFor="date"
            d="flex"
            justifyContent="center"
            w="40%"
          >
            Date
          </FormLabel>
          <Input
            id="date"
            type="date"
            ref={dateRef}
            defaultValue={episode ? episode[0].default_date : null}
          />
        </Box>

        <Box w="35%">
          <FormLabel id="time" htmlFor="time" d="flex" justifyContent="center">
            Time
          </FormLabel>
          <Input
            id="time"
            type="time"
            ref={timeRef}
            defaultValue={episode ? episode[0].default_time : null}
          />
        </Box>

        <Box w="30%" h="100%">
          <FormLabel
            id="is-pt"
            htmlFor="is-pt"
            d="flex"
            justifyContent="center"
          >
            Is PT?
          </FormLabel>
          <Checkbox
            id="is-pt"
            name="checkbox"
            type="checkbox"
            ref={checkboxRef}
            w="100%"
            d="flex"
            justifyContent="center"
            isChecked={isPt}
            onChange={() => {
              setIsPt(!isPt);
            }}
          />
        </Box>
      </Box>
      <FormLabel
        id="title"
        htmlFor="title"
        d="flex"
        justifyContent="center"
        mt="10px"
        cursor="pointer"
        onClick={() => handleCopyText(titleRef)}
      >
        Episode title
      </FormLabel>
      <Input
        id="title"
        type="text"
        ref={titleRef}
        defaultValue={episode ? episode[0].title : null}
      />
      <FormLabel
        id="description"
        htmlFor="description"
        d="flex"
        justifyContent="center"
        mt="10px"
        cursor="pointer"
      >
        Episode Description
      </FormLabel>
      <Box
        display="flex"
        width="100%"
        justifyContent="space-around"
        alignItems="center"
      >
        <Textarea
          id="description"
          type="text"
          ref={descriptionRef}
          defaultValue={episode ? episode[0].description : null}
          width="80%"
        />
        <IconButton
          aria-label="Copy decription"
          icon={<BiCopyAlt />}
          onClick={() => handleCopyText(descriptionRef)}
        />
      </Box>

      <FormLabel
        id="twitter"
        htmlFor="twitter"
        d="flex"
        justifyContent="center"
        mt="10px"
        cursor="pointer"
        onClick={() => handleCopyText(twitterRef)}
      >
        Guest Twitter
      </FormLabel>
      <Input
        id="twitter"
        type="text"
        ref={twitterRef}
        defaultValue={episode ? episode[0].twitter : null}
      />
      <Button>Save</Button>
    </FormControl>
  );
};

export default AddEpisode;

/** 
 *  let zone = data.is_pt ? 'America/Los_Angeles' : 'Pacific/Auckland';

          let usDate;
          let nzDate;

          let slug;
          let twoWeekTweet;
          let ninetyMinTweet;
          let liveTweet;
          let altText;

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
 */

/** 
 *           
                  onClick={() => {
                    handleCopy(twoWeekTweet);
                    toast({
                      title: 'Text copied.',
                      description: 'Copied two week tweet to your clipboard.',
                      status: 'success',
                      duration: 3000,
                      isClosable: true,
                    });
                    handleCopy(ninetyMinTweet);
                    toast({
                      title: 'Text copied.',
                      description:
                        'Copied ninety minute tweet to your clipboard.',
                      status: 'success',
                      duration: 3000,
                      isClosable: true,
                    });
                  }}
                  onClick={() => {
                    handleCopy(liveTweet);
                    toast({
                      title: 'Text copied.',
                      description: 'Copied live tweet to your clipboard.',
                      status: 'success',
                      duration: 3000,
                      isClosable: true,
                    });
              <Text>{bufferTwoWeeks}</Text>
              <Text>{bufferNinetyMinutes}</Text>
              <Text>{usDate}</Text>
                onClick={() => {
                  handleCopy(altText);
                  toast({
                    title: 'Text copied.',
                    description: 'Copied text to your clipboard.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  });
                }}     
 */
