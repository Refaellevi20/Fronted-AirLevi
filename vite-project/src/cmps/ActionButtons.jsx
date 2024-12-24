import { useState } from "react";
import { BtnSquare } from "./buttons ui/btn-square"

export function ActionButtons({ orderToEdit, onUpdateOrderStatus }) {
  const [showComplete, setShowComplete] = useState(false)
  const [isCompleteClicked, setIsCompleteClicked] = useState(false)

  function handleApprove() {
    onUpdateOrderStatus("approved")
    setShowComplete(true)
  }

  function handleComplete() {
    onUpdateOrderStatus("completed")
    setIsCompleteClicked(true)
    setShowComplete(false)
  }

  return (
    <td className="action-btns">
      {!showComplete && (
        <>
          <BtnSquare
            className={`pointer accept ${orderToEdit.status === "pending" ? "" : "disable"
              }`}
            style={{
              cursor: orderToEdit.status === "pending" && !isCompleteClicked ? "" : "not-allowed",
            }}
            onClick={handleApprove}
            title="Approve order"
            disabled={isCompleteClicked}
          >
            Accept
          </BtnSquare>
          <BtnSquare
            className={`pointer reject ${orderToEdit.status === "pending" ? "" : "disable"
              }`}
            style={{
              cursor: orderToEdit.status === "pending" && !isCompleteClicked ? "" : "not-allowed",
            }}
            onClick={() => onUpdateOrderStatus("rejected")}
            title="Reject order"
            disabled={isCompleteClicked}
          >
            Reject
          </BtnSquare>
        </>
      )}
      {showComplete && (
        <BtnSquare
          className="pointer complete"
          style={{
            cursor: isCompleteClicked ? "not-allowed" : "pointer",
          }}
          onClick={handleComplete}
          title="Mark as Complete"
          disabled={isCompleteClicked}
        >
          Complete
        </BtnSquare>
      )}
    </td>
  )
}