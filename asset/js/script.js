$(function(){

// --- categories slidetoggle ----------------------
  var clk = 0; // for recognize the status of click

  $(".headgroup").click(function(){
    $(this).parent().children(".holderitems").slideToggle();

// --- with click on group title the icon on headgroup will change
    if (clk == 0) {
      $(this).children("i").attr("class","fas fa-angle-down");
      clk = 1;
    }
    else if (clk == 1) {
      $(this).children("i").attr("class","fas fa-angle-up");
      clk = 0;
    }

  });

// --- add item button -----------------------
  $("#additem").click(function(){
    $("#additemform").fadeIn();
  });

// --- textbox focus ----------------------
// $("#TaskTitle").focus(function(){
//   $(this).animate({"width":"400px"}, 500);
// });
// $("#TaskTitle").blur(function(){
//   $(this).animate({"width":"200px"}, 500);
// });

// --- cancel button in add item ----------------------
$("#cancelItem").click(function(){
  $("#additemform").fadeOut();

  $("#TaskTitle").val("");
  $("#TaskGroup").val("0");
  $("#formmsg").text(" ");

});

// --- createItem button in add item ----------------------

var c;
var dtarget;
// $("#createItem").click(function()
$(document).on('click','#createItem',function()
{
  var t = $("#TaskTitle").val();
  var title = t.charAt(0).toUpperCase()+t.slice(1);
  var group = $("#TaskGroup").val();
  var date = gettaskdate();
  c = '0';
  dtarget = '#delMessg';
  var item = "<li><h4>"+title+"</h4><button type='button' class='btn btn-danger deleteItem' name='button' data-toggle='modal' data-target="+dtarget+">"
  +"<i class='fas fa-minus'></i></button><label class='switch'><input type='checkbox' class='check' value="+c+"><span class='slider round'></span></label><span class='taskdate'>"+date+"</span></li>";

  $(".headgroup>h3").each(function(){
 	 var headgroupval = $(this).text();
   if (group == headgroupval &&  title.length != 0){
      $("h3[value="+headgroupval+"]").parentsUntil("li").next().append(item);
   }
   else if (group == 0 && title.length == 0){
     $("#formmsg").text("Fill the Blanks");
   }
   else if (title.length == 0){
     $("#formmsg").text("Write your Task");
   }
   else if (group == 0 ){
     $("#formmsg").text("Select a Group");
   }
  });

  $("#TaskGroup").click(function(){
    $("#formmsg").text(" ");
  });

  $("#TaskTitle").val("");
  $("#TaskGroup").val("0");
});



// --- function for getting date of task creation
function gettaskdate(){

      var createDate = new Date();
      var month = new Array();
          month[0] = "January";
          month[1] = "February";
          month[2] = "March";
          month[3] = "April";
          month[4] = "May";
          month[5] = "June";
          month[6] = "July";
          month[7] = "August";
          month[8] = "September";
          month[9] = "October";
          month[10] = "November";
          month[11] = "December";


       var tday = createDate.getDate();
       if(tday>0 && tday<10){
         tday = "0"+tday;
       }

       var resdate = tday+' '+month[createDate.getMonth()]+' '+createDate.getFullYear();
       // var time = createDate.getHours() + ":" + createDate.getMinutes() + ":" + createDate.getSeconds();
       // var res = resdate+ " "+time;
       return resdate;
}


// --- changing the value of checkbox to done or pendding ----------------------

// $(".check").click(function()
$(document).on('click','.check',function()
{
  c = $(this).val();
  if (c == 0) {
    $(this).parent(".switch").siblings(".deleteItem").attr("data-target","#delMessg2");
    var you = $(this).attr("value","1");
  }
  else if (c == 1) {
    $(this).parent(".switch").siblings(".deleteItem").attr("data-target","#delMessg");
    $(this).attr("value","0");
  }
});

// --- delete an item from groups ----------------------

  // $(".deleteItem").click(function()
  $(document).on('click','.deleteItem',function()
  {
    var delButton = $(this);
    var selectedTask = $(this).parent();
    var c = selectedTask.children(".switch").children('input[type="checkbox"]').val();

      if (c == 0) {
        $("#yes").click(function(){
           selectedTask.remove();
           $(this).attr("data-dismiss","modal");
        });
      }

  });



});
