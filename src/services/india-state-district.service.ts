import { State, StateData } from "../types"
import { STATE_NAMES } from "../types"
import IN_STATES_AND_DISTRICTS from "../data/data.json"

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
}
