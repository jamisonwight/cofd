This is a modification of the JointsWP SASS boilerplate using Foundation 6

## Getting Started 
Open up your terminal and navigate to the Wordpress themes folder and clone the repo files. 
```bash
$ cd my-wordpress-folder/wp-content/themes/
$ git clone https://github.com/departika/dev-boilerplate.git
$ cd departika
```



## Install Yarn
Yarn is a node package manager that works better than the standard npm manager by automatically fixing any version issues with package dependencies. You can install Yarn through the Homebrew package manager (https://brew.sh/). This will also install Node.js if it is not already installed. 
```bash
$ brew install yarn
```
If you use nvm, or already have Node installed, you should exclude installing Node.js.
```bash
$ brew install yarn --without-node
```



## Install Gulp
Gulp is used to compile the Foundation SASS. We use NPM instead of Yarn so we can install it globally
```bash
npm install -g gulp-cli
```



## Install Webpack
Install Webpack gobally so we can compile Javascript. Webpack will take our seperate module files and bundle them all into one file.
```bash
npm install -g webpack-cli
```



## Install All NPM Packages
This will install all the dev dependencies that are in the package.json file
```bash
yarn install 
```
or
```bash
yarn 
```



## Adding NPM Packages
To add an npm package, which there is pretty much one for every JS library out there, you simply run:
```bash
yarn add -D package-you-want-installed
```
This will add a dependancy in the json file.

To remove the dependancy run:
```bash
yarn remove -D package-you-want-removed
```


## Setup 
First run gulp to compile Foundation files
```bash
yarn gulp
```
You should only have to do this once.

To watch your SASS files and Javascript run:
```bash
yarn watch
```
This will watch your JS and SASS files for any changes and then compile.



## NOTES
SASS already adds vendor prefixes so we do not need to add them anymore.
Webpack uses Babel so we can write ES6+ Javascript and use its latest features.
By default Scroll Magic and Fancybox are already added as a Node dependency. All you have to do is import it into a JS file. 