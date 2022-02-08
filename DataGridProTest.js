import React, { useState } from 'react';
import { DataGridPro } from '@mui/x-data-grid-pro';

export default function DataGridProTest() {

    const [data, setData] = useState([]);
    const [editRowsModel, setEditRowsModel] = React.useState({});

    const handleEditRowsModelChange = React.useCallback(async (model) => {
        setEditRowsModel(model);
    }, []);

    const dbData = [{ "id": 101, "comment": "Test" }]

    const getData = async (e) => {
        e.preventDefault();
        setData(dbData);
    }

    const handleRowEditCommit = async (row_id) => {
        const row = editRowsModel[row_id];

        const dataAdjusted = data.map(record => {
            if (record.id === row_id) {
                const new_record = {
                    ...record,
                    comment: row.comment.value,
                };
                return new_record;
            }
            else {
                return { ...record };
            }

        })
        setData(dataAdjusted);
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 20, hide: true, editable: true },
        { field: 'comment', headerName: 'Comment', width: 100, editable: true },
    ]

    return (
        <div>
            <span>Test Datagrid</span>
            <form onSubmit={getData}>
                <button type="submit" >Get Data</button>
            </form>
            <div style={{ height: '90vh', width: '100%' }}>
                <DataGridPro
                    onRowEditCommit={handleRowEditCommit}
                    editMode='row'
                    editRowsModel={editRowsModel}
                    onEditRowsModelChange={handleEditRowsModelChange}
                    rows={data}
                    columns={columns}
                />
            </div>
        </div>
    )
}


