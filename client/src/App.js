import React from 'react';
import {MDBDataTable} from 'mdbreact';


const DatatablePage = () => {
    return (
        <div className="p-5">
            <MDBDataTable
                striped
                hover
                data="/api/get/data"
            />
        </div>
    );
}

export default DatatablePage;
