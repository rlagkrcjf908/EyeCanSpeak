import closeIcon from "../../assets/icon/close-icon.png"
import rectIcon from "../../assets/icon/rect-icon.png"
export default function ContentNav() {
  return (
    <>
      <img
        src={closeIcon}
        alt=''
        width={10}
        style={{ float: "right", margin: "7px 7px 0 0" }}
      ></img>
      <img
        src={rectIcon}
        alt=''
        width={10}
        style={{ float: "right", margin: "7px 7px 0 0" }}
      ></img>
      <div
        style={{
          float: "right",
          width: "10px",
          height: "10px",
          borderBottom: "1px solid #4e4e4e",
          margin: "7px 7px 0 0",
        }}
      ></div>
    </>
  )
}
