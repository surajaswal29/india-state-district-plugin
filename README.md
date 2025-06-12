# 🇮🇳 India State District

> **Note:** This is an educational project designed to demonstrate Indian
> geographical data handling. Feel free to use it for learning purposes.

![npm version](https://img.shields.io/npm/v/india-state-district.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.3-blue.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

A lightweight, type-safe TypeScript utility package for handling Indian states
and districts data.

## Overview

India State District is a zero-dependency solution that provides comprehensive
data and utility functions for handling Indian geographical data (states and
districts). Built with TypeScript, it offers a type-safe and developer-friendly
way to work with Indian geographical data in your applications.

## Features

- ✨ **Type Safety** - Built with TypeScript for enhanced developer experience
  and code reliability
- 🚀 **Zero Dependencies** - Lightweight implementation with no external
  dependencies
- 📦 **Tree-Shakeable** - Import only what you need
- 🔄 **Utility Functions** - Comprehensive set of functions for data
  manipulation
- 🎯 **Framework Agnostic** - Use with any JavaScript framework or vanilla JS
- 🛡️ **Modern Browsers** - Full support for all modern browsers

## Installation

```bash
# Using npm
npm install india-state-district

# Using yarn
yarn add india-state-district

# Using pnpm
pnpm add india-state-district
```

## Usage

### Basic Usage (Recommended)

```typescript
import india, {
  getAllStates,
  getDistricts,
  getAllStateCodes,
  getCurrentState,
  getAllStatesWithDistricts,
} from "india-state-district"

// Get all states
const states = getAllStates()

// Get districts for a specific state code
const districts = getDistricts("MH")

// Get all state codes
const codes = getAllStateCodes()

// Get current state (from default instance)
const currentState = getCurrentState()

// Get all states with their districts
const allStatesWithDistricts = getAllStatesWithDistricts()
```

### Advanced Usage (Custom Instance)

```typescript
import {
  createIndiaStateDistrict,
  IndiaStateDistrict,
} from "india-state-district"

const customIndia = createIndiaStateDistrict()

// Use methods on the custom instance
const states = customIndia.getAllStates()
const districts = customIndia.getDistrictsForState("MH")
```

### Node.js/CommonJS Usage

```javascript
const india = require("india-state-district").default
const { getAllStates, getDistricts } = require("india-state-district")

console.log(getAllStates())
console.log(getDistricts("MH"))
```

### React Example

```tsx
import React, { useState } from "react"
import { getAllStates, getDistricts } from "india-state-district"

const LocationSelector: React.FC = () => {
  const [selectedState, setSelectedState] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [districts, setDistricts] = useState<string[]>([])

  const handleStateChange = (state: string) => {
    setSelectedState(state)
    setDistricts(getDistricts(state))
    setSelectedDistrict("")
  }

  return (
    <div>
      <select
        value={selectedState}
        onChange={(e) => handleStateChange(e.target.value)}
      >
        <option value=''>Select State</option>
        {getAllStates().map((state) => (
          <option key={state.code} value={state.code}>
            {state.name}
          </option>
        ))}
      </select>

      <select
        value={selectedDistrict}
        onChange={(e) => setSelectedDistrict(e.target.value)}
        disabled={!selectedState}
      >
        <option value=''>Select District</option>
        {districts.map((district) => (
          <option key={district} value={district}>
            {district}
          </option>
        ))}
      </select>
    </div>
  )
}

export default LocationSelector
```

### API Reference

#### Default Instance Utility Functions

| Function                      | Description                               | Arguments           | Returns                                        |
| ----------------------------- | ----------------------------------------- | ------------------- | ---------------------------------------------- |
| `getAllStates()`              | Get all states                            | None                | `State[]`                                      |
| `getDistricts(stateCode)`     | Get districts for a state code            | `stateCode: string` | `string[]`                                     |
| `getAllStateCodes()`          | Get all state codes                       | None                | `string[]`                                     |
| `getCurrentState()`           | Get current state (from default instance) | None                | `State`                                        |
| `getAllStatesWithDistricts()` | Get all states with their districts       | None                | `Array<{ state: State, districts: string[] }>` |

#### Factory & Class

- `createIndiaStateDistrict()` — Create a new instance for advanced use-cases
- `IndiaStateDistrict` — Class for advanced usage

#### Types & Flag Utilities

- `State`, `StateData` — TypeScript types
- `INDIA_FLAG_SVG`, `INDIA_FLAG_COLORS`, `getIndiaFlagSVG`,
  `getIndiaFlagDataUrl` — Flag utilities

## Browser Support

The package is tested and supported on all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and version history. We
follow [Semantic Versioning](https://semver.org/) and document all notable
changes following the [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
format.

## Contributing

We appreciate all contributions to improve India State District. Here's how you
can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/enhancement`)
3. Make your changes
4. Commit (`git commit -m 'Add enhancement'`)
5. Push to the branch (`git push origin feature/enhancement`)
6. Open a Pull Request

Please ensure your PR adheres to the following guidelines:

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Keep commits atomic and well-described

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.

## Support

- ⭐ Star this repository
- 🐛 Report issues
- 🤝 Submit pull requests
- 📢 Share with others

---

_Developed with ❤️ by [Suraj Aswal](https://github.com/surajaswal29)_

[Report Bug](https://github.com/surajaswal29/india-state-district-plugin/issues)
·
[Request Feature](https://github.com/surajaswal29/india-state-district-plugin/issues)
