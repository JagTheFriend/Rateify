import { SignIn, SignUp } from '@clerk/nextjs'

export default function AuthPage({
  searchParams,
}: {
  searchParams: {
    t: 'login' | 'register'
  }
}) {
  return (
    <section className="flex justify-center my-4">
      {searchParams.t === 'login' ? (
        <SignIn routing="hash" />
      ) : (
        <SignUp routing="hash" />
      )}
    </section>
  )
}
