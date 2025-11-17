let todos = [
  { id: 1, title: "Task 1", description: "Desc 1", completed: false },
  { id: 2, title: "Task 2", description: "Desc 2", completed: true },
  { id: 3, title: "Task 3", description: "Desc 3", completed: false },
  { id: 4, title: "Task 4", description: "Desc 4", completed: true },
];
export default function WorkingWithArrays(app) {
  const getTodos = (req, res) => {
    const { completed } = req.query;
    if (completed !== undefined) {
      const completedBool = completed === "true";
      const completedTodos = todos.filter((t) => t.completed === completedBool);
      res.json(completedTodos);
      return;
    }

    res.json(todos);
  };
  const getTodoById = (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    res.json(todo);
  };
  const createNewTodo = (req, res) => {
    const newTodo = {
      id: new Date().getTime(),
      title: "New Task",
      completed: false,
    };
    todos.push(newTodo);
    res.json(todos);
  };
  const postNewTodo = (req, res) => {
    const newTodo = { ...req.body, id: new Date().getTime() };
    todos.push(newTodo);
    res.json(newTodo);
  };

  const removeTodo = (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    todos.splice(todoIndex, 1);
    res.json(todos);
  };
  const deleteTodo = (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    todos.splice(todoIndex, 1);
    res.sendStatus(200);
  };

  const updateTodoTitle = (req, res) => {
    const { id, title } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todo.title = title;
    res.json(todos);
  };

  const updateTodoCompleted = (req, res) => {
  const id = parseInt(req.params.id);
  const completed = req.params.completed === "true";

  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  todo.completed = completed;       
  res.json(todo);                
};

 const updateTodoDescription = (req, res) => {
  const id = parseInt(req.params.id);
  const description = req.params.description;

  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  todo.description = description;    
  res.json(todo);                    
};


app.get("/lab5/todos/create", createNewTodo);
app.post("/lab5/todos", postNewTodo);
app.get("/lab5/todos", getTodos);

app.get("/lab5/todos/:id/completed/:completed", updateTodoCompleted);
app.get("/lab5/todos/:id/description/:description", updateTodoDescription);
app.get("/lab5/todos/:id/title/:title", updateTodoTitle);

app.delete("/lab5/todos/:id", deleteTodo);
app.get("/lab5/todos/:id/delete", removeTodo);

app.get("/lab5/todos/:id", getTodoById);
  
}