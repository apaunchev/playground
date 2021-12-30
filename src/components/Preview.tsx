import { useMemo, useState } from "react";
import { RefreshCw } from "react-feather";
import styled from "styled-components";
import { ISnippet } from "../types";
import { IconButton } from "./IconButton";
import { Pane } from "./Pane";
import { constructIframeCode } from "../utils/constructIframeCode";

interface PreviewProps {
  snippet: ISnippet;
}

export const Preview: React.FC<PreviewProps> = ({ snippet }) => {
  const [code, setCode] = useState("");
  const [frameKey, setFrameKey] = useState(0);

  useMemo(() => {
    try {
      const code = constructIframeCode(snippet);
      setCode(code);
    } catch (e: unknown) {
      // if (e instanceof Error) {
      // }
    }
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
  border-left: 1px solid var(--color-header);
`;

const FrameWrapper = styled.div`
  position: relative;
  max-width: 100%;
  flex: 1 1 0%;
  overflow: hidden;
  background-color: white;
  border-radius: 4px;
`;

const Frame = styled.iframe`
  display: block;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
`;
