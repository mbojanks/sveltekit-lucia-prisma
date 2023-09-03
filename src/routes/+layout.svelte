<script lang="ts">
	import '@picocss/pico'
	import type { PageData } from './$types'
	import { i } from '@inlang/sdk-js'
	export let data: PageData
</script>

<div class="container">
	<nav>
		<ul>
			<li>
				<strong>
					<a href="/"> Blogly </a>
				</strong>
			</li>
		</ul>
		<ul>
			<form method="POST">
				<li><a href="/">{i("home")}</a></li>
				{#if !data.user}
					<li><a href="/register">{i("register")}</a></li>
					<li><a href="/login" role="button">{i("login")}</a></li>
				{:else}
					<li>
						<button formaction="/logout" type="submit" role="button">{i("logout")}</button>
					</li>
				{/if}
			</form>
		</ul>
	</nav>
	<slot />
</div>
