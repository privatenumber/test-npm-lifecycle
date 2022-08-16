export const renderCommandSection = ({
	command,
	args,
	hooks,
	output,
}: {
	command: string;
	args: string[];
	hooks: string[];
	output: string;
}) => `
### \`${command} ${args.join(' ')}\`

${
	hooks
		.map((hook, i) => `${i + 1}. \`${hook}\``)
		.join('\n')
}

<details>
<summary>Output</summary><br>

\`\`\`
${output}
\`\`\`
</details>
`;
