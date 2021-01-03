export const state = () => ({
  questions: [],
  is_load: false,
  is_saving: false
});

export const mutations = {
  SET_DATA(state, payload) {
    state.questions = payload;
  },
  SET_IS_LOAD(state, payload) {
    state.is_load = payload;
  },
  SET_IS_SAVING(state, payload) {
    state.is_saving = payload;
  }
};

export const actions = {
  generateRandomQuestion({ commit }, payload) {
    commit("SET_IS_LOAD", true);
    return new Promise((resolve, reject) => {
      this.$axios
        .$get("/api/questions-answer/random")
        .then(res => {
          const { questions } = res.data;
          commit("SET_DATA", questions);
          commit("SET_IS_LOAD", false);
          resolve({ success: true });
        })
        .catch(err => reject(err));
    });
  },

  loadQuestionsRoom({ commit, dispatch }, rid) {
    return new Promise((resolve, reject) => {
      commit("SET_IS_LOAD", true);
      this.$axios
        .$get(`/api/questions-room-with-answer/${rid}`)
        .then(res => {
          if (res && res.data.question_room.length == 0) {
            console.log(res.data.question_room.length);
            dispatch("generateRandomQuestion");
            resolve({ success: true });
          }
          let question_rooms = res.data.question_room;
          let questions = [];
          question_rooms.forEach(question_room => {
            questions.push(question_room.question);
          });
          commit("SET_DATA", questions);
          commit("SET_IS_LOAD", false);
          //commit("SET_QUESTIONS_ROOM", questions);
        })
        .catch(err => reject(err));
    });
  },

  storeQuestionRoom({ commit }, payload) {},
  getQuestionRoom({ commit }, payload) {}
};
