# 🇮🇳 India State District Plugin

> **Note:** This is an educational project designed to demonstrate Indian geographical data handling. Feel free to use it for learning purposes.

![npm version](https://img.shields.io/npm/v/india-state-district-plugin.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.3-blue.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

A lightweight, type-safe TypeScript utility package for handling Indian states and districts data.

## Overview

India State District Plugin is a zero-dependency solution that provides comprehensive data and utility functions for handling Indian geographical data (states and districts). Built with TypeScript, it offers a type-safe and developer-friendly way to work with Indian geographical data in your applications.

## Features

- ✨ **Type Safety** - Built with TypeScript for enhanced developer experience and code reliability
- 🚀 **Zero Dependencies** - Lightweight implementation with no external dependencies
- 📦 **Tree-Shakeable** - Import only what you need
- 🔄 **Utility Functions** - Comprehensive set of functions for data manipulation
- 🎯 **Framework Agnostic** - Use with any JavaScript framework or vanilla JS
- 🛡️ **Modern Browsers** - Full support for all modern browsers

## Installation

```bash
# Using npm
npm install india-state-district-plugin

# Using yarn
yarn add india-state-district-plugin

# Using pnpm
pnpm add india-state-district-plugin
```

## Usage

### Basic Implementation

```typescript
import { IndiaStateDistrict } from 'india-state-district-plugin';

// Initialize the utility
const stateDistrict = new IndiaStateDistrict();

// Get all states
const states = stateDistrict.getAllStates();

// Get districts for a specific state
const districts = stateDistrict.getDistricts('Maharashtra');

// Get current selections
const currentState = stateDistrict.getState();
const currentDistrict = stateDistrict.getDistrict();
```

### Node.js Implementation

```javascript
const { IndiaStateDistrict } = require('india-state-district-plugin');

// Initialize the utility
const stateDistrict = new IndiaStateDistrict();

// Get all states
const states = stateDistrict.getAllStates();
console.log('All States:', states);

// Get districts for a specific state
const districts = stateDistrict.getDistricts('Maharashtra');
console.log('Districts in Maharashtra:', districts);

// Set and get state/district
stateDistrict.setState('Karnataka');
stateDistrict.setDistrict('Bangalore');
console.log('Current State:', stateDistrict.getState());
console.log('Current District:', stateDistrict.getDistrict());
```

### React.js Implementation

```tsx
import React, { useState } from 'react';
import { IndiaStateDistrict } from 'india-state-district-plugin';

const LocationSelector: React.FC = () => {
    const stateDistrict = new IndiaStateDistrict();
    const [selectedState, setSelectedState] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [districts, setDistricts] = useState<string[]>([]);

    const handleStateChange = (state: string) => {
        setSelectedState(state);
        setDistricts(stateDistrict.getDistricts(state));
        setSelectedDistrict('');
    };

    return (
        <div>
            <select 
                value={selectedState}
                onChange={(e) => handleStateChange(e.target.value)}
            >
                <option value="">Select State</option>
                {stateDistrict.getAllStates().map(state => (
                    <option key={state} value={state}>{state}</option>
                ))}
            </select>

            <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                disabled={!selectedState}
            >
                <option value="">Select District</option>
                {districts.map(district => (
                    <option key={district} value={district}>{district}</option>
                ))}
            </select>
        </div>
    );
};

export default LocationSelector;
```

### API Methods

| Method | Description | Return Type |
|--------|-------------|-------------|
| `getAllStates()` | Get list of all states | `string[]` |
| `getDistricts(state: string)` | Get all districts for a state | `string[]` |
| `getState()` | Get the currently selected state | `string` |
| `getDistrict()` | Get the currently selected district | `string` |
| `setState(state: string)` | Set the current state | `void` |
| `setDistrict(district: string)` | Set the current district | `void` |
| `isValidState(state: string)` | Check if state exists | `boolean` |
| `isValidDistrict(state: string, district: string)` | Check if district exists in state | `boolean` |

### Configuration Options

```typescript
interface IndiaStateDistrictOptions {
    // Initial state selection
    defaultState?: string;       
    
    // Initial district selection
    defaultDistrict?: string;    
    
    // Change event handler
    onChange?: (state: string, district: string) => void;
}
```

## Browser Support

The package is tested and supported on all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and version history. We follow [Semantic Versioning](https://semver.org/) and document all notable changes following the [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format.

## Contributing

We appreciate all contributions to improve India State District Plugin. Here's how you can help:

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

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- ⭐ Star this repository
- 🐛 Report issues
- 🤝 Submit pull requests
- 📢 Share with others

---

_Developed with ❤️ by [Suraj Aswal](https://github.com/surajaswal29)_

[Report Bug](https://github.com/surajaswal29/india-state-district-plugin/issues) · [Request Feature](https://github.com/surajaswal29/india-state-district-plugin/issues)
