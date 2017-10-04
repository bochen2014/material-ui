/* eslint-disable no-console,flowtype/require-valid-file-annotation */

const childProcess = require('child_process');
const ngrok = require('ngrok');
const webpack = require('webpack');
const httpServer = require('http-server');
const writeFile = require('./utils/writeFile');

function runSeleniumTests(options) {
  const {
    local = false,
    environment = 'chrome',
    tests = 'test/e2e',
    webpackConfig,
    serverRoot,
  } = options;
  const compiler = webpack(webpackConfig);

  const server = httpServer.createServer({ root: serverRoot });

  function initLocalTunnel(cb) {
    ngrok.connect(8080, (err, url) => {
      if (err) {
        throw err;
      } else {
        process.env.SELENIUM_LAUNCH_URL = url;
        console.log(`Connected to ${url} (proxy to http://locahost:8080)`);
        cb();
      }
    });
  }

  function execTests() {
    const child = childProcess.spawn(
      '.\\node_modules\\.bin\\nightwatch.cmd',
      [
        '-c',
        local ? 'test/nightwatch.local.conf.js' : 'test/nightwatch.conf.js',
        '-e',
        environment,
        tests,
      ],
      {
        stdio: [0, 1, 2], //calling-process.stdin: 0, calling-process.stdout:1, calling-process.err:2
      },
    );

    child.on('close', (exitCode) => {
      console.log('closed! exit code:', exitCode);
      process.exit(exitCode);
    });

    child.on('error', (childErr) => {
      console.log(childErr);
      throw childErr;
    });
  }

  function bootServer() {
    console.log('Booting HTTP server');

    server.listen(8080, () => {
      console.log('Server listening on port 8080\n--------------------------');

      childProcess.exec('git rev-parse --short HEAD', (err, stdout) => {
        process.env.MUI_HASH = stdout;
        initLocalTunnel(execTests);
      });
    });
  }

  function cleanUp() {
    ngrok.disconnect();
    ngrok.kill();
    server.close(() => {
      console.log('Shut down server.');
    });
  }

  function buildSite() {
    writeFile('webpack.config.json', webpackConfig);

    compiler.run((err) => {
      if (err) {
        throw err;
      }
      bootServer();
    });
  }

  // Kick it off
  buildSite();

  process.on('exit', cleanUp);
  process.on('SIGINT', cleanUp);
  process.on('uncaughtException', cleanUp);
}

module.exports = runSeleniumTests;
