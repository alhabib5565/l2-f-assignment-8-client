import React from "react";
import logo1 from "../../../assets/sponser/logo1.svg";
import logo2 from "../../../assets/sponser/logo2.svg";
import logo3 from "../../../assets/sponser/logo3.svg";
import logo4 from "../../../assets/sponser/logo4.svg";
import logo5 from "../../../assets/sponser/logo5.svg";
import logo6 from "../../../assets/sponser/logo6.svg";
import logo7 from "../../../assets/sponser/logo7.svg";
import { Box, Container, Stack } from "@mui/material";
import Image from "next/image";
import Marquee from "react-fast-marquee";
const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];
const Sponser = () => {
  return (
    <Box pt={{ xs: 6, md: 10 }} mb={3}>
      <Container>
        <Marquee>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            gap={4}
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
        </Marquee>
      </Container>
    </Box>
  );
};

export default Sponser;
