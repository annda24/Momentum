const Quote = document.querySelector("div#quote");
const quotes = [
    {
        author_ko:"존 F. 케네디",
        quote_ko:"이 모든 과제는 취임 후 100일 안에 이뤄지지는 않을 것입니다. 1,000일 안에도 이뤄지지 않을 것이며, 현 정부의 임기 중에 끝나지도 않을 것이며, 어쩌면 우리가 지구상에 살아있는 동안 이루지 못할 수도 있습니다. 하지만 시작합시다.",
        author_en:"John F. Kennedy",
        quote_en:"All this will not be finished in the first 100 days. Nor will it be finished in the first 1,000 days, nor in the life of this administration, nor even perhaps in our lifetime on this planet. But let us begin.",
        is_favorite:false,
        is_skip:false,
    },
    {
        author_ko:"프랭클린 D. 루스벨트",
        quote_ko:"행복은 성취의 기쁨과 창조적 노력이 주는 쾌감 속에 있다.",
        author_en:"Franklin D. Roosevelt",
        quote_en:"Happiness lies in the joy of achievement and the thrill of creative effort.",
        is_favorite:false,
        is_skip:false,
    },
    {
        author_ko:"벤 린지",
        quote_ko:"당신이 젊은이들을 위한 진로를 준비하기보다는 그 진로를 위해 준비시키는 데 더욱 노력해주길 간청한다.",
        author_en:"Ben Lindsey",
        quote_en:"I do beseech you to direct your efforts more to preparing youth for the path and less to preparing the path for the youth.",
        is_favorite:false,
        is_skip:false,
    },
    {
        author_ko:"존 미첼 메이슨",
        quote_ko:"성실함의 잣대로 스스로를 평가하라, 그리고 관대함의 잣대로 남들을 평가하라.",
        author_en:"John Mitchell Mason",
        quote_en:"Judge thyself with the judgment of sincerity, and thou will judge others with the judgment of charity.",
        is_favorite:false,
        is_skip:false,
    },
    {
        author_ko:"공자",
        quote_ko:"티끌 모아 태산",
        author_en:"Confucius",
        quote_en:"The man who moves a mountain begins by carrying away small stones.",
        is_favorite:false,
        is_skip:false,
    },
    {
        author_ko:"로렌스 J. 피터",
        quote_ko:"교육은 더 높은 수준의 편견을 얻는 방법이다.",
        author_en:"Laurence J. Peter",
        quote_en:"Education is a method whereby one acquires a higher grade of prejudices.",
        is_favorite:false,
        is_skip:false,
    },
    {
        author_ko:"토마스 헉슬리",
        quote_ko:"아마도 모든 교육을 통해 얻을 수 있는 가장 귀중한 결과는, 할 일이 있을 때 좋든 싫든 스스로 그것을 하게 하는 능력이다. 그것이 맨 처음 배워야 할 교훈이다. 그것은 또한 얼마나 일찍부터 교육받았는지와 관계없이 교육받은 자가 완전히 이해하게 되는 마지막 교훈일 것이다.",
        author_en:"Thomas H. Huxley",
        quote_en:"Perhaps the most valuable result of all education is the ability to make yourself do the thing you have to do, when it ought to be done, whether you like it or not; it is the first lesson that ought to be learned; and however early a man's training begins, it is probably the last lesson that he learns thoroughly.",
        is_favorite:false,
        is_skip:false,
    },
    {
        author_ko:"공자",
        quote_ko:"배우기만 하고 생각하지 않으면 얻는 것이 없고, 생각만 하고 배우지 않으면 위태롭다.",
        author_en:"Confucius",
        quote_en:"He who learns but does not think, is lost! He who thinks but does not learn is in great danger.",
        is_favorite:false,
        is_skip:false,
    },
    {
        author_ko:"노먼 더글러스",
        quote_ko:"아이들이 무엇을 할 수 있는지 확인해보고 싶다면 주는 것을 멈추어 보면 된다.",
        author_en:"Norman Douglas",
        quote_en:"If you want to see what children can do, you must stop giving them things.",
        is_favorite:false,
        is_skip:false,
    },
    {
        author_ko:"랄프 왈도 에머슨",
        quote_ko:"위대한 사람은 기회가 없다고 원망하지 않는다.",
        author_en:"Ralph Waldo Emerson",
        quote_en:"No great man ever complains of want of opportunity.",
        is_favorite:false,
        is_skip:false,
    },
    {
        author_ko:"아리스토텔레스",
        quote_ko:"이상적인 인간은 삶의 불행을 위엄과 품위를 잃지 않고 견뎌내 긍정적인 태도로 그 상황을 최대한 이용한다.",
        author_en:"Aristotle",
        quote_en:"The ideal man bears the accidents of life with dignity and grace, making the best of circumstances.",
        is_favorite:false,
        is_skip:false,
    },
    {
        author_ko:"가브리엘(코코)샤넬",
        quote_ko:"성공은 종종 실패가 불가피하다는 것을 모르는 사람들에 의해 달성된다.",
        author_en:"Gabriel Coco Chanel",
        quote_en:"Success is often achieved by those who don't know that failure is inevitable.",
        is_favorite:false,
        is_skip:false,
    }
]
// html
const siteLangSetting = document.querySelector("html").getAttribute("lang");
const quote = document.querySelector("#quote span:first-of-type");
const author = document.querySelector("#quote span:last-of-type");

// local Storage
const KEY_TODAYQUOTE = "todayQuote";
const savedQuote = localStorage.getItem(KEY_TODAYQUOTE);
const parsedQuote = JSON.parse(savedQuote);

/** 당일 설정된 명언을 적용, newQuote에서는 사이트 언어 설정 후 html에 innerText */
function loadQuote(quotes){
    // 오늘의 명언 출력
    if (siteLangSetting === "ko"){
        // 사이트 설정이 한국어 인 경우
        quote.innerText = `"${quotes.quote_ko}"`;
        author.innerText = quotes.author_ko;
    } else {
        // 사이트 설정이 한국어가 아닌 경우
        quote.innerText = `"${quotes.quote_en}"`;
        author.innerText = quotes.author_en;
    }
}

/** 새로운 명언을 선택 및 적용 */
function newQuote(){  
    const quote_randomNo = Math.floor(Math.random()*quotes.length);// 0~12 중 랜덤 수; 12가 나올 확률은 최소 1/10^16;
    const todayQuote = quotes[quote_randomNo];
    
    // 오늘의 명언 출력
    loadQuote(todayQuote);

    // 오늘의 명언 localStorage에 저장    
    localStorage.setItem(KEY_TODAYQUOTE,JSON.stringify(
        {
            updated:today,
            author_ko:todayQuote.author_ko,
            quote_ko:todayQuote.quote_ko,
            author_en:todayQuote.author_en,
            quote_en:todayQuote.quote_en,
        }
    ));
}

if (savedQuote == null || parsedQuote.updated !== today){
    newQuote();
}else {
    loadQuote(parsedQuote);
}
