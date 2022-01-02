var roleTransporteur = {
    
    run: function(creep) {
        
        var container1 = Game.getObjectById ('5b6057bf3e53d2642f99d682') 

        var containers = container1 
        
        
       
        var storag = Game.getObjectById ('5b5d60d1bd38024cfbcd495c')
        
        if(creep.memory.transport && creep.carry.energy == 0) {
            creep.memory.transport = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.transport && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.transport = true;
	        creep.say('🚧 transfert');
	    }
	    
        if(creep.memory.transport) {
            if(creep.transfer(storag, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storag);
            }
        }
        else {
            if(creep.withdraw(container1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container1);
            }
        }
    }
};


module.exports =  roleTransporteur ;

