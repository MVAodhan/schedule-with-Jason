import Head from 'next/head';

import { Box } from '@chakra-ui/react';

import { useEffect, useState } from 'react';

import { useSupabase } from '../hooks/useSupabase.js';

import Header from '../components/Header';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Container from '../components/Container';

import { sessionAtom } from '../atoms';
import { useAtom } from 'jotai';

export default function Home() {
  const [eps, setEps] = useState([]);

  const [session, setSession] = useAtom(sessionAtom);

  const supabase = useSupabase();

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(supabase.auth.session());
    });
  }, []);

  async function signOut() {
    const { error } = await supabase.auth.signOut();
  }

  useEffect(async () => {
    const { data, error } = await supabase
      .from('episodes')
      .select()
      .order('default_date', { ascending: true });

    setEps(data);
  }, []);
  return (
    <Box h="100vh" w="100vw">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav hProp="auto" />
      <Box
        w="100%"
        h="1vh"
        bgGradient="linear(to-r, #ff96bc,
      #ffc477 ,
      #fbe84a ,
      #c1f3a1 ,
      #96fce4 )"
      />
      <Header text="Scheduled with Jason" hProp="10vh" />
      <Hero hProp="auto" />
      <Box
        as="main"
        h="auto"
        w="100vw"
        d="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Container data={eps ? eps : []} />
      </Box>
    </Box>
  );
}
