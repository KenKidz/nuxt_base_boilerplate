import withNuxt from './.nuxt/eslint.config.mjs';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default withNuxt([
  {
    ignores: ['node_modules', 'dist', 'public', '.nuxt', '.kilo'],
  },
  eslintPluginPrettierRecommended,
  {
    rules: {
      // SFC block order: template -> script -> style.
      'vue/block-order': ['error', { order: ['template', 'script', 'style'] }],
      // Prettier owns formatting; stylistic ESLint rules stay off.
      'comma-dangle': ['off'],
      semi: ['off'],
      '@typescript-eslint/no-explicit-any': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/attribute-hyphenation': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'vue/no-deprecated-slot-attribute': [
        'error',
        {
          ignore: ['my-component'],
        },
      ],
    },
  },
]);
