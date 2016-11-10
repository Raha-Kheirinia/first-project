/*
Auteur:    Zohreh KHEIRINIA
Matricul:   20002549
*/
// ce programme prends en entree un fichier texte qui contient une equation prefix 
// Il calcul le resultat et le mettre dans un autre fichier texte au nom resultatDeCalcul.txt dans le repertoire courant  

var fs = require ("fs");
var data = fs.readFileSync("equation.txt","utf8");



// Ce programme permet de calculer les equations prefix

var Resultat = function( valeur, indice ){
    this.valeur = valeur;
    this.indice = indice;
};
var calculatrice = function(equation,indice){
      //manger les espaces au debut de l'equation  
while( equation.charAt( indice ) == ' '){
      ++indice;
  }
    //cas de base: un nombre
    var valeur = '0';
    var estNombre = false;
    var symbole, calculG,calculD,nbrG,nbrD;
    while( (symbole = equation.charAt(indice) )
        && (symbole >= '0' && symbole <= '9') ){
            estNombre = true;
            ++indice;
            valeur = (valeur * 10) + +symbole;
        }
    if( estNombre ){
        return new Resultat( valeur, indice );
    }
    
    //recursion un opérateur                               
    if( equation.charAt( indice ) == '*' ){
        indice++;      
        calculG=calculatrice(equation,indice);    // création de la branche gauche
        nbrG=calculG.valeur;
        calculD=calculatrice(equation,calculG.indice);  // création de la branche droit
        nbrD=calculD.valeur;
        return new Resultat (nbrD*nbrG,calculD.indice);
    }
    else if( equation.charAt( indice ) == '+' ){
        indice++;      
        calculG=calculatrice(equation,indice);    //  création de la branche gauche
        nbrG=calculG.valeur;
        calculD=calculatrice(equation,calculG.indice);  // création de la branche droit
        nbrD=calculD.valeur;
        return new Resultat (nbrD + nbrG,calculD.indice); 
    }
     else if( equation.charAt( indice ) == '~' ){ 
         indice++;
         calculG=calculatrice(equation,indice);  // création de la seul branche ~ a un seul argument
        nbrG=calculG.valeur;
    return new Resultat (~ nbrG,calculG.indice);
   
    }
    
    else {
        //un opérateur inconnu
        print("expression mal formée");
        return new Resultat( 0, indice+1 );
    }
    
};

var resultat = calculatrice(data,0);

fs.writeFileSync("resultatDeCalcul.txt",resultat.valeur);







