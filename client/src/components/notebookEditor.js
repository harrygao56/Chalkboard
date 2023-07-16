import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

// notebookEditor.js
// Contains code for the edit notebook page


function NotebookEditor () {
    const [notebookInfo, setNotebookInfo] = useState({
        title: "",
        content: "",
    });
    const params = useParams();
    const navigate = useNavigate();


    // Fetch content from database
    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString();
            const response = await fetch(`http://localhost:5050/notebooks/${params.id.toString()}`);

            if (!response.ok) {
                const message = `An error has occured: ${response.statusText}`;
                window.alert(message);
                return;
            }
            
            const notebook = await response.json();
            if (!notebook) {
                window.alert(`Record with id ${id} not found`);
                navigate("/");
                return;
            }

            setNotebookInfo(notebook);
        }

        fetchData();
        return;
    }, [params.id, navigate]);

    // Function to update database


    // Constantly call updateData - debounces so it's called one second after you finish typing
    useEffect(() => {
        async function updateData() {
            const newContent = {
                title: notebookInfo.title,
                content: notebookInfo.content,
            };
    
            await fetch(`http://localhost:5050/notebooks/${params.id}`, {
                method: "PATCH",
                body: JSON.stringify(newContent),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
        }

        const updatingData = setTimeout(updateData, 1000);
        return () => clearTimeout(updatingData);
    }, [notebookInfo, params.id]);

    // Updates content state hook with Quill data
    const getQuillData = (value) => {
        setNotebookInfo({
            title: notebookInfo.title,
            content: value,
        });
    } 

    return (
        <div>
            <h1>{notebookInfo.title}</h1>

            <ReactQuill style={{"height": "70vh"}} theme="snow" value={notebookInfo.content} onChange={getQuillData}/>
        </div>
    )
}

export default NotebookEditor;