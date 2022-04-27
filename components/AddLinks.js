import React, { useState } from 'react';
import {
  Box,
  ButtonGroup,
  IconButton,
  Heading,
  Button,
} from '@chakra-ui/react';
import { useSupabase } from '../hooks/useSupabase';
import { BiCopyAlt } from 'react-icons/bi';
import { AiFillPlusSquare } from 'react-icons/ai';

import { v4 as uuidv4 } from 'uuid';

import Link from './Link';
const AddLinks = () => {
  const supabase = useSupabase();

  const [links, setLinks] = useState([]);

  const addLink = (links) => {
    const id = uuidv4();

    let link = { id, link: '' };
    setLinks([...links, link]);
  };
  console.log(links);

  return (
    <Box w="80%" d="flex" flexDir="column" alignItems="center">
      <Box w="100%" d="flex" justifyContent="space-around">
        <Heading as="h2">Twitch Links</Heading>
        <IconButton
          aria-label="Copy twitch links"
          size="lg"
          icon={<BiCopyAlt />}
        />
      </Box>
      <Box
        h="300px"
        bgColor="#ededed"
        overflow="scroll"
        w="100%"
        d="flex"
        flexDir="column"
        alignItems="center"
      >
        {links.length > 0 && links.map((link) => <Link key={link.id} />)}
      </Box>
      <ButtonGroup isAttached>
        <Button onClick={() => addLink(links)}> Add Link</Button>
        <IconButton icon={<AiFillPlusSquare />}></IconButton>
      </ButtonGroup>

      <Box
        display="flex"
        width="100%"
        justifyContent="space-around"
        alignItems="center"
      ></Box>
      <Box w="100%" d="flex" justifyContent="center" mt="20px" mb="10px">
        <Button color="white" w="fit-content" bgColor="limegreen">
          Edit Links
        </Button>
      </Box>
    </Box>
  );
};

export default AddLinks;
