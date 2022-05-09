import { Box, Input, Text } from '@chakra-ui/react';
import React, { forwardRef } from 'react';

const DemoLink = forwardRef(({ defaultValue }, ref) => (
  <Box w="80%" d="flex" flexDir="column" alignItems="flex-start">
    <Text>Demo</Text>
    <Input id={'demo'} defaultValue={defaultValue} ref={ref}></Input>
  </Box>
));

export default DemoLink;
