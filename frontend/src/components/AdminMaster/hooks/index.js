import { useEffect, useMemo, useState } from "react";
import {
  fetchAllAdmins,
  deleteAdmin,
  deleteMultipleAdmins,
} from "../../../utils/api";
import {
  CONFIRM_BOX_MESSAGES,
  DEFAULT_WINDOW_SIZE,
  DEFAULTS,
  SNACKBAR_DETAILS,
  SORTING_STATUS,
  TABLE_IDS,
  ADMIN_MASTER_BASEURL,
  ADMIN_MASTER_COLUMNS_SORTINGS,
  ADMIN_MASTER_FORM_BASEURL,
} from "../../../utils/constants";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../store/ui-slice";
import { wrapApiRequestHandler } from "../../../utils/helpers";
import { useLocation, useNavigate } from "react-router-dom";
import useConfirmBox from "../../shared/ConfirmBox/hooks";

let timer;
function useAdminMaster() {
  const { onAskConfirmation } = useConfirmBox();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [adminData, setAdminData] = useState([]);
  const [selectedAdmins, setSelectedAdmins] = useState([]);
  const [selectedAdminForUpdate, setSelectedAdminForUpdate] = useState(
    DEFAULTS.IS_FETCH_ACTIVE
  );
  const [searchText, setSearchText] = useState(null);
  const [isFetchActive, setIsFetchActive] = useState(DEFAULTS.IS_FETCH_ACTIVE);
  const [pageNo, setPageNo] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [windowSize, setWindowSize] = useState(DEFAULT_WINDOW_SIZE);
  const [showNextPage, setShowNextPage] = useState(false);
  const [showPrevPage, setShowPrevPage] = useState(false);
  const [columnSortings, setColumnSortings] = useState(
    ADMIN_MASTER_COLUMNS_SORTINGS
  );

  const showBack = location.pathname !== ADMIN_MASTER_BASEURL;
  const FILTER = useMemo(
    () => ({
      status: isFetchActive,
      searchText,
      pageNo,
      windowSize,
      columnSortings,
    }),
    [isFetchActive, searchText, pageNo, windowSize, columnSortings]
  );
  const fetchAdminsHandler = async (filter) => {
    await wrapApiRequestHandler({
      apiCall: () => fetchAllAdmins(filter),
      setLocalLoading: (loading) => dispatch(uiActions.setIsLoading(loading)),
      onSuccess: (result) => {
        setAdminData(result.data);
        setShowNextPage(result?.isNextPage || false);
        setTotalRecords(result?.totalRecords || 0);
      },
    });
  };

  const deleteAdminHandler = async (adminData) => {
    onAskConfirmation(async () => {
      await wrapApiRequestHandler({
        apiCall: () => deleteAdmin(adminData[TABLE_IDS.ADMIN]),
        setLocalLoading: (loading) => dispatch(uiActions.setIsLoading(loading)),
        onSuccess: () => {
          fetchAdminsHandler(FILTER);
          dispatch(
            uiActions.setSnackBar({ ...SNACKBAR_DETAILS.ON_DELETE_ADMIN })
          );
          resetControles();
        },
      });
    }, CONFIRM_BOX_MESSAGES.DELETE_CONFIRMATION);
  };

  const deleteManyAdminHandler = async () => {
    onAskConfirmation(async () => {
      await wrapApiRequestHandler({
        apiCall: () => deleteMultipleAdmins(selectedAdmins),
        setLocalLoading: (loading) => dispatch(uiActions.setIsLoading(loading)),
        onSuccess: async (data) => {
          fetchAdminsHandler(FILTER);
          if (data.deletedCount > 1) {
            dispatch(
              uiActions.setSnackBar({
                ...SNACKBAR_DETAILS.ON_DELETE_ADMIN,
                message: SNACKBAR_DETAILS.ON_DELETE_ADMINS.message.replace(
                  "__count__",
                  data.deletedCount
                ),
              })
            );
          } else {
            dispatch(
              uiActions.setSnackBar({ ...SNACKBAR_DETAILS.ON_DELETE_ADMIN })
            );
          }
          resetControles();
        },
      });
    }, CONFIRM_BOX_MESSAGES.DELETE_CONFIRMATION);
  };

  useEffect(() => {
    fetchAdminsHandler(FILTER);
  }, [FILTER]);

  const selectAdminsHandler = setSelectedAdmins;
  const toggleSwitchHandler = (status) => {
    setPageNo(1);
    setIsFetchActive(status);
  };
  const searchAdminHandler = (searchString) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setSearchText(searchString.trim() || null);
      setPageNo(1);
      setShowPrevPage(false);
      setShowNextPage(false);
    }, 300);
  };
  const openUpdateFormHandler = setSelectedAdminForUpdate;

  const toggleFormHandler = (isOpenForm, isFetch) => {
    if (!isOpenForm || isFetch) {
      resetControles();
      setIsFetchActive(DEFAULTS.IS_FETCH_ACTIVE);
      setSearchText(null);
    }

    if (isFetch && pageNo === 1 && isFetchActive && searchText === null) {
      fetchAdminsHandler(FILTER);
    }
    navigate(isOpenForm ? ADMIN_MASTER_FORM_BASEURL : ADMIN_MASTER_BASEURL);
  };

  const changePageHandler = (pageNo) => setPageNo(pageNo);

  const nextPageHandler = () => {
    setPageNo((prevPage) => prevPage + 1);
    if (pageNo >= 1) {
      setShowPrevPage(true);
    }
  };
  const prevPageHandler = () => {
    setPageNo((prevPage) => prevPage - 1);
    if (pageNo <= 2) {
      setShowPrevPage(false);
    }
  };

  const windowSizeChangeHandler = (size) => {
    setWindowSize(size);
    resetControles();
  };

  const resetControles = () => {
    setSelectedAdmins([]);
    setPageNo(1);
    setShowNextPage(false);
    setShowPrevPage(false);
    setColumnSortings(ADMIN_MASTER_COLUMNS_SORTINGS);
  };

  const sortingOrderChangeHandler = (fieldName) => {
    setColumnSortings((prevState) => {
      const newSorting = {
        [fieldName]:
          prevState[fieldName] === SORTING_STATUS.ASCENDING
            ? SORTING_STATUS.DESCENDING
            : SORTING_STATUS.ASCENDING,
      };

      // Remove the field from the previous state and place it at the beginning
      // we did this so that latest changed column given priority in sorting
      const updatedState = { ...prevState };
      delete updatedState[fieldName];

      setColumnSortings({
        ...newSorting,
        ...updatedState,
      });
    });
  };

  const adminState = {
    adminData,
    onDeleteAdmin: deleteAdminHandler,
    onDeleteManyAdmin: deleteManyAdminHandler,
    onSelectAdmin: selectAdminsHandler,
    onFetchAdmins: fetchAdminsHandler,
    selectedAdmins,
    onToggleSwitch: toggleSwitchHandler,
    onEditAdmin: openUpdateFormHandler,
    showDelete: selectedAdmins?.length > 0 && !showBack,
    selectedAdminForUpdate,
    onSearch: searchAdminHandler,
    columnSortings,
    onChangeSortingOrder: sortingOrderChangeHandler,
  };
  const formState = {
    showBack,
    onToggleForm: toggleFormHandler,
  };
  const pageState = {
    pageNo,
    showNextPage,
    showPrevPage,
    onChangePageNo: changePageHandler,
    onNextPage: nextPageHandler,
    onPrevPage: prevPageHandler,
    windowSize,
    totalRecords,
    onWindowSizeChange: windowSizeChangeHandler,
  };
  return [adminState, formState, pageState];
}

export default useAdminMaster;
