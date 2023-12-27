## Installation
### Installing dependencies
1. Install the [jsoncpp](https://github.com/open-source-parsers/jsoncpp) library. It is required for API and JSON encoding/decoding.
On Debian-based distros, you can install it by
```bash
sudo apt-get install libjsoncpp-dev
```

2. Clone the repo
```bash
git clone https://github.com/difhel/ftl-dnf-minimizer
```

3. Clone submodules
```bash
git submodule update --init
```

4. Build the backend

```bash
cd backend && make
```

5. Build the frontend
```bash
cd my-react-app && npm run build
```

6. Start backend and frontend

```bash
./backend/main.o
```

```bash
cd my-react-app && npm run preview
```
