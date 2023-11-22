//Hello I'm adding comments on each part because I'm still getting the hang of javascript. This is year 2021. Goodluck to me

const videoCardContainer =document.querySelector(".videocontainer");

let API_KEY= "AIzaSyAASO2LT-rS_on3xNsnjpvH1M3bi3eeaLQ";
let video_http= "https://www.googleapis.com/youtube/v3/videos?";
let channel_http="https://www.googleapis.com/youtube/v3/channels?";
 
fetch(video_http + new URLSearchParams({  /* making a request ; using URLSearhparams to add parameters after the link*/
    key:API_KEY, /* API key */
    part:"snippet",  /* so as to get video related data */
    chart:"mostPopular",  /* To get popular videos */
    maxResults: 50, /* maximum videos to fetch */
    regionCode:"NG"  /* To specify the region we are fetching the data from */
}))

.then(res => res.json())
.then(data=>{
    //console.log(data);
    data.items.forEach(item=> {  //To fetch channel icon
        getChannelIcon(item);
    })
})

.catch(err => console.log(err)); 

const getChannelIcon=(video_data) => {
    fetch(channel_http + new URLSearchParams({  /* making a request,using URLSearhparams to add parameters after the link*/
        key:API_KEY, /* API key */
        part:"snippet",  /* so as to get video related data */
        id: video_data.snippet.channelId 

    }))

    .then(res => res.json())
    .then(data=>{
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);

    })
} 

 const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="video" onclick="location.href='https://youtube.com/watch?v=${data.id}'">;
        <img src="${data.snippet.thumbnails.high.url}" alt="" class="thumbnail">
        <div class="video-content">
            <img src="${data.channelThumbnail}" alt="" class="ch-icon">
            <div class="content">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channelName" ${data.snippet.channelTitle}></p>
            </div>

        </div>

    </div>
    
    `;

}

const searchInput = document.querySelector(".search_bar");
const searchbtn= document.querySelector(".searchBtn");
let searchLink= "https://www.youtube.com/results?search_query=";

searchbtn.addEventListener("click", () =>{
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value;
    }
}) 
