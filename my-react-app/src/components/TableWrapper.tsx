import React, { useState } from 'react';
import './Table.css';


interface TableWrapperProps {
    element: JSX.Element;
}

const TableWrapper: React.FC<TableWrapperProps> = (props: TableWrapperProps) => {
    return (
        props.element
    );
};

export default TableWrapper;
