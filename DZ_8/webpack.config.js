module.exports = {
    entry: './server/server.js',
    output: {
        filename: "./build.js"
    },
    resolve: {
      modulesDirectories: ['node_modules']
    }

}