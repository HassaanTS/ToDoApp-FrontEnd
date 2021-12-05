// get all data from back-end
import axios from 'axios'

const baseURL = 'http://localhost:7000'

// GET all records
async function fetchRecords(){
    const config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
    };
    const url = baseURL + '/api/v1/get_todos'

    return axios.get(url, config).then(response => response.data).catch(error => {
        alert('error: ', error)
    });
}

// POST new record
async function createRecord(data){
    const config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
    };
    const url = baseURL + '/api/v1/create_todo'

    const res =  axios.post(url, data, config).then(response => response.data).catch(error => {
        alert('error: ', error)
    });
    console.log('update response: ', res)
}

// PUT an updated record
async function updateRecord(id, data){
    const config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
    }; 
    const url = baseURL + '/api/v1/update_todo/' + id

    const res = axios.put(url, data, config).then(response => response.data).catch(error => {
        alert('error: ', error)
    });
    console.log('update response: ', res)
}

// DELETE a record
async function deleteRecord(id, data){
    const config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
    }; 
    const url = baseURL + '/api/v1/delete_todo/' + id

    const res = axios.delete(url, config).then(response => response.data).catch(error => {
        alert('error: ', error)
    });
    console.log('update response: ', res)
}

export {createRecord, fetchRecords, updateRecord, deleteRecord};
