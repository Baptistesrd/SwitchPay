// src/components/TrustLogos.jsx
import { Flex, Image, Box, useColorModeValue } from "@chakra-ui/react";

const logos = [
  { alt: "Stripe", src: "https://upload.wikimedia.org/wikipedia/commons/0/01/Stripe_Logo%2C_revised_2016.svg" },
  { alt: "Adyen",  src: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Adyen_logo.svg" },
  { alt: "Wise",   src: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Wise_Logo.svg" },
  { alt: "Rapyd",  src: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Rapyd_logo.svg" }
];

export default function TrustLogos() {
  const opacity = useColorModeValue(0.7, 0.8);
  return (
    <Flex
      gap={{ base: 6, md: 10 }}
      justify="center"
      align="center"
      wrap="wrap"
      opacity={opacity}
      mt={2}
    >
      {logos.map((l) => (
        <Box key={l.alt} h="22px">
          <Image src={l.src} alt={l.alt} h="100%" filter="grayscale(1)" />
        </Box>
      ))}
    </Flex>
  );
}
