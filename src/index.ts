/**
 * Main entry point for the india-state-district package
 * Exports all public functionality
 */

import { createIndiaStateDistrict } from "./services/india-state-district.factory"
import { IndiaStateDistrict } from "./services/india-state-district.service"
import { State, StateData, GeolocationResult, GeolocationOptions, GeolocationError } from "./types"
import {
  INDIA_FLAG_SVG,
  INDIA_FLAG_COLORS,
  getIndiaFlagSVG,
  getIndiaFlagDataUrl,
} from "./assets/india-flag"

// Create default instance
const india = createIndiaStateDistrict()

// Export direct utility functions from default instance
export const getDistricts = (stateCode: string) =>
  india.getDistrictsForState(stateCode)
export const getAllStates = () => india.getAllStates()
export const getAllStateCodes = () => india.getAllStateCodes()
export const getCurrentState = () => india.getCurrentState()
export const getAllStatesWithDistricts = () => india.getAllStatesWithDistricts()

//<----- Geolocation exports ----->
export const detectStateFromLocation = (options?: GeolocationOptions) =>
  india.detectStateFromLocation(options)
export const isGeolocationSupported = () => india.isGeolocationSupported()

// Export factory function for creating new instances
export { createIndiaStateDistrict }

// Export types and service class for advanced usage
export { IndiaStateDistrict }
export type { State, StateData, GeolocationResult, GeolocationOptions, GeolocationError }

// Export flag-related utilities
export {
  INDIA_FLAG_SVG,
  INDIA_FLAG_COLORS,
  getIndiaFlagSVG,
  getIndiaFlagDataUrl,
}

// Export default instance
export default india
