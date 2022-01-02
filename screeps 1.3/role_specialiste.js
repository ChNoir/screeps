module.exports = roleSpecialiste;

var roleSpecialiste = { 

    run: function(creep) { 
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////     
        
        var BuildEnergi = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy <= structure.energyCapacity;}});
        
        var containere = creep.room.find(FIND_STRUCTURES, {
            filter:(structure) => { 
                    return (structure.structureType == STRUCTURE_CONTAINER) }})
        
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////        
        
        
        if(creep.memory.work && creep.carry.energy == 0) {
                creep.memory.work = false;
                creep.say('🔄 Idel');
        }
        if(!creep.memory.work && creep.carry.energy == creep.carryCapacity) {
            creep.memory.work = true;
            creep.say('🚧 Work');
        }
        
        
        
        
        if(creep.memory.work) {
            
            if(creep.memory.sousrole == 'queen'){ 
                if(creep.pickup(containere[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containere[0]);
                }
            }
        }
        else{
            
            if(creep.memory.sousrole == 'queen'){ 
                if(creep.transfer(BuildEnergi[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(BuildEnergi[0]);
                }
            }
        }
    
    
    
    
    }
}
module.exports = roleSpecialiste;