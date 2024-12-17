'use client';

import { ArrayUtils } from "@/utils/utils.common";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Flex, Table } from "antd";
import { useMemo } from "react";

const BaseTable = ({
    columns,
    data,
    onRowClick
} : {
    columns: any[]
    data: any
    onRowClick?: Function
}) => {
    const pagination = useMemo(() => {
        let result = [];
        for (let i=data?.pageable?.startPage; i<data?.pageable?.endPage+1; i++) {
            result.push(i);
        }
        return result;
    }, [data]);
    
    return (
        <Flex flex="1" vertical gap={ 8 }>
            <Table columns={columns} dataSource={data?.list}
                onRow={ (record, index) => onRowClick?.(record,index) }/>
            <div>Pagination</div>
            <Flex gap={8}>
                {
                    data?.pageable?.hasPrev &&
                        <Button type="default" style={{ padding: '4px 8px' }}>
                            <LeftOutlined/>
                        </Button>
                }
                {
                    pagination.map((row: number) => (
                        <Button key={row} type={ `${row !== data?.pageable.curPage ? 'default' : 'primary' }` }>{row}</Button>
                    ))
                }
                {
                    data?.pageable?.hasNext &&
                        <Button type="default" style={{ padding: '4px 8px' }}>
                            <RightOutlined/>
                        </Button>
                }
            </Flex>
        </Flex>
    );
}

export default BaseTable;