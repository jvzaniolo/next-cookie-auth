import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SingUp() {
	async function signUp(formData: FormData) {
		'use server'
		// TODO: Valide os dados do formulário do usuário com um esquema do zod

		// TODO: Chame a função `createUser` com os dados do formulário

		// TODO: Chame a função `createSession` com o id do usuário

		// TODO: Redirecione o usuário para a página `/`

		console.log('Sign up Server Action')
	}

	return (
		<div className="mx-auto grid w-full max-w-md grow place-items-center px-4 py-8">
			<form action={signUp} className="w-full space-y-4">
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
						className="w-full"
					/>
					{/* TODO: Display error message */}
				</div>

				<div>
					<Label htmlFor="password">Senha</Label>
					<Input
						type="password"
						name="password"
						id="password"
						placeholder="*******"
						className="w-full"
					/>
					{/* TODO: Display error message */}
				</div>

				{/* TODO: Display error message */}

				{/* TODO: Disable the button if is submitting form */}
				<Button className="mt-8 w-full">Criar conta</Button>
			</form>
		</div>
	)
}
