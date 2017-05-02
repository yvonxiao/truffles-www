function buildConfig(env){
    return require('./build/'+env+'.js')(env);
}

module.exports = buildConfig;