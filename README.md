# turpy

it's a discord bot. add cool changes.

running turpy locally
---------------------

1. clone this repository.

    `git clone`

2. install dependencies. as of this writing, the only dependency is discord.js. depending on the modules in use, you may have to install other packages.
    
    `npm install --save discord.js`

3. create your config files from the repository root:

    - this file must contain your discord auth token. `touch config/token.txt`
    - this file must contain a comma-separated list of discord user ids: `touch config/admins.txt`
    
4. run turpy from the repository root:

    `node bin/turpy.js`
    
writing turpy modules
---------------------

turpy will look for and read modules from the `scripts` folder. i've written some examples, it's best to refer to them. also consider the discord.js documentation when you're writing.
