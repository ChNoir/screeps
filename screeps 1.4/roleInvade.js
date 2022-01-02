var roleInvade = {
    
    run: function(creep){
        
        var ennemicreeps = creep.room.find(FIND_HOSTILE_CREEPS)
        var ennemistructures = creep.room.find(FIND_HOSTILE_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_SPAWN)}});
                
        var ennemis = (ennemistructures.length + ennemicreeps.length)
        
        
        
        var rangeennemicreeps = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
        var rangeennemistructures = creep.pos.findInRange(FIND_HOSTILE_STRUCTURES,3);
        
        if(creep.memory.invade && ennemis.length == 0) {
            creep.memory.invade = false;
            creep.say('Go flag');
	    }
	    if(!creep.memory.invade && ennemis.length > 1) {
	        creep.memory.invade = true;
	        creep.say('Attaque');
	    }
	    
	    if(creep.memory.invade) {
	        
	        if (creep.memory.role == 'invade' ) {
	        
	            if(ennemicreeps.length > 0 ) {
                    if (creep.attack(ennemicreeps[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(ennemicreeps[0]);
                    }
                }
                else {
                    if (creep.attack(ennemistructures[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(ennemistructures[0]);
                    }
                }
            }
        
            if (creep.memory.role == 'invaderange' ) {
            
                if(ennemicreeps.length > 0) {
                    if (creep.rangedAttack(ennemicreeps[0]) == ERR_NOT_IN_RANGE ) {
                        creep.moveTo(ennemicreeps[0]);
                    }
                } 
                else {
                    if (creep.rangedAttack(ennemistructures[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(ennemistructures[0]);
                    }
                }
            }
        }
	    else {
            creep.moveTo(Game.flags.invade1)
	    }
    }
};

module.exports = roleInvade;