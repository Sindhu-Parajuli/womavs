const newRoomEndpoint =
  'https://fu6720epic.execute-api.us-west-2.amazonaws.com/default/dailyWwwApiDemoNewCall';

/**
 * Create a short-lived room for demo purposes.
 *
 * IMPORTANT: this is purely a "demo-only" API, and *not* how we recommend
 * you create rooms in real production code. In your code, we recommend that you:
 * - Create rooms by invoking the Daily REST API from your own backend server
 *   (or from the Daily dashboard if you're OK with creating rooms manually).
 * - Pass an "exp" (expiration) parameter to the Daily REST endpoint so you
 *   don't end up with a huge number of live rooms.
 *
 * See https://docs.daily.co/reference#create-room for more information on how
 * to use the Daily REST API to create rooms.
 */
async function createRoom() {
  let response = await fetch(newRoomEndpoint),
    room = await response.json();
  //return room;

  // Comment out the above and uncomment the below, using your own URL
   return { url: "https://letstalkwomavs.daily.co/o2TNmbUMhagLVsZRgTfJ" };
}

export default { createRoom };
