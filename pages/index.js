import { useState } from "react";
import useSWR from "swr";
import fetcher from "../lib/fetcher";

export const getServerSideProps = async ({ req }) => {
  const todos = await fetcher(`http://${req.headers.host}/api/todos`);

  return {
    props: {
      todos,
    },
  };
};

const Home = (props) => {
  const { data: todos, err } = useSWR("/api/todos", fetcher, {
    initialData: props.todos,
  });

  if (err) return <div>😞 Failed to load todos</div>;
  if (!todos) return <div>⏳ Loading todos ...</div>;

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
