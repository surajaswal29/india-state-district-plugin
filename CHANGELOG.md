# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.5] - 2025-12-06

### Added

- **Geolocation Integration** - Auto-detect user's state from browser location
  - `detectStateFromLocation(options?)` - Detect state using navigator.geolocation API
  - `isGeolocationSupported()` - Check browser geolocation support
- **New Types** for geolocation functionality
  - `GeolocationResult` - Contains state, stateCode, coordinates
  - `GeolocationOptions` - Configurable timeout, accuracy, cache settings
  - `GeolocationError` - Typed error codes for handling failures
- **State Boundary Data** - Bounding box coordinates for all 36 states/UTs
- **Comprehensive Test Suite** - 32 test cases covering:
  - Basic service functionality
  - Geolocation API mocking
  - Error handling (PERMISSION_DENIED, TIMEOUT, NOT_SUPPORTED)
  - State boundary detection for multiple cities
- Jest configuration (`jest.config.js`)
- Test coverage script (`npm run test:coverage`)

### Changed

- Updated package description to include geolocation support
- Added geolocation-related keywords for better discoverability

## [1.0.4] - 2025

### Fixed

- Minor bug fixes and improvements

## [1.0.3] - 2025

### Added

- TypeScript support for India states and districts selection
- Complete list of Indian states and their corresponding districts
- Type definitions for better development experience
- Build system using TypeScript compiler
- Testing setup with Jest
- ESLint configuration for code quality

### Changed

- Updated package structure for better organization
- Improved TypeScript configurations

### Fixed

- Initial bug fixes and improvements

## [1.0.2] - 2024

### Added

- Initial release with basic functionality
- Core states and districts data
- Basic TypeScript types

## [1.0.1] - 2024

### Added

- Project setup and configuration
- Basic project structure
- Initial documentation

## [1.0.0] - 2024

### Added

- Initial project scaffold
- Basic README
- License file
- Package configuration

[1.0.5]:
  https://github.com/surajaswal29/india-state-district/compare/v1.0.4...v1.0.5
[1.0.4]:
  https://github.com/surajaswal29/india-state-district/compare/v1.0.3...v1.0.4
[1.0.3]:
  https://github.com/surajaswal29/india-state-district/compare/v1.0.2...v1.0.3
[1.0.2]:
  https://github.com/surajaswal29/india-state-district/compare/v1.0.1...v1.0.2
[1.0.1]:
  https://github.com/surajaswal29/india-state-district/compare/v1.0.0...v1.0.1
[1.0.0]:
  https://github.com/surajaswal29/india-state-district/releases/tag/v1.0.0
