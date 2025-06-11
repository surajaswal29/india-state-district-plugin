# 🇮🇳 India State District Plugin

<div align="center">
  <img src="./india.png" alt="India State District Plugin Banner" width="600px" />
  
  [![npm version](https://img.shields.io/npm/v/india-state-district-plugin.svg)](https://www.npmjs.com/package/india-state-district-plugin)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0.3-blue.svg)](https://www.typescriptlang.org/)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

  <p>A lightweight, type-safe plugin for creating linked state and district dropdowns for Indian states. Built with TypeScript and zero dependencies! 🚀</p>
</div>

## ✨ Features

- 🔒 **Type-Safe**: Built with TypeScript for robust type checking and better developer experience
- 🎨 **Modern UI**: Clean, responsive design that works across all devices
- 🎯 **Zero Dependencies**: Lightweight and efficient with no external dependencies
- 🛠️ **Customizable**: Easy styling with CSS variables to match your brand
- 🔄 **Event Handling**: Built-in support for state and district change events
- 📦 **Easy Integration**: Simple setup with default configurations

## 🚀 Quick Start

### Installation

```bash
npm install india-state-district-plugin
# or
yarn add india-state-district-plugin
```

### Basic Usage

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="dist/style.css">
</head>
<body>
    <div class="container">
        <div class="form-group">
            <label for="state">State:</label>
            <select id="state" class="form-control"></select>
        </div>
        <div class="form-group">
            <label for="district">District:</label>
            <select id="district" class="form-control"></select>
        </div>
    </div>

    <script type="module">
        import { IndiaStateDistrict } from 'india-state-district-plugin';
        
        const stateDistrict = new IndiaStateDistrict({
            onChange: (state, district) => {
                console.log('Selected State:', state);
                console.log('Selected District:', district);
            }
        });
    </script>
</body>
</html>
```

## 🛠️ Configuration Options

The plugin can be customized with the following options:

```typescript
interface IndiaStateDistrictOptions {
    stateSelectId?: string;      // ID of state select element (default: 'state')
    districtSelectId?: string;   // ID of district select element (default: 'district')
    defaultState?: string;       // Default state to select
    defaultDistrict?: string;    // Default district to select
    onChange?: (state: string, district: string) => void;  // Change event handler
}
```

## 📚 API Reference

### Methods

| Method | Description |
|--------|-------------|
| `getState()` | Returns the currently selected state |
| `getDistrict()` | Returns the currently selected district |
| `setState(state: string)` | Sets the current state and updates districts |
| `setDistrict(district: string)` | Sets the current district |

## 🎨 Styling

Customize the look and feel using CSS variables:

```css
:root {
  --primary-color: #4a90e2;
  --border-color: #e1e1e1;
  --text-color: #333;
  --background-color: #fff;
  --hover-color: #f5f5f5;
  --focus-color: #2779bd;
  --border-radius: 4px;
  --spacing: 1rem;
}
```

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Opera (latest)

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Support

- Star this repository
- Report issues
- Submit Pull Requests
- Spread the word

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/surajaswal29">Suraj Aswal</a>
</div>
