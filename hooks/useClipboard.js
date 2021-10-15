import { useState } from "react";
import copy from "copy-to-clipboard";

export const useClipboard = () => {
  const { isCopied, setCopied } = useState(false);

  const handleCopy = (textToCopy) => {
    let stringToCopy = textToCopy.toString();
    copy(stringToCopy);
  };

  return { isCopied, handleCopy };
};
