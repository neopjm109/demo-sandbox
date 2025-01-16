"use client";
import { Typography } from "antd";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const { Title } = Typography;

export default function SunEditorPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Title level={2} style={{ marginTop: 0 }}>SunEditor</Title>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <SunEditor
          height="300px"
          autoFocus={true}
          lang={"ko"}
          setAllPlugins={true}
          setOptions={{
            buttonList: [
              ["undo", "redo"],
              ["font", "fontSize", "formatBlock"],
              ["paragraphStyle", "blockquote"],
              ["bold", "underline", "italic", "strike", "subscript", "superscript"],
              ["fontColor", "hiliteColor", "textStyle"],
              ["removeFormat"],
              ["outdent", "indent"],
              ["align", "horizontalRule", "list", "lineHeight"],
              ["table", "link"],
              ["fullScreen", "showBlocks", "codeView"],
              ["image"],
              ["preview", "print"],
            ],
          }}
          onImageUploadBefore={ (files: File[], info: object) => {
            return true;
          }}
          />
      </div>
    </div>
  );
}
