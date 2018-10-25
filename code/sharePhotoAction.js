
function constructAction( ColExec, Event ) {
    
    var that = new Action('PhotoShareAction');

    that.roles = { source : null, sinks: null };

    that.casting = function ( ColExec, Event ) {
        roles.source = Event.sender;
        roles.sinks  = ColExec.devices
                        .hasCapability( 'PhotoSharing' )
                        .isInState( 'PhotoSharing.isReadyToView')
                        .notEquals( [ roles.source ] );
        return;
    };
    

    that.guard = function ( roles ) {

        return ( ColExec.currentPhoto && 
            ColExec.forAll( roles.sinks, sink.photoSharing.isReadyToView ) );
    };


    that.body = function ( roles ) {

        var i;
        for(i = 0; i < roles.sinks.length, i++) { 

            #\label{lst:currentPhoto}#roles.sinks[i].photoSharing.setCurrentPhoto( ColExec.currentPhoto );

        }

        ColExec.currentPhoto = null;

    };

    return that;
};



