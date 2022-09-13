import { useRouter } from 'next/router'

const BookReader = () => {
  const router = useRouter()
  const { cid } = router.query

  return <p>CID: {cid}</p>
}

export default BookReader