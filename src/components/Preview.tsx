import { useEffect, useState } from "react";
import { RefreshCw } from "react-feather";
import styled from "styled-components";
import { ISnippet } from "../types";
import { constructIframeCode } from "../utils/constructIframeCode";
import { IconButton } from "./IconButton";
import { Pane } from "./Pane";

interface PreviewProps {
  snippet: ISnippet;
}

export const Preview: React.FC<PreviewProps> = ({ snippet }) => {
  const [code, setCode] = useState("");
  const [frameKey, setFrameKey] = useState(0);

  useEffect(() => {
    setCode(constructIframeCode(snippet));
  }, [snippet]);

  return (
    <Wrapper>
      <Pane
        title="Preview"
        actions={
          <IconButton
            icon={<RefreshCw size={18} />}
            text="Reload page"
            onClick={() => {
              // Updating the key will reload the iframe
              setFrameKey(frameKey + 1);
            }}
          />
        }
      >
        <FrameWrapper>
          <Frame
            key={frameKey}
            srcDoc={code}
            height="100%"
            width="100%"
            frameBorder="0"
          />
        </FrameWrapper>
      </Pane>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
`;

const FrameWrapper = styled.div`
  position: relative;
  max-width: 100%;
  flex: 1 1 0%;
  overflow: hidden;
  background-color: white;
  border-radius: 4px;

  // Put an overlay on top of the iframe so that it does not interfere with drag
  // events. This selector depends on @devbookhq/splitter behaviour.
  body[style*="cursor: col-resize"] &::after {
    content: "";
    position: absolute;
    inset: 0;
  }
`;

const Frame = styled.iframe`
  display: block;
  position: absolute;
  inset: 0;
  background-color: white;
`;
