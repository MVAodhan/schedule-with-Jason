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

  let zone;
  let objFromData;
  let usDate;
  let nzDate;
  let slug;
  let twoWeekTweet;
  let ninetyMinTweet;
  let liveTweet;
  let altText;
  let zoneISO;
  let bufferTwoWeeks;
  let bufferNinetyMinutes;

  const handleCopy = (textToCopy) => {
    let stringToCopy = textToCopy.toString();
    copy(stringToCopy);
  };

  const convertToSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
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

  if (episode && episode[0]) {
    zone = episode[0].is_pt ? 'America/Los_Angeles' : 'Pacific/Auckland';

    if (episode[0].title && episode[0].guest) {
      altText = `${episode[0].title} with ${episode[0].guest}`;
    }

    if (episode[0].title) {
      slug = convertToSlug(episode[0].title);
    }

    if (episode[0].description) {
      twoWeekTweet = `📣 Just Scheduled! 📣
          
          ${episode[0].description}
          
          ⬇️ Details Here ⬇️
          https://www.learnwithjason.dev/${slug}
          `;

      ninetyMinTweet = `⚠️ Starting in 90 Minutes! ⚠️
          
          ${episode[0].description}
          
          ⬇️ Details Here ⬇️
          https://www.learnwithjason.dev/${slug}
          `;

      liveTweet = `🔴 We're Live! 🔴  
            ${episode[0].description} 
            
            
            ⬇️  Watch Live Here  👀 
             https://twitch.tv/jlengstorf
          `;

      objFromData = DateTime.fromISO(
        `${episode[0].default_date}T${episode[0].default_time}`
      );

      zoneISO = DateTime.fromObject(
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

      bufferTwoWeeks = zoneISO
        .setZone('America/Los_Angeles')
        .minus({ weeks: 2 })
        .toFormat('ff');

      bufferNinetyMinutes = zoneISO
        .setZone('America/Los_Angeles')
        .minus({ minutes: 90 })
        .toFormat('ff');
    }
  }

  // Needs updating...
  const handleEdit = async () => {
    const { data, error } = await supabase.from('episodes').upload([
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
      >
        Episode title
      </FormLabel>
      <Box
        display="flex"
        width="100%"
        justifyContent="space-around"
        alignItems="center"
      >
        <Input
          id="title"
          type="text"
          ref={titleRef}
          defaultValue={episode ? episode[0].title : null}
          w="80%"
        />
        <IconButton
          aria-label="Copy title"
          icon={<BiCopyAlt />}
          onClick={() => handleCopyText(titleRef)}
        />
      </Box>
      <FormLabel
        id="description"
        htmlFor="description"
        d="flex"
        justifyContent="center"
        mt="10px"
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
      >
        Guest Twitter
      </FormLabel>
      <Box w="100%" display="flex" justifyContent="space-around" mb="10px">
        <Input
          id="twitter"
          type="text"
          ref={twitterRef}
          defaultValue={episode ? episode[0].twitter : null}
          w="80%"
        />
        <IconButton
          aria-label="Copy decription"
          icon={<BiCopyAlt />}
          onClick={() => handleCopyText(twitterRef)}
        />
      </Box>
      <Box w="100%" d="flex" justifyContent="center">
        <Button w="30%">Save</Button>
      </Box>
    </FormControl>
  );
};

export default AddEpisode;

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
