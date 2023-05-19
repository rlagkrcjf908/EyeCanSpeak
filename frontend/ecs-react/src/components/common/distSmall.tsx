import { useSetRecoilState } from "recoil"
import { distState } from "../../recoil/atoms/mouseState"
import { useEffect } from "react"
import { Outlet } from "react-router"

const DistSmall = () => {
  const setDist = useSetRecoilState(distState)

  useEffect(() => {
    setDist(20)
  }, [])
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default DistSmall
