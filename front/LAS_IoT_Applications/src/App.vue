<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Charts from './components/Charts.vue'
</script>

<template>
  <div class="app">
    <header class="app-header">
      <div class="header-content">
        <div class="brand">
          <div class="brand-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M3 3v18h18" />
              <path d="m19 9-5 5-4-4-5 5" />
            </svg>
          </div>

          <div class="brand-text">
            <span class="eyebrow">SUPERVISION · IoT</span>
            <h1>Tableau de bord</h1>
            <p>Surveillance de vos capteurs en temps réel</p>
          </div>
        </div>

        <div class="header-status">
          <span class="status-dot"></span>
          <span>Monitoring</span>
        </div>
      </div>
    </header>

    <main class="main-content">
      <section class="page-intro">
        <div>
          <h2>Vue d'ensemble</h2>
          <p>Consultez les données collectées par vos capteurs.</p>
        </div>
      </section>

      <Charts />
    </main>

    <footer class="app-footer">
      <span>Supervision des capteurs</span>
      <span class="footer-separator">·</span>
      <span>Plateforme de monitoring IoT</span>
    </footer>
  </div>
</template>

<style>
:root {
  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: #0f172a;
  background: #f4f7fb;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

html {
  min-width: 320px;
  min-height: 100%;
}

body {
  min-width: 320px;
  min-height: 100vh;
  margin: 0;
}

body,
button {
  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
}

button {
  font: inherit;
}

#app {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

/* En-tête */

.app-header {
  width: 100%;
  background: #ffffff;
  border-bottom: 1px solid #e8edf4;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  width: 100%;
  max-width: 1800px;
  min-height: 112px;
  margin: 0 auto;
  padding: 24px clamp(16px, 4vw, 64px);
}

.brand {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;
}

.brand-icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;

  width: 52px;
  height: 52px;

  color: #ffffff;
  background: linear-gradient(135deg, #2563eb, #4f46e5);
  border-radius: 15px;
  box-shadow: 0 5px 14px rgb(37 99 235 / 20%);
}

.brand-text {
  min-width: 0;
}

.eyebrow {
  display: block;
  margin-bottom: 6px;

  color: #2563eb;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.8px;
}

.app-header h1 {
  margin: 0;
  color: #0f172a;
  font-size: clamp(21px, 2.5vw, 30px);
  font-weight: 750;
  letter-spacing: -0.8px;
  line-height: 1.25;
}

.app-header p {
  margin: 6px 0 0;
  color: #64748b;
  font-size: 14px;
  line-height: 1.5;
}

.header-status {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  flex-shrink: 0;

  padding: 10px 14px;
  color: #166534;
  background: #f0fdf4;
  border: 1px solid #dcfce7;
  border-radius: 999px;

  font-size: 12px;
  font-weight: 650;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #22c55e;
  border-radius: 50%;
}

/* Contenu */

.main-content {
  flex: 1;
  width: 100%;
  max-width: 1800px;
  margin: 0 auto;
  padding: 32px clamp(16px, 4vw, 64px);
}

.page-intro {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.page-intro h2 {
  margin: 0;
  color: #0f172a;
  font-size: clamp(20px, 2vw, 25px);
  font-weight: 750;
  letter-spacing: -0.5px;
}

.page-intro p {
  margin: 7px 0 0;
  color: #64748b;
  font-size: 14px;
  line-height: 1.6;
}

/* Pied de page */

.app-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;

  padding: 20px 16px;
  color: #94a3b8;
  background: #ffffff;
  border-top: 1px solid #e8edf4;

  font-size: 12px;
  text-align: center;
}

.footer-separator {
  color: #cbd5e1;
}

/* Tablettes */

@media (max-width: 768px) {
  .header-content {
    min-height: auto;
    padding: 22px 20px;
  }

  .brand {
    gap: 12px;
  }

  .brand-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
  }

  .header-status {
    padding: 8px 10px;
  }

  .main-content {
    padding: 24px 20px;
  }
}

/* Smartphones */

@media (max-width: 540px) {
  .header-content {
    align-items: flex-start;
    gap: 12px;
    padding: 20px 16px;
  }

  .brand {
    gap: 10px;
  }

  .brand-icon {
    width: 38px;
    height: 38px;
    border-radius: 10px;
  }

  .brand-icon svg {
    width: 22px;
    height: 22px;
  }

  .eyebrow {
    margin-bottom: 5px;
    font-size: 9px;
    letter-spacing: 1.2px;
  }

  .app-header h1 {
    font-size: 20px;
    letter-spacing: -0.5px;
  }

  .app-header p {
    max-width: 230px;
    font-size: 12px;
  }

  .header-status {
    gap: 6px;
    padding: 7px 9px;
    font-size: 10px;
  }

  .status-dot {
    width: 7px;
    height: 7px;
  }

  .main-content {
    padding: 24px 12px;
  }

  .page-intro {
    margin-bottom: 18px;
  }

  .page-intro h2 {
    font-size: 20px;
  }

  .page-intro p {
    font-size: 12px;
  }

  .app-footer {
    gap: 5px;
    padding: 16px 12px;
    font-size: 10px;
  }
}

/* Très petits écrans */

@media (max-width: 360px) {
  .header-content {
    padding: 16px 12px;
  }

  .header-status {
    padding: 6px 7px;
    font-size: 9px;
  }

  .brand {
    gap: 8px;
  }

  .brand-icon {
    width: 34px;
    height: 34px;
  }

  .app-header h1 {
    font-size: 18px;
  }

  .app-header p {
    font-size: 11px;
  }
}
</style>
