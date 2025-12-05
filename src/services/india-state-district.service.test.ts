import { IndiaStateDistrict } from "./india-state-district.service"
import { GeolocationError, GeolocationOptions } from "../types"

describe("IndiaStateDistrict", () => {
  let india: IndiaStateDistrict

  beforeEach(() => {
    india = new IndiaStateDistrict()
  })

  //<----- Basic Service Tests ----->
  describe("Basic functionality", () => {
    it("should get all state codes", () => {
      const codes = india.getAllStateCodes()
      expect(codes).toContain("KA")
      expect(codes).toContain("MH")
      expect(codes).toContain("DL")
    })

    it("should get all states with names", () => {
      const states = india.getAllStates()
      expect(states).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ code: "KA", name: "Karnataka" }),
          expect.objectContaining({ code: "MH", name: "Maharashtra" }),
        ])
      )
    })

    it("should set state code and return districts", () => {
      const districts = india.setStateCode("KA")
      expect(Array.isArray(districts)).toBe(true)
      expect(districts.length).toBeGreaterThan(0)
    })

    it("should throw error for invalid state code", () => {
      expect(() => india.setStateCode("XX")).toThrow("Invalid state code: XX")
    })

    it("should get current state after setting", () => {
      india.setStateCode("KA")
      const current = india.getCurrentState()
      expect(current).toEqual({
        code: "KA",
        name: "Karnataka",
        districts: expect.any(Array),
      })
    })

    it("should return null when no state is selected", () => {
      expect(india.getCurrentState()).toBeNull()
    })

    it("should reset state selection", () => {
      india.setStateCode("KA")
      india.reset()
      expect(india.getCurrentState()).toBeNull()
    })

    it("should get districts for any state without changing current", () => {
      india.setStateCode("KA")
      const mhDistricts = india.getDistrictsForState("MH")
      expect(mhDistricts.length).toBeGreaterThan(0)
      expect(india.getCurrentState()?.code).toBe("KA")
    })

    it("should return empty array for invalid state in getDistrictsForState", () => {
      expect(india.getDistrictsForState("XX")).toEqual([])
    })
  })

  //<----- Geolocation Tests ----->
  describe("Geolocation functionality", () => {
    const mockGeolocation = {
      getCurrentPosition: jest.fn(),
    }

    beforeEach(() => {
      jest.clearAllMocks()
    })

    describe("isGeolocationSupported", () => {
      it("should return true when geolocation is available", () => {
        Object.defineProperty(global, "navigator", {
          value: { geolocation: mockGeolocation },
          writable: true,
        })
        expect(india.isGeolocationSupported()).toBe(true)
      })

      it("should return false when navigator is undefined", () => {
        Object.defineProperty(global, "navigator", {
          value: undefined,
          writable: true,
        })
        expect(india.isGeolocationSupported()).toBe(false)
      })

      it("should return false when geolocation is not available", () => {
        Object.defineProperty(global, "navigator", {
          value: {},
          writable: true,
        })
        expect(india.isGeolocationSupported()).toBe(false)
      })
    })

    describe("detectStateFromLocation", () => {
      beforeEach(() => {
        Object.defineProperty(global, "navigator", {
          value: { geolocation: mockGeolocation },
          writable: true,
        })
      })

      it("should throw NOT_SUPPORTED when geolocation is unavailable", async () => {
        Object.defineProperty(global, "navigator", {
          value: undefined,
          writable: true,
        })

        await expect(india.detectStateFromLocation()).rejects.toEqual({
          code: "NOT_SUPPORTED",
          message: "Geolocation is not supported by this browser",
        })
      })

      it("should detect Karnataka from Mysore coordinates", async () => {
        mockGeolocation.getCurrentPosition.mockImplementation((success) => {
          success({
            coords: {
              latitude: 14.6507,
              longitude: 75.9173,
            },
          })
        })

        const result = await india.detectStateFromLocation()

        expect(result).toEqual({
          state: "Karnataka",
          stateCode: "KA",
          latitude: 14.6507,
          longitude: 75.9173,
        })
        expect(india.getCurrentState()?.code).toBe("KA")
      })

      it("should detect Maharashtra from Mumbai coordinates", async () => {
        mockGeolocation.getCurrentPosition.mockImplementation((success) => {
          success({
            coords: {
              latitude: 19.076,
              longitude: 72.8777,
            },
          })
        })

        const result = await india.detectStateFromLocation()

        expect(result).toEqual({
          state: "Maharashtra",
          stateCode: "MH",
          latitude: 19.076,
          longitude: 72.8777,
        })
      })

      it("should detect Delhi from New Delhi coordinates", async () => {
        mockGeolocation.getCurrentPosition.mockImplementation((success) => {
          success({
            coords: {
              latitude: 28.6139,
              longitude: 77.1025,
            },
          })
        })

        const result = await india.detectStateFromLocation()

        expect(result).toEqual({
          state: "Delhi",
          stateCode: "DL",
          latitude: 28.6139,
          longitude: 77.1025,
        })
      })

      it("should detect Tamil Nadu from Chennai coordinates", async () => {
        mockGeolocation.getCurrentPosition.mockImplementation((success) => {
          success({
            coords: {
              latitude: 11.1271,
              longitude: 78.6569,
            },
          })
        })

        const result = await india.detectStateFromLocation()

        expect(result).toEqual({
          state: "Tamil Nadu",
          stateCode: "TN",
          latitude: 11.1271,
          longitude: 78.6569,
        })
      })

      it("should detect Gujarat from Ahmedabad coordinates", async () => {
        mockGeolocation.getCurrentPosition.mockImplementation((success) => {
          success({
            coords: {
              latitude: 23.0225,
              longitude: 72.5714,
            },
          })
        })

        const result = await india.detectStateFromLocation()

        expect(result).toEqual({
          state: "Gujarat",
          stateCode: "GJ",
          latitude: 23.0225,
          longitude: 72.5714,
        })
      })

      it("should throw STATE_NOT_FOUND for coordinates outside India", async () => {
        mockGeolocation.getCurrentPosition.mockImplementation((success) => {
          success({
            coords: {
              latitude: 51.5074,
              longitude: -0.1278,
            },
          })
        })

        await expect(india.detectStateFromLocation()).rejects.toEqual({
          code: "STATE_NOT_FOUND",
          message:
            "Could not determine state from coordinates. Location may be outside India.",
        })
      })

      it("should handle PERMISSION_DENIED error", async () => {
        mockGeolocation.getCurrentPosition.mockImplementation((_, error) => {
          error({
            code: 1,
            message: "User denied geolocation",
          })
        })

        await expect(india.detectStateFromLocation()).rejects.toEqual({
          code: "PERMISSION_DENIED",
          message: "User denied geolocation",
        })
      })

      it("should handle POSITION_UNAVAILABLE error", async () => {
        mockGeolocation.getCurrentPosition.mockImplementation((_, error) => {
          error({
            code: 2,
            message: "Position unavailable",
          })
        })

        await expect(india.detectStateFromLocation()).rejects.toEqual({
          code: "POSITION_UNAVAILABLE",
          message: "Position unavailable",
        })
      })

      it("should handle TIMEOUT error", async () => {
        mockGeolocation.getCurrentPosition.mockImplementation((_, error) => {
          error({
            code: 3,
            message: "Timeout expired",
          })
        })

        await expect(india.detectStateFromLocation()).rejects.toEqual({
          code: "TIMEOUT",
          message: "Timeout expired",
        })
      })

      it("should pass options to getCurrentPosition", async () => {
        mockGeolocation.getCurrentPosition.mockImplementation((success) => {
          success({
            coords: {
              latitude: 12.9716,
              longitude: 77.5946,
            },
          })
        })

        const options: GeolocationOptions = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }

        await india.detectStateFromLocation(options)

        expect(mockGeolocation.getCurrentPosition).toHaveBeenCalledWith(
          expect.any(Function),
          expect.any(Function),
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          }
        )
      })

      it("should use default options when not provided", async () => {
        mockGeolocation.getCurrentPosition.mockImplementation((success) => {
          success({
            coords: {
              latitude: 12.9716,
              longitude: 77.5946,
            },
          })
        })

        await india.detectStateFromLocation()

        expect(mockGeolocation.getCurrentPosition).toHaveBeenCalledWith(
          expect.any(Function),
          expect.any(Function),
          {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 300000,
          }
        )
      })
    })

    //<----- State Boundary Tests ----->
    describe("State boundary detection", () => {
      beforeEach(() => {
        Object.defineProperty(global, "navigator", {
          value: { geolocation: mockGeolocation },
          writable: true,
        })
      })

      const testCases = [
        { lat: 18.1124, lng: 79.0193, expected: "TG", name: "Warangal" },
        { lat: 22.5726, lng: 88.3639, expected: "WB", name: "Kolkata" },
        { lat: 26.9124, lng: 75.7873, expected: "RJ", name: "Jaipur" },
        { lat: 25.5941, lng: 85.1376, expected: "BR", name: "Patna" },
        { lat: 21.1702, lng: 72.8311, expected: "GJ", name: "Surat" },
        { lat: 18.5204, lng: 73.8567, expected: "MH", name: "Pune" },
        { lat: 9.9312, lng: 76.2673, expected: "KL", name: "Kochi" },
        { lat: 30.7333, lng: 76.78, expected: "CH", name: "Chandigarh" },
      ]

      testCases.forEach(({ lat, lng, expected, name }) => {
        it(`should detect ${expected} from ${name} coordinates`, async () => {
          mockGeolocation.getCurrentPosition.mockImplementation((success) => {
            success({
              coords: { latitude: lat, longitude: lng },
            })
          })

          const result = await india.detectStateFromLocation()
          expect(result.stateCode).toBe(expected)
        })
      })
    })
  })
})

