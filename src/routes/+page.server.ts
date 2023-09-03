import type { Actions, PageServerLoad } from './$types'
import { prisma } from '$lib/server/prisma'
import { error, fail, redirect } from '@sveltejs/kit'
import { i } from '@inlang/sdk-js'

export const load: PageServerLoad = async () => {
	return {
		articles: await prisma.article.findMany()
	}
}

export const actions: Actions = {
	createArticle: async ({ request, locals }) => {
		const { session, user } = await locals.auth.validateUser()
		if (!session || !user) {
			throw redirect(302, '/')
		}

		const { title, content } = Object.fromEntries(await request.formData()) as Record<
			string,
			string
		>

		try {
			await prisma.article.create({
				data: {
					title,
					content,
					userId: user.userId
				}
			})
		} catch (err) {
			console.error(err)
			return fail(500, { message: i("couldnotcreatearticle") })
		}

		return {
			status: 201
		}
	},
	deleteArticle: async ({ url, locals }) => {
		const session = await locals.auth.validate()
		if (!session) {
			throw redirect(302, '/')
		}
		const id = url.searchParams.get('id')
		if (!id) {
			return fail(400, { message: '{i("invalidrequest")}' })
		}

		try {
			const article = await prisma.article.findUniqueOrThrow({
				where: {
					id: Number(id)
				}
			})

			if (article.userId !== user.userId) {
				throw error(403, i("notauth"))
			}

			await prisma.article.delete({
				where: {
					id: Number(id)
				}
			})
		} catch (err) {
			console.error(err)
			return fail(500, {
				message: i("errordeletearticle")
			})
		}

		return {
			status: 200
		}
	}
}
