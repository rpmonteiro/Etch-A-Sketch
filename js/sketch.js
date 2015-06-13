//global variables
var defaultSize = 16;
var defaultColor = "white";

$(document).ready(function(){
	makeSquares(defaultSize);

	// listeners for ZIE buttons
	$("#sizeForm").keyup(function(event){
	    if(event.keyCode == 13){
	        $("#newSize").click();
	        event.preventDefault();
	        return false;
	    }
	});

	 $('a.toggler').click(function(){
        $(this).toggleClass('off');
        $(".square").toggleClass('squareNoGrid');
    });

	$('input#borders').change(function() {
	    if($(this).is(':checked') ) {
	    	$('.square').css('outline', "none");
	    } 
	    else {
	    	$('.square').css('outline', '1px solid white');    
	    }
	});

	$("#newSize").click(function() {
		newSize();
	});

	$("#default").click(function() {
		defaultOption();
	});

	$("#colorBox").change(function() {
		console.log("Color has changed");
		colorOption();
	});

    $("#trail").click(function() {
        trailOption();
    });

    $("#gradient").click(function() {
    	gradientOption();
    });

    $("#random").click(function() {
        randomOption();
    });
});

//creates the squares
function makeSquares(n) {

	var boardSize = $('#board').height();
	var board = $('#board');
	var square = "<div class='square'></div>";
	var squareSize = boardSize / n;
	console.log(squareSize);

	//clears the board
	$('.square').remove();

	//draws the squares
	for (var i = 0; i < (n*n); i++) {
		board.append(square);
	}

	$('.square').width(squareSize);
	$('.square').height(squareSize);

	//changes the color of the squares on mouseOver
	$('.square').mouseover(function() {
		$(this).css("background-color", defaultColor);
	});
}
function clearBoard() {
	//unbinds all square's event listeners
	$(".square").unbind();
	//resets their color
	$(".square").css("background-color", "#555");
	$(".square").css("opacity", 1);
}
function newSize() {


	var value = $("#sizeInput").val();
	console.log("user inputted " + value);

	if (value > 15 && value < 126) 
	{
		console.log("returning value");
		makeSquares(value);
	}
	else
	{
		alert("Invalid input. Try again.")
		return;
	}
	console.log("building the squares");
}

function defaultOption() {
	makeSquares(16);
}

function colorOption() {
	var newColor = "#" + $('#colorBox').val();
	console.log(newColor);

	$('.square').mouseover(function() {
		$(this).css("background-color", newColor);
	});
}

function trailOption() {
	clearBoard();
	$(".square").mouseenter(function() {
		$(this).fadeTo(0, 0);
	});
	$(".square").mouseleave(function() {
		$(this).fadeTo(850, 1);
	});
}

function gradientOption() {
	clearBoard();
	$(".square").mouseover(function() {
		var currentOpacity = $(this).css("opacity")
		if(currentOpacity != 0) {
			$(this).css("opacity", currentOpacity - .10);
		}
	});
}

function getRandomColor() {
	return (Math.random().toString(16) + '000000').slice(2, 8);
}

function randomOption() {
	clearBoard();
	$(".square").mouseover(function() {
		$(this).css("background-color", getRandomColor());
	});
}