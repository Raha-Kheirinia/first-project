
var Matrice2D = function(cote){ 
    this.data = new Array(cote * cote);
    this.cote = cote;
};

Matrice2D.prototype.traduire = function( r, c) { 
    return r*this.cote + c; 
};

//on peut ajouter cette méthode utile pour visualiser une matrice 
Matrice2D.prototype.afficherParLigne = function( printer ){
    for( var ligne = 0; ligne < this.cote; ++ligne ){
	var commencer = ligne * this.cote;
	var finir = this.cote + commencer;
	printer( this.data.slice( commencer,finir ).join('') );
    }
};

/* lire et ecrire dans une cellule de la matrice: */
var m = new Matrice2D( 3 ); 

var rangee = 2, colonne = 0;

//ecrire
m.data[ m.traduire( rangee, colonne ) ] = 17;
//lire
console.log( m.data[m.traduire( rangee, colonne) ] );





/*
  Pour une matrice encodée, sur un vecteur colonne contenant des 
  lignes et initialisées dans le constructeur. 
  Les choses sont plus compliquées dans le constructeur mais 
  l'utilisation est plus simple car elle ne requiert pas de 
  méthode particulière comme traduire() pour accéder aux cellules
  de la matrice.
*/
var Matrice = function( cote ){
    this.lignes = new Array( cote );
    for( var i = 0; i<cote; ++i )
	this.lignes[i] = new Array( cote );
};


//Ici, on accède directement aux cellules: 

var m = new Matrice( 3 );
//ecrire
m.lignes[ rangee ][ colonne ] = 17;
//lire
console.log( m.lignes[rangee][colonne] );

// la fonction de visualisation devient:
Matrice.prototype.afficherParLigne = function( printer ){
    for( var ligne = 0; ligne < this.lignes.length; ++ligne )
	printer( this.lignes[ ligne ].join('') );
};


/*
  Ce qui n’est pas possible a priori c’est de retourner 
  une variable à partir d'une fonction. 
  Une fonction retourne une *valeur* et non pas une *variable*. 
  Nous n’avons pas exploré in extensio ce concept au cours 
  mais croyez-moi si je vous dis que la fonction suivante 
  retournerait la valeur à la case [r, c] (et non une variable 
  à laquelle on pourrait assigner une valeur):
*/
Matrice.prototype.getCelluleNeFonctionnePasEnEcriture = function( r, c ){
    return this.lignes[r][c];
};


//Ici, pas de problème, on peut lire !
console.log( m.getCelluleNeFonctionnePasEnEcriture( rangee, colonne ) ); 

//undefined, on ne peut pas écrire dans la matrice avec cette fonction!
try{
    m.getCelluleNeFonctionnePasEnEcriture( 2,1 )  =  33;
    console.log('Écriture a fonctionnée.');
} catch(e){
    console.log('Écriture n\'a pas fonctionnée.');
}
/*
  La raison pour laquelle on ne peut pas écrire dans la matrice avec
  getCelluleNeFonctionnePasEnEcriture(2,1) est que cette fonction retourne
  la valeur qui se trouve à la cellule r=2, c=1 de la matrice. Cette valeur
  pourait être 7 par exemple. Alors notre assignation de la dernière ligne 
  de code correspondrait à écrire:
  7 = 33
  ce qui ne fait évidemment aucun sens puisque 7 n'est pas une variable mais 
  une valeur. ( On dira que dans l'expression 7 = 33, 7 n'est pas une 
  *l-valeur* adéquate pour l'opérateur =. Mais nous n'avons pas couvert la
  notion de l-valeur au cours.)
*/





/* 
   Voici comment tracer un X dans une matrice en utilisant l'un ou 
   l'autre des encodages de matrices:
*/

Matrice2D.prototype.faireX = function(){

    var taille = this.cote;

    //initialiser la matrice avec des ' '
    for( var i=0;i<taille*taille;++i )
	m.data[i]=' ';
    
    //mettre des / et des \
    for( var i=0;i<taille; ++i ){
	m.data[ m.traduire( i, i ) ] = '\\' ;
	m.data[ m.traduire( i, (taille - 1) - i ) ] = '/';
    }

    //ajouter un X au besoin
    if( taille % 2 ){
	var centre = Math.floor( taille/2 );
	m.data[m.traduire( centre, centre ) ] = 'X';
    }

};



console.log( "Matrice X en utilisant la classe Matrice2D:");

var taille = 7;
m = new Matrice2D( taille );
m.faireX();
m.afficherParLigne( console.log );


m = new Matrice2D( 8 );
m.faireX();
m.afficherParLigne( console.log );




/* 
   Maintenant, le même exercice mais avec Matrice();
*/
Matrice.prototype.faireX = function(){
    var taille = this.lignes.length;

    //initialiser la matrice avec des ' '
    for( var i=0;i<taille;++i )
	for( var j=0; j<taille; ++j )
	    m.lignes[i][j]=' ';
    
    //mettre des / et des \
    for( var i=0;i<taille; ++i ){
	m.lignes[ i ][ i ] = '\\' ;
	m.lignes[ i ][ taille - 1 - i ] = '/';
    }
    
    //ajouter un X au besoin
    if( taille % 2 ){
	var centre = Math.floor(taille/2);
	m.lignes[centre][centre] = 'X';
    }
};

console.log( "Matrice X en utilisant la classe Matrice:");

var taille = 7;
m = new Matrice2D( taille );
m.faireX();
m.afficherParLigne( console.log );


m = new Matrice2D( 8 );
m.faireX();
m.afficherParLigne( console.log );



