# India State and District

![India Flag](india.png)

This npm package provides functions to get the list of Indian states and districts.

**Features**

- **getIndiaState():** Returns an array of objects representing Indian states with their names and codes.
- **getIndiaDistrict(stateCode):** Returns an array of districts for the specified state code.

## Installation

```bash
npm install india-state-district
```

## Usage

```javascript
const { getIndiaState, getIndiaDistrict } = require("india-state-district")

// Get the list of Indian states
const states = getIndiaState()
console.log("Indian States:", states)

// Get the districts of a specific state (default is Andhra Pradesh)
const districts = getIndiaDistrict("UK")
console.log("Districts of Uttarakhand:", districts)
```

## Author

[Suraj Aswal](https://github.com/surajaswal29)

## Repository

[GitHub Repository](https://github.com/surajaswal29/india-state-district-plugin.git)
