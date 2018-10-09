var test = require('tape');
var request = require('supertest');
var app = require('../server');

test('Correct users returned', function (t) {
  request(app)
    .get('/users')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res) {
      var expectedUsers = ['John', 'Betty', 'Hal'];

      t.error(err, 'No error');
      t.same(res.body, expectedUsers, 'Users as expected');
      t.end();
    });
});

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

test('Posts individual users', function (t) {
  let newName = { name: 'Billy' }
  request(app)
    .post('/users')
    .send(newName)
    .expect(201)
    .expect('Content-Type', /json/)
    .end(function (err, res) {
      result = ['John', 'Betty', 'Hal', 'Billy']
      t.error(err, 'No error');
      t.same(res.body, result, 'Users as expected');
      t.end();
    });
});
