import { json } from "express";

// $('#fileup').change(function(){
// //here we take the file extension and set an array of valid extensions
//     var res=$('#fileup').val();
//     var arr = res.split("\\");
//     var filename=arr.slice(-1)[0];
//     filextension=filename.split(".");
//     filext="."+filextension.slice(-1)[0];
//     valid=[".jpg",".png",".jpeg",".bmp"];
// //if file is not valid we show the error icon, the red alert, and hide the submit button
//     if (valid.indexOf(filext.toLowerCase())==-1){
//         $( ".imgupload" ).hide("slow");
//         $( ".imgupload.ok" ).hide("slow");
//         $( ".imgupload.stop" ).show("slow");
      
//         $('#namefile').css({"color":"red","font-weight":700});
//         $('#namefile').html("File "+filename+" is not  pic!");
        
//         $( "#submitbtn" ).hide();
//         $( "#fakebtn" ).show();
//     }else{
//         //if file is valid we show the green alert and show the valid submit
//         $( ".imgupload" ).hide("slow");
//         $( ".imgupload.stop" ).hide("slow");
//         $( ".imgupload.ok" ).show("slow");
      
//         $('#namefile').css({"color":"green","font-weight":700});
//         $('#namefile').html(filename);
      
//         $( "#submitbtn" ).show();
//         $( "#fakebtn" ).hide();
//     }
// });

// console.log('i can see this file')


$document.ready( () => {
    $('#form').submit((event) => {
        var formData = {
            'name': $('input[name=name]').val(),
            'email': $('input[name=email]').val(),
            'super': $('input[name=superheroAlias]').val()
        };
        $.ajax({
            type: 'POST',
            url: '/currency',
            data: formData,
            dataType: 'json',
            encode: true
        }).done((data) => {
            console.log(data)
        });
        event.preventDefault();
    })
})