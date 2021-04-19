import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <Router>
        <div>
            <Route path="/" component={App} exact/>
            <Route path="/upload/data" component={UploadFile} exact/>
        </div>
    </Router>,
    document.getElementById('root')
);

function UploadFile() {
    return (
        <form method="POST" action="/api/post/form_data" encType="multipart/form-data">
            <div className="d-flex p-2 col-example">
                <input type="file" name="file" />
                <button type="submit">Upload</button>
            </div>
        </form>
    )
}

reportWebVitals();
