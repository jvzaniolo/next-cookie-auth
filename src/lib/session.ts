import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

type SessionPayload = {
	userId: string
	expiresAt: Date
}

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: SessionPayload) {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime('7d')
		.sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
	try {
		const { payload } = await jwtVerify(session, encodedKey, {
			algorithms: ['HS256'],
		})
		return payload
	} catch (error) {
		console.log('Failed to verify session')
	}
}

export async function createSession(userId: string) {
	const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
	const token = await encrypt({ userId, expiresAt })

	cookies().set('session', token, {
		httpOnly: true,
		secure: true,
		sameSite: 'lax',
		expires: expiresAt,
		path: '/',
	})
}

export async function verifySession() {
	const session = cookies().get('session')?.value
	const payload = (await decrypt(session)) as SessionPayload | undefined

	if (!payload?.userId) {
		redirect('/login')
	}

	return { userId: payload.userId }
}

export function destroySession() {
	cookies().delete('session')
}
