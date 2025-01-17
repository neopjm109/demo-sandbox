import useInterval from "@/hooks/useInterval";
import React, { useContext, useEffect, useMemo, useState } from "react";

/**
 * @enum ToastType
 * @description
 * Toast 타입
 */
enum ToastType {
    DEFAULT = "DEFAULT",
    INFO = "INFO",
    SUCCESS = "SUCCESS",
    WARNING = "WARNING",
    DANGER = "DANGER"
}

/**
 * @enum ToastPosition
 * @description
 * Toast 표기 위치
 */
enum ToastPosition {
    TOP = "TOP",
    BOTTOM = "BOTTOM",
    TOP_LEFT = "TOP_LEFT",
    TOP_RIGHT = "TOP_RIGHT",
    BOTTOM_LEFT = "BOTTOM_LEFT",
    BOTTOM_RIGHT = "BOTTOM_RIGHT"
}

/**
 * @class ModalProps
 * @description
 * Modal 정보 인터페이스
 */
class ToastProps {
    id?: string;
    title?: string;
    message?: string;
    type?: ToastType | ToastType.DEFAULT;
    position?: ToastPosition | ToastPosition.BOTTOM;
    duration?: number;
    hideClose?: boolean;
    zIndex?: number;
    onClose? = (response?: any) => {};
}

type ToastStatesObject = {
    id: string
    toast: React.ReactElement
}

/**
 * @class ModalStates
 * @description
 * 모달 관리 인터페이스
 */
class ToastStates {
    toasts : ToastStatesObject[] = [];
    showToast = (props?: ToastProps) : string => "";
    hideToast = (id: string) => {};
    hideToastAll = () => {};
}

const ToastContext = React.createContext<ToastStates>(new ToastStates());

const useToastContext = () => {
    return useContext(ToastContext);
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

const reverseAnimateStep1 = (props?: ToastProps) => {
    const { id, position }: any = props;
    let elem: any = document.getElementById(id);
    switch (position) {
        case ToastPosition.BOTTOM:
        case ToastPosition.BOTTOM_LEFT:
        case ToastPosition.BOTTOM_RIGHT:
            elem.style.bottom = "-78px";
            elem.style.boxShadow = "0px 0px 0px 0px #333";
            break;
        default: 
            elem.style.top = "-76px";
            elem.style.boxShadow = "0px 0px 0px 0px #333";
            break;
    }
}

const reverseAnimateStep2 = (props?: ToastProps) => {
    const { id, position }: any = props;
    let elem: any = document.getElementById(id);
    try {
        elem.style.height = "0px";
        switch (position) {
            case ToastPosition.BOTTOM:
            case ToastPosition.BOTTOM_LEFT:
            case ToastPosition.BOTTOM_RIGHT:
                elem.style.bottom = "-50px";
                elem.style.marginBottom = "0px"
                break;
            default: 
                elem.style.top = "-50px";
                elem.style.marginTop = "0px"
                break;
        }
    }
    catch (e) {}
}

const getColor = (type?: ToastType) => {
    switch (type) {
        case ToastType.INFO:
            return {
                backgroundColor: '#5a9cff',
                color: '#fff'
            }
        case ToastType.SUCCESS:
            return {
                backgroundColor: '#52a652',
                color: '#fff'
            }
        case ToastType.WARNING:
            return {
                backgroundColor: '#ef9b00',
                color: '#fff'
            }
        case ToastType.DANGER:
            return {
                backgroundColor: '#ff4040',
                color: '#fff'
            }
        default:
            return {
                backgroundColor: '#333',
                color: '#fff'
            }
    }
}

const getMargin = (position?: ToastPosition) => {
    switch (position) {
        case ToastPosition.BOTTOM:
        case ToastPosition.BOTTOM_LEFT:
        case ToastPosition.BOTTOM_RIGHT:
            return {
                marginBottom:Animate(0, 14)
            }
        default:
            return {
                marginTop:Animate(0, 12)
            }
    }
}

const getAnimate = (position?: ToastPosition) => {
    switch (position) {
        case ToastPosition.BOTTOM:
        case ToastPosition.BOTTOM_LEFT:
        case ToastPosition.BOTTOM_RIGHT:
            return {
                bottom:Animate("-64px", 0)
            }
        default:
            return {
                top:Animate("-64px", 0)
            }
    }
}

const CloseButton = ({onClose}: {onClose?: Function}) => {
    return (
        <button
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'transparent',
                borderWidth: 0,
                height: 32,
                fontSize: 32,
                fontWeight: 100,
                padding: 0,
                color: '#ccc',
                cursor: 'pointer'
            }}
            onClick={ () => onClose?.() }
        >
            &times;
        </button>
    )
}

const Toast = (props?: ToastProps) => {
    useInterval(() => {
        props?.onClose?.()
    }, props?.duration ?? 7000);
    return (
        <div id={ props?.id }
            style={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                height: 64,
                padding: '0px 16px',
                borderRadius: 4,
                boxShadow: Animate('0px 0px 0px 0px #333', '0px 1px 8px 0px #333'),
                transition: 'all 0.5s ease',
                zIndex: props?.zIndex,
                ...getMargin(props?.position ?? ToastPosition.TOP),
                ...getColor(props?.type ?? ToastType.DEFAULT),
                ...getAnimate(props?.position ?? ToastPosition.TOP)
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
                { props?.title && <div style={{ fontSize: 15, fontWeight: 700 }}>{ props?.title }</div> }
                <div style={{
                    fontSize: props?.title ? 12 : 14,
                }}>{ props?.message }</div>
            </div>
            {
                !props?.hideClose &&
                    <CloseButton onClose={ () => props?.onClose?.() }/>
            }
        </div>
    );
}

const toastTopContainerStyle = {
    display: 'flex',
    flexDirection: 'column' as "column",
    padding: '0px 16px 16px',
    position: 'fixed' as "fixed",
    overflow: 'hidden',
    transition: 'all 0.5s ease',
    zIndex: 9000
}

const toastBottomContainerStyle = {
    display: 'flex',
    flexDirection: 'column' as "column",
    padding: '16px 16px 0px',
    position: 'fixed' as "fixed",
    overflow: 'hidden',
    transition: 'all 0.5s ease',
    zIndex: 9000
}

/**
 * @class ToastProvider
 * @description
 * useContext를 이용한 Toast 관리
 */
const ToastProvider = ({
    children,
}: {
    children?: React.ReactElement
}) => {
    const [toasts, setToasts] = React.useState<ToastStatesObject[]>([]);
    const topToasts = useMemo(() => toasts.filter((t) => t.toast.props.position === ToastPosition.TOP), [toasts]);
    const topLeftToasts = useMemo(() => toasts.filter((t) => t.toast.props.position === ToastPosition.TOP_LEFT), [toasts]);
    const topRightToasts = useMemo(() => toasts.filter((t) => t.toast.props.position === ToastPosition.TOP_RIGHT), [toasts]);
    const bottomToasts = useMemo(() => toasts.filter((t) => t.toast.props.position === ToastPosition.BOTTOM).reverse(), [toasts]);
    const bottomLeftToasts = useMemo(() => toasts.filter((t) => t.toast.props.position === ToastPosition.BOTTOM_LEFT).reverse(), [toasts]);
    const bottomRightToasts = useMemo(() => toasts.filter((t) => t.toast.props.position === ToastPosition.BOTTOM_RIGHT).reverse(), [toasts]);
    const showToast = (props?: ToastProps) : string => {
        let id = `t_${new Date().getTime().toString()}${(Math.random() * 1000).toFixed(0)}`;
        const toast = <Toast {...props}
            id={ id }
            position={ props?.position ?? ToastPosition.TOP }
            zIndex={ 9999 - toasts.length }
            onClose={ () => {
                reverseAnimateStep1({id, ...props});
                let t1 = setTimeout(() => {
                    reverseAnimateStep2({id, ...props});
                    let t2 = setTimeout(() => {
                        props?.onClose?.();
                        hideToast(id);
                        clearTimeout(t2);
                        clearTimeout(t1);
                    }, 500)
                }, 500)
            }} />;
        setToasts((states: ToastStatesObject[]) => [ ...states, { id, toast } ]);
        return id;
    }

    const hideToast = (id?: string) => {
        if (id) {
            setToasts((states: ToastStatesObject[]) => {
                let idx = states.findIndex((state) => state.id === id);
                if (idx > -1) states.splice(idx, 1);
                return [ ...states ];
            });
        }
    }
    
    const hideToastAll = () => setToasts([]);

    const modalValue = React.useMemo<ToastStates>(() => {
        return { toasts, showToast, hideToast, hideToastAll }
    }, [toasts]);

    return (
        <ToastContext.Provider value={modalValue} >
            {children}
            {
                topToasts.length > 0 &&
                    <div style={{ ...toastTopContainerStyle, top:0, left: '50%', width: 280, transform: 'translate(-50%, 0%)' }}>
                        { topToasts.map((toast) => <React.Fragment key={toast.id}>{ toast.toast }</React.Fragment>) }
                    </div>
            }
            {
                topLeftToasts.length > 0 &&
                    <div style={{ ...toastTopContainerStyle, top:0, left: 0, width: 280 }}>
                        { topLeftToasts.map((toast) => <React.Fragment key={toast.id}>{ toast.toast }</React.Fragment>) }
                    </div>
            }
            {
                topRightToasts.length > 0 &&
                    <div style={{ ...toastTopContainerStyle, top:0, right: 0, width: 280 }}>
                        { topRightToasts.map((toast) => <React.Fragment key={toast.id}>{ toast.toast }</React.Fragment>) }
                    </div>
            }
            {
                bottomToasts.length > 0 &&
                    <div style={{ ...toastBottomContainerStyle, bottom:0, left: '50%', width: 280, transform: 'translate(-50%, 0%)' }}>
                        { bottomToasts.map((toast) => <React.Fragment key={toast.id}>{ toast.toast }</React.Fragment>) }
                    </div>
            }
            {
                bottomLeftToasts.length > 0 &&
                    <div style={{ ...toastBottomContainerStyle, bottom:0, left: 0, width: 280 }}>
                        { bottomLeftToasts.map((toast) => <React.Fragment key={toast.id}>{ toast.toast }</React.Fragment>) }
                    </div>
            }
            {
                bottomRightToasts.length > 0 &&
                    <div style={{ ...toastBottomContainerStyle, bottom:0, right: 0, width: 280 }}>
                        { bottomRightToasts.map((toast) => <React.Fragment key={toast.id}>{ toast.toast }</React.Fragment>) }
                    </div>
            }
        </ToastContext.Provider>
    )
}

export { ToastContext, ToastProvider, useToastContext, ToastType, ToastPosition }