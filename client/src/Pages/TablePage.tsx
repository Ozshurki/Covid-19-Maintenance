import React from "react";
import Table from "../Components/Table/Table";
import PageType from "../Components/PageType/PageType";

const TablePage: React.FC = () => {
    return (
        <>
            <PageType title="Citizens" img="https://upload.wikimedia.org/wikipedia/commons/b/b8/Group_people_icon.jpg"/>
            <Table/>
        </>

    );
};

export default TablePage;