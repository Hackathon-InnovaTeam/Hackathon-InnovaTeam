document.addEventListener("DOMContentLoaded", function() {
    let favoritosContainer = document.getElementById("favoritos-list");
    console.log(favoritosContainer)
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (favoritos.length === 0) {
       // favoritosContainer.innerHTML = "<p>No hay favoritos guardados.</p>";
    } else {
        favoritos.forEach((favorito) => {
            let favoritoItem = document.createElement("li");
            favoritoItem.className = "favorito-item";
            favoritoItem.innerHTML = `
                <strong>${favorito.nombre}</strong>
                <span>(${favorito.coordenadas.lat}, ${favorito.coordenadas.lng})</span>
                <button class="eliminar-btn"><i class="fa-regular fa-trash-can"></i></button>
            `;

            // Añadir evento de clic al botón de eliminación
            let eliminarBtn = favoritoItem.querySelector(".eliminar-btn");
            eliminarBtn.addEventListener("click", function() {
                let index = favoritos.findIndex(f => f.nombre === favorito.nombre && f.coordenadas.lat === favorito.coordenadas.lat && f.coordenadas.lng === favorito.coordenadas.lng);
                if (index !== -1) {
                    favoritos.splice(index, 1);
                    localStorage.setItem("favoritos", JSON.stringify(favoritos));
                    favoritoItem.remove();
                }
            });

            favoritosContainer.appendChild(favoritoItem);
        });
    }
});
