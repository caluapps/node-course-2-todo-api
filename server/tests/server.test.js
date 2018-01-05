const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

/* (76) Dummy daten für weitere Tests für GET /todos */
const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333
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

        /* überprüft, ob nach dem erstellen der Datensatz auch in der
            Datenbank vorhanden ist
          UPDATE(76): von Todo.find() auf Todo.find({text}) */
        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  /* Challenge: bestätigt, dass kein Datensatz erstellt worden sind,
      wenn fehlerhafte Daten gesendet worden sind */
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
        }).catch((e) => done(e));
      });
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

/* Überprüft, ob die speziellen Todos auch noch da sind */
describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  /* Challenge: should return 404 if todo not found
                make new ObjectID, which won't be in the doc
                make sure to get 404 back */
  it('should return 404 if todo not found', (done) => {
    let badId = new ObjectID().toHexString();

    request(app)
      .get(`/todos/${badId}`)
      .expect(404)
      .end(done);
  });

  /* Challenge: invalid id
                /todos/123 */
  it('should return 404 for none-object ids', (done) => {
    let invalidId = 123;

    request(app)
      .get(`/todos/${invalidId}`)
      .expect(404)
      .end(done);
  });
});

/* Testet ob gelöscht wurde */
describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    var hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        /* Challenge: query database using findById,
                        toNotExist
                        expect(null).toNotExist(); */
        Todo.findById(hexId).then((todo) => {
          /* doesn't work anymore
          expect(todo).toNotExist(); */
          expect(todo).toBeNull();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is valid', (done) => {
    let invalidToDeleteId = 123;

    request(app)
      .delete(`/todos/${invalidToDeleteId}`)
      .expect(404)
      .end(done);
  });
});

/* Challenge: Testing Patch */
describe('PATCH /todos/:id', () => {
  it('should update the todo', (done) => {
    /*  grab id of first item
        update text to any, set completd to true
        200
        costum assertion:
          text is changed,
          completed true,
          completedAt is a number - toBaA */

    var hexId = todos[0]._id.toHexString();
    var toPatchFirstText = 'Update text to any';
    var toToggleFirstCompleted = true;

    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        text: toPatchFirstText,
        completed: toToggleFirstCompleted
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(toPatchFirstText);
        expect(res.body.todo.completed).toBe(toToggleFirstCompleted);
        expect(typeof(res.body.todo.completedAt)).toEqual('number');
      })
//      .end(done);

/* Optional: Query in Datenbank */

      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexId).then((todo) => {
          expect(todo.text).toBe(toPatchFirstText);
          expect(todo.completed).toBe(toToggleFirstCompleted);
          expect(typeof(todo.completedAt)).toEqual('number');
          done();

        }).catch((e) => done(e));
      });

  });

  it('should clear completedAt when todo is not completed', (done) => {

    /*  grab id of secend todo item
        update text to something different, set completed to false
        200
          text is changed,
          completed false,
          completedAt is null - toNotExist() or toBeNull() */

    var hexId = todos[1]._id.toHexString();
    var toPatchSecondText = 'Update to something different';
    var toToggleSecondCompleted = false;

    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        text: toPatchSecondText,
        completed: toToggleSecondCompleted,
        completedAt: null
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(toPatchSecondText);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toBeNull();
      })
//      .end(done);

/* Optional: Query in Datenbank */

      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexId).then((todo) => {
          expect(todo.text).toBe(toPatchSecondText);
          expect(todo.completed).toBe(toToggleSecondCompleted);
          expect(todo.completedAt).toBeNull();
          done();

        }).catch((e) => done(e));
      });

  });
});
