const niceColors = [
  "#eeff96",
  "#bdff96",
  "#96ffee",
  "#96bbff",
  "#be96ff",
  "#ef96ff",
  "#ff96d2",
  "#ff9696",
  "#ffd596",
];

function pickColor(index) {
  if(index <= niceColors.length)
    return niceColors[index];
  return null;
}

export const mutations = {
  setInputSentences(state, payload) {
    if (!Array.isArray(payload)) {
      state.originalText = payload;
      payload = payload.split(state.separator);
    }
    state.inputSentences = payload.map((s, i) => ({ id: i, text: s }));
  },
  addClass(state, payload) {
    let existing = state.classes.find((c) => c.name == payload);
    if (existing) {
      return;
    }
    let lastIndex = state.classes.reduce((p, c) => {
      return c.id > p ? c.id : p;
    }, 0);
    state.classes.push({
      id: lastIndex + 1,
      name: payload,
      color: pickColor(lastIndex+1),
    });
    if (state.classes.length === 1) {
      state.currentClass = state.classes[0];
    }
  },
  removeClass(state, payload) {
    state.classes = state.classes.filter((c) => c.id != payload);
    if (state.currentClass.id === payload) {
      state.currentClass = state.classes[0];
    }
  },
  setCurrentClass(state, payload) {
    state.currentClass = state.classes.find((c) => c.id === payload);
  },
  addAnnotation(state, payload) {
    state.annotations.push(payload);
  },
  setSeparator(state, payload) {
    state.separator = payload;
    const sentences = state.originalText.split(state.separator);
    state.inputSentences = sentences.map((s, i) => ({ id: i, text: s }));
  }
};

export const getters = {};
export default {
  state() {
    return {
      originalText: "",
      separator: "\n",
      classes: [],
      inputSentences: [],
      annotations: [],
      currentClass: {},
    };
  },
  getters,
  mutations,
  actions: {},
};
