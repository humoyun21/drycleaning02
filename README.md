# React + TypeScript + Vite
## Happy coding : )

# Main

- Try to keep pages server component;
- Use BEM
- Use FC generic for Component
- Use the same node version (v20.9.0)

# Imports order

- Next components and utils
- React
- Third libraries
- React components
- Utils
- Style

# Pages

- Pages are stored in the app folder

- Naming -> CategoriesPage, CategoryPage

# Files

 File naming is `kebab-case` 

- User.jsx => bad
- user.jsx => good

<br />

- loginCard.jsx => bad
- LoginCard.jsx => bad
- login-card.jsx => good

# Components

- Creating component
  ```
  modal
    index.tsx
    style.scss

  card 
     index.tsx
     style.scss
  ```
- Component naming is PascalCase

  ```
    <UserComponent />
  ```
- Component is made without margin

# Hooks

 Hooks naming is camelCase

  ```
    useFetch
  ```

# Variables

 Sass folder -> variables.scss





## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
