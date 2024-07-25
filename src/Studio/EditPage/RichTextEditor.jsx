import React, { useState } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Button, Box } from '@mui/material';

export default function RichTextEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const toggleInlineStyle = (inlineStyle) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  return (
    <Box sx={{ border: '1px solid #ccc', padding: '10px' }}>
      <Button onClick={() => toggleInlineStyle('BOLD')} variant="outlined">
        Bold
      </Button>
      <Button onClick={() => toggleInlineStyle('ITALIC')} variant="outlined">
        Italic
      </Button>
      <Button onClick={() => toggleInlineStyle('UNDERLINE')} variant="outlined">
        Underline
      </Button>
      <Box sx={{ marginTop: '10px', minHeight: '200px' }}>
        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={setEditorState}
        />
      </Box>
    </Box>
  );
}
