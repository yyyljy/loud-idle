import GoogleAuthForm from "./GoogleAuth";
import MetamaskAuth from "./MetamaskAuth";
// import NaverAuth from "./NaverAuth";
import NextUITest from "./NextUI";
import { Text, Box, Container } from "@chakra-ui/react";
import KakaoAuth from "./KakaoAuth";

function Main() {
  return (
    <>
      <Box bg="tomato" w="100%" p={4} color="white">
        This is the Box
      </Box>
      <GoogleAuthForm />
      <MetamaskAuth />
      <KakaoAuth />
      {/* <NaverAuth /> */}
      {/* <NextUITest /> */}
      <Container maxW="2xl" bg="blue.500" centerContent>
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="6xl"
          fontWeight="extrabold"
        >
          There are many
        </Text>
      </Container>
    </>
  );
}

export default Main;
