import path from 'path'

module.exports = {
    getAssetMap : function getAssetsMap(stats){
        let assetMap = new Map(),tmpFileName,tmpName,tmpExt,tmpNameParts;
        // fonts has already been handled by webpack in css files
        // this method is used to generate a map to replace asset's name in ejs views
        let replaceAssetsExt=['.js','.css','.jpg','.png','.gif','.ico'];
        for(let asset of stats.assets){
            tmpName = asset.name;
            tmpExt = path.extname(tmpName).toLowerCase();
            if(~replaceAssetsExt.indexOf(tmpExt)){
                tmpNameParts = tmpName.split('.');
                assetMap.set(tmpNameParts[0]+tmpExt,tmpName);
            }
        }
        return assetMap;
    }
}