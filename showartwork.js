Hooks.once('init', function(){

  game.settings.register('ShowArtWork', 'gmOnly', {
      name: "Only GM controlled tokens?",
      hint: "The Show Artwork button will only appear for GM.",
      scope: "world",
      config: true,
      default: false,
      type: Boolean
      //onChange: x => window.location.reload()
    });
});
Hooks.once('canvasReady',()=>{
	$('body').on('click','.show-avatar', (e)=>{
	
		let id = $(e.target).parents('.actor.sheet').attr('id').split('-')[1];
		let actor = game.actors.get(id);
		ui.notifications.info(game.i18n.format("SHOWART.message"));
	  	game.socket.emit("shareImage", {
	      image: actor.data.img,
	      title: "",
	      uuid: game.actors.getName(actor.data.name).options.uuid
	    });
		
	});
	$('body').on('click','.show-item', (e)=>{
		
		let id = $(e.target).prev('.window-title').html();
		
		let item = game.items.getName(id);
		ui.notifications.info(game.i18n.format("SHOWART.message"));
	  	game.socket.emit("shareImage", {
	      image: item.data.img,
	      title: item.data.name,
	      uuid: game.items.getName(item.data.name).options.uuid
	    });
		
	});
})
Hooks.on('renderActorSheet', (actor)=>{
	if(game.user.isGM || game.settings.get('ShowArtWork','gmOnly')==false){
		
		if($('#'+actor.id).find('.show-avatar').length == 0)
			$('<a class="show-avatar"><i class="fas fa-eye"></i> Show Art</a>').insertAfter('#'+actor.id+' > header > h4');
	}
})
Hooks.on('renderItemSheet',(item)=>{
	if(game.user.isGM || game.settings.get('ShowArtWork','gmOnly')==false){
		console.log(item);
		if($('#'+item.id).find('.show-item').length == 0)
		$('<a class="show-item"><i class="fas fa-eye"></i> Show Art</a>').insertAfter('#'+item.id+' > header > h4');
	}
})