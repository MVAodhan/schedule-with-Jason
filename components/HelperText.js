import { Box, IconButton, Text, useToast } from '@chakra-ui/react';

import { BiCopyAlt } from 'react-icons/bi';

import copy from 'copy-to-clipboard';

const HelperText = () => {
  const toast = useToast();
  const handleCopy = (textToCopy) => {
    let stringToCopy = textToCopy.toString();
    copy(stringToCopy);
    toast({
      title: 'Text copied.',
      description: 'The text has been copied to your clipboard.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };
  return (
    <Box w="100%" display="flex" justifyContent="center" flexDir="column">
      <Box display="flex" justifyContent="center">
        <Text>Text Helpers</Text>
      </Box>
      <Box display="flex" justifyContent="space-around">
        <Box display="flex" justifyContent="center" flexDir="column">
          <Text display="flex" alignItems="center">
            Twitch Link
          </Text>
          <IconButton
            aria-label="Copy decription"
            icon={<BiCopyAlt />}
            onClick={() => handleCopy('https://twitch.tv/jlengstorf')}
          />
        </Box>
        <Box display="flex" justifyContent="center" flexDir="column">
          <Text display="flex" alignItems="center">
            Calendar Link
          </Text>
          <IconButton
            aria-label="Copy decription"
            icon={<BiCopyAlt />}
            onClick={() => handleCopy('https://twitch.tv/jlengstorf')}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default HelperText;
