/**
 * Indian Flag SVG
 * Follows official specifications for the Indian national flag
 */

export const INDIA_FLAG_SVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="900" height="600" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
    <!-- Background -->
    <rect width="900" height="600" fill="#fff"/>
    
    <!-- Saffron (deep orange) stripe -->
    <rect width="900" height="200" fill="#FF9933"/>
    
    <!-- White stripe -->
    <rect y="200" width="900" height="200" fill="#fff"/>
    
    <!-- Green stripe -->
    <rect y="400" width="900" height="200" fill="#138808"/>
    
    <!-- Ashoka Chakra (24-spoked wheel) -->
    <g transform="translate(450,300)">
        <!-- Outer circle -->
        <circle r="90" fill="#000080"/>
        <circle r="85" fill="#fff"/>
        
        <!-- 24 spokes -->
        <g id="spokes">
            <!-- Generate 24 spokes -->
            <g id="spoke">
                <rect x="-2" y="-85" width="4" height="85" fill="#000080"/>
                <polygon points="0,-85 4,-75 -4,-75" fill="#000080"/>
            </g>
            <g transform="rotate(15)"><use href="#spoke"/></g>
            <g transform="rotate(30)"><use href="#spoke"/></g>
            <g transform="rotate(45)"><use href="#spoke"/></g>
            <g transform="rotate(60)"><use href="#spoke"/></g>
            <g transform="rotate(75)"><use href="#spoke"/></g>
            <g transform="rotate(90)"><use href="#spoke"/></g>
            <g transform="rotate(105)"><use href="#spoke"/></g>
            <g transform="rotate(120)"><use href="#spoke"/></g>
            <g transform="rotate(135)"><use href="#spoke"/></g>
            <g transform="rotate(150)"><use href="#spoke"/></g>
            <g transform="rotate(165)"><use href="#spoke"/></g>
            <g transform="rotate(180)"><use href="#spoke"/></g>
            <g transform="rotate(195)"><use href="#spoke"/></g>
            <g transform="rotate(210)"><use href="#spoke"/></g>
            <g transform="rotate(225)"><use href="#spoke"/></g>
            <g transform="rotate(240)"><use href="#spoke"/></g>
            <g transform="rotate(255)"><use href="#spoke"/></g>
            <g transform="rotate(270)"><use href="#spoke"/></g>
            <g transform="rotate(285)"><use href="#spoke"/></g>
            <g transform="rotate(300)"><use href="#spoke"/></g>
            <g transform="rotate(315)"><use href="#spoke"/></g>
            <g transform="rotate(330)"><use href="#spoke"/></g>
            <g transform="rotate(345)"><use href="#spoke"/></g>
        </g>
    </g>
</svg>`

/**
 * Official colors of the Indian flag
 */
export const INDIA_FLAG_COLORS = {
  saffron: "#FF9933",
  white: "#FFFFFF",
  green: "#138808",
  navyBlue: "#000080",
} as const

/**
 * Get the flag SVG with custom dimensions
 * @param width - Width of the flag
 * @param height - If not provided, will maintain 3:2 aspect ratio
 * @returns SVG string with custom dimensions
 */
export function getIndiaFlagSVG(width: number, height?: number): string {
  const finalHeight = height || Math.round(width * (2 / 3))
  return INDIA_FLAG_SVG.replace('width="900"', `width="${width}"`)
    .replace('height="600"', `height="${finalHeight}"`)
    .replace('viewBox="0 0 900 600"', `viewBox="0 0 900 600"`)
}

/**
 * Get the flag as a data URL for use in img src
 * @param width - Width of the flag
 * @param height - If not provided, will maintain 3:2 aspect ratio
 * @returns Data URL string
 */
export function getIndiaFlagDataUrl(width: number, height?: number): string {
  const svg = getIndiaFlagSVG(width, height)
  return `data:image/svg+xml;base64,${btoa(svg)}`
}
