var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var roleRepairer = require('role.repairer');
var roleBuilderLD = require('role.builderLD');
var roleRepairerLD = require('role.repairerLD');
var roleInvade = require('role.invade');
var roleDistributeur = require('role.distributeur');
var roleUpgraderLD = require('role.upgraderLD');
var roleHarvester1 = require('role.harvester1');
var roleTransporteur = require('role.transporteur');
var roleClaim = require ('role.claim')

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            
        }
    }

    var tower = Game.getObjectById('5b5d9872af5ac16dd3779098');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax });
        
        var CDS2 = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => { 
                    return (structure.structureType == STRUCTURE_ROAD ) && structure.hits < 5000 }});
        
        var CDS3 = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER ) && structure.hits < 250000 }});
                    
        var CDS4 = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_WALL ) && structure.hits < 10000 }});
            
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        
        if(closestHostile) {
            tower.attack(closestHostile);
        }
        else{
            if(CDS4) {
                tower.repair(CDS4);
            }
            if(CDS2) {
                tower.repair(CDS2);
            }
            if(CDS3) {
                tower.repair(CDS3);
            }
        }
    }


    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester1');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var builderLDs = _.filter(Game.creeps, (creep) => creep.memory.role == 'builderLD');
    var repairersLDs = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairerLD');
    var invades = _.filter(Game.creeps, (creep) => creep.memory.role == 'invade');
    var invaderanges = _.filter(Game.creeps, (creep) => creep.memory.role == 'invaderange');
    var distributeurs = _.filter(Game.creeps, (creep) => creep.memory.role == 'distributeur');
    var upgraderLDs = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgraderLD');
    var transporteurs = _.filter(Game.creeps, (creep) => creep.memory.role == 'transporteur');
    
    if (transporteurs.length < 1) {
            var newNameTransporteur = 'transporteur' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], newNameTransporteur, 
            
                {memory: {role: 'transporteur'}});        
    }
    
    if (upgraderLDs.length > 2) {
            var newNameUpgraderLD = 'UpgraderLD' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newNameUpgraderLD, 
            {memory: {role: 'upgraderLD'}});        
    }
    
    if (distributeurs.length < 2) {
            var newNameDistributeurs = 'distributeur' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,CARRY,MOVE,MOVE], newNameDistributeurs, 
            {memory: {role: 'distributeur'}});        
    }
    
    if (repairersLDs.length < 1) {
            var newNameRepairersLDs = 'repairersLD' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE], newNameRepairersLDs, 
            {memory: {role: 'repairerLD'}});        
    }

    if (harvesters.length < 2) {
            var newNameHarvester = 'harvester' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], newNameHarvester, 
            {memory: {role: 'harvester1',sourcess: 'undefined'}});        
    }
    else {
        if(upgraders.length < 3) {
            var newNameUpgrader = 'upgrader' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], newNameUpgrader, 
            {memory: {role: 'upgrader'}});        
        }
        else {
            if(repairers.length < 1) {
                var newNameRepairer = 'repairer' + Game.time;
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE], newNameRepairer, 
                {memory: {role: 'repairer'}});      
            }
            else {
                if(builders.length < 1) {
                    var newNameBuilder = 'builder' + Game.time;
                    Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], newNameBuilder, 
                    {memory: {role: 'builder'}});        
                }
                else{
                    if(builderLDs.length > 2) {
                        var newNameBuilderLD = 'builderLD' + Game.time;
                        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newNameBuilderLD, 
                        {memory: {role: 'builderLD'}});
                    }
                    else {
                        if(invades.length < 1) {
                            var newNameInvade = 'invade' + Game.time;
                            Game.spawns['Spawn1'].spawnCreep([TOUGH,TOUGH,MOVE,MOVE,ATTACK], newNameInvade, 
                            {memory: {role: 'invade'}});
                        }
                        else {
                            if(invaderanges.length < 4) {
                                var newNameInvaderange = 'invaderange' + Game.time;
                                Game.spawns['Spawn1'].spawnCreep([MOVE,RANGED_ATTACK], newNameInvaderange, 
                                {memory: {role: 'invaderange'}});
                            }
                        }
                    }
                }
            }
        }
    } 
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if(creep.memory.role == 'builderLD') {
            roleBuilderLD.run(creep);
        }
        if(creep.memory.role == 'repairerLD') {
            roleRepairerLD.run(creep);
        }
        if(creep.memory.role == 'invade') {
            roleInvade.run(creep);
        }
        if(creep.memory.role == 'invaderange') {
            roleInvade.run(creep);
        }
         if(creep.memory.role == 'distributeur') {
            roleDistributeur.run(creep);
        }
        if(creep.memory.role == 'upgraderLD') {
            roleUpgraderLD.run(creep);
        }
        if(creep.memory.role == 'harvester1') {
            roleHarvester1.run(creep);
        }
         if(creep.memory.role == 'transporteur') {
            roleTransporteur.run(creep);
        }
         if(creep.memory.role == 'claim') {
            roleClaim.run(creep);
        }
    }
}