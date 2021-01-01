export const state = () => ({
  questions: [],
  question_rooms: []
});

export const mutations = {
  SET_DATA(state, payload) {
    state.questions = payload;
  }
};

export const actions = {
  generateRandomQuestion({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get("/api/questions-answer/random")
        .then(res => {
          const { questions } = res.data;
          commit("SET_DATA", questions);
          resolve({ success: true });
        })
        .catch(err => reject(err));
    });
  },

  getQuestionRoom({ commit }, payload) {}
};
