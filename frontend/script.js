const API = "http://notes-api.example.com/notes"; // Change this to your actual API endpoint

async function loadNotes(){
    const res = await fetch(API);
    const notes = await res.json();

    const list = document.getElementById("notesList");
    list.innerHTML = "";

    notes.forEach(note=>{
        const li = document.createElement("li");
        li.innerHTML = `
        ${note.text}
        <button onclick="deleteNote(${note.id})">Delete</button>
        `;
        list.appendChild(li);
    });
}

async function addNote(){
    const input = document.getElementById("noteInput");

    await fetch(API,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({text:input.value})
    });

    input.value="";
    loadNotes();
}

async function deleteNote(id){
    await fetch(API+"/"+id,{method:"DELETE"});
    loadNotes();
}

loadNotes();