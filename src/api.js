import generatePages from "./generatePages";
import store from "./store";

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/kevin/bookmarks';


function ApiFetch(...args){
  let error;
  return fetch(...args)
  .then(res => {
    if (!res.ok) {
      error = { code: res.status };
      if (!res.headers.get('content-type').includes('json')) {
        error.message = res.statusText;
        return Promise.reject(error);
      }
    }
    return res.json();
  })
  .then(data => {
    if (error) {
      error.message = data.message;
      return Promise.reject(error);
    }
    return data;
  });
}

function getItems(){
  return fetch(`${BASE_URL}`)
};

function removeBookmark(id){
  return ApiFetch(`${BASE_URL}/${id}`, {
    method:'DELETE'
  });
}

function formatFormData(data){
  if(typeof data[0].value === 'undefined' || data[0].value === ''){
    data[0].value = data[1].value
  }
  let bookmark = {
    id: ``,
    title: `${data[0].value}`,
    rating: `${data[2].value}`,
    url:`${data[1].value}`,
    desc:`${data[3].value}`
  }
  return bookmark;
}

function createBookmark(bookmark){
  let newBookmark = formatFormData(bookmark);
  let newItem = JSON.stringify( newBookmark )
  console.log(newItem);
  return fetch(`${BASE_URL}`,
  {
    method:`POST`,
    headers:{'Content-Type': 'application/json'},
    body: newItem
})
};

export default 
{
  getItems,
  createBookmark,
  removeBookmark
}

