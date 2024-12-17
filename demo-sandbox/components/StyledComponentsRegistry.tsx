'use client';

import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs"
import Entity from "@ant-design/cssinjs/lib/Cache";
import { useServerInsertedHTML } from "next/navigation";
import { useMemo } from "react"

const StyledComponentsRegistry = ({children} : {children:React.ReactNode}) => {
    const cache = useMemo<Entity>(() => createCache(), [createCache]);
    useServerInsertedHTML(() => (
        <style id="antd" dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}/>
    ));
    return <StyleProvider cache={cache}>{children}</StyleProvider>
}

export default StyledComponentsRegistry;