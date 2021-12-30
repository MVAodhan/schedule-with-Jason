import Link from 'next/link';

import { Box, ListItem, UnorderedList, Button } from '@chakra-ui/react';

import { sessionAtom } from '../atoms';
import { useAtom } from 'jotai';

import { useRouter } from 'next/router';

import { useSupabase } from '../hooks/useSupabase.js';

const Nav = ({ hProp }) => {
  const [session, setSession] = useAtom(sessionAtom);

  const supabase = useSupabase();
  const router = useRouter();

  const handleLogin = async () => {
    if (!session) {
      router.push('/log-in');

      return;
    }

    let { error } = await supabase.auth.signOut();

    if (!error) {
      router.reload();
    }
  };
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
        <Box w="50%" h="100%" d="flex" justifyContent="flex-start" pl="50px">
          <Button onClick={handleLogin} color="black">
            {!session ? 'Log in' : 'Log out'}
          </Button>
        </Box>
        <Box w="50%" d="flex" justifyContent="flex-end">
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
            {session && (
              <ListItem>
                <Link href="/add-episode">
                  <a>Add Episode</a>
                </Link>
              </ListItem>
            )}
          </UnorderedList>
        </Box>
      </Box>
    </>
  );
};

export default Nav;
