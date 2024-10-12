'use server'

import { createUser } from '@/data/functions/create-user'
import { createSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export async function signUp(state: any, formData: FormData) {
	const signUpSchema = z.object({
		email: z.string().email('E-mail inválido'),
		password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
	})
	const data = signUpSchema.safeParse(Object.fromEntries(formData.entries()))

	if (!data.success) {
		return {
			errors: data.error.flatten().fieldErrors,
		}
	}

	const user = await createUser(data.data)

	if (!user) {
		return {
			message: 'Falha ao criar o usuário',
		}
	}

	await createSession(user.id)

	redirect('/')
}
