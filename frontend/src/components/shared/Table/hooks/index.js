import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function useTable(props) {
  const [isMainChecked, setIsMainChecked] = useState(false);
  const [checkedStates, setCheckedStates] = useState([]);
  const isLoading = useSelector((state) => state.ui.isLoading);

  const resetCheckedState = () => {
    const emptyState = props?.data?.length
      ? Array(props.data.length).fill(false)
      : [];
    setCheckedStates(emptyState);
    setIsMainChecked(false);
  };

  const allCheckBoxChangedHandler = (e) => {
    const isChecked = e.target.checked;
    setIsMainChecked(isChecked);
    setCheckedStates(props.data.map((data) => !data.IsDeleted && isChecked)); // Update all checkboxes in state
  };

  const checkBoxChangedHandler = (index) => {
    const updatedCheckedStates = [...checkedStates];
    updatedCheckedStates[index] = !updatedCheckedStates[index];
    setCheckedStates(updatedCheckedStates);

    const nonDeletedItems = props.data.filter((data) => !data.IsDeleted);

    // Check if all non-deleted items are checked
    const allNonDeletedChecked = nonDeletedItems.every(
      (item, idx) => updatedCheckedStates[props.data.indexOf(item)]
    );

    if (allNonDeletedChecked) {
      setIsMainChecked(true);
    } else {
      setIsMainChecked(false);
    }
  };

  useEffect(() => {
    if (props.data.length === 0) return; // Prevent effect if data is empty

    const selectedData = getSelectedIdsHandler();
    props.onSelectData(selectedData);
  }, [checkedStates, props.data]); // Add props.data as a dependency to handle changes

  const getSelectedIdsHandler = () => {
    const selectedData = checkedStates
      .map((state, index) => {
        return state ? props.data[index][props.idName] : null;
      }) // Map to ids or null
      .filter(Boolean); // Filter out null values
    return selectedData;
  };

  useEffect(() => {
    resetCheckedState();
  }, [props.data]);

  const checkBoxState = {
    isMainChecked,
    checkedStates,
    onCheckBoxChange: checkBoxChangedHandler,
    onAllCheckBoxChange: allCheckBoxChangedHandler,
  };
  return [checkBoxState, isLoading];
}

export default useTable;
