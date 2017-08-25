  //it has began dun dun dun.....
  var questions = [{
    question: "Where is Ethiopia located?",
    choices: ['Asia', 'East Africa', 'USA', 'North Africa', 'South Africa'],
    answer: "East Africa"
    }, {
    question: "What is the main language of Ethiopia?",
    choices: ['Arabic', 'English', 'Amharic', 'Spanish', 'French'],
    answer: 'Amharic'
    }, {
    question: "How many languages are spoken in Ethiopia?",
    choices: [10, 1, 80, 5, 43],
    answer: 80
    }, {
    question: "What is the capital of Ethiopia?",
    choices: ['Addis Abeba', 'lagos', 'Kampala', 'Annapolis', 'Hargesa'],
    answer: 'Addis Abeba'
    }, {
    question: "How many countries is Ethiopia surrounded by?",
    choices: [20, 2, 6, 2, 5],
    answer: 6
  }];

  var questionCounter = 0;
  //Keeps track of the number of questions
  var selections = [];
  //the user selection
  var quiz = $('#quiz');

  displayNext();
  //displays the initial question

  $('#next').on('click', function (e) {
  e.preventDefault();
  //the next button event click handler
  if(quiz.is(':animated')) {
  return false;
  }
  choose();

//if no selection was made and you hit the next button then an alert will pop up
  if (isNaN(selections[questionCounter])) {
  alert('Come on man, finish the quiz!!');
  } else {
  questionCounter++;
  displayNext();
  }
  });


  $('#prev').on('click', function (e) {
  e.preventDefault();
  // Event click handler for prev button. This button will allow th user to go to the previous question.

  if(quiz.is(':animated')) {
  return false;
  }
  choose();
  questionCounter--;
  displayNext();
  });

  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
  e.preventDefault();
  //if my quiz is active then the start button needs to be hidden
  if(quiz.is(':animated')) {
  return false;
  }
  questionCounter = 0;
  selections = [];
  displayNext();
  $('#start').hide();
  });

  //makes my buttons active when the mouse is used and below that makes it unactive
  $('.button').on('mouseenter', function () {
  $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
  $(this).removeClass('active');
  });

  function createQuestionElement(index) {
  var qElement = $('<div>', {
  id: 'question'
  });

  var question = $('<p>').append(questions[index].question);
  qElement.append(question);

  var radioButtons = createRadios(index);
  qElement.append(radioButtons);

  return qElement;
  }

  // Creates a list of the answer choices as radio inputs aka the circle buttons
  function createRadios(index) {
  var radioList = $('<ol>');
  var item;
  var input = '';

  for (var i = 0; i < questions[index].choices.length; i++) {
    item = $('<li>');
    input = '<input type="radio" name="answers" value=' + i + ' />';
    input += questions[index].choices[i];
  item.append(input);
  radioList.append(item);
  }
  return radioList;
  }

  function choose() {
  selections[questionCounter] = +$('input[name="answers"]:checked').val();
  }

  // This displays the next question
  function displayNext() {
  quiz.fadeOut(function() {
  $('#question').remove();

  if(questionCounter < questions.length){
    var nextQuestion = createQuestionElement(questionCounter);
    quiz.append(nextQuestion).fadeIn();
    if (!(isNaN(selections[questionCounter]))) {
      $('input[value='+selections[questionCounter]+']').prop('checked', true);
  }

  // Controls display of 'prev' button
  if(questionCounter === 1){
    $('#prev').show();
    } else if(questionCounter === 0){

    $('#prev').hide();
    $('#next').show();
    }
    }else {
  var scoreElem = displayScore();
    quiz.append(scoreElem).fadeIn();
    $('#next').hide();
    $('#prev').hide();
    $('#start').show();
  }
  });
  }
//  function displayResult(){
//     if(selection === answer){
// alert ("You got it correct!");
// }  else{ alert("WROOOONNNGGGG!!!")
//  }
