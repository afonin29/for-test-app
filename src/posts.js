
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
  getDocs,
  QuerySnapshot,
  deleteDoc
} from 'firebase/firestore';
import { getProfilePicUrl, getUserName } from './auth'



export async function saveTask(taskText, taskDeadline) {
  // Add a new message entry to the Firebase database.
  try {
    await addDoc(collection(getFirestore(), 'tasks'), {
      name: getUserName(),
      text: taskText,
      deadline: taskDeadline,
      profilePicUrl: getProfilePicUrl(),
      timestamp: serverTimestamp()
    });
  }
  catch (error) {
    console.error('Error writing new message to Firebase Database', error);
  }
}




var messageListElement = document.getElementById('chat-area');

function displayMessage(id, timestamp, name, text, picUrl, imageUrl, deadline) {
  var div =
    document.getElementById(id) || createAndInsertMessage(id, timestamp);

  // profile picture
  if (picUrl) {
    div.querySelector('.pic').style.backgroundImage =
      'url(' + picUrl + ')';
  }

  div.querySelector('.name').textContent = name;
  var messageElement = div.querySelector('.message');
  var deadlineElement = div.querySelector('.deadline')

  if (text) {
    // If the message is text.
    messageElement.textContent = text;
    deadlineElement.textContent = deadline;
    // Replace all line breaks by <br>.
    messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
  } else if (imageUrl) {
    // If the message is an image.
    var image = document.createElement('img');
    image.addEventListener('load', function () {
      messageListElement.scrollTop = messageListElement.scrollHeight;
    });
    image.src = imageUrl + '&' + new Date().getTime();
    messageElement.innerHTML = '';
    messageElement.appendChild(image);
  }
  // Show the card fading-in and scroll to view the new message.
  setTimeout(function () {
    div.classList.add('visible');
  }, 1);
  messageListElement.scrollTop = messageListElement.scrollHeight;
}

var MESSAGE_TEMPLATE =
  '<div class="message-container">' +
  '<div class="spacing"><div class="pic"></div></div>' +
  '<div class="name"></div>' +
  '<div class="task-info">' +
  '<div class="message"></div>' +
  '<div class="deadline"></div>' +
  '</div>' +
  '<Button class="doneButton">Done</Button>' +
  '</div>';

function createAndInsertMessage(id, timestamp) {
  const container = document.createElement('div');
  container.innerHTML = MESSAGE_TEMPLATE;
  const div = container.firstChild;
  div.setAttribute('id', id);

  // If timestamp is null, assume we've gotten a brand new message.
  // https://stackoverflow.com/a/47781432/4816918
  timestamp = timestamp ? timestamp.toMillis() : Date.now();
  div.setAttribute('timestamp', timestamp);

  // figure out where to insert new message
  messageListElement = document.getElementById('chat-area');
  const existingMessages = messageListElement.children;
  if (existingMessages.length === 0) {
    messageListElement.appendChild(div);
  } else {
    let messageListNode = existingMessages[0];

    while (messageListNode) {
      const messageListNodeTime = messageListNode.getAttribute('timestamp');

      if (!messageListNodeTime) {
        throw new Error(
          `Child ${messageListNode.id} has no 'timestamp' attribute`
        );
      }

      if (messageListNodeTime > timestamp) {
        break;
      }

      messageListNode = messageListNode.nextSibling;
    }

    messageListElement.insertBefore(div, messageListNode);
  }

  return div;
}

export async function loadTasks() {
  const q = query(collection(getFirestore(), 'tasks'), orderBy('timestamp', 'desc'), limit(12));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    let myData = doc.data();
    displayMessage(doc.id, myData.timestamp, myData.name, myData.text, myData.profilePicUrl, myData.profilePicUrl, myData.deadline)
  });
  var elements = document.querySelectorAll(".doneButton");
  for (var i = 0; i < elements.length; i++) {
    elements[i].onclick = function(e) {
      deleteFromDb(e.target.parentNode.id);
      e.target.parentNode.remove();
    };
  }
}


export async function deleteFromDb(id) {
  await deleteDoc(doc(getFirestore(), "tasks", id));
}