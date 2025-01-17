"use client";
import PageTitle from "@/components/PageTitle";
import { Typography } from "antd";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const { Title } = Typography;

export default function SunEditorPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <PageTitle title={ "SunEditor" } description={ "SunEditor 라이브러리를 이용한 WYSIWYG 페이지입니다." }/>
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
