document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.row.g-5');        // contenedor de cards
    const paginador = document.querySelector('.paginador');  // nav del paginador

    async function cargarPagina(page) {
        // 1. Pedir datos al servidor
        const res = await fetch(`/api/mascotas?page=${page}&limit=6`);
        const data = await res.json();

        // 2. Reconstruir las cards con los nuevos datos
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
                    </div>
                </div>
            </div>
        `).join('');

        // 3. Actualizar el paginador
        paginador.innerHTML = `
            ${data.hasPrev ? `<a href="#" class="btn-paginador" data-page="${data.prevPage}">← Anterior</a>` : ''}
            <span class="pagina-actual">Página ${data.currentPage} de ${data.totalPages}</span>
            ${data.hasNext ? `<a href="#" class="btn-paginador" data-page="${data.nextPage}">Siguiente →</a>` : ''}
        `;

        // 4. Scroll suave al grid
        document.querySelector('#mascotas').scrollIntoView({ behavior: 'smooth' });
    }

    // 5. Interceptar clics en el paginador (event delegation)
    paginador.addEventListener('click', (e) => {
        e.preventDefault();
        const btn = e.target.closest('[data-page]');
        if (btn) cargarPagina(parseInt(btn.dataset.page));
    });
});