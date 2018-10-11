process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let expect = chai.expect;
var mongoose = require('mongoose')
let userSchema = require('../src/schemas/users')
let userModel = mongoose.model('users', userSchema)
chai.use(chaiHttp);
chai.use(require('chai-json'));

let userDetails = {
  name: 'Billy',
  email: 'billy@email.com',
  password: 'billy123'
};

let postDetails = {
  name: 'James',
  email: 'james@email.com',
  password: 'james123'
};

describe('Create Account, Login and Check Token', () => {
  let db = mongoose.connection;

  after((done) => {
    db.close()
    done()
  })

  beforeEach((done) => {
    user = new userModel(userDetails)
    user.save()
    done();
  });

  afterEach((done) => {
    userModel.deleteMany({}, function(err) {});
    done();
  })

  describe('/GET users', () => {
    it('displays all the current users', (done) => {
      chai.request(server)
      .get('/users')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a.jsonObj()
        res.body[0].name.should.be.eql("Billy");
        done();
      });
    });
  });

  describe('/POST users', () => {
    it('it should add a new user', (done) => {
      chai.request(server)
      .post('/users')
      .set('content-type', 'application/json')
      .send(postDetails)
      .end((err, res) => {
        res.should.have.status(200);
        chai.request(server)
        .get('/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body[1].name.should.be.eql('James');
          done();
        });
      });
    });
  });
  describe('/GET users/id', () => {
    it('displays the user with the given id', (done) => {
      chai.request(server)
      .get('/users')
      .end((err, res) => {
        let firstUser = res.body[0]
        chai.request(server)
          .get('/users/' + firstUser._id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body[0].name.should.be.eql('Billy')
            done();
          });
      })
    });
  });

  describe('/DELETE users/id', () => {
    it('removes the user with the given id', (done) => {
      chai.request(server)
      .get('/users')
      .end((err, res) => {
        let firstUser = res.body[0]
        chai.request(server)
          .delete('/users/' + firstUser._id)
          .end((err, res) => {
            chai.request(server)
              .get('/users')
              .end((err, res) => {
                res.should.have.status(200);
                res.body.length.should.be.eql(0)
                done();
              })
          });
      })
    });
  });

  describe('/PUT users/id', () => {
    it('modifies the user with the given id', (done) => {
      chai.request(server)
      .get('/users')
      .end((err, res) => {
        let firstUser = res.body[0]
        chai.request(server)
          .put('/users/' + firstUser._id)
          .send({name: 'Barry'})
          .end((err, res) => {
            chai.request(server)
              .get('/users')
              .end((err, res) => {
                res.should.have.status(200);
                res.body[0].name.should.be.eql("Barry")
                done();
              })
          });
      })
    })
  })
});
