import { useEffect, useMemo, useState } from "react";
import { RefreshCw } from "react-feather";
import styled from "styled-components";
import { ISnippet } from "../../types";
import { IconButton } from "../IconButton";
import { Pane } from "../Pane";
import { constructSnippet } from "./constructSnippet";

interface PreviewProps {
  snippet: ISnippet;
}

export const Preview: React.FC<PreviewProps> = ({ snippet }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [frameKey, setFrameKey] = useState(0);

  useMemo(() => {
    try {
      const code = constructSnippet(snippet);

      setCode(code);
      setError(null);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  }, [snippet]);

  useEffect(() => {
    function handleErrorMessage(e: MessageEvent) {
      if (
        e.data?.source === "playground-preview" &&
        e.data?.message?.type === "error"
      ) {
        setError(e.data.message.data);
      }
    }

    window.addEventListener("message", handleErrorMessage);

    return () => window.removeEventListener("message", handleErrorMessage);
  }, []);

  return (
    <Wrapper>
      <Pane
        title="Preview"
        actions={
          <IconButton
            icon={<RefreshCw size={21} />}
            text="Refresh"
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
          {error ? (
            <div className="error">
              <p>{error}</p>
            </div>
          ) : null}
        </FrameWrapper>
      </Pane>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1 1 0%;
  border-top: 1px solid var(--color-header);
`;

const FrameWrapper = styled.div`
  position: relative;
  min-height: 250px;
  max-width: 100%;
  flex: 1;
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
