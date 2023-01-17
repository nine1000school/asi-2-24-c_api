const getDoneValue = (str) => ["true", "1", "done"].includes(str.toLowerCase())

const makeRoutes = ({ app, db }) => {
  // CREATE
  app.post("/todos", async (req, res) => {
    const {
      body: { description },
    } = req
    const lastId = db.data.lastId + 1
    const todo = {
      id: lastId,
      description,
      done: false,
    }

    await db.write({
      lastId,
      todos: {
        [lastId]: todo,
      },
    })

    res.send(todo)
  })
  // READ collection
  app.get("/todos", (req, res) => {
    res.send(db.data.todos)
  })
  // READ single
  app.get("/todos/:todoId", async (req, res) => {
    const todoId = Number.parseInt(req.params.todoId)
    const todo = db.data.todos[todoId]

    if (!todo) {
      res.status(404).send({ error: "Not found" })

      return
    }

    res.send(todo)
  })
  // PACTH
  app.patch("/todos/:todoId", async (req, res) => {
    const todoId = Number.parseInt(req.params.todoId)
    const todo = db.data.todos[todoId]

    if (!todo) {
      res.status(404).send({ error: "Not found" })

      return
    }

    const {
      body: { description, done },
    } = req
    const updatedTodo = {
      ...todo,
      description: description ?? todo.description,
      done: done ? getDoneValue(done) : todo.done,
    }

    await db.write({
      todos: {
        [todoId]: updatedTodo,
      },
    })

    res.send(updatedTodo)
  })
  // DELETE
  app.delete("/todos/:todoId", async (req, res) => {
    const todoId = Number.parseInt(req.params.todoId)
    const todo = db.data.todos[todoId]

    if (!todo) {
      res.status(404).send({ error: "Not found" })

      return
    }

    await db.write({
      todos: {
        [todoId]: undefined,
      },
    })

    res.send(todo)
  })
}

export default makeRoutes
