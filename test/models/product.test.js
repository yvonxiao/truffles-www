const productModel = require('../../models/product.js')

describe('test/models/product.test.js',function(){

    it('should return a string value in seriesArr',function(){
        let seriesArr = ['best-seller-series',
            'row-block-series',
            'shell-series',
            'liqueur-series',
            'wedding-series',
            'gift-box-series'];
        seriesArr.indexOf(productModel.getDefaultSeriesParam()).should.not.equal(-1);
    });

    it('should return productBestSellerSeries which is the series name by the best-seller-series parameter',function(){
        productModel.getSeriesName('best-seller-series').should.equal('productBestSellerSeries');
    });


});