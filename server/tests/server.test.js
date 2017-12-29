const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

/* Leert die Datenbank vor dem eigentlich Test und jedem it(..)*/
beforeEach((done) => {
  Todo.remove({}).then(() => done());
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
            Datenbank vorhanden ist */
        Todo.find().then((todos) => {
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

        Todo.find().then((todos) => {
          expect(todos.length).toBe(0);
          done();
        }).catch((e) => done(e))
      });
  });
});
