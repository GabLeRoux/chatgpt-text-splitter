import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextSplitter from "./TextSplitter";

export default function App(): JSX.Element {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          <span role="img" aria-label="Black Scissors Emoji">
            ✂️
          </span>{" "}
          ChatGPT Text Splitter
        </Typography>
        <TextSplitter />
      </Box>
    </Container>
  );
}
