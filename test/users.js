process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

let user_details = {
  'name': 'Billy'
};


describe('Create Account, Login and Check Token', () => {
  beforeEach((done) => {
    console.log('Testing')
    done();
  });

  describe('/POST users', () => {
    it('it should add a new user', (done) => {
      chai.request(server)
        .post('/users')
        .send(user_details)
        .end((err, res) => {
          res.should.have.status(201);
          chai.request(server)
            .get('/users')
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
        });
    });
  });

  describe('/GET users', () => {
    it('displays all the current users', (done) => {
      chai.request(server)
        .get('/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.eql(['John', 'Betty', 'Hal', 'Billy'])
          done();
        });
    });
  });

  describe('/GET users/id', () => {
    it('displays the user with the given id', (done) => {
      chai.request(server)
        .get('/users/0')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.eql('John')
          done();
        });
    });
  });
});
