import './globals.css'

import { CreateGoalDialog } from '@/components/create-goal-dialog'
import { Dialog } from '@/components/ui/dialog'
import { OutlineButton } from '@/components/ui/outline-button'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'
import { registerGoal } from './actions'

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter-tight',
})

export const metadata: Metadata = {
	title: 'in.orbit',
	description: 'Alcance seus objetivos',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const cookieSession = cookies().get('session')?.value

	return (
		<html lang="pt-BR" className={`${inter.variable}`}>
			<body className="flex min-h-dvh flex-col bg-zinc-950 text-zinc-50">
				{cookieSession && (
					<header className="mx-auto w-full max-w-lg px-5 py-10">
						<form
							action={async () => {
								'use server'
								// TODO: Chame a função `destroySession` para deslogar o usuário
								// TODO: Redirecione o usuário para a página `/login`
							}}
							className="flex justify-end"
						>
							<OutlineButton>Sair</OutlineButton>
						</form>
					</header>
				)}
				<Dialog>
					{children}
					<CreateGoalDialog action={registerGoal} />
				</Dialog>
			</body>
		</html>
	)
}
