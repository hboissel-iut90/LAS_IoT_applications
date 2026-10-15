<script setup>
import { ref, computed, onMounted } from 'vue'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
} from 'chart.js'

import 'chartjs-adapter-date-fns'
import { fr } from 'date-fns/locale'

import { Line } from 'vue-chartjs'

import { useMesuresStore } from '../stores/measures'
import { storeToRefs } from 'pinia'

// Enregistrement des composants Chart.js
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, LinearScale, TimeScale)

// Initialisation du store
const store = useMesuresStore()

const { measures, chargement, erreur, derniereMiseAJour, nbTotalMesures } = storeToRefs(store)

// Les actions peuvent être utilisées directement
const { chargerMesures } = store

// Chargement initial
onMounted(() => {
  chargerMesures()
})

console.log('Mesures store:', measures)

// Convertit un timestamp en millisecondes
function convertirTimestamp(timestamp) {
  if (typeof timestamp === 'number') {
    // Les timestamps numériques doivent être exprimés en millisecondes.
    // Pour des timestamps Unix en secondes, multiplier par 1000.
    return timestamp
  }

  return new Date(timestamp).getTime()
}

// Transforme une série de mesures en points Chart.js
function convertirSerie(tableau, cleValeur) {
  return tableau
    .map((mesure) => ({
      x: convertirTimestamp(mesure.timestamp),
      y: mesure[cleValeur],
    }))
    .filter((point) => Number.isFinite(point.x) && Number.isFinite(point.y))
    .sort((a, b) => a.x - b.x)
}

// Données des graphiques
const temperaturesData = computed(() => convertirSerie(measures.value.temperatures, 'value'))

const humiditesData = computed(() => convertirSerie(measures.value.humidites, 'value'))

const accelerationX = computed(() => convertirSerie(measures.value.accelerometre, 'x'))

const accelerationY = computed(() => convertirSerie(measures.value.accelerometre, 'y'))

const accelerationZ = computed(() => convertirSerie(measures.value.accelerometre, 'z'))

// Configuration commune de l'axe temporel
function creerAxeTemps() {
  return {
    type: 'time',
    adapters: {
      date: {
        locale: fr,
      },
    },
    time: {
      displayFormats: {
        minute: 'HH:mm',
        hour: 'dd/MM HH:mm',
        day: 'dd/MM',
      },
      tooltipFormat: 'dd/MM/yyyy HH:mm:ss',
    },
    title: {
      display: true,
      text: 'Timestamp',
    },
  }
}

// Configuration des options générales
function creerOptions(titre, axeY) {
  return {
    responsive: true,
    maintainAspectRatio: false,

    interaction: {
      mode: 'nearest',
      intersect: false,
    },

    plugins: {
      title: {
        display: true,
        text: titre,
      },
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },

    scales: {
      x: creerAxeTemps(),
      y: {
        title: {
          display: true,
          text: axeY,
        },
      },
    },
  }
}

// Graphique de température
const temperatureData = computed(() => ({
  datasets: [
    {
      label: 'Température (°C)',
      data: temperaturesData.value,
      borderColor: '#ef4444',
      backgroundColor: '#ef4444',
      tension: 0.2,
      pointRadius: 2,
    },
  ],
}))

const temperatureOptions = creerOptions('Évolution de la température', 'Température (°C)')

// Graphique d'humidité
const humiditeData = computed(() => ({
  datasets: [
    {
      label: 'Humidité (%)',
      data: humiditesData.value,
      borderColor: '#3b82f6',
      backgroundColor: '#3b82f6',
      tension: 0.2,
      pointRadius: 2,
    },
  ],
}))

const humiditeOptions = {
  ...creerOptions('Évolution de l’humidité', 'Humidité (%)'),
  scales: {
    x: creerAxeTemps(),
    y: {
      min: 0,
      max: 100,
      title: {
        display: true,
        text: 'Humidité (%)',
      },
    },
  },
}

// Graphique combiné : température + humidité
const meteoData = computed(() => ({
  datasets: [
    {
      label: 'Température (°C)',
      data: temperaturesData.value,
      borderColor: '#ef4444',
      backgroundColor: '#ef4444',
      yAxisID: 'yTemperature',
      tension: 0.2,
      pointRadius: 2,
    },
    {
      label: 'Humidité (%)',
      data: humiditesData.value,
      borderColor: '#3b82f6',
      backgroundColor: '#3b82f6',
      yAxisID: 'yHumidite',
      tension: 0.2,
      pointRadius: 2,
    },
  ],
}))

const meteoOptions = {
  responsive: true,
  maintainAspectRatio: false,

  interaction: {
    mode: 'index',
    intersect: false,
  },

  plugins: {
    title: {
      display: true,
      text: 'Température et humidité',
    },
    legend: {
      position: 'top',
    },
  },

  scales: {
    x: creerAxeTemps(),

    yTemperature: {
      type: 'linear',
      position: 'left',
      title: {
        display: true,
        text: 'Température (°C)',
      },
    },

    yHumidite: {
      type: 'linear',
      position: 'right',
      min: 0,
      max: 100,
      title: {
        display: true,
        text: 'Humidité (%)',
      },
      grid: {
        drawOnChartArea: false,
      },
    },
  },
}

// Graphique de l'accéléromètre
const accelerometreData = computed(() => ({
  datasets: [
    {
      label: 'Axe X',
      data: accelerationX.value,
      borderColor: '#ef4444',
      backgroundColor: '#ef4444',
      tension: 0.1,
      pointRadius: 0,
    },
    {
      label: 'Axe Y',
      data: accelerationY.value,
      borderColor: '#3b82f6',
      backgroundColor: '#3b82f6',
      tension: 0.1,
      pointRadius: 0,
    },
    {
      label: 'Axe Z',
      data: accelerationZ.value,
      borderColor: '#10b981',
      backgroundColor: '#10b981',
      tension: 0.1,
      pointRadius: 0,
    },
  ],
}))

const accelerometreOptions = creerOptions('Mesures de l’accéléromètre', 'Accélération')
</script>

<template>
  <section class="dashboard">
    <div class="dashboard-toolbar">
      <div class="toolbar-text">
        <h2>Mesures des capteurs</h2>
        <p>Visualisation des données enregistrées</p>
      </div>

      <button type="button" class="refresh-button" :disabled="chargement" @click="chargerMesures">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          :class="{ spinning: chargement }"
          aria-hidden="true"
        >
          <path d="M20 7v5h-5" />
          <path d="M4 17v-5h5" />
          <path d="M5.64 9A7 7 0 0 1 17.5 5.5L20 12M4 12l2.5 6.5A7 7 0 0 0 18.36 15" />
        </svg>

        <span>{{ chargement ? 'Actualisation...' : 'Actualiser' }}</span>
      </button>
    </div>

    <div v-if="chargement" class="status-message loading-message">
      <span class="loader"></span>
      <span>Chargement des mesures...</span>
    </div>

    <div v-if="erreur" class="status-message error-message" role="alert">
      <span class="error-icon">!</span>

      <div>
        <strong>Impossible de récupérer les données</strong>
        <p>{{ erreur }}</p>
      </div>
    </div>

    <div v-if="!chargement" class="charts">
      <section class="chart-card">
        <div class="chart-container">
          <Line :data="temperatureData" :options="temperatureOptions" />
        </div>
      </section>

      <section class="chart-card">
        <div class="chart-container">
          <Line :data="humiditeData" :options="humiditeOptions" />
        </div>
      </section>

      <section class="chart-card full-width">
        <div class="chart-container">
          <Line :data="meteoData" :options="meteoOptions" />
        </div>
      </section>

      <section class="chart-card full-width">
        <div class="chart-container">
          <Line :data="accelerometreData" :options="accelerometreOptions" />
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.dashboard {
  width: 100%;
  min-width: 0;
}

/* Barre d'outils */

.dashboard-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;

  margin-bottom: 24px;
}

.toolbar-text {
  min-width: 0;
}

.toolbar-text h2 {
  margin: 0;
  color: #0f172a;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.3px;
}

.toolbar-text p {
  margin: 6px 0 0;
  color: #64748b;
  font-size: 13px;
  line-height: 1.5;
}

/* Bouton */

.refresh-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  flex-shrink: 0;

  min-height: 42px;
  padding: 0 17px;

  color: #ffffff;
  background: #2563eb;
  border: 1px solid #2563eb;
  border-radius: 10px;

  font-size: 13px;
  font-weight: 650;

  cursor: pointer;
  transition:
    background 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.refresh-button:hover:not(:disabled) {
  background: #1d4ed8;
  box-shadow: 0 4px 12px rgb(37 99 235 / 20%);
}

.refresh-button:active:not(:disabled) {
  transform: translateY(1px);
}

.refresh-button:focus-visible {
  outline: 3px solid rgb(59 130 246 / 35%);
  outline-offset: 3px;
}

.refresh-button:disabled {
  opacity: 0.65;
  cursor: wait;
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Grille des graphiques */

.charts {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;

  width: 100%;
  min-width: 0;
}

.chart-card {
  position: relative;
  min-width: 0;
  min-height: 0;
  height: clamp(300px, 30vw, 390px);

  padding: 20px;

  background: #ffffff;
  border: 1px solid #e5eaf2;
  border-radius: 16px;

  box-shadow:
    0 2px 5px rgb(15 23 42 / 2%),
    0 8px 24px rgb(15 23 42 / 3%);

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.chart-card:hover {
  border-color: #d6dfed;
  box-shadow:
    0 3px 8px rgb(15 23 42 / 3%),
    0 12px 28px rgb(15 23 42 / 5%);
}

.chart-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
}

.full-width {
  grid-column: 1 / -1;
  height: clamp(320px, 36vw, 430px);
}

/* Chargement et erreurs */

.status-message {
  display: flex;
  align-items: center;
  gap: 12px;

  margin: 0 0 20px;
  padding: 15px 18px;

  border: 1px solid;
  border-radius: 12px;

  font-size: 13px;
  line-height: 1.5;
}

.loading-message {
  color: #1d4ed8;
  background: #eff6ff;
  border-color: #dbeafe;
}

.loader {
  width: 18px;
  height: 18px;
  flex-shrink: 0;

  border: 2px solid #bfdbfe;
  border-top-color: #2563eb;
  border-radius: 50%;

  animation: spin 0.8s linear infinite;
}

.error-message {
  align-items: flex-start;
  color: #991b1b;
  background: #fef2f2;
  border-color: #fecaca;
}

.error-icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;

  width: 22px;
  height: 22px;

  color: #ffffff;
  background: #dc2626;
  border-radius: 50%;

  font-size: 13px;
  font-weight: 700;
}

.error-message strong {
  display: block;
  margin-bottom: 4px;
}

.error-message p {
  margin: 0;
  overflow-wrap: anywhere;
}

/* Écrans intermédiaires */

@media (max-width: 1024px) {
  .charts {
    gap: 16px;
  }

  .chart-card {
    height: 330px;
    padding: 16px;
    border-radius: 14px;
  }

  .full-width {
    height: 350px;
  }
}

/* Tablettes et smartphones */

@media (max-width: 700px) {
  .dashboard-toolbar {
    align-items: flex-start;
    gap: 14px;
    margin-bottom: 18px;
  }

  .toolbar-text h2 {
    font-size: 17px;
  }

  .toolbar-text p {
    font-size: 12px;
  }

  .charts {
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
  }

  .chart-card,
  .full-width {
    grid-column: auto;
    width: 100%;
    height: 320px;
    padding: 14px;
    border-radius: 13px;
  }
}

/* Petits smartphones */

@media (max-width: 420px) {
  .dashboard-toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .refresh-button {
    width: 100%;
    min-height: 44px;
  }

  .charts {
    gap: 12px;
  }

  .chart-card,
  .full-width {
    height: 290px;
    padding: 10px;
    border-radius: 12px;
  }

  .status-message {
    padding: 12px;
    font-size: 12px;
  }
}

/* Accessibilité */

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
