function buildConfig(env){
    if(!env) env='dev';
    return require('./build/'+env+'.js')(env);
}

module.exports = buildConfig;