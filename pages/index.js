import { useState, useEffect } from "react";

const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setTodos([
      {
        id: 1,
        title: "First todo",
        body: "First todo body",
      },
      {
        id: 2,
        title: "Second todo",
        body: "Second todo body",
      },
    ]);
  }, []);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [updatingTodoId, setUpdatingTodoId] = useState(-1);

  return (
    <div>
      <h1>Todos</h1>

      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          New todo title:{" "}
          <input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <br />

        <label>
          New todo body:{" "}
          <textarea
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </label>

        <br />

        <input
          type="submit"
          value={updatingTodoId == -1 ? "Create todo" : "Update todo"}
        />

        {updatingTodoId != -1 && <button type="button">Cancel edit</button>}
      </form>

      <ul>
        {todos.map((t, index) => (
          <li key={index}>
            <div>
              <h2>{t.title}</h2>
              <p>{t.body}</p>

              <button>Update todo</button>
              <button>Delete todo</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
