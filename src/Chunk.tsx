import React, { useState } from "react";
import { Button, Paper, Collapse, IconButton } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useClipboard from "react-use-clipboard";

function Chunk({ content, index }) {
  const [isCopied, setCopied] = useClipboard(content);
  const [open, setOpen] = useState(false);

  return (
    <Paper style={{ padding: "16px", margin: "8px" }}>
      <Button variant="contained" color="secondary" onClick={setCopied}>
        {isCopied ? `✅ Copied Part ${index + 1}` : `📋 Copy Part ${index + 1}`}
      </Button>
      <IconButton
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </IconButton>
      <Collapse in={open}>
        <pre>{content}</pre>
      </Collapse>
    </Paper>
  );
}

export default Chunk;
