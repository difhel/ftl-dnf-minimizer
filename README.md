## Installation
### Installing dependencies
1. Install the [jsoncpp](https://github.com/open-source-parsers/jsoncpp) library. It is required for API and JSON encoding/decoding.
On Debian-based distros, you can install it by
```bash
sudo apt-get install libjsoncpp-dev
```

3. Build the backend

```bash
cd backend && make
```

3. Build the frontend
```bash
cd my-react-app && npm run build
```

5. Start backend and frontend

```bash
./backend/main.o
```

```bash
cd my-react-app && npm run preview
```
