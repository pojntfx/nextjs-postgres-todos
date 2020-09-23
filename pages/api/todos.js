import query from "../../lib/db";

const todos = async (req, res) => {
  switch (req.method) {
    case "GET": {
      const todos = await query`select * from todos order by insertDate;`;

      res.statusCode = 200;
      res.json(
        todos.map((t) => ({
          id: t.id,
          title: t.title,
          body: t.body,
        }))
      );

      return;
    }

    case "POST": {
      if (!req.body.title || !req.body.body) {
        res.status = 422;
        res.end("missing todo title or body");

        return;
      }

      const [newTodo] = await query`insert into todos (title, body, insertDate)
values (${req.body.title}, ${req.body.body}, current_timestamp)
returning *;`;

      res.statusCode = 201;
      res.json({
        id: newTodo.id,
        title: newTodo.title,
        body: newTodo.body,
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

export default todos;
