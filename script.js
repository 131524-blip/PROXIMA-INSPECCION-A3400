const STORAGE = "vehiculosA3400";

function obtenerVehiculos() {
  return JSON.parse(
    localStorage.getItem(STORAGE)
  ) || [];
}

function guardarVehiculos(lista) {
  localStorage.setItem(
    STORAGE,
    JSON.stringify(lista)
  );
}

document
.getElementById("formVehiculo")
.addEventListener("submit", function(e){

  e.preventDefault();

  let vehiculos = obtenerVehiculos();

  if(vehiculos.length >= 5){
    alert("Máximo 5 vehículos");
    return;
  }

  const vehiculo = {
    placa: placa.value,
    marca: marca.value,
    modelo: modelo.value,
    aceite: aceite.value,
    filtroAceite: filtroAceite.value,
    filtroAire: filtroAire.value,
    refrigerante: refrigerante.value,
    otros: otros.value,
    km: km.value,
    proximoCambio: proximoCambio.value,
    soat: soat.value,
    rvt: rvt.value
  };

  vehiculos.push(vehiculo);

guardarVehiculos(vehiculos);

if(window.guardarFirestore){
  guardarFirestore(vehiculo);
}

this.reset();

cargarVehiculos();

function cargarVehiculos(){

  const historial =
    document.getElementById("historial");

  historial.innerHTML = "";

  const vehiculos =
    obtenerVehiculos();

  vehiculos.forEach((v,index)=>{

    historial.innerHTML += `
      <div class="filaVehiculo">

        <span>
          ${v.placa} |
          ${v.marca} |
          ${v.modelo}
        </span>

       <button onclick="verVehiculo(${index})">
  VER
</button>

<button onclick="eliminar(${index})">
  🗑 ELIMINAR
</button>

      </div>
    `;
  });

  revisarAlertas();
}

function eliminar(index){

  if(
    !confirm(
      "¿Desea eliminar este vehículo?"
    )
  ){
    return;
  }

  let vehiculos =
    obtenerVehiculos();

  vehiculos.splice(index,1);

  guardarVehiculos(
    vehiculos
  );

  cargarVehiculos();

  alert(
    "Vehículo eliminado correctamente"
  );
}

function borrarHistorial(){

  if(confirm("¿Eliminar historial?")){

    localStorage.removeItem(STORAGE);

cargarVehiculos();
  }
}

function revisarAlertas(){

  const hoy = new Date();

  obtenerVehiculos().forEach(v=>{

    if(v.soat){

      const fechaSOAT =
        new Date(v.soat);

      const diasSOAT =
        (fechaSOAT - hoy) /
        (1000*60*60*24);

      if(diasSOAT <= 7 &&
         diasSOAT > 0){

        alert(
          `SOAT próximo a vencer\n${v.placa}`
        );
      }
    }

    if(v.rvt){

      const fechaRVT =
        new Date(v.rvt);

      const diasRVT =
        (fechaRVT - hoy) /
        (1000*60*60*24);

      if(diasRVT <= 7 &&
         diasRVT > 0){

        alert(
          `RVT próxima a vencer\n${v.placa}`
        );
      }
    }
  });
}

window.onload = function(){
  cargarVehiculos();
}

function verVehiculo(index){

  const v =
    obtenerVehiculos()[index];

  document.getElementById(
    "detalleVehiculo"
  ).innerHTML = `

    <h2>${v.placa}</h2>

    <p><b>Marca:</b> ${v.marca}</p>

    <p><b>Modelo:</b> ${v.modelo}</p>

    <p><b>Aceite:</b> ${v.aceite}</p>

    <p><b>Filtro Aceite:</b>
    ${v.filtroAceite}</p>

    <p><b>Filtro Aire:</b>
    ${v.filtroAire}</p>

    <p><b>Refrigerante:</b>
    ${v.refrigerante}</p>

    <p><b>Otros:</b>
    ${v.otros}</p>

    <p><b>Km:</b>
    ${v.km}</p>

    <p><b>Próximo Cambio:</b>
    ${v.proximoCambio}</p>

    <p><b>SOAT:</b>
    ${v.soat}</p>

    <p><b>RVT:</b>
${v.rvt}</p>

<br><br>

<button onclick="generarPDF(${index})">
📄 Generar PDF
</button>

`;

  document.getElementById(
    "modal"
  ).style.display = "block";
}

function cerrarModal(){

  document.getElementById(
    "modal"
  ).style.display = "none";
}
function generarPDF(index){

  const v = obtenerVehiculos()[index];

  const { jsPDF } = window.jspdf;

  const doc = new jsPDF();

  doc.setFontSize(18);

  doc.text(
    "PROXIMA INSPECCION A-3400",
    20,
    20
  );

  let y = 40;

  doc.text(`PLACA: ${v.placa}`,20,y);
  y+=10;

  doc.text(`MARCA: ${v.marca}`,20,y);
  y+=10;

  doc.text(`MODELO: ${v.modelo}`,20,y);
  y+=10;

  doc.text(`ACEITE: ${v.aceite}`,20,y);
  y+=10;

  doc.text(`FILTRO ACEITE: ${v.filtroAceite}`,20,y);
  y+=10;

  doc.text(`FILTRO AIRE: ${v.filtroAire}`,20,y);
  y+=10;

  doc.text(`REFRIGERANTE: ${v.refrigerante}`,20,y);
  y+=10;

  doc.text(`OTROS SERVICIOS: ${v.otros}`,20,y);
  y+=10;

  doc.text(`KILOMETRAJE: ${v.km}`,20,y);
  y+=10;

  doc.text(`PROXIMO CAMBIO: ${v.proximoCambio}`,20,y);
  y+=10;

  doc.text(`SOAT: ${v.soat}`,20,y);
  y+=10;

  doc.text(`RVT: ${v.rvt}`,20,y);

  doc.save(`A3400_${v.placa}.pdf`);
}
