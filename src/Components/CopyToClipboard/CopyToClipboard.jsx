import React, { useState, useEffect } from "react";

const CopyToClipboard = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const [buttonText, setButtonText] = useState('Copy');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setButtonText('Successfully Copied!');
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
        setButtonText('Copy');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <div>
      <button onClick={handleCopy}>{buttonText}</button>
    </div>
  );
};

export default CopyToClipboard;
