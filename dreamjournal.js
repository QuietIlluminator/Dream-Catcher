const list = document.querySelector('ul');
const titleInput = document.querySelector('#title');
const timeInput = document.querySelector('#time');
const infoInput = document.querySelector('#info');
const form = document.querySelector('form');
const submitBtn = document.querySelector('form button');

let db;
window.onload = function () {
  let request = window.indexedDB.open('entryList_db', 1);

  request.onerror = function () {
    console.log('Database failed to open');
  };

  request.onsuccess = function () {
    console.log('Database opened successfully');

    db = request.result;

    displayData();
  };

  request.onupgradeneeded = function (e) {
    let db = e.target.result;

   
    let objectStore = db.createObjectStore('entryList_os', { keyPath: 'id', autoIncrement: true });

    objectStore.createIndex('title', 'title', { unique: false });
    objectStore.createIndex('time', 'time', { unique: false });
    objectStore.createIndex('info', 'info', { unique: false });

    console.log('Database setup complete');
  };

  form.onsubmit = addData;
  function addData(e) {
    e.preventDefault();

    let newItem = { title: titleInput.value, time: time.value, info: infoInput.value };

    let transaction = db.transaction(['entryList_os'], 'readwrite');

    let objectStore = transaction.objectStore('entryList_os');

    let request = objectStore.add(newItem);
    request.onsuccess = function () {
      titleInput.value = '';
      timeInput.value = '';
      infoInput.value = '';
    };

    transaction.oncomplete = function () {
      console.log('Transaction completed: database modification finished.');

      displayData();
    };

    transaction.onerror = function () {
      console.log('Transaction not opened due to error');
    };
  }

  function displayData() {
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }

    let objectStore = db.transaction('entryList_os').objectStore('entryList_os');
    objectStore.openCursor().onsuccess = function (e) {
      let cursor = e.target.result;

      if (cursor) {
        const listItem = document.createElement('li');
        const h3 = document.createElement('h3');
        const para = document.createElement('p');
        const para2 = document.createElement('p');  


        listItem.appendChild(h3);
        listItem.appendChild(para);
        listItem.appendChild(para2);
        list.appendChild(listItem);

        h3.textContent = "Date: " + cursor.value.title;
        para.textContent = "Time: " + cursor.value.time;
        para2.textContent = "Details: " + cursor.value.info;

        listItem.setAttribute('data-entryList-id', cursor.value.id);

        const deleteBtn = document.createElement('button');
        listItem.appendChild(deleteBtn);
        deleteBtn.textContent = 'Delete';

        deleteBtn.onclick = deleteItem;

        cursor.continue();
      } else {
        if (!list.firstChild) {
          const listItem = document.createElement('li');
          listItem.textContent = 'No entries stored.';
          list.appendChild(listItem);
        }
        console.log('Entries all displayed');
      }
    };
  }

  function deleteItem(e) {
    let entryListId = Number(e.target.parentNode.getAttribute('data-entryList-id'));

    let transaction = db.transaction(['entryList_os'], 'readwrite');
    let objectStore = transaction.objectStore('entryList_os');
    let request = objectStore.delete(entryListId);

    transaction.oncomplete = function () {
      e.target.parentNode.parentNode.removeChild(e.target.parentNode);
      console.log('Entry ' + entryListId + ' deleted.');

      if (!list.firstChild) {
        let listItem = document.createElement('li');
        listItem.textContent = 'No entries stored.';
        list.appendChild(listItem);
      }
    };
  }

};