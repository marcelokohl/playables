class ProjectOverlay extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }); // Isolamento de CSS
    }

    connectedCallback() {
        // Se estiver no Dashboard (dentro de outro iframe), esconde
        if (window.self !== window.top) {
            this.style.display = 'none';
            return;
        }

        const title = this.getAttribute('title') || 'PROJECT';
        const description = this.getAttribute('description') || '';
        const size = this.getAttribute('size') || '0';

        // Detecta se estamos em modo Dev ou se o título indica Dev
        const isDev = window.location.hostname === 'localhost' || title.includes('[DEV]');
        const cssPath = isDev ? '/project-overlay.css' : 'project-overlay.css';
        const backLink = isDev ? '/index.html' : 'index.html';

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="${cssPath}">


            <div id="project-overlay">
                <div class="overlay-controls">
                    <a href="${backLink}">← BACK</a>
                    <button id="toggle-btn">—</button>
                </div>

                
                <div id="project-overlay-body">
                    <strong>${title}</strong>
                    <span>${description}</span>
                    <small>${size}</small>

                </div>
            </div>
        `;

        // Lógica de condensar
        const btn = this.shadowRoot.getElementById('toggle-btn');
        const body = this.shadowRoot.getElementById('project-overlay-body');
        
        btn.onclick = () => {
            if (body.style.display === 'none') {
                body.style.display = 'flex';
                btn.innerText = '—';
            } else {
                body.style.display = 'none';
                btn.innerText = '+';
            }
        };
    }
}

customElements.define('project-overlay', ProjectOverlay);
