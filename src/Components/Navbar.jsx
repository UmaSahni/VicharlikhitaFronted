import React, { useContext } from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  Flex,
  HStack,
  IconButton,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import {  HamburgerIcon } from "@chakra-ui/icons";
import { Link, NavLink } from "react-router-dom";
import { Authcontext } from "../Context/AuthContext";


const NavbarSignUp = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const value = useContext(Authcontext)
  console.log(value)
 
  return (
    <Box>
      <Flex
        w="100%"
        align="center"
        justify="space-between"
        border={"1px solid #1f2a37"}
        bgColor={"#1f2a37"}
        color={"rgb(235, 235, 235)"}
      >
        <Link to={"/"}>
          <Box p={4} fontWeight="bold" fontSize="xl">
            <Text>Note Taking 📝</Text>
          </Box>
        </Link>
        <Box marginRight={"1%"}>
          <IconButton
            aria-label="Open menu"
            display={{ base: "block", md: "none" }}
            onClick={onOpen}
            icon={<HamburgerIcon margin={"auto"} />}
            ref={btnRef}
            color={"black"}
          />
        </Box>
        <HStack
          as="nav"
          spacing={8}
          display={{ base: "none", md: "flex" }}
          justifyContent="flex-end"
          paddingRight={"10"}
        >
          <Link to={"/"} >
            <Text
              _hover={{
                color: "#ff6733",
              }}
              fontSize={"1.2rem"}
              fontWeight={"semibold"}
            >
              Home
            </Text>
          </Link>

          <NavLink to={"/signup"}>
            <Text
              _hover={{
                color: "#ff6733",
              }}
              fontSize={"1.2rem"}
              fontWeight={"semibold"}
            >
              Sign Up
            </Text>
          </NavLink>

          <Link to={"/login"}>
            <Text
              _hover={{
                color: "#ff6733",
              }}
              fontSize={"1.2rem"}
              fontWeight={"semibold"}
            >
              Log In
            </Text>
          </Link>

          <Link to={"/add"} >
            <Text
              _hover={{
                color: "#ff6733",
              }}
              fontSize={"1.2rem"}
              fontWeight={"semibold"}
            >
              Add Note
            </Text>
          </Link>

          <Link>
            <Text
              _hover={{
                color: "#ff6733",
              }}
              fontSize={"1.2rem"}
              fontWeight={"semibold"}
            >
              About
            </Text>
          </Link>
          <Link to={"/login"}>
            <Button
              _hover={{
                color: "#ff6733",
              }}
              variant={"link"}
              color={"rgb(235, 235, 235)"}
            >
              <Text
                _hover={{
                  color: "#ff6733",
                }}
                fontSize={"1.2rem"}
                fontWeight={"semibold"}
              >
                {" "}
                Log In
              </Text>
            </Button>
          </Link>
        </HStack>
      </Flex>
      {isOpen && (
        <Drawer
          isOpen={isOpen}
          placement="top"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerContent>
            <DrawerCloseButton />
            <VStack m={8} align={"stretch"} spacing={10}>
              <Link>
                <Text
                  _hover={{
                    color: "#ff6733",
                  }}
                  fontSize={"1.2rem"}
                  fontWeight={"semibold"}
                >
                  Products
                </Text>
              </Link>

              <Link>
                <Text
                  _hover={{
                    color: "#ff6733",
                  }}
                  fontSize={"1.2rem"}
                  fontWeight={"semibold"}
                >
                  Support
                </Text>
              </Link>

              <Link>
                <Text
                  _hover={{
                    color: "#ff6733",
                  }}
                  fontSize={"1.2rem"}
                  fontWeight={"semibold"}
                >
                  Blog
                </Text>
              </Link>

              <Link>
                <Text
                  _hover={{
                    color: "#ff6733",
                  }}
                  fontSize={"1.2rem"}
                  fontWeight={"semibold"}
                >
                  Forums
                </Text>
              </Link>

              <Link>
                <Text
                  _hover={{
                    color: "#ff6733",
                  }}
                  fontSize={"1.2rem"}
                  fontWeight={"semibold"}
                >
                  About
                </Text>
              </Link>
              <Link to={"/login"}>
              <Button
                _hover={{
                  color: "#ff6733",
                }}
                width={"5rem"}
                bg="white"
                border={"1px solid black"}
              >
                Log In
              </Button>
              </Link>
            </VStack>
          </DrawerContent>
        </Drawer>
      )}
    </Box>
  );
};

export default NavbarSignUp;