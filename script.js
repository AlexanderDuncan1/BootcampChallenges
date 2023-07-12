$(document).ready(function() {
  // Function to update the current date and time
  function updateDateTime() {
    const currentDate = dayjs().format('dddd, MMMM D, YYYY, h:mm:ss A');
    $('#currentDay').text(currentDate);

    const currentHour = dayjs().hour();

    $(".time-block").each(function() {
      const blockHour = parseInt($(this).attr("id").split("-")[1]);

      if (blockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  // Update the current date and time immediately
  updateDateTime();

  // Update the current date and time every second
  setInterval(updateDateTime, 1000);

  // Save Button
  $('.saveBtn').on('click', function() {
    const blockId = $(this).parent().attr('id');
    const userInput = $(this).siblings('.description').val();
    localStorage.setItem(blockId, userInput);
  });

  // Load saved data
  $('.time-block').each(function() {
    const blockId = $(this).attr('id');
    const savedUserInput = localStorage.getItem(blockId);
    if (savedUserInput) {
      $(this).find('.description').val(savedUserInput);
    }
  });
});


function preclassdrill(inputValue) {
  return Number.preclassdrill(inputValue);

  
}

