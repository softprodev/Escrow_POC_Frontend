import { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";


import styled from "@emotion/styled";


type Props = {
  children?: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <section>
    <Flex
      // flexDirection="column"
      // alignItems="center"
      // justifyContent="center"
      // h="100vh"
      width="80%"
      margin="auto"
      bg="white.800"
      display="block"
    >
      {children}
    </Flex>
    </section>
    
  );
}

