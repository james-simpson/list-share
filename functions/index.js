const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.sendNotifications = functions.firestore
  .document('lists/{listId}/todos/{todoId}')
  .onCreate(async (snapshot, context) => {
    const {listId} = context.params;
    const todo = snapshot.data();

    functions.logger.info('New todo created for list ' + listId);

    const getUserPromise = admin.auth().getUser(todo.authorId);

    const getDeviceTokensPromise = admin
      .firestore()
      .collection('notificationTokens')
      .get()
      .then(snap => snap.docs.map(doc => doc.data()));

    const [user, tokenDocs] = await Promise.all([
      getUserPromise,
      getDeviceTokensPromise,
    ]);

    const tokensToSendTo = tokenDocs
      // Don't send a notification to the user who added the item.
      // Commented out for now to make testing notifications easier.
      // .filter(data => data.userId !== todo.authorId)
      .map(data => data.token);

    const notificationBody = `${user.displayName || user.email} added '${
      todo.text
    }'`;

    functions.logger.info({tokensToSendTo, notificationBody});

    const payload = {
      notification: {
        title: 'New item',
        body: notificationBody,
      },
    };

    return admin.messaging().sendToDevice(tokensToSendTo, payload);
  });
