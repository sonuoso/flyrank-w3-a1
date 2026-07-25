const repository = require("../repositories/task.repository");
const { NotFoundError, ValidationError } = require("../errors");

function getTaskById(id) {
  const result = repository.getById(id);

  if (result === undefined) {
    throw new NotFoundError(`Task ${id} is not found`);
  } else {
    return result;
  }
}

function createTask(title) {
  if (title === undefined) {
    throw new ValidationError("Title is not found");
  } else if (typeof title !== "string") {
    throw new ValidationError("Title must be a string");
  } else if (title.trim().length === 0) {
    throw new ValidationError("Title can't be empty");
  } else {
    return repository.create(title);
  }
}

function updateTask(id, changes) {
  const result = repository.getById(id);

  if (result === undefined) {
    throw new NotFoundError(`Task ${id} is not found`);
  }

  if (changes.title === undefined && changes.done === undefined) {
    throw new ValidationError("Body can't be empty");
  }

  if (changes.title !== undefined) {
    if (typeof changes.title == "string") {
      if (changes.title.trim().length == 0) {
        throw new ValidationError("Title can't be empty");
      }
    } else {
      throw new ValidationError("Title must be a string");
    }
  }

  if (changes.done !== undefined) {
    if (typeof changes.done !== "boolean") {
      const message =
        changes.title !== undefined
          ? "Done must be boolean with title present"
          : "Done must be boolean";
      throw new ValidationError(message);
    }
  }

  return repository.update(id, changes);
}

function deleteTask(id) {
  const results = repository.remove(id);

  if (results === false) {
    throw new NotFoundError(`Task ${id} is not found`);
  }
}

function getAllTasks(done) {
  if (done !== undefined && done !== "true" && done !== "false") {
    throw new ValidationError("Done must be a valid value");
  }

  return repository.getAll();
}

module.exports = { getTaskById, createTask, updateTask, deleteTask, getAllTasks };
