import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import getTemperatures from '@/services/measures.service'
import getHumidities from '@/services/measures.service'
import getAccelerometers from '@/services/measures.service'

export const useMesuresStore = defineStore('mesures', () => {
  // État global
  const measures = ref({
    temperatures: {},
    humidities: {},
    accelerometers: {},
  })

  const chargement = ref(false)
  const erreur = ref<string | null>(null)
  const derniereMiseAJour = ref<number | null>(null)

  // Valeurs calculées
  const nbTemperatures = computed(() => measures.value.temperatures.length)

  const nbHumidites = computed(() => measures.value.humidities.length)

  const nbAccelerations = computed(() => measures.value.accelerometers.length)

  const nbTotalMesures = computed(
    () => nbTemperatures.value + nbHumidites.value + nbAccelerations.value,
  )

  async function getDatas() {
    const temperatures = await getTemperatures()
    const humidities = await getHumidities()
    const accelerometers = await getAccelerometers()
    return { temperatures, humidities, accelerometers }
  }

  // Actions
  async function chargerMesures() {
    if (chargement.value) return

    chargement.value = true
    erreur.value = null

    try {
      const donnees = await getDatas()

      measures.value = donnees
      console.log('Mesures chargées avec succès :', measures.value)
      derniereMiseAJour.value = Date.now()
    } catch (err: unknown) {
      erreur.value = err instanceof Error ? err.message : 'Une erreur inconnue est survenue.'
    } finally {
      chargement.value = false
    }
  }

  function reinitialiserMesures() {
    measures.value = {
      temperatures: {},
      humidities: {},
      accelerometers: {},
    }

    erreur.value = null
    derniereMiseAJour.value = null
  }

  return {
    measures,
    chargement,
    erreur,
    derniereMiseAJour,

    nbTemperatures,
    nbHumidites,
    nbAccelerations,
    nbTotalMesures,

    chargerMesures,
    reinitialiserMesures,
  }
})
