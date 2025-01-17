"use client";
import PageTitle from "@/components/PageTitle";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, DatePicker, Form, Input, InputNumber, Radio, Select, Switch, Typography, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import SunEditor from "suneditor-react";
import 'suneditor/dist/css/suneditor.min.css';

const { Title } = Typography;
const { RangePicker } = DatePicker;

const fileUpload = async ({ file }: any) => {
  const formData = new FormData();
  formData.append("file", file);

  let response = {
    code : "0000",
    data : "imageUrl"
  }
  // let response : any = await axios("UPLOAD_URL", formData);
  if (response?.code === "0000") {
    return response?.data;
  } else {
    return null;
  }
}

export default function CustomForm() {
  const [ form ] = Form.useForm();

  const save = (data : any) => {
    let formData = {
      ...data,
      birth: dayjs(data?.birth).format("YYYY-MM-DD"),
      range: data?.range?.reduce((acc : any, cur : any) => [ ...acc, dayjs(cur).format("YYYY-MM-DD") ], [])
    }
    if (formData?.formFile) {
      formData.formFile = fileUpload(data?.formFile);
    }

    console.log("origin", data);
    console.log(formData);
    
    // let response : any = await axios("UPLOAD_URL", formData);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <PageTitle title={ "Form" } description={ "BaseForm을 이용한 Form 생성 예제 페이지입니다." }/>
      <Form form={form} className="base-form" initialValues={{ formName: "TEST" }} onFinish={ save }>
        <Form.Item label="이름" name="formName" required>
          <Input/>
        </Form.Item>
        <Form.Item label="생일" name="birth" required>
          <DatePicker format={"YYYY-MM-DD"}/>
        </Form.Item>
        <Form.Item label="성별" name="gender1" required>
          <Radio.Group>
            <Radio value="M">남</Radio>
            <Radio value="F">여</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="성별" name="gender2">
          <Radio.Group>
            <Radio.Button value="M">남</Radio.Button>
            <Radio.Button value="F">여</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="언어" name="language">
          <Checkbox.Group>
            <Checkbox value="Java">Java</Checkbox>
            <Checkbox value="Kotlin">Kotlin</Checkbox>
            <Checkbox value="Javascript">Javascript</Checkbox>
            <Checkbox value="Typescript">Typescript</Checkbox>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item label="과일" name="fruits">
          <Select>
            <Select.Option value="apple">사과</Select.Option>
            <Select.Option value="banana">바나나</Select.Option>
            <Select.Option value="orange">오렌지</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="기간" name="range">
          <RangePicker format={"YYYY-MM-DD"}/>
        </Form.Item>
        <Form.Item label="숫자" name="formNumber">
          <InputNumber/>
        </Form.Item>
        <Form.Item label="스위치" name="switch">
          <Switch/>
        </Form.Item>
        <Form.Item label="TextArea" name="formText">
          <TextArea rows={5}/>
        </Form.Item>
        <Form.Item label="에디터" name="formEditor">
          <SunEditor
            height="500px"
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
            }}/>
        </Form.Item>
        <Form.Item label="파일 업로드" name="formFile">
          <Upload listType="picture-card"
            maxCount={1}>
            <button style={{ border: 0, background: 'none' }}>
              <PlusOutlined/>
              <div style={{ marginTop: 8}}>Upload</div>
            </button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">저장</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
