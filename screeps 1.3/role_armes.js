module.exports = roleArmes;

var roleArmes = { 

    run: function(creep) { 
    
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
        
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        var StructuresEnnemis = creep.room.find(FIND_HOSTILE_STRUCTURES, {
                filter: (structure) => {
                        return ( structure.structureType == STRUCTURE_SPAWN);}});
        
        var CreepEnnemis = creep.room.find(FIND_HOSTILE_CREEPS);
        
        var Ennemis = (CreepEnnemis.length + StructuresEnnemis.length)
        
        
        
        
        
        
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        if(creep.memory.works && Ennemis > 0) {
            creep.memory.works = false;
            creep.say('🔄 Idel');
            
        }
        if(!creep.memory.works && Ennemis == 0) {
            creep.memory.works = true;
            creep.say('🚧 Work');
        }
        
        if(creep.memory.works) {
        
        
        }
        
        
        
        
        
    
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            
            
               
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
}
module.exports = roleArmes;