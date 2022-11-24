/************************** argument ***************************/
const Links = document.querySelector("div#links");

const Links_title = Links.querySelector("#title");
const Links_bookmark = Links.querySelector("#bookmark");
const Links_srchBox = Links.querySelector("#srchBox");

/************************ bookMark 하위요소 ************************/
// bookmark 하위 요소 - 링크 모음 <-> 링크 저장 form을 이동을 위한 frame/tray
const bookmark_frame = Links_bookmark.querySelector(".frame");

// bookmarkFrame 하위 요소
const bookmark_list = bookmark_frame.querySelector("div");
// AddedForm 하위 요소 - addedForm -> prevDiv 이동하기 위한 btn
const bookmark_btn = bookmark_frame.querySelector(".prev i");
const bookmark_Form = bookmark_frame.querySelector("form");

// prevDiv 하위 요소 - 저장된 링크 모음
const linkList_default = bookmark_list.querySelector("ul:first-of-type");
const linkList_userSaved = bookmark_list.querySelector("ul:last-of-type");
const linkList_create = bookmark_list.querySelector("span#linkAdd");

const addLink_name = bookmark_Form.querySelector("input[type='text']");
const addLink_url = bookmark_Form.querySelector("input[type='url']");
const addLink_submit = bookmark_Form.querySelector("input[type='submit']");

/************************ srchBox 하위요소 ************************/
const srch_form = Links_srchBox.querySelector("form");
const srch_site_select = Links_srchBox.querySelector("span#srchSite");
const srch_srchWith = Links_srchBox.querySelector("#srchWith");

// srchForm 하위 요소 - 검색 기능 form
const srch_input = srch_form.querySelector('input[type="text"]');

// srchWith 하위 요소 - 검색 사이트 리스트; webSiteURL_obj 참고
const srchWith_ul = srch_srchWith.querySelector("ul");

/***************************** etc *****************************/
// classname
const CLASSNAME_ON = "on";
const CLASSNAME_TO_RIGHT = "toRight";

// array/object
let bookmark_links = [];

/** 검색 사이트 리스트 */
const WebSiteURL_obj = [ // name, url
    {
        name : "google",
        url : "https://www.google.com/search?q=",
    },{
        name : "naver",
        url : "https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=",
    },{
        name : "wikipedia",
        url : "https://ko.wikipedia.org/wiki/",
    }
]

// localStorage
const KEY_SEARCH_SITE = "searchSiteUrl";
const KEY_BOOKMARK_LIST = "bookmark";

let savedURL = JSON.parse(localStorage.getItem(KEY_SEARCH_SITE));
let savedBookmark = JSON.parse(localStorage.getItem(KEY_BOOKMARK_LIST));

/** localStorage key-savedValue list */
const Array_lS_key_saved =[
    {key:KEY_SEARCH_SITE,saved:savedURL},
    {key:KEY_BOOKMARK_LIST,saved:savedBookmark}
]

/************************** argument ***************************/

/*************************** default ***************************/

// 확장 영역 모두 숨기기
Links_bookmark.classList.remove(CLASSNAME_ON);
srch_srchWith.classList.remove(CLASSNAME_ON);

// siteWith ul 채우기
WebSiteURL_obj.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item.name;

    // li 클릭시 srch_site 변경
    li.addEventListener('click',Event_srchSiteSelect);
    srchWith_ul.appendChild(li);
});

// localStorage에 검색사이트 지정 여부에 따라 SrchSite 수정
if(savedURL == null){
    // 검색사이트 지정기록X -> srchWith의 첫번째 사이트를 검색사이트로 지정
    update_localStorage(KEY_SEARCH_SITE,JSON.stringify(WebSiteURL_obj[0]));
    srch_site_select.innerText = WebSiteURL_obj[0].name;
}else{
    // 검색사이트 지정기록 O -> savedURL을 이용하여 url name을 가져오기
    srch_site_select.innerText = savedURL.name;
}

/*************************** default ***************************/

/*************************** Function **************************/
/** localStorage 업데이트 */ 
function update_localStorage(key,value){
    let saved = Array_lS_key_saved.filter(item => item.key == key)[0].saved;

    console.log(saved);
    localStorage.setItem(key,value);
    saved = JSON.parse(localStorage.getItem(key));
    console.log(saved);
}
/** 검색사이트 설정 */ 
function Event_srchSiteSelect(){
    const select_name = this.innerText;

    // 1. localStorage에 업데이트
    const select_item = JSON.stringify(WebSiteURL_obj.filter(site => site.name == select_name)[0]);
    update_localStorage(KEY_SEARCH_SITE,select_item);
    
    // 2. HTML 업데이트
    srch_site_select.innerText = select_name;
    srch_srchWith.classList.remove(CLASSNAME_ON);
};
/** 설정한 사이트에서 검색하기 */ 
function Event_search(event){
    event.preventDefault();
    
    // 검색어 확인
    const search_text = srch_input.value;
    srch_input.value = "";
    // 검색 페이지로 이동
    const url = `${savedURL.url}${search_text}`;
    window.open(url,"_blank");
};
/** localStorage에서 bookmark 불러오기 */
function load_bookmark(item){
    const id = item.id;
    const name = item.name;
    const url = item.url;

    const li = document.createElement("li");
    const a = document.createElement("a");
    const btn = document.createElement("button");
    const i = document.createElement("i");

    li.setAttribute("id",id);
    a.innerText = name;
    a.setAttribute("href",url);
    i.setAttribute("class","fa-solid fa-x");
    btn.addEventListener('click',delete_bookmark);

    btn.appendChild(i);
    
    li.appendChild(a);
    li.appendChild(btn);

    linkList_userSaved.appendChild(li);
}
/** bookmark 삭제 */ 
function delete_bookmark(event){
    // button 클릭 -> li 객체 조회
    const li = event.target.parentElement.parentElement;

    // localStorage 업데이트
    console.log(bookmark_links);
    bookmark_links = bookmark_links.filter((link) => link.id !== parseInt(li.id));
    console.log(bookmark_links);

    const value = JSON.stringify(bookmark_links);
    update_localStorage(KEY_BOOKMARK_LIST,value);

    // HTML 업데이트
    li.remove();
    bookmarkFrameTransform();
}
/** 새로운 링크 만들기 */ 
function Event_AddLink(event){
    event.preventDefault();

    // 0. new link 확인
    const name = addLink_name.value;
    const url = addLink_url.value;
    addLink_name.value = "";
    addLink_url.value = "https://";

    // 1. bookmark_links에 저장
    const obj = {id:Date.now(),name:name,url:url};
    bookmark_links.push(obj);

    // 2. AddedLink에 추가
    load_bookmark(obj);

    // 3. localStorage에 업데이트
    const value = JSON.stringify(bookmark_links);
    localStorage.setItem(KEY_BOOKMARK_LIST,value);
    savedBookmark = JSON.parse(localStorage.getItem(KEY_BOOKMARK_LIST));

    // 4. prevDiv로 이동
    bookmark_frame.classList.remove(CLASSNAME_TO_RIGHT);
    bookmarkFrameTransform();
}
function Event_click(event){
    const target = event.target;
    if (target == Links_title || target == bookmark_btn){
        bookmark_frame.classList.remove(CLASSNAME_TO_RIGHT);
        bookmarkFrameTransform();
    }else if (target == linkList_create){
        bookmark_frame.classList.add(CLASSNAME_TO_RIGHT);
        bookmarkFrameTransform();
    }else {
        console.log("ERROR : function의 대상이 아닙니다");
    }
}
function bookmarkFrameTransform(){
    // 1. prevDiv 크기 맞춤
    if (!bookmark_frame.classList.contains(CLASSNAME_TO_RIGHT)){

        const w = window.getComputedStyle(bookmark_list).width;
        const h = window.getComputedStyle(bookmark_list).height;

        Links_bookmark.style.width = w;
        Links_bookmark.style.height = h;
    }
    // 2. addedForm 크기 맞춤
    else {
        const w = window.getComputedStyle(bookmark_Form).width;
        const h = window.getComputedStyle(bookmark_frame).height;

        Links_bookmark.style.width = w;
        Links_bookmark.style.height = h;
    }
}

/** 미완성 function; chrome Tab, App 페이지로 이동; 단순 a.href, window.open으로 이동이 안됨; Not allowed to load local */
function Event_click_linkList_default(event){
    event.preventDefault();
    // const url = event.target.parentElement;
    // console.log(url, url.href);
    // window.open(url.href,'_blank');
}
/*************************** Function **************************/

/************************ EventListener ************************/
// srchWith/bookMark toggle; 
Links_title.addEventListener('click',(event) => {
    // bookmark.on/off
    Event_click(event);
    Links_bookmark.classList.toggle(CLASSNAME_ON);
    
    // srchWith off
    if(srch_srchWith.classList.contains(CLASSNAME_ON)){srch_srchWith.classList.remove(CLASSNAME_ON);}
});

linkList_create.addEventListener('click',(evnet) => Event_click(evnet));

bookmark_btn.addEventListener('click',(event) => {
    Event_click(event);
   
    // input.value 초기화
    addLink_name.value = "";
    addLink_url.value = "https://";
});
// srchWith/bookMark toggle
srch_site_select.addEventListener('click',() => {
    srch_srchWith.classList.toggle(CLASSNAME_ON);
    if(Links_bookmark.classList.contains(CLASSNAME_ON)){
        Links_bookmark.classList.remove(CLASSNAME_ON);
    }
});
// bookmark 추가 submit
bookmark_Form.addEventListener('submit',Event_AddLink);
// 검색 submit
srch_form.addEventListener('submit',Event_search);

const default_li = linkList_default.querySelectorAll("li");
default_li.forEach(item => item.addEventListener('click',Event_click_linkList_default));
/************************ EventListener ************************/