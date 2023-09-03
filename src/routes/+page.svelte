<script lang="ts">
	import type { PageData } from './$types'
	import { i } from '@inlang/sdk-js'

	export let data: PageData

	$: ({ articles } = data)
</script>

<div class="grid">
	<div>
		<h2>{i("articles")}:</h2>
		{#each articles as article}
			<article>
				<header>{article.title}</header>
				<p>
					{article.content}
				</p>
				{#if article.userId === data.user?.userId}
					<form action="?/deleteArticle&id={article.id}" method="POST">
						<button type="submit" class="outline secondary">{i("deletearticle")}</button>
					</form>
					<a href="/{article.id}" role="button" class="outline constrast" style="width: 100%;"
						>{i("editarticle")}</a
					>
				{/if}
			</article>
		{/each}
	</div>
	{#if data.user}
		<form action="?/createArticle" method="POST">
			<h3>{i("newarticle")}</h3>
			<label for="title"> {i("title")} </label>
			<input type="text" id="title" name="title" />
			<label for="title"> {i("content")} </label>
			<textarea id="content" name="content" rows={5} />
			<button type="submit">{i("addarticle")}</button>
		</form>
	{/if}
</div>
