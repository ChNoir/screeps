var roleRepairer = {
  
    /** @param {Creep} creep **/
    
    run: function(creep) {
        
        var structs = creep.room.find(FIND_STRUCTURES, {
                    filter: object => object.hits < object.hitsMax
        });
        
        var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => { 
                        return (structure.structureType == STRUCTURE_RAMPART ) && structure.hits < 2000
                    }
        });
        
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
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	   
	    
	}
};
module.exports = roleRepairer;