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
 * @class ModalObject
 * @description
 * Modal 정보 인터페이스
 */
class ModalObject {
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

type ModalStatesProps = {
    id: string
    modal: React.ReactElement
}

/**
 * @class ModalStates
 * @description
 * 모달 관리 인터페이스
 */
class ModalStates {
    modals : ModalStatesProps[] = [];
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

const reverseAnimate = (object?: ModalObject) => {
    const { id, position, width, height }: any = object;
    let elem: any = document.getElementById(id);    
    console.log("!", id, elem)
    switch (position) {
        case ModalPosition.LEFT:
            elem.style.marginLeft = -(width ?? 320) + "px";
            break;
        case ModalPosition.RIGHT: 
            elem.style.marginRight = -(width ?? 320) + "px";
            break;
        case ModalPosition.TOP: 
            elem.style.marginTop = -(height ?? 200) + "px";
            break;
        case ModalPosition.BOTTOM: 
            elem.style.marginBottom = -(height ?? 200) + "px";
            break;
        default:
            elem.style.marginTop = (-(height ?? 320) / 10) + "px";
            elem.style.opacity = 0;
            break;
    }
}

const isInClose = (pos?: ClosePosition) => (pos === ClosePosition.IN_LEFT) || (pos === ClosePosition.IN_RIGHT)
const isOutClose = (pos?: ClosePosition) => (pos === ClosePosition.OUT_LEFT) || (pos === ClosePosition.OUT_RIGHT)

const getModalPosition = (object?: ModalObject) => {
    if (object?.shape === ModalShape.FULLSCREEN) {
        return {
            justifyContent: 'center',
            alignItems: 'center'
        }
    }
    let position = object?.position ?? ModalPosition.CENTER;
    if (object?.shape === ModalShape.SHEET && position === ModalPosition.CENTER) {
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

const getPositionOffset = (object?: ModalObject) => {
    const { position, offset, width, height, animation }: any = object;
    switch (position) {
        case ModalPosition.LEFT: return { marginLeft: animation ? Animate(-(width ?? 320), offset) : offset }
        case ModalPosition.RIGHT: return { marginRight: animation ? Animate(-(width ?? 320), offset) : offset }
        case ModalPosition.TOP: return { marginTop: animation ? Animate(-(height ?? 200), offset) : offset }
        case ModalPosition.BOTTOM: return { marginBottom: animation ? Animate(-(height ?? 200), offset) : offset }
        default: return { marginTop: animation ? Animate(-(height ?? 200) / 10, offset) : offset, opacity: animation ? Animate(0, 1) : 1 }
    }
}

const getModalSize = (object?: ModalObject) => {
    switch (object?.shape) {
        case ModalShape.FULLSCREEN:
            return {
                width: '100%',
                height: '100%'
            }
        case ModalShape.SHEET:
            switch(object?.position) {
                case ModalPosition.LEFT:
                case ModalPosition.RIGHT:
                    return {
                        width: object?.width,
                        height: '100%'
                    }
                case ModalPosition.TOP:
                default:
                    return {
                        width: '100%',
                        height: object?.height
                    }
            }
        default:
            return {
                width: object?.width,
                height: object?.height,
            }
    }
}

const Modal = (object?: ModalObject) => {
    return (
        <ModalWrap object={ object }>
            <ModalContainer object={{...object}}/>
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

const ModalWrap = ({ object, children }: { object: ModalObject | undefined, children: React.ReactElement }) => {
    return (
        <div
            style={{
                display: 'flex',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                ...getModalPosition(object)
            }}
        >
            <div
                style={{ position: 'absolute', left:0, right:0, top:0, bottom:0, background: 'rgba(0,0,0,0.25)', transition: 'all 0.3s ease' }}
                onClick={ () => {
                    if (object?.outsideClickClose) object.onClose?.();
                    else object?.onOutsideClick?.();
                }}/>
            { children }
        </div>
    );
}

const ModalContainer = ({ object }: { object: ModalObject | undefined }) => {
    useHistoryBackLock();
    return (
        <div id={object?.id} style={{
            display: 'flex',
            flexDirection: 'column',
            zIndex: object?.zIndex ?? 1000,
            backgroundColor: '#fff',
            boxShadow: '0px 1px 8px 0px #797979',
            transition: 'all 0.3s ease',
            minWidth: 280,
            minHeight: 200,
            ...getModalSize(object),
            ...getPositionOffset(object)
        }}>
            <ModalHeader object={object}/>
            <ModalContents object={object}/>
            <ModalFooter object={object}/>
        </div>
    );
}

const ModalHeader = ({ object }: { object?: ModalObject }) => {
    return (
        <>
        {   
            !object?.hideHeader &&
                <div style={{ display: 'flex', alignItems: 'center', height: 32, padding: '8px 12px' }}>
                    <div style={{ flex: 1, fontSize: 18, fontWeight: 700 }}>{ object?.title }</div>
                    <CloseButton onClick={ () => object?.onClose?.()}/>
                </div>
        }
        </>
    );
}

const ModalContents = ({ object }: { object?: ModalObject }) => {
    return <div style={{ flex:1, fontSize: 14, color: '#333', padding:`${object?.hideHeader ? '8': '4'}px 12px`, overflow: 'auto' }}>{object?.children}</div>;
}

const ModalFooter = ({ object }: { object?: ModalObject }) => {
    return (
        <>
            {
                (!object?.hideFooter && (object?.success || object?.cancel)) &&
                    <div style={{ display: 'flex', alignItems: 'center', height: 36, padding: '12px 12px', justifyContent: 'end', gap: 8 }}>
                        {
                            object?.cancel &&
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
                                    onClick={ () => object?.onCancel?.() }
                                >{ object?.cancel }</button>
                        }
                        {
                            object?.success &&
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
                                    onClick={ () => object?.onSuccess?.() }
                                >{ object?.success }</button>
                        }
                    </div>
            }
        </>
    );
}

const Alert = (object?: ModalObject) => {
    return (
        <ModalWrap object={ object }>
            <ModalContainer object={{
                ...object,
                shape: ModalShape.DIALOG,
                hideHeader: false,
                hideFooter: false,
                success: object?.success ?? "확인"
            }}/>
        </ModalWrap>
    );
}

const Confirm = (object?: ModalObject) => {
    return (
        <ModalWrap object={ object }>
            <ModalContainer object={{
                ...object,
                shape: ModalShape.DIALOG,
                hideHeader: false,
                hideFooter: false,
                success: object?.success ?? "확인",
                cancel: object?.cancel ?? "취소"
            }}/>
        </ModalWrap>
    );
}

/**
 * @class ModalProvider
 * @description
 * useContext를 이용한 Modal 관리
 */
function ModalProvider({
    children,
}: {
    children?: React.ReactElement
}) {
    const [modals, setModals] = React.useState<ModalStatesProps[]>([]);
    const generate = (id: string, element: React.ReactElement) => {
        const { type } : any = element;
        switch (type.name) {
            case "Alert":
                return <Alert
                    {...element.props}
                    id={ id }
                    zIndex={ element.props?.zIndex ?? (1000 + modals.length) }
                    onClose={() => {
                        if (element.props.animation) {
                            reverseAnimate({id, ...element.props});
                            setTimeout(() => {
                                element.props.onClose?.();
                                hide(id);
                            }, 200)
                        }
                        else {
                            element.props.onClose?.();
                            hide(id);
                        }
                    }}/>
            case "Confirm":
                return <Confirm
                    {...element.props}
                    id={ id }
                    zIndex={ element.props?.zIndex ?? (1000 + modals.length) }
                    onClose={() => {
                        if (element.props.animation) {
                            reverseAnimate({id, ...element.props});
                            setTimeout(() => {
                                element.props.onClose?.();
                                hide(id);
                            }, 200)
                        }
                        else {
                            element.props.onClose?.();
                            hide(id);
                        }
                    }}/>
            default:
                return <Modal
                    {...element.props}
                    id={ id }
                    zIndex={ element.props?.zIndex ?? (1000 + modals.length) }
                    onClose={() => {
                        if (element.props.animation) {
                            reverseAnimate({id, ...element.props});
                            setTimeout(() => {
                                element.props.onClose?.();
                                hide(id);
                            }, 200)
                        }
                        else {
                            element.props.onClose?.();
                            hide(id);
                        }
                    }}/>
        }
    }

    const show = (element: React.ReactElement) : string => {
        let id = `md_${new Date().getTime().toString()}${(Math.random() * 1000).toFixed(0)}`;
        const modal = generate(id, element);
        setModals((states: ModalStatesProps[]) => [ ...states, { id, modal } ]);
        return id;
    }

    const hide = (id?: string) => {
        if (id) {
            setModals((states: ModalStatesProps[]) => {
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