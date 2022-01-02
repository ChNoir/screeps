var roleClaim = {
    
    run: function(creep) {
        
        var RC = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => { 
                    return (structure.structureType == STRUCTURE_CONTROLLER ) }});
                    
        var po = creep.room.name
        
        if (po === 'E52S57'){
            
            creep.moveTo (9,0,'E52S57',{visualizePathStyle: {stroke: '#ffaa00'}});
        }
        if  (po === 'E52S56') {
            
            
            
            if(creep.claimController(RC) == ERR_NOT_IN_RANGE) {
                creep.moveTo(RC);
            }
            
            
        }
    }
};
module.exports = roleClaim

