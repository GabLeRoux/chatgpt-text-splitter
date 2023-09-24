import React, { useState } from "react";
import { TextField, Slider, Button, Typography, Grid } from "@material-ui/core";
import Instructions from "./Instructions";
import ChunkSection from "./ChunkSection";

function TextSplitter() {
  const [inputText, setInputText] = useState("");
  const [chunks, setChunks] = useState([]);
  const [chunkSize, setChunkSize] = useState(15000);

  const handleTextChange = (e) => {
    setInputText(e.target.value);
  };

  const handleChunkSizeChange = (event, newValue) => {
    setChunkSize(newValue);
  };

  const splitTextIntoChunks = () => {
    let chunkNumber = 1;
    const chunksArray = [];
    let remainingText = inputText;

    while (remainingText.length > 0) {
      const chunk = remainingText.slice(0, chunkSize);
      const totalChunks = Math.ceil(inputText.length / chunkSize);
      let content;

      if (chunkNumber === totalChunks) {
        content = `[START PART ${chunkNumber}/${totalChunks}]\n${chunk}\n[END PART ${chunkNumber}/${totalChunks}]\nALL PARTS SENT. Now you can continue processing the request.`;
      } else {
        content = `Do not answer yet. This is just another part of the text I want to send you. Just receive and acknowledge as "Part ${chunkNumber}/${totalChunks} received" and wait for the next part.\n[START PART ${chunkNumber}/${totalChunks}]\n${chunk}\n[END PART ${chunkNumber}/${totalChunks}]\nRemember not answering yet. Just acknowledge you received this part with the message "Part ${chunkNumber}/${totalChunks} received" and wait for the next part.`;
      }

      chunksArray.push(content);
      remainingText = remainingText.slice(chunkSize);
      chunkNumber += 1;
    }

    setChunks(chunksArray);
  };

  const getSplitButtonText = () => {
    if (inputText.length === 0) {
      return "Enter some text first";
    } else if (inputText.length < chunkSize) {
      return "Input text is shorter than split length";
    } else {
      return `Split into ${Math.ceil(inputText.length / chunkSize)} chunks`;
    }
  };

  return (
    <div>
      <Typography variant="body1">
        Enter the text below, and choose a chunk size to split the text into
        parts. The character count of the input is {inputText.length}.
      </Typography>
      <TextField
        value={inputText}
        onChange={handleTextChange}
        multiline
        minRows="10"
        maxRows="10"
        variant="outlined"
        fullWidth
      />
      <Typography>Chunk Size: {chunkSize} characters</Typography>{" "}
      <Slider
        value={chunkSize}
        onChange={handleChunkSizeChange}
        step={100}
        min={1000}
        max={20000}
        valueLabelDisplay="auto"
      />
      <Typography color="secondary">
        15000 should work just fine with GPT4
      </Typography>
      <Grid container spacing={2}>
        <Grid item>
          <Instructions numParts={chunks.length} changed={inputText} />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={splitTextIntoChunks}
            disabled={inputText.length === 0 || inputText.length < chunkSize}
          >
            {getSplitButtonText()}
          </Button>
        </Grid>
      </Grid>
      <ChunkSection chunks={chunks} />
    </div>
  );
}

export default TextSplitter;
