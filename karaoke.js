// Zohreh KHEIRINIA
//un petit Karaoke en javascript

var Chanson = function( titre,refrain, couplets, structure, tempo ){
	
      this.titre = titre;
      this.refrain = refrain;
      this.couplet = couplets;
      this.structure=structure;
      this.tempo = tempo;
};

//Marque le debut et la fin d'une chanson
Chanson.prototype.decoration = '****************';

// Joue la chanson  
Chanson.prototype.jouer = function( ){
	
print( this.decoration + this.titre + this.decoration );
    
                
        for( var ligne = 0 ; ligne < this.couplet.length ; ++ligne ){
           for(var i=0; i<this.couplet[ligne].length; i++){
    
             print( this.couplet[ligne][i] );     // print chaque partie de couplet
		     pause( 60 / this.tempo );   // pause pour le couplet
         }
            
            for(var indice=0; indice<this.structure.length; indice++){  
                if(this.structure[indice]==ligne+1) {   // par les indice de structure,on print le rafrin
                    for(var i=0;i<this.refrain.length; i++){ // s'il y a plus d'un string pour le tableau refrain 
                            print(this.refrain[i]);
                            pause( 100 / this.tempo ); //  pause par le tempo de la chanson pour le refrain 
                    }
                }
            }
        };
            
    
print( this.decoration + " Bravo " + this.decoration );
};


// L’objet karaoke du prototype Karaoke est un singleton   
var Karaoke = function(){
	this.chansons = { } ;
};


Karaoke.prototype.jouer = function( titre){
	if( ! (titre in this.chansons )){
		print("Je ne connais pas la chanson " + titre );
		return;
        };
    
    
	this.chansons[titre].jouer( );
};


Karaoke.prototype.ajouterChanson = function( chanson ){
    
    
    this.chansons[chanson.titre] = chanson;

         
};

//voici le singleton
karaoke = new Karaoke();

ramblin=new Chanson(

    "Ramblin’ Man",

    ["When the Lord made me,", "He made a Ramblin’ Man"],

    [

        ["I can settle down and be doin’ just fine",
         "Til’ I hear an old train rollin’ down the line", 
         "Then I hurry straight home and pack", 
         "And if I didn’t go, I believe I’d blow my stack"
         , "I love you baby, but you gotta understand"],
        ["Some folks might sa-ay that I’m no good", 
         "That I wouldn’t settle down if I could", 
         "But when that open ro-oad starts to callin’ me"
         , "There’s somethin’ o’er the hill that I gotta see"
         , "Sometimes it’s har-rd but you gotta understand"],
        ["I love to see the towns a-passin’ by"
         , "And to ride these rails, ’neath God’s blue sky"
         , "Let me travel this land from the mountains to the sea"
         , "’Cause that’s the life I believe, He meant for me"
         , "And when I’m go-one and at my grave you stand"]

    ],

    [1,2,3], 

    60

 );

karaoke.ajouterChanson(ramblin);

karaoke.jouer("Ramblin’ Man");