import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import { Grid, GridItem } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import NavDrawerMenu from "components/NavDrawerMenu";

function App() {
  return (
    <>
      <ChakraProvider>
        <Grid
          templateAreas={`
            "header header"
            "nav main"
          `}
          gridTemplateRows={"50px 1fr"}
          gridTemplateColumns={"150px 1fr"}
          h="200px"
          // gap="1"
          color="blackAlpha.700"
          fontWeight="bold"
        >
          <GridItem pl="2" bg="orange.300" area={"header"}>
            <Header />
          </GridItem>
          <GridItem pl="2" bg="pink.300" area={"nav"}>
            <NavDrawerMenu />
          </GridItem>
          <GridItem pl="2" bg="green.300" area={"main"}>
            <Main />
          </GridItem>
          {/* <GridItem pl="2" bg="blue.300" area={"footer"}>
            <Footer />
          </GridItem> */}
        </Grid>
      </ChakraProvider>
    </>
  );
}

export default App;
