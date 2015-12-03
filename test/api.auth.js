//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var fs = require('fs');
var request = require('superagent');
var supertest = require('supertest');

//var expect = require('expect.js');

var assert = require('assert');

var chai = require('chai');
var expect = chai.expect;

var prot = 'https';
var host = '127.0.0.1';
    host = 'localhost';
var port = 3443;
var serv = prot + '://'+host+':'+port;

var cert = fs.readFileSync(__dirname + '/../keys/cert.pem')

var api = supertest(serv);



describe('Array', function() {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
      assert.equal(-1, [1,2,3].indexOf(0));
      assert.equal(-1, [1,2,3].indexOf(0));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});


describe('String#split', function(){
  it('should return an array', function(){
    assert(Array.isArray('a,b,c'.split(',')));
  })
})



describe('homepage', function(){
console.log(serv);
  it('2. should respond to GET',function(done){
    request
      .get(serv+'/login')
      .ca(cert)
      .end(function(err,res){
        expect(err).to.eql(null)
        assert.equal(res.statusCode,200);
        expect(res.statusCode).to.equal(200);
        done();
    });
  });
});




describe('express rest api server - auth 1', function(){
  it('1. should respond to GET',function(done){
    request
      .get(serv)
      .ca(cert)
      .end(function(err,res){
        expect(err).to.eql(null)
        assert.equal(res.statusCode,200);
        expect(res.statusCode).to.equal(200);
        done();
      })
  })
})


describe('express rest api server - auth 2', function(){
console.log(serv+'/api/apps/:appuuid')
  it('should respond 401 to GET json',function(done){
    request
      .get(serv+'/api/apps/json/appuuid.json')
      .ca(cert)
      .end(function(err,res){
        //expect(err).to.eql(null)
        assert.equal(res.statusCode,401);
        expect(res.statusCode).to.equal(401);
        done();
      })
  })

})




process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

describe('express rest api server - auth 3', function(){

  it('login post', function(done){
    request
      .post(serv+'/api/auth')
      .ca(cert)
      .send({
        email: 'random@address.fake',
        password: 'pass',
      })
//      .type('form')
      .end(function(err,res){
        //expect(err).to.eql(null)
        expect(res.statusCode).to.equal(401)
        //console.log(res.body)
        //expect(res.body.length).to.eql(1)
        //expect(res.body[0]._id.length).to.eql(24)
        //id = res.body[0]._id
        done();
      })
  })

})



describe('express rest api server - auth 4', function(){

  it('register post', function(done){
    request
      .post(serv+'/register')
      .ca(cert)
      .send({
        email: 'random@address.fake',
        password: 'pass',
      })
      .type('form')
      .end(function(err,res){
        expect(err).to.eql(null)
        expect(res.statusCode).to.equal(200)
        //console.log(res.body)
        //expect(res.body.length).to.eql(1)
        //expect(res.body[0]._id.length).to.eql(24)
        //id = res.body[0]._id
        done();
      })
  })

})


describe('express rest api server - auth 5', function(){

  it('login post', function(done){
    request
      .post(serv+'/api/auth')
      .ca(cert)
      .send({
        email: 'random@address.fake',
        password: 'pass',
      })
//      .type('form')
      .end(function(err,res){
        //expect(err).to.eql(null)
        expect(res.statusCode).to.equal(200)
        //console.log(res.body)
        //expect(res.body.length).to.eql(1)
        //expect(res.body[0]._id.length).to.eql(24)
        //id = res.body[0]._id
        done();
      })
  })

})


describe('express rest api server - auth 6', function(){
  it('should respond 200 to GET json',function(done){
    request
      .get(serv+'/api/apps/json/appuuid.json')
      .set('Authorization', 'Token 0e91f78e-64be-4335-950a-27099fcb8de1')
      .ca(cert)
      .end(function(err,res){
        //expect(res.text).to.equal('ROCK\n');
        assert.equal(res.statusCode,200);
        expect(res.statusCode).to.equal(200);
        done();
      })
  })

})





describe('express rest api server - auth 7', function(){
  it('should respond 200 to GET json',function(done){
    request
      .get(serv+'/api/apps/media/ok.png')
      .set('Authorization', 'Token 0e91f78e-64be-4335-950a-27099fcb8de1')
      .ca(cert)
      .end(function(err,res){
        //expect(res.text).to.equal('ROCK\n');
        assert.equal(res.statusCode,200);
        expect(res.statusCode).to.equal(200);
        done();
      })
  })

})







describe('express rest api server - auth 8', function(){

  it('delete post', function(done){
    request
      .post(serv+'/api/deletetestuser')
      .ca(cert)
      .send({
        email: 'random@address.fake',
        password: 'pass',
      })
      .type('form')
      .end(function(err,res){
        expect(err).to.eql(null)
        expect(res.statusCode).to.equal(200)
        //console.log(res.body)
        //expect(res.body.length).to.eql(1)
        //expect(res.body[0]._id.length).to.eql(24)
        //id = res.body[0]._id
        done();
      })
  })

})



/*


  it('retrieves an object', function(done){
    request.get('https://localhost:'+port+'/collections/test/'+id)
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body._id.length).to.eql(24)        
        expect(res.body._id).to.eql(id)        
        done()
      })
  })

  it('retrieves a collection', function(done){
    request.get('https://localhost:'+port+'/collections/test')
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(res.body.length).to.be.above(0)
        expect(res.body.map(function (item){return item._id})).to.contain(id)        
        done()
      })
  })

  it('updates an object', function(done){
    request.put('https://localhost:'+port+'/collections/test/'+id)
      .send({name: 'Peter'
        , email: 'peter@yahoo.com'})
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body.msg).to.eql('success')        
        done()
      })
  })
  it('checks an updated object', function(done){
    request.get('https://localhost:'+port+'/collections/test/'+id)
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body._id.length).to.eql(24)        
        expect(res.body._id).to.eql(id)        
        expect(res.body.name).to.eql('Peter')        
        done()
      })
  })    
  

  it('removes an object', function(done){
    request.del('https://localhost:'+port+'/collections/test/'+id)
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body.msg).to.eql('success')    
        done()
      })
  })      

*/

