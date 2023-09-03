import type { Actions, PageServerLoad } from './$types'
import { prisma } from '$lib/server/prisma'
import { error, fail } from '@sveltejs/kit'
import { i } from '@inlang/sdk-js'

export const load: PageServerLoad = async ({ params, locals }) => {
	const { session, user } = await locals.auth.validateUser()
	if (!session || !user) {
		throw error(401, i("unauth"))
	}

	const getArticle = async (userId: string) => {
		const article = await prisma.article.findUnique({
			where: {
				id: Number(params.articleId)
			}
		})
		if (!article) {
			throw error(404, i("articlenotfound"))
		}
		if (article.userId !== user.userId) {
			throw error(403, i("unauth"))
		}

		return article
	}

	return {
		article: getArticle(user.userId)
	}
}

export const actions: Actions = {
	updateArticle: async ({ request, params, locals }) => {
		const { session, user } = await locals.auth.validateUser()
		if (!session || !user) {
			throw error(401, i("unauth"))
		}

		const { title, content } = Object.fromEntries(await request.formData()) as Record<
			string,
			string
		>

		try {
			const article = await prisma.article.findUniqueOrThrow({
				where: {
					id: Number(params.articleId)
				}
			})

			if (article.userId !== user.userId) {
				throw error(403, i("forbiddeneditarticle"))
			}
			await prisma.article.update({
				where: {
					id: Number(params.articleId)
				},
				data: {
					title,
					content
				}
			})
		} catch (err) {
			console.error(err)
			return fail(500, { message: '{i("couldnotupdatearticle")}' })
		}

		return {
			status: 200
		}
	}
}
