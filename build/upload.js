const Client = require('ftp');
const fs = require('fs');
const configFile = require('./serverCredentials.json');

const client = new Client();

const files = ['index.html', 'main.css', 'main.js'];

const uploadFile = (fileName) => {
	fs.readFile(`./dist/${fileName}`, 'UTF-8', (err, data) => {
		if (err) {
			throw err;
		}
		client.on('ready', () => {
			client.put(data, `/www/${fileName}`, (err) => {
				if (err) {
					throw err;
				}
				client.end();
				console.log('\x1b[35m%s\x1b[0m', `${fileName} uploaded`);
			});
		});
	});
};

files.forEach(file => uploadFile(file));

// connect to localhost:21 as anonymous
const config = {
	host: configFile.host,
	user: configFile.username,
	password: configFile.password,
};
client.connect(config);
