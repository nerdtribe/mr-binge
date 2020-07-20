const INITIAL_STATE = {
  appState: {
    itemDetailShow: false,
    searchPreviewDialogShow: false,
    selectedItem: {},
    detailLoading: false,
    detailSearchResults: {},
  },
  tmdbApiEnabled: false,
  loading: false,
  searchErrorMessage: "",
  search: [],
  movies: [],
  tvSeries: [],
};

export default INITIAL_STATE;
