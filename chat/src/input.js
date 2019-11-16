import React from 'react';
import { TextareaAutosize } from '@material-ui/core';


export function MaxHeightTextarea() {
  return (
    <TextareaAutosize
      rowsMax={4}
      aria-label="maximum height"
      placeholder="Type message ..."
      defaultValue=""
    />
  );
}
