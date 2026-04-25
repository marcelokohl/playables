# Playables Portfolio

This repository contains interactive test cases and projects for playable ads, focused on aggressive optimization for low-latency web environments.

## Optimization Goals: Single-File HTML5
The primary technical focus is delivering complex 3D experiences within a **single-file HTML5** structure. These projects are optimized to comply with the strict size constraints (ranging from **<2MB to 5MB**) and technical requirements of major ad networks.

## Tech Stack & Skills
*   **Engine**: PlayCanvas (WebGL/3D)
*   **Core**: HTML5, Modern JavaScript, CSS3
*   **Optimization**: Tree-shaking, Asset-to-Base64 encoding, Shader Minification, and GLSL optimization.
*   **Build Pipeline**: Custom **playables-builder** built on **Vite** for automated single-file bundling.
*   **Network Compatibility**: Tailored builds for Google, Meta, AppLovin, and IronSource.

## Technical Workflow
Each project follows a hybrid development process:

1.  **PlayCanvas API & Editor**: Scenes are authored using the PlayCanvas engine, utilizing its entity-component system and rendering pipeline.
2.  **playables-builder Integration**: A custom pipeline processes the export for production:
    *   **Base64 Asset Embedding**: All binary data (textures, models, sounds) is encoded directly into the HTML to eliminate external requests.
    *   **Shader Minification**: GLSL code compression to reduce final bundle size without rendering loss.
    *   **Automated Compression**: Final pass asset optimization for deployment.

## Live Demo
Check out the live projects and technical tests here: [marcelokohl.github.io/playables/](https://marcelokohl.github.io/playables/)

