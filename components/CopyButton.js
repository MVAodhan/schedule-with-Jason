import { useClipboard } from "../hooks/useClipboard";

import { IconButton } from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";

const CopyButton = ({ textToCopy }) => {
  const { isCopied, handleCopy } = useClipboard();

  return (
    <>
      <IconButton
        aria-label="Copy episode guest name"
        icon={<CopyIcon />}
        bg="transparent"
        onClick={() => handleCopy(textToCopy)}
      />
    </>
  );
};

export default CopyButton;
