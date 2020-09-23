import query from "../../../lib/db";

const todo = async (req, res) => {
  switch (req.method) {
    case "GET": {
      const [
        fetchedTodo,
      ] = await query`select * from todos where id = ${req.query.todoId};`;

      if (!fetchedTodo) {
        res.statusCode = 404;
        res.end("todo not found");

        return;
      }

      res.statusCode = 200;
      res.json({
        id: fetchedTodo.id,
        title: fetchedTodo.title,
        body: fetchedTodo.body,
      });

      return;
    }

    case "DELETE": {
      const [
        fetchedTodo,
      ] = await query`select * from todos where id = ${req.query.todoId};`;

      if (!fetchedTodo) {
        res.statusCode = 404;
        res.end("todo not found");

        return;
      }

      await query`delete from todos where id = ${req.query.todoId};`;

      res.statusCode = 200;
      res.json({
        id: fetchedTodo.id,
        title: fetchedTodo.title,
        body: fetchedTodo.body,
      });

      return;
    }

    default: {
      res.statusCode = 405;
      res.end("method not allowed");

      return;
    }
  }
};

export default todo;
