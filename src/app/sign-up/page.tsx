'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useActionState } from 'react'
import { signUp } from './action'

export default function SingUp() {
	const [formState, formAction, isPending] = useActionState(signUp, undefined)

	return (
		<div className="mx-auto grid w-full max-w-md grow place-items-center px-4 py-8">
			<form action={formAction} className="w-full space-y-4">
				<h1 className="mb-2 text-2xl">Crie sua conta para continuar!</h1>
				<p className="mb-8 text-sm text-zinc-400">
					Torne o seu dia a dia mais fácil e produtivo.
				</p>

				<div>
					<Label htmlFor="email">E-mail</Label>
					<Input
						type="email"
						name="email"
						id="email"
						placeholder="exemplo@email.com"
						className="mb-2 w-full"
					/>
					{formState?.errors?.email && (
						<p className="text-red-400 text-sm">{formState.errors.email}</p>
					)}
				</div>

				<div>
					<Label htmlFor="password">Senha</Label>
					<Input
						type="password"
						name="password"
						id="password"
						placeholder="*******"
						className="mb-2 w-full"
					/>
					{formState?.errors?.password && (
						<p className="text-red-400 text-sm">{formState.errors.password}</p>
					)}
				</div>

				{formState?.message && (
					<p className="text-red-400 text-sm">{formState.message}</p>
				)}

				<Button className="mt-8 w-full" disabled={isPending}>
					Criar conta
				</Button>
			</form>
		</div>
	)
}
