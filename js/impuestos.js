document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('tipoDeclaracion');
  const formIva = document.getElementById('formIva');
  const formD101 = document.getElementById('formD101');
  const resultado = document.getElementById('resultado');
  const mensajeResultado = document.getElementById('mensajeResultado');

  // Mostrar/ocultar formularios según el tipo de declaración
  select.addEventListener('change', () => {
    formIva.classList.add('oculto');
    formD101.classList.add('oculto');
    resultado.classList.add('oculto');

    if (select.value === 'iva') {
      formIva.classList.remove('oculto');
    } else if (select.value === 'd101') {
      formD101.classList.remove('oculto');
    }
  });

  // Cálculo de IVA
  document.getElementById('ivaForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const base13 = parseFloat(document.getElementById('gravado13').value) || 0;
    const base4  = parseFloat(document.getElementById('gravado4').value) || 0;
    const base2  = parseFloat(document.getElementById('gravado2').value) || 0;
    const base1  = parseFloat(document.getElementById('gravado1').value) || 0;
    const ivaSoportado = parseFloat(document.getElementById('ivaSoportado').value) || 0;

    const ivaDebito = base13 * 0.13 + base4 * 0.04 + base2 * 0.02 + base1 * 0.01;
    const saldo = ivaDebito - ivaSoportado;

    let texto = `IVA débito calculado: ₡${ivaDebito.toFixed(2)}. `;

    if (saldo > 0) {
      texto += `Saldo a pagar: ₡${saldo.toFixed(2)}.`;
    } else if (saldo < 0) {
      texto += `Saldo a favor: ₡${Math.abs(saldo).toFixed(2)}.`;
    } else {
      texto += "No hay saldo a pagar ni a favor.";
    }

    mensajeResultado.textContent = texto;
    resultado.classList.remove('oculto');
  });

  // Cálculo D-101
  document.getElementById('d101Form').addEventListener('submit', (e) => {
    e.preventDefault();

    const ingresos = parseFloat(document.getElementById('ingresos').value) || 0;
    const gastos   = parseFloat(document.getElementById('gastos').value) || 0;
    const pagos    = parseFloat(document.getElementById('pagosParciales').value) || 0;

    const utilidad = ingresos - gastos;
    const impuesto = utilidad * 0.15; 
    const saldo = impuesto - pagos;

    let texto = `Utilidad gravable: ₡${utilidad.toFixed(2)}. ` +
                `Impuesto calculado (15%): ₡${impuesto.toFixed(2)}. `;

    if (saldo > 0) {
      texto += `Saldo a pagar: ₡${saldo.toFixed(2)}.`;
    } else if (saldo < 0) {
      texto += `Saldo a favor: ₡${Math.abs(saldo).toFixed(2)}.`;
    } else {
      texto += "No hay saldo pendiente (impuesto cubierto).";
    }

    mensajeResultado.textContent = texto;
    resultado.classList.remove('oculto');
  });
});
