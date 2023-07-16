import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from './Modal'

const Notebook = (props) => (
    <tr>
        <td>{props.notebook.title}</td>
        <td>
            <Link className="btn btn-link" to={`/edit/${props.notebook._id}`}>Open</Link> | 
            <button className="btn btn-link"
                onClick={() => {
                    props.deleteNotebook(props.notebook._id);
                }}
            >
                Delete
            </button>
        </td>
    </tr>
);

function NotebookList() {
    const [notebooks, setNotebooks] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    // Fetch notebooks from database
    useEffect(() => {
        async function getNotebooks() {
            const response = await fetch(`http://localhost:5050/notebooks/`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const notebooks = await response.json();
            setNotebooks(notebooks);
        }

        getNotebooks();

        return;
    }, [notebooks.length]);

    // Delete notebook
    async function deleteNotebook(id) {
        await fetch(`http://localhost:5050/notebooks/${id}`, {
            method: "DELETE"
        });

        const updatednotebooks = notebooks.filter((el) => el._id !== id);
        setNotebooks(updatednotebooks);
    }

    // Map notebooks to the table
    function notebookList() {
        return notebooks.map((notebook) => {
            return (
                <Notebook
                    notebook={notebook}
                    deleteNotebook={() => deleteNotebook(notebook._id)}
                    key={notebook._id}
                />
            );
        });
    }

    // Displays the table with notebooks
    return (
        <div>
            {modalVisible && <Modal closeModal={setModalVisible}/>}
            <h3>Notebooks</h3>
            <button 
                type="button" 
                className="btn btn-primary" 
                onClick={() => {
                    setModalVisible(true);
                }}
            >
                Create Notebook
            </button>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{notebookList()}</tbody>
            </table>
        </div>
    );
}

export default NotebookList;