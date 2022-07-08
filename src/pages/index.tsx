import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'

import { useUserContext } from '../context/user.context'
import { trpc } from '../utils/trpc'

const LoginForm = dynamic(() => import("../component/Login"), {
  ssr: false
})

const Home: NextPage = () => {

  const user = useUserContext()

  console.log(user)

  if (!user) {
    return (
      <LoginForm />
    )
  }

  return (
    <Link href="/create-post">
      create post
    </Link>
  )
}

export default Home
