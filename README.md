# 🧩 vite-plugin-vue-auto-tailwind-reference

[![GitHub release](https://img.shields.io/github/v/release/alaa-abdallah1/vite-plugin-vue-auto-tailwind-reference.svg)](https://github.com/alaa-abdallah1/vite-plugin-vue-auto-tailwind-reference/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue)](LICENSE)
[![NPM Package](https://img.shields.io/npm/v/vite-plugin-vue-auto-tailwind-reference?color=red)](https://www.npmjs.com/package/vite-plugin-vue-auto-tailwind-reference)
[![NPM downloads](https://img.shields.io/npm/dw/vite-plugin-vue-auto-tailwind-reference?color=limegreen)](https://www.npmjs.com/package/vite-plugin-vue-auto-tailwind-reference)

> **Powered by [Payiano Team](https://payiano.com) | [GitHub](https://github.com/payiano)**

A Vite plugin that **automatically adds `@reference` directive to Vue SFC `<style>` blocks** (if it contains `@apply`). This is done at Vite code transformation step so **nothing will be added in your codebase!** 👻

⚡ This seamless integration allows developers to leverage [Tailwind CSS v4](https://tailwindcss.com/) features while **maintaining compatibility** with their existing codebase, making migration a breeze.

⚡ By automatically handling `@reference` directive, this plugin **ensures consistent styling** across your application as you transition to Tailwind CSS v4.

⚡ Whether you're migrating from Tailwind CSS v3 or just starting out with Tailwind CSS v4, this plugin provides an **efficient way to globally manage styles** in your Vue projects.

## Compatibility

Tested with Node 20+, Vite 6, Vue 3.5 and Tailwind CSS v4. It might work with older versions but is untested and unsupported there.

## Installation

Install the plugin from [npm](https://www.npmjs.com/package/vite-plugin-vue-auto-tailwind-reference) with your preferred package manager:

```bash
# NPM
npm install vite-plugin-vue-auto-tailwind-reference --save-dev

# Yarn
yarn add vite-plugin-vue-auto-tailwind-reference --dev

# PNPM
pnpm add vite-plugin-vue-auto-tailwind-reference -D
```

[![NPM](https://nodei.co/npm/vite-plugin-vue-auto-tailwind-reference.png)](https://www.npmjs.com/package/vite-plugin-vue-auto-tailwind-reference)

## Usage

### Basic Setup

Import and register the plugin in your `vite.config.js` or `vite.config.ts`. By default, the plugin assumes your CSS file is located at `src/index.css`. You can override this in advanced configuration.

⚠️ **Important:** Register this plugin **before** the official `tailwindcss()` plugin.

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindAutoReference from "vite-plugin-vue-auto-tailwind-reference";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [vue(), tailwindAutoReference(), tailwindcss()],
});
```

Use the `@apply` directive normally in your Vue component style blocks:

```vue
<template>
  <div class="myClass">Hello, Tailwind!</div>
</template>

<style scoped>
.myClass {
  @apply bg-blue-500 text-white p-4;
}
</style>
```

### Advanced Configuration

You can customize the plugin with parameters:

- `cssFile`: Path(s) to your Tailwind CSS file(s). Default is `./src/index.css`. Can be a string, an array of strings, or a function returning paths.
- `opts`: Additional options such as `include`, `exclude`, and `skip` patterns.

Example:

```js
tailwindAutoReference("./src/tailwind.css", {
  include: [/\.vue\?.*type=style/, /\.scss/],
  exclude: /node_modules/,
  skip: (code, id) => code.includes("@reference"),
});
```

See the [Usage](#usage) section for more details on advanced options.

## Contributing

Contributions are welcome! Please open issues or pull requests if you want to suggest improvements or fixes.

### Development commands

```bash
npm run dev     # Watch and compile in development
npm run build   # Build production files
npm run lint    # Run ESLint
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Code of Conduct

This project follows the [Contributor Code of Conduct](CODE-OF-CONDUCT.md). By participating, you agree to abide by its terms.

## Sponsoring

If you find this project helpful, please consider supporting me on Buy Me a Coffee! Your support helps me continue developing open-source software.

[![Buy Me A Coffee](https://cdn.buymeacoffee.com/buttons/default-orange.png)](https://buymeacoffee.com/alaa_abdallah1)
