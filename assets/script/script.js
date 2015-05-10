/**
 * Created by École on 2015-05-06.
 */

window.onload=init;

function init(){

}


var i=1;
var fieldset=document.getElementsByTagName("fieldset");
var taux = 0;

function affiche_taux(){
    $('#footer').html('<input id="next" onclick="slide()" type="button" value="Suivant"/><p id="result">Votre taux d\'emission de Co2 est de ' +taux+'</p>');

}

function slide(){
    if (i==1){
        fieldset[i-1].className="inactive";
        fieldset[i].className="inactive";
        fieldset[i+1].className="active";
    }
    i++;
    fieldset[i-1].className="inactive";
    fieldset[i].className="active";
}


var multiplicateur = 0;
function calcul_taux() {
    var fieldset3 = document.getElementById("fieldset3");
    var km_box = fieldset3.getElementsByTagName('label')[1];
    var essence_box = fieldset3.getElementsByTagName('label')[2];
    var diesel_radio = fieldset3.getElementsByTagName('label')[3];
    var essence_checkbox = fieldset3.getElementsByTagName('label')[4];
    var qte_deplacement_range = fieldset3.getElementsByTagName('label')[5];
    var moyen_transport = document.getElementById('moyen_transport').selectedOptions[0].id;

    switch (moyen_transport) {
        case "Voiture":
            multiplicateur=0.21;
            km_box.className="active input_label";
            essence_box.className="active input_label";
            diesel_radio.className="active radio_label";
            essence_checkbox.className="active radio_label";
            qte_deplacement_range.className="active input_label";
            calcul_emission();
            break;
        case "métro":
            multiplicateur=0.07;
            km_box.className="active input_label";
            essence_box.className="inactive input_label";
            diesel_radio.className="inactive radio_label";
            essence_checkbox.className="inactive radio_label";
            qte_deplacement_range.className="active input_label";
            calcul_emission();
            break;
        case "velo":
            multiplicateur=0;
            km_box.className="inactive input_label";
            essence_box.className="inactive input_label";
            diesel_radio.className="inactive radio_label";
            essence_checkbox.className="inactive radio_label";
            qte_deplacement_range.className="active input_label";
            taux =0.00;
            affiche_taux();
            break;
        case "pied":
            multiplicateur=0;
            km_box.className="inactive input_label";
            essence_box.className="inactive input_label";
            diesel_radio.className="inactive radio_label";
            essence_checkbox.className="inactive radio_label";
            qte_deplacement_range.className="active input_label";
            taux=0.00;
            affiche_taux();
            break;
        case "VUS":
            multiplicateur=0.30;
            km_box.className="active input_label";
            essence_box.className="active input_label";
            diesel_radio.className="active radio_label";
            essence_checkbox.className="active radio_label";
            qte_deplacement_range.className="active input_label";
            calcul_emission();
            break;
        case"covoiturage":
            multiplicateur=0.09;
            km_box.className="active input_label";
            essence_box.className="active input_label";
            diesel_radio.className="active radio_label";
            essence_checkbox.className="active radio_label";
            qte_deplacement_range.className="active input_label";
            calcul_emission();
            break;
        case "moto":
            multiplicateur=0.14;
            km_box.className="active input_label";
            essence_box.className="active input_label";
            diesel_radio.className="active radio_label";
            essence_checkbox.className="active radio_label";
            qte_deplacement_range.className="active input_label";
            calcul_emission();
            break;
    }
}

function calcul_emission(){
    var multipl = multiplicateur;
    var nbr_km = parseInt(document.getElementById('km_box').value);
    var nbr_essence = parseInt(document.getElementById('essence').value);
    var nbr_deplacement = parseInt(document.getElementById('qte_deplacement').value);
    var diesel_radio = document.getElementById('diesel');
    var essence_radio = document.getElementById('essence2');

    var emission_nbr_essence = 0;

    if (diesel_radio.checked){
        emission_nbr_essence = (parseFloat(Math.round(nbr_essence * 100) / 100).toFixed(2))*2.68;
    }
    else {
        emission_nbr_essence = (parseFloat(Math.round(nbr_essence * 100) / 100).toFixed(2))*2.33;
    }
    var taux_non_arrondi = ((multipl*nbr_km)+emission_nbr_essence)*nbr_deplacement;
    taux = parseFloat(Math.round(taux_non_arrondi * 100) / 100).toFixed(2);
    affiche_taux();

}
