process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let expect = chai.expect;
var mongoose = require('mongoose')
var User = require('../server/database_user')


chai.use(chaiHttp);
chai.use(require('chai-json'));

let user_details = {
  name: 'Billy',
  email: 'billy@email.com',
  password: 'billy123'
};


describe('Create Account, Login and Check Token', () => {
  let db = mongoose.connection;
  before((done) => {
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('connected!');
    })
    console.log('Testing')
    done()
  })

  after((done) => {
    db.close()
    done()
  })

  afterEach((done) => {
    User.deleteMany({}, function(err) {});
    done();
  })

  describe('/GET users', () => {
    it('displays all the current users', (done) => {
      let dog = new User({ name: 'dog', email: "dog@dog.com", password: 'dog123' });
      dog.save()
      chai.request(server)
      .get('/users')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a.jsonObj()
        res.body[0].name.should.be.eql("dog");
        done();
      });
    });
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
          console.log(res.body)
          res.body[0].name.should.be.eql('Billy');
          done();
        });
      });
    });
  });
});


//
// describe('/GET users/id', () => {
//   it('displays the user with the given id', (done) => {
//     chai.request(server)
//       .get('/users/0')
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.eql('John')
//         done();
//       });
//   });
// });
//
// describe('/DELETE users/id', () => {
//   it('removes the user with the given id', (done) => {
//     chai.request(server)
//       .delete('/users/3')
//       .end((err, res) => {
//         res.should.have.status(202);
//         chai.request(server)
//           .get('/users')
//           .end((err, res) => {
//             res.should.have.status(200);
//             res.body.should.be.eql(['John', 'Betty', 'Hal'])
//             done();
//           })
//       });
//   });
//
//   it('returns 400 if id does not exist', (done) => {
//     chai.request(server)
//       .delete('/users/4')
//       .end((err, res) => {
//         res.should.have.status(400);
//         done();
//       });
//   });
// });
//
// describe('/PUT users/id', () => {
  //   it('modifies the user with the given id', (done) => {
    //     chai.request(server)
    //       .put('/users/0')
    //       .send(user_details)
    //       .end((err, res) => {
      //         res.should.have.status(202);
      //         chai.request(server)
      //           .get('/users')
      //           .end((err, res) => {
        //             res.should.have.status(200);
        //             res.body.should.be.eql(['Billy', 'Betty', 'Hal'])
        //             done();
        //           })
        //       })
        //   })
        //
        //   it('returns 400 if id does not exist', (done) => {
          //     chai.request(server)
          //       .put('/users/5')
          //       .end((err, res) => {
            //         res.should.have.status(400);
            //         done();
            //       });
            //   });
            // })
