$(document).ready(function() {
	var socket = io.connect('http://108.28.4.213');
	var chatbox = $('#chatbox');
	var message = $('#message');

	message.focus();

	var addContent = function(type, data) {
		var content;
		switch (type) {
			case 'chat':
				content = data;
				break;
			case 'connect':
			case 'disconnect':
				content = '<span class="msg-conn">' + data + '</span>';
				break;
			default:
				break;
		}
		chatbox.html(chatbox.html() + content + '<br />');
	};

	message.keypress(function(e) {
		if (e.keyCode == 13 && message.val().length > 0) {
			socket.emit('chat.client', message.val());
			message.val('');
		}
	});

	socket.on('chat.server', function(bundle) {
		addContent('chat', bundle.user.address + ':' + bundle.user.port + ': ' + bundle.chat);
	})
	.on('connect.server', function(address) {
		addContent('connect', address.address + ':' + address.port + ' has joined.');
	})
	.on('disconnect.server', function(address) {
		addContent('disconnect', address.address + ':' + address.port + ' has left.')
	});

});
