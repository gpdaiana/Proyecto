// Módulo de reportes
// Este script lee las facturas almacenadas localmente y calcula balances y resultados. Permite exportar el resumen a un PDF.

document.addEventListener('DOMContentLoaded', () => {
    const resumenBalances = document.getElementById('resumenBalances');
    const resumenResultados = document.getElementById('resumenResultados');
    const btnExportar = document.getElementById('btnExportar');

    function cargarDatos() {
        const facturas = JSON.parse(localStorage.getItem('facturas') ?? '[]');
        const totalFacturas = facturas.length;
        const totalNeto = facturas.reduce((s, f) => s + f.montoNeto, 0);
        const totalIVA = facturas.reduce((s, f) => s + f.iva, 0);
        const totalGeneral = facturas.reduce((s, f) => s + f.total, 0);
        const pagadas = facturas.filter(f => f.pagado).length;
        const pendientes = totalFacturas - pagadas;
        resumenBalances.innerHTML = '';
        resumenBalances.innerHTML += `<li>Total de facturas: ${totalFacturas}</li>`;
        resumenBalances.innerHTML += `<li>Facturas pagadas: ${pagadas}</li>`;
        resumenBalances.innerHTML += `<li>Facturas pendientes: ${pendientes}</li>`;
        resumenBalances.innerHTML += `<li>Total neto acumulado: ₡${totalNeto.toFixed(2)}</li>`;
        resumenBalances.innerHTML += `<li>Total IVA acumulado: ₡${totalIVA.toFixed(2)}</li>`;
        resumenBalances.innerHTML += `<li>Total general acumulado: ₡${totalGeneral.toFixed(2)}</li>`;
        resumenResultados.innerHTML = '';
        resumenResultados.innerHTML += `<li>IVA recaudado (13 %): ₡${totalIVA.toFixed(2)}</li>`;
        resumenResultados.innerHTML += `<li>Ingresos totales (neto + IVA): ₡${totalGeneral.toFixed(2)}</li>`;
    }

    function exportarPDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text('Resumen de facturas', 10, 10);
        let y = 20;
        const items = [...resumenBalances.querySelectorAll('li'), ...resumenResultados.querySelectorAll('li')];
        items.forEach(item => {
            doc.setFontSize(12);
            doc.text(item.textContent, 10, y);
            y += 8;
        });
        doc.save('reportes.pdf');
    }

    btnExportar.addEventListener('click', exportarPDF);
    cargarDatos();
});