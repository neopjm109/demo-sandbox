'use client';

import { BooleanUtils } from "@/utils/utils.common";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, DatePicker, Flex, Form, Input, InputNumber, Radio, Select, Switch, Upload } from "antd";
import dayjs from "dayjs";
import { useMemo } from "react";
import { Cookies } from "react-cookie";
import SunEditor from "suneditor-react";
import 'suneditor/dist/css/suneditor.min.css';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

enum EditMode {
    INSERT = "INSERT",
    UPDATE = "UPDATE"
}

enum InputType {
    TEXT = "TEXT",
    PASSWORD = "PASSWORD",
    NUMBER = "NUMBER",
    SELECT = "SELECT",
    RADIO = "RADIO",
    RADIO_BUTTON = "RADIO_BUTTN",
    CHECKBOX = "CHECKBOX",
    DATE = "DATE",
    DATE_RANGE = "DATE_RANGE",
    SWITCH = "SWITCH",
    TEXTAREA = "TEXTAREA",
    EDITOR = "EDITOR",
    UPLOAD = "UPLOAD",
    CUSTOM = "CUSTOM",
}

const fileUpload = async (file: any, path?: any) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("path", path);

    const cookieStore = new Cookies();
    let response : any = await (
        await fetch(
            "http://localhost:8080/api/admin/uploads",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${cookieStore.get("x-access-token")}`
                },
                body: formData
            },
        )).json();
    if (response?.code === "0000") {
        return response?.data;
    } else {
        return null;
    }
}

const DATE_FORMAT = "YYYY-MM-DD";
const convertDateFormat = (date: any) => dayjs(date).format(DATE_FORMAT);
const convertDateRangeFormat = (range: any) => range?.reduce((acc : any, cur : any) => [ ...acc, dayjs(cur).format(DATE_FORMAT) ], []);

const generateFormItem = (row: any, value: any) => {
    switch (row.type) {
        case InputType.PASSWORD:
            return <Input.Password defaultValue={ value }/>;
        case InputType.NUMBER:
            return <InputNumber defaultValue={ value }/>;
        case InputType.SELECT:
            return (
				<Select defaultValue={ value }>
				{
					row?.options?.map((opt: any) =>
						<Select.Option key={opt.value} value={opt.value}>
							{opt.name}
						</Select.Option>
					)
				}
				</Select>
			);
        case InputType.RADIO:
            return (
				<Radio.Group defaultValue={ value }>
				{
					row?.options?.map((opt: any) =>
						<Radio key={opt.value} value={opt.value}>
							{opt.name}
						</Radio>
					)
				}
				</Radio.Group>
			);
        case InputType.RADIO_BUTTON:
            return (
				<Radio.Group defaultValue={ value }>
				{
					row?.options?.map((opt: any) =>
						<Radio.Button key={opt.value} value={opt.value}>
							{opt.name}
						</Radio.Button>
					)
				}
				</Radio.Group>
			);
        case InputType.CHECKBOX:
            return (
				<Checkbox.Group defaultValue={ value }>
				{
					row?.options?.map((opt: any) =>
						<Checkbox key={opt.value} value={opt.value}>
							{opt.name}
						</Checkbox>
					)
				}
				</Checkbox.Group>
			);
        case InputType.DATE:
            return <DatePicker format={"YYYY-MM-DD"} defaultValue={ value }/>;
        case InputType.DATE_RANGE:
            return <RangePicker format={"YYYY-MM-DD"} defaultValue={ value }/>;
        case InputType.SWITCH:
            return <Switch defaultValue={ value }/>;
        case InputType.TEXTAREA:
            return <TextArea rows={5} defaultValue={ value }/>;
		case InputType.EDITOR:
			return (
				<SunEditor
					height="500px"
					lang={"ko"}
					setAllPlugins={true}
                    defaultValue={ value }
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
						fileUpload(files[0], row.uploadPath);
						return true;
					}
				}/>
			);
        case InputType.UPLOAD:
            return (
                <Upload listType="picture-card"
                    maxCount={1}>
                    <div style={{ border: 0, background: 'none' }}>
                        <PlusOutlined/>
                        <div style={{ marginTop: 8}}>Upload</div>
                    </div>
                </Upload>
			);
        case InputType.CUSTOM:
            return row.children;
        case InputType.TEXT:
        default:
            return <Input defaultValue={ value } readOnly={ row.readOnly }/>;
    }
}

const BaseForm = ({
    width,
    columns,
    data,
    uploadPath,
    saveText,
    cancelText,
    deleteText,
    onSave,
    onCancel,
    onDelete,
    vertical
}: {
    columns: any[],
    data?: any,
    width?: number,
    uploadPath?: string,
    saveText?: string,
    cancelText?: string,
    deleteText?: string,
    onSave?: Function,
    onCancel?: Function,
    onDelete?: Function,
    vertical?: boolean
}) => {
	const [ form ] = Form.useForm();
    const mode = useMemo(() => BooleanUtils.isEmpty(data) ? EditMode.INSERT : EditMode.UPDATE, [data]);

    return (
        <Flex vertical gap={8} style={{ width }}>
            <Form form={form} initialValues={ data } className={ vertical ? "" : "base-form" } onFinish={ async (options) => {
                for (let key in options) {
                    if (options[key]?.file) {
                        let fileName = await fileUpload(options[key].file.originFileObj, uploadPath)
                        options[key] = fileName;
                    }
                }
                onSave?.(options);
            }}>
                {
                    columns.map((row: any) => (
                        <Form.Item key={row?.name} name={row?.name} label={row?.label} required={row.required}>
                            {generateFormItem(row, data?.[row?.name])}
                        </Form.Item>
                    ))
                }
                <Form.Item>
                    <Flex>
                        <Flex flex={1} gap={4}>
                            <Button type="primary" htmlType="submit">{saveText ?? "저장"}</Button>
                            {
                                mode === EditMode.UPDATE &&
                                    <Button onClick={() => onCancel?.()}>{cancelText ?? "취소"}</Button>
                            }
                        </Flex>
                        {
                            (mode === EditMode.UPDATE && onDelete) &&
                                <Button color="danger" variant="solid" onClick={() => onDelete?.()}>{deleteText ?? "삭제"}</Button>
                        }
                    </Flex>
                </Form.Item>
            </Form>
        </Flex>
    );
};

export default BaseForm;
export { convertDateFormat, convertDateRangeFormat, fileUpload, InputType };

