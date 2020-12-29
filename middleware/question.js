export default function({ store, redirect, params }) {
  if (!store.state.player_name) {
    redirect("/");
  }
  if (store.state.page > store.state.questions.length) {
    redirect("/");
  }
  if (store.state.page != params.id) {
    redirect("/questions/" + store.state.page);
  }
}
