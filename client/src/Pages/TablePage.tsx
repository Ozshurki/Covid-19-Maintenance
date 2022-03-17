import React from "react";
import Table from "../Components/Table/Table";
import PageType from "../Components/Title/Title";

const TablePage: React.FC = () => {
    return (
        <>
            <PageType title="All citizens"/>
            <Table/>
        </>

    );
};

export default TablePage;