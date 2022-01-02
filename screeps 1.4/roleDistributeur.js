var roleDistributeur = {
    
    run: function(creep) {
        
        var container = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => { 
                return (structure.structureType == STRUCTURE_CONTAINER ) }});
        
        var storag = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => { 
                return (structure.structureType == STRUCTURE_STORAGE )}});
        
        var extension = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;}});
                        
        var tower = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER ) && structure.energy < structure.energyCapacity;}});
        
        if(creep.memory.distribu && creep.carry.energy == 0) {
            creep.memory.distribu = false;
            creep.say('recharge');
	    }
	    if(!creep.memory.distribue && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.distribu = true;
	        creep.say('Distribu');
	    }
        
        if(creep.memory.distribu) {
            if(creep.transfer(extension[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(extension[0]);
            }
            else{
                if(creep.transfer(tower[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tower[0]);
                }
            }
        }
        else {
            if(creep.withdraw(container[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container[0]);
            }
            else {
                
            }
        }
    }
}
module.exports = roleDistributeur;