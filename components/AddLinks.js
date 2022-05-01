import React, { useState, useEffect } from 'react';
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
const AddLinks = ({ pid }) => {
  const supabase = useSupabase();

  const [links, setLinks] = useState([]);

  useEffect(async () => {
    let { data, error } = await supabase
      .from('episodes')
      .select('*')
      .eq('id', pid)
      .single();

    if (error) {
      console.log(error);
    }

    setLinks(data.links);
  }, []);

  const addLink = (links) => {
    const id = uuidv4();

    let link = { id, value: '' };

    if (links !== null) {
      setLinks([...links, link]);
    } else {
      setLinks([link]);
    }
  };
  // console.log('links', links);

  const handleLinksEdit = async (links) => {
    const { data, error } = await supabase
      .from('episodes')
      .update({ links })
      .eq('id', pid);

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }
  };

  return (
    <Box w="80%" d="flex" flexDir="column" alignItems="center">
      <Box w="100%" d="flex" justifyContent="space-around">
        <Heading as="h2">Twitch Links</Heading>
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
        {links
          ? links.map((link) => (
              <Link
                key={link.id}
                id={link.id}
                defaultValue={link.value}
                links={links}
              />
            ))
          : null}
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
        <Button
          color="white"
          w="fit-content"
          bgColor="limegreen"
          onClick={() => handleLinksEdit(links)}
        >
          Edit Links
        </Button>
      </Box>
    </Box>
  );
};

export default AddLinks;
