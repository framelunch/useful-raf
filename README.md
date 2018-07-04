# Useful requestAnimationFrame

## Install

```bash
yarn add useful-raf
```

## How to use

```javascript
import * as UsefulRaf from 'useful-raf';

const usefulRaf = UsefulRaf.create(() => {
  console.log(new Date(), usefulRaf.currentFps);
}, { fps: 24 });

// start animation
usefulRaf.start();
// get animation state
console.log(usefulRaf.isRunning()); // true

// stop animation
usefulRaf.stop();
console.log(usefulRaf.isRunning()); // false
```

## TODO

- [ ] add tests
- [ ] add samples
- [ ] publishing to npm
