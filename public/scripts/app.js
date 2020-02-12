// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done(users => {
//     console.log(users, "this is for users");
//     for (let user of users) {
//       $("<div>")
//         .text(user.name)
//         .appendTo($("body"));
//     }
//   });
// });

$(document).ready(function() {
  let dropdown = $("#move-dropdown").html();
  // Appends all the data together for the to do list.
  const createToDoElement = function(todo) {
    // The argument is the task the user inputs.

    let $form = $("<form>").addClass("task-container");
    let $checkBox = $('<input type="checkbox">').addClass("checkbox");
    let $todo = $("<span>")
      .addClass("task-item")
      .text(todo);
    //Clone of the dropdown menu
    $form.append($checkBox, $todo, $(dropdown));

    return $form;
  };

  // Renders the data to display the todo box.
  const renderToDo = function(todos, category) {
    const $todos = $(`.${category}`);
    const $form = createToDoElement(todos);
    $todos.append($form);
  };

  // Loads all the data up to be required by a POST.

  const loadToDo = category => {
    $.ajax({
      url: "/tasksAsJson", // what is the route we need?
      method: "GET",
      dataType: "JSON",
      success: result => {
        renderToDo(result[0].title, category);
      },
      error: (jqxhr, status, err) => {
        console.error("Error on the lodaToDo function:", status, err);
      }
    });
  };

  // loadToDo(); // this is to auto populate data from our DB for the starting page.

  // when form gets submitted this should run.

  $("#submit-btn").on("click", event => {
    event.preventDefault();

    $.ajax({
      url: "/todos",
      method: "POST",
      data: $("#task-form").serialize()
    })
      .done(category => {
        $("textarea").val(""); // empties the text area
        loadToDo(category);
      })
      .fail(err => {
        console.log(err);
      });
  });

  //Change Category

  ;[
    [".edit-read", "books"],
    [".edit-eat", "restaurants"],
    [".edit-watch", "movies"],
    ["edit-buy", "products"]
  ].forEach(spec => {
    let [className, catName] = spec;

    $(className).on("click", event => {
      event.preventDefault();

      $.ajax({
        url: "/todos",
        method: "POST",
        data: $(className).closest("span")
      })
        .done(category => {
          $("textarea").val(""); // empties the text area
          loadToDo(catName);
        })
        .fail(err => {
          console.log(err);
        });
    });
  });
});
