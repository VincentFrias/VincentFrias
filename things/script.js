async function loadProjects() {
    const username = "VincentFrias";
    const apiURL = `https://api.github.com/users/${username}/repos`;

    const loader = document.getElementById("loader");
    loader.style.display = "block"; // Mostra loader

    try {
        const response = await fetch(apiURL);
        const repos = await response.json();

        const container = document.getElementById("projects-container");

        repos.forEach((repo, index) => {
            const col = document.createElement("div");
            col.classList.add("col-md-4", "fade-in");
            col.style.animationDelay = `${index * 0.2}s`; // Delay para animação sequencial

            col.innerHTML = `
                <div class="card bg-secondary text-white project-card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${repo.name}</h5>
                        <p class="card-text">${repo.description || "Sem descrição disponível."}</p>
                        <a href="${repo.html_url}" 
                           target="_blank"
                           class="btn btn-light">
                           Ver Repositório <i class="fab fa-github ms-2"></i>
                        </a>
                    </div>
                </div>
            `;

            container.appendChild(col);
        });

    } catch (error) {
        console.error("Erro ao carregar projetos:", error);
        container.innerHTML = '<p class="text-center text-danger">Erro ao carregar projetos. Tente novamente mais tarde.</p>';
    } finally {
        loader.style.display = "none"; // Esconde loader
    }
}

loadProjects();