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

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="project-overlay.css">
            <div id="project-overlay">
                <div class="overlay-controls">
                    <a href="index.html">← BACK</a>
                    <button id="toggle-btn">—</button>
                </div>
                
                <div id="project-overlay-body">
                    <strong>${title}</strong>
                    <span>${description}</span>
                    <small>${size} KB</small>
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
