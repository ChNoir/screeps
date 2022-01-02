module.exports = roleOuvrier;

var roleOuvrier = {
    
    run: function(creep) {
        
        var entrepro = creep.room.find(FIND_STRUCTURES, {
                filter:(structure) => { 
                    return (structure.structureType == STRUCTURE_CONTAINER)}
        })
       
        var sources = creep.room.find(FIND_SOURCES);

        
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        
       
        
        
        



    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
        if(creep.memory.sousrole == 'recolteur' ) {
            
            if(creep.carry.energy < creep.carryCapacity) {
                if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[1], );
                }
            }
            else {
                
                if ( entrepro < 1) {
                    var targets = creep.room.find(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                                    structure.energy <= structure.energyCapacity;
                            }
                    });
                    if(targets.length > 0) {
                        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0], );
                        }
                    }
                }
                else {
                    if(entrepro.length > 0) {
                        if(creep.transfer(entrepro[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(entrepro[0], );
                        }
                    }
                    
                }
            }
        }
        
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        if(creep.memory.sousrole == 'upgrader' ) {
            
            if(creep.memory.upgrading && creep.carry.energy == 0) {
                creep.memory.upgrading = false;
                creep.say('🔄 harvest');
            }
            if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
                creep.memory.upgrading = true;
                creep.say('⚡ upgrade');
            }

            if(creep.memory.upgrading) {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, );
                }
            }
            else {
                if ( entrepro < 1) {
                    
                    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0], );
                    }
                }
                else {
                    
                    
                    
                    
                    
                }
            }
        }
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        if(creep.memory.sousrole == 'construter' ) {
            
            if(creep.memory.building && creep.carry.energy == 0) {
                creep.memory.building = false;
                creep.say('🔄 harvest');
    	    }
    	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
    	        creep.memory.building = true;
    	        creep.say('🚧 build');
    	    }
    
    	    if(creep.memory.building) {
    	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(targets.length) {
                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
    	    }
    	    else {
                if (entrepro < 1) {
                    
                    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
                else {
                    
                    
                    
                    
                    
                }
    	    }
            
        }
        
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        if(creep.memory.sousrole == 'reparater' ) {
            
            
            var structs = creep.room.find(FIND_STRUCTURES, {
                    filter: object => object.hits < object.hitsMax});
            
            var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => { 
                            return (structure.structureType == STRUCTURE_RAMPART ) && structure.hits < 2000 }});

            if ((structs.length + targets.length) > 0) {
            
                if(creep.memory.repairer && creep.carry.energy == 0) {
                    creep.memory.repairer = false;
                    creep.say('🔄 harvest');
                }
                if(!creep.memory.repairer && creep.carry.energy == creep.carryCapacity) {
                    creep.memory.repairer = true;
                    creep.say('🚧 repairer');
                }

                if(creep.memory.repairer) {

                    if(targets.length) {
                        if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                     if(structs.length) {
                        if(creep.repair(structs[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(structs[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                }
                else {
                    
                    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }  
            }
            else {
                
                if(creep.memory.building && creep.carry.energy == 0) {
                    creep.memory.building = false;
                    creep.say('🔄 harvest');
                }
                if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
                    creep.memory.building = true;
                    creep.say('🚧 build');
                }

                if(creep.memory.building) {
                    var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                    if(targets.length) {
                        if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                }
                else {
                    
                    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
            }
        }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    }
}

module.exports = roleOuvrier;