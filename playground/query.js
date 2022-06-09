/**
 * This is a fake user system where uid is generated randomly.
 * We want it to be the same even when refreshed the page,
 * so we store it in the querystring.
 *
 * For anyone who want to test multi-player apps, you can just edit the
 * uid in querystring to simulate different users.
 */
export function get_uid() {
  const query = new URLSearchParams(location.search);
  let uid = query.get("uid");
  if (!uid) {
    uid = Math.random().toString(36).slice(2);
    update_query({ uid });
  }
  console.debug("uid =", uid);
  return uid;
}

function update_query(set) {
  const query = new URLSearchParams(location.search);
  for (const key of Object.keys(set)) {
    if (set[key] === undefined) {
      query.delete(key);
    } else {
      query.set(key, set[key]);
    }
  }
  history.replaceState(null, "", "?" + query.toString());
}
