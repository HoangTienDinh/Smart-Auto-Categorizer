

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


const createToDoElement = function(todo, category) { // The argument is the task the user inputs.
  // let $form = $('<form>').addClass('task-container')
  // let $checkBox = $('<input type="checkbox">').addClass('checkbox')
  // let $todo = $('<span>').addClass('task-item').text(todo).addClass(`${category}`);
  // $form.append($checkBox, $todo);
  // return $form;
  `
  <article class="tweet" id="article-tweet">
    <header class="tweet" id="article-tweet">
    <span class="task-title" src="${task.title.text}</span>
    <span class="task-category" src=${task.category.text}</span>
  `
};


// Writing helper function for API calling 
// add helper function for api

$(document).ready(function () {

// Appends all the data together for the to do list.
const createToDoElement = function(todo) { // The argument is the task the user inputs.

  let $form = $('<form>').addClass('task-container')
  let $checkBox = $('<input type="checkbox">').addClass('checkbox')
  let $todo = $('<span>').addClass('task-item').text(todo); // Not sure what elements/ids/classes are being used yet
  $form.append($checkBox, $todo);

  return $form;
};

// Renders the data to display the todo box.
const renderToDo = function(todos, category) {

  const $todos = $(`.${category}`);
  const $form = createToDoElement(todos)
  $todos.append($form);
};

// Loads all the data up to be required by a POST.

const loadToDo = (category) => {

  $.ajax({
    url: '/tasksAsJson',  // what is the route we need?
    method: 'GET',
    dataType: 'JSON',
    success: (result) => {
      renderToDo(result[0].title, category);
    },
    error: (jqxhr, status, err) => {
      console.error("Error on the lodaToDo function:", status, err);
    }
  })
}

const loadAllToDos = () => {
  $.ajax({
    url: '/tasksAsJson',  // what is the route we need?
    method: 'GET',
    dataType: 'JSON',
    success: (results) => {
      console.log(results);
      for(let result of results) {
        renderToDo(result.title, result.category);
      }
    },
    error: (jqxhr, status, err) => {
      console.error("Error on the lodaToDo function:", status, err);
    }
  })
}


const loadAllToDos = () => {
  $.ajax({
    url: '/tasksAsJson', 
    method: 'GET',
    dataType: 'JSON',
    success: (results) => {
      for (let result of results) {
        renderToDo(result.title, res)
      }

    }
  })
}


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


  loadToDos();
});

