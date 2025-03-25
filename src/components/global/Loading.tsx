import { LoaderCircle } from 'lucide-react'

function Loading() {
  return (
    <div className="flex justify-center">
      <LoaderCircle className="w text-primary mt-10 h-10 w-10 animate-spin" />
    </div>
  )
}

export default Loading
