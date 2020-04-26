function showRangeSliderValue(val) {
    $('.range-slider span').text(val);
}


function catchUserChoiceForKeys(button){
    button.addEventListener("keydown", function (event) {
        $("#key"+button.value).text(event.key);
    }, false);

}

function randomizeGameSettings(){
    //randomize number of balls
    let randomNumOfBalls =50+ Math.floor(Math.random()*40);
    $('.range-slider span').text(randomNumOfBalls);
    $('.range-slider input[type=range]').val(randomNumOfBalls);
    //randomize balls color
    let firstColor=chooseRandomColor();
    $('input[name=5ptColor]').val(firstColor);
    let secondColor=chooseRandomColor();
    while(firstColor === secondColor)
        secondColor=chooseRandomColor();
    $('input[name=15ptColor]').val(secondColor);
    let thirdColor=chooseRandomColor();
    while(thirdColor === firstColor || thirdColor === secondColor)
        thirdColor=chooseRandomColor();
    $('input[name=25ptColor]').val(thirdColor);
    //randomize number of monsters
    let numMonsterOptions = $('select[name=numMonsters]').find('option'),
        random=Math.floor(Math.random() * numMonsterOptions.length)+1;
    $('select[name=numMonsters]').val(random);
    //randomize Game duration
    $('input[name=gameTime]').val(Math.floor(Math.random()*60)+60);
    //randomize Game keys
    $('#keyUp').text("ArrowUp");
    $('#keyDown').text("ArrowDown");
    $('#keyRight').text("ArrowRight");
    $('#keyLeft').text("ArrowLeft");
}

function chooseRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function allGameSettingSet(){
    let keysSelected = $('#keyUp').text()!=='' &&  $('#keyDown').text()!==''  && $('#keyRight').text()!==''
    && $('#keyLeft').text();
    let gameDurationSet = $('input[name=gameTime]').val()!=='';
    if(keysSelected && gameDurationSet){
        let gameDuration= $('input[name=gameTime]').val();
        if (gameDuration <60) {
            alert("Please enter game duration above 60 seconds");
            return;
        }
        else{
        $("#welcome").hide();
		$("#login").hide();
		$("#register").hide();
	 	$("#gameSettings").hide();
	 	var colorToFill;
	 	//fill 5pt to present user
        colorToFill=$('input[name=5ptColor]').val();
        $('input[name=5PtKeyColor]').val(colorToFill);
        //fill 15pt to present user
        colorToFill=$('input[name=15ptColor]').val();
        $('input[name=15PtKeyColor]').val(colorToFill);
        //fill 25pt to present user
        colorToFill=$('input[name=25ptColor]').val();
        $('input[name=25PtKeyColor]').val(colorToFill);
	 	Start();
    	$("#gamePlay").show();
        return true;
        }
    }
    else{
        alert("You must set key games and time or choose random option!")
        return false;
    }
}



