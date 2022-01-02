module.exports = roleOuvrier;

var roleOuvrier = { 

    run: function(creep) {
        
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        var SourceRecolteur         = 1 ;
        var SourceUpgrader          = 0 ;
        var SourceConstruter        = 0 ;
        var SourceReparater         = 0 ;
        
        var Securite                = 1 ; 
        
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        var sources = creep.room.find(FIND_SOURCES); 
        var BuildSite = creep.room.find(FIND_CONSTRUCTION_SITES); 
        
        var BuildEnergi = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                                structure.energy <= structure.energyCapacity;}});
            
        var BuildRepare = creep.room.find(FIND_STRUCTURES, {
                    filter: object => object.hits < object.hitsMax});
        
        var containere = creep.room.find(FIND_STRUCTURES, {
                filter:(structure) => { 
                    return (structure.structureType == STRUCTURE_CONTAINER) }})
        
        var wall = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => { 
                    return (structure.structureType == STRUCTURE_RAMPART ) && structure.hits < 2000 }});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        if (Securite == 1 ) {
            if(sources.length == 1){ 
                var SourceRecolteur     = 0;
                var SourceUpgrader      = 0;
                var SourceConstruter    = 0;
                var SourceReparater     = 0;
            }
            if(sources.length == 2){ 
                var SourceRecolteur     = 1;
                var SourceUpgrader      = 0;
                var SourceConstruter    = 0;
                var SourceReparater     = 0;
            }
        }
        var SecuriteContainere = creep.room.find(FIND_STRUCTURES, {
                filter:(structure) => { 
                    return (structure.structureType == STRUCTURE_CONTAINER) && structure.energy >= 500}})
    

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        if(creep.memory.work && creep.carry.energy == 0) {
            creep.memory.work = false;
            creep.say('🔄 Idel');
        }
        if(!creep.memory.work && creep.carry.energy == creep.carryCapacity) {
            creep.memory.work = true;
            creep.say('🚧 Work');
        }
        if(creep.memory.work) {
            
            ////////////////////////////////////////////////////////////////////////////
            
            if(creep.memory.sousrole == 'recolteur'){
                if(creep.harvest(sources[SourceRecolteur]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[SourceRecolteur]);
                }
            }
            
            ////////////////////////////////////////////////////////////////////////////
            
            if(creep.memory.sousrole == 'upgrader' ) {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
            
            ////////////////////////////////////////////////////////////////////////////
            
            if (creep.memory.sousrole == 'construter') {
                if(creep.build(BuildSite[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(BuildSite[0]);
                }
                
            }
            
            ////////////////////////////////////////////////////////////////////////////
            
            if(creep.memory.sousrole == 'reparater' ){
                if((BuildRepare.length + wall.length) > 0) {
                    if(creep.repair(BuildRepare[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(BuildRepare[0]);
                    }
                    else {
                        if(creep.repair(wall[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(wall[0]);
                        }
                    }
                    
                }
                else {
                    if(creep.build(BuildSite[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(BuildSite[0]);
                    }
                }
            }
            
            ////////////////////////////////////////////////////////////////////////////
        }    
        else{
            
            ////////////////////////////////////////////////////////////////////////////
            
            if(creep.memory.sousrole == 'recolteur') {
                if (containere.length == 1 ) {
                    if(creep.pickup(containere[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(containere[0]);
                    }
                }
                else {
                    if(creep.transfer(BuildEnergi[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(BuildEnergi[0]);
                    }
                }
            }
            
            ////////////////////////////////////////////////////////////////////////////
           
            if(creep.memory.sousrole == 'upgrader' ) {
                if (SecuriteContainere.length == 1) {
                    
                    if(creep.pickup(containere[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(containere[0]);
                    }
                }
                else {
                    if(creep.harvest(sources[SourceUpgrader]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[SourceUpgrader]);
                    }
                }
            }
            
            ////////////////////////////////////////////////////////////////////////////
            
            if(creep.memory.sousrole == 'construter' ) {
                if (SecuriteContainere.length == 1) {
                    
                    if(creep.pickup(containere[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(containere[0]);
                    }
                }
                else {
                    if(creep.harvest(sources[SourceConstruter]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[SourceConstruter]);
                    }
                }
            }
            
            ////////////////////////////////////////////////////////////////////////////
            
            if(creep.memory.sousrole == 'reparater' ) {
                if (SecuriteContainere.length == 1) {
                    
                    if(creep.pickup(containere[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(containere[0]);
                    }
                }
                else {
                    if(creep.harvest(sources[SourceUpgrader]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[SourceUpgrader]);
                    }
                }
            }
            
            ////////////////////////////////////////////////////////////////////////////
            
        }










    }

}