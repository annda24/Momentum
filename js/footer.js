// footer.js
window.addEventListener('load',()=>{
    const footer = document.querySelector("#footer");

    const wdgt_srch = document.querySelector("#Container #links");
    const wdgt_back_explain = document.querySelector("#Container #background div");
    const wdgt_quote = document.querySelector("#Container #quote");
    const wdgt_toDoList = document.querySelector("#Container #todo");

    const footer_btn = footer.querySelectorAll("li");
    const widget = [wdgt_srch,wdgt_back_explain,wdgt_quote,wdgt_toDoList];

    const ON_CLASSNAME = "on";
    const NOW_CLASSNAME = "now";

    /** footer_btn 클릭시 index 번호를 확인하여 widget on/off */
    function Event_footer_btn_click(event){
        // index번호 확인은 https://gurtn.tistory.com/134 을 참고
        // array에서 index 번호 확인
        const thisNode = event.target.parentElement;
        const htmlCollection = thisNode.parentElement.children;
        // htmlCollection 타입을 Array 타입으로 변경
        const nodes = Array.prototype.slice.call(htmlCollection);
        const index = nodes.indexOf(thisNode);
        const thisWidget = widget[index];
        // 
        const otherNode = nodes.filter((node) => node !== nodes.children);
        const otherWidget = widget.filter((wdgt) => wdgt !== thisWidget);

        if(thisNode.classList.contains(NOW_CLASSNAME)){
            // li.now를 클릭 했을 때
            // 1. footer_btn on/off
            thisNode.classList.remove(NOW_CLASSNAME);
            // 2. widget on/off
            thisWidget.classList.remove(ON_CLASSNAME);
        }else {// li을 클릭했을 때
            // 1. footer_btn on/off
            otherNode.forEach(item => item.classList.remove(NOW_CLASSNAME));
            thisNode.classList.add(NOW_CLASSNAME);
            // 2. widget on/off
            otherWidget.forEach(item => item.classList.remove(ON_CLASSNAME));
            thisWidget.classList.add(ON_CLASSNAME);
        }
        link_arrowBox_on_off();
    }
    /** display none/block -> widget on/off */
    function footer_widget_display(){
        const footer_status = window.getComputedStyle(footer).display;
        if(footer_status == "block"){
            widget.forEach(item => item.classList.remove(ON_CLASSNAME));
            wdgt_back_explain.classList.remove("hoverTrans");
            wdgt_quote.classList.remove("hoverTrans");
        }else {
            widget.forEach(item => item.classList.add(ON_CLASSNAME));
        }
    }
    /** widget_srch remove.on 될 경우 arrowBox에서 remove.on */
    function link_arrowBox_on_off(){
        const links_arrowBox = wdgt_srch.querySelectorAll(".arrowBox");
        if(!wdgt_srch.classList.contains(ON_CLASSNAME)){
            links_arrowBox.forEach(item => item.classList.remove(ON_CLASSNAME));
        }
    }
    link_arrowBox_on_off();

    // default
    // footer가 display:block일 때 widget들은 모두 hidden
    footer_widget_display();
    footer_btn.forEach((item) => {
        item.classList.remove(NOW_CLASSNAME);
        item.addEventListener('click',Event_footer_btn_click)
    });

    // resize event 발생시 footer size에 따라 
    window.addEventListener('resize',() => footer_widget_display );
});
