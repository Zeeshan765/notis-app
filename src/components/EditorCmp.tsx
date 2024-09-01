import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface editorProps {
  editorState: any;
  setEditorState: any;
}

const EditorCmp: React.FC<editorProps> = ({ editorState, setEditorState }) => {
  const toolbarOptions = {
    options: [
      'inline',
      'blockType',
      'fontSize',
      'fontFamily',
      'list',
      'textAlign',
      'emoji',
      'image',
    ],
  };
  const handleEditorChange = (newEditorState: any) => {
    setEditorState(newEditorState);
  };

  return (
    <>
      <Editor
        editorState={editorState}
        toolbarClassName="custom-toolbar"
        wrapperClassName="custom-wrapper"
        editorClassName="editor-wrapper"
        toolbar={toolbarOptions}
        onEditorStateChange={handleEditorChange}
      />
    </>
  );
};

export default EditorCmp;
