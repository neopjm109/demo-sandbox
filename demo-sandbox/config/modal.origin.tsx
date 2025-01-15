'use client'

import BaseForm from "@/components/BaseForm";
import React, { useContext } from "react";

enum ModalType {
    ALERT = "A",
    CONFIRM = "C",
    POPUP = "P",
    TOAST = "T",
    FULLSCREEN = "F",
    FORM = "M"
}

enum PopupClosePosition {
    BR = "bottomRight",
    BL = "bottomLeft",
    TR = "topRight",
    TL = "topLeft"
}

interface ModalFormObject {
    columns: any;
    data?: any;
    onDelete?: (response?: any) => void
}

interface ModalObject {
    id?: string;
    type?: ModalType;
    title?: string;
    message?: string;
    success?: string;
    cancel?: string;
    close?: string;
    onSuccess?: (response?: any) => void;
    onCancel?: (response?: any) => void;
    onClose?: (response?: any) => void;
    children?: React.JSX.Element;
    style?: any;
    options?: any;
    form?: ModalFormObject;
}

class ModalStates {
    modals: ModalObject[] = [];
    show = (data: ModalObject) : any => {};
    hide = (id: string) => {};
    hideAll = () => {};
    showAlert = (data: ModalObject) : any => {};
    showConfirm = (data: ModalObject) : any => {};
    showPopup = (data: ModalObject) : any => {};
    showToast = (data: ModalObject) : any => {};
    showFullscreen = (data: ModalObject) : any => {};
    showForm = (data: ModalObject) : any => {};
}

const ModalContext = React.createContext<ModalStates>(new ModalStates());
const useModalContext = () => useContext(ModalContext);

const dimStyle = {
    display: 'flex',
    position: 'fixed' as 'fixed',
    width: '100%',
    height: '100%',
    left: 0,
    right: 0,
    top: 0, 
    bottom: 0,
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center', background: 'rgba(0,0,0,0.5)'
}

const defaultModalStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: 320,
    height: 240,
    background: '#fff',
    borderRadius: 6,
    boxShadow: '0px 2px 6px rgba(0,0,0,0.35)',
    overflow: 'hidden'
}

const defaultTitleStyle = {
    display: 'flex',
    height: 40,
    justifyContent: 'center',
    alignItems: 'end',
    fontWeight: 700,
    fontSize: 18
}

const defaultMessageStyle = {
    display: 'flex',
    flex: 1,
    padding: '0 8px',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14
}

const defaultFormModalStyle = {
    display: 'flex',
    flexDirection: 'column',
    background: '#fff',
    borderRadius: 6,
    boxShadow: '0px 2px 6px rgba(0,0,0,0.35)',
    overflow: 'hidden'
}

const defaultFormStyle = {
    display: 'flex',
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
    marginBottom: -24
}

const defaultButtonContainerStyle = {
    display: 'flex',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '0 0 4px 4px',
    overflow: 'hidden',
    fontWeight: 400,
    fontSize: 14
}

const defaultButtonStyle = {
    display: 'flex',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: 1,
    cursor: 'pointer'
}

const defaultCloseButtonStyle = {
    ...defaultButtonStyle,
    background: '#333',
    color: '#fff'
}

const defaultCancelButtonStyle = {
    ...defaultButtonStyle,
    background: '#d03030',
    color: '#fff'
}

const defaultSuccessButtonStyle = {
    ...defaultButtonStyle,
    background: '#3070d0',
    color: '#fff'
}

const defaultPopupStyle = {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    width: 320,
    height: 480,
    background: '#fff',
    boxShadow: '0px 2px 6px rgba(0,0,0,0.35)'
}

const defaultPopupCloseStyle = {
    display: 'flex',
    position: 'absolute' as 'absolute',
    color: '#fff',
    cursor: 'pointer'
}

const defaultFullscreenStyle = {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    background: '#fff',
    boxShadow: '0px 2px 6px rgba(0,0,0,0.35)',
    overflow: 'hidden'
}

interface ModalProps {
    data: ModalObject,
    hide: Function
}

const Alert = ({ data, hide } : ModalProps ) => {
    return (
        <div style={{ ...defaultModalStyle, ...data?.style}}>
            { data?.title && <div dangerouslySetInnerHTML={{ __html: data.title }} style={{ ...defaultTitleStyle }}/> }
            { data?.message && <div dangerouslySetInnerHTML={{ __html: data.message }} style={{ ...defaultMessageStyle }}/> }
            { data?.children }
            <div style={{ ...defaultButtonContainerStyle }}>
                <div role="presentation" onClick={ () => {
                    data?.onClose?.();
                    hide(data.id);
                }} style={{ ...defaultCloseButtonStyle }}>{ data.close ?? "닫기" }</div>
            </div>
        </div>
    )
}

const Confirm = ({ data, hide } : ModalProps ) => {
    return (
        <div style={{ ...defaultModalStyle, ...data?.style}}>
            { data?.title && <div dangerouslySetInnerHTML={{ __html: data.title }} style={{ ...defaultTitleStyle }}/> }
            { data?.message && <div dangerouslySetInnerHTML={{ __html: data.message }} style={{ ...defaultMessageStyle }}/> }
            { data?.children }
            <div style={{ ...defaultButtonContainerStyle }}>
                <div role="presentation" onClick={ () => {
                    data?.onCancel?.();
                    hide(data.id);
                }} style={{ ...defaultCancelButtonStyle }}>{ data.cancel ?? "취소" }</div>
                <div role="presentation" onClick={ () => {
                    data?.onSuccess?.();
                    hide(data.id);
                }} style={{ ...defaultSuccessButtonStyle }}>{ data.success ?? "확인" }</div>
            </div>
        </div>
    )
}

const getClosePosition = (position: PopupClosePosition) => {
    switch(position) {
        case PopupClosePosition.TL:
            return {
                bottom: undefined,
                right: undefined,
                top: -28,
                left: 0
            }
        case PopupClosePosition.TR:
            return {
                bottom: undefined,
                left: undefined,
                top: -28,
                right: 0
            }            
        case PopupClosePosition.BL:
            return {
                top: undefined,
                right: undefined,
                bottom: -28,
                left: 0
            }
        case PopupClosePosition.BR:
        default:
            return {
                top: undefined,
                left: undefined,
                bottom: -28,
                right: 0
            }
    }
}

const Popup = ({ data, hide } : ModalProps ) => {
    return (
        <div style={{ ...defaultPopupStyle, ...data?.style }}>
            { data.children }
            <div role="presentation" style={{
                ...defaultPopupCloseStyle,
                ...getClosePosition(data?.options?.closePosition)
            }} onClick={ () => {
                data?.onClose?.();
                hide(data.id);
            }}>{ data.close ?? "닫기" }</div>
        </div>
    )
}

const Fullscreen = ({ data, hide } : ModalProps ) => {
    return (
        <div style={{ ...defaultFullscreenStyle, ...data?.style }}>
            { data.children }
        </div>
    )
}

const Form = ({ data, hide } : ModalProps ) => {
    return (
        <div style={{ ...defaultFormModalStyle, ...data?.style}}>
            { data?.title && <div dangerouslySetInnerHTML={{ __html: data.title }} style={{ ...defaultTitleStyle }}/> }
            <div style={{ ...defaultFormStyle }}>
                <BaseForm vertical columns={ data?.form?.columns } data={ data?.form?.data }
                    saveText={ data?.success } cancelText={ data.cancel }
                    onSave={
                    (options : any) => {
                        data?.onSuccess?.(options);
                        hide(data.id);
                    }}
                    onCancel={
                    () => {
                        data?.onCancel?.();
                        hide(data.id);
                    }}
                    onDelete={ data?.form?.onDelete ? (options : any) => {
                        data?.form?.onDelete?.(options);
                        hide(data.id);
                    } : undefined }
                />
            </div>
        </div>
    )
}

const ModalProvider = ({ children } : { children?: React.ReactNode }) => {
    const [ modals, setModals ] = React.useState<ModalObject[]>([]);
    const show = (data: ModalObject) : any => {
        let id = `md_${data?.type ?? "A"}_${new Date().getTime().toString()}${(Math.random() * 1000).toFixed(0)}}`;
        setModals((states: ModalObject[]) => [ ...states, { ...data, id }]);
        return id
    }

    const hide = (id: string) => {
        setModals((states: ModalObject[]) => {
            let idx = states.findIndex((state) => state.id === id);
            if (idx > -1 ) states.splice(idx, 1);
            return [ ...states ];
        })
    }

    const hideAll = () => setModals([]);
    const showAlert = (data: ModalObject) : string => show({ ...data, type: ModalType.ALERT});
    const showConfirm = (data: ModalObject) : string => show({ ...data, type: ModalType.CONFIRM});
    const showPopup = (data: ModalObject) : string => show({ ...data, type: ModalType.POPUP});
    const showToast = (data: ModalObject) : string => show({ ...data, type: ModalType.TOAST});
    const showFullscreen = (data: ModalObject) : string => show({ ...data, type: ModalType.FULLSCREEN});
    const showForm = (data: ModalObject) : string => show({ ...data, type: ModalType.FORM});

    const value = React.useMemo<ModalStates>(() => {
        return { modals, show, hide,  hideAll, showAlert, showConfirm, showPopup, showToast, showFullscreen, showForm }
    }, [modals]);

    return (
        <ModalContext.Provider value={value}>
            { children }
            {
                modals.length > 0 &&
                    <div style={{ ...dimStyle }}>
                        {
                            modals.map((modal) => {
                                switch (modal.type) {
                                    case ModalType.ALERT:
                                        return <Alert key={modal.id} data={modal} hide={ hide }/>
                                    case ModalType.CONFIRM:
                                        return <Confirm key={modal.id} data={modal} hide={ hide }/>
                                    case ModalType.POPUP:
                                        return <Popup key={modal.id} data={modal} hide={ hide }/>
                                    case ModalType.FULLSCREEN:
                                        return <Fullscreen key={modal.id} data={modal} hide={ hide }/>
                                    case ModalType.FORM:
                                        return <Form key={modal.id} data={modal} hide={ hide }/>
                                }
                            })
                        }
                    </div>
            }
            {/* <Toasts/> */}
        </ModalContext.Provider>
    )
}

export { ModalType, PopupClosePosition, ModalContext, ModalProvider, useModalContext }