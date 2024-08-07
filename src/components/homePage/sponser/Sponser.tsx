import React from "react";
import logo1 from "../../../assets/sponser/logo1.png";
import logo2 from "../../../assets/sponser/logo2.png";
import logo3 from "../../../assets/sponser/logo3.png";
import logo4 from "../../../assets/sponser/logo4.png";
import logo5 from "../../../assets/sponser/logo5.png";
import { Box, Container, Stack } from "@mui/material";
import Image from "next/image";
import Marquee from "react-fast-marquee";
const logos = [logo1, logo2, logo3, logo4, logo5];
const Sponser = () => {
  return (
    <Box pt={{ xs: 6, md: 10 }} mb={3}>
      <Container>
        {/* <Marquee> */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {logos.map((logo, index) => (
            <Box width={200} height={100} key={index} overflow="hidden">
              <Image
                src={logo}
                alt="logo"
                width={200}
                height={100}
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
          ))}
        </Stack>
        {/* </Marquee> */}
      </Container>
    </Box>
  );
};

export default Sponser;
