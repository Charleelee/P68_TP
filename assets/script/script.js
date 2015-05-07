/**
 * Created by École on 2015-05-06.
 */

window.onload=init;

function init(){

}

$('#next').click(slide);

var i=0;
var fieldset=document.getElementsByTagName("fieldset");

function slide(){
    i++;
    fieldset[i-1].className="inactive";
    fieldset[i].className="active";
}










//function slide(){
//    var input, txt;
//    $('#fieldset1').slideUp(1000);
//    $('#fieldset2').slideUp(1000);
//    $('#fieldset3').slideDown(1000);
//
//
//    input = document.createElement("button");
//    txt = document.createTextNode('Suivant');
//    input.id="next_field";
//    document.getElementsByTagName("FOOTER")[0].appendChild(input);
//    input.appendChild(txt);
//    $('#next').css({
//        'display':'none'
//    });
//
//    $('#next_field').click(slide2);
//
//    $('header').text('Étape 1/13 Logement : Habitation principale');
//
//}
//
//function slide2() {
//    $('#fieldset3').slideUp(1000);
//    $('#fieldset4').slideDown(1000);
//    $('header').text('Étape 2/13 Logement : Énergie du logement');
//}