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

Push Changes to the Project Repository

```bash
git push origin main // or beta
```

# Overview

root/
├── assets/ // this mainly consists of icons for crypto chains and tokens it also includeds ABIs for the most important contracts
├── components/ // this is the main folder for the components of the library
│ ├── contexts/ // this is the folder for the contexts of the library
│ │ └── UhuConfigContext.tsx // this is the context for the UhuConfig for all projects
│ ├── crossborder/ // bundles all the crossborder components
│ ├── Modals/
│ ├── Modules/
│ ├── transaction/
│ ├── UI/
│ ├── wallet/
│ └── withdrawPage/
├── hooks/
├── types/
└── utilities/
