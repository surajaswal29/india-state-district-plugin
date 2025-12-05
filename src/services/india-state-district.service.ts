import { State, StateData, GeolocationResult, GeolocationOptions, GeolocationError } from "../types"
import { STATE_NAMES } from "../types"
import IN_STATES_AND_DISTRICTS from "../data/data.json"

//<----- State Bounding Boxes for Reverse Geocoding ----->
//<----- Ordered by area (smallest first) to handle overlapping boundaries ----->
const STATE_BOUNDARIES: Array<{ code: string; minLat: number; maxLat: number; minLng: number; maxLng: number }> = [
  //<----- Small UTs first (most specific) ----->
  { code: "CH", minLat: 30.67, maxLat: 30.78, minLng: 76.68, maxLng: 76.87 },
  { code: "DL", minLat: 28.40, maxLat: 28.95, minLng: 76.80, maxLng: 77.35 },
  { code: "GA", minLat: 14.87, maxLat: 15.80, minLng: 73.68, maxLng: 74.34 },
  { code: "PY", minLat: 10.76, maxLat: 12.03, minLng: 79.61, maxLng: 79.95 },
  { code: "DH", minLat: 20.06, maxLat: 20.77, minLng: 72.84, maxLng: 73.22 },
  { code: "LD", minLat: 8.26, maxLat: 12.45, minLng: 71.73, maxLng: 74.00 },
  { code: "AN", minLat: 6.76, maxLat: 13.68, minLng: 92.19, maxLng: 94.27 },
  { code: "SK", minLat: 27.08, maxLat: 28.13, minLng: 88.01, maxLng: 88.92 },
  //<----- Smaller states ----->
  { code: "TR", minLat: 22.94, maxLat: 24.53, minLng: 91.15, maxLng: 92.34 },
  { code: "MZ", minLat: 21.95, maxLat: 24.52, minLng: 92.26, maxLng: 93.44 },
  { code: "NL", minLat: 25.20, maxLat: 27.04, minLng: 93.33, maxLng: 95.24 },
  { code: "MN", minLat: 23.83, maxLat: 25.68, minLng: 92.98, maxLng: 94.78 },
  { code: "ML", minLat: 25.02, maxLat: 26.12, minLng: 89.81, maxLng: 92.80 },
  //<----- Medium states with distinct boundaries ----->
  { code: "KL", minLat: 8.18, maxLat: 12.79, minLng: 74.86, maxLng: 77.41 },
  { code: "TN", minLat: 8.07, maxLat: 13.56, minLng: 76.23, maxLng: 80.35 },
  { code: "KA", minLat: 11.59, maxLat: 18.45, minLng: 74.05, maxLng: 78.58 },
  { code: "TG", minLat: 15.83, maxLat: 19.92, minLng: 77.27, maxLng: 81.33 },
  { code: "AP", minLat: 12.41, maxLat: 19.07, minLng: 76.76, maxLng: 84.71 },
  { code: "AR", minLat: 26.65, maxLat: 29.47, minLng: 91.55, maxLng: 97.42 },
  { code: "AS", minLat: 24.13, maxLat: 28.00, minLng: 89.70, maxLng: 96.02 },
  { code: "BR", minLat: 24.28, maxLat: 27.52, minLng: 83.32, maxLng: 88.30 },
  { code: "CG", minLat: 17.78, maxLat: 24.12, minLng: 80.24, maxLng: 84.40 },
  { code: "GJ", minLat: 20.05, maxLat: 24.71, minLng: 68.10, maxLng: 74.48 },
  { code: "HR", minLat: 27.65, maxLat: 30.93, minLng: 74.46, maxLng: 77.60 },
  { code: "HP", minLat: 30.38, maxLat: 33.26, minLng: 75.57, maxLng: 79.00 },
  { code: "JH", minLat: 21.95, maxLat: 25.35, minLng: 83.32, maxLng: 87.97 },
  { code: "MH", minLat: 15.60, maxLat: 22.03, minLng: 72.60, maxLng: 80.90 },
  { code: "OD", minLat: 17.78, maxLat: 22.57, minLng: 81.34, maxLng: 87.53 },
  { code: "PB", minLat: 29.53, maxLat: 32.51, minLng: 73.87, maxLng: 76.94 },
  { code: "WB", minLat: 21.52, maxLat: 27.22, minLng: 85.82, maxLng: 89.88 },
  //<----- Large states ----->
  { code: "RJ", minLat: 23.05, maxLat: 30.20, minLng: 69.48, maxLng: 78.27 },
  { code: "MP", minLat: 21.07, maxLat: 26.87, minLng: 74.03, maxLng: 82.82 },
  { code: "UP", minLat: 23.87, maxLat: 30.41, minLng: 77.09, maxLng: 84.64 },
  { code: "UK", minLat: 28.72, maxLat: 31.46, minLng: 77.58, maxLng: 81.03 },
  { code: "JK", minLat: 32.27, maxLat: 37.05, minLng: 73.75, maxLng: 80.30 },
  { code: "LA", minLat: 32.15, maxLat: 37.05, minLng: 75.38, maxLng: 80.30 },
]

/**
 * IndiaStateDistrict class provides functionality to manage and retrieve
 * Indian states and their districts data.
 *
 * @class
 * @description
 * This class handles operations related to Indian states and districts,
 * including getting state lists, district lists, and managing current state selection.
 *
 * @example
 * ```typescript
 * const india = new IndiaStateDistrict();
 * const districts = india.setStateCode('KA'); // Get Karnataka districts
 * ```
 */
export class IndiaStateDistrict {
  /** Raw data containing state codes and their districts */
  private rawData: StateData

  /** Currently selected state code */
  private currentStateCode: string | null = null

  /**
   * Initializes a new instance of IndiaStateDistrict
   * Loads the state and district data internally
   */
  constructor() {
    this.rawData = IN_STATES_AND_DISTRICTS
  }

  /**
   * Sets the current state code and returns its districts
   *
   * @param stateCode - The code of the state to set (e.g., 'KA' for Karnataka)
   * @returns Array of district names for the selected state
   * @throws Error if the state code is invalid
   *
   * @example
   * ```typescript
   * const districts = india.setStateCode('KA');
   * console.log(districts); // ['Bangalore', 'Mysore', ...]
   * ```
   */
  public setStateCode(stateCode: string): string[] {
    if (!this.rawData[stateCode]) {
      throw new Error(`Invalid state code: ${stateCode}`)
    }
    this.currentStateCode = stateCode
    return this.getDistricts()
  }

  /**
   * Gets the districts of the currently selected state
   *
   * @returns Array of district names for the current state
   * If no state is selected, returns an empty array
   */
  public getDistricts(): string[] {
    if (!this.currentStateCode) return []
    return [...this.rawData[this.currentStateCode]]
  }

  /**
   * Gets detailed information about the currently selected state
   *
   * @returns Object containing state code, name, and districts
   * Returns null if no state is selected
   */
  public getCurrentState(): {
    code: string
    name: string
    districts: string[]
  } | null {
    if (!this.currentStateCode) return null
    return {
      code: this.currentStateCode,
      name: STATE_NAMES[this.currentStateCode] || this.currentStateCode,
      districts: this.getDistricts(),
    }
  }

  /**
   * Gets all available state codes
   *
   * @returns Array of state codes (e.g., ['AP', 'KA', 'TN', ...])
   */
  public getAllStateCodes(): string[] {
    return Object.keys(this.rawData)
  }

  /**
   * Gets all states with their codes and names
   *
   * @returns Array of objects containing state codes and names
   */
  public getAllStates(): Array<{ code: string; name: string }> {
    return Object.keys(this.rawData).map((code) => ({
      code,
      name: STATE_NAMES[code] || code,
    }))
  }

  /**
   * Gets comprehensive data for all states including their districts
   *
   * @returns Array of objects containing state codes, names, and their districts
   */
  public getAllStatesWithDistricts(): Array<{
    code: string
    name: string
    districts: string[]
  }> {
    return Object.entries(this.rawData).map(([code, districts]) => ({
      code,
      name: STATE_NAMES[code] || code,
      districts: [...districts],
    }))
  }

  /**
   * Gets districts for any state code without changing the current state
   *
   * @param stateCode - The code of the state to get districts for
   * @returns Array of district names for the specified state
   * Returns empty array if state code is invalid
   */
  public getDistrictsForState(stateCode: string): string[] {
    return this.rawData[stateCode] ? [...this.rawData[stateCode]] : []
  }

  /**
   * Resets the current state selection
   */
  public reset(): void {
    this.currentStateCode = null
  }

  //<----- Geolocation Methods ----->

  /**
   * Detects user's state from browser geolocation
   * Uses navigator.geolocation API and reverse geocoding
   *
   * @param options - Geolocation options (timeout, accuracy, etc.)
   * @returns Promise resolving to GeolocationResult with state info
   * @throws GeolocationError if detection fails
   *
   * @example
   * ```typescript
   * const india = new IndiaStateDistrict();
   * try {
   *   const result = await india.detectStateFromLocation();
   *   console.log(result.state); // 'Karnataka'
   *   console.log(result.stateCode); // 'KA'
   * } catch (error) {
   *   console.error(error.message);
   * }
   * ```
   */
  public async detectStateFromLocation(
    options: GeolocationOptions = {}
  ): Promise<GeolocationResult> {
    //<----- Check browser support ----->
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      throw this.createGeolocationError(
        "NOT_SUPPORTED",
        "Geolocation is not supported by this browser"
      )
    }

    const { enableHighAccuracy = false, timeout = 10000, maximumAge = 300000 } = options

    try {
      const position = await this.getCurrentPosition({
        enableHighAccuracy,
        timeout,
        maximumAge,
      })

      const { latitude, longitude } = position.coords
      const stateCode = this.findStateByCoordinates(latitude, longitude)

      if (!stateCode) {
        throw this.createGeolocationError(
          "STATE_NOT_FOUND",
          "Could not determine state from coordinates. Location may be outside India."
        )
      }

      this.currentStateCode = stateCode

      return {
        state: STATE_NAMES[stateCode] || stateCode,
        stateCode,
        latitude,
        longitude,
      }
    } catch (error) {
      if ((error as GeolocationError).code) {
        throw error
      }
      throw this.createGeolocationError(
        "POSITION_UNAVAILABLE",
        (error as Error).message || "Failed to get location"
      )
    }
  }

  /**
   * Wraps navigator.geolocation.getCurrentPosition in a Promise
   * @private
   */
  private getCurrentPosition(
    options: PositionOptions
  ): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        resolve,
        (error) => {
          const errorMap: { [key: number]: GeolocationError["code"] } = {
            1: "PERMISSION_DENIED",
            2: "POSITION_UNAVAILABLE",
            3: "TIMEOUT",
          }
          reject(
            this.createGeolocationError(
              errorMap[error.code] || "POSITION_UNAVAILABLE",
              error.message
            )
          )
        },
        options
      )
    })
  }

  /**
   * Finds state code by checking if coordinates fall within state boundaries
   * Checks smaller regions first to handle overlapping boundaries
   * @private
   */
  private findStateByCoordinates(lat: number, lng: number): string | null {
    for (const bounds of STATE_BOUNDARIES) {
      if (
        lat >= bounds.minLat &&
        lat <= bounds.maxLat &&
        lng >= bounds.minLng &&
        lng <= bounds.maxLng
      ) {
        return bounds.code
      }
    }
    return null
  }

  /**
   * Creates a GeolocationError object
   * @private
   */
  private createGeolocationError(
    code: GeolocationError["code"],
    message: string
  ): GeolocationError {
    return { code, message }
  }

  /**
   * Checks if geolocation is supported in the current environment
   *
   * @returns boolean indicating geolocation support
   */
  public isGeolocationSupported(): boolean {
    return typeof navigator !== "undefined" && !!navigator.geolocation
  }
}
