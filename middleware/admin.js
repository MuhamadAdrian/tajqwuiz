export default function({ $auth, store, redirect }) {
  if ($auth.user.is_admin == false) {
    redirect("/030902/login");
  }
}
