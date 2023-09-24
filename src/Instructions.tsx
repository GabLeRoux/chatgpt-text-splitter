import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import useClipboard from "react-use-clipboard";

function Instructions({ numParts, changed }) {
  const instructionText = `The total length of the content that I want to send you is too large to send in only one piece.\n\nFor sending you that content, I will follow this rule:\n\n[START PART 1/${numParts}]\nthis is the content of the part 1 out of ${numParts} in total\n[END PART 1/${numParts}]\n\nThen you just answer: "Received part 1/${numParts}"\n\nAnd when I tell you "ALL PARTS SENT", then you can continue processing the data and answering my requests.`;
  const [isCopied, setCopied] = useClipboard(instructionText);
  const [showCopied, setShowCopied] = useState(false);

  const onClick = () => {
    setCopied();
    setShowCopied(true);
  };

  useEffect(() => {
    setShowCopied(false);
  }, [changed]);

  return (
    <Button variant="contained" color="default" onClick={onClick}>
      {showCopied && isCopied
        ? "✅ Instructions Copied"
        : "📋 Copy Instructions"}
    </Button>
  );
}

export default Instructions;
