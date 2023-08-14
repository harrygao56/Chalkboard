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

    const summarize = async (e) => {
        e.preventDefault();
        var selection = "";
        if (window.getSelection) {
            selection = window.getSelection().toString();
        } else if (document.selection && document.selection.type !== "Control") {
            selection = document.selection.createRange().text;
        }
        if (selection !== "") {
            const formData = new FormData();
            formData.append('text', selection)
            const response = await fetch("http://127.0.0.1:5000/summarize", {
                method: "POST",
                body: formData,
            });
            const output = await response.json();
            var sel = window.getSelection();
            var range = sel.getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode(output));
        }
        else {
            alert("No text selected");
        }
    }

    const transcribe = async (e) => {

    }

    return (
        <div style={{"padding": "10px 30px 30px 30px"}}>
            <div style={{"display": "flex", "justifyContent": 'space-between'}}>
                <h2>{notebookInfo.title}</h2>
                <div style={{"display": "flex"}}>
                    <button style={{"marginRight": "15px", "width": "150px", "height": "35px"}} onClick={transcribe}>
                        Transcribe
                    </button>
                    <button style={{"width": "150px", "height": "35px"}} onClick={summarize}>
                        Generate Notes
                    </button>
                </div>
            </div>
            <ReactQuill style={{"height": "70vh"}} theme="snow" value={notebookInfo.content} onChange={getQuillData}/>
        </div>
    )
}

export default NotebookEditor;