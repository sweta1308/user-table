export const userReducer = (state, { type, payload }) => {
  switch (type) {
    case "LOADING":
      return { ...state, isLoading: payload };
    case "SET_USERS":
      return { ...state, users: payload };
    case "UPDATE_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === payload.id ? payload : user
        ),
      };
    case "SET_EDIT_ID":
      return { ...state, editId: payload };
    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== payload),
        filters: {
          ...state.filters,
          checkedItems: state.filters.checkedItems.filter(
            (item) => item !== payload
          ),
        },
      };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: payload };
    case "SEARCH_USERS":
      return { ...state, filters: { ...state.filters, searchTerm: payload } };
    case "CHECKED_ITEMS":
      return {
        ...state,
        filters: {
          ...state.filters,
          checkedItems: state.filters.checkedItems.includes(payload)
            ? state.filters.checkedItems.filter((item) => item !== payload)
            : [...state.filters.checkedItems, payload],
        },
      };
    case "SELECT_ALL":
      const notSelected = payload.filter(
        (item) => !state.filters.checkedItems.includes(item)
      );
      return {
        ...state,
        filters: {
          ...state.filters,
          checkedItems: [...state.filters.checkedItems, ...notSelected],
        },
      };
    case "UNSELECT_ALL":
      return {
        ...state,
        filters: {
          ...state.filters,
          checkedItems: state.filters.checkedItems.filter(
            (item) => !payload.includes(item)
          ),
        },
      };
    case "DELETE_ALL":
      return {
        ...state,
        users: state.users.filter(
          ({ id }) => !state.filters.checkedItems.includes(id)
        ),
        filters: { ...state.filters, checkedItems: [] },
      };
    default:
      return state;
  }
};
