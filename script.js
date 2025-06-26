
let db;
const request = indexedDB.open("modulo4_db", 1);

request.onerror = () => console.error("No se pudo abrir IndexedDB");
request.onsuccess = (event) => db = event.target.result;
request.onupgradeneeded = (event) => {
  db = event.target.result;
  db.createObjectStore("registros", { autoIncrement: true });
};

document.getElementById("modulo4-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const data = {};
  formData.forEach((value, key) => {
    if (data[key]) {
      if (!Array.isArray(data[key])) data[key] = [data[key]];
      data[key].push(value);
    } else {
      data[key] = value;
    }
  });

  const tx = db.transaction("registros", "readwrite");
  tx.objectStore("registros").add(data);
  tx.oncomplete = () => alert("Registro guardado con éxito");
  limpiarFormulario();
});

document.getElementById("limpiar-btn").addEventListener("click", limpiarFormulario);

function limpiarFormulario() {
  document.getElementById("modulo4-form").reset();
  const inputs = document.querySelectorAll("input[type=text]");
  inputs.forEach(input => input.value = "");
}

document.getElementById("exportar-btn").addEventListener("click", function() {
  const tx = db.transaction("registros", "readonly");
  const store = tx.objectStore("registros");
  const request = store.getAll();
  request.onsuccess = () => {
    const blob = new Blob([JSON.stringify(request.result, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "registros_modulo4.json";
    a.click();
    URL.revokeObjectURL(url);
  };
});
