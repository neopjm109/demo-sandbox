'use client'

import useHistoryBackLock from "@/hooks/useHistoryBackLock";
import React, { useContext, useEffect, useState } from "react";

/**
 * @enum ModalShape
 */
enum ModalType {
    ALERT = "ALERT",
    CONFIRM = "CONFIRM"
}

/**
 * @enum ModalShape
 */
enum ModalShape {
    DIALOG = "DIALOG",
    SHEET = "SHEET",
    FULLSCREEN = "FULLSCREEN"
}

/**
 * @enum ModalPosition
 * @description
 * Modal 표기 위치. ModalShape - FULLSCREEN 제외
 */
enum ModalPosition {
    CENTER = "CENTER",
    TOP = "TOP",
    BOTTOM = "BOTTOM",
    LEFT = "LEFT",
    RIGHT = "RIGHT"
}

/**
 * @enum ModalDirection
 * @description
 * Modal 나타나는 애니메이션 위치
 */
enum ModalDirection {
    FADE = "FADE",
    TOP = "TOP",
    BOTTOM = "BOTTOM",
    LEFT = "LEFT",
    RIGHT = "RIGHT"
}

/**
 * @enum ClosePosition
 * @description
 * Modal 표기 위치. ModalShape - FULLSCREEN 제외
 */
enum ClosePosition {
    NONE = "NONE",
    IN_LEFT = "IN_LEFT",
    IN_RIGHT = "IN_RIGHT",
    OUT_LEFT = "OUT_LEFT",
    OUT_RIGHT = "OUT_RIGHT"
}

/**
 * @class ModalProps
 * @description
 * Modal 정보 인터페이스
 */
class ModalProps {
    id?: string;
    title?: string;
    shape?: ModalShape | ModalShape.DIALOG;
    position?: ModalPosition | ModalPosition.CENTER;
    positionOffset?: number;
    animation?: boolean;
    direction?: ModalDirection | ModalDirection.FADE;
    closePosition?: ClosePosition | ClosePosition.IN_RIGHT;
    children?: React.ReactElement;
    hideHeader?: boolean;
    hideFooter?: boolean;
    outsideClickClose?: boolean;
    width?: number;
    height?: number;
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
    zIndex?: number;
    onOutsideClick? = () => {};
    success?: string;
    onSuccess? = (response?: any) => {};
    cancel?: string;
    onCancel? = (response?: any) => {};
    close?: string;
    onClose? = (response?: any) => {};
}

type ModalStatesObject = {
    id: string
    modal: React.ReactElement
}

/**
 * @class ModalStates
 * @description
 * 모달 관리 인터페이스
 */
class ModalStates {
    modals : ModalStatesObject[] = [];
    show = (data: React.ReactElement) : string => "";
    hide = (id: string) => {};
    hideAll = () => {};
}

const ModalContext = React.createContext<ModalStates>(new ModalStates());

const useModalContext = () => {
    return useContext(ModalContext);
}

const Animate = (start: any, end: any) => {
    const [ option, setOption ] = useState(start);
    useEffect(() => {
        setTimeout(() => {
            setOption(end);
        }, 1)
    }, []);

    return option;
}

const reverseAnimate = (props?: ModalProps) => {
    const { id, position, width, height }: any = props;
    let elem: any = document.getElementById(id);
    switch (position) {
        case ModalPosition.LEFT:
            elem.style.left = -width + "px";
            break;
        case ModalPosition.RIGHT: 
            elem.style.right = -width + "px";
            break;
        case ModalPosition.TOP: 
            elem.style.top = -height + "px";
            break;
        case ModalPosition.BOTTOM: ``
            elem.style.bottom = -height + "px";
            break;
        default:
            elem.style.top = (-(height + 32) / 10) + "px";
            elem.style.opacity = 0;
            break;
    }
}

const isInClose = (pos?: ClosePosition) => (pos === ClosePosition.IN_LEFT) || (pos === ClosePosition.IN_RIGHT)
const isOutClose = (pos?: ClosePosition) => (pos === ClosePosition.OUT_LEFT) || (pos === ClosePosition.OUT_RIGHT)

const getModalPosition = (props?: ModalProps) => {
    if (props?.shape === ModalShape.FULLSCREEN) {
        return {
            justifyContent: 'center',
            alignItems: 'center'
        }
    }
    let position = props?.position ?? ModalPosition.CENTER;
    if (props?.shape === ModalShape.SHEET && position === ModalPosition.CENTER) {
        position = ModalPosition.BOTTOM
    }
    switch (position) {
        case ModalPosition.LEFT:
            return {
                justifyContent: 'start',
                alignItems: 'center'
            }
        case ModalPosition.RIGHT:
            return {
                justifyContent: 'end',
                alignItems: 'center'
            }
        case ModalPosition.TOP:
            return {
                justifyContent: 'center',
                alignItems: 'start'
            }
        case ModalPosition.BOTTOM:
            return {
                justifyContent: 'center',
                alignItems: 'end'
            }
        default:
            return {
                justifyContent: 'center',
                alignItems: 'center'
            }
    }
}

const getPositionOffset = (props?: ModalProps) => {
    const { position, offset, width, height, animation }: any = props;
    switch (position) {
        case ModalPosition.LEFT: return { marginLeft: animation ? Animate(-width, offset) : offset }
        case ModalPosition.RIGHT: return { marginRight: animation ? Animate(-width, offset) : offset }
        case ModalPosition.TOP: return { marginTop: animation ? Animate(-height, offset) : offset }
        case ModalPosition.BOTTOM: return { marginBottom: animation ? Animate(-height, offset) : offset }
        default: return { marginTop: animation ? Animate(-(height + 32) / 10, offset) : offset, opacity: animation ? Animate(0, 1) : 1 }
    }
}

const getModalSize = (props?: ModalProps) => {
    switch (props?.shape) {
        case ModalShape.FULLSCREEN:
            return {
                width: '100%',
                height: '100%'
            }
        case ModalShape.SHEET:
            switch(props?.position) {
                case ModalPosition.LEFT:
                case ModalPosition.RIGHT:
                    return {
                        width: props?.width,
                        height: '100%'
                    }
                case ModalPosition.TOP:
                default:
                    return {
                        width: '100%',
                        height: props?.height
                    }
            }
        default:
            return {
                width: props?.width,
                height: props?.height,
            }
    }
}

const Modal = (props?: ModalProps) => {
    return (
        <ModalWrap props={ props }>
            <ModalContainer props={{...props}}/>
        </ModalWrap>
    );
}

const CloseButton = ({onClick}: {onClick?: Function}) => {
    return (
        <button
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#fff',
                borderWidth: 0,
                height: 32,
                fontSize: 32,
                fontWeight: 100,
                padding: 0,
                color: '#000',
                cursor: 'pointer'
            }}
            onClick={ () => onClick?.() }
        >
            &times;
        </button>
    )
}

const ModalWrap = ({ props, children }: { props: ModalProps | undefined, children: React.ReactElement }) => {
    return (
        <div
            style={{
                display: 'flex',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                ...getModalPosition(props)
            }}
        >
            <div
                style={{ position: 'absolute', left:0, right:0, top:0, bottom:0, background: 'rgba(0,0,0,0.25)' }}
                onClick={ () => {
                    if (props?.outsideClickClose) props.onClose?.();
                    else props?.onOutsideClick?.();
                }}/>
            { children }
        </div>
    );
}

const ModalContainer = ({ props }: { props: ModalProps | undefined }) => {
    useHistoryBackLock();
    return (
        <div id={props?.id} style={{
            display: 'flex',
            flexDirection: 'column',
            zIndex: props?.zIndex ?? 1000,
            backgroundColor: '#fff',
            boxShadow: '0px 1px 8px 0px #797979',
            transition: 'all 0.5s ease',
            minWidth: 280,
            minHeight: 200,
            ...getModalSize(props),
            ...getPositionOffset(props)
        }}>
            <ModalHeader props={props}/>
            <ModalContents props={props}/>
            <ModalFooter props={props}/>
        </div>
    );
}

const ModalHeader = ({ props }: { props?: ModalProps }) => {
    return (
        <>
        {   
            !props?.hideHeader &&
                <div style={{ display: 'flex', alignItems: 'center', height: 32, padding: '8px 12px' }}>
                    <div style={{ flex: 1, fontSize: 18, fontWeight: 700 }}>{ props?.title }</div>
                    <CloseButton onClick={ () => props?.onClose?.()}/>
                </div>
        }
        </>
    );
}

const ModalContents = ({ props }: { props?: ModalProps }) => {
    return <div style={{ flex:1, fontSize: 14, color: '#333', padding:`${props?.hideHeader ? '8': '4'}px 12px`, overflow: 'auto' }}>{props?.children}</div>;
}

const ModalFooter = ({ props }: { props?: ModalProps }) => {
    return (
        <>
            {
                (!props?.hideFooter && (props?.success || props?.cancel)) &&
                    <div style={{ display: 'flex', alignItems: 'center', height: 36, padding: '12px 12px', justifyContent: 'end', gap: 8 }}>
                        {
                            props?.cancel &&
                                <button
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        background: '#fff',
                                        borderWidth: 0,
                                        borderRadius: 4,
                                        height: 36,
                                        fontSize: 16,
                                        padding: '0px 16px',
                                        color: '#333',
                                        cursor: 'pointer'
                                    }}
                                    onClick={ () => props?.onCancel?.() }
                                >{ props?.cancel }</button>
                        }
                        {
                            props?.success &&
                                <button
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        background: '#5c7283',
                                        borderWidth: 0,
                                        borderRadius: 4,
                                        height: 36,
                                        fontSize: 16,
                                        padding: '0px 16px',
                                        color: '#fff',
                                        cursor: 'pointer'
                                    }}
                                    onClick={ () => props?.onSuccess?.() }
                                >{ props?.success }</button>
                        }
                    </div>
            }
        </>
    );
}

const Alert = (props?: ModalProps) => {
    return (
        <ModalWrap props={ props }>
            <ModalContainer props={{
                ...props,
                shape: ModalShape.DIALOG,
                hideHeader: false,
                hideFooter: false,
                success: props?.success ?? "확인"
            }}/>
        </ModalWrap>
    );
}

const Confirm = (props?: ModalProps) => {
    return (
        <ModalWrap props={ props }>
            <ModalContainer props={{
                ...props,
                shape: ModalShape.DIALOG,
                hideHeader: false,
                hideFooter: false,
                success: props?.success ?? "확인",
                cancel: props?.cancel ?? "취소"
            }}/>
        </ModalWrap>
    );
}

/**
 * @class ModalProvider
 * @description
 * useContext를 이용한 Modal 관리
 */
const ModalProvider = ({
    children,
}: {
    children?: React.ReactElement
}) => {
    const [modals, setModals] = React.useState<ModalStatesObject[]>([]);
    const generate = (id: string, element: React.ReactElement) => {
        const { type } : any = element;
        const props = {
            ...element.props,
            id,
            width: element.props?.width ?? 320,
            height: element.props?.height ?? 200,
            zIndex: element.props?.zIndex ?? (1000 + modals.length),
        }
        const onClose = () => {
            if (props.animation) {
                reverseAnimate(props);
                setTimeout(() => {
                    props.onClose?.();
                    hide(id);
                }, 500)
            }
            else {
                props.onClose?.();
                hide(id);
            }
        }
        switch (type.name) {
            case "Alert":
                return <Alert {...props} onClose={onClose}/>
            case "Confirm":
                return <Confirm {...props} onClose={onClose}/>
            default:
                return <Modal {...props} onClose={onClose}/>
        }
    }

    const show = (element: React.ReactElement) : string => {
        let id = `md_${new Date().getTime().toString()}${(Math.random() * 1000).toFixed(0)}`;
        const modal = generate(id, element);
        setModals((states: ModalStatesObject[]) => [ ...states, { id, modal } ]);
        return id;
    }

    const hide = (id?: string) => {
        if (id) {
            setModals((states: ModalStatesObject[]) => {
                let idx = states.findIndex((state) => state.id === id);
                if (idx > -1) states.splice(idx, 1);
                return [ ...states ];
            });
        }
    }
    
    const hideAll = () => setModals([]);

    const modalValue = React.useMemo<ModalStates>(() => {
        return { modals, show, hide, hideAll }
    }, [modals]);

    return (
        <ModalContext.Provider value={modalValue} >
            {children}
            {
                modals.length > 0 &&
                    modals.map((modal) => <React.Fragment key={modal.id}>{ modal.modal }</React.Fragment>)
            }
        </ModalContext.Provider>
    )
}

export { ModalContext, ModalProvider, useModalContext, Modal, ModalShape, ModalPosition, Alert, Confirm };