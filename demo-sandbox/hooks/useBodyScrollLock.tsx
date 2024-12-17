const useBodyScrollLock = () => {
    let scrollY = 0;

    const lockScroll = () => {
        scrollY = window.scrollY;
        document.body.style.overflowY = "hidden";
        document.body.style.position = "fixed";
        document.body.style.width = "100%";
        document?.getElementsByTagName("body")?.[0]?.setAttribute("style", `position: relative: top: -${scrollY}px`);
    }

    const unlockScroll = () => {
        document.body.style.removeProperty("overflow");
        document.body.style.removeProperty("position");
        document.body.style.removeProperty("top");
        document.body.style.removeProperty("width");

        document?.getElementsByTagName("body")?.[0]?.removeAttribute("style");
        window.scrollTo(0, scrollY);
    }

    return {
        lockScroll, unlockScroll
    }
}

export default useBodyScrollLock;