# scroll-progress-bar

A progress bar for scroll.

## Install

```npm
    npm install scroll-progress-bar
```

```yarn
    yarn add scroll-progress-bar
```

## Usage

``` javascript

import progressBar from 'scroll-progress-bar';
import "scroll-progress-bar/style.css";

// show scroll progress bar
progressBar.show();
// hide scroll progress bar
progressBar.hide();
// set scroll progress bar configuration
progressBar.setConfig({
    debounce: true,
    transitionCls: 'progress-transition',
})

```

**configuration**

```javascript
export interface ScrollProgressConfig {
  // element id
  id?: string
  // element scroll offset
  offset?: number
  // scroll debounce
  debounce?: boolean
  // element transition class name, effective when debounce is true
  transitionCls?: string
}
```
