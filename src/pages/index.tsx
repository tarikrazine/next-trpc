import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'

import { useUserContext } from '../context/user.context'
import { trpc } from '../utils/trpc'

const Login = dynamic(() => import("../component/Login"), {
  ssr: false
})

const Home: NextPage = () => {

  const user = useUserContext()

  console.log(user)

  if (!user) {
    return (
      <Login />
    )
  }

  return (
    <div>
      create post
    </div>
  )
}

export default Home
