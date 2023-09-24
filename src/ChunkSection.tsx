import React from "react";
import Chunk from "./Chunk";

function ChunkSection({ chunks }) {
  return (
    <div>
      {chunks.map((chunk, index) => (
        <Chunk key={index} content={chunk} index={index} />
      ))}
    </div>
  );
}

export default ChunkSection;
