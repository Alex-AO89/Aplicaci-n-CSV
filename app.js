function parseCSV(csvData){
    const rows =csvData.split('\n');
    const tableBody = document.querySelector('#csvTable tBody');
    rows.forEach( row =>{
        const colums = row.split(',');
        const tr = document.createElement('tr');
        colums.forEach(column=>{
            const td = document.createElement('td');
            td.addEventListener('click', () => EliminarFila(tr)); // agrega un evento con un clik para cada fila
            td.textContent = column.trim();
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
//inserta nuevs datos 
function InsertarDatos() {
    const Fecha = document.getElementById('fecha').value;
    let Cantidad = document.getElementById('cantidad').value;
    let Tasa = document.getElementById('tasa').value;
    const Nombre = document.getElementById('nombre').value;
    const Plazo = document.getElementById('plazo').value;

    // Agregar símbolo de pesos ($) a la cantidad si no está presente
    if (!Cantidad.startsWith('$')) {
        Cantidad = '$' + Cantidad;
    }
    // Agregar símbolo de porcentaje (%) a la tasa si no está presente
    if (!Tasa.startsWith('%')) {
        Tasa = Tasa + '%' ;
    }

    if (Fecha && Cantidad && Tasa && Nombre && Plazo) {
        const tableBody = document.querySelector('#csvTable tbody');
        const tr = document.createElement('tr');
        
        [Fecha, Cantidad, Tasa, Nombre, Plazo].forEach(text => {
            const td = document.createElement('td');
            td.textContent = text;
            tr.appendChild(td);
        });
        
        tableBody.appendChild(tr);
        
        updateCSV();
        
        document.getElementById('fecha').value = '';
        document.getElementById('cantidad').value = ''; 
        document.getElementById('tasa').value = '';
        document.getElementById('nombre').value = '';
        document.getElementById('plazo').value = '';
    } else {
        alert('Por favor, complete todos los campos.');
    }
}
//confirma si deseas borrar una fila
function EliminarFila(row) {
    if (confirm('¿Estás seguro de que deseas eliminar esta fila?')) {
        row.remove();
        updateCSV();
    }
}
function descargarCSV() {
    if (confirm('¿Estás seguro de que deseas descargar un nuevo csv?')) {
        // Obtener todos los datos de la tabla
        const table = document.getElementById('csvTable');
        const rows = table.querySelectorAll('tbody tr');
        
        // Crear una cadena para almacenar el contenido CSV
        let csvContent = 'Nombre,Correo,Edad\n';

        // Recorrer todas las filas de la tabla
        rows.forEach(row => {
            // Obtener los datos de cada celda en la fila
            const cells = row.querySelectorAll('td');
            const rowData = Array.from(cells).map(cell => cell.textContent).join(',');     
            // Agregar los datos de la fila a la cadena CSV
            csvContent += rowData + '\n';
        });
        // Crear un objeto Blob con el contenido CSV
        const blob = new Blob([csvContent], { type: 'text/csv' });
        // Crear un enlace temporal para descargar el archivo CSV
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', 'Nuevosdatos.csv');
        link.style.display = 'none';
        // Agregar el enlace al cuerpo del documento
        document.body.appendChild(link);
        // Simular un clic en el enlace para iniciar la descarga
        link.click();
        // Limpiar y liberar el enlace
        document.body.removeChild(link);
    }
}
// Borra toda la tabla
function BorrarTodo() {
    if (confirm('¿Estás seguro de que deseas borrar todos los datos?')) {
        const tableBody = document.querySelector('#csvTable tbody');
        tableBody.innerHTML = '';
    }
}
