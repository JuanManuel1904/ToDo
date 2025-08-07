import js from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import reactRecommended from 'eslint-plugin-react/configs/recommended'
import pluginPrettier from 'eslint-plugin-prettier'
import configPrettier from 'eslint-config-prettier'

export default [
  // Reglas básicas de JavaScript
  js.configs.recommended,

  // Reglas recomendadas de React
  reactRecommended,

  {
    plugins: {
      prettier: pluginPrettier,
      react: pluginReact,
    },
    rules: {
      'prettier/prettier': 'error', // Muestra errores si Prettier no está satisfecho
      'react/react-in-jsx-scope': 'off', // Solo si usas React 17+
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  // Desactiva reglas que puedan chocar con Prettier
  configPrettier,
]
