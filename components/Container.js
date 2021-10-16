import { Box, Grid } from "@chakra-ui/react";

import Episode from "./Episode";

const Container = ({ usDate, nzDate, name, description, data }) => {
  return (
    <Box as="main" h="100%" w="80vw" d="flex" justifyContent="center">
      <Grid templateColumns="repeat(2, 1fr)" gap={8} w="100%" mt="40px">
        <Box w="100%">
          <Episode data={data} usDate={usDate} nzDate={nzDate} />
        </Box>
        <Box w="100%" h="10"></Box>
      </Grid>
    </Box>
  );
};

export default Container;
