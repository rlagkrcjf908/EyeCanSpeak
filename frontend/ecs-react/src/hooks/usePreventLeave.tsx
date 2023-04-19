const usePreventLeave = () => {
  function listener(e: any) {
    e.preventDefault()
    e.returnValue = ""
  }

  function enablePrevent() {
    window.addEventListener("beforeunload", listener)
  }

  return { enablePrevent }
}

export default usePreventLeave
