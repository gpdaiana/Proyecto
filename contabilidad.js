// Módulo de gestión contable
// Este script maneja el registro de facturas, cálculo de IVA y almacenamiento local en el navegador. No se comunica con servidores y sólo trabaja con datos locales.

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('facturaForm');
    const tabla = document.getElementById('tablaFacturas').querySelector('tbody');
    let facturas = JSON.parse(localStorage.getItem('facturas') ?? '[]');

    function render() {
        tabla.innerHTML = '';
        facturas.forEach((factura, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${factura.numero}</td>
                <td>${factura.cliente}</td>
                <td>${factura.fecha}</td>
                <td>₡${factura.montoNeto.toFixed(2)}</td>
                <td>₡${factura.iva.toFixed(2)}</td>
                <td>₡${factura.total.toFixed(2)}</td>
                <td>${factura.pagado ? 'Pagada' : 'Pendiente'}</td>
                <td>
                    <button class="btn-principal" data-accion="toggle" data-index="${index}">
                        ${factura.pagado ? 'Marcar pendiente' : 'Marcar pagada'}
                    </button>
                    <button class="btn-eliminar" data-accion="eliminar" data-index="${index}">Eliminar</button>
                </td>
            `;
            tabla.appendChild(row);
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const numero = document.getElementById('numeroFactura').value.trim();
        const cliente = document.getElementById('clienteFactura').value.trim();
        const fecha = document.getElementById('fechaFactura').value;
        const montoNeto = parseFloat(document.getElementById('montoNeto').value) || 0;
        const iva = montoNeto * 0.13;
        const total = montoNeto + iva;
        facturas.push({ numero, cliente, fecha, montoNeto, iva, total, pagado: false });
        localStorage.setItem('facturas', JSON.stringify(facturas));
        form.reset();
        render();
    });

    tabla.addEventListener('click', (e) => {
        const target = e.target;
        const index = target.getAttribute('data-index');
        const accion = target.getAttribute('data-accion');
        if (index === null || accion === null) return;
        if (accion === 'eliminar') {
            facturas.splice(index, 1);
        } else if (accion === 'toggle') {
            facturas[index].pagado = !facturas[index].pagado;
        }
        localStorage.setItem('facturas', JSON.stringify(facturas));
        render();
    });

    render();
});