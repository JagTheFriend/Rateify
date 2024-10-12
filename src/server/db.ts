import { PrismaClient } from '@prisma/client'
import { initializeApp } from 'firebase/app'
import { env } from '~/env'

const createPrismaClient = () =>
  new PrismaClient({
    log:
      env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

const globalVariable = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined
  firebaseApp: ReturnType<typeof initializeApp> | undefined
}

export const db = globalVariable.prisma ?? createPrismaClient()

if (env.NODE_ENV !== 'production') globalVariable.prisma = db

const firebaseConfig = {
  apiKey: env.API_KEY,
  authDomain: env.AUTH_DOMAIN,
  projectId: env.PROJECT_ID,
  storageBucket: env.STORAGE_BUCKET,
  messagingSenderId: env.MESSAGING_SENDER_ID,
  appId: env.APP_ID,
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)
// globalVariable.firebaseApp ?? initializeApp(firebaseConfig)

// if (env.NODE_ENV !== 'production') globalVariable.firebaseApp = firebaseApp
