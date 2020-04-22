function closeWindow(){
    document.getElementById('about').style.display="none";
    document.getElementById('about').close();
}


document.addEventListener('keyup', function(e) {
    if (e.code === "Escape") {// esc would close the window
        closeWindow();
    }
});

// $(".ui-widget-overlay").live("click", function (){
//     $("div:ui-dialog:visible").dialog("close");
//   });

$(document).ready(function(){
    var modal= document.getElementById("about");
    window.onclick = function (e){
        if(e.target === modal) {
            modal.style.display = "none";
            modal.close();
        }
    };
});


