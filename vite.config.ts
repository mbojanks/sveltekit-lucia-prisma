import { sveltekit } from '@sveltejs/kit/vite';
import inlangPlugin from "@inlang/sdk-js/adapter-sveltekit"
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [inlangPlugin(), sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
};

export default config;
