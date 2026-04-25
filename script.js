const simulator = document.getElementById('simulator');
const simulatorIframe = document.getElementById('simulator-iframe');
const simulatorFrame = document.getElementById('simulator-frame');
const deviceSelector = document.getElementById('simulator-device-selector');
const btnExternal = document.getElementById('simulator-open-external');
const btnBack = document.getElementById('simulator-back');

// Elementos da caixinha de info
const infoTitle = document.getElementById('simulator-info-title');
const infoDesc = document.getElementById('simulator-info-desc');
const infoSize = document.getElementById('simulator-info-size');

let currentUrl = '';

const resolutions = {
    "390x844": { w: 390, h: 844 },
    "360x800": { w: 360, h: 800 },
    "820x1180": { w: 820, h: 1180 },
    "fill": { w: "100%", h: "100%" }
};

function updateFrameSize(resKey) {
    const res = resolutions[resKey];
    const body = document.getElementById('simulator-body');
    const padding = 40;

    if (!res) return;

    if (res.w === "100%") {
        simulatorFrame.style.width = "100%";
        simulatorFrame.style.height = "100%";
        simulatorFrame.style.borderRadius = "0";
        simulatorFrame.style.border = "none";
        simulatorFrame.style.transform = "scale(1)";
    } else {
        const realW = res.w + 24;
        const realH = res.h + 24;
        const availW = body.clientWidth - padding;
        const availH = body.clientHeight - padding;
        const scale = Math.min(availW / realW, availH / realH, 1);

        simulatorFrame.style.width = res.w + "px";
        simulatorFrame.style.height = res.h + "px";
        simulatorFrame.style.borderRadius = "36px";
        simulatorFrame.style.border = "12px solid var(--phone-border)";
        simulatorFrame.style.transform = `scale(${scale})`;
        simulatorFrame.style.transformOrigin = "center center";
    }
}

window.openProject = function (url, title, desc, size) {
    currentUrl = url;
    simulatorIframe.src = url;

    // Preenche as infos
    infoTitle.innerText = title;
    infoDesc.innerText = desc;
    infoSize.innerText = size;

    simulator.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        if (window.innerWidth <= 600) {
            updateFrameSize('fill');
        } else {
            updateFrameSize(deviceSelector.value);
        }
    }, 10);
};

window.addEventListener('resize', () => {
    if (simulator.style.display === 'flex') {
        updateFrameSize(deviceSelector.value);
    }
});

if (deviceSelector) {
    deviceSelector.onchange = () => updateFrameSize(deviceSelector.value);
}

if (btnExternal) {
    btnExternal.onclick = () => window.open(currentUrl, '_blank');
}

if (btnBack) {
    btnBack.onclick = () => {
        simulator.style.display = 'none';
        simulatorIframe.src = '';
        document.body.style.overflow = 'auto';
    };
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && btnBack) btnBack.click();
});
