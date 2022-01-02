var roleHarvester = {

    /** @param {Creep} creep **/
run: function(creep) {
    
	var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_CONTAINER)}});
                    
                    
	
	if(creep.memory.recolte && creep.carry.energy == 0) {
        creep.memory.recolte = false;
        creep.say('🔄 harvest');
	}
	if(!creep.memory.recolte && creep.carry.energy == creep.carryCapacity) {
	   creep.memory.recolte = true;
	   creep.say('🚧 transfert');
	}
	 
	if(creep.memory.recolte) {
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
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
}


module.exports = roleHarvester;