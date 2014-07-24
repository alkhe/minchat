var express = require('express');

module.exports = function(io) {
	var router = express.Router();

	router.get('/', function(req, res) {
		res.render('index', { title: 'Express' });
	});

	io.on('connection', function(socket) {
		var con = socket.request.connection;
		var user = {
			address: con.remoteAddress,
			port: con.remotePort
		};
		io.emit('connect.server', user);
		socket.on('chat.client', function(chat) {
			io.emit('chat.server', {
				chat: chat,
				user: user
			});
		})
		.on('disconnect', function() {
			io.emit('disconnect.server', user);
		});
	});

	return router;
};
