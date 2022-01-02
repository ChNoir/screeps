var roleOuvrier = require('role.ouvrier');


module.exports.loop = function () { 

    /////////////////////////////////

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
    
    ////////////////////////////////
   
    var ouvriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'ouvrier');
    var recolteurs = _.filter(Game.creeps, (creep) => creep.memory.sousrole == 'recolteur');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.sousrole == 'upgrader');
    var construters = _.filter(Game.creeps, (creep) => creep.memory.sousrole == 'construter');
    var reparaters = _.filter(Game.creeps, (creep) => creep.memory.sousrole == 'reparater');
    
   
    
    if(ouvriers.length < 10) {
        
        /////////////////////////
        
        var Nrecolteurs    = 4 ;
        var Nupgraders     = 2 ;
        var Nconstruters   = 2 ;
        var Nreparaters    = 2 ; 
        
        var moduleRecolteurs   = [WORK,CARRY,MOVE] ;
        var moduleUpgraders    = [WORK,CARRY,MOVE] ;
        var moduleConstruters  = [WORK,CARRY,MOVE] ;
        var moduleReparaters   = [WORK,CARRY,MOVE] ;
        
        /////////////////////////
        
        
        if (recolteurs.length < Nrecolteurs) {
            var newName = 'recolteur' + Game.time;
            var sousrole = 'recolteur';
            var workmodule = moduleRecolteurs
        }
        else{
            
            if (upgraders.length < Nupgraders) {
                var newName = 'upgrader' + Game.time;
                var sousrole = 'upgrader';
                var workmodule = moduleUpgraders
            }
            if (construters.length < Nconstruters) {
                var newName = 'construter' + Game.time;
                var sousrole = 'construter';
                var workmodule = moduleConstruters
            }
            if (reparaters.length < Nreparaters) {
                var newName = 'reparater' + Game.time;
                var sousrole = 'reparater';
                var workmodule = moduleReparaters
            }
            
            
        }
        
        
        
        Game.spawns['Spawn1'].spawnCreep( workmodule , newName, {memory: {role: 'ouvrier' ,sousrole: sousrole }  });
        
    }
        
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
    if (Memory.cmd == 1 ) {
        
        console.log ('///////////////////////');
        console.log ('// Ouvriers   = '+ ouvriers.length +'    //');       
        console.log ('///////////////////////');
        console.log ('// Recolteurs = '+ recolteurs.length +'    //');
        console.log ('// Upgrader   = '+ upgraders.length +'    //');
        console.log ('// Construter = '+ construters.length +'    //');
        console.log ('// Reparater  = '+ reparaters.length +'    //');
        console.log ('///////////////////////');
        
    }
    if (Memory.cmd == 2) {
        

        
        console.log ('//////////////////////////////////////////////');
        console.log ('//             En construstions             //');
        console.log ('//   '+ targets);
        console.log ('//                                          //');
        console.log ('//                                          //');
        console.log ('//                                          //');
        console.log ('//                                          //');
        console.log ('//////////////////////////////////////////////');
        
        
        
        
        
        
    }
        
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
    
        if(creep.memory.role == 'ouvrier') {
            roleOuvrier.run(creep);
        }
       
    }




}




