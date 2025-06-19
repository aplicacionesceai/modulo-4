console.log("✅ IndexedDB disponible:", "indexedDB" in window);
window.onload = () => {
  console.log("✅ main.js cargado (window.onload)");

  if (typeof guardarRegistro === "function") {
    console.log("✅ guardarRegistro listo");
  }

  if (typeof exportarDatos === "function") {
    console.log("✅ exportarDatos listo");
  }

  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const datos = {};
      const elementos = form.querySelectorAll('input, select, textarea');
      elementos.forEach(el => {
        if (el.type === 'radio' && el.checked) {
          datos[el.name] = el.value;
        } else if (el.type === 'checkbox') {
          if (!datos[el.name]) datos[el.name] = [];
          if (el.checked) datos[el.name].push(el.value);
        } else if (el.type !== 'submit') {
          datos[el.name] = el.value;
        }
      });

      try {
        await guardarRegistro(datos);
        alert('✅ Registro guardado localmente');
        form.reset();
      } catch (err) {
        console.error('❌ Error al guardar:', err);
        alert('❌ Error al guardar el registro');
      }
    });
  }

  const btn = document.getElementById("btn-exportar");
  if (btn) {
    btn.addEventListener("click", () => {
      console.log("🟢 Botón exportar presionado");
      if (typeof exportarDatos === "function") {
        exportarDatos();
      } else {
        alert("❌ No se pudo ejecutar exportarDatos");
      }
    });
  }
};
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(reg => console.log('✅ SW registrado:', reg.scope))
      .catch(err => console.error('❌ Error registrando SW:', err));
  });
}
