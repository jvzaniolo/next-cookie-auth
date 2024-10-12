import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import { InOrbitLogo } from './in-orbit-logo'

import illustrationImg from '@/assets/images/illustration_lets-start.png'

export function EmptyGoals() {
	return (
		<div className="mx-auto flex max-w-xs grow flex-col items-center justify-center">
			<div className="mb-8">
				<InOrbitLogo />
			</div>

			<Image src={illustrationImg} alt="" className="mb-8" />

			<p className="mb-5 text-center text-zinc-300">
				Você ainda não cadastrou nenhuma meta, que tal cadastrar uma agora
				mesmo?
			</p>

			<DialogTrigger asChild>
				<Button>
					<Plus className="size-4" />
					Cadastrar meta
				</Button>
			</DialogTrigger>
		</div>
	)
}
