document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.row.g-5');        // contenedor de cards
    const paginador = document.querySelector('.paginador');  // nav del paginador

    async function cargarPagina(page) {
        // 1. Pedir datos al servidor
        const res = await fetch(`/api/mascotas?page=${page}&limit=6`);
        const data = await res.json();

        // 2. Reconstruir las cards con los nuevos datos del servidor sin recargar la página
        grid.innerHTML = data.mascotas.map(mascota => `
            <div class="col-lg-4 col-md-6 col-sm-12">
                <div class="card card-mascota">
                    <div class="card-img-contenedor">
                        <img src="${mascota.imagen}" class="card-img-top" alt="${mascota.nombre}" onerror="this.src='/img/mascotas.png'">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${mascota.nombre}</h5>
                        <p class="card-info">${mascota.tipo} · ${mascota.edad} años</p>
                        <p class="card-desc">${mascota.descripcion || ''}</p>
                         <button class="btn-eliminar" data-id="${mascota._id}">Eliminar</button>
                    </div>
                </div>
            </div>
        `).join('');

        // 3. Actualizar los botones del paginador (Anterior/Siguiente) según la página actual
        paginador.innerHTML = `
            ${data.hasPrev ? `<a href="#" class="btn-paginador" data-page="${data.prevPage}">← Anterior</a>` : ''}
            <span class="pagina-actual">Página ${data.currentPage} de ${data.totalPages}</span>
            ${data.hasNext ? `<a href="#" class="btn-paginador" data-page="${data.nextPage}">Siguiente →</a>` : ''}
        `;

        // 4. Scroll suave al grid de mascotas (evita saltar al inicio de la página)
        document.querySelector('#mascotas').scrollIntoView({ behavior: 'smooth' });
    }

    // 5. Event delegation para botón eliminar (funciona en cards iniciales y paginadas)
    grid.addEventListener('click', async (e) => {
        const btn = e.target.closest('.btn-eliminar');
        if (!btn) return;

        const result = await Swal.fire({
            title: '¿Eliminar mascota?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ff4d4d',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (!result.isConfirmed) return;

        const id = btn.dataset.id;
        const token = localStorage.getItem('token');
        const res = await fetch(`/mascotas/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + token }
        });

        if (res.ok) {
            Swal.fire('Eliminado', 'La mascota fue eliminada', 'success');
            const paginaActual = document.querySelector('.pagina-actual');
            const match = paginaActual?.textContent.match(/Página (\d+)/);
            const page = match ? parseInt(match[1]) : 1;
            cargarPagina(page);
        } else {
            Swal.fire('Error', 'No se pudo eliminar la mascota', 'error');
        }
    });

    // 6. Interceptar clics en el paginador (event delegation)
    paginador.addEventListener('click', (e) => {
        e.preventDefault();
        const btn = e.target.closest('[data-page]');
        if (btn) cargarPagina(parseInt(btn.dataset.page));
    });
});