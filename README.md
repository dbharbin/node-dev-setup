#node-dev-setup
This repo has been set up as a starting point in developing nodeJS applications on the DragonBoard DB410c.

This demo sets up a simple headless nodeJS server on the DB410c.  This server can be accessed from your local network from a browser as follows:

`http://<<DB410c node server IP Address>>:3000`

But more importantly, this repo serves as a good starting point to set up a baseline node.js development environment on DB410c. 


#Introduction
Node.js is a valuable development environment for headless javascript solutions. It provides access to the thousands of Javascript packages available on [the nodejs package manager website](https://www.npmjs.com). NodeJS can also provide benefits in embedded environments.  This repo provides a starting point for a developer to begin development of nodeJS solutions in the embedded 64 bit ARM environment on the [Qualcomm DB410c](http://www.96boards.org/product/dragonboard410c/).  It will provide the framework to develop your own node solutions by providing the following:

* instructions on setting up a node.js development environment on the DB410c
* a sample project starting point that can be extended
	* a demo of a headless web server with source 
* a development environment that is setup to include several entry configurations such as a developer mode, non-developer mode, and a debugger mode that uses a node IDE for debug support.

If you have ideas and extend this demo with other nodeJS features   that would be nice to use on the DB410c, ping me.  I welcome ideas to make this demo a place where code snippets can be leveraged for further DB410c usage models in NodeJS.

#Set up
To begin, first you must install the latest stable debian build on the DB410c as explained in the next section.  Following that, you should clone this repo and follow the remaining instructions to get up and going.  You are then ready to replace the demo code in this repo with your own solutions.

##Install DB410c Build
Follow the installation instructions on the [96boards.org](http://www.96boards.org/db410c-getting-started/Quickstart/README.md/) website to install the latest pre-built Debian Linux image.  Build 144 was used for validation of this demo

node and npm are included in the pre-built image, so once you install the debian image you are ready to begin your node development.

##Customize the node development environment
Once the debian image is installed, perform the following steps to set up the board for node debug and development.

### Globally install the following node.js packages
Globally installing the packages in this section is required. From the command line on your DB410c target, execute the following:

`sudo npm install -g grunt-cli`   
`sudo npm install -g node-dev`  
`sudo npm install -g node-inspector`  

## Configure the demo development environment
From a terminal on your DB410c, create and navigate to a development directory and perform the following:

```
$mkdir node-js	// or whatever dev directory you wish
$cd node-js
$git clone https://github.com/dbharbin/node-dev-setup.git
```

Once downloaded, from the root directory of the cloned repo, prepare the demo by installing all the dependencies

`npm install`

After installng dependencies, build the project

`npm run start'

Note that one of the scripts that runs the grunt dependencies must be used to build the client bundle.js and the public/css/style.css sheet.

#Configuring for automated builds
There are several things that have been done in the package.json to automate the builds.  These don't have to be done again because they are in the package.json, but for reference this is what was done:

* `npm install grunt --save-dev`
* `npm install grunt-autoprefixer --save-dev`
* `npm install grunt-browserify --save-dev`   
* `npm install grunt-contrib-jshint --save-dev`
* `npm install grunt-contrib-less --save-dev`
* `npm install grunt-contrib-watch --save-dev`

You can see these listed in the devDependencies section of the package.json.

#Development
This demo environment has been pre-set up for efficient development and debug.  This section describes the usage of it in more detail.

##Basic Demo 
To bring up the base node.js server, the user should enter the traditional command from the command line while in the project directory:

`node app`

Then the user can bring up a local browser and monitor the demo web interface by entering the following in the browser url bar:

`http://localhost:3000`

If the user wishes he or she can substitute `localhost` with the ip address of the DB410c under test and access the demo web interface from a browser on any machine on the local network.


##Using node-dev
Substiting node-dev for when running the server allows the developer to modify configuration and not have to restart.  The server code will automatically be updated and all the user needs to do it refresh his or her browser to see the changes made.  This makes your development go faster.

`node-dev app`

Then when you edit and save a .js file the server will automatically reboot.  This works for the public/css/style.css as well.

###Custom Dev
Using this custom development mode does the same as the previous section except that it integrates in grunt watch, thus if any templates such as ./less/style.css are changed, the code base is automatically rebuilt and reloaded.

`npm run dev`

Recall that the browser must still be reloaded to see the changes take effect.

Alternatively, to begin development without automatically opening a browser on the target (and instead open one across your local network to save target memory), begin integration and test by executing the following command on the DB410c terminal:

`npm run start`

##Debugging with code-inspector
To leverage an IDE debugger, execute the following command from the development directory:

`npm run debug`

This will automatically bring up a localhost browser on port 3000, but additionally bring up a browser window with the code-inspector package.  Code-inspector will allow the user to set breakpoints evaluate variables, and other functions that are typical for an IDE for more complex debug scenarios.

**FYI's:**

* since the DB410c has only 1G of RAM, it is best to limit additional loads on the target during development.  Thus, running the browser on another platform for test, ssh'ing and developing through ssh, and executing `npm run debug` after a clean boot are all recommended.

