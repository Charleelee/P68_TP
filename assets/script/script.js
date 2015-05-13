/**
 * Created by École on 2015-05-06.
 */
"use strict";
window.onload=init;

function init(){
show_map();
}

var i=1;
var fieldset=document.getElementsByTagName("fieldset");
var taux = 0;
var taux1 = 0;
var taux2 = 0;
var taux3 = 0;

function affiche_taux(){
    $('#footer').html('<input id="prev" onclick="slide_back()" type="button" value="Précédent"/><input id="next" onclick="slide()" type="button" value="Suivant"/><p id="result">Votre taux d\'emission de Co2 est de ' +taux+' Kg Co2 éq</p>');
}

function affiche_taux_final(){
    $('#footer').html('<input id="prev" onclick="slide_back()" type="button" value="Précédent"/><input type="Submit" value="Soumettre"/><p id="result">Votre taux d\'emission de Co2 est de ' +taux+ ' Kg Co2 éq</p>');
}

function validation_sexe() {

    var select = document.getElementById('genre');

    if (select.value == "Genre") {
        alert('Vous devez choisir un sexe');
    } else {
        select.className = "valid";
    }

}

function validation_mdp(){
    var mdp = document.getElementById('mdp');
    var verifmdp = document.getElementById('verifmdp');

    if (mdp.value != verifmdp.value) {
        alert('Les mot de passe ne correspondent pas !');
        verifmdp.value = "";
    }
}

function slide() {


            if (i == 1) {
                fieldset[i - 1].className = "inactive";
                fieldset[i].className = "inactive";
                fieldset[i + 1].className = "active";
            }
            i++;
            fieldset[i - 1].className = "inactive";
            fieldset[i].className = "active";

            if (fieldset[2].className == "active") {
                affiche_taux();
            }

            if (fieldset[i].id == "fieldset3") {
                document.getElementsByTagName('HEADER')[0].innerHTML = "Étape 1/3 : Transport";
            }

            if (fieldset[i].id == "fieldset4") {
                document.getElementsByTagName('HEADER')[0].innerHTML = "Étape 2/3 : Bâtiment";
            }
            if (fieldset[4].className == "active") {
                document.getElementsByTagName('HEADER')[0].innerHTML = "Étape 3/3 : Matières résiduelles";
                affiche_taux_final();
            }
            else {
                affiche_taux();
            }
        }


function slide_back() {
    if (i==2){
        fieldset[i-1].className="active";
        fieldset[i].className="inactive";
        fieldset[i-2].className="active";
        document.getElementsByTagName('HEADER')[0].innerHTML="Inscrivez-vous";
        $('#footer').html('<input id="next" onclick="slide()" type="button" value="Suivant"/>');
    }

    else {
        fieldset[i].className="inactive";
        fieldset[i-1].className="active";
    }
    i--;

    if ( fieldset[i].id =="fieldset4"){
        document.getElementsByTagName('HEADER')[0].innerHTML="Étape 2/3 : Bâtiment";
        affiche_taux();
    }

    if ( fieldset[2].className=="active" ) {
        affiche_taux();
        document.getElementsByTagName('HEADER')[0].innerHTML="Étape 1/3 : Transport";
    }



}

var multiplicateur = 0;

function calcul_taux() {
    var fieldset3 = document.getElementById("fieldset3");
    var km_box = fieldset3.getElementsByTagName('label')[1];
    var essence_box = fieldset3.getElementsByTagName('label')[2];
    var diesel_radio = fieldset3.getElementsByTagName('label')[3];
    var essence_radio = fieldset3.getElementsByTagName('label')[4];
    var qte_deplacement_range = fieldset3.getElementsByTagName('label')[5];
    var moyen_transport = document.getElementById('moyen_transport').selectedOptions[0].id;

    switch (moyen_transport) {
        case "Voiture":
            multiplicateur=0.21;
            km_box.className="active input_label";
            essence_box.className="active input_label";
            diesel_radio.className="align active radio_label";
            essence_radio.className="align active radio_label";
            qte_deplacement_range.className="active input_label";
            calcul_emission();
            break;
        case "métro":
            multiplicateur=0.07;
            km_box.className="active input_label";
            essence_box.className="inactive input_label";
            diesel_radio.className="align inactive radio_label";
            essence_radio.className="align inactive radio_label";
            qte_deplacement_range.className="active input_label";
            calcul_emission();
            break;
        case "velo":
            multiplicateur=0;
            km_box.className="inactive input_label";
            essence_box.className="inactive input_label";
            diesel_radio.className="inactive align radio_label";
            essence_radio.className="inactive align  radio_label";
            qte_deplacement_range.className="active input_label";
            taux =0.00;
            affiche_taux();
            break;
        case "pied":
            multiplicateur=0;
            km_box.className="inactive input_label";
            essence_box.className="inactive input_label";
            diesel_radio.className="inactive align radio_label";
            essence_radio.className="inactive align  radio_label";
            qte_deplacement_range.className="active input_label";
            taux=0.00;
            affiche_taux();
            break;
        case "VUS":
            multiplicateur=0.30;
            km_box.className="active input_label";
            essence_box.className="active input_label";
            diesel_radio.className="align active radio_label";
            essence_radio.className="align active radio_label";
            qte_deplacement_range.className="active input_label";
            calcul_emission();
            break;
        case"covoiturage":
            multiplicateur=0.09;
            km_box.className="active input_label";
            essence_box.className="active input_label";
            diesel_radio.className="align active radio_label";
            essence_radio.className="align active radio_label";
            qte_deplacement_range.className="active input_label";
            calcul_emission();
            break;
        case "moto":
            multiplicateur=0.14;
            km_box.className="active input_label";
            essence_box.className="active input_label";
            diesel_radio.className="align active radio_label";
            essence_radio.className="align active radio_label";
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
    var emission_nbr_essence = 0;

    if (diesel_radio.checked){
        emission_nbr_essence = (parseFloat(Math.round(nbr_essence * 100) / 100).toFixed(2))*2.68;
    }
    else {
        emission_nbr_essence = (parseFloat(Math.round(nbr_essence * 100) / 100).toFixed(2))*2.33;
    }

    var taux_non_arrondi = ((multipl*nbr_km)+emission_nbr_essence)*nbr_deplacement;
    taux1  = parseFloat(Math.round(taux_non_arrondi * 100) / 100).toFixed(2);
    taux = taux1;
    affiche_taux();
}

function calcul_emission_batiment(){
    var conso_electricité = parseInt(document.getElementById('electricité').value);
    var conso_gaz = parseInt(document.getElementById('gaz').value);
    var conso_propane = parseInt(document.getElementById('propane').value);
    var conso_mazout = parseInt(document.getElementById('mazout').value);
    var conso_bois = parseInt(document.getElementById('bois').value);

    var conso_batiment = (conso_electricité*0.0006)+(conso_gaz*1.90)+(conso_propane*1.54)+(conso_mazout*2.73)*(conso_bois*0.42);
    var taux_non_arrondi = parseInt(taux1) + conso_batiment;
    taux2 = parseFloat(Math.round(taux_non_arrondi * 100) / 100).toFixed(2);
    taux=taux2;
    affiche_taux();
}

function calcul_emission_dechet(){
    var conso_compostage = parseInt(document.getElementById('compostage').value);
    var conso_recyclage = parseInt(document.getElementById('recyclage').value);
    var conso_enfouissement = parseInt(document.getElementById('enfouissement').value);

    var conso_dechet = (conso_compostage*0.03)+(conso_recyclage*0.01)+(conso_enfouissement*1.48);
    var taux_non_arrondi = parseInt(taux2) + conso_dechet;
    taux3 = parseFloat(Math.round(taux_non_arrondi * 100) / 100).toFixed(2);
    taux = taux3;
    affiche_taux_final();
}

function show_map(){
    console.log('google map branché');
    if (navigator.geolocation != null){
        navigator.geolocation.getCurrentPosition(yesgeoloc,nogeoloc);
    }else{
        document.getElementById('error').innerHTML="Votre navigateur ne prends pas en charge la géoloc";
    }

    function yesgeoloc(pos){
        console.log('geoloc accepté');
        var latitude = pos.coords.latitude;
        var longitude = pos.coords.longitude;
        console.log(latitude,longitude);
        affich_carte(pos);
    }

    function nogeoloc(error){
        document.getElementById('error').innerHTML="Vous n'avez pas autoriser votre navigateur à vous localiser";
        console.log('geoloc refusé');
    }
}

function affich_carte(pos) {


    var latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
    var map_options = {
        zoom: 11,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControl: true
    };
    var map = new google.maps.Map(document.getElementById('map'), map_options);

    var marker = new google.maps.Marker({
        position:  new google.maps.LatLng(45.548141, -73.624684),
        map: map,
        title:"Villeray"
    });
    var infowindow = new google.maps.InfoWindow({
        content: 'Taux de pollution : 13%'
    });
    google.maps.event.addListener(marker, 'mouseover', function() {
        infowindow.open(map,marker);
        infowindow2.close(map, marker2);
        infowindow3.close(map, marker3);
    });

    var marker2 = new google.maps.Marker({
        position: latlng,
        map: map,
        title:"Position actuelle"
    });
    var infowindow2 = new google.maps.InfoWindow({
        content: 'Taux de pollution : 19%'
    });
    google.maps.event.addListener(marker2, 'mouseover', function() {
        infowindow2.open(map,marker2);
        infowindow.close(map,marker);
        infowindow3.close(map,marker3);
    });

    var marker3 = new google.maps.Marker({
        position: new google.maps.LatLng(45.523569, -73.589048),
        map: map,
        title:"Plateau Mont-royal"
    });
    var infowindow3 = new google.maps.InfoWindow({
        content: 'Taux de pollution : 28%'
    });
    google.maps.event.addListener(marker3, 'mouseover', function() {
        infowindow3.open(map,marker3);
        infowindow2.close(map,marker2);
        infowindow.close(map,marker);
    });


    var circle = new google.maps.Circle({
        map: map,
        radius: 1263,
        strokeColor: '#325E14',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillOpacity: 0.35,
        fillColor: '#325E14'

    });
    var circle2 = new google.maps.Circle({
        map: map,
        radius: 2063,
        strokeColor: '#e5e120',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillOpacity: 0.35,
        fillColor: '#e5e120'
    });
    var circle3 = new google.maps.Circle({
        map: map,
        radius: 1063,
        strokeColor: '#BF2012',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillOpacity: 0.35,
        fillColor: '#BF2012'
    });
    circle.bindTo('center', marker, 'position');
    circle2.bindTo('center', marker2, 'position');
    circle3.bindTo('center', marker3, 'position');
    document.getElementById('legend').style.display='block';

    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(
        document.getElementById('legend'));

    var map1 = document.getElementById('map');
    map1.className='animate';

    if ( map1.className=="animate") {
        console.log('resized');
        google.maps.event.trigger(map, 'resize');
    }
    setTimeout(function(){
    google.maps.event.trigger(map, 'resize');
    }, 1500);

}

