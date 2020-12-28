export default function({ store, redirect }) {
  if (!store.state.player_name) {
    redirect("/");
  }
}
