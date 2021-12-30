import Link from 'next/link';

import { Box, ListItem, UnorderedList } from '@chakra-ui/react';

const Nav = ({ hProp }) => {
  return (
    <>
      <Box
        w="100vw"
        h={hProp}
        bgColor="primary"
        color="white"
        d="flex"
        justifyContent="flex-end"
        alignItems="center"
        pt="20px"
        pb="20px"
      >
        <UnorderedList
          styleType="none"
          d="flex"
          pr="50px"
          fontFamily="Alfa Slab One"
        >
          <ListItem pr="50px">
            <Link href="/">
              <a>Home</a>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/add-episode">
              <a>Add Episode</a>
            </Link>
          </ListItem>
        </UnorderedList>
      </Box>
    </>
  );
};

export default Nav;
