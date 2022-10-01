## Setup

```bash
nvm use
npm ci
```

## Quick start

To run build in watch mode and simple http server:
```bash
npm run dev
# then open http://challenge.local/
```

To check minified version, run:
```bash
MODE=production npm run dev
# then open http://challenge.local/
```

## Production build

```bash
npm run build
```

## Overview

Entrypoint is `source/index.ts`

### Tools
**[TypeScript](https://www.typescriptlang.org/)**

**[Rollup](https://rollupjs.org/)**

For bundling modules together.

This is a good solution for "libraries" because it produces zero-overhead in final bundle.

On the another hand, Webpack is more preferable for "applications", because they are usually more complex and Webpack has more loaders, tools and bigger community.

**[Google closure compiler](https://github.com/google/closure-compiler)**

For minification purposes.

`compilation_level: 'ADVANCED_OPTIMIZATIONS'` setting is used, which includes property's mangling.

Caution: this setting requires more careful attitude to reading user data and writing to request data.

Brackets notation must be used to access properties, e.g. `userData['prop']` instead of `userData.prop`.

Also, this requires excellent coverage by functional tests, see [More test](#more-tests) chapter.

### Transport
In browser data can be sent in various ways - fetch, XHR, image, jsonp, sendBeacon.

They are all different.

`Transport` is an abstraction over different JS approaches to send data.

### Middleware
Collects data from various sources (location/cookie/user data) and prepare it to be transferred to the server.

### Sender
Iterates over middlewares to collect and prepare data for request.

Iterates over transports to find suitable one for sending data.

## Further improvements

### Versioning
Each release should generate uniq identifier (version) and append it to all requests.

During new release, this feature allows us to compare current (prod) and new (preprod) versions of tag, building charts/alerts on crucial metrics or errors.

### Error handling
Errors may occur in many unexpected ways, for example:
- Poisoned js environment (e.g. prototype pollution) by user code, plugins, antiviruses.
- Strange/old browsers.

Tag should collect its own runtime telemetry (including throwed errors) and send it to server for further analysis, perhaps with some sampling.

Tag must catch as much internal errors as possible and not allow them to be visible in browser's console in order not to confuse users and site owners.

### Retransmits
Internet connection may be unstable or server may be unavailable.

To make data delivery more reliable in case of connectivity/server problems, user events can be saved in localstorage/indexeddb in order to retransmit them later. 

### Batching
User events (`window.events.push({...})`) may occur in large numbers and very often.

Such events can be glued together to perform more rare server requests.

This feature implies server side support. 

### Timeout/retry
Implement timeout/retry logic with respect for `Retry-After` http header.

### More tests
To be honest I've tested this tag only in desktop versions of Chrome/Safari/Firefox on my macbook :)

Features availability for IE11 has been checked only on caniuse.com.

Need to increase unit test coverage.

Need to create functional tests infrastructure in order to check correctness in real browsers with real client-server communication.
