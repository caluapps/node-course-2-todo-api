const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

/* (76) Dummy daten für weitere Tests für GET /todos */
const todos = [{
  text: 'First test todo'
}, {
  text: 'Second test todo'
}];

/* Leert die Datenbank vor dem eigentlich Test und jedem it(..)*/
beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

/* Testet, ob eine todo erstellt werden kann */
describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    /* der eigentliche request */
    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        /* überprüft ob nach dem erstellen der Datensatz auch in der
            Datenbank vorhanden ist
          UPDATE(76): von Todo.find() auf Todo.find({text}) */
        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e))
      });
  });

  /* Challenge: bestätigt, dass kein Datensatz erstellt worden wenn
      fehlerhafte Daten gesendet worden sind */
  it('it should not create todo with invalid body data', (done) => {

    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          console.log('Error 1: ', err);
          return done(err);
        }

        /* UDATE(76): um Test zu bestehen von .toBe(0) zu .toBe(2) */
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e))
      });
  });

  /* Überprüft die Konstanten bzw alle Einträge in der Datenbank*/
  describe('GET /todos', () => {
    it('should get all todos', (done) => {
      request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
          expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    });
  });

});
