export default function({ $auth, store, redirect }) {
  if (!$auth.user) {
    redirect("/login");
  } else if ($auth.user && $auth.user.email != "madrian.septiana@gmail.com") {
    redirect("/");
  }
}
