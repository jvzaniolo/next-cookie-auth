export function OutlineButton(props: React.ComponentProps<'button'>) {
	return (
		<button
			{...props}
			className="group flex items-center gap-2 rounded-full border border-zinc-800 border-dashed px-3 py-2 text-sm text-zinc-300 leading-none outline-none ring-pink-500/10 hover:border-zinc-700 focus-visible:border-pink-500 focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50 aria-busy:pointer-events-none"
		/>
	)
}
