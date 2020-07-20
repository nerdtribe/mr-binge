const INITIAL_STATE = {
  appState: {
    itemDetailShow: false,
    searchPreviewDialogShow: false,
    selectedItem: {},
  },
  tmdbApiEnabled: false,
  loading: false,
  searchErrorMessage: "",
  search: [],
  movies: [],
  tvSeries: [],
};

export default INITIAL_STATE;
