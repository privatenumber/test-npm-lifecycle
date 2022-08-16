import path from 'path';
import os from 'os';
import fs from 'fs';
import { spawn, type ChildProcess } from 'child_process';
import YAML from 'yaml';
import getPort from 'get-port';

const temporaryDirectory = path.join(fs.realpathSync(os.tmpdir()), 'verdaccio', Date.now().toString());

const verdaccioBinaryPath = require.resolve('verdaccio/bin/verdaccio');
const verdaccio = (
	args: string[] = [],
) => new Promise<ChildProcess>((resolve, reject) => {
	const verdaccioProcess = spawn(verdaccioBinaryPath, args, {
		stdio: ['ignore', 'ignore', 'ignore', 'ipc'],
	});

	verdaccioProcess.on('message', (message: { verdaccio_started: boolean }) => {
		if (message.verdaccio_started) {
			resolve(verdaccioProcess);
		}
	});

	verdaccioProcess.on('error', error => reject(error));
});

export async function startVerdaccio() {
	const port = await getPort();

	const serverDirectory = path.join(temporaryDirectory, port.toString());

	await fs.promises.mkdir(serverDirectory, { recursive: true });

	const configFilePath = path.join(serverDirectory, 'verdaccio-config.yaml');

	await fs.promises.writeFile(
		configFilePath,
		YAML.stringify({
			storage: './storage',
			uplinks: {
				npmjs: {
					url: 'https://registry.npmjs.org/',
				},
			},
			packages: {
				'@*/*': {
					access: '$all',
					publish: '$all',
					proxy: 'npmjs',
				},
				'**': {
					access: '$all',
					publish: '$all',
					proxy: 'npmjs',
				},
			},
			logs: {
				level: 'warn',
				colors: false,
			},
		}),
	);

	const verdaccioProcess = await verdaccio([
		'--listen',
		port.toString(),
		'--config',
		configFilePath,
	]);

	return {
		port,
		url: `http://localhost:${port}/`,
		async kill() {
			verdaccioProcess.kill();
			await fs.promises.rm(serverDirectory, { recursive: true });
		},
	};
}
