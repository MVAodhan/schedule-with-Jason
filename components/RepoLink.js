import { Box, Input, Text } from '@chakra-ui/react';
import React, { forwardRef } from 'react';

const RepoLink = forwardRef(({ defaultValue }, ref) => (
  <Box w="80%" d="flex" flexDir="column" alignItems="flex-start">
    <Text>Repo</Text>
    <Input id={'repo'} defaultValue={defaultValue} ref={ref}></Input>
  </Box>
));

export default RepoLink;
