import query from "../../lib/db";

const todos = async (req, res) => {
  const todos = await query`select * from todos;`;

  res.statusCode = 200;
  res.json(
    todos.map((t) => ({
      id: t.id,
      title: t.title,
      body: t.body,
    }))
  );
};

export default todos;
