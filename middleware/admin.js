export default function({ $auth, store, redirect }) {
  if (!$auth.user) {
    redirect("/030902/login");
  } else if ($auth.user && !$auth.user.is_admin) {
    redirect("/030902/login");
  }
}
