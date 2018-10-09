var test = require('tape');
var request = require('supertest');
var app = require('../server');


test('Posts individual users', function (t) {
  let newName = { name: 'Billy' }
  request(app)
  .post('/users')
  .send(newName)
  .expect(302)
  .end( function (err, res) {
    t.error(err, 'No error');
    request(app)
    .get('/users')
    .end(function (err, res) {
      result = ['John', 'Betty', 'Hal', 'Billy']
      t.error(err, 'No error');
      t.same(res.body, result, 'Users as expected with new');
      t.end();
    });
  });
});

describe('api', function() {
  it('gets list of users', function(done) {
    test('Correct users returned', function (t) {
      request(app)
      .get('/users')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        var expectedUsers = ['John', 'Betty', 'Hal', 'Billy'];

        t.error(err, 'No error');
        t.same(res.body, expectedUsers, 'Three Users as expected');
        t.end();
      });
    });
    done();
  });

  it('gets individiual users', function(done) {
    test('Gets individual users', function (t) {
      request(app)
      .get('/users/0')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        var expectedUsers = 'John';

        t.error(err, 'No error');
        t.same(res.body, expectedUsers, 'Users as expected');
        t.end();
      });
    });
    done();
  });
});
