const express = require('express');
const path = require('path');
const formidable = require('formidable')
const fs = require('fs');
const app = express();
const port = process.env.PORT || 5000;
let file_count = 0;

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/get/data', (req, res) => {
    let processed_data = {
        columns: [
            {
                label: 'Time',
                field: 'time',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Satellite ID',
                field: 'satellite_id',
                width: 270
            },
            {
                label: 'Set ID',
                field: 'set_id',
                width: 200
            },
            {
                label: 'Condition',
                field: 'condition',
                width: 100
            },
            {
                label: 'Status',
                field: 'status',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Errors',
                field: 'errors',
                sort: 'asc',
                width: 100
            }
        ],
        rows: []
    };

    require('./data/all_data.json').map(
        function (satellite_update) {
            return satellite_update.collection.map(
                function (book) {
                    return processed_data.rows.push(
                        {
                            "time": satellite_update.timestamp,
                            "satellite_id": satellite_update.satellite_id,
                            "set_id": book.set_id,
                            "condition": book.condition,
                            "status": book.status,
                            "errors": book.errors
                        });
                });
        });
    res.json(processed_data);
});

app.post('/api/post/form_data', (req, res) => {
    new formidable.IncomingForm().parse(req, (err, fields, files) => {
        if (err) {
            console.error('Error', err)
            throw err
        }

        let oldPath = files.file.path;
        let newPath = path.join(__dirname, 'data') + '/' + `data_${file_count}.json`;
        let rawData = fs.readFileSync(oldPath)

        fs.writeFile(newPath, rawData, function (err) {
            if (err) console.log(err)

            file_count += 1;
            return res.send("Successfully uploaded")
        });

        let oldData = require('./data/all_data.json');
        let newData = require(`./data/data_${file_count}.json`);

        //oldData.push(newData);
        console.log(oldData);
    })
});

app.get('*', (req, res) => {
    console.log("NotImplemented");
});

app.listen(port);

console.log('App is listening on port ' + port);