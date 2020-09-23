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

    default: {
      res.statusCode = 405;
      res.end("method not allowed");

      return;
    }
  }
};

export default todos;
