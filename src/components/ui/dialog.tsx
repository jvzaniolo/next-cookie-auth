'use client'
import * as DialogPrimitive from '@radix-ui/react-dialog'

export function Dialog(props: DialogPrimitive.DialogProps) {
	return <DialogPrimitive.Dialog {...props} />
}

export function DialogTrigger(props: DialogPrimitive.DialogTriggerProps) {
	return <DialogPrimitive.DialogTrigger {...props} />
}

export function DialogClose(props: DialogPrimitive.DialogCloseProps) {
	return <DialogPrimitive.DialogClose {...props} />
}

export function DialogOverlay(props: DialogPrimitive.DialogOverlayProps) {
	return (
		<DialogPrimitive.DialogOverlay
			{...props}
			className="fixed inset-0 z-40 animate-overlay-show bg-black/40 backdrop-blur-sm"
		/>
	)
}

export function DialogContent(props: DialogPrimitive.DialogContentProps) {
	return (
		<>
			<DialogOverlay />

			<DialogPrimitive.DialogContent
				{...props}
				className="fixed top-0 right-0 bottom-0 z-50 h-screen w-[400px] animate-content-show border-zinc-900 border-l bg-zinc-950 p-8"
			/>
		</>
	)
}

export function DialogTitle(props: DialogPrimitive.DialogTitleProps) {
	return (
		<DialogPrimitive.DialogTitle {...props} className="font-semibold text-lg" />
	)
}

export function DialogDescription(
	props: DialogPrimitive.DialogDescriptionProps
) {
	return (
		<DialogPrimitive.DialogDescription
			{...props}
			className="text-sm text-zinc-400 leading-relaxed"
		/>
	)
}
