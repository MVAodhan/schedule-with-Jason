import React, { useState, useEffect, useRef, createRef } from 'react';
import {
  Box,
  ButtonGroup,
  IconButton,
  Heading,
  Button,
  Checkbox,
} from '@chakra-ui/react';
import { useSupabase } from '../hooks/useSupabase';
import { AiFillPlusSquare } from 'react-icons/ai';

import { v4 as uuidv4 } from 'uuid';

import { useRouter } from 'next/router';

import Link from './Link';
import RepoLink from './RepoLink';
import DemoLink from './DemoLink';
const AddLinks = ({ pid }) => {
  const supabase = useSupabase();

  const [links, setLinks] = useState();
  const [demoRepo, setDemoRepo] = useState(false);
  const router = useRouter();

  const repoLinkRef = createRef();
  const demoLinkRef = createRef('');

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

  const handleUpdateLinks = (links) => {
    let repoObj;
    let demoObj;

    if (findRepo() === undefined && findDemo() === undefined) return null;
    let highlightedLinks;

    if (repoLinkRef.current.value !== '') {
      repoObj = {
        id: 'repo',
        value: repoLinkRef.current.value,
      };
    } else {
      repoObj = null;
    }
    if (demoLinkRef.current.value !== '') {
      demoObj = {
        id: 'demo',
        value: demoLinkRef.current.value,
      };
    } else {
      demoObj = null;
    }
    if (repoObj !== null && demoObj !== null) {
      highlightedLinks = [repoObj, demoObj];
    }

    if (repoObj !== null && demoObj === null) {
      highlightedLinks = [repoObj];
    }
    if (repoObj === null && demoObj !== null) {
      highlightedLinks = [demoObj];
    }
    if (repoObj === null && demoObj === null) {
      highlightedLinks = null;
    }

    return highlightedLinks;
  };

  const handleLinksEdit = async (links) => {
    let updatedLinks = handleUpdateLinks(links);
    let newLinks;
    if (updatedLinks !== null) {
      newLinks = [...updatedLinks, ...links];
    }
    if (updatedLinks === null) {
      newLinks = [...links];
    }

    const { data, error } = await supabase
      .from('episodes')
      .update({ links: newLinks })
      .eq('id', pid);
    if (error) {
      console.log(error);
    }
    router.push('/');
  };

  const toggleDemoRepo = () => {
    setDemoRepo((prev) => !prev);
  };

  const findRepo = () => {
    if (links !== undefined) {
      for (const link in links) {
        if (links[link].id === 'repo') {
          return links[link].value;
        }
      }
    }
  };

  const findDemo = () => {
    if (links !== undefined) {
      for (const link in links) {
        if (links[link].id === 'demo') {
          return links[link].value;
        }
      }
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
        <Checkbox mt="5px" onChange={toggleDemoRepo}>
          Add Repo/Demo
        </Checkbox>

        {demoRepo && (
          <>
            <RepoLink defaultValue={findRepo()} ref={repoLinkRef} />
            <DemoLink defaultValue={findDemo()} ref={demoLinkRef} />
          </>
        )}
        {links
          ? links.map((link) => {
              if (link.id === 'repo' || link.id === 'demo') {
                return;
              }
              return (
                <Link
                  key={link.id}
                  id={link.id}
                  defaultValue={link.value}
                  links={links}
                />
              );
            })
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
