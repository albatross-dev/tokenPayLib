## How to install

run all the following commands in the root of your project.

the library will be at the following position:

```bash
project-root/
│
├── src/
│   └── tokenPayLib/  <-- the submodule will live here
└── other project files
```

to install the library, run the following command:

```bash
git submodule add https://github.com/albatross-dev/tokenPayLib.git src/tokenPayLib
```

Commit the Submodule Configuration
```bash
git add .gitmodules src/tokenPayLib
git commit -m "Add tokenPayLib as a submodule in src/"
```

Push Changes to the Main Project Repository
```bash
git push origin main
```