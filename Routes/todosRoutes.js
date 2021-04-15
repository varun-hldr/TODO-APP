const router = require("express").Router();
const Todos = require("../Models/todosModel");
const Groups = require("../Models/groupModel");


// Verify Token
const verify = require("../verifyToken");

formatTodos = (groups, tasks) => {
  let formattedToDos = [];
  const added = [];
  groups.forEach(group => {
      // console.log("Processing groups", group._id, group.name, tasks);
      const groupTask = tasks.filter(task => {added.push(task._id); return task.group === group._id.toString() });
      formattedToDos.push({id: group._id, group: group.name, tasks: groupTask});
  })
  // const uncategorizedTodos = tasks.filter(task => !added.includes(task._id));
  // formattedToDos= [{id: 0, group: "Uncategorized", tasks: uncategorizedTodos}].concat(formattedToDos);
  return formattedToDos;
}

// Get All Todo
router.get("/", verify, async (req, res) => {
  const groups = await Groups.find({user: req.user.user._id});
  const todos = await Todos.find({user: req.user.user._id});
  
  res.send({ todos: formatTodos(groups, todos) });
});

// Get Todo by ID
router.post("/", verify, async (req, res) => {
  console.log("Request to create TODO received");
  const group = await Groups.findOne({_id: req.body.group});
  if(!group) return res.send({error: "Invalid group Id"});
  console.log("===>", req.user);
  const todo = await new Todos({user: req.user.user._id, task: req.body.task, group: req.body.group}).save();
  res.send({todo, message: "Successfully created"});
});

// Update Todo
router.put("/:id", verify, async (req, res) => {
  console.log("Update API request called", req.params.id);
  if (req.body.group) {
    const group = await Groups.findOne({ _id: req.body.group, user: req.user.user._id});
    if(!group) return re.send({error: "Invalid Group Id"});
  }
  const foundTodos = await Todos.findOne({_id: req.params.id});
  if(!foundTodos) return res.send({error: "Invalid Todos ID"});
  const user = await Todos.updateOne(
    { _id: req.params.id },
    {
      $set: {
        task: req.body.task ? req.body.task : foundTodos.task,
        group: req.body.group ? req.body.group : foundTodos.group,
        status: req.body.status ? req.body.status : foundTodos.status
      },
    }
  );
  res.send({ message: "Successfully Updated" });
});

// Update Todo
router.put("/favorite/:id", async (req, res) => {
  console.log("Request to fav toggle received", req.params.id)
  const foundTodos = await Todos.findOne({_id: req.params.id});
  if(!foundTodos) return res.send({error: "Invalid Todos ID"});
  const user = await Todos.updateOne(
    { _id: req.params.id },
    {
      $set: {
        favorite: !foundTodos.favorite
      },
    }
  );
  res.send({ message: "Successfully Updated" });
});


// Update Todo
router.put("/completed/:id", async (req, res) => {
  const foundTodos = await Todos.findOne({_id: req.params.id});
  if(!foundTodos) return res.send({error: "Invalid Todos ID"});
  const user = await Todos.updateOne(
    { _id: req.params.id },
    {
      $set: {
        completed: !foundTodos.completed 
      },
    }
  );
  res.send({ message: "Successfully Updated" });
});

// Delete Todo
router.delete("/:id", verify, async (req, res) => {
  const todo = await Todos.deleteOne({ _id: req.params.id, user: req.user.user._id });
  if (!todo) return res.send("invalid Id");
  res.send({ message: "Successfully deleted" });
});

module.exports = router;