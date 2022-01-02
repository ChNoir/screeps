
    
var roleOuvrier = require('role.ouvrier');



module.exports.loop = function () {
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                            //                                                                               //
    for(var name in Memory.creeps) {        //      ce bout de code est tres important !                                     //
        if(!Game.creeps[name]) {            //      il nettoie la mémoire du programme d'un creep mort                       //
            delete Memory.creeps[name];     //                                                                               //
        }                                   //      Quand un creep meurt sa memoire n'est pas effacé !                       //
    }                                       //      avec un auto-spawn sa peux vite devenir bordélique.                      // 
                                            //                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                              //                             //
    var ouvriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'ouvrier');          // se code premet de recuperer //
    var recolteurs = _.filter(Game.creeps, (creep) => creep.memory.sousrole == 'recolteur');  // des information dans la     //
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.sousrole == 'upgrader');    // mémore des creeps           //
    var construters = _.filter(Game.creeps, (creep) => creep.memory.sousrole == 'construter');//                             //
    var reparaters = _.filter(Game.creeps, (creep) => creep.memory.sousrole == 'reparater');  // Commet leur nombre en total //
                                                                                              //                             //    
    var queens = _.filter(Game.creeps, (creep) => creep.memory.sousrole == 'queen');          /////////////////////////////////
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    var SecuriteOuvriers = 10
    var SecuriteArmee = 10 
    
    var ArmeeONOFF = false ;  // On = true // Off = false //
    
    if ( containereLuP == 0) {
        
       var ArmeeONOFF = false ; 
    }
    
    var spawnLup = Game.spawns['Spawn1'].pos;
    var RoomLup = (spawnLup.roomName);
    
    
    var containereLuP = Game.rooms[RoomLup].find(FIND_STRUCTURES, {
                filter:(structure) => { 
                    return (structure.structureType == STRUCTURE_CONTAINER) }})
    
    var extension = Game.rooms[RoomLup].find(FIND_STRUCTURES, {
                filter:(structure) => { 
                    return (structure.structureType == STRUCTURE_EXTENSION) }})
    
    
    
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                           //
//                                      Création Automatique des creeps [ 2 Parties ]                                        //
//                                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                           //
//                                              [ Partie 1 ] Nombres et Module                                               //
//                                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    
    
    if(ouvriers.length < SecuriteOuvriers) {                                            
        
        

                                                    
        var Nrecolteurs    = 4 ;                                           
        var Nupgraders     = 2 ;                                           
        var Nconstruters   = 3 ;                                           
        var Nreparaters    = 1 ;
        
        var Nqueen         = 1 ;
                                                                           
        var moduleRecolteurs   = [WORK,WORK,CARRY,MOVE] ;           // 300 //
        var moduleUpgraders    = [WORK,CARRY,CARRY,CARRY,MOVE] ;    // 300 //
        var moduleConstruters  = [WORK,WORK,CARRY,MOVE] ;           // 300 //
        var moduleReparaters   = [WORK,CARRY,MOVE] ;                // 200 //
        
        var moduleQueen        = [CARRY,CARRY,MOVE] ;               // 200 //
        
        if (extension.length >= 5 ) {                                   // 300 + 250 // 550
            
            var moduleRecolteurs   = [WORK,WORK,CARRY,CARRY,MOVE,MOVE] ;            // 400 //
            var moduleUpgraders    = [WORK,CARRY,CARRY,CARRY,MOVE,MOVE] ;           // 350 //
            var moduleConstruters  = [WORK,WORK,CARRY,MOVE] ;                       // 300 //
            var moduleReparaters   = [WORK,CARRY,CARRY,CARRY,MOVE,MOVE] ;           // 350 //
        
            var moduleQueen        = [CARRY,CARRY,MOVE,CARRY,CARRY,MOVE] ;          // 400 //
            
        }
                
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
        /////////////////////////////////////
        //                                 //
        //         Module | Energie        //
        //                                 //
        //           MOVE = 50             //
        //           WORK = 100            //
        //          CARRY = 50             //
        //         ATTACK = 80             //
        //  RANGED_ATTACK = 150            //
        //           HEAL = 250            //
        //          CLAIM = 600            //
        //          TOUGH = 10             //
        //                                 //
        /////////////////////////////////////
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                           //
//                                              [ Partie 2 ] l'Auto-Spawn                                                    //
//                                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
       
    if(ouvriers.length < SecuriteOuvriers ) {
        
        var timequeen = 'none' ;
    
        if (containereLuP == 1) {
             

            var timeLiveQueens = _.filter(Game.creeps, (creep) => creep.memory.time );
            var time = Game.time
            var live = (time - timeLiveQueens[0]) 

            if (queens.length <= Nqueen) {

                if(live >= 1200 ) {

                        var newName = 'queen' + Game.time;              
                        var sousrole = 'queen';                         
                        var workmodule = moduleQueen
                        var timequeen = time ;
                }
                else {
                        
                    if ( queens.length == 0) {
                        var newName = 'queen' + Game.time;              
                        var sousrole = 'queen';                         
                        var workmodule = moduleQueen
                        var timequeen = time ;

                    }
                }
            }
        }
        
        
        if (recolteurs.length < Nrecolteurs) {                  ///////////////////////////////////////////////////////////////
            var newName = 'recolteur' + Game.time;              //                                                           //
            var sousrole = 'recolteur';                         //  Premet de détecter le creeps manquant et obtenir les     //
            var workmodule = moduleRecolteurs                   //  dernières information pour le recrée                     //
        }                                                       //                                                           //
        else{                                                   ///////////////////////////////////////////////////////////////
            
            if (upgraders.length < Nupgraders) {
                var newName = 'upgrader' + Game.time;
                var sousrole = 'upgrader';
                var workmodule = moduleUpgraders
            }
            else {
                if (construters.length < Nconstruters) {
                    var newName = 'construter' + Game.time;
                    var sousrole = 'construter';
                    var workmodule = moduleConstruters
                }
                else {
                    if (reparaters.length < Nreparaters) {
                        var newName = 'reparater' + Game.time;
                        var sousrole = 'reparater';
                        var workmodule = moduleReparaters
                    }
                }
            }
        }
           
        
        
        Game.spawns['Spawn1'].spawnCreep( workmodule , newName, {memory: {role: 'ouvrier' ,sousrole: sousrole, time: time , timequeen: timequeen }  });
        
    }
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                                                           //
    //                                      Création Automatique des creeps [ 2 Parties ]                                        //
    //                                                                                                                           //
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                                                           //
    //                                              [ Partie 1 ] Nombres et Module                                               //
    //                                                                                                                           //
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    if (ArmeeONOFF) {
        
        
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        var Core = 2 ; 
        
        var D1 = 1 ;
        var D2 = 0 ;
        var D3 = 0 ;
        
        var A1 = 0 ;
        var A2 = 0 ;
        var A3 = 0 ;
            
        var NMeleCore      = 3 ;
        var NDistanceCore  = 2 ;
        
        var Core = D1 + D2 + D3 + A1 + A2 + A3 ;
        
        var D1Mele = _.filter(Game.creeps, (creep) => creep.memory.sousrole == 'D1Mele');
        var D2Mele = _.filter(Game.creeps, (creep) => creep.memory.sousrole == 'D2Mele');
        var D3Mele = _.filter(Game.creeps, (creep) => creep.memory.sousrole == 'D3Mele');
        
        var D1Distance = _.filter(Game.creeps, (creep) => creep.memory.sousrole == 'D1Distance');
        var D2Distance = _.filter(Game.creeps, (creep) => creep.memory.sousrole == 'D2Distance');
        var D3Distance = _.filter(Game.creeps, (creep) => creep.memory.sousrole == 'D3Distance');
        
        var A1Mele = _.filter(Game.creeps, (creep) => creep.memory.sousrole == 'A1Mele');
        var A2Mele = _.filter(Game.creeps, (creep) => creep.memory.sousrole == 'A2Mele');
        var A3Mele = _.filter(Game.creeps, (creep) => creep.memory.sousrole == 'A3Mele');
        
        var A1Distance = _.filter(Game.creeps, (creep) => creep.memory.sousrole == 'A1Distance');
        var A2Distance = _.filter(Game.creeps, (creep) => creep.memory.sousrole == 'A2Distance');
        var A3Distance = _.filter(Game.creeps, (creep) => creep.memory.sousrole == 'A3Distance');
        
        
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        if(armee.length < SecuriteArmee) {


 
        
            var ModuleMele         = [TOUGH,TOUGH,TOUGH,TOUGH,MOVE,ATTACK,MOVE,ATTACK,MOVE] ;   // 350 //
            var ModuleDistance     = [RANGED_ATTACK,RANGED_ATTACK,MOVE] ;      // 350 //
            
            /////////////////////////////////////
            //                                 //
            //         Module | Energie        //
            //                                 //
            //           MOVE = 50             //
            //           WORK = 100            //
            //          CARRY = 50             //
            //         ATTACK = 80             //
            //  RANGED_ATTACK = 150            //
            //           HEAL = 250            //
            //          CLAIM = 600            //
            //          TOUGH = 10             //
            //                                 //
            /////////////////////////////////////
            
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            if ( (D1Mele.length + D2Mele.length + D3Mele.length + A1Mele.length + A2Mele.length + A3Mele.length) < ( NMeleCore * Core)  ) {
                var newName = 'creepMele' + Game.time; 
                var ArmeeModule = ModuleMele ;
                
                if ((D1 == 1) && (D1Mele < NMeleCore)) {
                    var sousrole = 'D1Mele'
                }
                if ((D2 == 1) && (D2Mele < NMeleCore)) {
                    var sousrole = 'D2Mele'
                }
                if ((D3 == 1) && (D3Mele < NMeleCore)) {
                    var sousrole = 'D3Mele'
                }
                if ((A1 == 1) && (A1Mele < NMeleCore)) {
                    var sousrole = 'A1Mele'
                }
                if ((A2 == 1) && (A2Mele < NMeleCore)) {
                    var sousrole = 'A2Mele'
                }
                if ((A3 == 1) && (A3Mele < NMeleCore)) {
                    var sousrole = 'A3Mele'
                }
               
            }
            if ( (D1Distance.length + D2Distance.length + D3Distance.length + A1Distance.length + A2Distance.length + A3Distance.length ) < ( NDistanceCore * Core)  ) {
                var newName = 'creepDistnace' + Game.time; 
                var ArmeeModule = ModuleDistance ;
                
                if ((D1 == 1) && (D1Distance < NDistanceCore)) {
                    var sousrole = 'D1Distance'
                }
                if ((D2 == 1) && (D2Distance < NDistanceCore)) {
                    var sousrole = 'D2Distance'
                }
                if ((D3 == 1) && (D3Distance < NDistanceCore)) {
                    var sousrole = 'D3Distance'
                }
                if ((A1 == 1) && (A1Distance < NDistanceCore)) {
                    var sousrole = 'A1Distance'
                }
                if ((A2 == 1) && (A2Distance < NDistanceCore)) {
                    var sousrole = 'A2Distance'
                }
                if ((A3 == 1) && (A3Distance < NDistanceCore)) {
                    var sousrole = 'A3Distance'
                }
            }
            
            Game.spawns['Spawn1'].spawnCreep( ArmeeModule , newName, {memory: {role: 'armes' ,sousrole: sousrole , position : 'none'    }  });
        }
    }
    
 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                                      //
//                                                    Le code de CMD et RCL                                                             //
//                                                                                                                                      //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
    
    if (Memory.cmd == 0) {
                                                                                                /////////////////////////////////////////
        for ( i = 0 ; i > 10 ; i++) {                                                           //                                     //
                                                                                                //  Premet de " nettoyer " la console  //
            console.log ()                                                                      //                                     //
                                                                                                /////////////////////////////////////////
        }
        
    console.log ('/////////////////////////////////////////////////////////////////////');      /////////////////////////////////////////
    console.log ('//                            CMD Help                             //');      //                                     //
    console.log ('//                                                                 //');      // L'aspect Graphique da la commande   //
    console.log ('//        1  = Info sur les creep                                  //');
    console.log ("//        2  = Info sur l'armes          // Pas Implementer //     //");      //                                     //
    console.log ("//        3  = Info sur les cores d'armes// Pas Implementer //     //");      /////////////////////////////////////////
    console.log ('//       10  = Help RCL                                            //');
    console.log ('//                                                                 //');
    console.log ('//                                                                 //');
    console.log ('//                                                                 //');
    console.log ('//                                                                 //');
    console.log ('/////////////////////////////////////////////////////////////////////');
    Memory.cmd = 100 ;
        
        
    }
    
    if (Memory.cmd == 1 ) {
        
        if (containereLuP.length == 1 ) {
        
            for ( i = 0 ; i > 10 ; i++) {

                console.log ()

            }

            console.log ('///////////////////////');
            console.log ('//                   //');
            console.log ('// Ouvriers   = '+ ouvriers.length    +'   //');
            console.log ('//                   //');
            console.log ('///////////////////////');
            console.log ('//                   //');
            console.log ('// Recolteurs = '+ recolteurs.length  +'    //');
            console.log ('// Upgrader   = '+ upgraders.length   +'    //');
            console.log ('// Construter = '+ construters.length +'    //');
            console.log ('// Reparater  = '+ reparaters.length  +'    //');
            console.log ('// Queens     = '+ queens.length      +'    //');
            console.log ('//                   //');
            console.log ('///////////////////////');
            Memory.cmd = 100 ;
        }
        else {
            
            for ( i = 0 ; i > 10 ; i++) {

                console.log ()

            }

            console.log ('///////////////////////');
            console.log ('//                   //');
            console.log ('// Ouvriers   = '+ ouvriers.length    +'   //');
            console.log ('//                   //');
            console.log ('///////////////////////');
            console.log ('//                   //');
            console.log ('// Recolteurs = '+ recolteurs.length  +'    //');
            console.log ('// Upgrader   = '+ upgraders.length   +'    //');
            console.log ('// Construter = '+ construters.length +'    //');
            console.log ('// Reparater  = '+ reparaters.length  +'    //');
            console.log ('//                   //');
            console.log ('///////////////////////');
            Memory.cmd = 100 ;
             
        }
    }
    if (Memory.cmd == 2 ) {
        
        for ( i = 0 ; i > 10 ; i++) {
            
            console.log ()
            
        }
        
        console.log ('////////////////////////////////');
        console.log ('//                            //');
        console.log ('// Armes   = '+     +'                 //');
        console.log ('//                            //');
        console.log ('////////////////////////////////');
        console.log ('//                            //');
        console.log ('// Défenceur            = '+  +'    //');
        console.log ('// Défenceur Distance   = '+  +'    //');
        console.log ('// Attaquant            = '+  +'    //');
        console.log ('// Attaquant Distance   = '+  +'    //');
        console.log ('//                            //');
        console.log ('////////////////////////////////');
        Memory.cmd = 100 ;
        
    }
    
    if (Memory.cmd == 3 ) {
        
        if (containereLuP == 1) {
            for ( i = 0 ; i > 10 ; i++) {

                console.log ()

            }


            var EtatBons    = '      BONS      //'
            var EtatMauvais = '     MAUVAIS    //'
            var EtatDetruis = '     DETRUIS    //'                                  
                                               //
            /////////////////////////////////////

            ///////////////////////////////////////
                                                 //
            var WorkIdles       = '    IDLES     //'
            var WorkAttaques    = '   ATTAQUES   //'
            var WorkMove        = '    MOVES     //'


            console.log ('/////////////////////////////////////////////////////////////////////////')
            console.log ('//               //                //                  //              //')
            console.log ("//     CORES     //     L'ETAT     //     POSITION     //     WORK     //")
            console.log ('//               //                //                  //              //')
            console.log ('/////////////////////////////////////////////////////////////////////////')
            console.log ('//               //                //                  //              //')
            console.log ('//    Raideur 1  //')
            console.log ('//    Raideur 2  //')
            console.log ('//    Raideur 3  //')
            console.log ('//               //                //                  //              //')
            console.log ('/////////////////////////////////////////////////////////////////////////')
            console.log ('//               //                //                  //              //')
            console.log ('//   Guardian 1  //')
            console.log ('//   Guardian 2  //')
            console.log ('//   Guardian 3  //')
            console.log ('//               //                //                  //              //')
            console.log ('/////////////////////////////////////////////////////////////////////////')
        }
        else {
            
            console.log ('//////////////////////////////////////////////////')
            console.log ('//                                              //')
            console.log ('//    le niveux de la base est pas asse haut    //')
            console.log ('//                                              //')
            console.log ('//   Merci de vouloir installes un containere   //')
            console.log ('//             pour avoir la suite              //')
            console.log ('//                                              //')
            console.log ('//////////////////////////////////////////////////')
            
        }
    }
    
    if (Memory.cmd == 10) {
        
        for ( i = 0 ; i > 10 ; i++) {
            
            console.log ()
            
        }
        
            console.log ('/////////////////////////////////////////////////////////////////////');      /////////////////////////////////////////
            console.log ('//                            RCL Help                             //');      //                                     //
            console.log ('//                                                                 //');      // L'aspect Graphique da la commande   //
            console.log ("//        11 = Info Base de l'etoil                                //");      //                                     //
            console.log ('//   12 à 15 = Info des étape                                      //');      /////////////////////////////////////////
            console.log ('//                                                                 //');
            console.log ('//                                                                 //');
            console.log ('//                                                                 //');
            console.log ('//                                                                 //');
            console.log ('//                                                                 //');
            console.log ('/////////////////////////////////////////////////////////////////////');
            Memory.cmd = 100 ;
    }
    
    
    
    if (Memory.cmd == 11) {
        
        for ( i = 0 ; i > 10 ; i++) {
            
            console.log ()
            
        }
        
        console.log ('///////////////////////////////////////////////////////////////////');
        console.log ('//   construstions Base Info     //         Description          //');         
        console.log ('//  0                       x    //                              //');
        console.log ('//   |R|E|E|T|R|S|R|T|E|E|R|     //   S = Spawn                  //');  
        console.log ('//   |E|R|E|E| |R| |E|E|R|E|     //   R = Route                  //');
        console.log ('//   |E|E|R|E|E|R|E|E|R|E|E|     //   E = Extension              //');
        console.log ('//   |T|E|E|R|E|R|E|R|E|E| |     //   T = Tower                  //');
        console.log ('//   |R| |E|E|R|E|R|E|E| |R|     //   O = Storage                //');
        console.log ('//   |O|R|R|R|E|S|E|R|R|R|M|     //   M = Marche                 //');
        console.log ('//   |R| |E|E|R|E|R|E|E| |R|     //                              //');
        console.log ('//   | |E|E|R|E|R|E|R|E|E|T|     //   X = site de construstion   //');
        console.log ('//   |E|E|R|E|E|R|E|E|R|E|E|     //            { INFO }          //');
        console.log ('//   |E|R|E|E| |R| |E|E|R|E|     //                              //');
        console.log ('//   |R|E|E|T|R|S|R|T|E|E|R|     //   Base de 11x11              //');
        console.log ('//  y                            //                              //');
        console.log ('///////////////////////////////////////////////////////////////////');
        console.log ('//                                                               //');
        console.log ('//      Fait 12 pour voir la premier étape de construction       //');
        console.log ('//                                                               //');
        console.log ('///////////////////////////////////////////////////////////////////');
        Memory.cmd = 100;
        
        
    }
    
    
    if (Memory.cmd == 12) {
        
        for ( i = 0 ; i > 10 ; i++) {
            
            console.log ()
            
        }
        
        console.log ('///////////////////////////////////////////////////////////////////'); 
        console.log ('//     construstions RCL 1       //         Description          //'); 
        console.log ('//                               //                              //');
        console.log ('//   |X| | | |X| |X| | | |X|     //   S = Spanw                  //');  
        console.log ('//   | |X| | | |X| | | |X| |     //                              //');
        console.log ('//   | | |X| | |X| | |X| | |     //                              //');
        console.log ('//   | | | |X| |X| |X| | | |     //                              //');
        console.log ('//   |X| | | |X| |X| | | |X|     //                              //');
        console.log ('//   | |X|X|X| |S| |X|X|X| |     //                              //');
        console.log ('//   |X| | | |X| |X| | | |X|     //                              //');
        console.log ('//   | | | |X| |X| |X| | | |     //   X = site de construstion   //');
        console.log ('//   | | |X| | |X| | |X| | |     //       { STRUCTURE_ROAD }     //');
        console.log ('//   | |X| | | |X| | | |X| |     //                              //');
        console.log ('//   |X| | | |X| |X| | | |X|     //   Base de 11x11              //');
        console.log ('//                               //                              //');
        console.log ('///////////////////////////////////////////////////////////////////');
        console.log ('//                                                               //');
        console.log ('//      Pour confirmer et construire faite Memory.rcl = 1        //');
        console.log ('//                                                               //');
        console.log ('//      Fait 13 pour voir la Deuxième étape de construction      //');
        console.log ('//                                                               //');
        console.log ('///////////////////////////////////////////////////////////////////');
        Memory.cmd = 100;
        
        
    }
    if (Memory.cmd == 13) {
        
         for ( i = 0 ; i > 10 ; i++) {
            
            console.log ()
            
        }
        
        console.log ('///////////////////////////////////////////////////////////////////');
        console.log ('//     construstions RCL 2       //         Description          //');         
        console.log ('//  0                       x    //                              //');
        console.log ('//   |R| | | |R| |R| | | |R|     //   S = Spawn                  //');  
        console.log ('//   | |R| | | |R| | | |R| |     //   R = Route                  //');
        console.log ('//   | | |R| |X|R| | |R| | |     //                              //');
        console.log ('//   | | |X|R|X|R| |R| | | |     //                              //');
        console.log ('//   |R| |X|X|R| |R| | | |R|     //                              //');
        console.log ('//   | |R|R|R| |S| |R|R|R| |     //                              //');
        console.log ('//   |R| | | |R| |R| | | |R|     //                              //');
        console.log ('//   | | | |R| |R| |R| | | |     //   X = site de construstion   //');
        console.log ('//   | | |R| | |R| | |R| | |     //     { STRUCTURE_EXTENSION }  //');
        console.log ('//   | |R| | | |R| | | |R| |     //                              //');
        console.log ('//   |R| | | |R| |R| | | |R|     //   Base de 11x11              //');
        console.log ('//  y                            //                              //');
        console.log ('///////////////////////////////////////////////////////////////////');
        console.log ('//                                                               //');
        console.log ('//      Pour confirmer et construire faite Memory.rcl = 2        //');
        console.log ('//                                                               //');
        console.log ('//      Fait 14 pour voir la troisième étape de construction     //');
        console.log ('//                                                               //');
        console.log ('///////////////////////////////////////////////////////////////////');
        Memory.cmd = 100;
        
        
        
        
    }
    
    if (Memory.cmd == 14) {
        
         for ( i = 0 ; i > 10 ; i++) {
            
            console.log ()
            
        }
        
        console.log ('///////////////////////////////////////////////////////////////////');
        console.log ('//     construstions RCL 3       //         Description          //');         
        console.log ('//  0                       x    //                              //');
        console.log ('//   |R| | | |R| |R| | | |R|     //   S = Spawn                  //');  
        console.log ('//   | |R|X|X| |R| | | |R| |     //   R = Route                  //');
        console.log ('//   | |X|R|X|E|R| | |R| | |     //   E = Extension              //');
        console.log ('//   |X|X|E|R|E|R| |R| | | |     //                              //');
        console.log ('//   |R| |E|E|R| |R| | | |R|     //                              //');
        console.log ('//   | |R|R|R| |S| |R|R|R| |     //                              //');
        console.log ('//   |R| | | |R| |R| | | |R|     //   X = site de construstion   //');
        console.log ('//   | | | |R| |R| |R| | | |     //     { STRUCTURE_EXTENSION }  //');
        console.log ('//   | | |R| | |R| | |R| | |     //       { STRUCTURE_TOWER }    //');
        console.log ('//   | |R| | | |R| | | |R| |     //                              //');
        console.log ('//   |R| | | |R| |R| | | |R|     //   Base de 11x11              //');
        console.log ('//  y                            //                              //');
        console.log ('///////////////////////////////////////////////////////////////////');
        console.log ('//                                                               //');
        console.log ('//      Pour confirmer et construire faite Memory.rcl = 3        //');
        console.log ('//                                                               //');
        console.log ('//      Fait 15 pour voir la troisième étape de construction     //');
        console.log ('//                                                               //');
        console.log ('///////////////////////////////////////////////////////////////////');
        Memory.cmd = 100;
        
        
        
        
    }
    
    if (Memory.cmd == 15) {
        
         for ( i = 0 ; i > 10 ; i++) {
            
            console.log ()
            
        }
        
        console.log ('///////////////////////////////////////////////////////////////////');
        console.log ('//     construstions RCL 4       //         Description          //');         
        console.log ('//  0                       x    //                              //');
        console.log ('//   |R| | | |R| |R| | | |R|     //   S = Spawn                  //');  
        console.log ('//   | |R|E|E| |R| | | |R| |     //   R = Route                  //');
        console.log ('//   | |E|R|E|E|R| | |R| | |     //   E = Extension              //');
        console.log ('//   |T|E|E|R|E|R| |R| | | |     //   T = Tower                  //');
        console.log ('//   |R| |E|E|R| |R| | | |R|     //                              //');
        console.log ('//   | |R|R|R| |S| |R|R|R| |     //                              //');
        console.log ('//   |R| | | |R| |R| | | |R|     //   X = site de construstion   //');
        console.log ('//   | | | |R| |R| |R| | | |     //     { STRUCTURE_EXTENSION }  //');
        console.log ('//   | | |R| | |R| | |R| | |     //       { STRUCTURE_TOWER }    //');
        console.log ('//   | |R| | | |R| | | |R| |     //                              //');
        console.log ('//   |R| | | |R| |R| | | |R|     //   Base de 11x11              //');
        console.log ('//  y                            //                              //');
        console.log ('///////////////////////////////////////////////////////////////////');
        console.log ('//                                                               //');
        console.log ('//      Pour confirmer et construire faite Memory.rcl = 4        //');
        console.log ('//                                                               //');
        console.log ('//      Fait 16 pour voir la troisième étape de construction     //');
        console.log ('//                                                               //');
        console.log ('///////////////////////////////////////////////////////////////////');
        console.log ('//                                                               //');
        console.log ('//                   /!\ Pas Implementer /!\                     //');
        console.log ('//                                                               //');
        console.log ('///////////////////////////////////////////////////////////////////');
        Memory.cmd = 100;
        
        
        
        
    }
    
    if (Memory.cmd == 16) {
        
         for ( i = 0 ; i > 10 ; i++) {
            
            console.log ()
            
        }
        
        console.log ('///////////////////////////////////////////////////////////////////');
        console.log ('//     construstions RCL 5       //         Description          //');         
        console.log ('//  0                       x    //                              //');
        console.log ('//   |R| | | |R| |R| | | |R|     //   S = Spawn                  //');  
        console.log ('//   | |R|E|E| |R| | | |R| |     //   R = Route                  //');
        console.log ('//   | |E|R|E|E|R| | |R| | |     //   E = Extension              //');
        console.log ('//   |T|E|E|R|E|R| |R| | | |     //   T = Tower                  //');
        console.log ('//   |R| |E|E|R| |R| | | |R|     //                              //');
        console.log ('//   | |R|R|R| |S| |R|R|R| |     //                              //');
        console.log ('//   |R| | | |R| |R| | | |R|     //   X = site de construstion   //');
        console.log ('//   | | | |R| |R| |R| | | |     //     { STRUCTURE_EXTENSION }  //');
        console.log ('//   | | |R| | |R| | |R| | |     //       { STRUCTURE_TOWER }    //');
        console.log ('//   | |R| | | |R| | | |R| |     //                              //');
        console.log ('//   |R| | | |R| |R| | | |R|     //   Base de 11x11              //');
        console.log ('//  y                            //                              //');
        console.log ('///////////////////////////////////////////////////////////////////');
        console.log ('//                                                               //');
        console.log ('//      Pour confirmer et construire faite Memory.rcl = 4        //');
        console.log ('//                                                               //');
        console.log ('//      Fait 16 pour voir la troisième étape de construction     //');
        console.log ('//                                                               //');
        console.log ('///////////////////////////////////////////////////////////////////');
        console.log ('//                                                               //');
        console.log ('//                   /!\ Pas Implementer /!\                     //');
        console.log ('//                                                               //');
        console.log ('///////////////////////////////////////////////////////////////////');
        Memory.cmd = 100;
        
        
        
        
    }
    
    if (Memory.cmd == 17) {
        
         for ( i = 0 ; i > 10 ; i++) {
            
            console.log ()
            
        }
        
        console.log ('///////////////////////////////////////////////////////////////////');
        console.log ('//     construstions RCL 6       //         Description          //');         
        console.log ('//  0                       x    //                              //');
        console.log ('//   |R| | | |R| |R| | | |R|     //   S = Spawn                  //');  
        console.log ('//   | |R|E|E| |R| | | |R| |     //   R = Route                  //');
        console.log ('//   | |E|R|E|E|R| | |R| | |     //   E = Extension              //');
        console.log ('//   |T|E|E|R|E|R| |R| | | |     //   T = Tower                  //');
        console.log ('//   |R| |E|E|R| |R| | | |R|     //                              //');
        console.log ('//   | |R|R|R| |S| |R|R|R| |     //                              //');
        console.log ('//   |R| | | |R| |R| | | |R|     //   X = site de construstion   //');
        console.log ('//   | | | |R| |R| |R| | | |     //     { STRUCTURE_EXTENSION }  //');
        console.log ('//   | | |R| | |R| | |R| | |     //       { STRUCTURE_TOWER }    //');
        console.log ('//   | |R| | | |R| | | |R| |     //                              //');
        console.log ('//   |R| | | |R| |R| | | |R|     //   Base de 11x11              //');
        console.log ('//  y                            //                              //');
        console.log ('///////////////////////////////////////////////////////////////////');
        console.log ('//                                                               //');
        console.log ('//      Pour confirmer et construire faite Memory.rcl = 4        //');
        console.log ('//                                                               //');
        console.log ('//      Fait 16 pour voir la troisième étape de construction     //');
        console.log ('//                                                               //');
        console.log ('///////////////////////////////////////////////////////////////////');
        console.log ('//                                                               //');
        console.log ('//                   /!\ Pas Implementer /!\                     //');
        console.log ('//                                                               //');
        console.log ('///////////////////////////////////////////////////////////////////');
        Memory.cmd = 100;
        
        
        
        
    }
    
    if (Memory.cmd == 18) {
        
         for ( i = 0 ; i > 10 ; i++) {
            
            console.log ()
            
        }
        
        console.log ('///////////////////////////////////////////////////////////////////');
        console.log ('//     construstions RCL 7       //         Description          //');         
        console.log ('//  0                       x    //                              //');
        console.log ('//   |R| | | |R| |R| | | |R|     //   S = Spawn                  //');  
        console.log ('//   | |R|E|E| |R| | | |R| |     //   R = Route                  //');
        console.log ('//   | |E|R|E|E|R| | |R| | |     //   E = Extension              //');
        console.log ('//   |T|E|E|R|E|R| |R| | | |     //   T = Tower                  //');
        console.log ('//   |R| |E|E|R| |R| | | |R|     //                              //');
        console.log ('//   | |R|R|R| |S| |R|R|R| |     //                              //');
        console.log ('//   |R| | | |R| |R| | | |R|     //   X = site de construstion   //');
        console.log ('//   | | | |R| |R| |R| | | |     //     { STRUCTURE_EXTENSION }  //');
        console.log ('//   | | |R| | |R| | |R| | |     //       { STRUCTURE_TOWER }    //');
        console.log ('//   | |R| | | |R| | | |R| |     //                              //');
        console.log ('//   |R| | | |R| |R| | | |R|     //   Base de 11x11              //');
        console.log ('//  y                            //                              //');
        console.log ('///////////////////////////////////////////////////////////////////');
        console.log ('//                                                               //');
        console.log ('//      Pour confirmer et construire faite Memory.rcl = 4        //');
        console.log ('//                                                               //');
        console.log ('//      Fait 16 pour voir la troisième étape de construction     //');
        console.log ('//                                                               //');
        console.log ('///////////////////////////////////////////////////////////////////');
        console.log ('//                                                               //');
        console.log ('//                   /!\ Pas Implementer /!\                     //');
        console.log ('//                                                               //');
        console.log ('///////////////////////////////////////////////////////////////////');
        Memory.cmd = 100;
        
        
        
        
    }
    
    if (Memory.cmd == 19) {
        
         for ( i = 0 ; i > 10 ; i++) {
            
            console.log ()
            
        }
        
        console.log ('///////////////////////////////////////////////////////////////////');
        console.log ('//     construstions RCL 8       //         Description          //');         
        console.log ('//  0                       x    //                              //');
        console.log ('//   |R| | | |R| |R| | | |R|     //   S = Spawn                  //');  
        console.log ('//   | |R|E|E| |R| | | |R| |     //   R = Route                  //');
        console.log ('//   | |E|R|E|E|R| | |R| | |     //   E = Extension              //');
        console.log ('//   |T|E|E|R|E|R| |R| | | |     //   T = Tower                  //');
        console.log ('//   |R| |E|E|R| |R| | | |R|     //                              //');
        console.log ('//   | |R|R|R| |S| |R|R|R| |     //                              //');
        console.log ('//   |R| | | |R| |R| | | |R|     //   X = site de construstion   //');
        console.log ('//   | | | |R| |R| |R| | | |     //     { STRUCTURE_EXTENSION }  //');
        console.log ('//   | | |R| | |R| | |R| | |     //       { STRUCTURE_TOWER }    //');
        console.log ('//   | |R| | | |R| | | |R| |     //                              //');
        console.log ('//   |R| | | |R| |R| | | |R|     //   Base de 11x11              //');
        console.log ('//  y                            //                              //');
        console.log ('///////////////////////////////////////////////////////////////////');
        console.log ('//                                                               //');
        console.log ('//      Pour confirmer et construire faite Memory.rcl = 4        //');
        console.log ('//                                                               //');
        console.log ('//      Fait 16 pour voir la troisième étape de construction     //');
        console.log ('//                                                               //');
        console.log ('///////////////////////////////////////////////////////////////////');
        console.log ('//                                                               //');
        console.log ('//                   /!\ Pas Implementer /!\                     //');
        console.log ('//                                                               //');
        console.log ('///////////////////////////////////////////////////////////////////');
        Memory.cmd = 100;
        
        
        
        
    }
        
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var spawn = Game.spawns['Spawn1'].pos;
    var RoomsBuildBase = (spawn.roomName);
    var controlle = Game.rooms[RoomsBuildBase].controller.level;
    
    
    
    var Yspawn = (spawn.y);
    var Xspawn = (spawn.x);
    
   
  
    if(Memory.rcl == 1) {
        if(controlle >= 1) {
            
            
        var XspawnSave = Xspawn
        var YspawnSave = Yspawn
        
        
        for(var i = 0 ; i < 5 ; i++) {
            var Xspawn = Xspawn - 1 ;
            var Yspawn = Yspawn - 1 ;
            Game.rooms[RoomsBuildBase].createConstructionSite( Xspawn  , Yspawn , STRUCTURE_ROAD);
            
        }
    
        var Xspawn = XspawnSave
        var Yspawn = YspawnSave
        
        
        for(var i = 0 ; i < 5 ; i++) {
            var Xspawn = Xspawn + 1 ;
            var Yspawn = Yspawn + 1 ;
            Game.rooms[RoomsBuildBase].createConstructionSite( Xspawn  , Yspawn , STRUCTURE_ROAD);
            
        }
        
        var Xspawn = XspawnSave
        var Yspawn = YspawnSave
        
        for(var i = 0 ; i < 5 ; i++) {
            var Xspawn = Xspawn + 1 ;
            var Yspawn = Yspawn - 1 ;
            Game.rooms[RoomsBuildBase].createConstructionSite( Xspawn  , Yspawn , STRUCTURE_ROAD);
            
        }
        
        var Xspawn = XspawnSave
        var Yspawn = YspawnSave
        
        for(var i = 0 ; i < 5 ; i++) {
            var Xspawn = Xspawn - 1 ;
            var Yspawn = Yspawn + 1 ;
            Game.rooms[RoomsBuildBase].createConstructionSite( Xspawn  , Yspawn , STRUCTURE_ROAD);
            
        }
        
        var Xspawn = XspawnSave
        var Yspawn = YspawnSave
        
        var Xspawn = ( Xspawn + 1 )
        for(var i = 0 ; i < 3 ; i++) {
            var Xspawn = Xspawn + 1 ;
            Game.rooms[RoomsBuildBase].createConstructionSite( Xspawn  , Yspawn , STRUCTURE_ROAD);
            
        }
        
        var Xspawn = XspawnSave
        
        var Xspawn = ( Xspawn - 1 )
        for(var i = 0 ; i < 3 ; i++) {
            var Xspawn = Xspawn - 1 ;
            Game.rooms[RoomsBuildBase].createConstructionSite( Xspawn  , Yspawn , STRUCTURE_ROAD);
            
        }
        
        var Xspawn = XspawnSave
        
        var Yspawn = (Yspawn + 1)
        for(var i = 0 ; i < 3 ; i++) {
            var Yspawn = Yspawn + 1 ;
            Game.rooms[RoomsBuildBase].createConstructionSite( Xspawn  , Yspawn , STRUCTURE_ROAD);
            
        }
        
        var Yspawn = YspawnSave
        
        var Yspawn = (Yspawn - 1)
        for(var i = 0 ; i < 3 ; i++) {
            var Yspawn = Yspawn - 1 ;
            Game.rooms[RoomsBuildBase].createConstructionSite( Xspawn  , Yspawn , STRUCTURE_ROAD);
            
        }
        var Yspawn = YspawnSave
        var Xspawn = XspawnSave
        
        Game.rooms[RoomsBuildBase].createConstructionSite( (Xspawn - 5)  , (Yspawn + 1) , STRUCTURE_ROAD);
        Game.rooms[RoomsBuildBase].createConstructionSite( (Xspawn - 5)  , (Yspawn - 1) , STRUCTURE_ROAD);
        
        Game.rooms[RoomsBuildBase].createConstructionSite( (Xspawn + 5)  , (Yspawn + 1) , STRUCTURE_ROAD);
        Game.rooms[RoomsBuildBase].createConstructionSite( (Xspawn + 5)  , (Yspawn - 1) , STRUCTURE_ROAD);
        
        Game.rooms[RoomsBuildBase].createConstructionSite( (Xspawn + 1)  , (Yspawn + 5) , STRUCTURE_ROAD);
        Game.rooms[RoomsBuildBase].createConstructionSite( (Xspawn - 1)  , (Yspawn + 5) , STRUCTURE_ROAD);
        
        Game.rooms[RoomsBuildBase].createConstructionSite( (Xspawn + 1)  , (Yspawn - 5) , STRUCTURE_ROAD);
        Game.rooms[RoomsBuildBase].createConstructionSite( (Xspawn - 1)  , (Yspawn - 5) , STRUCTURE_ROAD);
        
        console.log ('//////////////////////////////')
        console.log ('//                          //')   
        console.log ('//    Placement Terminée    //')  
        console.log ('//                          //')
        console.log ('//////////////////////////////')
        Memory.rcl = 100
        }
        else {
            console.log ('/////////////////////////////////')
            console.log ('//                             //')   
            console.log ('//  Controller level trop bas  //')  
            console.log ('//                             //')
            console.log ('/////////////////////////////////')
            Memory.rcl = 100
        }
    } 
    if(Memory.rcl == 2) { 
        if(controlle >= 2) {
            
            Game.rooms[RoomsBuildBase].createConstructionSite( (Xspawn - 2) , (Yspawn - 1) , STRUCTURE_EXTENSION);
            Game.rooms[RoomsBuildBase].createConstructionSite( (Xspawn - 1) , (Yspawn - 2) , STRUCTURE_EXTENSION);
            
            Game.rooms[RoomsBuildBase].createConstructionSite( (Xspawn - 3) , (Yspawn - 1) , STRUCTURE_EXTENSION);
            Game.rooms[RoomsBuildBase].createConstructionSite( (Xspawn - 1) , (Yspawn - 3) , STRUCTURE_EXTENSION);
            
            Game.rooms[RoomsBuildBase].createConstructionSite( (Xspawn - 3) , (Yspawn - 2) , STRUCTURE_EXTENSION);
            
            console.log ('//////////////////////////////')
            console.log ('//                          //')   
            console.log ('//    Placement Terminée    //')  
            console.log ('//                          //')
            console.log ('//////////////////////////////')
            Memory.rcl = 100
            
        }
        else {
            console.log ('/////////////////////////////////')
            console.log ('//                             //')   
            console.log ('//  Controller level trop bas  //')  
            console.log ('//                             //')
            console.log ('/////////////////////////////////')
            Memory.rcl = 100
        }
        
    }
    if(Memory.rcl == 3) { 
        if(controlle >= 3) {
            
            Game.rooms[RoomsBuildBase].createConstructionSite( (Xspawn - 2) , (Yspawn - 3) , STRUCTURE_EXTENSION);
            Game.rooms[RoomsBuildBase].createConstructionSite( (Xspawn - 4) , (Yspawn - 2) , STRUCTURE_EXTENSION);
            
            Game.rooms[RoomsBuildBase].createConstructionSite( (Xspawn - 2) , (Yspawn - 4) , STRUCTURE_EXTENSION);
            Game.rooms[RoomsBuildBase].createConstructionSite( (Xspawn - 4) , (Yspawn - 3) , STRUCTURE_EXTENSION);
            
            Game.rooms[RoomsBuildBase].createConstructionSite( (Xspawn - 3) , (Yspawn - 4) , STRUCTURE_EXTENSION);
            Game.rooms[RoomsBuildBase].createConstructionSite( (Xspawn - 5) , (Yspawn - 3) , STRUCTURE_TOWER);
            
            console.log ('//////////////////////////////')
            console.log ('//                          //')   
            console.log ('//    Placement Terminée    //')  
            console.log ('//                          //')
            console.log ('//////////////////////////////')
            Memory.rcl = 100
            
        }
        else {
            console.log ('/////////////////////////////////')
            console.log ('//                             //')   
            console.log ('//  Controller level trop bas  //')  
            console.log ('//                             //')
            console.log ('/////////////////////////////////')
            
            Memory.rcl = 100
        }
        
    }
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
    
        if(creep.memory.role == 'ouvrier') {
            roleOuvrier.run(creep);
        }

    }

}