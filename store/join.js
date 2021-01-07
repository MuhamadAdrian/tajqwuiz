const rid = localStorage.getItem("rid");

export const state = () => ({
  is_joining: false,
  rid: rid ? JSON.parse(rid) : null,
  ip: null
});

export const mutations = {
  SET_RID(state, payload) {
    state.rid = payload;
    localStorage.setItem("rid", JSON.stringify(state.rid));
  },

  SET_IS_JOINING(state, payload) {
    state.is_joining = payload;
  },

  SET_IP(state, payload) {
    state.ip = payload;
  },

  RESET_RID(state, payload) {
    state.rid = null;
    localStorage.removeItem("rid");
  }
};

export const actions = {
  updateScore({ commit }, { scorePlus, rid }) {
    this.$axios
      .$post(`/api/challanger/updateScore/${rid}`, {
        newScore: scorePlus
      })
      .then(res => {
        return true;
      })
      .catch(err => {
        return false;
      });
  },

  storeData({ commit }, challanger) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$post(`/api/challanger/storeData`, challanger)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  getQuestions({ commit }, rid) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(`/api/questions-room/${rid}`)
        .then(res => {
          let question_rooms = res.data.question_room;
          let questions = [];
          question_rooms.forEach(question_room => {
            questions.push(question_room.question);
          });
          commit("SET_QUESTION", questions, { root: true });
          resolve(questions);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  searchRoom({ commit }, rid) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(`/api/room/${rid}/detail`)
        .then(res => {
          commit("SET_RID", res.data.rid);
          resolve({ success: true });
        })
        .catch(err => {
          commit("SET_IS_JOINING", false);
          reject(err);
        });
    });
  },

  checkIfUserHasDone({ commit }, rid) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(`/api/challanger/checkUserHasDone/${rid}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
