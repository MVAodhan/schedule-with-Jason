import { useRef, useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Textarea,
  Text,
  useToast,
  IconButton,
  Heading,
} from '@chakra-ui/react';
import { BiCopyAlt } from 'react-icons/bi';

import HelperText from './HelperText';

import { DateTime } from 'luxon';

import copy from 'copy-to-clipboard';

import { useSupabase } from '../hooks/useSupabase.js';

import { useRouter } from 'next/router';
import AddLinks from './AddLinks';

const Published = ({ pid, marginLeft }) => {
  const router = useRouter();

  const [episode, setEpisode] = useState('');
  const [isPt, setIsPt] = useState('');

  const toast = useToast();

  const titleRef = useRef('');

  const chaptersRef = useRef('');
  const twitchRef = useRef('');

  const supabase = useSupabase();

  let slug;

  let altText;

  let hightlightsTweet;
  let chapters;
  let ytDescription;

  const handleCopy = (textToCopy) => {
    let stringToCopy = textToCopy.toString();
    copy(stringToCopy);
  };

  const captionsBlurb = `*Captions provided by White Coat Captioning (https://whitecoatcaptioning.com/). 
Communication Access Realtime Translation (CART) is provided in order to facilitate
communication accessibility and may not be a totally verbatim record of the proceedings.*`;

  const credits = `Watch future episodes live at https://twitch.tv/jlengstorf

This episode was sponsored by:
- Netlify (https://lwj.dev/netlify)
- Nx (https://lwj.dev/nx)
- Backlight (https://lwj.dev/backlight)

Live transcription by White Coat Captioning (https://whitecoatcaptioning.com/)

Credits:

Local Elevator by Kevin MacLeod is licensed under a Creative Commons Attribution license (https://creativecommons.org/licenses/by/4.0/)
Source: http://incompetech.com/music/royalty-free/index.html?isrc=USUAN1300012
Artist: http://incompetech.com/

Busybody by Audionautix is licensed under a Creative Commons Attribution license (https://creativecommons.org/licenses/by/4.0/)
Artist: http://audionautix.com/

Additional sound effects obtained from https://www.zapsplat.com
`;

  const handleTwitchLinks = (text) => {
    return text.replace(/ *\([^)]*\) */g, '').replace(/([[\]])/g, '');
  };

  const convertToSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^\w!-]+/g, '-')
      .replace(/[!]/g, '');
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
    }

    setEpisode(data);
  }, []);

  if (episode && episode[0]) {
    if (episode[0].title && episode[0].guest) {
      slug = convertToSlug(episode[0].title);
      console.log('title: ' + episode[0].title);
      console.log(slug);
      altText = `${episode[0].title} with ${episode[0].guest}`;
    }

    chapters = episode && episode[0].extracted_chapters;

    hightlightsTweet = `Did you miss @${episode[0].twitter} teaching us about ${
      episode[0].technology !== null ? episode[0].technology : ''
    } live on LWJ?
No worries! Watch highlights from the episode here, then check out the full episode replay https://www.learnwithjason.dev/${slug}`;
  }

  if (
    episode &&
    episode[0] &&
    episode[0].description &&
    episode[0].extracted_chapters
  ) {
    ytDescription = `${episode[0].description}

${episode[0].extracted_chapters}


${handleTwitchLinks(episode[0].twitch_links)}

${credits}`;
  }

  const handleEdit = async () => {
    const { data, error } = await supabase
      .from('episodes')
      .update({
        extracted_chapters: chaptersRef.current.value,
        twitch_links: twitchRef.current.value,
      })
      .eq('guest', episode?.[0].guest);

    if (error) {
      console.log(error);
    }

    toast({
      title: 'Episode updated.',
      description: 'Edit successful.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    router.push('/');
  };

  return (
    <Box w="80%">
      <FormControl
        w="100%"
        h="fit-content"
        d="flex"
        flexDir="column"
        justifyContent="space-around"
        alignItems="center"
        mt="50px"
        bgColor="#ededed"
        borderRadius="10px"
      >
        <Box w="100%" d="flex" justifyContent="center">
          <Heading as="h2">Publishing Details</Heading>
        </Box>
        <FormLabel id="title" htmlFor="title" d="flex" justifyContent="center">
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
            textAlign="center"
          />
          <IconButton
            aria-label="Copy title"
            icon={<BiCopyAlt />}
            onClick={() => handleCopyText(titleRef)}
          />
        </Box>
        <Box
          display="flex"
          width="100%"
          justifyContent="space-around"
          alignItems="center"
          mt="20px"
        >
          <FormLabel>Youtube Description</FormLabel>
          <IconButton
            aria-label="Copy youtube decription"
            icon={<BiCopyAlt />}
            onClick={() =>
              ytDescription
                ? handleCopy(ytDescription)
                : handleCopy('No description available.')
            }
          />
        </Box>

        <Box w="70%" d="flex" justifyContent="space-around">
          <Box d="flex" w="fit-content" alignItems="center">
            <Text>Highlights tweet</Text>
            <IconButton
              aria-label="Copy tweet"
              icon={<BiCopyAlt />}
              onClick={() => {
                handleCopy(hightlightsTweet);
                toast({
                  title: 'Text copied.',
                  description:
                    'Copied hightlights tweet tweet to your clipboard.',
                  status: 'success',
                  duration: 3000,
                  isClosable: true,
                });
              }}
            />
          </Box>
          <Box d="flex" alignItems="center">
            <Text>Captions Blurb</Text>
            <IconButton
              aria-label="Copy tweet"
              icon={<BiCopyAlt />}
              onClick={() => {
                handleCopy(captionsBlurb);
                toast({
                  title: 'Text copied.',
                  description: 'Copied captions blurb to your clipboard.',
                  status: 'success',
                  duration: 3000,
                  isClosable: true,
                });
              }}
            />
          </Box>
          <Box d="flex" alignItems="center"></Box>
        </Box>

        <Box w="100%" d="flex" justifyContent="center" mb="10px">
          <FormLabel>Extracted Chapters</FormLabel>
        </Box>
        <Box
          display="flex"
          width="100%"
          justifyContent="space-around"
          alignItems="center"
        >
          <Textarea
            id="description"
            type="text"
            ref={chaptersRef}
            defaultValue={episode ? episode[0].extracted_chapters : null}
            width="80%"
          />
          <IconButton
            aria-label="Copy decription"
            icon={<BiCopyAlt />}
            onClick={() => handleCopyText(chaptersRef)}
          />
        </Box>
        <Box w="100%" d="flex" justifyContent="center" mt="20px" mb="10px">
          <Button
            color="white"
            w="fit-content"
            bgColor="limegreen"
            onClick={handleEdit}
          >
            Edit Publishing Details
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
};

export default Published;
