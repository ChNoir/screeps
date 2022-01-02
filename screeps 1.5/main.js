/////////////////////////////////////////////////////
//                   MODULE                        //
/////////////////////////////////////////////////////

var roleOuvrier = require('role.ouvrier');

/////////////////////////////////////////////////////
//                   CONFIG                        //
/////////////////////////////////////////////////////

var Container = Game.room[spawnRooms].find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_CONTAINER )}});

if (Memory.start = 1 ) { Memory.spwan1.level = 0 }

if (Container = 1)  { Memory.spwan1.level = 1 }

/////////////////////////////////////////////////////
//                  FUNCTION                       //
/////////////////////////////////////////////////////

function random (min, max) { 
    return Math.floor(Math.random()* (max - min + 1) + min);
}



function ModuleCreep (move,work,carry,attack,range_attack,heal,claim,tough) {
    
    var module = [] ;

    if ( move            > 0) { for ( var i = 0 ; i < move          ; i++) { module.push(MOVE)            } };
    if ( work            > 0) { for ( var i = 0 ; i < work          ; i++) { module.push(WORK)            } };
    if ( carry           > 0) { for ( var i = 0 ; i < carry         ; i++) { module.push(CARRY)           } };
    if ( attack          > 0) { for ( var i = 0 ; i < attack        ; i++) { module.push(ATTACK)          } };
    if ( range_attack    > 0) { for ( var i = 0 ; i < range_attack  ; i++) { module.push(RANGED_ATTACK)   } };
    if ( heal            > 0) { for ( var i = 0 ; i < heal          ; i++) { module.push(HEAL)            } };
    if ( claim           > 0) { for ( var i = 0 ; i < claim         ; i++) { module.push(CLAIM)           } };
    if ( tough           > 0) { for ( var i = 0 ; i < tough         ; i++) { module.push(TOUGH)           } };
    
    return module
    
    
}

/////////////////////////////////////////////////////

function Auto_spawn ( Spawn ,NumberCreep , NumberMaxCreep , Role ,Sous_Role, Module  ) {
    
    if (NumberCreep < NumberMaxCreep) {
        var name = Sous_Role + Game.time 
        Game.spawns[ Spawn ].spawnCreep( Module , name , {memory: {role: Role ,sousrole: Sous_Role, spawn : Spawn, source : 'none' }  });
    }
}


/////////////////////////////////////////////////////

function Clockminute (time) {
    
    for ( i = 0 ; i < 60 ; i + time ) {
        if( i === Memory.time[2] && Memory.time[0] === Memory.time[1] )return true
    }
    
}

/////////////////////////////////////////////////////
//                    HORLOGE                      //
/////////////////////////////////////////////////////


if (Memory.start === 1) {
    Memory.time = [Game.time,0,0,0,0,0,0];
}

if (Memory.time[5] === 1){ Memory.time = [Game.time,0,0,0,0,0,0] }

Memory.time[1] = Game.time

if ( Memory.time[1] >= (Memory.time[0] + 60 ) ) {
    Memory.time[0] = Game.time ;
    Memory.time[2] = (Memory.time[2] + 1)
}
if ( Memory.time[2] >= 60 ) {
    Memory.time[2] = 0;
    Memory.time[3] = ( Memory.time[3] + 1)
}
if ( Memory.time[3] >= 24 ) {
    Memory.time[3] = 0;
    Memory.time[4] = ( Memory.time[4] + 1)
}

//                  0       1       2       3     4     5       6
// Memory.time = [ Time ,tTime , minute , heur, jour, reset, laucher]


/////////////////////////////////////////////////////
//                    CREEPS                       //
/////////////////////////////////////////////////////

module.exports.loop = function () { 

/////////////////////////////////////////////////////    

    for(var name in Memory.creeps) {        
            if(!Game.creeps[name]) {            
                delete Memory.creeps[name];     
            }                                   
        }    

/////////////////////////////////////////////////////
//                CONTROLLE LEVEL                  //
/////////////////////////////////////////////////////  
    
    var spawn = Game.spawns['Spawn1'].pos;
    var spawnRooms = (spawn.roomName);
    var CLVL = Game.rooms[spawnRooms].controller.level;
    
    var extension = Game.room[spawnRooms].find(FIND_STRUCTURES, {
                filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION )}});
    

    
    
/////////////////////////////////////////////////////
//                 MODULES CEEPS                   //
/////////////////////////////////////////////////////  

/*
    Tier  / Energi 
        1 = 300
        2 = 550
        3 = 800
        4 = 1300
        5 = 1800
        6 = 2300
        7 = 5600
        8 = 12900
*/
    
// function ModuleCreep ( move, work, carry, attack, range_attack, heal, claim, tough)
    
   if ( extension.length >= 0 && extension.length <= 5 ) { 
        var ModuleRecolteurs   = ModuleCreep (1,2,1,0,0,0,0,0) ; // 300 //
        var ModuleUpgraders    = ModuleCreep (1,1,3,0,0,0,0,0) ; // 300 //

        var ModuleConstruters  = ModuleCreep (1,2,1,0,0,0,0,0) ; // 300 //
        var ModuleReparaters   = ModuleCreep (1,1,1,0,0,0,0,0) ; // 200 //

        var ModuleQueen        = ModuleCreep (1,0,2,0,0,0,0,0) ; // 200 //    
   }
    if (extension.length > 5 && extension.length <= 10 ) { 
        var ModuleRecolteurs   = ModuleCreep (2,2,3,0,0,0,0,0) ; // 450 //
        var ModuleUpgraders    = ModuleCreep (2,2,3,0,0,0,0,0) ; // 450 //

        var ModuleConstruters  = ModuleCreep (2,2,3,0,0,0,0,0) ; // 450 //
        var ModuleReparaters   = ModuleCreep (2,2,3,0,0,0,0,0) ; // 450 //

        var ModuleQueen        = ModuleCreep (2,0,4,0,0,0,0,0) ; // 400 //    
   }
    if (extension.length > 10 && extension.length <= 20 ) { 
        var ModuleRecolteurs   = ModuleCreep (3,4,4,0,0,0,0,0) ; // 750 //
        var ModuleUpgraders    = ModuleCreep (3,3,5,0,0,0,0,0) ; // 700 //

        var ModuleConstruters  = ModuleCreep (3,3,3,0,0,0,0,0) ; // 600 //
        var ModuleReparaters   = ModuleCreep (3,3,3,0,0,0,0,0) ; // 600 //

        var ModuleQueen        = ModuleCreep (2,0,4,0,0,0,0,0) ; // 400 //    
   }
    
/////////////////////////////////////////////////////
//               MODULES CEEPS SOURCE              //
/////////////////////////////////////////////////////  

    if ( Container = 1) { 
        if (creep.memory.source === 'none' ) {
            creep.memory.source = 'source'+ random(1,2)  
            
        }
    
    }
    
    
/////////////////////////////////////////////////////
//                  NUMBER CEEPS                   //
/////////////////////////////////////////////////////
    
    var ouvriers    = _.filter(Game.creeps, (creep) => creep.memory.role        == 'ouvrier'    );          
    var recolteurs  = _.filter(Game.creeps, (creep) => creep.memory.sousrole    == 'recolteur'  );
    
    var upgraders   = _.filter(Game.creeps, (creep) => creep.memory.sousrole    == 'upgrader'   );    
    var construters = _.filter(Game.creeps, (creep) => creep.memory.sousrole    == 'construter' );
    
    var reparaters  = _.filter(Game.creeps, (creep) => creep.memory.sousrole    == 'reparater'  );  
    var queens      = _.filter(Game.creeps, (creep) => creep.memory.sousrole    == 'queen'      );  
    
/////////////////////////////////////////////////////
//                NUMBER MAX CEEPS                 //
/////////////////////////////////////////////////////  

    var Nrecolteurs    = 6 ;                                           
    var Nupgraders     = 2 ;
    
    var Nconstruters   = 3 ;                                           
    var Nreparaters    = 1 ;
        
    var Nqueen         = 0 ;    
    
/////////////////////////////////////////////////////
//                   AUTO-SPAWN                    //
/////////////////////////////////////////////////////   
    
// function Auto_spawn ( Spawn ,NumberCreep , NumberMaxCreep , Role ,Sous_Role, Module )  
    
    Auto_spawn ( 'Spawn1' , construters.length , Nconstruters , 'ouvrier' , 'construter' , ModuleConstruters )
    Auto_spawn ( 'Spawn1' , reparaters.length  , Nreparaters  , 'ouvrier' , 'reparater'  , ModuleReparaters  )
    Auto_spawn ( 'Spawn1' , upgraders.length   , Nupgraders   , 'ouvrier' , 'upgrader'   , ModuleUpgraders   )
    Auto_spawn ( 'Spawn1' , recolteurs.length  , Nrecolteurs  , 'ouvrier' , 'recolteur'  , ModuleRecolteurs  )
    
/////////////////////////////////////////////////////
//                     COMENDE                     //
/////////////////////////////////////////////////////  
    
    if (Memory.cmd === 1) {
        
        for ( i = 0 ; i > 10 ; i++) { console.log () }
        console.log ('|=====================|');
        console.log ('|                     |');
        console.log ('|  Ouvriers   = '+ ouvriers.length    +'    |');
        console.log ('|                     |');
        console.log ('|=====================|');
        console.log ('|                     |');
        console.log ('|  Recolteurs = '+ recolteurs.length  +'     |');
        console.log ('|  Upgrader   = '+ upgraders.length   +'     |');
        console.log ('|  Construter = '+ construters.length +'     |');
        console.log ('|  Reparater  = '+ reparaters.length  +'     |');
        console.log ('|                     |');
        console.log ('|=====================|');
        Memory.cmd = 100 ;
    }    
    
    if (Memory.cmd === 2) {
        
        for ( i = 0 ; i < 20 ; i++) { console.log (' ') }
        
        if ( Memory.time[2] < 10 ) { var timeMinute = '0' + Memory.time[2] }else { var timeMinute = Memory.time[2] }
        if ( Memory.time[3] < 10 ) { var timeHeure  = '0' + Memory.time[3] }else { var timeHeure  = Memory.time[3] }
        
        
        console.log ('|=====================|')
        console.log ('|      TIME '+ timeHeure + ':' + timeMinute + '     |')
        console.log ('|=====================|')
    }
    
/////////////////////////////////////////////////////
//                    AUTO-BUILD                   //
///////////////////////////////////////////////////// 
    
    if ( Clockminute(1) ) {
    
        for(i = 0 ; i < 10 ; i++) {
            if (ouvriers > 1){
                var creeps  = Game.creep(random(1,ouvriers))
                var creepsZ = creep.z
                var creepsY = creep.y
                var creepsPos = (creeps.roomName)
                Game.rooms[creepsPos].createConstructionSite( creepsZ  , creepsY , STRUCTURE_ROAD);
            }
        }
    }
    
/////////////////////////////////////////////////////
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
    
        if(creep.memory.role == 'ouvrier') {
            roleOuvrier.run(creep);
        }

    }

/////////////////////////////////////////////////////

/////////////////////////////////////////////////////
//                     INFO                        //
/////////////////////////////////////////////////////


    
}

Memory.start = 0 ;
