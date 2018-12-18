/**
 * Created by admin on 2017/6/30.
 */
var page = require('webpage').create();
var system = require('system');

var address = system.args[1];
var name = system.args[2];

page.open(address, function (status) {
    if (status !== 'success') {
        console.log('FAIL to load the address');
        phantom.exit(-1);
    } else {
        page.render('modules/screenShoot/temp/'+name+'.png');
        console.log('ok');
        phantom.exit(0);
    }

});