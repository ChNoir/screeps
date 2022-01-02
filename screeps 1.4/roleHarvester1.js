var roleHarvester1 = {
    
    run: function(creep) {
    
    
        
    
        
    
   
    
    var sources1 = _.filter(Game.creeps, (creep) => creep.memory.sourcess == 'S1');
    var sources2 = _.filter(Game.creeps, (creep) => creep.memory.sourcess == 'S2');
    var sources3 = _.filter(Game.creeps, (creep) => creep.memory.sourcess == 'S3');
    var sources4 = _.filter(Game.creeps, (creep) => creep.memory.sourcess == 'S4');
    
    
    
    if(creep.memory.sourcess == 'undefined'){
        if (sources1.length == 1) {
            if (sources2.length == 1) {
                if (sources3.length == 1) {
                    if (sources4.length == 1) {
         
                    }
                    else {
                        if (creep.memory.sourcess = 'S4'){
                           
                        }
                        
                    }
                }
                else {
                    if (creep.memory.sourcess = 'S3') {
                        
                    }
                    
                }
            }
            else {
                if (creep.memory.sourcess = 'S2'){
                    
                }
                
            }
        }
        else {
            if (creep.memory.sourcess = 'S1') {
               
            }
            
        }
    }
	
	if(creep.memory.recolte && creep.carry.energy == 0) {
        creep.memory.recolte = false;
        creep.say('🔄 harvest');
	}
	if(!creep.memory.recolte && creep.carry.energy == creep.carryCapacity) {
	   creep.memory.recolte = true;
	   creep.say('🚧 transfert');
	}
	 
	if(creep.memory.recolte) {
           
           if (creep.memory.sourcess == 'S1') {
                var targets = Game.getObjectById ('5b5d60d1bd38024cfbcd495c')
                if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets);
                }
            }
            
            if (creep.memory.sourcess == 'S2') {
                var targets = Game.getObjectById ('5b6057bf3e53d2642f99d682')
                if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets);
                }
            }
           
           if (creep.memory.sourcess == 'S3') {
                var targets2 = Game.getObjectById ('5b5de106a136ae76b47809e8')
                if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets);
                }
            }
            
            if (creep.memory.sourcess == 'S4') {
                var targets3 = Game.getObjectById ('5b5df89d3c93de26f63296ae')
                if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets);
                }
            }
            
	    }
	    else {
	        
	        if (creep.memory.sourcess == 'S1') {
                var sources = Game.getObjectById('59f1a68b82100e1594f4025f');
                if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
	        
	        if (creep.memory.sourcess == 'S2') {
                var sources = Game.getObjectById('59f1a68b82100e1594f40260');
                if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
	        
	        if (creep.memory.sourcess == 'S3') {
                var sources = Game.getObjectById('59f1a68b82100e1594f4025b');
                if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
	        
	        if (creep.memory.sourcess == 'S4') {
                var sources = Game.getObjectById('59f1a68b82100e1594f4025c');
                if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
	        
	    }
	}
}
    
module.exports = roleHarvester1; 
    
