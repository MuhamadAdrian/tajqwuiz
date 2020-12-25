let is_dark = localStorage.getItem("dark");
let is_started = localStorage.getItem("is_start");
export const state = () => ({
  is_dark: is_dark ? JSON.parse(is_dark) : false,
  loadData: false,
  question: null,
  answers: null,
  is_started: is_started ? JSON.parse(is_started) : false
});

export const mutations = {
  SET_DARK(state, payload) {
    state.is_dark = payload;
    if (payload == true) {
      localStorage.setItem("dark", JSON.stringify(state.is_dark));
    } else {
      localStorage.removeItem("dark");
    }
  },
  SET_IS_STARTED(state, payload) {
    state.is_started = payload;
  },
  SET_LOAD_DATA(state, payload) {
    state.loadData = payload;
  },

  SET_QUESTION(state, payload) {
    state.question = payload;
  },
  SET_ANSWERS(state, payload) {
    state.answers = payload;
  }
};

export const actions = {
  loadData({ commit }, id) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get("/api/questions/" + id)
        .then(res => {
          const { answers, ...question } = res.data;
          commit("SET_QUESTION", question);
          commit("SET_ANSWERS", answers);
          resolve({ success: true, id: id });
        })
        .catch(err => reject(err));
    });
  }
};
