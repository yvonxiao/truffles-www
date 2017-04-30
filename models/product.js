const products = require('../db/product.json');
var defaultSeriesParam,paramSeriesMap;

module.exports = {

    getDefaultSeriesParam: function getDefaultSeriesParam(){
        if(!defaultSeriesParam){
            for(let seriesName of Object.keys(products)){
                defaultSeriesParam = products[seriesName]["param"];
                break;
            }
        }
        return defaultSeriesParam;
    },

    getSeriesName: function getSeriesName(seriesParam){
        if(!paramSeriesMap){
            paramSeriesMap = new Map();
            for(let tmpSeriesName of Object.keys(products)){
                paramSeriesMap.set(products[tmpSeriesName]["param"],tmpSeriesName);
            }
        }
        return paramSeriesMap.get(seriesParam);
    },

    getProductPage: function getProductPage(seriesName,pageNo){
        let pageUp = true,pageDown = true,series = products[seriesName];
        let items = series["items"],totalPage = items.length;
        if(pageNo<2) pageUp = false;
        if(pageNo>totalPage-1) pageDown = false;

        let productPage = {
            "currentSeriesName":seriesName,
            "paramSeriesMap":paramSeriesMap,
            "pageNo":Number.parseInt(pageNo),
            "hasPageUp":pageUp,
            "hasPageDown":pageDown,
            "descType":series["descType"],
            "pageItems":items[pageNo-1]
        }

        return productPage;
    }
}