function parseCSV(csvData){
    const rows =csvData.split('\n');
    const tableBody = document.querySelector('#csvTable tBody');
    rows.forEach( row =>{
        const colums = row.split(',');
        const tr = document.createElement('tr');
        colums.forEach(column=>{
            const td = document.createElement('td');
            td.addEventListener('click', () => EliminarFila(tr));
            td.textContent=column;
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);

    });
}

function readCSV(file){
    const reader = new FileReader();
    reader.onload= function(e){
        const csvData = e.target.result;
        parseCSV(csvData);
    }
    reader.readAsText(file);
}
document.querySelector('input[type="file"]').addEventListener('change',function(e){
    const file = e.target.files[0];
    readCSV(file);

});

function InsertarDatos() {
    const Nombre = document.getElementById('nombre').value;
    const Correo = document.getElementById('correo').value;
    const Edad = document.getElementById('edad').value;

    if (Nombre && Correo && Edad) {
        const tableBody = document.querySelector('#csvTable tbody');
        const tr = document.createElement('tr');
        
        [Nombre, Correo, Edad].forEach(text => {
            const td = document.createElement('td');
            td.textContent = text;
            tr.appendChild(td);
        });
        
        tableBody.appendChild(tr);
        
        updateCSV();
        
        document.getElementById('nombre').value = '';
        document.getElementById('correo').value = '';
        document.getElementById('edad').value = '';
    } else {
        alert('Por favor, complete todos los campos.');
    }
}

function EliminarFila(row) {
    if (confirm('¿Estás seguro de que deseas eliminar esta fila?')) {
        row.remove();
        updateCSV();
    }
}

function BorrarTodo() {
    if (confirm('¿Estás seguro de que deseas borrar todos los datos?')) {
        const tableBody = document.querySelector('#csvTable tbody');
        tableBody.innerHTML = '';
        updateCSV();
    }
}
