import { useRef } from 'react';
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

import { sessionAtom } from '../atoms';
import { useAtom } from 'jotai';

import { useSupabase } from '../hooks/useSupabase.js';

import { useRouter } from 'next/router';

const Auth = () => {
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const [session, setSession] = useAtom(sessionAtom);
  const router = useRouter();

  const supabase = useSupabase();

  const handleSubmit = async () => {
    if (router.pathname == '/log-in') {
      console.log(emailRef.current.value);
      console.log(passwordRef.current.value);
      const { user, session, error } = await supabase.auth.signIn({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      if (error) {
        console.log(error);
      }

      router.push('/');

      emailRef.current.value = '';
      passwordRef.current.value = '';

      return;
    }
    if (router.pathname == '/set-password') {
      const { user, error } = await supabase.auth.update({
        password: passwordRef.current.value,
      });
      if (error) {
        console.log(error);
      }
      passwordRef.current.value = '';

      return;
    }
  };
  return (
    <FormControl
      h="40%"
      w="40%"
      d="flex"
      justifyContent="center"
      flexDir="column"
    >
      {router.pathname == '/log-in' && (
        <>
          <FormLabel
            id="email"
            htmlFor="email"
            d="flex"
            justifyContent="center"
          >
            Email address
          </FormLabel>
          <Input ref={emailRef} id="email" type="email" />
        </>
      )}

      <FormLabel
        id="password"
        htmlFor="password"
        d="flex"
        justifyContent="center"
      >
        Password
      </FormLabel>
      <Input ref={passwordRef} id="password" type="password" />
      <Button onClick={handleSubmit}>Submit</Button>
    </FormControl>
  );
};

export default Auth;
