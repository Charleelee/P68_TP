/**
 * Created by École on 2015-05-06.
 */
"use strict";

// Au chargement de la page on éxécute la fonction controls()
document.addEventListener('DOMContentLoaded', init);

//La fonction controls() à pour but de d'éxécuter la fonction focus_on_map() lors de la fin de l'animation
//qui agrandit le container de la carte Google Maps.
//Elle donne un effet de transition a l'ID Modalwindow, sans quoi, au chargement de la page, lorsque ce container
//apparaissait en opacity:0, une transition se faisait du 1 vers le 0, affichant pendant un bref moment le modalwindow.
function init() {
    console.log('f control loaded');
    var map_anim = document.getElementById('map');
    map_anim.addEventListener('animationend', focus_on_map);
    document.getElementById('Modalwindow').style.transition="opacity 400ms ease-in";
}

//La fonction focus_on_map() a pour but de center la carte sur l'ecran en forçant un scroll du body. Sans cette fonction
//l'animation se déroule bien, mais la carte s'affiche en bas de l'écran.
function focus_on_map(){
    document.body.scrollTop = 6500;
}

//Initialisation et déclaration de quelques variables globale, et quelques variables "raccourcisÉ
var i= 1, taux = 0, taux1 = 0, taux2  = 0, taux3 = 0;
var fieldset=document.getElementsByTagName("fieldset");

//Variable pour la map google maps
var latitude;
var longitude;


//la fonction affiche_taux a pour but de modifier l'innerHTML du resultat pour donner le resultat du taux d'emission en temps
//réel
function affiche_taux(){
    $('#result').html('Votre taux d\'emission de Co2 est de ' +taux+' Kg Co2 éq</p>');
}

//La function affiche_taux_final() à la même vocation que affiche_taux() a l'exception près que celle-ci "réécrit" le footer
// et génèrera un boutton submit a la place du boutton "Suivant"
function affiche_taux_final(){
    $('#footer').html('<input id="prev" onclick="slide_back()" type="button" value="Précédent"/><input type="Submit" value="Soumettre"/><p id="result">Votre taux d\'emission de Co2 est de ' +taux+ ' Kg Co2 éq</p>');
}

//La fonction validation_sexe() est une fonction de validation permettant de determiner si l'utilisateur a bien choisi un sexe.
//cette verification s'effectue lorsque la valeur du select est différent de "Genre"
function validation_sexe() {
    var select = document.getElementById('genre');

    if (select.value == "Genre") {
        alert('Vous devez choisir un sexe');
    } else {
        select.className = "valid";
    }
}

//La fonction validation_mdp() sert a determiner si la valeur des deux inputs de mot passe est bien identique. Si ils ne le sont
//pas, on effacera un des deux champs, rendant le formulaire invalide.
function validation_mdp(){
    var mdp = document.getElementById('mdp');
    var verifmdp = document.getElementById('verifmdp');

    if (mdp.value != verifmdp.value) {
        alert('Les mot de passe ne correspondent pas !');
        verifmdp.value = "";
    }
}

//La fonction slide permet d'afficher ou des fieldset, créant donc une impression de navigation dans le formulaire.
function slide() {

    //A l'état initial, deux fieldset différent sont afficher dans le formulaire. Il faut donc cacher ces deux fieldset
    //en leur donnant la classe "inactive" et afficher le suivant en lui donnant la classe "active"
    if (i == 1) {
        fieldset[i - 1].className = "inactive";
        fieldset[i].className = "inactive";
        fieldset[i + 1].className = "active";
    }

    //À chaque clique, i s'incrémente
    i++;
    //On cache le fieldset de i-1 et on affiche le fieldset de i
    fieldset[i - 1].className = "inactive";
    fieldset[i].className = "active";

    //Lorsque l'utilisateur a rentré ses informations et rentre dans la partie questionnaire, on affiche les boutons
    //ainsi que le calcul du taux d'émission de GES
    if (fieldset[2].className == "active") {
        affiche_taux();
    }

    //On change le header du formulaire en fonction du fieldset activé.
    if (fieldset[i].id == "fieldset3") {
        document.getElementById('header').innerHTML = "Étape 1/3 : Transport";
    }

    if (fieldset[i].id == "fieldset4") {
        document.getElementById('header').innerHTML  = "Étape 2/3 : Bâtiment";
    }
    //Si le dernier fieldset est activé on lance la fonction d'affichage du taux final
    if (fieldset[4].className == "active") {
        document.getElementById('header').innerHTML  = "Étape 3/3 : Matières résiduelles";
        affiche_taux_final();
    }
    else {
        affiche_taux();
    }
}

//La fonction slide_back a la même vocation que la fonction slide, seulement celle ci permet d'activer les fieldset
//précédent
function slide_back() {

    //Lorsque l'on se retrouve sur le 3ème fielset ( fieldset[2] ) on affiche les 2 précedent
    if (i==2){
        fieldset[i-1].className="active";
        fieldset[i].className="inactive";
        fieldset[i-2].className="active";
        document.getElementById('header').innerHTML ="Inscrivez-vous";
    }

    //Sinon le fieldset sur lequel on se trouve devient inactif, et le suivant s'active
    else {
        fieldset[i].className="inactive";
        fieldset[i-1].className="active";
    }

    //À chaque clique on décrémente i
    i--;

    //On modifie le contenu du header en fonction du fieldset sur lequel on se trouve
    if ( fieldset[i].id =="fieldset4"){
        document.getElementById('header').innerHTML="Étape 2/3 : Bâtiment";
        affiche_taux();
    }

    if ( fieldset[2].className=="active" ) {
        affiche_taux();
        document.getElementById('header').innerHTML="Étape 1/3 : Transport";
    }
}

var multiplicateur = 0;

//La fonction calcul_taux() a 2 but; le premier est d'afficher les éléments inputs correspondant au choix fait par le select.
//Par exemple, il est inutile de demander la consommation d'essence d'une personne se déplacant à pied.
//Son deuxième but est de modifier la variable multiplicateur; En fonction du mode de deplacement choisi, celui va être plus
//polluant qu'un autre, par exemple les transports en commun sont beaucoup moins polluant qu'une voiture.
function calcul_taux() {
    var fieldset3 = document.getElementById("fieldset3");
    var km_box = document.getElementById('km_box_label');
    var essence_box = document.getElementById('essence_label');
    var diesel_radio = document.getElementById('diesel_label');
    var essence_radio = document.getElementById('essence2_label');
    var qte_deplacement_range = document.getElementById('qte_deplacement_label');
    var moyen_transport = document.getElementById('moyen_transport').selectedOptions[0].id;

    switch (moyen_transport) {
    //On cache certains inputs et on en affiche d'autres selon le choix du select, puis on donne une valeur fixe
    //à notre variable 'multiplicateur'
    //On lance également la fonction calcul_emission() dès que le choix est fait
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

//La fonction calcul_emission() va calculer le taux d'emission en fonction des valeur rentré dans le 3ème fieldset.
function calcul_emission(){
    console.log('f calculemission');
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
    //Il est nécéssaire de stocker notre resultat dans 2 variable. Si le taux etait = a lui même + le resultat de l'algorithme,
    //cela poserai problème lors de la diminution d'une valeur. Par exemple si taux vaut 20 et que je parcours 10km, taux = taux +    // 10 km parcourus. Soi taux = 20 + 10. Mais si je diminue les kilomètre parcourus a 9, taux = taux + 9 soit taux = 30 + 9.
    //la variable taux1 va donc garder la valeur initial de taux.
    taux = taux1;
    //puis on va afficher le resultat dans le footer du formulaire
    affiche_taux();
}

//La fonction calcul_emission_batiment() à la même vocation que la fonction calcul_emission(), mais elle agit sur un
//autre fieldset
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

//La fonction calcul_emission_dechet()à la même vocation que la fonction calcul_emission(), mais elle agit sur un
//autre fieldset et elle générera l'affichage d'un boutton submit.
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

//La fonction show_map() sert a géolocaliser notre utilisateur. Si son navigateur ne prends pas en charge la géolocalisation,
//Ou bien si il décline l'autorisation d'accèder a sa position, il recevra un message d'erreur en fonction. Si le navigateur prends
//en charge la géolocalisation et qu'il a accepté de partager sa position, alors on éxécutera la fonction affich_carte()
function show_map(){
    document.getElementById('mapdisplay').style.display="none";
    console.log('google map branché');

    //On vérifie si le navigateur prends en charge la géolocalisation et va éxécuter une fonction en conséquence
    if (navigator.geolocation != null){
        navigator.geolocation.getCurrentPosition(yesgeoloc,nogeoloc);
    }else{
        document.getElementById('error').innerHTML="Votre navigateur ne prends pas en charge la géoloc";
    }

    //Si l'utilisateur a accepté d'afficher sa position, alors on lance la fonction affich_carte()
    function yesgeoloc(pos){
        console.log('geoloc accepté');
        latitude = pos.coords.latitude;
        longitude = pos.coords.longitude;
        console.log(latitude,longitude);
        affich_carte(pos);
    }

    function nogeoloc(error){
        document.getElementById('error').innerHTML="Vous n'avez pas autoriser votre navigateur à vous localiser";
        console.log('geoloc refusé');
    }
}

//La fonction affich_carte va nous permettre de générer une carte google maps via l'API de google maps.
//Cette fonction va également mettre des marqueurs sur notre carte, définit par la longitude et lattitude de l'endroit,
//et créera un cercle de couleur de X kilomètre autour de ce marqueur. Lors du hover des marqueurs, une balise info apparaitra.
//La fonction créera également une légende permettant de voir du premier coup d'oeil à quoi correspondent les couleurs
function affich_carte(pos) {

    //On determine les options de notre carte
    var latlng = new google.maps.LatLng(latitude, longitude);
    var map_options = {
        zoom: 11,
        center:latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControl: true
    };

    //On determine l'emplacement ou l'on veut générer notre carte
    var map = new google.maps.Map(document.getElementById('map'), map_options);

    //On met des marker sur notre carte a une lat/long spécfique
    var marker = new google.maps.Marker({
        position:  new google.maps.LatLng(45.548141, -73.624684),
        title:"Villeray"
    });

    //On attribue des bulle infos pour les marq ueur
    var infowindow = new google.maps.InfoWindow({
        content: 'Taux de pollution : 13%'
    });

    //On ferme les bulle infos en fonction de celle qui sont ouverte
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

    //On créer des cercles sur notre map de 1.263 km
    var circle = new google.maps.Circle({
        map: map,
        radius: 1263,
        strokeColor: '#325E14',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillOpacity: 0.35,
        fillColor: '#325E14'

    });
    //de 2.063km
    var circle2 = new google.maps.Circle({
        map: map,
        radius: 2063,
        strokeColor: '#e5e120',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillOpacity: 0.35,
        fillColor: '#e5e120'
    });
    // de 1.063 km
    var circle3 = new google.maps.Circle({
        map: map,
        radius: 1063,
        strokeColor: '#BF2012',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillOpacity: 0.35,
        fillColor: '#BF2012'
    });

    //Et on vient attacher nos cercles a nos marqueurs préalablement attaché a la carte grâce a leur long/lat
    circle.bindTo('center', marker, 'position');
    circle2.bindTo('center', marker2, 'position');
    circle3.bindTo('center', marker3, 'position');
    document.getElementById('legend').style.display='block';

    //On attache la légend de la map dans le coin inférieur droit
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(
        document.getElementById('legend'));

    //Lorsque la map est généré, on lui attribue une classe qui déclanchera une animation en CSS
    var map1 = document.getElementById('map');
    map1.className='animate';

    //Après 1.5 sec, la carte sera affiché, on va donc la rafraîchir pour s'assurer de n'avoir aucun problème d'affichage
    setTimeout(function(){
    google.maps.event.trigger(map, 'resize');
        document.body.scrollTop = 4500;
    }, 1500);
}