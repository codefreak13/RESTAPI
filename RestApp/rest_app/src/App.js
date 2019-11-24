import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";

function App() {
  const [todo, setTodo] = useState([]);
  const [load, setLoad] = useState(false);
  const [log, setLog] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      service: "",
      description: ""
    }
  );

  useEffect(() => {
    axios
      .get("http://localhost:5000/todo/get")
      .then(response => {
        console.log(response.data);
        // setLoad(true);
        return response.data.length > 1 && setTodo(response.data);
      })
      .catch(err => console.log(err));
  }, []);

  const submit = () => {
    // e.preventDefault();
    const todo = {
      service: log.service,
      description: log.description
    };
    console.log(log.service, log.description);
    axios
      .post("http://localhost:5000/todo/add", todo)
      .then(response => console.log(response.data))
      .catch(err => console.log(err));
  };

  const onChange = e => {
    setLog({
      [e.target.name]: e.target.value
    });
  };
  return (
    <div>
      {/* todo && todo.map(item=><p>{item.service}</p>: <p>{item.description}</p>) */}
      <input
        type="text"
        value={log.service}
        name="service"
        onChange={onChange}
      />
      <input
        type="text"
        value={log.description}
        name="description"
        onChange={onChange}
      />
      <input type="submit" value="submit" onClick={submit} />
      <div>
        {todo.map((item, id) => (
          <div key={id} style={{ display: "flex" }}>
            <p style={{ marginRight: 5 }}>{item.service}</p>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
