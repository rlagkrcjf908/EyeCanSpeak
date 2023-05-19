import { useSetRecoilState } from "recoil"
import { distState } from "../../recoil/atoms/mouseState"
import { useEffect } from "react"
import { Outlet } from "react-router"

const DistBig = () => {
  const setDist = useSetRecoilState(distState)

  useEffect(() => {
    setDist(50)
  }, [])
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default DistBig
