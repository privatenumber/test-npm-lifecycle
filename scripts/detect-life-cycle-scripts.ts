import path from 'path';
import fs from 'fs/promises';
import { execa } from 'execa';
import { createFixture } from 'fs-fixture';
import commentMark from 'comment-mark';
import { renderCommandSection } from './utils/render-command-section';
import { startVerdaccio } from './utils/verdaccio';

const lifeCycleScripts = [
	'preinstall',
	'install',
	'postinstall',

	'preversion',
	'version',
	'postversion',

	'prepublish',
	'preprepare',
	'prepare',
	'postprepare',
	'prepublishOnly',

	'prepack',
	'postpack',
	'publish',
	'postpublish',

	'dependencies',
];

const npmProject = (
	{
		name = '',
		version = '',
		registryUrl,
	}:
	{
		name?: string;
		version?: string;
		registryUrl?: string;
	},
) => ({
	'package.json': JSON.stringify({
		name,
		version,
		scripts: Object.fromEntries(
			lifeCycleScripts.map(script => [script, `echo '[TEST-LOG] ${script}'`]),
		),
	}),
	'package-lock.json': JSON.stringify({
		lockfileVersion: 1,
	}),
	...(registryUrl
		? {
			'.npmrc': `registry=${registryUrl}\n${registryUrl.replace('http:', '')}:_authToken=anonymousAuthentication\n`,
		}
		: {}),
});

async function detectHooks(
	command: string,
	args: string[],
	cwd: string,
) {
	const { all } = await execa(command, args, {
		all: true,
		cwd,
	});

	const output = all!.trim().replaceAll(cwd, '.');
	const hooks = Array.from(output.matchAll(/^\[TEST-LOG\] (\w+)/gm)).map(hook => hook[1]);

	return renderCommandSection({
		command: path.basename(command),
		args,
		hooks,
		output,
	});
}

(async () => {
	const verdaccio = await startVerdaccio();

	const results: string[] = [];

	for (const npmVersion of ['6', '7', '8']) {
		const fixture = await createFixture({
			'package.json': '{}',
			a: npmProject({ registryUrl: verdaccio.url }),
			b: npmProject({}),
			c: npmProject({
				name: 'package',
				version: '0.0.0',
			}),
			d: npmProject({
				name: 'package',
				version: `0.0.${npmVersion}`,
				registryUrl: verdaccio.url,
			}),
		});

		await execa('npm', ['install', `npm@${npmVersion}`], { cwd: fixture.path });

		const npm = path.join(fixture.path, 'node_modules/.bin/npm');
		const developmentCommands = await Promise.all([
			detectHooks(npm, ['install'], path.join(fixture.path, 'a')),
			detectHooks(npm, ['ci'], path.join(fixture.path, 'b')),
			detectHooks(npm, ['pack'], path.join(fixture.path, 'c')),
			detectHooks(npm, ['publish'], path.join(fixture.path, 'd')),
		]);
		const usageCommand = await detectHooks(
			npm,
			['install', '--foreground-scripts', `package@0.0.${npmVersion}`],
			path.join(fixture.path, 'a'),
		);

		results.push(`## npm ${npmVersion} behavior\n${
			[
				...developmentCommands,
				usageCommand,
			].join('\n---\n')
		}`);

		await fixture.rm();
	}
	let readme = await fs.readFile('./README.md', 'utf8');

	readme = commentMark(readme, {
		behavior: results.join('\n\n'),
	});

	await fs.writeFile('./README.md', readme);

	await verdaccio.kill();
})();
