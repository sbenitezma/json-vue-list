# json-vue-list

> This is an application Based on Vuejs 2.6 Front-end Framework.

## Purpose

The goal of this project is to display a list of a given apps provided by a mock JSON and be able to:
- Display given apps
- Set app as favourite
- Set active app (manually or randomly)  
- Filter apps by name  
- Sort apps by name ascending or descending
- Display favourites apps

## Main Packages
* Vue-cli
* Vuetify
* Vuex
* Jest
* Cypress + eyes-cypress
* Sass
* MDI Icons
* Eslint

## Components

The components created for this application are the following:

- Card
- Filters
- Grid
- Icon
- Layout
- Navbar
- ProgressBar
- Table
- TabsMenu

### Card
Component to display each app of the list
````
## Props

| Name              | Type     | Description |
| ----------------- | -------- | ----------- |
| `item` *required* | `Object` | &nbsp;      |

## Methods

| Method name        | Description            |
| ------------------ | ---------------------- |
| truncateString     | Short too long strings |
| setFavourite       | Set Favourite app      |
| setActive          | Set active app         |
````

### Filters
Component to display grid/app list filters and make the filters and sorting.
````
## Methods

| Method name        | Description            |
| ------------------ | ---------------------- |
| clearSearch        | Clear filter search    |
| searchByNameApps   | Search app by name     |
| searchByTagApps    | Search app by tag name |
| selectRandomApp    | Set random active app  |
| sortApps           | Sort apps asc, desc    |
````

### Grid
Component to display main grid.

### Icon
Component to display custom icons and images on app
````
## Props

| Name                    | Type     | Description | Default     |
| ----------------------- | -------- | ----------- | ----------- |
| `alt` *required*        | `String` |             |             |
| `color`                 | `String` |             | `"primary"` |
| `custom-class`          | `String` |             |             |
| `hover-icon`            | `String` |             |             |
| `id`                    | `String` |             | `""`        |
| `max-height` *required* | `String` |             |             |
| `max-width` *required*  | `String` |             |             |
| `name` *required*       | `String` |             | &nbsp;      |

## Events

| Name          | Description |
| ------------- | ----------- |
| `clickAction` | &nbsp;      |

## Methods

| Method name        | Description                                                |
| ------------------ | ---------------------------------------------------------- |
| getIcon            | Get Custom icon by name                                    |
| setAction          | Emit custom action to parent component (active/favourite)  |
````
### Layout
Component that renders the main container, gets the apps and display Tabs 
````
## Methods

| Method name      | Description            |
| ---------------- | ---------------------- |
| fetchApps        | Get Async Voice Apps   |
````
### Navbar
Component that renders the top navbar

### ProgressBar
Component that renders a ProgressBar on loading process

### Table
Component to display favourite apps in a table format
````
## Methods

| Method name      | Description                    |
| ---------------- | ------------------------------ |
| clearSearch      | Clear search name value        |
| getAppIcon       | Get Image of app               |
| setFavourite     | Remove favourite app from list |
| setActive        | Set active app from list       |
````
### TabsMenu
Component to display menu tabs with "All Apps / Favourite Apps"


## Installation

### Project setup
```
yarn install
```

#### Compiles and hot-reloads for development
```
yarn serve
```

#### Compiles and minifies for production
```
yarn build
```

#### Run your unit tests
```
yarn test:unit
```

#### Run your end-to-end tests
```
yarn test:e2e
```

#### Lints and fixes files
```
yarn lint
```

#### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



## Test Coverage

### Unit (Jest)
````
 PASS  tests/unit/TabsMenu.spec.js
 PASS  tests/unit/Navbar.spec.js
 PASS  tests/unit/Layout.spec.js
 PASS  tests/unit/Grid.spec.js
 PASS  tests/unit/Table.spec.js
 PASS  tests/unit/actions.spec.js
 PASS  tests/unit/Table.spec.js
 PASS  tests/unit/Grid.spec.js
 PASS  tests/unit/Layout.spec.js
 PASS  tests/unit/Navbar.spec.js
 PASS  tests/unit/TabsMenu.spec.js
 PASS  tests/unit/getters.spec.js
 PASS  tests/unit/ProgressBar.spec.js
 PASS  tests/unit/Filters.spec.js
 PASS  tests/unit/Card.spec.js
------------------|----------|----------|----------|----------|-------------------|
File              |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
------------------|----------|----------|----------|----------|-------------------|
All files         |    55.48 |    33.33 |    51.85 |    54.86 |                   |
 assets/icons     |      100 |      100 |      100 |      100 |                   |
  logo-header.svg |      100 |      100 |      100 |      100 |                   |
 components       |    57.69 |    21.43 |    47.37 |    57.69 |                   |
  Card.vue        |    16.67 |        0 |        0 |    16.67 |  93,94,96,103,109 |
  Filters.vue     |     62.5 |       50 |    66.67 |     62.5 |... 55,158,161,164 |
  Grid.vue        |      100 |      100 |      100 |      100 |                   |
  Icon.vue        |    42.86 |    16.67 |       50 |    42.86 |       86,87,89,98 |
  Layout.vue      |      100 |      100 |      100 |      100 |                   |
  Navbar.vue      |      100 |      100 |      100 |      100 |                   |
  Table.vue       |       30 |        0 |       20 |       30 |... 58,160,168,174 |
  TabsMenu.vue    |      100 |      100 |      100 |      100 |                   |
 store            |    53.76 |    37.21 |    54.29 |    52.75 |                   |
  actions.js      |    92.31 |       50 |      100 |    92.31 |                23 |
  getters.js      |    53.33 |        0 |    70.59 |       50 |... 71,73,74,75,76 |
  mutations.js    |       44 |       60 |    31.25 |       44 |... 46,147,150,151 |
------------------|----------|----------|----------|----------|-------------------|

Test Suites: 10 passed, 10 total
Tests:       30 passed, 30 total
Snapshots:   3 passed, 3 total
Time:        8.038s
Ran all test suites.
````

### E2E (Cypress)
````
   Spec                                                    Tests  Passing  Failing  Pending  Skipped  
  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ √  card.spec.js                             00:42        3        3        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ √  filters.spec.js                          00:52       10       10        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ √  index.spec.js                            00:40        7        7        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ √  navbar.spec.js                           00:15        1        1        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ √  table.spec.js                            00:46        9        9        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ √  tabs-navigation.spec.js                  00:17        3        3        -        -        - │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘
    √  All specs passed!                        03:35       33       33        -        -        -  
````
