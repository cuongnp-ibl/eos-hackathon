const fs           = require('fs')
const path         = require('path')
const childProcess = require('child_process')

const moduleDirectory = path.resolve(__dirname, '../modules')

fs.readdirSync(moduleDirectory)
  .forEach((module) => {
    let modulePath = path.join(moduleDirectory, module)

    if (!fs.existsSync(path.join(modulePath, 'package.json'))) {
      return
    }

    childProcess.spawn('npm', ['i'], { env: process.env, cwd: modulePath, stdio: 'inherit' })
  })

// Symlink the `modules` director to the root of node_modules -- make it the easy way require
if(!fs.existsSync('./node_modules/modules')){
  childProcess.exec('mkdir -p node_modules & cd node_modules && ln -sf ../modules modules', (error, stdout, stderr) => {
    if (error) {
      console.error(`PreInstall exec error: ${error}`);
      return;
    }
  });
}

