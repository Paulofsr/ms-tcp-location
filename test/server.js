var chai = require('chai');
var chaiSubset = require('chai-subset');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiSubset);
chai.use(chaiAsPromised);
var expect = chai.expect;
var server = require('../server');
var net             = require('net');
var client;

describe('serveHelper', function(){

    var pingWaited = '';

    before(function () {
        client = net.connect({ port: 9000 },
            function() {
            }
        );
        client.setEncoding('utf8');

        client.on('data', function(data) {
            expect(data).to.be.equal(pingWaited);
        }); 
    });

    after(function () {
        client.end();
    });

    

    describe('ms-tcp-location', function () {

        it('Should return PING', function () {

            pingWaited = "50F70A3F730150494E4773C4"
            client.write('50F70A3F7301JAHSDFKJAHDSFKJAHDFKJH73C4');

        });

        it('Should return PING but using \\n ', function () {

            pingWaited = "50F70A3F730150494E4773C4\n"
            client.write('50F70A3F7301JAHSDFKJAHDSFKJAHDFKJH73C4\n');

        });

        it('Should not return when send Type 02', function () {

            client.write('50F70A3F73025EFCF950156F017D784000008CA0F8003C013026A1029E72BD73C4');
            client.on('data', function(data) {
                expect(data).to.be.equal("ERROR");
            }); 

        });

        it('Should not return when send an invalid package', function () {

            client.write('AAAAAA');

        });

    });
});