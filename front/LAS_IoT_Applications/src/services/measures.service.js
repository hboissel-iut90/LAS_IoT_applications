import { getRequest } from './axios.service'

async function getTemperatures() {
  let service = '/temperature'
  let serviceName = 'GETTEMPERATURES'
  return await getRequest(service, serviceName)
}

async function getHumidities() {
  let service = '/humidity'
  let serviceName = 'GETHUMIDITIES'
  return await getRequest(service, serviceName)
}

async function getAccelerometers() {
  let service = '/accelerometer'
  let serviceName = 'GETACCELEROMETERS'
  return await getRequest(service, serviceName)
}

export default {
  getTemperatures,
  getHumidities,
  getAccelerometers,
}
