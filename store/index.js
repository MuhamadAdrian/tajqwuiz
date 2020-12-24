let is_dark = localStorage.getItem("dark");
export const state = () => ({
  is_dark: is_dark ? is_dark : false,
  loadData: false,
  question: null,
  answers: null
});

export const mutations = {
  SET_DARK(state, payload) {
    state.is_dark = payload;
    if (payload == true) {
      localStorage.setItem("dark", state.is_dark);
    } else {
      localStorage.removeItem("dark");
    }
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
  loadData({ commit }, payload) {
    return new Promise((resolve, reject) => {
      let random = Math.floor(Math.random() * 2) + 1;
      this.$axios
        .$get("/api/questions/" + random)
        .then(res => {
          const { answers, ...question } = res.data;
          commit("SET_QUESTION", question);
          commit("SET_ANSWERS", answers);
          resolve({ success: true, id: random });
        })
        .catch(err => reject(err));
    });
  }
};
