import React, {useState} from "react";

const backgroundStyles = {
  "width": "100vw",
  "height": "100vh",
  "backgroundColor": "rgba(200, 200, 200)",
  'position': "fixed",
  "display": 'flex',
  "justifyContent": 'center',
  "alignItems": 'center'
}

const containerStyles = {
    "width": "500px",
    "height": "200px",
    "borderRadius": "12px",
    "backgroundColor": "white",
    "boxShadow": "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    "display": "flex",
    "flexDirection": "column",
    "padding": "25px"
}

const spacingStyle = {
    "marginBottom": "25px",
    "marginTop": "10px"
}

function Modal({ closeModal }) {
    const [form, setForm] = useState({
        title: "",
        content: "",
    });

    // Updates state
    function updateForm(value) {
        return setForm((prev) => {
            return {...prev, ...value};
        });
    }

    // Handles form submission
    async function onSubmit(e) {
        e.preventDefault();

        const newNotebook = {...form};

        await fetch("http://localhost:5050/notebooks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newNotebook),
        })
        .catch(error =>{
            window.alert(error);
            return;
        });

        setForm({ title: "", content: ""});
        closeModal(false);
        window.location.reload();
    }

    return (
        <div style={backgroundStyles}>
            <div style={containerStyles}>
                <h4>
                    Create Notebook
                </h4>
                <div style={spacingStyle}>
                    <input type="text" placeholder="Title" className="form-control" value={form.title} 
                        onChange={(e) => updateForm({ title: e.target.value })}
                    />
                </div>
                <div className="btn-group">
                    <button className="btn btn-secondary" onClick={() => {
                        setForm({title: "", content:"" });
                        closeModal(false);
                    }}>
                        Cancel
                    </button>
                    <button className="btn btn-primary" onClick={onSubmit} >Create</button>
                </div>
            </div>
        </div>
    ); 
}

export default Modal;