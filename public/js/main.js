let todo = {};

$(document).ready(function() {
  // Query Data And Update UI
  async function updateUI() {
    try {
      const todos = await $.ajax({
        url: "/todo",
        method: "GET"
      });
      $("#todoList").html(todos);
      registerEditAndDeleteEvent();
    } catch (error) {
      console.log(error);
    }
  }

  // Edit Send
  $("#editModal .edit-todo-save").click(async function() {
    todo.text = $("#editModal .edit-todo-text").val();
    try {
      await $.ajax({
        url: `/todo/${todo.id}`,
        method: "PUT",
        data: todo
      });
      await updateUI();
    } catch (error) {
      console.log(error);
    } finally {
      $("#editModal").modal("hide");
    }
  });

  // Delete Send
  $("#deleteModal .delete-todo-ok").click(async function() {
    try {
      await $.ajax({
        url: `/todo/${todo.id}`,
        method: "DELETE"
      });
      await updateUI();
    } catch (error) {
      console.log(error);
    } finally {
      $("#deleteModal").modal("hide");
      console.log("qwer");
    }
  });

  // Add Send
  $("#add-btn").click(async function() {
    const input = $("#todo-input").val();
    if (!input.trim()) return;
    todo = { text: input };
    try {
      await $.ajax({
        url: "/todo",
        method: "POST",
        data: todo
      });
      $("#todo-input").val("");
      await updateUI();
    } catch (error) {
      console.log(error);
    }
  });

  // Search Send
  $("#search-btn").click(async function() {
    const searchKeywords = $("#todo-input").val();
    try {
      const todos = await $.ajax({
        url: `/todo?searchKeywords=${searchKeywords}`,
        method: "GET"
      });
      $("#todo-input").val("");
      $("#todoList").html(todos);
    } catch (error) {
      console.log(error);
    }
  });

  //register btn click event
  function registerEditAndDeleteEvent() {
    // Edit Click
    $(".btn-todo-edit").click(function() {
      const todoId = $(this).attr("data-id");
      const todoText = $(`.todo[data-id=${todoId}] .todo-text`).text();
      todo = { id: todoId, text: todoText };
      $("#editModal .edit-todo-text").val(todoText);
    });

    // Delete Click
    $(".btn-todo-delete").click(function() {
      todo = { id: $(this).attr("data-id") };
    });
  }

  registerEditAndDeleteEvent();
});
