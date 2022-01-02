//=====================================================================

    function random (min, max) { 
        return Math.floor(Math.random()* (max - min + 1) + min);
    }

//=====================================================================
//=====================================================================
    
    function Clock (M1,M2,M3,M4,M5,M6) {
    
        var off = 0
        var Off = 0

        if (M1 === 'null') { var off = off + 1 }else { if ( Non_Clock(M1) === 1) { return Non_Clock(M1) }else { var off = off + 1 } }
        if (M2 === 'null') { var off = off + 1 }else { if ( Non_Clock(M2) === 1) { return Non_Clock(M2) }else { var off = off + 1 } }
        if (M3 === 'null') { var off = off + 1 }else { if ( Non_Clock(M3) === 1) { return Non_Clock(M3) }else { var off = off + 1 } }
        if (M4 === 'null') { var off = off + 1 }else { if ( Non_Clock(M4) === 1) { return Non_Clock(M4) }else { var off = off + 1 } }
        if (M5 === 'null') { var off = off + 1 }else { if ( Non_Clock(M5) === 1) { return Non_Clock(M5) }else { var off = off + 1 } }
        if (M6 === 'null') { var off = off + 1 }else { if ( Non_Clock(M6) === 1) { return Non_Clock(M6) }else { var off = off + 1 } }
        if (off === 6 ) return Off
    
    }
    
//=====================================================================

    function Non_Clock (minute) {
    
        if ( ( minute === Memory.time[2] ) && (Memory.time[0] === Memory.time[1]) ) {
            var clock = 1
            return clock
        }
        else {
            var clock = 0
            return clock
        }
    }
    
    
    
//=====================================================================
    if ( Clock(10,20,30,40,50,60) === 1 ) {
    
        for(i = 0 ; i < 10 ; i++) {
            if (ouvriers > 1){
                var creeps  = Game.creep(random(1,ouvriers))
                var creepsZ = creep.z
                var creepsY = creep.y
                var creepsPos = (creeps.roomName)
                Game.rooms[sim].createConstructionSite( creepsZ  , creepsY , STRUCTURE_ROAD);
            }
        }
    
    
    
    }

//====================================================================
    
    function info (N,LVL) {
    
    if ( N === 0 ) {
        console.log ('|====================================|');
        console.log ('|                                    |');  
        console.log ('|     Placement Terminee LvL : '+LVL+'     |');  
        console.log ('|                                    |');
        console.log ('|====================================|');
    }
    if ( N === 1) {
        
        console.log ('|=======================================|');
        console.log ('|                                       |');  
        console.log ('|   Controller level trop bas LvL : '+LVL+'   |');  
        console.log ('|                                       |');
        console.log ('|=======================================|');
    }
}

function alerte (zone,ennemi) {
    
    console.log ('|==================================|');
    console.log ('|                                  |');
    console.log ('|             ATTAQUE              |');
    console.log ('|                                  |');
    console.log ('|      ZONE   :'+ zone +'          |'); 
    console.log ('|      ENNEMI :'+ ennemi +'        |');
    console.log ('|                                  |');
    console.log ('|==================================|');
  
}