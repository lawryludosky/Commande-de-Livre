/*******************

VARIABLES

*******************/

var listeBoutique = [
	{
		nom:"Boutique du Stade",
		adresse:"4 rue de la Foire aux Vins <br> 75012, Paris",
		horaires:"lun-ven : 10h00 19h00 <br> sam : 10h00 12h00"
	},

	{
		nom:"Marques à Gogo",
		adresse:"15 avenue du président imaginaire <br> 13001, Marseille",
		horaires:"lun-ven : 10h00 18h00"
	},

	{
		nom:"Les Magiciens du Net",
		adresse:"2 place du centre <br> 75000, Paris",
		horaires:"lun-mar : 10h00 19h00 <br> mer : 10h00 14h00 <br> jeu-ven : 10h00 19h00"
	},

	{
		nom:"Articles de Luxe",
		adresse:"154 boulevard Rodriguez <br> 69000, Lyon",
		horaires:"lun-ven : 10h00 19h00"
	},

	{
		nom:"Marché aux Puces",
		adresse:"4 rue Frank Herbert <br> 17000, La Rochelle",
		horaires:"lun-dim : 10h00 19h00"
	}
];

var listeLivre = [
	{
		titre:"Le développement pour les pros",
		prix:14.90 + "€"
	},

	{
		titre:"L'avenir de la France dans les 100 prochaines années <br>(et des poussières)",
		prix:5 + "€"
	}
];

var magasin = document.getElementById('magasin');
var livre = document.getElementById('livre');
var recap = document.getElementById('recap');
var magasinChoisi;
var livreChoisi = [];
var total = [];
var totalAchat = 0;

/*******************

FUNCTIONS

*******************/

function boutiqueHTML(){

	for(i=0; i<listeBoutique.length; i++){

		//création éléments
		var buttonMagasin = document.createElement('button');
		var nomMagasin = document.createElement('h3');
		var adresse = document.createElement('p');
		var horaires = document.createElement('p');

		//ajout des éléments
		magasin.appendChild(buttonMagasin);
		buttonMagasin.appendChild(nomMagasin);
		buttonMagasin.appendChild(adresse);
		buttonMagasin.appendChild(horaires);

		nomMagasin.innerHTML = listeBoutique[i].nom;
		adresse.innerHTML = listeBoutique[i].adresse;
		horaires.innerHTML = listeBoutique[i].horaires;

		//évènement click sur les boutons
		buttonMagasin.onclick = choixBoutique;
	}	
}

function choixBoutique(){
	magasinChoisi = this.getElementsByTagName('h3')[0].innerHTML;
	magasin.style.display = "none";
	livre.style.display = "block";
	livreHTML();
}

function livreHTML(){

	var ul = document.getElementById('listeLivre');

	for(i=0; i<listeLivre.length; i++) {

		//création éléments
		var li = document.createElement('li');
		var checkbox = document.createElement('input');
		var titreLivre = document.createElement('p');
		var prix = document.createElement('p');
		var select = document.createElement('select');
		var option = document.createElement('option');
		

		checkbox.type = "checkbox";

		//ajout des éléments
		livre.appendChild(ul);
		ul.appendChild(li);
		li.appendChild(checkbox);
		li.appendChild(titreLivre);
		li.appendChild(prix);
		li.appendChild(select);

		for(j=1; j<=6;j++){
			
			select.appendChild(option.cloneNode(true));
			option.innerHTML = j;
			option.value = j;
		}

		titreLivre.innerHTML = listeLivre[i].titre;
		prix.innerHTML = listeLivre[i].prix;

	}

	var button = document.createElement('button');
	button.innerHTML = "Suivant";
	livre.appendChild(button);

	//évènement click sur bouton
	button.onclick = choixLivre;
}


function choixLivre(){

	var input = document.querySelectorAll('input[type=checkbox]');

	for(i=0; i<input.length; i++){

		if(input[i].checked ){
			var titreLivre = input[i].nextElementSibling.innerHTML;
			var prixLivre = input[i].nextElementSibling.nextElementSibling.innerHTML;
			var nbLivre = input[i].parentElement.lastChild.value;
			var ajoutElement = {titre:titreLivre, prix:parseFloat(prixLivre), quantite:nbLivre};
			livreChoisi.push(ajoutElement);
		}

	}

	if (nbLivre === ""){
		livreChoisi = [];
		var error = document.getElementById('error');
		error.innerHTML = "Veuillez indiquer la quantité";
		error.style.display = "block";
	}

	else {
		livre.style.display = "none";
		recap.style.display = "block";
		recapHTML();
	}
}

function recapHTML() {


	var h3 = document.createElement('h3');
	var ul = document.createElement('ul');

	recap.appendChild(h3);
	recap.appendChild(ul);
	h3.innerHTML = "Magasin choisi : " + magasinChoisi;

	console.log(livreChoisi.length);

	if(livreChoisi.length === 0){
		var li = document.createElement("li");
		ul.appendChild(li);
		li.innerHTML = "Aucun produit sélectionné";
	}

	else {
		
		for(i=0;i<livreChoisi.length;i++){

			var li = document.createElement("li");
			var span = document.createElement('span');
			ul.appendChild(li);


			li.innerHTML = livreChoisi[i].titre + " (x" + livreChoisi[i].quantite + ")";
		
			li.appendChild(span);

			span.innerHTML = livreChoisi[i].prix * livreChoisi[i].quantite + "€";
			total.push(parseFloat(span.innerHTML));

		}
	}

	var p = document.createElement('p');
	recap.appendChild(p);

	for(i=0; i<total.length;i++){
		totalAchat += total[i];
	}

	p.innerHTML = "Total : " +  totalAchat + "€";
}

boutiqueHTML();



