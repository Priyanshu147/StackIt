import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../../../store/ui-slice";

function useConfirmBox() {
  const confirmBox = useSelector((state) => state.ui.confirmBox);
  const dispatch = useDispatch();

  const askConfirmationHandler = (callback, message) => {
    dispatch(
      uiActions.setConfirmBox({
        status: true,
        message: message,
        onConfirm: callback,
      })
    );
  };

  const closeConfirmBoxHandler = () => {
    dispatch(uiActions.resetConfirmBox());
  };

  const proceedConfirmBoxHandler = async () => {
    if (confirmBox.onConfirm != null) {
      await confirmBox.onConfirm();
    }
    closeConfirmBoxHandler();
  };

  const confirmBoxState = {
    isOpen: confirmBox.status,
    onAskConfirmation: askConfirmationHandler,
    onClose: closeConfirmBoxHandler,
    onConfirm: proceedConfirmBoxHandler,
    message: confirmBox.message,
  };

  return confirmBoxState;
}

export default useConfirmBox;
