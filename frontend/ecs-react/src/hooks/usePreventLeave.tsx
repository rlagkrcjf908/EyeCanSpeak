const usePreventLeave = () => {
  function listener(e: any) {
    e.preventDefault()
    e.returnValue = ""
  }

  function enablePrevent() {
    // 모달 창..?
    window.addEventListener("beforeunload", listener)
  }

  return { enablePrevent }
}

export default usePreventLeave
