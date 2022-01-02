module.exports = roleOuvrier;

var roleOuvrier = { 

    run: function(creep) {
        
/////////////////////////////////////////////////////
//                  FUNCTION                       //
/////////////////////////////////////////////////////
        
        function ModuleWork ( work , cible  ) {
            
            if (work === 'pickup')            { if(creep.pickup            (cible, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {creep.moveTo(cible);} }
            if (work === 'transfer')          { if(creep.transfer          (cible, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {creep.moveTo(cible);} }
            if (work === 'build')             { if(creep.build             (cible, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {creep.moveTo(cible);} }
            if (work === 'repair')            { if(creep.repair            (cible, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {creep.moveTo(cible);} }
            if (work === 'upgradeController') { if(creep.upgradeController (creep.room.controller) == ERR_NOT_IN_RANGE) {creep.moveTo(creep.room.controller);} }
            if (work === 'harvest')           { if(creep.harvest           (cible, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {creep.moveTo(cible);} }
         }
                
/////////////////////////////////////////////////////
//                    OBJETS                       //
/////////////////////////////////////////////////////

        var sources = creep.room.find(FIND_SOURCES); 
        
        var BuildSite = creep.room.find(FIND_CONSTRUCTION_SITES); 
        
        var BuildEnergi = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                                structure.energy <= structure.energyCapacity;}});
            
        var BuildRepare = creep.room.find(FIND_STRUCTURES, {
                    filter: object => object.hits < object.hitsMax});
        
        var Container = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => { return (structure.structureType == STRUCTURE_CONTAINER )}});
        
        
        
/////////////////////////////////////////////////////
//                    SOURCE                       //
/////////////////////////////////////////////////////
        
        if (Container = 1) {
            
            var SourceRecolteur         = creep.Memory.source.length

        }
        else {
            var SourceRecolteur         = 1 ;
            var SourceUpgrader          = 0 ;
            var SourceConstruter        = 0 ;
            var SourceReparater         = 0 ;
        }
        
/////////////////////////////////////////////////////
//                     WORK                        //
/////////////////////////////////////////////////////        
        
        if(creep.memory.works && creep.carry.energy == 0) {
                creep.memory.works = false;
                creep.say('🔄 Idel');
            
        }
        if(!creep.memory.works && creep.carry.energy == creep.carryCapacity) {
            creep.memory.works = true;
            creep.say('🚧 Work');
        }
        if(creep.memory.works) { 
            
            if (creep.memory.sousrole === 'recolteur'   ) { ModuleWork('transfer'           ,BuildEnergi[0] ) }
            if (creep.memory.sousrole === 'upgrader'    ) { ModuleWork('upgradeController'  ,               ) }
            if (creep.memory.sousrole === 'construter'  ) { ModuleWork('build'              ,BuildSite[0]   ) }
            if (creep.memory.sousrole === 'reparater'   ) { ModuleWork('repair'             ,BuildRepare[0]    ) }
            
            
        }
        else{
            if (Container.length = 1) {
                if (creep.memory.sousrole === 'upgrader'    ) { ModuleWork('pickup' ,Container ) }
                if (creep.memory.sousrole === 'construter'  ) { ModuleWork('pickup' ,Container ) }
                if (creep.memory.sousrole === 'reparater'   ) { ModuleWork('pickup' ,Container ) }
                if (creep.memory.sousrole === 'recolteur'   ) { ModuleWork('hervest',sources[creep.memory.source])}
                
            }
            else {
                if (creep.memory.sousrole === 'recolteur'   ) { ModuleWork('harvest',sources[SourceRecolteur]   ) }
                if (creep.memory.sousrole === 'upgrader'    ) { ModuleWork('harvest',sources[SourceUpgrader]    ) }
                if (creep.memory.sousrole === 'construter'  ) { ModuleWork('harvest',sources[SourceConstruter]  ) }
                if (creep.memory.sousrole === 'reparater'   ) { ModuleWork('harvest',sources[SourceReparater]   ) }
            }
        }
    }
}
module.exports = roleOuvrier;  