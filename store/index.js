let is_dark = localStorage.getItem("dark");
let is_started = localStorage.getItem("is_start");
let questions = localStorage.getItem("questions");
let countdown = localStorage.getItem("time");
let player_name = localStorage.getItem("player_name");
export const state = () => ({
  is_dark: is_dark ? JSON.parse(is_dark) : false,
  loadData: false,
  questions: questions ? JSON.parse(questions) : null,
  answer: null,
  is_started: is_started ? JSON.parse(is_started) : false,
  countdown: countdown ? JSON.parse(countdown) : 10,
  page: null,
  player_name: player_name ? JSON.parse(player_name) : null
});

export const mutations = {
  SET_PLAYER_NAME(state, name) {
    state.player_name = name;
    localStorage.setItem("player_name", JSON.stringify(state.player_name));
  },
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
    state.questions = payload;
    localStorage.setItem("questions", JSON.stringify(state.questions));
  },
  SET_ANSWER(state, payload) {
    state.answer = payload;
  },
  SET_COUNTDOWN(state, payload) {
    state.countdown = payload;
    localStorage.setItem("time", JSON.stringify(state.countdown));
  },
  SET_PAGE(state, payload) {
    state.page = payload;
  }
};

export const actions = {
  decrementCountdown({ commit, state }, payload) {
    let interval = setInterval(() => {
      state.countdown--;
      commit("SET_COUNTDOWN", state.countdown);
      console.log(state.countdown);
      if (state.countdown == 0 || state.countdown <= 0) {
        clearInterval(interval);
        commit("SET_COUNTDOWN", 10);
      }
    }, 1000);
  },
  loadData({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get("/api/questions/random")
        .then(res => {
          const { questions } = res.data;
          console.log(res.data);
          commit("SET_QUESTION", questions);
          resolve({ success: true });
        })
        .catch(err => reject(err));
    });
  },

  getAnswers({ commit }, id) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(`/api/answer/${id}`)
        .then(res => {
          commit("SET_ANSWER", res.answer);
          resolve({ success: true });
        })
        .catch(err => reject(err));
    });
  }
};
