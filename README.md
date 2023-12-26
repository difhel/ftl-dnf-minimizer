## Installation
### Installing dependencies
1. Install the [jsoncpp](https://github.com/open-source-parsers/jsoncpp) library. It is required for API and JSON encoding/decoding.
On Debian-based distros, you can install it by
`sudo apt-get install libjsoncpp-dev`

2. Build the backend

```bash
cd backend && make
```

3. Build the frontent
```bash
cd my-react-app && npm run build
```

5. Start backend and frontend

`./backend/main.o`

`cd my-react-app && npm run dev`
